// Import React functions
import { memo, useMemo, useCallback } from 'react';
import styles from './BurgerConstructor.module.css';

// Import Redux functions
import { useSelector, useDispatch } from 'react-redux';
import { addConstructorItem } from '../../services/slices/ConstructorItemsSlice';
import { postOrder } from '../../services/slices/OrderSlice';

// Import DnD functions
import { useDrop } from 'react-dnd';
import uuid from 'react-uuid';

// Import Burger UI components
import {
    Button,
    ConstructorElement,
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

// Import UI components
import BurgerConstructorItemList from './BurgerConstructorItemList/BurgerConstructorItemList';

const BurgerConstructor = () => {
    const dispatch = useDispatch();

    // Get dropTargetRef
    const [, dropTargetRef] = useDrop({
        accept: 'ingredient',
        drop: (item) => {
            dispatch(addConstructorItem({ ...item, dragId: uuid() }));
        }
    });

    // Import data from store
    const constructorItems = useSelector((store) => store.constructorItems.items);
    const orderStatus = useSelector((store) => store.order.status);

    // Get bun from constructorItems array
    const bun = useMemo(() => {
        try {
            return constructorItems.find(item => item.type === 'bun');
        } catch {
            return null;
        }
    }, [constructorItems]);
    
    // Calculating total price of igredients
    const totalPrice = useMemo(() => {
        try {
            return constructorItems.reduce((acc, item) => acc + item.price, 0) + bun.price;
        } catch {
            return 0;
        }
    }, [constructorItems, bun]);

    // Handle post order functions
    const handlePostOrder = useCallback(() => {
        const ingredientsId = constructorItems.map(item => item._id);
        dispatch(postOrder(ingredientsId));
    }, [constructorItems, dispatch]);

    return (
        <div
            ref={dropTargetRef}
            className={`${styles.BurgerConstructor} ml-10 mt-25`}
        >
            {constructorItems.length ?
                (
                    <>
                        <section className={styles.BurgerSection}>
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={`${bun.name} (верх)`}
                                price={bun.price}
                                thumbnail={bun.image_mobile}
                                extraClass='ml-6'
                            />
                            {constructorItems.length > 1 && (
                                <BurgerConstructorItemList constructorItems={constructorItems} />
                            )}
                            
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={`${bun.name} (низ)`}
                                price={bun.price}
                                thumbnail={bun.image_mobile}
                                extraClass='ml-6'
                            />
                        </section>
                        <section className={`${styles.Total} mt-10`}>
                            <section className={`${styles.Price} mr-10`}>
                                <p className='text text_type_digits-medium'>
                                    {totalPrice}
                                </p>
                                <CurrencyIcon type='primary' />
                            </section>
                            <Button
                                htmlType='button'
                                type='primary'
                                size='medium'
                                extraClass='mr-4'
                                onClick={handlePostOrder}
                            >
                                {orderStatus === 'pending' ? `Оформляем Ваш заказ...` : `Оформить заказ` }
                            </Button>
                        </section>
                    </>
                ) : (
                    <span className={`text text_type_main-large ${styles.BurgerConstructorEmpty} ml-10`}>
                        Добавьте булку и полетели
                    </span>
                )
            }
            
        </div>
    );
};

export default memo(BurgerConstructor);