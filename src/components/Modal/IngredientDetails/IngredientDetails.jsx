import { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './IngredientDetails.module.css';
import IngredientItem from '../../../utils/types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const IngredientDetails = (props) => {
    const { ingredientItem, onClose } = props;

    return (
        <div className={styles.IngredientDetails}>
            <header className={`${styles.IngredientHeader} ml-10 mt-10 mr-10`}>
                <span className='text text_type_main-large'>
                    Детали ингредиента
                </span>
                <CloseIcon type='primary' onClick={onClose} />
            </header>
            <img src={ingredientItem.image_large} alt="ingredient_image" />
            <span className={`text text_type_main-medium ${styles.IngredientTitle} mt-4 mb-8`}>{ingredientItem.name}</span>
            <section className={`${styles.IngredientDetailsItemList} mb-15`}>
                <section className={styles.IngredientDetailsItem}>
                    <span className='text text_type_main-small text_color_inactive'>
                        Калории, ккал
                    </span>
                    <span className='text text_type_digits-default text_color_inactive'>
                        {ingredientItem.calories}
                    </span>
                </section>
                <section className={styles.IngredientDetailsItem}>
                    <span className='text text_type_main-small text_color_inactive'>
                        Белки, г
                    </span>
                    <span className='text text_type_digits-default text_color_inactive'>
                        {ingredientItem.proteins}
                    </span>
                </section>
                <section className={styles.IngredientDetailsItem}>
                    <span className='text text_type_main-small text_color_inactive'>
                        Жиры, г
                    </span>
                    <span className='text text_type_digits-default text_color_inactive'>
                        {ingredientItem.fat}
                    </span>
                </section>
                <section className={styles.IngredientDetailsItem}>
                    <span className='text text_type_main-small text_color_inactive'>
                        Углеводы, г
                    </span>
                    <span className='text text_type_digits-default text_color_inactive'>
                        {ingredientItem.carbohydrates}
                    </span>
                </section>
            </section>
        </div>
    );
};

IngredientDetails.propTypes = {
    ingredientItem: IngredientItem.isRequired,
    onClose: PropTypes.func.isRequired
};

export default memo(IngredientDetails);
