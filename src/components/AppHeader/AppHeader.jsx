import { memo } from 'react';
import styles from './AppHeader.module.css';

import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import {
    BurgerIcon,
    ListIcon,
    ProfileIcon,
    Logo
} from '@ya.praktikum/react-developer-burger-ui-components';

import { useSelector } from 'react-redux';

const AppHeader = ({ active }) => {
    const userData = useSelector((store) => store.userSlice.user);

    return (
        <header className={styles.AppHeader}>
            <section className={styles.HeaderButtons}>
                <nav className={styles.NavButtons}>
                    <Link to='/' className={`${styles.AppHeaderItem} p-5`}>
                        <BurgerIcon type={active === 'constructor' ? 'primary' : 'secondary'} />
                        <span className={`text text_type_main-default ${active === 'constructor' ? styles.text_color_active : 'text_color_inactive'} ml-2`}>
                            Конструктор
                        </span>
                    </Link>
                    <Link to='/' className={`${styles.AppHeaderItem} p-5`}>
                        <ListIcon type={active === 'orderlist' ? 'primary' : 'secondary'} />
                        <span className={`text text_type_main-default ${active === 'orderlist' ? styles.text_color_active : 'text_color_inactive'} ml-2`}>
                            Лента заказов
                        </span>
                    </Link>
                </nav>
                <Link
                    to='/profile'
                    className={`${styles.AppHeaderItem} p-5`}
                    title={userData.name ? 'Перейти в личный кабинет' : 'Войти/Зарегистрироваться'}
                >
                    <ProfileIcon type={active === 'profile' ? 'primary' : 'secondary'} />
                    <span className={`text text_type_main-default ${active === 'profile' ? styles.text_color_active : 'text_color_inactive'} ml-2`}>
                        { userData.name ? userData.name : 'Личный кабинет' }
                    </span>
                </Link>
            </section>
            <section className={styles.Logo}>
                <Logo />
            </section>
        </header>
    );
};

AppHeader.propTypes = {
    active: PropTypes.string.isRequired
};

export default memo(AppHeader);