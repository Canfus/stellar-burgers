import {
    FC,
    FormEvent,
    memo,
    useCallback,
    useEffect
} from 'react';

import { useForm } from '../../hooks/useForm';

import styles from './Login.module.css';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { login } from '../../services/slices/UserSlice';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import {
    EmailInput,
    PasswordInput,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import { TLoginData } from '../../utils/types';

const Login: FC = () => {
    const dispatch = useAppDispatch();

    const user = useAppSelector(store => store.userSlice);

    const location = useLocation();
    const navigate = useNavigate();

    const initialFormState: TLoginData = {
        email: '',
        password: ''
    };
    const { values, handleChange } = useForm(initialFormState);

    const handlePostLoginForm = useCallback((e: FormEvent) => {
        e.preventDefault();

        dispatch(login(values));
    }, [dispatch, values]);

    useEffect(() => {
        if (user.isLoggedIn) {
            if (location.state) {
                const { from } = location.state;
                navigate(`${from.pathname}${from.search}`);
            }
        }
    }, [navigate, user, location]);

    return (
        <section className={styles.Login}>
            <form
                className={styles.LoginContainer}
                onSubmit={handlePostLoginForm}
            >
                <span className='text text_type_main-medium'>Вход</span>
                <EmailInput
                    onChange={handleChange}
                    value={values.email}
                    name={'email'}
                    placeholder='E-mail'
                    isIcon={false}
                    extraClass='mt-6'
                />
                <PasswordInput
                    onChange={handleChange}
                    value={values.password}
                    name={'password'}
                    extraClass='mt-6 mb-3'
                />
                {user.status === 'error' && (
                    <section className={`${styles.Error} mb-3`}>
                        <span className='text text_type_main-default'>
                            {user.error}
                        </span>
                    </section>
                )}
                <Button
                    htmlType='submit'
                    type='primary'
                    size='medium'
                    extraClass='mb-20'
                >
                    Войти
                </Button>
                <section className={`${styles.Support} mb-4`}>
                    <span className='text text_type_main-default text_color_inactive'>Вы - новый пользователь? </span>
                    <Link to='/register' className={`text text_type_main-default text_color_inactive ${styles.Link}`}>Зарегистрироваться</Link>
                </section>
                <section className={styles.Support}>
                    <span className='text text_type_main-default text_color_inactive'>Забыли пароль? </span>
                    <Link to='/forgot-password' className={`text text_type_main-default text_color_inactive ${styles.Link}`}>Восстановить пароль</Link>
                </section>
            </form>
        </section>
    );
};

export default memo(Login);