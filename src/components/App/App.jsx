// Import React functions
import { useCallback, useEffect, useState } from 'react';
import styles from './App.module.css';

// Import burger-api functions
import { getIngredientData } from '../../utils/burger-api';

// Import main components
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

// Import Modal dialogs
import Modal from '../Modal/Modal';
import OrderDetails from '../Modal/OrderDetails/OrderDetails';
import IngredientDetails from '../Modal/IngredientDetails/IngredientDetails';

// Import contexts
import { AppContext } from '../../context/AppContext';
import { ConstructorContext } from '../../context/ConstructorContext';
import { OrderContext } from '../../context/OrderContext';

const App = () => {
    // Application state
    const [state, setState] = useState({
        isLoading: false,
        hasError: false,
        data: []
    });

    // Burger Constructor state
    const constructorItemsState = useState([]);

    // Get ingredients when application starts
    useEffect(() => {
        setState({ ...state, isLoading: true, hasError: false });
        getIngredientData().then(data => {
            setState({ ...state, isLoading: false, data: data.data });
            constructorItemsState[1]([data.data.find(item => item.type === 'bun')]);
        });
    }, []);

    // Modal popups 
    const [orderState, setOrderState] = useState(0);
    const [ingredientInfoModalState, setIngredientInfoModalState] = useState({
        isVisible: false,
        item: null
    });

    // Close Order modal popup functions
    const handleCloseOrderModal = useCallback(() => {
        setOrderState(0);
    }, [setOrderState]);

    // Close Ingredient info modal popup functions
    const handleCloseIgredientInfoModal = useCallback(() => {
        setIngredientInfoModalState({ isVisible: false, item: null });
    }, [setIngredientInfoModalState]);

    return (
        <div className={styles.App}>
            <AppContext.Provider value={state.data}>
                <ConstructorContext.Provider value={constructorItemsState}>
                    <AppHeader />
                    {!state.isLoading && !state.hasError && state.data.length &&
                        <section className={styles.Main}>
                            <BurgerIngredients setIngredientInfoModalState={setIngredientInfoModalState} />
                            <BurgerConstructor
                                setOrderState={setOrderState}
                            />
                        </section>
                    }
                    {orderState > 0 &&
                        (
                            <OrderContext.Provider value={orderState}>
                                <Modal onClose={handleCloseOrderModal}>
                                    <OrderDetails />
                                </Modal>
                            </OrderContext.Provider>
                        )
                    }
                    {ingredientInfoModalState.isVisible &&
                        (
                            <Modal onClose={handleCloseIgredientInfoModal}>
                                <IngredientDetails ingredientItem={ingredientInfoModalState.item} />
                            </Modal>
                        )
                    }
                </ConstructorContext.Provider>
            </AppContext.Provider>
        </div>
    );
}

export default App;
