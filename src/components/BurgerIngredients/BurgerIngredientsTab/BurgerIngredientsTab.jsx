// Import React functions
import { memo, useState } from 'react';
import styles from './BurgerIngredientsTab.module.css';

// Import Burger UI components
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIngredientsTab = () => {
    // State of current Tab
    const [currentCategory, setCurrentCategory] = useState('one');

    return (
        <div className={`${styles.BurgerIngredientsTab} mb-10`}>
            <Tab value="one" active={currentCategory === 'one'} onClick={setCurrentCategory}>
                Булки
            </Tab>
            <Tab value="two" active={currentCategory === 'two'} onClick={setCurrentCategory}>
                Соусы
            </Tab>
            <Tab value="three" active={currentCategory === 'three'} onClick={setCurrentCategory}>
                Начинки
            </Tab>
        </div>
    );
};

export default memo(BurgerIngredientsTab);