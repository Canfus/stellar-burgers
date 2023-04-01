export const getItemLocalStorage = (key: string): string | null => {
    return localStorage.getItem(key);
}

export const setItemLocalStorage = (key: string, value: string): void => {
    localStorage.setItem(key, value);
}

export const deleteItemLocalStorage = (key: string): void => {
    localStorage.removeItem(key);
}