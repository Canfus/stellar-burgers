export const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
}

export const getIngredientData = (state, setState, setConstructorItems) => {
    setState({ ...state, isLoading: true, hasError: false });
    fetch(`${BURGER_API_URL}/ingredients`)
        .then(res => checkResponse(res))
        .then(data => {
            setState({ ...state, isLoading: false, data: data.data });
            setConstructorItems([
                data.data.find(item => item.type === 'bun'),
                data.data.find(item => item.type === 'main')
            ]);
    });
}