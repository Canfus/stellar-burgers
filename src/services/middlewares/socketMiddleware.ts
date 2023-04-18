import { Middleware } from '@reduxjs/toolkit';
import {
    websocketStartConnecting,
    websocketConnecting,
    websocketDisconnecting,
    webSocketError
} from '../slices/socketSlice';

import { setOrders } from '../slices/OrderSlice';
import { IOrderListResponse } from '../../utils/types';
import { updateAccessTokenRequest } from '../../utils/burger-api';

export const socketMiddleware: Middleware = (store) => {
    let socket: WebSocket | null = null;
    let isConnected: boolean = false;
    let reconnectTimer: number = 0;

    return (next) => (action) => {
        const { dispatch } = store;

        if (websocketStartConnecting.match(action)) {
            socket = new WebSocket(action.payload!);
            isConnected = true;
            window.clearInterval(reconnectTimer);
            reconnectTimer = 0;

            socket.onopen = () => {
                console.log('Произошел коннект');
                dispatch(websocketConnecting());
            }

            socket.onmessage = async (event: MessageEvent) => {
                const { data } = event;
                const parsedData: IOrderListResponse = JSON.parse(data);
                dispatch(setOrders(parsedData));
                if (parsedData?.message === 'Token is invalid') {
                    await updateAccessTokenRequest()
                        .then(() => dispatch(websocketStartConnecting(action.payload!)));
                }
            }

            socket.onerror = () => {
                console.log('Какая-то ошибка, что произошло мы не знаем и никогда не узнаем');
                dispatch(webSocketError('Какая-то ошибка, что произошло мы не знаем и никогда не узнаем'));
            }

            socket.onclose = (event: CloseEvent) => {
                if (event.code !== 1000) {
                    console.log(`Server closed with code ${event.code}.\n${event.reason}`);
                    dispatch(webSocketError(event.reason));
                }

                if (isConnected) {
                    console.log('Автопереподключение');
                    dispatch(websocketConnecting());
                    reconnectTimer = window.setTimeout(() => {
                        dispatch(websocketStartConnecting(action.payload!));
                    }, 3000);
                }
            }
        }

        if (socket && websocketDisconnecting.match(action)) {
            window.clearTimeout(reconnectTimer);
            isConnected = false;
            socket.close();
        }

        return next(action);
    }
}