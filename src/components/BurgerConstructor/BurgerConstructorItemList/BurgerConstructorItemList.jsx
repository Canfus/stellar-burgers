// Import React functions
import styles from './BurgerConstructorItemList.module.css';

// Import Redux functions
import { useDispatch } from 'react-redux';
import { updateConstructorItems } from '../../../services/slices/ConstructorItemsSlice';

// Import Motion component
import { Reorder } from 'framer-motion';

// Import IngredientItem type
import PropTypes from 'prop-types';
import IngredientItem from '../../../utils/types';

// Import UI component
import BurgerConstructorItem from '../BurgerConstructorItem/BurgerConstructorItem';

const BurgerConstructorItemList = ({ constructorItems }) => {
    const dispatch = useDispatch();

    const update = (newList) => {
        dispatch(updateConstructorItems(newList));
    }

    return (
        <Reorder.Group
            axis='y'
            as='section'
            onReorder={(newList) => update(newList)}
            values={constructorItems}
            className={styles.BurgerConstructorItemList}
        >
            {
                constructorItems.map((item) => item.type !== 'bun' && (
                    <BurgerConstructorItem key={item.dragId} item={item} />
                ))
            }
        </Reorder.Group>
    );
};

BurgerConstructorItemList.propTypes = {
    constructorItems: PropTypes.arrayOf(IngredientItem.isRequired).isRequired
};

export default BurgerConstructorItemList;