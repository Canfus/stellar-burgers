export const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
}

export const getIngredientData = () => {
    return fetch(`${BURGER_API_URL}/ingredients`).then(res => checkResponse(res));
}