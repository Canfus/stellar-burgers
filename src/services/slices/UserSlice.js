import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    getUserRequest,
    loginRequest,
    logoutRequest,
    registerRequest,
    requestWithToken,
    updateUserRequest
} from '../../utils/burger-api';

import { deleteItemLocalStorage, setItemLocalStorage } from '../../utils/localStorage';

export const register = createAsyncThunk(
    'userSlice/register',
    async (userData, { rejectWithValue }) => {
        try {
            return registerRequest(userData)
                .then(data => data);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getUserData = createAsyncThunk(
    'userSlice/getUserData',
    async (_, { rejectWithValue }) => {
        try {
            return requestWithToken(getUserRequest)
                .then(data => data);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateUser = createAsyncThunk(
    'userSlice/updateUser',
    async (userData, { rejectWithValue }) => {
        try {
            return updateUserRequest(userData)
                .then(data => data);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const login = createAsyncThunk(
    'userSlice/login',
    async (userData, { rejectWithValue }) => {
        try {
            return loginRequest(userData)
                .then(data => data);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const logout = createAsyncThunk(
    'userSlice/logout',
    async (_, { rejectWithValue }) => {
        try {
            return logoutRequest();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const UserSlice = createSlice({
    name: 'userSlice',
    initialState: {
        user: {
            name: null,
            email: null
        },
        isLoggedIn: false,
        status: null,
        error: null
    },
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
                state.error = action.error.message;
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
                state.error = action.error.message;
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
                state.error = action.error.message;
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
                state.error = action.error.message;
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
                state.error = action.error.message;
            });
    }
});

export default UserSlice.reducer;