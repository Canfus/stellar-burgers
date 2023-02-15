import { memo, useEffect } from 'react';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';
import ModalOverlay from './ModalOverlay/ModalOverlay';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById('modals');

const Modal = (props) => {
    const { children, onClose } = props;

    // Add event listener when component did mount
    useEffect(() => {
        document.addEventListener('keydown', (e) => onClose(e));

        // Remove event listener when component will unmount
        return () => {
            document.removeEventListener('keydown', onClose);
        }
    }, []);

    return createPortal(
        (
            <div className={styles.Modal}>
                <ModalOverlay onClose={onClose} />
                <section className={styles.ModalContent}>
                    <section className={`${styles.Close} mt-15 mr-10`}>
                        <CloseIcon type='primary' onClick={onClose} />
                    </section>
                    {children}
                </section>
            </div>
        ), modalRoot
    );
};

Modal.propTypes = {
    children: PropTypes.element.isRequired,
    onClose: PropTypes.func.isRequired
};

export default memo(Modal);