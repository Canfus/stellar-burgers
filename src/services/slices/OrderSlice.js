import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postIngredients  } from '../../utils/burger-api';

export const postOrder = createAsyncThunk(
    'orderSlice/postOrder',
    async (ingredientsId, { rejectWithValue }) => {
        try {
            return postIngredients({ ingredients: ingredientsId })
                .then(data => data);
        } catch {
            return rejectWithValue(postIngredients({ ingredients: ingredientsId }).then(error => error));
        }
    }
);

const OrderSlice = createSlice({
    name: 'orderSlice',
    initialState: {
        status: null,
        error: null,
        name: null,
        orderNumber: null
    },
    reducers: {
        closeOrderModal: (state) => {
            state.status = 'hidden';
            state.error = null;
            state.name = null;
            state.orderNumber = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(postOrder.pending, (state) => {
                state.status = 'pending';
                state.error = null;
                state.name = null;
                state.orderNumber = null;
            })
            .addCase(postOrder.fulfilled, (state, action) => {
                state.name = action.payload.name;
                state.orderNumber = action.payload.order.number;
                state.status = 'visible';
            })
            .addCase(postOrder.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message;
            });
    }
});

export const { closeOrderModal } = OrderSlice.actions;

export default OrderSlice.reducer;