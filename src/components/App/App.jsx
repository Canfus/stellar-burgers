// Import React functions
import { useCallback, useEffect } from 'react';
import styles from './App.module.css';

// Import Redux functions
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../services/slices/IngredientsItemsSlice';

// Import main components
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

// Import Modal dialogs
import Modal from '../Modal/Modal';
import OrderDetails from '../Modal/OrderDetails/OrderDetails';
import IngredientDetails from '../Modal/IngredientDetails/IngredientDetails';

// Import Redux functions
import { closeOrderModal } from '../../services/slices/OrderSlice';
import { closeIngredientInfo } from '../../services/slices/IngredientSlice';

// Import DnD
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App = () => {
    // Import data from store
    const state = useSelector((store) => store.ingredientsItems);
    const orderInfo = useSelector((store) => store.order);
    const ingredientInfo = useSelector((store) => store.ingredientInfo);

    // Initialize dispatcher
    const dispatch = useDispatch();

    // Get ingredients when application starts
    useEffect(() => {
        dispatch(fetchData());
    }, []);

    // Close Order modal popup functions
    const handleCloseOrderModal = useCallback(() => {
        dispatch(closeOrderModal());
    }, [dispatch]);

    // Close Ingredient info modal popup functions
    const handleCloseIgredientInfoModal = useCallback(() => {
        dispatch(closeIngredientInfo());
    }, [dispatch]);

    return (
        <div className={styles.App}>
            <AppHeader />
            {state.status === 'ok' && !state.error && state.items.length &&
                <main className={styles.Main}>
                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </DndProvider>
                </main>
            }
            {orderInfo.status === 'visible' &&
                (
                    <Modal onClose={handleCloseOrderModal}>
                        <OrderDetails />
                    </Modal>
                )
            }
            {ingredientInfo.status === 'visible' &&
                (
                    <Modal onClose={handleCloseIgredientInfoModal}>
                        <IngredientDetails ingredientItem={ingredientInfo.item} />
                    </Modal>
                )
            }
        </div>
    );
}

export default App;
