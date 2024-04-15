/* Skrevet av Jesper */

import React from 'react';
import styles from "./article.module.css";

const article = () => {
    return (
    <div className={styles.articleContainer}>
        <artikkel>
            <h1 className={styles.articleTitle}>Dette er en artikkel</h1>
            <p className={styles.articleContent}>Her kan det stå informasjon</p>
        </artikkel>
    </div>
    );
};

export default article;