import { FC, memo, useCallback, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import OrderList from '../../components/Order/OrderList/OrderList';

import styles from './Feed.module.css';
import { closeOrderDetails, getOrderList } from '../../services/slices/OrderSlice';
import OrderInfo from '../../components/OrderInfo/OrderInfo';
import Modal from '../../components/Modal/Modal';
import OrderDetails from '../../components/Modal/OrderDetails/OrderDetails';

interface FeedProps {

}

const Feed: FC<FeedProps> = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getOrderList());
    }, [dispatch]);
    
    const ordersStore = useAppSelector(store => store.order);

    const handleCloseOrderModal = useCallback(() => {
        dispatch(closeOrderDetails());
    }, [dispatch]);

    return (
        <>
            {ordersStore.orders && (
                <div className={styles.Feed}>
                    <section className={styles.OrderList}>
                        <p className='text text_type_main-large mb-4'>Лента заказов</p>
                        <OrderList />
                    </section>
                    <OrderInfo />
                </div>
            )}
            {ordersStore.currentOrder.status === 'visible' && (
                <Modal onClose={handleCloseOrderModal}>
                    <OrderDetails />
                </Modal>
            )}
        </>
    );
};

export default memo(Feed);