import { useCallback } from 'react';
import styles from './MainPage.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { closeOrderModal } from '../../services/slices/OrderSlice';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import AppHeader from '../../components/AppHeader/AppHeader';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';

import Modal from '../../components/Modal/Modal';
import OrderDetails from '../../components/Modal/OrderDetails/OrderDetails';
import OrderError from '../../components/Modal/OrderError/OrderError';
import OrderPending from '../../components/Modal/OrderPending/OrderPending';
import ConfirmOrder from '../../components/Modal/ConfirmOrder/ConfirmOrder';


const MainPage = () => {
    const state = useSelector((store) => store.ingredientsItems);
    const orderInfo = useSelector((store) => store.order);

    const dispatch = useDispatch();

    const handleCloseOrderModal = useCallback(() => {
        dispatch(closeOrderModal());
    }, [dispatch]);


    return (
        <div className={styles.MainPage}>
            {state.status === 'ok' && !state.error && state.items.length &&
                <main className={styles.Main}>
                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </DndProvider>
                </main>
            }
            {orderInfo.confirmStatus === 'visible' && (
                <Modal onClose={handleCloseOrderModal}>
                    <ConfirmOrder />
                </Modal>
            )}
            {orderInfo.status === 'visible' && (
                <Modal onClose={handleCloseOrderModal}>
                    <OrderDetails />
                </Modal>
            )}
            {orderInfo.status === 'pending' && (
                <Modal onClose={handleCloseOrderModal}>
                    <OrderPending />
                </Modal>
            )}
            {orderInfo.status === 'error' && (
                <Modal onClose={handleCloseOrderModal}>
                    <OrderError message={orderInfo.error} />
                </Modal>
            )}
            {state.status === 'error' && (
                <Modal onClose={handleCloseOrderModal}>
                    <OrderError message={state.error} />
                </Modal>
            )}
        </div>
    );
}

export default MainPage;
