import { FC, memo, useEffect } from 'react';
import styles from './App.module.css';

import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { fetchIngredientsData } from '../../services/slices/IngredientsItemsSlice';
import { getUserData } from '../../services/slices/UserSlice';

import { Routes, Route, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '../ProtectedRouteElement';

import AppHeader from '../AppHeader/AppHeader';

import MainPage from '../../pages/MainPage/MainPage';
import Login from '../../pages/LoginPage/Login';
import Register from '../../pages/RegisterPage/Register';
import ForgotPassword from '../../pages/ForgotPasswordPage/ForgotPassword';
import ResetPassword from '../../pages/ResetPasswordPage/ResetPassword';
import Profile from '../../pages/ProfilePage/Profile';
import NotFound404 from '../../pages/NotFound404/NotFound404';
import ModalSwitch from '../../pages/ModalSwitch';
import IngredientDetailsPage from '../../pages/IngredientDetailsPage/IngredientDetailsPage';
import Feed from '../../pages/Feed/Feed';

const App: FC = () => {
    const state = useAppSelector((store) => store.ingredientsItems);
    const userData = useAppSelector((store) => store.userSlice);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchIngredientsData());

        if (!userData.isLoggedIn) {
            dispatch(getUserData());
        }
        // eslint-disable-next-line
    }, []);

    const location = useLocation();
    let background = location.state && location.state.background;

    return (
        <div className={styles.App}>
            {state.status === 'loading'
                ? (
                    <section className={styles.Loading}>
                        <div className={styles.Loader}>
                            <span></span>
                        </div>
                        <p className='text text_type_main-medium mt-4'>Ловим связь с соседней галактики</p>
                    </section>
                )
                : (
                    <>
                        <AppHeader />
                        <Routes location={background || location}>
                            <Route path='/' element={<MainPage />} />
                            <Route path='/profile' element={<ProtectedRoute element={<Profile />} />} />
                            <Route path='/feed' element={<Feed />} />
                            <Route
                                path='/ingredients/:ingredientId'
                                element={<IngredientDetailsPage />}
                            />
                            <Route path='/login' element={<ProtectedRoute anonymous element={<Login />} />} />
                            <Route path='/register' element={<ProtectedRoute anonymous element={<Register />} />} />
                            <Route path='/forgot-password' element={<ProtectedRoute anonymous element={<ForgotPassword />} />} />
                            <Route path='/reset-password' element={<ProtectedRoute anonymous element={<ResetPassword />} />} />
                            <Route path='*' element={<NotFound404 />} />
                        </Routes>
                        <ModalSwitch background={background} />
                    </>
                )
            }
        </div>
    );
};

export default memo(App);