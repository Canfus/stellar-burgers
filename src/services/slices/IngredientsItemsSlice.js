import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientData } from '../../utils/burger-api';

export const fetchIngredientsData = createAsyncThunk(
    'ingredientsItems/fetchData',
    async (_, { rejectWithValue }) => {
        try {
            return getIngredientData();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const IngredientsItemsSlice = createSlice({
    name: 'ingredientsItems',
    initialState: {
        status: null,
        error: null,
        items: []
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchIngredientsData.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchIngredientsData.fulfilled, (state, action) => {
                state.status = 'ok';
                state.items = action.payload.data;
            })
            .addCase(fetchIngredientsData.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message;
            });
    }
});

export default IngredientsItemsSlice.reducer;