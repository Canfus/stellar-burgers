const StellarBurgers = {
    BURGER_API_URL: 'https://norma.nomoreparties.space/api',
    getIngredients: (url, checkResponse) => {
        return fetch(url)
            .then(checkResponse);
    }
}

export default StellarBurgers;