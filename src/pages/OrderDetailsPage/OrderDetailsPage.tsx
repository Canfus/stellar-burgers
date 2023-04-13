import { FC, memo } from 'react';

import styles from './OrderDetailsPage.module.css';
import OrderDetails from '../../components/Modal/OrderDetails/OrderDetails';

interface OrderDetailsPageProps {
    
}

const OrderDetailsPage: FC<OrderDetailsPageProps> = () => {
    return (
        <div className={styles.OrderDetailsPage}>
            <OrderDetails />
        </div>
    );
};

export default memo(OrderDetailsPage);