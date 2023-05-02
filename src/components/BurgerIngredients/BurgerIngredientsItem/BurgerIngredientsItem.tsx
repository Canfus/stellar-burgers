import {
    FC,
    memo,
    useMemo,
    useCallback
} from 'react';

import styles from './BurgerIngredientsItem.module.css';

import { useAppSelector, useAppDispatch } from '../../../hooks/hooks';
import { showIngredientInfo } from '../../../services/slices/ingredient/IngredientSlice';

import { useDrag } from 'react-dnd';

import { TIngredientItem } from '../../../utils/types';

import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';

interface BurgerIngredientsItemProps {
    item: TIngredientItem;
}

const BurgerIngredientsItem: FC<BurgerIngredientsItemProps> = ({ item }) => {
    const location = useLocation();

    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: { ...item }
    });

    const dispatch = useAppDispatch();

    const constructorItems = useAppSelector((store) => store.constructorItems.items);

    const count = useMemo<number>(() => {
        return constructorItems.filter(i => i._id === item._id).length;
    }, [constructorItems, item._id]);

    const handleOpenIgredientInfoModal = useCallback(() => {
        dispatch(showIngredientInfo());
    }, [dispatch]);

    return (
        <Link
            className={styles.Link}
            to={`/ingredients/${item._id}`}
            state={{ background: location }}
            test-id={'ingredient-item'}
        >
            <div
                ref={dragRef}
                className={`${styles.BurgerIngredientsItem} mb-8`}
                onClick={handleOpenIgredientInfoModal}
            >
                <img src={item.image} alt="bun" className={styles.BurgerImage} />
                {count > 0 && <Counter count={count} size='default' extraClass='m-1' />}
                <p className={`text text_type_digits-default m-1 ${styles.Price}`}>
                    {item.price}
                    <CurrencyIcon type='primary' />
                </p>
                <p className='text text_type_main-default mb-4'>
                    {item.name}
                </p>
            </div>
        </Link>
    );
};

export default memo(BurgerIngredientsItem);