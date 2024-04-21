'use client'
import React from "react";
import PropTypes from 'prop-types';
import styles from './picture.module.css';
import { useTranslation } from 'react-i18next';

export default function Picture ({imageUrl, altText, caption}) {
    const {t} = useTranslation();

    return (
        <div className={styles.pictureContainer}>
            <img src={imageUrl} alt={altText} className={styles.picture} />
            <div className={styles.gradientOverlayTop}></div>
            <div className={styles.gradientOverlayBottom}></div>
            {caption && <p className={styles.caption}>{caption}</p>}
        </div>
    );
};

Picture.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    altText: PropTypes.string.isRequired,
    caption: PropTypes.string,
};

