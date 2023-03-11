import { memo } from 'react';
import styles from './OrderError.module.css';

import PropTypes from 'prop-types';

const OrderError = ({ message }) => {

    return (
        <div className={`${styles.OrderError} pt-30 pb-30`}>
            <span className='text text_type_main-large mb-10'>
                Ошибка
            </span>
            <span className='text text_type_main-default text_color_inactive'>
                {message}
            </span>
        </div>
    );
};

OrderError.propTypes = {
    message: PropTypes.string.isRequired
}

export default memo(OrderError);