import { FC, memo } from 'react';
import styles from './ModalOverlay.module.css';

interface ModalOverlayProps {
    onClose: () => void;
}

const ModalOverlay: FC<ModalOverlayProps> = (props) => {
    return (
        <div className={styles.ModalOverlay} onClick={props.onClose} />
    );
};

export default memo(ModalOverlay);