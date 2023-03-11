import {
    memo,
    useState,
    useCallback,useEffect
} from 'react';

import styles from './Register.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../services/slices/UserSlice';

import { Link, useNavigate } from 'react-router-dom';

import AppHeader from '../../components/AppHeader/AppHeader';

import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

const Register = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const userData = useSelector((store) => store.userSlice.user);

    useEffect(() => {
        if (userData.email) {
            navigate('/profile', { replace: true });
        }
    }, [userData]);

    const [username, setUsername] = useState('');
    const handleSetUsername = (e) => {
        setUsername(e.target.value);
    }

    const [email, setEmail] = useState('');
    const handleSetEmail = (e) => {
        setEmail(e.target.value);
    }

    const [password, setPassword] = useState('');
    const handleSetPassword = (e) => {
        setPassword(e.target.value);
    }

    const handlePostRegisterForm = useCallback(() => {
        const userForm = {
            name: username,
            email: email,
            password: password
        };
        dispatch(register(userForm));
    }, [dispatch, email, password, username]);

    return (
        <section className={styles.Register}>
            <AppHeader active='profile' />
            <section className={styles.RegisterContainer}>
                <span className='text text_type_main-medium'>Регистрация</span>
                <Input
                    type={'text'}
                    onChange={(e) => handleSetUsername(e)}
                    value={username}
                    name={'name'}
                    placeholder='Имя'
                    extraClass='mt-6'
                />
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
                    onClick={handlePostRegisterForm}
                    extraClass='mb-20'
                >
                    Зарегистрироваться
                </Button>
                <section className={`${styles.Support} mb-4`}>
                    <span className='text text_type_main-default text_color_inactive'>Уже зарегистрированы? </span>
                    <Link to='/login' className={`text text_type_main-default text_color_inactive ${styles.Link}`}>Войти</Link>
                </section>
            </section>
        </section>
    );
};

export default memo(Register);