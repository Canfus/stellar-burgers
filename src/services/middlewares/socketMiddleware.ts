import { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';

import { setOrders } from '../slices/OrderSlice';
import { IOrderListResponse, TwsActions } from '../../utils/types';
import { updateAccessTokenRequest } from '../../utils/burger-api';
import { AppDispatch, RootState } from '../store';

export const createSocketMiddleware = (wsActions: TwsActions): Middleware => {
    return (store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;
        let isConnected: boolean = false;
        let reconnectTimer: number = 0;
    
        return (next) => (action) => {
            const { dispatch } = store;
    
            if (wsActions.websocketStartConnecting.match(action)) {
                socket = new WebSocket(action.payload!);
                isConnected = true;
                window.clearInterval(reconnectTimer);
                reconnectTimer = 0;
    
                socket.onopen = () => {
                    console.log('Произошел коннект');
                    dispatch(wsActions.websocketConnecting());
                }
    
                socket.onmessage = async (event: MessageEvent) => {
                    const { data } = event;
                    const parsedData: IOrderListResponse = JSON.parse(data);
                    dispatch(setOrders(parsedData));
                    if (parsedData?.message === 'Token is invalid') {
                        await updateAccessTokenRequest()
                            .then(() => dispatch(wsActions.websocketStartConnecting(action.payload!)));
                    }
                }
    
                socket.onerror = () => {
                    console.log('Какая-то ошибка, что произошло мы не знаем и никогда не узнаем');
                    dispatch(wsActions.webSocketError('Какая-то ошибка, что произошло мы не знаем и никогда не узнаем'));
                }
    
                socket.onclose = (event: CloseEvent) => {
                    if (event.code !== 1000) {
                        console.log(`Server closed with code ${event.code}.\n${event.reason}`);
                        dispatch(wsActions.webSocketError(event.reason));
                    }
                    
                    if (isConnected) {
                        console.log('Автопереподключение');
                        dispatch(wsActions.websocketConnecting());
                        reconnectTimer = window.setTimeout(() => {
                            dispatch(wsActions.websocketStartConnecting(action.payload!));
                        }, 3000);
                    }
                }
            }
    
            if (socket && wsActions.websocketDisconnecting.match(action)) {
                window.clearTimeout(reconnectTimer);
                isConnected = false;
                socket.close();
            }
    
            return next(action);
        }
    }
}