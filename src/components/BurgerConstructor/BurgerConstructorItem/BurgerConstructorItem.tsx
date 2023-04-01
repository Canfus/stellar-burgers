import { FC, memo } from 'react';
import styles from './BurgerConstructorItem.module.css';

import { Reorder } from 'framer-motion';

import { TIngredientItem } from '../../../utils/types';

import { useAppDispatch } from '../../../hooks/hooks';
import { deleteConstructorItem } from '../../../services/slices/ConstructorItemsSlice';

import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

interface BurgerConstructorItemProps {
    item: TIngredientItem;
}

const BurgerConstructorItem: FC<BurgerConstructorItemProps> = ({ item }) => {
    const dispatch = useAppDispatch();

    const deleteItem = (item: TIngredientItem) => {
        dispatch(deleteConstructorItem(item));
    }

    return (
        <Reorder.Item value={item} as='section' transition={{ type: 'tween', duration: 0.3 }}>
            <DragIcon type='primary' />
            <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image_mobile}
                extraClass={styles.Item}
                handleClose={() => deleteItem(item)}
            />
        </Reorder.Item>
    );
};

export default memo(BurgerConstructorItem);