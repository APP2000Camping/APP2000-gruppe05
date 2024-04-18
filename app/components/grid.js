// components/GridComponent.js
import React from 'react';
import styles from './grid.module.css';
import { useTranslation } from 'react-i18next';

export default function Grid() {
  const { t } = useTranslation();
  return (
    <div className={styles.gridContainer}>
      <div className={styles.gridItem}>
        <h2>{t('gridI1_title')}</h2>
        <p>{t('gridI1_content')}</p>
      </div>
      <div className={styles.gridItem}>
        <h2>{t('gridI2_title')}</h2>
        <p>{t('gridI2_content')}</p>
      </div>
      <div className={styles.gridItem}>
        <h2>{t('gridI3_title')}</h2>
        <p>{t('gridI3_content')}</p>
      </div>
    </div>
  );
};


