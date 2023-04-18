import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import ConstructorItemsSlice from './slices/ConstructorItemsSlice';
import IngredientsItemsSlice from './slices/IngredientsItemsSlice';
import IngredientSlice from './slices/IngredientSlice';
import OrderSlice from './slices/OrderSlice';
import UserSlice from './slices/UserSlice';

import { socketMiddleware } from './middlewares/socketMiddleware';
import socketSlice from './slices/socketSlice';

const store = configureStore({
    reducer: {
        constructorItems: ConstructorItemsSlice,
        ingredientsItems: IngredientsItemsSlice,
        order: OrderSlice,
        ingredientInfo: IngredientSlice,
        userSlice: UserSlice,
        socket: socketSlice
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(socketMiddleware)
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;