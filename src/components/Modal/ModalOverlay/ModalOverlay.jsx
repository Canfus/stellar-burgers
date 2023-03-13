import { memo } from 'react';
import styles from './ModalOverlay.module.css';

import PropTypes from 'prop-types';

const ModalOverlay = (props) => {
    return (
        <div className={styles.ModalOverlay} onClick={props.onClose} />
    );
};

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired
}

export default memo(ModalOverlay);