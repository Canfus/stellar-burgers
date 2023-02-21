// Import React functions
import { memo, useMemo } from 'react';
import styles from './BurgerIngredients.module.css';

// Import Redux functions
import { useSelector } from 'react-redux';

// Import Burger UI components
import BurgerIngredientsItemList from './BurgerIngredientsItemList/BurgerIngredientsItemList';
import BurgerIngredientsTab from './BurgerIngredientsTab/BurgerIngredientsTab';

const BurgerIngredients = () => {

    // Import data from store
    const data = useSelector((store) => store.ingredientsItems.items);

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
                <BurgerIngredientsItemList title='Булки' data={buns} />
                <BurgerIngredientsItemList title='Соусы' data={sauces} />
                <BurgerIngredientsItemList title='Начинки' data={mains} />
            </section>
        </div>
    );
};

export default memo(BurgerIngredients);

