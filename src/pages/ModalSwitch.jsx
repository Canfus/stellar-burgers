import { memo } from 'react';

import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { closeIngredientInfo } from '../services/slices/IngredientSlice';

import { Route, useNavigate, Routes } from 'react-router-dom';

import IngredientDetails from '../components/Modal/IngredientDetails/IngredientDetails';
import Modal from '../components/Modal/Modal';


const ModalSwitch = ({ background }) => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleCloseModal = () => {
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

ModalSwitch.propTypes = {
    background: PropTypes.bool.isRequired
};

export default memo(ModalSwitch);