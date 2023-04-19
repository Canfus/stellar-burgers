import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postIngredients } from '../../utils/burger-api';
import { IOrderListResponse, IOrderResponse, TOrder } from '../../utils/types';

export const postOrder = createAsyncThunk<IOrderResponse, string[], { rejectValue: string }>(
    'orderSlice/postOrder',
    async (ingredientsId, { rejectWithValue }) => {
        try {
            return postIngredients({ ingredients: ingredientsId })
                .then(data => data);
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

type TOrderState = {
    status: 'hidden' | 'pending' | 'visible' | 'error';
    confirmStatus: 'hidden' | 'visible';
    error: string | null;
    orderNumber: number | null;
    orders: TOrder[];
    total: number | null;
    totalToday: number | null;
    currentOrder: {
        status: 'hidden' | 'visible';
        order: TOrder | null;
    }
};

const initialState: TOrderState = {
    status: 'hidden',
    confirmStatus: 'hidden',
    error: null,
    orderNumber: null,
    orders: [],
    total: null,
    totalToday: null,
    currentOrder: {
        status: 'hidden',
        order: null
    }
};

const OrderSlice = createSlice({
    name: 'orderSlice',
    initialState,
    reducers: {
        closeOrderModal: (state) => {
            state.status = 'hidden';
            state.confirmStatus = 'hidden';
        },
        openOrderModal: (state) => {
            state.confirmStatus = 'visible';
        },
        openOrderDetails: (state) => {
            state.currentOrder.status = 'visible';
        },
        closeOrderDetails: (state) => {
            state.currentOrder.status = 'hidden';
        },
        clearOrders: (state) => {
            state.orders = [];
            state.total = null;
            state.totalToday = null;
        },
        setOrders: (state, action: PayloadAction<IOrderListResponse>) => {
            state.orders = action.payload.orders.reverse();
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        }
    },
    extraReducers: (builder) => {
        // postOrder request
        builder
            .addCase(postOrder.pending, (state) => {
                state.status = 'pending';
                state.error = null;
                state.orderNumber = null;
            })
            .addCase(postOrder.fulfilled, (state, action: PayloadAction<IOrderResponse>) => {
                state.orderNumber = action.payload.order.number;
                state.status = 'visible';
            })
            .addCase(postOrder.rejected, (state, action) => {
                state.status = 'error';
                if (action.payload) {
                    state.error = action.payload;
                }
            });
    }
});

export const {
    closeOrderModal,
    openOrderModal,
    openOrderDetails,
    closeOrderDetails,
    clearOrders,
    setOrders
} = OrderSlice.actions;

export default OrderSlice.reducer;