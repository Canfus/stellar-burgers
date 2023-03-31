import { memo, useCallback, useEffect } from 'react';
import styles from './ResetPassword.module.css';

import { Link, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';


import {
    Input,
    PasswordInput,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components';

import { postResetPassword } from '../../utils/burger-api';
import { deleteItemLocalStorage, getItemLocalStorage } from '../../utils/localStorage';
import { useForm } from '../../hooks/useForm';

const ResetPassword = () => {
    const navigate = useNavigate();

    const isLoggedIn = useSelector((store) => store.userSlice.isLoggedIn);

    useEffect(() => {
        if (getItemLocalStorage('isCodeSent') !== 'true') {
            navigate(-1);
        }
        if (isLoggedIn) {
            navigate('/', { replace: true });
        }
    }, [isLoggedIn, navigate]);

    const initialFormState = {
        code: '',
        password: ''
    };

    const { values, handleChange } = useForm(initialFormState);

    const handleResetPassword = useCallback(async () => {
        const res = await postResetPassword(values);

        if (res.success) {
            deleteItemLocalStorage('isCodeSent');
            navigate('/login');
        }
    }, [navigate, values]);
    return (
        <section className={styles.ResetPassword}>
            <form
                className={styles.ResetPasswordContainer}
                onSubmit={handleResetPassword}
            >
                <span className='text text_type_main-medium'>Восстановление пароля</span>
                <PasswordInput
                    onChange={handleChange}
                    value={values.password}
                    name={'password'}
                    placeholder='Введите новый пароль'
                    extraClass='mt-6'
                />
                <Input
                    type={'text'}
                    onChange={handleChange}
                    value={values.code}
                    name={'code'}
                    placeholder='Введите код из письма'
                    extraClass='mt-6 mb-6'
                />
                <Button
                    htmlType='button'
                    type='primary'
                    size='medium'
                    onClick={handleResetPassword}
                    extraClass='mb-20'
                >
                    Сохранить
                </Button>
                <section className={`${styles.Support} mb-4`}>
                    <span className='text text_type_main-default text_color_inactive'>Вспомнили пароль?</span>
                    <Link to='/login' className={`text text_type_main-default text_color_inactive ${styles.Link}`}>Войти</Link>
                </section>
            </form>
        </section>
    );
};

export default memo(ResetPassword);