import {
    FC,
    memo,
    FormEvent,
    useEffect
} from 'react';

import styles from './ResetPassword.module.css';

import { Link, useNavigate, useLocation } from 'react-router-dom';

import { useAppSelector } from '../../hooks/hooks';


import {
    Input,
    PasswordInput,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components';

import { postResetPassword } from '../../utils/burger-api';
import { useForm } from '../../hooks/useForm';

import { TPostResetPasswordData } from '../../utils/types';

const ResetPassword: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isLoggedIn = useAppSelector((store) => store.userSlice.isLoggedIn);

    useEffect(() => {
        if (!location.state?.codeSent) {
            navigate(-1);
        }
        if (isLoggedIn) {
            navigate('/', { replace: true });
        }
    }, [isLoggedIn, navigate]);

    const initialFormState :TPostResetPasswordData = {
        code: '',
        password: ''
    };

    const { values, handleChange } = useForm(initialFormState);

    const handleResetPassword = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const res = await postResetPassword(values);

        if (res.success) {
            navigate('/login');
        }
    };
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
                    htmlType='submit'
                    type='primary'
                    size='medium'
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