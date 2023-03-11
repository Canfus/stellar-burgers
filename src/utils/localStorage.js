export const getItemLocalStorage = (key) => {
    return localStorage.getItem(key);
}

export const setItemLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
}

export const deleteItemLocalStorage = (key) => {
    localStorage.removeItem(key);
}