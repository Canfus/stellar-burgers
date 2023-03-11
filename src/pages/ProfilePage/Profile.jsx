import {
    memo,
    useState,
    useEffect,
    useCallback
} from 'react';

import styles from './Profile.module.css';

import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { logout, updateUser } from '../../services/slices/UserSlice';

import AppHeader from '../../components/AppHeader/AppHeader';

import {
    Input,
    EmailInput,
    PasswordInput,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components';

const Profile = () => {
    const dispatch = useDispatch();

    const userData = useSelector((store) => store.userSlice.user);

    const [disabledButtonState, setDisabledButtonState] = useState(true);

    useEffect(() => {
        if (userData.email && userData.name) {
            setName(userData.name);
            setEmail(userData.email);
        }
    }, [userData]);

    const [name, setName] = useState('');
    const handleSetName = (e) => {
        userData.name !== name ? setDisabledButtonState(false) : setDisabledButtonState(true);
        setName(e.target.value);
    }

    const [email, setEmail] = useState('');
    const handleSetEmail = (e) => {
        userData.email !== email ? setDisabledButtonState(false) : setDisabledButtonState(true);
        setEmail(e.target.value);
    }

    const [password, setPassword] = useState('');
    const handleSetPassword = (e) => {
        userData.password !== password ? setDisabledButtonState(false) : setDisabledButtonState(true);
        setPassword(e.target.value);
    }

    const handleLogout = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    const handleUpdateUserData = useCallback(() => {
        dispatch(updateUser({ name, email, password }));
        setDisabledButtonState(true);
    }, [dispatch, name, email, password]);

    const handleCancelUpdateUserData = useCallback(() => {
        setName(userData.name);
        setEmail(userData.email);
        setPassword(userData.password);
    }, [userData]);

    return (
        <section className={styles.Profile}>
            <AppHeader active='profile' />
            <section className={styles.ProfileContainer}>
                <nav className={`${styles.Navigation} mt-3 mr-15`}>
                    <Link to='/profile' className={`text text_type_main-medium ${styles.Link} ${styles.text_color_active}`}>Профиль</Link>
                    <Link to='/' className={`text text_type_main-medium text_color_inactive ${styles.Link}`}>История заказов</Link>
                    <Link
                        to='/login'
                        className={`text text_type_main-medium text_color_inactive ${styles.Link}`}
                        onClick={handleLogout}
                    >
                        Выход
                    </Link>
                    <span className='text text_type_main-default text_color_inactive mt-20'>В этом разделе вы можете изменить свои персональные данные</span>
                </nav>
                <section className={styles.UserData}>
                    <Input
                        type={'text'}
                        onChange={handleSetName}
                        value={name}
                        name={'name'}
                        placeholder='Имя'
                        icon='EditIcon'
                        extraClass='mt-6'
                    />
                    <EmailInput
                        onChange={handleSetEmail}
                        value={email}
                        name={'email'}
                        placeholder='E-mail'
                        isIcon={true}
                        extraClass='mt-6'
                    />
                    <PasswordInput
                        onChange={handleSetPassword}
                        value={password}
                        name={'password'}
                        icon='EditIcon'
                        extraClass='mt-6 mb-6'
                    />
                    <section className={styles.userDataControls}>
                        <Button
                            htmlType='button'
                            type='secondary'
                            size='medium'
                            disabled={disabledButtonState}
                            onClick={handleCancelUpdateUserData}
                            extraClass={`text text_type_main-default text_color_inactive ${styles.CancelButton}`}
                        >
                            Отменить изменения
                        </Button>
                        <Button
                            htmlType='button'
                            type='primary'
                            size='medium'
                            disabled={disabledButtonState}
                            onClick={handleUpdateUserData}
                            extraClass='ml-4'
                        >
                            Сохранить
                        </Button>
                    </section>
                </section>
            </section>
        </section>
    );
};

export default memo(Profile);