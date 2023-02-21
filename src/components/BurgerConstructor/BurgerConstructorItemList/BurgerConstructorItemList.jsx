// Import React functions
import { useCallback } from 'react';
import styles from './BurgerConstructorItemList.module.css';

// Import Redux functions
import { useDispatch } from 'react-redux';
import { updateConstructorItems } from '../../../services/slices/ConstructorItemsSlice';

// Import IngredientItem type
import PropTypes from 'prop-types';
import IngredientItem from '../../../utils/types';

// Import UI component
import BurgerConstructorItem from '../BurgerConstructorItem/BurgerConstructorItem';

const BurgerConstructorItemList = ({ constructorItems }) => {
    const dispatch = useDispatch();

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        const dragItem = constructorItems[dragIndex];
        const newItems = [...constructorItems];

        newItems.splice(dragIndex, 1);
        newItems.splice(hoverIndex, 0, dragItem);

        dispatch(updateConstructorItems(newItems));
    }, [constructorItems, dispatch]);
    return (
        <section className={styles.BurgerConstructorItemList} key={Math.random()}>
            {
                constructorItems.map((item, index) => item.type !== 'bun' && (
                    <BurgerConstructorItem key={item.dragId} index={index} item={item} moveCard={moveCard} />
                ))
            }
        </section>
    );
};

BurgerConstructorItemList.propTypes = {
    constructorItems: PropTypes.arrayOf(IngredientItem.isRequired).isRequired
};

export default BurgerConstructorItemList;