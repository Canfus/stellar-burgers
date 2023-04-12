import { createSlice } from '@reduxjs/toolkit';

type TIngredientItemState = {
    status: 'hidden' | 'visible';
}

const initialState: TIngredientItemState = {
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