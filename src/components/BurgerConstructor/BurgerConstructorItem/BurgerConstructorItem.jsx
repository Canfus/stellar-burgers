import styles from './BurgerConstructorItem.module.css';

import { Reorder } from 'framer-motion';

import IngredientItem from '../../../utils/types.js';

import { useDispatch } from 'react-redux';
import { deleteConstructorItem } from '../../../services/slices/ConstructorItemsSlice';

import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructorItem = ({ item }) => {
    const dispatch = useDispatch();

    const deleteItem = (item) => {
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

BurgerConstructorItem.propTypes = {
    item: IngredientItem.isRequired
};

export default BurgerConstructorItem;