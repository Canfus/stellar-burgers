import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientData } from '../../utils/burger-api';
import { TIngredientItem } from '../../utils/types';

export const fetchIngredientsData = createAsyncThunk<TIngredientItem[], undefined, { rejectValue: string }>(
    'ingredientsItems/fetchData',
    async (_, { rejectWithValue }) => {
        try {
            return await getIngredientData();
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

type TIngredientsItemsState = {
    status: 'loading' | 'ok' | 'error' | null;
    error: string | null;
    items: TIngredientItem[];
};

const initialState: TIngredientsItemsState = {
    status: null,
    error: null,
    items: []
}

export const IngredientsItemsSlice = createSlice({
    name: 'ingredientsItems',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchIngredientsData.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchIngredientsData.fulfilled, (state, action) => {
                state.status = 'ok';
                state.items = action.payload;
            })
            .addCase(fetchIngredientsData.rejected, (state, action) => {
                state.status = 'error';
                if (action.error.message) {
                    state.error = action.error.message;
                }
            });
    }
});

export default IngredientsItemsSlice.reducer;