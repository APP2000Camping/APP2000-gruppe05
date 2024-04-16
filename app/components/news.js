/* Skrevet av Jesper */
'use client'
import React from 'react';
import styles from "./news.module.css";
import { useTranslation } from 'react-i18next';

export default function News() {
  const {t} = useTranslation();
    return (
    <div className={styles.newsContainer}>
        <artikkel>
            <h1 className={styles.newsTitle}>{t('news_title')}</h1>
            <p className={styles.newsContent}>{t('news_content')}</p>
        </artikkel>
    </div>
    );
};