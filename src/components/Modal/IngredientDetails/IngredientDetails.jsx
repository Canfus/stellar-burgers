import { memo, useMemo } from 'react';

import styles from './IngredientDetails.module.css';

import { useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

const IngredientDetails = () => {
    const { ingredientId } = useParams();
    const ingredientsItems = useSelector((store) => store.ingredientsItems.items);

    const ingredientItem = useMemo(() => {
        return ingredientsItems.find(item => item._id === ingredientId);
    }, [ingredientId, ingredientsItems]);

    return (
        <>
            {ingredientItem && (
                <div className={styles.IngredientDetails}>
                    <header className={`${styles.IngredientHeader} ml-10 mt-15 mr-10`}>
                        <span className='text text_type_main-large'>
                            Детали ингредиента
                        </span>
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
            )}
        </>
    );
};

export default memo(IngredientDetails);
