import { FC, memo, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../../hooks/hooks';
import { getOrderList } from '../../../services/slices/OrderSlice';

import OrderItem from '../OrderItem/OrderItem';

import styles from './OrderList.module.css';

import { TOrder } from '../../../utils/types';

const OrderList: FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getOrderList())
    }, [dispatch]);

    const orders = useAppSelector(store => store.order.orders);

    return (
        <div className={styles.OrderList}>
            {orders && orders.map((order: TOrder) => (
                <OrderItem key={order._id} order={order} />
            ))}
        </div>
    );
};

export default memo(OrderList);