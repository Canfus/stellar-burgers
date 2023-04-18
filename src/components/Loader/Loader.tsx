import { FC, memo } from 'react';

import styles from './Loader.module.css';

const Loader: FC = () => {
    return (
        <div className={styles.LoaderContainer}>
            <section className={styles.Loading}>
                <div className={styles.Loader}>
                    <span></span>
                </div>
                <p className='text text_type_main-medium mt-10'>Отправляем заказ по спутнику</p>
            </section>
        </div>
    );
};

export default memo(Loader);