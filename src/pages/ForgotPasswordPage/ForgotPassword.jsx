import { memo, useCallback, useState, useEffect } from 'react';
import styles from './ForgotPassword.module.css';

import { Link, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

import AppHeader from '../../components/AppHeader/AppHeader';

import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { postResetCode } from '../../utils/burger-api';
import { setItemLocalStorage } from '../../utils/localStorage';

const ForgotPassword = () => {
    const navigate = useNavigate();

    const userData = useSelector((store) => store.userSlice.user);

    useEffect(() => {
        if (userData.email) {
            navigate('/', { replace: true });
        }
    }, [userData]);

    const [email, setEmail] = useState('');
    const handleSetEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePostResetCode = useCallback(async () => {
        const res = await postResetCode(email);
        if (res.success) {
            setItemLocalStorage('isCodeSent', true);
            navigate('/reset-password');
        }
    }, [email]);

    return (
        <section className={styles.ForgotPassword}>
            <AppHeader active='profile' />
            <section className={styles.ForgotPasswordContainer}>
                <span className='text text_type_main-medium'>Восстановление пароля</span>
                <EmailInput
                    onChange={handleSetEmail}
                    value={email}
                    name={'email'}
                    placeholder='Укажите E-mail'
                    isIcon={false}
                    extraClass='mt-6 mb-6'
                />
                <Link to='/reset-password'>
                    <Button
                        htmlType='button'
                        type='primary'
                        size='medium'
                        onClick={handlePostResetCode}
                    >
                        Восстановить
                    </Button>
                </Link>
                <section className={`${styles.Support} mt-20`}>
                    <span className='text text_type_main-default text_color_inactive'>Вспомнили пароль?</span>
                    <Link to='/login' className={`text text_type_main-default text_color_inactive ${styles.Link}`}>Войти</Link>
                </section>
            </section>
        </section>
    );
};

export default memo(ForgotPassword);