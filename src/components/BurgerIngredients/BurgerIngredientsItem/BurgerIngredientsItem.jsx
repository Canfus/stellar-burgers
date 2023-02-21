// Import React functions
import { memo, useMemo, useCallback } from 'react';
import styles from './BurgerIngredientsItem.module.css';

// Import Redux Functions
import { useSelector, useDispatch } from 'react-redux';
import { addConstructorItem } from '../../../services/slices/ConstructorItemsSlice';
import { showIngredientInfo } from '../../../services/slices/IngredientSlice';

// Import DnD functions
import { useDrag } from 'react-dnd';

// Import PropType
import IngredientItem from '../../../utils/types';

// Import Burger UI components
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIngredientsItem = ({ item }) => {
    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: {...item}
    });

    const dispatch = useDispatch();

    // Import data from contexts
    const constructorItems = useSelector((store) => store.constructorItems.items);

    // Calculate count of ingredient
    const count = useMemo(() => {
        return constructorItems.filter(i => i._id === item._id).length;
    }, [constructorItems, item._id]);

    // Add ingredient to constructor
    const addItem = useCallback((item) => {
        dispatch(addConstructorItem(item));
    }, [constructorItems]);

    // Open Ingredient info modal popup functions
    const handleOpenIgredientInfoModal = useCallback((item) => {
        dispatch(showIngredientInfo(item));
    }, [dispatch]);

    return (
        <div
            ref={dragRef}
            className={`${styles.BurgerIngredientsItem} mb-8`}
            onClick={() => {handleOpenIgredientInfoModal(item)}}
        >
            <img src={item.image} alt="bun" className={styles.BurgerImage} />
            {count > 0 && <Counter count={count} size='default' extraClass='m-1' />}
            <p className={`text text_type_digits-default m-1 ${styles.Price}`}>
                {item.price}
                <CurrencyIcon type='primary' />
            </p>
            <p className='text text_type_main-default mb-4'>
                {item.name}
            </p>
        </div>
    );
};

BurgerIngredientsItem.propTypes = {
    item: IngredientItem.isRequired
}

export default memo(BurgerIngredientsItem);