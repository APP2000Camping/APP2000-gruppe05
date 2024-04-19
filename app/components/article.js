import React from 'react';
import DOMPurify from 'dompurify';
import styles from './article.module.css';
import { Button } from '@nextui-org/react'; 

export default function Article({ content, onEdit }) {
  return (
    <div className={styles.articleContainer}>
      <article>
        <h1 className={styles.articleTitle}>{content.title}</h1>
        <div 
          className={styles.articleContent} 
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content.content) }} 
        />
        
        <Button onClick={onEdit} auto ghost>
          Rediger
        </Button>
      </article>
    </div>
  );
}
