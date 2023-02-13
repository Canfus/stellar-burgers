import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { memo } from 'react';
import styles from './AppHeader.module.css';

const AppHeader = () => {
    return (
        <header className={styles.AppHeader}>
            <section className={styles.HeaderButtons}>
                <nav className={styles.NavButtons}>
                    <a href='#' className={`${styles.AppHeaderItem} p-5`}>
                        <BurgerIcon type='primary' />
                        <span className={`text text_type_main-default ${styles.text_color_active} ml-2`}>
                            Конструктор
                        </span>
                    </a>
                    <a href='#' className={`${styles.AppHeaderItem} p-5`}>
                        <ListIcon type='secondary' />
                        <span className='text text_type_main-default text_color_inactive ml-2'>
                            Лента заказов
                        </span>
                    </a>
                </nav>
                <a href='#' className={`${styles.AppHeaderItem} p-5`}>
                    <ProfileIcon type='secondary' />
                    <span className='text text_type_main-default text_color_inactive ml-2'>
                        Личный кабинет
                    </span>
                </a>
            </section>
            <section className={styles.Logo}>
                <Logo />
            </section>
        </header>
    );
};

export default memo(AppHeader);