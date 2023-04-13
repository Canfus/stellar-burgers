import { FC, memo } from 'react';

import { useAppDispatch } from '../hooks/hooks';
import { closeIngredientInfo } from '../services/slices/IngredientSlice';

import { Route, useNavigate, Routes } from 'react-router-dom';

import IngredientDetails from '../components/Modal/IngredientDetails/IngredientDetails';
import Modal from '../components/Modal/Modal';
import { closeOrderDetails } from '../services/slices/OrderSlice';
import OrderDetails from '../components/Modal/OrderDetails/OrderDetails';

interface ModalSwitchProps {
    background: any;
}


const ModalSwitch: FC<ModalSwitchProps> = ({ background }) => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const handleCloseModal = (): void => {
        dispatch(closeIngredientInfo());
        navigate(-1);
    }

    const handleCloseOrderDetails = (): void => {
        dispatch(closeOrderDetails());
        navigate(-1);
    }

    return (
        <>
            {background && (
                <Routes>
                    <Route
                        path='/ingredients/:ingredientId'
                        element={
                            <Modal onClose={handleCloseModal}>
                                <IngredientDetails />
                            </Modal>
                        }
                    />
                    <Route
                        path='/feed/:orderId'
                        element={
                            <Modal onClose={handleCloseOrderDetails}>
                                <OrderDetails />
                            </Modal>
                        }
                    />
                    <Route
                        path='/profile/orders/:orderId'
                        element={
                            <Modal onClose={handleCloseOrderDetails}>
                                <OrderDetails />
                            </Modal>
                        }
                    />
                </Routes>
            )}
        </>
    );
};

export default memo(ModalSwitch);