// Import React functions
import { memo, useMemo, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './BurgerIngredientsItem.module.css';

// Import PropType
import IngredientItem from '../../../utils/types';

// Import Burger UI components
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

// Import contexts
import { ConstructorContext } from '../../../context/ConstructorContext';

const BurgerIngredientsItem = (props) => {
    const { item, setIngredientInfoModalState } = props;

    // Import data from contexts
    const [constructorItems, setConstructorItems] = useContext(ConstructorContext);

    // Calculate count of ingredient
    const count = useMemo(() => {
        return constructorItems.filter(i => i._id === item._id).length;
    }, [constructorItems, item._id]);

    // Add ingredient to constructor
    const addConstructorItem = useCallback((item) => {
        item.type !== 'bun' && setConstructorItems([...constructorItems, item]);
        item.type === 'bun' && setConstructorItems([item, ...constructorItems.slice(1)]);
    }, [setConstructorItems, constructorItems]);

    // Open Ingredient info modal popup functions
    const handleOpenIgredientInfoModal = useCallback((item) => {
        setIngredientInfoModalState({ isVisible: true, item: item });
    }, [setIngredientInfoModalState]);

    return (
        <div
            className={`${styles.BurgerIngredientsItem} mb-8`}
            onClick={() => {addConstructorItem(item)}}
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
    item: IngredientItem.isRequired,
    setIngredientInfoModalState: PropTypes.func.isRequired
}

export default memo(BurgerIngredientsItem);