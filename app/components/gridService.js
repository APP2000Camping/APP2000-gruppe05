// Skrevet av Sondre
import React from 'react';
import styles from './grid.module.css';
import Article from './article';
import { useTranslation } from 'react-i18next';



export default function Grid({ articles, onEdit }) {
  const {t} = useTranslation();
  
  return (
    <div className={styles.backgroundContainer}>
      <div className={styles.blurBackground}></div>
      <div className={styles.gridContainer}>
      <div className={styles.overlayGrid}>
                <h2 className={styles.title}>{t('service_title')}</h2>
      </div>
        {articles.map((article, index) => (
          <div key={article.id} className={styles.gridItem}>
            <Article
              content={article}
              onEdit={() => onEdit(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
