import { FC, memo, useMemo } from 'react';

import { useAppSelector } from '../../../hooks/hooks';

import styles from './OrderItem.module.css';

import { TIngredientItem, TOrder } from '../../../utils/types';

import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

interface OrderItemProps {
    order: TOrder;
}

const OrderItem: FC<OrderItemProps> = ({ order }) => {
    const ingredientsStore = useAppSelector(store => store.ingredientsItems.items);

    const ingredients = useMemo(() => {
        const ingredients: TIngredientItem[] = [];
        order.ingredients.forEach((ingredientId: string) => {
            ingredients.push(ingredientsStore.find(ingredient => ingredient._id === ingredientId) as TIngredientItem);
        });
        return ingredients;
    }, [order, ingredientsStore]);

    const totalPrice = useMemo<number>(() => {
        return ingredients.reduce((acc, { price }) => acc + price, 0);
    }, [ingredients]);

    const zIndex = 6;

    return (
        <div className={`${styles.OrderItem} p-6 mb-4 mr-2`}>
            <section className={`${styles.OrderInfo} mb-6`}>
                <p className='text text_type_digits-default'>
                    {`#${order.number}`}
                </p>
                <p className='text text_type_main-default text_color_inactive'>
                    <FormattedDate date={new Date(order.createdAt)} />
                </p>
            </section>
            <p className='text text_type_main-medium mb-6'>
                {order.name}
            </p>
            <section className={styles.OrderIngredients}>
                <section className={styles.IngredientsContainer}>
                    {ingredients.slice(0, 6).map((ingredient: TIngredientItem, index: number) => (
                        <div key={index} style={{ left: -(20 * index), zIndex: zIndex - index }} className={styles.IngredientImage}>
                            <div className={styles.IngredientImageOverlay}>
                                {(order.ingredients.length > 6 && zIndex - index === 1) && (
                                    <section className={styles.IngredientsCount}>
                                        <p className='text text_type_digits-default'>
                                            {`+${order.ingredients.length - 6}`}
                                        </p>
                                    </section>
                                )}
                                <img src={ingredient.image_mobile} alt='ingredient' />
                            </div>
                        </div>
                    ))}
                </section>
                <section className={styles.TotalPrice}>
                    <p className='text text_type_digits-default'>
                        {totalPrice}
                    </p>
                    <CurrencyIcon type='primary' />
                </section>
            </section>
        </div>
    );
};

export default memo(OrderItem);