import { useCallback, useEffect, useState } from 'react';
import styles from './App.module.css';
import StellarBurgers from '../../utils/burger-api';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import Modal from '../Modal/Modal';
import OrderDetails from '../Modal/OrderDetails/OrderDetails';
import IngredientDetails from '../Modal/IngredientDetails/IngredientDetails';

const App = () => {
    const [state, setState] = useState({
        isLoading: false,
        hasError: false,
        data: []
    });

    const [constructorItems, setConstructorItems] = useState([]);

    const [orderModalState, setOrderModalState] = useState(false);
    const [ingredientInfoModalState, setIngredientInfoModalState] = useState({
        isVisible: false,
        item: null
    });

    const handleOpenOrderModal = useCallback(() => {
        setOrderModalState(true);
    }, []);

    const handleOpenIgredientInfoModal = useCallback((item) => {
        setIngredientInfoModalState({ isVisible: true, item: item });
    }, []);

    const handleCloseModal = useCallback(() => {
        setOrderModalState(false);
        setIngredientInfoModalState(false);
    }, []);
      
    const getIngredientData = () => {
        setState({ ...state, isLoading: true, hasError: false });
        fetch(`${StellarBurgers.BURGER_API_URL}/ingredients`)
            .then(res => checkResponse(res))
            .then(data => {
                setState({ ...state, isLoading: false, data: data.data });
                setConstructorItems([
                    data.data.find(item => item.type === 'bun'),
                    data.data.find(item => item.type === 'main')
                ]);
            });
        }

    const checkResponse = (res) => {
        return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
    }

      useEffect(() => {
        getIngredientData();
      }, []);

    const addConstructorItem = useCallback((item) => {
        item.type !== 'bun' && setConstructorItems([...constructorItems, item]);
        item.type === 'bun' && setConstructorItems([item, ...constructorItems.slice(1)]);
    });

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
                    <Modal onClose={handleCloseModal}>
                        <OrderDetails orderNumber={Math.floor(Math.random() * 999999)} />
                    </Modal>
                )
            }
            {ingredientInfoModalState.isVisible &&
                (
                    <Modal onClose={handleCloseModal}>
                        <IngredientDetails ingredientItem={ingredientInfoModalState.item} />
                    </Modal>
                )
            }
        </div>
    );
}

export default App;