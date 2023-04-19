import { createSlice } from '@reduxjs/toolkit';

interface ISocketState {
    status: 'disconnected' | 'connecting' | 'connected' | 'error';
    isConnected: boolean;
    error: {
        message: string | null;
    }
}

const initialState: ISocketState = {
    status: 'disconnected',
    isConnected: false,
    error: {
        message: null
    }
}

const socketSlice = createSlice({
    name: 'socketSlice',
    initialState,
    reducers: {
        websocketStartConnecting: (state, action: { payload: string }) => {
            state.status = 'connecting';
            state.error.message = null;
        },
        websocketConnecting: (state) => {
            state.status = 'connected';
            state.isConnected = true;
        },
        websocketDisconnecting: (state) => {
            state.status = 'disconnected';
            state.isConnected = false;
        },
        webSocketError: (state, action) => {
            state.status = 'error';
            state.error.message = action.payload;
        }
    }
});

export const {
    websocketStartConnecting,
    websocketConnecting,
    websocketDisconnecting,
    webSocketError
} = socketSlice.actions;

export default socketSlice.reducer;