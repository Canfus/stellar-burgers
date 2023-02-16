// Import React functions
import { useCallback, useEffect, useState } from 'react';
import styles from './App.module.css';

// Import burger-api functions
import { getIngredientData, postIngredients } from '../../utils/burger-api';

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
        handlePostOrder(constructorItems);
    }, []);

    const handleCloseOrderModal = useCallback(() => {
        setOrderModalState(false);
    }, []);
    
    // Open/Close Ingredient info modal popup functions
    const handleOpenIgredientInfoModal = useCallback((item) => {
        setIngredientInfoModalState({ isVisible: true, item: item });
    }, []);

    const handleCloseIgredientInfoModal = useCallback(() => {
        setIngredientInfoModalState({ isVisible: false, item: null });
    }, []);

    // Get ingredients when application starts
    useEffect(() => {
        setState({ ...state, isLoading: true, hasError: false });
        getIngredientData().then(data => {
            setState({ ...state, isLoading: false, data: data.data });
            setConstructorItems([data.data.find(item => item.type === 'bun')]);
        });
    }, []);

    // Add ingredient to constructor
    const addConstructorItem = useCallback((item) => {
        item.type !== 'bun' && setConstructorItems([...constructorItems, item]);
        item.type === 'bun' && setConstructorItems([item, ...constructorItems.slice(1)]);
        console.log(constructorItems);
    });

    // Delete ingredient from constructor
    const deleteConstructorItem = useCallback((index) => {
        setConstructorItems(constructorItems.filter((i, itemIndex) => itemIndex !== index));
    });

    const handlePostOrder = () => {
        let ingredientsId = [];
        console.log(constructorItems);
        constructorItems.forEach(item => {
            ingredientsId.push(item._id);
        });
        postIngredients(ingredientsId).then(data => {
            console.log(data);
        });
    }

    return (
        <div className={styles.App}>
            <AppContext.Provider value={state.data}>
                <ConstructorContext.Provider value={constructorItems}>
                    <AppHeader />
                    {!state.isLoading && !state.hasError && state.data.length &&
                        <section className={styles.Main}>
                            <BurgerIngredients onHandleOpenModal={addConstructorItem} />
                            <BurgerConstructor
                                onDeleteItem={deleteConstructorItem}
                                onHandleOpenModal={handleOpenOrderModal}
                            />
                        </section>
                    }
                    {orderModalState &&
                        (
                            <Modal onClose={handleCloseOrderModal}>
                                <OrderDetails orderNumber={123456} />
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
                </ConstructorContext.Provider>
            </AppContext.Provider>
        </div>
    );
}

export default App;
