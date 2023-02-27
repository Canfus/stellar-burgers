import { createSlice } from '@reduxjs/toolkit';

export const IngredientSlice = createSlice({
    name: 'ingredientSlice',
    initialState: {
        status: 'hidden',
        item: null
    },
    reducers: {
        showIngredientInfo: (state, action) => {
            state.status = 'visible';
            state.item = action.payload;
        },
        closeIngredientInfo: (state) => {
            state.status = 'hidden';
            state.item = null;
        }
    }
});

export const { showIngredientInfo, closeIngredientInfo } = IngredientSlice.actions;
export default IngredientSlice.reducer;