import { deleteItemLocalStorage, getItemLocalStorage, setItemLocalStorage } from './localStorage';

import {
    TPostIngredientsData,
    TRegisterData,
    TLoginData,
    TUpdateUserData,
    TPostResetCodeData,
    TPostResetPasswordData,
    ITokenResponse,
} from './types';

export const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

export const WS_BURGER_API_URL = 'wss://norma.nomoreparties.space';

const checkResponse = (res: Response) => {
    return res.ok ? res.json() : res.json().then((error: any) => Promise.reject(error));
}

const request = async (url: string, options?: RequestInit) => {
    return fetch(BURGER_API_URL + url, options)
        .then(checkResponse);
}

export const requestWithToken = async (req: (data?: any) => Promise<any>, data?: any) => {
    let res = await req(data)
        if (!res.success) {
            deleteItemLocalStorage('accessToken');
            await updateAccessTokenRequest()
                .then((data: ITokenResponse) => {
                    setItemLocalStorage('accessToken', data.accessToken.split('Bearer ')[1]);
                    setItemLocalStorage('refreshToken', data.refreshToken);
                });
            res = await req(data);
        }
    return res;
}

export const getIngredientData = async () => {
    return await request('/ingredients').then(data => data.data);
}

export const postIngredients = async (orderData: TPostIngredientsData) => {
    return await request('/orders', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${getItemLocalStorage('accessToken')}`
        },
        body: JSON.stringify(orderData)
    });
}

export const registerRequest = async (userData: TRegisterData) => {
    return await request('/auth/register', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
}

export const loginRequest = async (userData: TLoginData) => {
    return await request('/auth/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
}

export const logoutRequest = async () => {
    return await request('/auth/logout', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            token: getItemLocalStorage('refreshToken')
        })
    });
}

export const getUserRequest = async () => {
    return await request('/auth/user', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            Authorization: 'Bearer ' + getItemLocalStorage('accessToken')
        }
    });
}

export const updateUserRequest = async (userData: TUpdateUserData) => {
    return await request('/auth/user', {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            Authorization: 'Bearer ' + getItemLocalStorage('accessToken')
        },
        body: JSON.stringify(userData)
    });
}

export const updateAccessTokenRequest = async () => {
    return await request('/auth/token', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            token: getItemLocalStorage('refreshToken')
        })
    });
}

export const postResetCode = async (email: TPostResetCodeData) => {
    return await request('/password-reset', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            email: email
        })
    });
}

export const postResetPassword = async (form: TPostResetPasswordData) => {
    return await request('/password-reset/reset', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            password: form.password,
            token: form.code
        })
    });
}

export const getOrderRequest = async (orderId: string) => {
    return await request(`/orders/${orderId}`,{
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    });
}