import { memo, useEffect } from 'react';
import styles from './Modal.module.css';

import { createPortal } from 'react-dom';

import PropTypes from 'prop-types';

import ModalOverlay from './ModalOverlay/ModalOverlay';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById('modals');

const Modal = (props) => {
    const { children, onClose } = props;

    useEffect(() => {
        const handleKeydownModalClose = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        }
        document.addEventListener('keydown', handleKeydownModalClose);

        return () => {
            document.removeEventListener('keydown', handleKeydownModalClose);
        }
    }, [onClose]);

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