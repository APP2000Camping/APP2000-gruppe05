// Skrevet av Sondre
import React from 'react';
import styles from './grid.module.css';
import Article from './article';
import { useTranslation } from 'react-i18next';



export default function Grid({ articles, onEdit }) {
  const {t} = useTranslation();
  const backgroundImageUrl = 'https://media.istockphoto.com/id/1055977770/photo/camping-site-with-the-blurred-camper-caravan-cars-on-a-fjord-shore-n.jpg?s=2048x2048&w=is&k=20&c=pxd2_t5n6oyQBZ9ShprCdqqdBjWhWlxTMSjoz6fAgmQ=';
  return (
    <div className={styles.backgroundContainer}>
      <div className={styles.blurBackground} style={{ backgroundImage: `url(${backgroundImageUrl})` }}></div>
      <div className={styles.gridContainer}>
      <div className={styles.overlayGrid}>
                <h2 className={styles.title}>{t('Om oss')}</h2>
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
