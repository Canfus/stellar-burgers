import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import ConstructorItemsSlice from './slices/constructor/ConstructorItemsSlice';
import IngredientsItemsSlice from './slices/ingredients/IngredientsItemsSlice';
import IngredientSlice from './slices/ingredient/IngredientSlice';
import OrderSlice from './slices/order/OrderSlice';
import UserSlice from './slices/user/UserSlice';

import { createSocketMiddleware } from './middlewares/socketMiddleware';
import socketSlice from './slices/socketSlice';
import { TwsActions } from '../utils/types';
import {
    websocketStartConnecting,
    websocketConnecting,
    websocketDisconnecting,
    webSocketError
} from './slices/socketSlice';

const wsActions: TwsActions = {
    websocketStartConnecting,
    websocketConnecting,
    websocketDisconnecting,
    webSocketError
}

const socketMiddleware = createSocketMiddleware(wsActions);

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