import { useState, useCallback } from 'react';

export const useForm = (inputValues, handleDisablerForm = null) => {
    const [values, setValues] = useState(inputValues);

    const resetForm = useCallback((newValues = {}) => {
        setValues(newValues);
    }, [setValues]);

    const handleChange = (event) => {
        const { value, name } = event.target;
        setValues({ ...values, [name]: value });
        if (typeof handleDisablerForm === 'function') {
            handleDisablerForm(false);
        }
    }

    return { values, handleChange, setValues, resetForm };
}