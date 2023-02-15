import { useCallback, useEffect, useState } from 'react';
import styles from './App.module.css';
import { getIngredientData } from '../../utils/burger-api';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import Modal from '../Modal/Modal';
import OrderDetails from '../Modal/OrderDetails/OrderDetails';
import IngredientDetails from '../Modal/IngredientDetails/IngredientDetails';

const App = () => {
    // Application state
    const [state, setState] = useState({
        isLoading: false,
        hasError: false,
        data: []
    });

    // Burger Constructor state
    const [constructorItems, setConstructorItems] = useState([]);
    
    // Modal popups states
    const [orderModalState, setOrderModalState] = useState(false);
    const [ingredientInfoModalState, setIngredientInfoModalState] = useState({
        isVisible: false,
        item: null
    });

    // Open/Close Order modal popup functions
    const handleOpenOrderModal = useCallback(() => {
        setOrderModalState(true);
    }, []);

    const handleCloseOrderModal = useCallback((e) => {
        if (e !== undefined && e.key === 'Escape') {
            setOrderModalState(false);
            return;
        }
        setOrderModalState(false);
    }, []);
    
    // Open/Close Ingredient info modal popup functions
    const handleOpenIgredientInfoModal = useCallback((item) => {
        setIngredientInfoModalState({ isVisible: true, item: item });
    }, []);

    const handleCloseIgredientInfoModal = useCallback((e = undefined) => {
        if (e !== undefined && e.key === 'Escape') {
            setIngredientInfoModalState({ isVisible: false, item: null });
            return;
        }
        setIngredientInfoModalState({ isVisible: false, item: null });
    }, []);

    // Get ingredients when application starts
    useEffect(() => {
        setState({ ...state, isLoading: true, hasError: false });
        getIngredientData().then(data => {
            setState({ ...state, isLoading: false, data: data.data });
            setConstructorItems([data.data.find(item => item.type === 'bun'), data.data.find(item => item.type === 'main')]);
        });
    }, []);

    // Add ingredient to constructor
    /* const addConstructorItem = useCallback((item) => {
        item.type !== 'bun' && setConstructorItems([...constructorItems, item]);
        item.type === 'bun' && setConstructorItems([item, ...constructorItems.slice(1)]);
    }); */

    // Delete ingredient from constructor
    const deleteConstructorItem = useCallback((index) => {
        setConstructorItems(constructorItems.filter((i, itemIndex) => itemIndex !== index));
    });

    return (
        <div className={styles.App}>
            <AppHeader />
            {!state.isLoading && !state.hasError && state.data.length &&
                <section className={styles.Main}>
                    <BurgerIngredients data={state.data} constructorItems={constructorItems} onHandleOpenModal={handleOpenIgredientInfoModal} />
                    <BurgerConstructor constructorItems={constructorItems} onDeleteItem={deleteConstructorItem} onHandleCloseModal={handleOpenOrderModal} />
                </section>
            }
            {orderModalState &&
                (
                    <Modal onClose={handleCloseOrderModal}>
                        <OrderDetails orderNumber={Math.floor(Math.random() * 999999)} />
                    </Modal>
                )
            }
            {ingredientInfoModalState.isVisible &&
                (
                    <Modal onClose={handleCloseIgredientInfoModal}>
                        <IngredientDetails ingredientItem={ingredientInfoModalState.item} />
                    </Modal>
                )
            }
        </div>
    );
}

export default App;
