// Import React functions
import { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './BurgerIngredientsTab.module.css';

// Import Burger UI components
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIngredientsTab = ({ currentCategory, setCategory }) => {
    return (
        <div className={`${styles.BurgerIngredientsTab} mb-10`}>
            <Tab value={0} active={currentCategory === 0} onClick={setCategory}>
                Булки
            </Tab>
            <Tab value={1} active={currentCategory === 1} onClick={setCategory}>
                Соусы
            </Tab>
            <Tab value={2} active={currentCategory === 2} onClick={setCategory}>
                Начинки
            </Tab>
        </div>
    );
};

BurgerIngredientsTab.propTypes = {
    currentCategory: PropTypes.number.isRequired,
    setCategory: PropTypes.func.isRequired
}

export default memo(BurgerIngredientsTab);