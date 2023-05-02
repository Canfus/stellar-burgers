import { FC, memo, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { websocketDisconnecting, websocketStartConnecting } from '../../services/slices/socketSlice';
import { WS_BURGER_API_URL } from '../../utils/burger-api';

import OrderList from '../../components/Order/OrderList/OrderList';

import styles from './Feed.module.css';
import { clearOrders } from '../../services/slices/order/OrderSlice';
import OrderInfo from '../../components/OrderInfo/OrderInfo';
import Loader from '../../components/Loader/Loader';

const Feed: FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(websocketStartConnecting(`${WS_BURGER_API_URL}/orders/all`));
        
        return () => {
            dispatch(clearOrders());
            dispatch(websocketDisconnecting());
        }
    }, [dispatch]);
    
    const ordersStore = useAppSelector(store => store.order);

    return (
        <>
            {ordersStore.orders ? (
                <div className={styles.Feed}>
                    <section className={styles.OrderList}>
                        <p className='text text_type_main-large mb-4'>Лента заказов</p>
                        <OrderList />
                    </section>
                    <OrderInfo />
                </div>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default memo(Feed);