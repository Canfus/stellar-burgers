import { FC, memo, useEffect } from 'react';
import styles from './App.module.css';

import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { fetchIngredientsData } from '../../services/slices/IngredientsItemsSlice';
import { getUserData } from '../../services/slices/UserSlice';

import { Routes, Route, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '../ProtectedRouteElement';

import AppHeader from '../AppHeader/AppHeader';
import Loader from '../Loader/Loader';

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
import OrderDetailsPage from '../../pages/OrderDetailsPage/OrderDetailsPage';
import ProfileOrders from '../../pages/ProfileOrdersPage/ProfileOrders';

const App: FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchIngredientsData());

        if (!userData.isLoggedIn) {
            dispatch(getUserData());
        }
        // eslint-disable-next-line
    }, []);

    const state = useAppSelector((store) => store.ingredientsItems);
    const userData = useAppSelector((store) => store.userSlice);


    const location = useLocation();
    let background = location.state && location.state.background;
    console.log(background);

    return (
        <div className={styles.App}>
            {state.status === 'loading'
                ? (
                    <Loader />
                )
                : (
                    <>
                        <AppHeader />
                        <Routes location={background || location}>
                            <Route path='/' element={<MainPage />} />
                            <Route path='/profile' element={<ProtectedRoute element={<Profile />} />} />
                            <Route path='/profile/orders' element={<ProtectedRoute element={<ProfileOrders />} />} />
                            <Route path='/profile/orders/:orderId' element={<ProtectedRoute background={background} element={<OrderDetailsPage />} />} />
                            <Route path='/feed' element={<Feed />} />
                            <Route path='/feed/:orderId' element={<OrderDetailsPage />} />
                            <Route path='/ingredients/:ingredientId' element={<IngredientDetailsPage />} />
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