import { FC, memo } from 'react';
import styles from './BurgerConstructorItemList.module.css';

import { useAppDispatch } from '../../../hooks/hooks';
import { updateConstructorItems } from '../../../services/slices/ConstructorItemsSlice';

import { Reorder } from 'framer-motion';

import { TIngredientItem } from '../../../utils/types';

import BurgerConstructorItem from '../BurgerConstructorItem/BurgerConstructorItem';

interface BurgerConstructorItemListProps {
    constructorItems: TIngredientItem[];
}

const BurgerConstructorItemList: FC<BurgerConstructorItemListProps> = ({ constructorItems }) => {
    const dispatch = useAppDispatch();

    const update = (newList: TIngredientItem[]) => {
        dispatch(updateConstructorItems(newList));
    }

    return (
        <Reorder.Group
            axis='y'
            as='section'
            onReorder={(newList) => update(newList)}
            values={constructorItems}
            className={styles.BurgerConstructorItemList}
        >
            {
                constructorItems.map((item) => item.type !== 'bun' && (
                    <BurgerConstructorItem key={item.dragId} item={item} />
                ))
            }
        </Reorder.Group>
    );
};

export default memo(BurgerConstructorItemList);