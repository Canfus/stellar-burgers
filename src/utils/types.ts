import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from '@reduxjs/toolkit';

export type TIngredientItem = {
    dragId?: string;
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
};

export type TOrder = {
    ingredients: string[];
    _id: string;
    status: 'created' | 'pending' | 'done';
    number: number;
    name: string;
    createdAt: string;
    updatedAt: string;
};

interface IResponse {
    success: boolean;
}

export interface ITokenResponse extends IResponse {
    accessToken: string;
    refreshToken: string;
}

export interface IAuthResponse extends IResponse {
    user: {
        email: string;
        name: string;
    };
    accessToken: string;
    refreshToken: string;
}

export interface IUserResponse extends IResponse {
    user: {
        email: string;
        name: string;
    }
}

export interface IOrderResponse extends IResponse {
    name: string;
    order: {
        number: number;
    }
}

export interface IOrderListResponse extends IResponse {
    orders: TOrder[];
    total: number;
    totalToday: number;
    message?: string;
}

export type TPostIngredientsData = {
    ingredients: string[];
};

export type TRegisterData = {
    name: string;
    email: string;
    password: string;
};

export type TLoginData = {
    email: string;
    password: string;
};

export type TUpdateUserData = {
    name: string;
    email: string;
    password?: string;
};

export type TPostResetCodeData = {
    email: string;
};

export type TPostResetPasswordData = {
    password: string;
    code: string;
};

export type TwsActions = {
    websocketStartConnecting: ActionCreatorWithPayload<string, "socketSlice/websocketStartConnecting">;
    websocketConnecting: ActionCreatorWithoutPayload<'socketSlice/websocketConnecting'>;
    websocketDisconnecting: ActionCreatorWithoutPayload<'socketSlice/websocketDisconnecting'>;
    webSocketError: ActionCreatorWithPayload<any, 'socketSlice/webSocketError'>;
}