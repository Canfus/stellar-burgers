import { createSlice } from '@reduxjs/toolkit';

type TInitialState = {
    status: string;
}

const initialState: TInitialState = {
    status: 'hidden'
};

export const IngredientSlice = createSlice({
    name: 'ingredientSlice',
    initialState,
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