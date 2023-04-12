import { FC, memo, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import OrderList from '../../components/Order/OrderList/OrderList';

import styles from './Feed.module.css';
import { getOrderList } from '../../services/slices/OrderSlice';
import OrderInfo from '../../components/OrderInfo/OrderInfo';

interface FeedProps {

}

const Feed: FC<FeedProps> = () => {
    const orders = useAppSelector(store => store.order.orders);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getOrderList());
    }, []);

    return (
        <>
            {orders && (
                <div className={styles.Feed}>
                    <section className={styles.OrderList}>
                        <p className='text text_type_main-large mb-4'>Лента заказов</p>
                        <OrderList />
                    </section>
                    <OrderInfo />
                </div>
            )}
        </>
    );
};

export default memo(Feed);