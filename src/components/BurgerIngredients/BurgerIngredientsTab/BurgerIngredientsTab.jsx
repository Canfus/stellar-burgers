import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { memo, useState } from 'react';
import styles from './BurgerIngredientsTab.module.css';

const BurgerIngredientsTab = () => {
    // State of current Tab
    const [current, setCurrent] = useState('one');

    return (
        <div className={`${styles.BurgerIngredientsTab} mb-10`}>
            <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                Начинки
            </Tab>
        </div>
    );
};

export default memo(BurgerIngredientsTab);