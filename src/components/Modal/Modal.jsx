// Import React functions
import { memo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';

// Import components
import ModalOverlay from './ModalOverlay/ModalOverlay';

// Import Burger UI components
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

// Create root
const modalRoot = document.getElementById('modals');

const Modal = (props) => {
    const { children, onClose } = props;

    // Add event listener when component did mount
    useEffect(() => {
        const handleKeydownModalClose = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        }

        // Add event listener when component did mount
        document.addEventListener('keydown', handleKeydownModalClose);

        // Remove event listener when component will unmount
        return () => {
            document.removeEventListener('keydown', handleKeydownModalClose);
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