// Export API URL
export const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

// This function check the response
const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
}

// Function will return Promise of IngredientsData
export const getIngredientData = async () => {
    const res = await fetch(`${BURGER_API_URL}/ingredients`);
    return checkResponse(res);
}

// Function will post to the server and return Promise of burger
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