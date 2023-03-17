import { createSlice } from '@reduxjs/toolkit';

export const ConstructorItemsSlice = createSlice({
    name: 'constructorItems',
    initialState: {
        items: []
    },
    reducers: {
        addConstructorItem: (state, action) => {
            if (action.payload.type !== 'bun' && state.items.length) state.items = [...state.items, action.payload];
            if (action.payload.type === 'bun') state.items = [action.payload, ...state.items.slice(1)];
        },
        deleteConstructorItem: (state, action) => {
            state.items = state.items.filter((item) => item.dragId !== action.payload.dragId);
        },
        updateConstructorItems: (state, action) => {
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