import {
    memo,
    useCallback
} from 'react';

import { useForm } from '../../hooks/useForm';

import styles from './Register.module.css';

import { useDispatch } from 'react-redux';
import { register } from '../../services/slices/UserSlice';

import { Link } from 'react-router-dom';

import {
    Input,
    EmailInput,
    PasswordInput,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components';

const Register = () => {
    const dispatch = useDispatch();

    const initialFormState = {
        name: '',
        email: '',
        password: ''
    };
    const { values, handleChange } = useForm(initialFormState);

    const handlePostRegisterForm = useCallback((e) => {
        e.preventDefault();
        dispatch(register(values));
    }, [dispatch, values]);

    return (
        <section className={styles.Register}>
            <form
                className={styles.RegisterContainer}
                onSubmit={handlePostRegisterForm}
            >
                <span className='text text_type_main-medium'>Регистрация</span>
                <Input
                    type={'text'}
                    onChange={handleChange}
                    value={values.name}
                    name={'name'}
                    placeholder='Имя'
                    extraClass='mt-6'
                />
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
                    extraClass='mt-6 mb-6'
                />
                <Button
                    htmlType='submit'
                    type='primary'
                    size='medium'
                    extraClass='mb-20'
                >
                    Зарегистрироваться
                </Button>
                <section className={`${styles.Support} mb-4`}>
                    <span className='text text_type_main-default text_color_inactive'>Уже зарегистрированы? </span>
                    <Link to='/login' className={`text text_type_main-default text_color_inactive ${styles.Link}`}>Войти</Link>
                </section>
            </form>
        </section>
    );
};

export default memo(Register);