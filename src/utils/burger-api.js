import { getItemLocalStorage } from "./localStorage";

export const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then(error => Promise.reject(error));
}

export const requestWithToken = async (request, data) => {
    let res = await request(data || null);
    
    if (!res.ok) {
        await updateAccessTokenRequest();
        res = await request(data || null);
    }
    return checkResponse(res);
}

export const getIngredientData = async () => {
    const res = await fetch(`${BURGER_API_URL}/ingredients`);
    return checkResponse(res);
}

export const postIngredients = async (orderData) => {
    const res = await fetch(`${BURGER_API_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(orderData)
    });
    return checkResponse(res);
}

export const registerRequest = async (userData) => {
    const res = await fetch(`${BURGER_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    return checkResponse(res);
}

export const loginRequest = async (userData) => {
    const res = await fetch(`${BURGER_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    return checkResponse(res);
}

export const logoutRequest = async () => {
    const res = await fetch(`${BURGER_API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            token: getItemLocalStorage('refreshToken')
        })
    });
    return checkResponse(res);
}

export const getUserRequest = async () => {
    const res = await fetch(`${BURGER_API_URL}/auth/user`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            Authorization: 'Bearer ' + getItemLocalStorage('accessToken')
        }
    });
    return checkResponse(res);
}

export const updateUserRequest = async (userData) => {
    const res = await fetch(`${BURGER_API_URL}/auth/user`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            Authorization: 'Bearer ' + getItemLocalStorage('accessToken')
        },
        body: JSON.stringify(userData)
    });
    return checkResponse(res);
}

export const updateAccessTokenRequest = async () => {
    const res = await fetch(`${BURGER_API_URL}/auth/token`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            Authorization: 'Bearer ' + getItemLocalStorage('accessToken')
        },
        body: JSON.stringify({
            token: getItemLocalStorage('refreshToken')
        })
    });
    return checkResponse(res);
}

export const postResetCode = async (email) => {
    const res = await fetch(`${BURGER_API_URL}/password-reset`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            email: email
        })
    });
    return checkResponse(res);
}

export const postResetPassword = async (password, code) => {
    const res = await fetch(`${BURGER_API_URL}/password-reset/reset`, {
        method: 'POST',
         headers: {
            'Content-type': 'application/json'
         },
         body: JSON.stringify({
            password: password,
            token: code
         })
    });
    return checkResponse(res);
}