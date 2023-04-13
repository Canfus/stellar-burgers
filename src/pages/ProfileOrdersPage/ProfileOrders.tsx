import {
    FC,
    memo,
    useCallback,
    useEffect
} from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { logout } from '../../services/slices/UserSlice';

import { NavLink } from 'react-router-dom';

import styles from './ProfileOrders.module.css';

import OrderItem from '../../components/Order/OrderItem/OrderItem';
import { getProfileOrderList } from '../../services/slices/UserSlice';
import { getItemLocalStorage } from '../../utils/localStorage';

const ProfileOrders: FC = () => {
    const dispatch = useAppDispatch();

    const accessToken = getItemLocalStorage('accessToken');

    useEffect(() => {
        if (accessToken) {
            dispatch(getProfileOrderList(accessToken));
        }
    }, [dispatch, accessToken]);

    const orders = useAppSelector(store => store.order.orders);

    const handleLogout = useCallback(() => {
        dispatch(logout())
    }, [dispatch]);

    return (
        <div className={`${styles.ProfileOrders} mt-10`}>
            <section className={styles.ProfileOrdersContainer}>
                <nav className={`${styles.Navigation} mt-3 mr-15`}>
                    <NavLink
                        to='/profile'
                        className={`text text_type_main-medium ${styles.Link}`}
                    >
                        {({ isActive }) => (
                            <p className={isActive ? styles.text_color_active : 'text_color_inactive'}>
                                Профиль
                            </p>
                        )}
                    </NavLink>
                    <NavLink
                        to='/profile/orders'
                        className={`text text_type_main-medium ${styles.Link}`}
                    >
                        {({ isActive }) => (
                            <p className={isActive ? styles.text_color_active : 'text_color_inactive'}>
                                История заказов
                            </p>
                        )}
                    </NavLink>
                    <NavLink
                        to='/login'
                        className={`text text_type_main-medium ${styles.Link}`}
                        onClick={handleLogout}
                    >
                        {({ isActive }) => (
                            <p className={isActive ? styles.text_color_active : 'text_color_inactive'}>
                                Выход
                            </p>
                        )}
                    </NavLink>
                    <span className='text text_type_main-default text_color_inactive mt-20'>В этом разделе вы можете изменить свои персональные данные</span>
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
    );
};

export default memo(ProfileOrders);