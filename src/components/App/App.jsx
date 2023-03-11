import { memo, useEffect } from 'react';
import styles from './App.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { fetchIngredientsData } from '../../services/slices/IngredientsItemsSlice';
import { getUserData } from '../../services/slices/UserSlice';

import { Routes, Route, useLocation } from 'react-router-dom';
import { ProtectedRouteElement } from '../ProtectedRouteElement';

import MainPage from '../../pages/MainPage/MainPage';
import Login from '../../pages/LoginPage/Login';
import Register from '../../pages/RegisterPage/Register';
import ForgotPassword from '../../pages/ForgotPasswordPage/ForgotPassword';
import ResetPassword from '../../pages/ResetPasswordPage/ResetPassword';
import Profile from '../../pages/ProfilePage/Profile';
import NotFound404 from '../../pages/NotFound404/NotFound404';
import ModalSwitch from '../../pages/ModalSwitch';
import IngredientDetailsPage from '../../pages/IngredientDetailsPage/IngredientDetailsPage';

const App = () => {
    // Import data from store
    const state = useSelector((store) => store.ingredientsItems);
    const userData = useSelector((store) => store.userSlice.user);

    // Initialize dispatcher
    const dispatch = useDispatch();

    // Get ingredients when application starts
    useEffect(() => {
        dispatch(fetchIngredientsData());

        if (!userData.email) {
            dispatch(getUserData());
        }
        // eslint-disable-next-line
    }, []);

    const location = useLocation();
    let background = location.state && location.state.background ? true : false;

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
                        <Routes location={background || location}>
                            <Route path='/' element={<MainPage />} />
                            <Route path='/profile' element={<ProtectedRouteElement element={<Profile />} />} />
                            <Route
                                path='/ingredients/:ingredientId'
                                element={<IngredientDetailsPage />}
                            />
                            <Route path='/login' element={<Login />} />
                            <Route path='/register' element={<Register />} />
                            <Route path='/forgot-password' element={<ForgotPassword />} />
                            <Route path='/reset-password' element={<ResetPassword />} />
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

// <h1 className={`text text_type_main-large ${styles.Loading}`}>Loading...</h1>