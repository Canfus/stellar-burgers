import { createSlice } from '@reduxjs/toolkit';

export const IngredientSlice = createSlice({
    name: 'ingredientSlice',
    initialState: {
        status: 'hidden'
    },
    reducers: {
        showIngredientInfo: (state) => {
            state.status = 'visible';
        },
        closeIngredientInfo: (state) => {
            state.status = 'hidden';
        }
    }
});

export const { showIngredientInfo, closeIngredientInfo } = IngredientSlice.actions;
export default IngredientSlice.reducer;