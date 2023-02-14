import { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './BurgerIngredients.module.css';
import BurgerIngredientsItemList from './BurgerIngredientsItemList/BurgerIngredientsItemList';
import BurgerIngredientsTab from './BurgerIngredientsTab/BurgerIngredientsTab';
import IngredientItem from '../../utils/types';

const BurgerIngredients = (props) => {
    const { data, constructorItems, onHandleOpenModal } = props;

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
                <BurgerIngredientsItemList title='Булки' data={buns} constructorItems={constructorItems} onHandleOpenModal={onHandleOpenModal} />
                <BurgerIngredientsItemList title='Соусы' data={sauces} constructorItems={constructorItems} onHandleOpenModal={onHandleOpenModal} />
                <BurgerIngredientsItemList title='Начинки' data={mains} constructorItems={constructorItems} onHandleOpenModal={onHandleOpenModal} />
            </section>
        </div>
    );
};

BurgerIngredients.propTypes = {
    data: PropTypes.array.isRequired,
    constructorItems: PropTypes.arrayOf(IngredientItem.isRequired).isRequired,
    onHandleOpenModal: PropTypes.func.isRequired
}

export default memo(BurgerIngredients);

