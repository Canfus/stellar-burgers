export const getItemLocalStorage = (key: string): string => {
    return localStorage.getItem(key) as string;
}

export const setItemLocalStorage = (key: string, value: string): void => {
    localStorage.setItem(key, value);
}

export const deleteItemLocalStorage = (key: string): void => {
    localStorage.removeItem(key);
}