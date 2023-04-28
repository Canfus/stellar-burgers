import { FC, memo, useEffect } from 'react';
import styles from './Modal.module.css';

import { createPortal } from 'react-dom';

import ModalOverlay from './ModalOverlay/ModalOverlay';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot: HTMLElement = document.getElementById('modals')!;

interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
}

const Modal: FC<ModalProps> = (props) => {
    const { children, onClose } = props;

    useEffect(() => {
        const handleKeydownModalClose = (e: KeyboardEvent) => {
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
            <div className={styles.Modal} test-id={'close-modal'}>
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

export default memo(Modal);