import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import IngredientItem from '../../../utils/types';
import styles from './BurgerIngredientsItem.module.css';

const BurgerIngredientsItem = (props) => {
    const { constructorItems, item, onHandleOpenModal } = props;

    // Calculate count of ingredient
    const count = useMemo(() => {
        return constructorItems
            .filter(i => i._id === item._id).length;
    }, [constructorItems, item._id]);

    return (
        <div
            className={`${styles.BurgerIngredientsItem} mb-8`}
            onClick={() => {onHandleOpenModal(item)}}
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
    constructorItems: PropTypes.arrayOf(IngredientItem.isRequired).isRequired,
    onHandleOpenModal: PropTypes.func.isRequired
}

export default memo(BurgerIngredientsItem);