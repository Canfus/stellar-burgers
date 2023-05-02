import { FC, memo, FormEvent } from 'react';
import styles from './ForgotPassword.module.css';

import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../hooks/hooks';

import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { postResetCode } from '../../utils/burger-api';

import { useForm } from '../../hooks/useForm';

import { TPostResetCodeData } from '../../utils/types';

const ForgotPassword: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/';

    const isLoggedIn = useAppSelector((store) => store.userSlice.isLoggedIn);

    const initialFormState: TPostResetCodeData = {
        email: ''
    };

    const { values, handleChange } = useForm(initialFormState);

    const handlePostResetCode = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const res = await postResetCode(values.email);
        if (res.success) {
            navigate('/reset-password', { state: { codeSent: true } });
        }
    };

    if (isLoggedIn) {
        return <Navigate to={from} />
    }

    return (
        <section className={styles.ForgotPassword}>
            <form
                className={styles.ForgotPasswordContainer}
                onSubmit={handlePostResetCode}
            >
                <span className='text text_type_main-medium'>Восстановление пароля</span>
                <EmailInput
                    onChange={handleChange}
                    value={values.email}
                    name={'email'}
                    placeholder='Укажите E-mail'
                    isIcon={false}
                    extraClass='mt-6 mb-6'
                />
                <Button
                    htmlType='submit'
                    type='primary'
                    size='medium'
                >
                    Восстановить
                </Button>
                <section className={`${styles.Support} mt-20`}>
                    <span className='text text_type_main-default text_color_inactive'>Вспомнили пароль?</span>
                    <Link to='/login' className={`text text_type_main-default text_color_inactive ${styles.Link}`}>Войти</Link>
                </section>
            </form>
        </section>
    );
};

export default memo(ForgotPassword);