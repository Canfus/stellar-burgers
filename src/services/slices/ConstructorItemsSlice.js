import { createSlice } from '@reduxjs/toolkit';

export const ConstructorItemsSlice = createSlice({
    name: 'constructorItems',
    initialState: {
        items: [
            {
                _id: "60d3b41abdacab0026a733c6",
                name: "Краторная булка N-200i",
                type: "bun",
                proteins: 80,
                fat: 24,
                carbohydrates: 53,
                calories: 420,
                price: 1255,
                image: "https://code.s3.yandex.net/react/code/bun-02.png",
                image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
                __v: 0,
                dragId: null
            }
        ]
    },
    reducers: {
        addConstructorItem: (state, action) => {
            if (action.payload.type !== 'bun') state.items = [...state.items, action.payload];
            if (action.payload.type === 'bun') state.items = [action.payload, ...state.items.slice(1)];
        },
        deleteConstructorItem: (state, action) => {
            state.items = state.items.filter((item) => item.dragId !== action.payload.dragId);
        },
        updateConstructorItems: (state, action) => {
            state.items = [state.items[0], ...action.payload];
        }
    }
});

export const { addConstructorItem, deleteConstructorItem, updateConstructorItems } = ConstructorItemsSlice.actions;
export default ConstructorItemsSlice.reducer;

