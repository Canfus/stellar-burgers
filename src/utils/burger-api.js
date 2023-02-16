export const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
}

export const getIngredientData = async () => {
    const res = await fetch(`${BURGER_API_URL}/ingredients`);
    return checkResponse(res);
}

export const postIngredients = async (ingredientsId) => {
    const res = await fetch(`${BURGER_API_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            ingredients: ingredientsId
        })
    });
    return checkResponse(res);
}
