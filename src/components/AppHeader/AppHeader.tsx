import { FC, memo } from 'react';
import styles from './AppHeader.module.css';

import { useAppSelector } from '../../hooks/hooks';

import { NavLink } from 'react-router-dom';

import {
    BurgerIcon,
    ListIcon,
    ProfileIcon,
    Logo
} from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader: FC = () => {
    const userData = useAppSelector((store) => store.userSlice);

    return (
        <header className={styles.AppHeader}>
            <section className={styles.HeaderButtons}>
                <nav className={styles.NavButtons}>
                    <NavLink to='/' className={`${styles.AppHeaderItem} p-5`}>
                        {({ isActive }) => (
                            <>
                                <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                                <span className={`text text_type_main-default ${isActive ? styles.text_color_active : 'text_color_inactive'} ml-2`}>
                                    Конструктор
                                </span>
                            </>
                        )}
                    </NavLink>
                    <NavLink to='/feed' className={`${styles.AppHeaderItem} p-5`}>
                        {({ isActive }) => (
                            <>
                                <ListIcon type={isActive ? 'primary' : 'secondary'} />
                                <span className={`text text_type_main-default ${isActive ? styles.text_color_active : 'text_color_inactive'} ml-2`}>
                                    Лента заказов
                                </span>
                            </>
                        )}
                    </NavLink>
                </nav>
                <NavLink
                    to='/profile'
                    className={`${styles.AppHeaderItem} p-5`}
                    title={userData.isLoggedIn ? 'Перейти в личный кабинет' : 'Войти/Зарегистрироваться'}
                >
                    {({ isActive }) => (
                        <>
                            <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
                            <span className={`text text_type_main-default ${isActive ? styles.text_color_active : 'text_color_inactive'} ml-2`}>
                                {userData.isLoggedIn ? userData.user.name : 'Личный кабинет'}
                            </span>
                        </>
                    )}
                </NavLink>
            </section>
            <section className={styles.Logo}>
                <Logo />
            </section>
        </header>
    );
};

export default memo(AppHeader);