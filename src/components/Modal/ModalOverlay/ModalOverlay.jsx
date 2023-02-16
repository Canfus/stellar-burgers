import { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './ModalOverlay.module.css';

const ModalOverlay = (props) => {
    return (
        <div className={styles.ModalOverlay} onClick={props.onClose} />
    );
};

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired
}

export default memo(ModalOverlay);