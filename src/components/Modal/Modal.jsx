import { memo } from 'react';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';
import ModalOverlay from './ModalOverlay/ModalOverlay';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modals');

const Modal = (props) => {
    const { children, onClose } = props;

    return createPortal(
        (
            <div className={styles.Modal}>
                <ModalOverlay onClose={onClose} />
                <section className={styles.ModalContent}>
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