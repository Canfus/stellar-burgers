// Import React functions
import { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './BurgerIngredientsItemList.module.css';

// Import components
import BurgerIngredientsItem from '../BurgerIngredientsItem/BurgerIngredientsItem';

// Import PropType
import IngredientItem from '../../../utils/types';

const BurgerIngredientsItemList = (props) => {
    const { title, data, onHandleOpenModal } = props;

    return (
        <div className={`${styles.BurgerIngredientsItem}`}>
            <p className='text text_type_main-medium mb-6'>
                {title}
            </p>
            <section className={`${styles.IngredientsContainer} ml-4`}>
                {
                    data.map((item) => <BurgerIngredientsItem key={item._id} item={item} onHandleOpenModal={onHandleOpenModal} />)
                }
            </section>
        </div>
    );
};

BurgerIngredientsItemList.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(IngredientItem.isRequired).isRequired,
    onHandleOpenModal: PropTypes.func.isRequired
}

export default memo(BurgerIngredientsItemList);