import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserRequest, loginRequest, logoutRequest, postResetCode, registerRequest, updateUserRequest } from '../../utils/burger-api';
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
            return getUserRequest()
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
            email: null,
            password: null
        },
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
                state.user.password = null;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.status = 'ok';
                state.user.email = action.payload.user.email;
                state.user.name = action.payload.user.name;
                state.user.password = action.meta.arg.password;
                setItemLocalStorage('accessToken', action.payload.accessToken.split('Bearer ')[1]);
                setItemLocalStorage('refreshToken', action.payload.refreshToken);
            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload;
            });
        // Login reducers
        builder
            .addCase(login.pending, (state) => {
                state.status = 'pending';
                state.user.name = null;
                state.user.email = null;
                state.user.password = null;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'ok';
                state.user.email = action.payload.user.email;
                state.user.name = action.payload.user.name;
                state.user.password = action.meta.arg.password;
                setItemLocalStorage('accessToken', action.payload.accessToken.split('Bearer ')[1]);
                setItemLocalStorage('refreshToken', action.payload.refreshToken);
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload;
            });
        // Logout reducers
        builder
            .addCase(logout.fulfilled, (state) => {
                state.status = null;
                state.user.name = null;
                state.user.email = null;
                state.user.password = null;
                state.error = null;
                deleteItemLocalStorage('accessToken');
                deleteItemLocalStorage('refreshToken');
            })
            .addCase(logout.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload;
            });
        // Get userData reducer
        builder
            .addCase(getUserData.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                state.status = 'ok';
                state.user.name = action.payload.user.name;
                state.user.email = action.payload.user.email;
            })
            .addCase(getUserData.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload;
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
                state.error = action.payload;
            });
    }
});

export default UserSlice.reducer;