import { useState, useCallback, ChangeEvent } from 'react';

export const useForm = (inputValues: any, handleDisablerForm?: (value: boolean) => void) => {
    const [values, setValues] = useState(inputValues);

    const resetForm = useCallback((newValues = {}) => {
        setValues(newValues);
    }, [setValues]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setValues({ ...values, [name]: value });
        if (typeof handleDisablerForm === 'function') {
            handleDisablerForm(false);
        }
    }

    return { values, handleChange, setValues, resetForm };
}