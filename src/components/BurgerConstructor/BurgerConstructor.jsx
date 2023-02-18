// Import React functions
import { memo, useContext, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './BurgerConstructor.module.css';

// Import burger-api functions
import { postIngredients } from '../../utils/burger-api';

// Import Burger UI components
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

// Import contexts
import { ConstructorContext } from '../../context/ConstructorContext';
 

const BurgerConstructor = (props) => {
    const { setOrderState } = props;

    // Import data from context
    const [constructorItems, setConstructorItems] = useContext(ConstructorContext);

    // Get bun from constructorItems array
    const bun = useMemo(() => {
        return constructorItems.find(item => item.type === 'bun');
    }, [constructorItems]);
    
    // Calculating total price of igredients
    const totalPrice = useMemo(() => {
        return constructorItems.reduce((acc, item) => acc + item.price, 0) + bun.price;
    }, [constructorItems]);

    // Open/Close Order modal popup functions
    const handleSetOrder = useCallback(() => {
        handlePostOrder(constructorItems);
    }, [constructorItems]);

    const handlePostOrder = () => {
        const ingredientsId = constructorItems.map(item => item._id);
        postIngredients({ ingredients: ingredientsId }).then(data => {
            setOrderState(data.order.number);
        });
    }

    // Delete ingredient from constructor
    const deleteConstructorItem = useCallback((index) => {
        setConstructorItems(constructorItems.filter((i, itemIndex) => itemIndex !== index));
    }, [constructorItems, setConstructorItems]);

    return (
        <div className={`${styles.BurgerConstructor} ml-10 mt-25`}>
            <section className={styles.BurgerSection}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image_mobile}
                    extraClass='ml-6'
                />
                <div className={styles.BurgerConstructorItemList}>
                    {
                        constructorItems.map((item, index) => item.type !== 'bun' && (
                            <section key={Math.random()}>
                                <DragIcon type='primary' />
                                <ConstructorElement
                                    text={item.name}
                                    price={item.price}
                                    thumbnail={item.image_mobile}
                                    extraClass={`${styles.Item}`}
                                    handleClose={() => deleteConstructorItem(index)}
                                />
                            </section>
                        ))
                    }
                </div>
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
                    onClick={handleSetOrder}
                >
                    Оформить заказ
                </Button>
            </section>
        </div>
    );
};

BurgerConstructor.propTypes = {
    setOrderState: PropTypes.func.isRequired
}

export default memo(BurgerConstructor);