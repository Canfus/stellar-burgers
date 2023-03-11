import {
    memo,
    useState,
    useCallback,
    useEffect
} from 'react';

import styles from './Login.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../services/slices/UserSlice';

import { Link, useNavigate } from 'react-router-dom';

import AppHeader from '../../components/AppHeader/AppHeader';

import {
    EmailInput,
    PasswordInput,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components';

const Login = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const userData = useSelector((store) => store.userSlice.user);

    useEffect(() => {
        if (userData.email) {
            navigate('/', { replace: true });
        }
    }, [userData, navigate]);

    const [email, setEmail] = useState('');
    const handleSetEmail = (e) => {
        setEmail(e.target.value);
    }

    const [password, setPassword] = useState('');
    const handleSetPassword = (e) => {
        setPassword(e.target.value);
    }

    const handlePostLoginForm = useCallback(() => {
        const userForm = {
            email: email,
            password: password
        };
        dispatch(login(userForm));
    }, [dispatch, email, password]);

    return (
        <section className={styles.Login}>
            <AppHeader active='profile' />
            <section className={styles.LoginContainer}>
                <span className='text text_type_main-medium'>Вход</span>
                <EmailInput
                    onChange={(e) => handleSetEmail(e)}
                    value={email}
                    name={'email'}
                    placeholder='E-mail'
                    isIcon={false}
                    extraClass='mt-6'
                />
                <PasswordInput
                    onChange={(e) => handleSetPassword(e)}
                    value={password}
                    name={'password'}
                    extraClass='mt-6 mb-6'
                />
                <Button
                    htmlType='button'
                    type='primary'
                    size='medium'
                    onClick={handlePostLoginForm}
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
            </section>
        </section>
    );
};

export default memo(Login);