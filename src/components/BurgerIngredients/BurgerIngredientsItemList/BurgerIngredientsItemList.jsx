import { memo } from 'react';
import PropTypes from 'prop-types';
import BurgerIngredientsItem from '../BurgerIngredientsItem/BurgerIngredientsItem';
import styles from './BurgerIngredientsItemList.module.css';
import IngredientItem from '../../../utils/types';

const BurgerIngredientsItemList = (props) => {
    const { title, data, constructorItems, onHandleOpenModal } = props;

    return (
        <div className={`${styles.BurgerIngredientsItem}`}>
            <p className='text text_type_main-medium mb-6'>
                {title}
            </p>
            <section className={`${styles.IngredientsContainer} ml-4`}>
                {
                    data.map((item) => <BurgerIngredientsItem key={item._id} constructorItems={constructorItems} item={item} onHandleOpenModal={onHandleOpenModal} />)
                }
            </section>
        </div>
    );
};

BurgerIngredientsItemList.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(IngredientItem.isRequired).isRequired,
    constructorItems: PropTypes.arrayOf(IngredientItem.isRequired).isRequired,
    onHandleOpenModal: PropTypes.func.isRequired
}

export default memo(BurgerIngredientsItemList);