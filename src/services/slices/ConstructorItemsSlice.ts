import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredientItem } from '../../utils/types';

type TConstructorItemsState = {
    items: TIngredientItem[]
};

const initialState: TConstructorItemsState = {
    items: []
};

export const ConstructorItemsSlice = createSlice({
    name: 'constructorItems',
    initialState,
    reducers: {
        addConstructorItem: (state, action: PayloadAction<TIngredientItem>) => {
            if (action.payload.type !== 'bun' && state.items.length) state.items = [...state.items, action.payload];
            if (action.payload.type === 'bun') state.items = [action.payload, ...state.items.slice(1)];
        },
        deleteConstructorItem: (state, action: PayloadAction<TIngredientItem>) => {
            state.items = state.items.filter((item) => item.dragId !== action.payload.dragId);
        },
        updateConstructorItems: (state, action: PayloadAction<TIngredientItem[]>) => {
            state.items = [state.items[0], ...action.payload];
        },
        clearConstructorItems: (state) => {
            state.items = [];
        }
    }
});

export const {
    addConstructorItem,
    deleteConstructorItem,
    updateConstructorItems,
    clearConstructorItems
} = ConstructorItemsSlice.actions;
export default ConstructorItemsSlice.reducer;