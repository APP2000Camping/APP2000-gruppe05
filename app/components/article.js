import React from 'react';
import styles from './article.module.css';
import {Button} from '@nextui-org/react';

const defaultContent = { title: '', content: '' };

export default function Article({ content = defaultContent, onEdit }) {
  return (
    <div className={styles.articleContainer}>
      <article>
        <h1 className={styles.articleTitle}>{content.title}</h1>
        <div 
          className={styles.articleContent} 
          dangerouslySetInnerHTML={{ __html: content.content }}  
        />
        <Button onClick={onEdit}>Rediger</Button>
      </article>
    </div>
  );
}