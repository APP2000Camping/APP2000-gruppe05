// Skrevet av Sondre / Jesper
import React from 'react';
import styles from './article.module.css';
import {Button} from '@nextui-org/react';
import { useSession } from 'next-auth/react';

const defaultContent = { title: '', content: '' };

export default function Article({ content = defaultContent, onEdit }) {
  const { data: session } = useSession();
  return (
    <div className={styles.articleContainer}>
      <article>
        <h1 className={styles.articleTitle}>{content.title}</h1>
        <div 
          className={styles.articleContent} 
          dangerouslySetInnerHTML={{ __html: content.content }}  
        />
        {session && session.user.role === "admin" && (
        <Button onClick={onEdit}>Rediger</Button>
        )}
      </article>
    </div>
  );
}