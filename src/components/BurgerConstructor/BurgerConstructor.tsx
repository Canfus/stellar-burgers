import {
    FC,
    memo,
    useMemo,
    useCallback
} from 'react';
import styles from './BurgerConstructor.module.css';

import { TIngredientItem } from '../../utils/types';

import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
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

const BurgerConstructor: FC = () => {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const [, dropTargetRef] = useDrop({
        accept: 'ingredient',
        drop: (item: TIngredientItem) => {
            dispatch(addConstructorItem({ ...item, dragId: uuid() }));
        }
    });

    const constructorItems = useAppSelector((store) => store.constructorItems.items);
    const order = useAppSelector((store) => store.order.status);
    const userData = useAppSelector((store) => store.userSlice);

    const bun = useMemo(() => {
        if (constructorItems) {
            return constructorItems.find(item => item.type === 'bun')!;
        }
    }, [constructorItems]);

    const totalPrice = useMemo<number>(() => {
        if (bun) {
            return constructorItems.reduce((acc, item) => acc + item.price, 0) + bun.price;
        }
        return 0;
    }, [constructorItems, bun]);

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
                            {bun && (
                                <>
                                    <ConstructorElement
                                        type="top"
                                        isLocked={true}
                                        text={`${bun.name} (верх)`}
                                        price={bun.price}
                                        thumbnail={bun.image_mobile}
                                        extraClass='ml-6'
                                    />
                                </>
                            )}
                            {constructorItems.length > 1 && (
                                <BurgerConstructorItemList constructorItems={constructorItems} />
                            )}
                            {bun && (
                                <>
                                    <ConstructorElement
                                        type="bottom"
                                        isLocked={true}
                                        text={`${bun.name} (низ)`}
                                        price={bun.price}
                                        thumbnail={bun.image_mobile}
                                        extraClass='ml-6'
                                    />
                                </>
                            )}
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
                                {order === 'pending' ? `Оформляем Ваш заказ...` : `Оформить заказ`}
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