import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { memo } from 'react';
import PropTypes from 'prop-types';
import ConstructorItem from '../../../utils/types';
import styles from './BurgerIngredientsItem.module.css';

const BurgerIngredientsItem = (props) => {
    const { constructorItems, item, onHandleOpenModal } = props;

    const count = constructorItems.filter(i => i === item).length;

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

const BurgerIngredient = PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
});

BurgerIngredientsItem.propTypes = {
    item: BurgerIngredient.isRequired,
    constructorItems: PropTypes.arrayOf(ConstructorItem).isRequired,
    onHandleOpenModal: PropTypes.func.isRequired
}

export default memo(BurgerIngredientsItem);