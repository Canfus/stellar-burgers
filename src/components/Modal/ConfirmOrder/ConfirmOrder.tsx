import {
    FC,
    memo,
    useMemo,
    useCallback
} from 'react';
import styles from './ConfirmOrder.module.css';

import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { closeOrderModal, postOrder } from '../../../services/slices/OrderSlice';
import { clearConstructorItems } from '../../../services/slices/ConstructorItemsSlice';

import {
    Button,
    CurrencyIcon,
    InfoIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

import ConfirmOrderItem from './ConfirmOrderItem/ConfirmOrderItem';

const ConfirmOrder: FC = () => {
    const dispatch = useAppDispatch();

    const constructorItems = useAppSelector((store) => store.constructorItems.items);

    const uniqueConstructorItems = useMemo(() => {
        const table: any = {};
        return constructorItems.filter(({ _id }) => (!table[_id] && (table[_id] = 1)));
    }, [constructorItems]);

    const bun = useMemo(() => {
        if (constructorItems) {
            return constructorItems.find(item => item.type === 'bun');
        }
    }, [constructorItems]);

    const totalPrice = useMemo<number>(() => {
        if (bun) {
            return constructorItems.reduce((acc, item) => acc + item.price, 0) + bun.price;
        }
        return 0;
    }, [constructorItems, bun]);

    const handlePostOrder = useCallback(() => {
        const ingredientsId = constructorItems.map(item => item._id);
        dispatch(postOrder(ingredientsId));
        // dispatch(clearConstructorItems());
    }, [constructorItems, dispatch]);

    const handleCloseModal = () => {
        dispatch(closeOrderModal());
    }

    return (
        <div className={styles.ConfirmOrder}>
            <header className={`${styles.ConfirmOrderHeader} ml-10 mt-15 mr-10`}>
                <InfoIcon type='primary' />
                <span className='text text_type_main-large ml-2'>
                    Проверим заказ
                </span>
            </header>
            <section className={`${styles.ConfirmOrderBody} mt-10 ml-15 mb-5`}>
                {uniqueConstructorItems.map((item, index) => (
                    <ConfirmOrderItem key={index} item={item} />
                ))}
            </section>
            <section className={`${styles.TotalPrice} mr-25 mb-5`}>
                <span className='text text_type_main-medium mr-1'>
                    Итого:
                </span>
                <span className='text text_type_digits-default mr-1'>
                    {totalPrice}
                </span>
                <CurrencyIcon type='primary' />
            </section>
            <section className={`${styles.ConfirmOrderButtons} mb-10 mr-20`}>
                <Button
                    htmlType='button'
                    type='secondary'
                    size='medium'
                    onClick={handleCloseModal}
                >
                    Отменить
                </Button>
                <Button
                    htmlType='button'
                    type='primary'
                    size='medium'
                    onClick={handlePostOrder}
                >
                    Оформить заказ
                </Button>
            </section>
        </div>
    );
};

export default memo(ConfirmOrder);