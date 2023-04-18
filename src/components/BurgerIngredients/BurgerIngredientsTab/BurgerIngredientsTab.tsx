import { FC, memo } from 'react';
import styles from './BurgerIngredientsTab.module.css';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

interface BurgerIngredientsTabProps {
    currentCategory: number;
    scrollCategory: (index: number) => void;
}

const BurgerIngredientsTab: FC<BurgerIngredientsTabProps> = ({ currentCategory, scrollCategory }) => {
    return (
        <div className={`${styles.BurgerIngredientsTab} mb-10`}>
            <Tab value={'0'} active={currentCategory === 0} onClick={() => scrollCategory(0)}>
                Булки
            </Tab>
            <Tab value={'1'} active={currentCategory === 1} onClick={() => scrollCategory(1)}>
                Соусы
            </Tab>
            <Tab value={'2'} active={currentCategory === 2} onClick={() => scrollCategory(2)}>
                Начинки
            </Tab>
        </div>
    );
};

export default memo(BurgerIngredientsTab);