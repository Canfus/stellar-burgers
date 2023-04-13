import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    getProfileOrderListRequest,
    getUserRequest,
    loginRequest,
    logoutRequest,
    registerRequest,
    requestWithToken,
    updateUserRequest
} from '../../utils/burger-api';

import {
    IOrderListResponse,
    TLoginData,
    TOrder,
    TRegisterData,
    TUpdateUserData,
} from '../../utils/types';

import { IAuthResponse, IUserResponse } from '../../utils/types';

import { deleteItemLocalStorage, setItemLocalStorage } from '../../utils/localStorage';

export const register = createAsyncThunk<IAuthResponse, TRegisterData, { rejectValue: string }>(
    'userSlice/register',
    async (userData, { rejectWithValue }) => {
        try {
            return registerRequest(userData)
                .then(data => data);
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const getUserData = createAsyncThunk<IUserResponse, undefined, { rejectValue: string }>(
    'userSlice/getUserData',
    async (_, { rejectWithValue }) => {
        try {
            return requestWithToken(getUserRequest)
                .then(data => data);
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateUser = createAsyncThunk<IUserResponse, TUpdateUserData, { rejectValue: string }>(
    'userSlice/updateUser',
    async (userData, { rejectWithValue }) => {
        try {
            return updateUserRequest(userData)
                .then(data => data);
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const login = createAsyncThunk<IAuthResponse, TLoginData, { rejectValue: string }>(
    'userSlice/login',
    async (userData, { rejectWithValue }) => {
        try {
            return loginRequest(userData)
                .then(data => data);
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const logout = createAsyncThunk<undefined, undefined, { rejectValue: string }>(
    'userSlice/logout',
    async (_, { rejectWithValue }) => {
        try {
            return logoutRequest();
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const getProfileOrderList = createAsyncThunk<IOrderListResponse, string, { rejectValue: string }>(
    'orderSlice/getProfileOrderList',
    async (token, { rejectWithValue }) => {
        try {
            return requestWithToken(await getProfileOrderListRequest(token))
                .then(data => data);
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

type TUserState = {
    user: {
        name: string | null;
        email: string | null;
    };
    order: {
        orders: TOrder[];
        total: number | null;
        totalToday: number | null;
    }
    isLoggedIn: boolean;
    status: 'pending' | 'ok' | 'error' | null;
    error: string | null;
};

const initialState: TUserState = {
    user: {
        name: null,
        email: null
    },
    order: {
        orders: [],
        total: null,
        totalToday: null
    },
    isLoggedIn: false,
    status: null,
    error: null
};

export const UserSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Register reducers
        builder
            .addCase(register.pending, (state) => {
                state.status = 'pending';
                state.user.name = null;
                state.user.email = null;
                state.error = null;
                state.isLoggedIn = false;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.status = 'ok';
                state.user.email = action.payload.user.email;
                state.user.name = action.payload.user.name;
                state.isLoggedIn = true;
                setItemLocalStorage('accessToken', action.payload.accessToken.split('Bearer ')[1]);
                setItemLocalStorage('refreshToken', action.payload.refreshToken);
            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'error';
                if (action.payload) {
                    state.error = action.payload;
                }
            });
        // Login reducers
        builder
            .addCase(login.pending, (state) => {
                state.status = 'pending';
                state.user.name = null;
                state.user.email = null;
                state.error = null;
                state.isLoggedIn = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'ok';
                state.user.email = action.payload.user.email;
                state.user.name = action.payload.user.name;
                state.isLoggedIn = true;
                setItemLocalStorage('accessToken', action.payload.accessToken.split('Bearer ')[1]);
                setItemLocalStorage('refreshToken', action.payload.refreshToken);
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'error';
                if (action.payload) {
                    state.error = action.payload;
                }
            });
        // Logout reducers
        builder
            .addCase(logout.fulfilled, (state) => {
                state.status = null;
                state.user.name = null;
                state.user.email = null;
                state.error = null;
                state.isLoggedIn = false;
                deleteItemLocalStorage('accessToken');
                deleteItemLocalStorage('refreshToken');
            })
            .addCase(logout.rejected, (state, action) => {
                state.status = 'error';
                if (action.payload) {
                    state.error = action.payload;
                }
            });
        // Get userData reducer
        builder
            .addCase(getUserData.pending, (state) => {
                state.status = 'pending';
                state.error = null;
                state.isLoggedIn = false;
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                state.status = 'ok';
                state.user.name = action.payload.user.name;
                state.user.email = action.payload.user.email;
                state.isLoggedIn = true;
            })
            .addCase(getUserData.rejected, (state, action) => {
                state.status = 'error';
                if (action.payload) {
                    state.error = action.payload;
                }
            });
        // Update user reducer
        builder
            .addCase(updateUser.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.status = 'ok';
                state.user.name = action.payload.user.name;
                state.user.email = action.payload.user.email;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.status = 'error';
                if (action.payload) {
                    state.error = action.payload;
                }
            });
        //getProfileOrderList
        builder
            .addCase(getProfileOrderList.pending, (state) => {
                state.error = null;
                state.order.orders = [];
                state.order.total = null;
                state.order.totalToday = null;
            })
            .addCase(getProfileOrderList.fulfilled, (state, action: PayloadAction<IOrderListResponse>) => {
                state.order.orders = action.payload.orders;
                state.order.total = action.payload.total;
                state.order.totalToday = action.payload.totalToday;
            })
            .addCase(getProfileOrderList.rejected, (state, action) => {
                state.status = 'error';
                if (action.payload) {
                    state.error = action.payload;
                }
            });
    }
});

export default UserSlice.reducer;