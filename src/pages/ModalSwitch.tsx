import { FC, memo } from 'react';

import { useAppDispatch } from '../hooks/hooks';
import { closeIngredientInfo } from '../services/slices/IngredientSlice';

import { Route, useNavigate, Routes } from 'react-router-dom';

import IngredientDetails from '../components/Modal/IngredientDetails/IngredientDetails';
import Modal from '../components/Modal/Modal';

interface ModalSwitchProps {
    background: boolean;
}


const ModalSwitch: FC<ModalSwitchProps> = ({ background }) => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const handleCloseModal = (): void => {
        dispatch(closeIngredientInfo());
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
                </Routes>
            )}
        </>
    );
};

export default memo(ModalSwitch);