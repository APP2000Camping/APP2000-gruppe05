/* Skrevet av Jesper */
'use client'
import React from 'react';
import styles from "./article.module.css";
import { useTranslation } from 'react-i18next';

export default function article() {
  const {t} = useTranslation();
    return (
    <div className={styles.articleContainer}>
        <artikkel>
            <h1 className={styles.articleTitle}>{t('ArticleHeader')}</h1>
            <p className={styles.articleContent}>{t('ArticleContent')}</p>
        </artikkel>
    </div>
    );
};

