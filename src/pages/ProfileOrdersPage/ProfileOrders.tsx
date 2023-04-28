import {
    FC,
    memo,
    useCallback,
    useEffect,
    useMemo
} from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { logout } from '../../services/slices/user/UserSlice';

import { Link, useLocation } from 'react-router-dom';

import styles from './ProfileOrders.module.css';

import OrderItem from '../../components/Order/OrderItem/OrderItem';
import { getItemLocalStorage } from '../../utils/localStorage';
import { websocketDisconnecting, websocketStartConnecting } from '../../services/slices/socketSlice';
import { WS_BURGER_API_URL } from '../../utils/burger-api';
import { clearOrders } from '../../services/slices/order/OrderSlice';
import Loader from '../../components/Loader/Loader';

const ProfileOrders: FC = () => {
    const { pathname } = useLocation();

    const dispatch = useAppDispatch();

    const accessToken = getItemLocalStorage('accessToken') as string;

    useEffect(() => {
        dispatch(websocketStartConnecting(`${WS_BURGER_API_URL}/orders?token=${accessToken}`));

        return () => {
            dispatch(clearOrders());
            dispatch(websocketDisconnecting());
        }
    }, [dispatch]);

    const orders = useAppSelector(store => store.order.orders);

    const handleLogout = useCallback(() => {
        dispatch(logout())
    }, [dispatch]);

    return (
        <>
            {orders ? (
                <div className={`${styles.ProfileOrders} mt-10`}>
                    <section className={styles.ProfileOrdersContainer}>
                        <nav className={`${styles.Navigation} mt-3 mr-15`}>
                            <Link
                                to='/profile'
                                className={
                                    `text text_type_main-medium mb-10 ${styles.Link}
                            ${pathname === '/profile' ? styles.text_color_active : 'text_color_inactive'}`
                                }
                            >
                                Профиль
                            </Link>
                            <Link
                                to='/profile/orders'
                                className={
                                    `text text_type_main-medium mb-10 ${styles.Link}
                            ${pathname === '/profile/orders' ? styles.text_color_active : 'text_color_inactive'}`
                                }
                            >
                                История заказов
                            </Link>
                            <Link
                                to='/login'
                                className={`text text_type_main-medium text_color_inactive mb-10 ${styles.Link}`}
                                onClick={handleLogout}
                            >
                                Выход
                            </Link>
                        </nav>
                        <section className={styles.OrderList}>
                            {orders && orders.map(order => (
                                <OrderItem
                                    withStatus
                                    key={order._id}
                                    order={order}
                                    extraClass={styles.OrderItem}
                                />
                            ))}
                        </section>
                    </section>
                </div>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default memo(ProfileOrders);