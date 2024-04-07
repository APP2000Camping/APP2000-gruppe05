import React from "react";
import PropTypes from 'prop-types';
import styles from './picture.module.css';

const picture = ({imageUrl, altText, caption}) => {
    return (
        <div className={styles.pictureContainer}>
            <img src={imageUrl} alt={altText} className={styles.picture} />
            {caption && <p className={styles.caption}>{caption}</p>}
        </div>
    );
};

picture.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    altText: PropTypes.string.isRequired,
    caption: PropTypes.string,
};

export default picture;