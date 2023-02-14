import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, memo, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './BurgerConstructor.module.css';
import IngredientItem from '../../utils/types';
 
const BurgerConstructor = (props) => {
    const { constructorItems, onDeleteItem, onHandleCloseModal } = props;

    const bun = constructorItems.find(item => item.type === 'bun');
    
    const totalPrice = useMemo(() => {
        return constructorItems.reduce((acc, item) => acc + item.price, 0) + bun.price;
    }, [constructorItems, bun.price]);

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
                                    handleClose={() => onDeleteItem(index)}
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
                    onClick={onHandleCloseModal}
                >
                    Оформить заказ
                </Button>
            </section>
        </div>
    );
};

BurgerConstructor.propTypes = {
    constructorItems: PropTypes.arrayOf(IngredientItem.isRequired).isRequired,
    onDeleteItem: PropTypes.func.isRequired,
    onHandleCloseModal: PropTypes.func.isRequired
}

export default memo(BurgerConstructor);