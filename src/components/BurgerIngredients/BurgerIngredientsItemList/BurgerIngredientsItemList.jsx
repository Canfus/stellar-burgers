// Import React functions
import { memo } from 'react';
import styles from './BurgerIngredientsItemList.module.css';

// Import components
import BurgerIngredientsItem from '../BurgerIngredientsItem/BurgerIngredientsItem';

// Import PropType
import IngredientItem from '../../../utils/types';
import PropTypes from 'prop-types';

const BurgerIngredientsItemList = (props) => {
    const { title, data, refs, index } = props;

    return (
        <div className={`${styles.BurgerIngredientsItem}`}>
            <p ref={(item) => {refs.current[index] = item}} className='text text_type_main-medium mb-6'>
                {title}
            </p>
            <section className={`${styles.IngredientsContainer} ml-4`}>
                {
                    data.map((item) => <BurgerIngredientsItem key={item._id} item={item} />)
                }
            </section>
        </div>
    );
};

BurgerIngredientsItemList.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(IngredientItem.isRequired).isRequired,
    refs: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
}

export default memo(BurgerIngredientsItemList);