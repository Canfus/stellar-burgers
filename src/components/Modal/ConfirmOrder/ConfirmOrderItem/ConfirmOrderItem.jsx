import { memo } from 'react';
import styles from './ConfirmOrderItem.module.css';

import IngredientItem from '../../../../utils/types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const ConfirmOrderItem = ({ item }) => {
    return (
        <section className={`${styles.ConfirmOrderItem}`}>
            <section className={styles.ConfirmOrderItemBody}>
                <img
                    className={styles.ItemImage}
                    src={item.image_mobile}
                    alt='item'
                />
                <span className='text text_type_main-default'>
                    {item.name}
                </span>
            </section>
            <section className={`${styles.ConfirmOrderItemPrice} mr-25`}>
                <span className='text text_type_digits-default'>
                    {item.type === 'bun' ? item.price * 2 : item.price}
                </span>
                <CurrencyIcon type='primary' />
            </section>
        </section>
    );
};

ConfirmOrderItem.propTypes = {
    item: IngredientItem.isRequired
};

export default memo(ConfirmOrderItem);