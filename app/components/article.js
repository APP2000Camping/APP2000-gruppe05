/* Skrevet av Jesper */

import React from 'react';
import styles from "./article.module.css";

const article = ({title, content}) => {
    return (
    <div className={styles.articleContainer}>
        <artikkel>
            <h1 className={styles.articleTitle}>{title}</h1>
            <p className={styles.articleContent}>{content}</p>
        </artikkel>
    </div>
    );
};

export default article;