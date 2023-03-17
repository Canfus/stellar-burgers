import { getItemLocalStorage } from "./localStorage";

export const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then(error => Promise.reject(error));
}

const request = async (url, options) => {
    return fetch(BURGER_API_URL + url, options)
        .then(checkResponse);
}

export const requestWithToken = async (req, data = null) => {
    let res = await req(data);
    if (!res.success) {
        await updateAccessTokenRequest();
        res = await req(data);
    }
    return res;
}

export const getIngredientData = async () => {
    return await request('/ingredients');
}

export const postIngredients = async (orderData) => {
    return await request('/orders', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(orderData)
    });
}

export const registerRequest = async (userData) => {
    return await request('/auth/register', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
}

export const loginRequest = async (userData) => {
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

export const updateUserRequest = async (userData) => {
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

export const postResetCode = async (email) => {
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

export const postResetPassword = async (form) => {
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