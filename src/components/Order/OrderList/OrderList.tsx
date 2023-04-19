import { FC, memo } from 'react';

import { useAppSelector } from '../../../hooks/hooks';

import OrderItem from '../OrderItem/OrderItem';

import styles from './OrderList.module.css';

import { TOrder } from '../../../utils/types';

const OrderList: FC = () => {
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