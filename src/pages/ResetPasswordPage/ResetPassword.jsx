import { memo, useCallback, useState, useEffect } from 'react';
import styles from './ResetPassword.module.css';

import { Link, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

import AppHeader from '../../components/AppHeader/AppHeader';

import {
    Input,
    PasswordInput,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components';

import { postResetPassword } from '../../utils/burger-api';
import { deleteItemLocalStorage, getItemLocalStorage } from '../../utils/localStorage';

const ResetPassword = () => {
    const navigate = useNavigate();

    const userData = useSelector((store) => store.userSlice.user);

    useEffect(() => {
        if (getItemLocalStorage('isCodeSent') !== 'true') {
            navigate(-1);
        }
        if (userData.email) {
            navigate('/', { replace: true });
        }
    }, [userData]);

    const [code, setCode] = useState('');
    const handleSetCode = (e) => {
        setCode(e.target.value);
    }

    const [password, setPassword] = useState('');
    const handleSetPassword = (e) => {
        setPassword(e.target.value);
    }

    const handleResetPassword = useCallback(async () => {
        const res = await postResetPassword(password, code);

        if (res.success) {
            deleteItemLocalStorage('isCodeSent');
            navigate('/login');
        }
    }, [navigate]);
    return (
        <section className={styles.ResetPassword}>
            <AppHeader active='profile' />
            <section className={styles.ResetPasswordContainer}>
                <span className='text text_type_main-medium'>Восстановление пароля</span>
                <PasswordInput
                    onChange={(e) => handleSetPassword(e)}
                    value={password}
                    name={'password'}
                    placeholder='Введите новый пароль'
                    extraClass='mt-6'
                />
                <Input
                    type={'text'}
                    onChange={(e) => handleSetCode(e)}
                    value={code}
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
            </section>
        </section>
    );
};

export default memo(ResetPassword);