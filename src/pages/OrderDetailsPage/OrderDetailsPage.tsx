import { FC, memo, useEffect, useMemo } from 'react';

import { useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import styles from './OrderDetailsPage.module.css';
import OrderDetails from '../../components/Modal/OrderDetails/OrderDetails';
import { websocketDisconnecting, websocketStartConnecting } from '../../services/slices/socketSlice';
import { WS_BURGER_API_URL } from '../../utils/burger-api';
import { clearOrders } from '../../services/slices/OrderSlice';
import { getItemLocalStorage } from '../../utils/localStorage';
import Loader from '../../components/Loader/Loader';

const OrderDetailsPage: FC = () => {
    const { pathname } = useLocation();

    const dispatch = useAppDispatch();

    const orders = useAppSelector(store => store.order.orders);

    const endpoint = useMemo<string>(() => {
        if (pathname.includes('/feed')) {
            return '/orders/all';
        } else {
            return `/orders?token=${getItemLocalStorage('accessToken')}`;
        }
    }, [pathname]);

    useEffect(() => {
        dispatch(websocketStartConnecting(`${WS_BURGER_API_URL}${endpoint}`));
        
        return () => {
            dispatch(clearOrders());
            dispatch(websocketDisconnecting());
        }
    }, [dispatch]);

    return (
        <div className={styles.OrderDetailsPage}>
            {orders ? <OrderDetails /> : <Loader />}
        </div>
    );
};

export default memo(OrderDetailsPage);