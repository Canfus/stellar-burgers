// Import React functions
import { memo, useEffect, useMemo, useRef, useState } from 'react';
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

    const [currentCategory, setCurrentCategory] = useState(0);

    const scrollArea = useRef(null);
    const refs = useRef([]);

    const setCategory = (index) => {
        refs.current[index].scrollIntoView({ block: 'start', behavior: 'smooth' });
        setCurrentCategory(Number(index));
    }

    useEffect(() => {
        const headers = {};

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                headers[entry.target.id] = entry.isIntersecting;
            });
            for (const header in headers) {
                if (headers[header]) {
                    setCategory(header);
                    break;
                }
            }
        }, { root: scrollArea.current });

        refs.current.forEach(element => {
            observer.observe(element);
        });

        return () => observer.disconnect();
    }, [refs]);

    return (
        <div className={`${styles.BurgerIngredients} mt-10`}>
            <p className='text text_type_main-large mb-5'>
                Соберите бургер
            </p>
            <BurgerIngredientsTab currentCategory={currentCategory} setCategory={setCategory} />
            <section ref={scrollArea} className={styles.BurgerIngredientsContainer}>
                <BurgerIngredientsItemList index={0} refs={refs} title='Булки' data={buns} />
                <BurgerIngredientsItemList index={1} refs={refs} title='Соусы' data={sauces} />
                <BurgerIngredientsItemList index={2} refs={refs} title='Начинки' data={mains} />
            </section>
        </div>
    );
};

export default memo(BurgerIngredients);