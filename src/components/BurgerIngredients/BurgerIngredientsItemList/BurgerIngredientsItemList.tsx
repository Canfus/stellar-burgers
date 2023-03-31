import { FC, memo } from 'react';
import styles from './BurgerIngredientsItemList.module.css';

import BurgerIngredientsItem from '../BurgerIngredientsItem/BurgerIngredientsItem';

import { TIngredientItem } from '../../../utils/types';

interface BurgerIngredientsItemListProps {
    title: string;
    data: TIngredientItem[];
    refs: React.RefObject<HTMLParagraphElement[]>;
    index: number;
}

const BurgerIngredientsItemList: FC<BurgerIngredientsItemListProps> = (props) => {
    const { title, data, refs, index } = props;

    return (
        <div className={`${styles.BurgerIngredientsItemList}`}>
            <p id={index.toString()} ref={(item) => {refs.current![index] = item!}} className='text text_type_main-medium mb-6'>
                {title}
            </p>
            <section className={`${styles.IngredientsContainer} ml-4`}>
                {
                    data.map((item) => <BurgerIngredientsItem key={item._id} item={item} />)
                }
            </section>
        </div>
    );
};

export default memo(BurgerIngredientsItemList);