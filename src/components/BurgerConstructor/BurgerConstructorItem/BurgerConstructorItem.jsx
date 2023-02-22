// Import React functions
import styles from './BurgerConstructorItem.module.css';

// Import Motion component
import { Reorder } from 'framer-motion';

// Import PropTypes
import PropTypes from 'prop-types';
import IngredientItem from '../../../utils/types';

// Import Redux functions
import { useDispatch } from 'react-redux';
import { deleteConstructorItem } from '../../../services/slices/ConstructorItemsSlice';

// Import Burger UI components
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructorItem = ({ item, index }) => {
    const dispatch = useDispatch();

    // Delete ingredient from constructor
    const deleteItem = (index) => {
        dispatch(deleteConstructorItem(index));
    }

    return (
        <Reorder.Item value={item} as='section' transition={{ type: 'tween', duration: 0.3 }}>
            <DragIcon type='primary' />
            <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image_mobile}
                extraClass={styles.Item}
                handleClose={() => dispatch(deleteItem(index))}
            />
        </Reorder.Item>
    );
};

BurgerConstructorItem.propTypes = {
    item: IngredientItem.isRequired,
    index: PropTypes.number.isRequired
};

export default BurgerConstructorItem;