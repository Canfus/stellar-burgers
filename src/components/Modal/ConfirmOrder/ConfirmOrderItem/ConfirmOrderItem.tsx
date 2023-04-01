import { FC, memo, useMemo } from 'react';
import styles from './ConfirmOrderItem.module.css';

import { useAppSelector } from '../../../../hooks/hooks';

import { TIngredientItem } from '../../../../utils/types';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface ConfirmOrderItemProps {
    item: TIngredientItem;
}

const ConfirmOrderItem: FC<ConfirmOrderItemProps> = ({ item }) => {
    const constructorItems = useAppSelector((store) => store.constructorItems.items);

    const count = useMemo(() => {
        return item.type === 'bun'
            ? constructorItems.filter(i => i._id === item._id).length + 1
            : constructorItems.filter(i => i._id === item._id).length;
    }, [constructorItems]);

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
                    {`${count > 1 ? `x${count}` : ''} ${item.price}`}
                </span>
                <CurrencyIcon type='primary' />
            </section>
        </section>
    );
};

export default memo(ConfirmOrderItem);