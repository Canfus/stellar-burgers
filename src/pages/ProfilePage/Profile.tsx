import {
    FC,
    memo,
    useState,
    useEffect,
    useCallback,
    FormEvent
} from 'react';

import { useForm } from '../../hooks/useForm';

import styles from './Profile.module.css';

import { NavLink } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { logout, updateUser } from '../../services/slices/UserSlice';

import {
    Input,
    EmailInput,
    PasswordInput,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components';

import { TRegisterData } from '../../utils/types';


const Profile: FC = () => {
    const dispatch = useAppDispatch();

    const userData = useAppSelector((store) => store.userSlice);

    const [disabledButtonState, setDisabledButtonState] = useState<boolean>(true);

    const initialFormState: TRegisterData = {
        name: '',
        email: '',
        password: ''
    };
    const {
        values,
        setValues,
        resetForm,
        handleChange
    } = useForm(initialFormState, setDisabledButtonState);

    useEffect(() => {
        if (userData.isLoggedIn) {
            setValues({
                ...values,
                name: userData.user.name,
                email: userData.user.email
            });
        }
    }, [userData, setValues]);

    const handleLogout = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    const handleSubmitForm = useCallback((e: FormEvent) => {
        e.preventDefault();

        dispatch(updateUser(values));
        setDisabledButtonState(true);
    }, [dispatch, values]);

    const handleCancelUpdateUserData = useCallback(() => {
        resetForm({
            ...values,
            name: userData.user.name,
            email: userData.user.email
        });
        setDisabledButtonState(true);
    }, [userData]);

    return (
        <section className={styles.Profile}>
            <section className={styles.ProfileContainer}>
                <nav className={`${styles.Navigation} mt-3 mr-15`}>
                <NavLink
                        to='/profile'
                        className={`text text_type_main-medium ${styles.Link}`}
                        >
                            {({ isActive }) => (
                                <p className={isActive ? styles.text_color_active : 'text_color_inactive'}>
                                    Профиль
                                </p>
                            )}
                    </NavLink>
                    <NavLink
                        to='/profile/orders'
                        className={`text text_type_main-medium ${styles.Link}`}
                        >
                            {({ isActive }) => (
                                <p className={isActive ? styles.text_color_active : 'text_color_inactive'}>
                                    История заказов
                                </p>
                            )}
                    </NavLink>
                    <NavLink
                        to='/login'
                        className={`text text_type_main-medium ${styles.Link}`}
                        onClick={handleLogout}
                    >
                        {({ isActive }) => (
                            <p className={isActive ? styles.text_color_active : 'text_color_inactive'}>
                                Выход
                            </p>
                        )}
                    </NavLink>
                    <span className='text text_type_main-default text_color_inactive mt-20'>В этом разделе вы можете изменить свои персональные данные</span>
                </nav>
                <form
                    className={styles.UserData}
                    onSubmit={handleSubmitForm}
                >
                    <Input
                        type={'text'}
                        onChange={handleChange}
                        value={values.name}
                        name={'name'}
                        placeholder='Имя'
                        icon='EditIcon'
                        extraClass='mt-6'
                    />
                    <EmailInput
                        onChange={handleChange}
                        value={values.email}
                        name={'email'}
                        placeholder='E-mail'
                        isIcon={true}
                        extraClass='mt-6'
                    />
                    <PasswordInput
                        onChange={handleChange}
                        value={values.password}
                        name={'password'}
                        icon='EditIcon'
                        extraClass='mt-6 mb-6'
                    />
                    <section className={`${styles.userDataControls} ${disabledButtonState ? styles.disabled : ''}`}>
                        <Button
                            htmlType='reset'
                            type='secondary'
                            size='medium'
                            onClick={handleCancelUpdateUserData}
                            extraClass={`text text_type_main-default text_color_inactive ${styles.CancelButton}`}
                        >
                            Отменить изменения
                        </Button>
                        <Button
                            htmlType='submit'
                            type='primary'
                            size='medium'
                            extraClass='ml-4'
                        >
                            Сохранить
                        </Button>
                    </section>
                </form>
            </section>
        </section>
    );
};

export default memo(Profile);