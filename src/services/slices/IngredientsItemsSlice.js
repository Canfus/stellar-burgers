import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientData } from '../../utils/burger-api';

export const fetchData = createAsyncThunk(
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
            .addCase(fetchData.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.status = 'ok';
                state.items = action.payload.data;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload;
            });
    }
});

export default IngredientsItemsSlice.reducer;