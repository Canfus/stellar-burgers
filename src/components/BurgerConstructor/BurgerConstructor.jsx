import { memo, useMemo, useCallback } from 'react';
import styles from './BurgerConstructor.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { addConstructorItem, clearConstructorItems } from '../../services/slices/ConstructorItemsSlice';
import { openOrderModal, postOrder } from '../../services/slices/OrderSlice';

import { useDrop } from 'react-dnd';
import uuid from 'react-uuid';

import {
    Button,
    ConstructorElement,
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerConstructorItemList from './BurgerConstructorItemList/BurgerConstructorItemList';

import { useNavigate } from 'react-router-dom';

const BurgerConstructor = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [, dropTargetRef] = useDrop({
        accept: 'ingredient',
        drop: (item) => {
            dispatch(addConstructorItem({ ...item, dragId: uuid() }));
        }
    });

    const constructorItems = useSelector((store) => store.constructorItems.items);
    const order = useSelector((store) => store.order);
    const userData = useSelector((store) => store.userSlice);

    const bun = useMemo(() => {
        try {
            return constructorItems.find(item => item.type === 'bun');
        } catch {
            return null;
        }
    }, [constructorItems]);
    
    const totalPrice = useMemo(() => {
        try {
            return constructorItems.reduce((acc, item) => acc + item.price, 0) + bun.price;
        } catch {
            return 0;
        }
    }, [constructorItems, bun]);

    const handlePostOrder = useCallback(() => {
        const ingredientsId = constructorItems.map(item => item._id);
        dispatch(postOrder(ingredientsId));
        dispatch(clearConstructorItems());
    }, [constructorItems, dispatch]);

    const handleCheckOrder = useCallback(() => {
        if (!userData.isLoggedIn) {
            navigate('/login', { replace: true });
            return;
        }
        dispatch(openOrderModal());
    }, [userData, dispatch, navigate]);

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
                                onClick={handleCheckOrder}
                            >
                                {order === 'pending' ? `Оформляем Ваш заказ...` : `Оформить заказ` }
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