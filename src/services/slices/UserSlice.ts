import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    getUserRequest,
    loginRequest,
    logoutRequest,
    registerRequest,
    requestWithToken,
    TLoginData,
    TRegisterData,
    TUpdateUserData,
    updateUserRequest
} from '../../utils/burger-api';

import { deleteItemLocalStorage, setItemLocalStorage } from '../../utils/localStorage';

type TRegisterResponse = {
    success: boolean;
    user: {
        name: string;
        email: string;
    };
    accessToken: string;
    refreshToken: string;
};

export const register = createAsyncThunk<TRegisterResponse, TRegisterData, { rejectValue: string }>(
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

type TGetUserDataResponse = {
    success: boolean;
    user: {
        email: string;
        name: string;
    }
};

export const getUserData = createAsyncThunk<TGetUserDataResponse, undefined, { rejectValue: string }>(
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

type TUpdateUserResponse = {
    success: boolean;
    user: {
        email: string;
        name: string;
    }
};

export const updateUser = createAsyncThunk<TUpdateUserResponse, TUpdateUserData, { rejectValue: string }>(
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

type TLoginResponse = {
    success: boolean;
    user: {
        email: string;
        name: string;
    };
    accessToken: string;
    refreshToken: string;
};

export const login = createAsyncThunk<TLoginResponse, TLoginData, { rejectValue: string }>(
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

export const logout = createAsyncThunk(
    'userSlice/logout',
    async (_, { rejectWithValue }) => {
        try {
            return logoutRequest();
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

type TInitialState = {
    user: {
        name: string | null;
        email: string | null;
    };
    isLoggedIn: boolean;
    status: string | null;
    error: string | null;
};

const initialState: TInitialState = {
    user: {
        name: null,
        email: null
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
                if (action.error.message) {
                    state.error = action.error.message;
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
                if (action.error.message) {
                    state.error = action.error.message;
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
                if (action.error.message) {
                    state.error = action.error.message;
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
                if (action.error.message) {
                    state.error = action.error.message;
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
                if (action.error.message) {
                    state.error = action.error.message;
                }
            });
    }
});

export default UserSlice.reducer;