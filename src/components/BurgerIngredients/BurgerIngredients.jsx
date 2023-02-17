// Import React functions
import { memo, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './BurgerIngredients.module.css';

// Import Burger UI components
import BurgerIngredientsItemList from './BurgerIngredientsItemList/BurgerIngredientsItemList';
import BurgerIngredientsTab from './BurgerIngredientsTab/BurgerIngredientsTab';

// Import contexts
import { AppContext } from '../../context/AppContext';

const BurgerIngredients = (props) => {
    const { onHandleOpenModal } = props;

    // Import data from context
    const data = useContext(AppContext);

    // Sort ingredients by type
    const buns = useMemo(() => data.filter(item => item.type === 'bun'), [data]);
    const mains = useMemo(() => data.filter(item => item.type === 'main'), [data]);
    const sauces = useMemo(() => data.filter(item => item.type === 'sauce'), [data]);
    
    return (
        <div className={`${styles.BurgerIngredients} mt-10`}>
            <p className='text text_type_main-large mb-5'>
                Соберите бургер
            </p>
            <BurgerIngredientsTab />
            <section className={styles.BurgerIngredientsContainer}>
                <BurgerIngredientsItemList title='Булки' data={buns} onHandleOpenModal={onHandleOpenModal} />
                <BurgerIngredientsItemList title='Соусы' data={sauces} onHandleOpenModal={onHandleOpenModal} />
                <BurgerIngredientsItemList title='Начинки' data={mains} onHandleOpenModal={onHandleOpenModal} />
            </section>
        </div>
    );
};

BurgerIngredients.propTypes = {
    onHandleOpenModal: PropTypes.func.isRequired
}

export default memo(BurgerIngredients);

