// Import React function
import { memo } from 'react';
import styles from './OrderError.module.css';

// Import Redux functions
import { useSelector } from 'react-redux';

const OrderError = () => {
    // Import data from store
    const errorData = useSelector((store) => store.order);

    return (
        <div className={`${styles.OrderError} pt-30 pb-30`}>
            <span className='text text_type_main-large mb-10'>
                Ошибка
            </span>
            <span className='text text_type_main-default text_color_inactive'>
                {errorData.error}
            </span>
        </div>
    );
};

export default memo(OrderError);