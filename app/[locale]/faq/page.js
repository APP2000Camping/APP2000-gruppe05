'use client';
// Skrevet av Sondre
import React, { useState, useEffect } from 'react';
import { Button, Accordion, AccordionItem } from '@nextui-org/react';
import ArticleEditor from '../../components/editingComponent';
import DOMPurify from 'dompurify';
import styles from '../faq/faq.module.css';
import TranslationsProvider from '../../components/TranslationsProvider';
import initTranslations from '../../i18n';
import { parseHtmlToTitle } from '@/app/components/parser';
import { useSession } from 'next-auth/react';

const i18nNamespaces = ['FAQ', 'Common'];

export default function FAQ({ params: { locale } }) {
  const [t, setT] = useState(() => (key) => key);
  const [resources, setResources] = useState({});
  const [articles, setArticles] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const { data: session } = useSession();

  useEffect(() => {
    async function loadTranslations() {
      const translationResult = await initTranslations(locale, i18nNamespaces);
      setT(() => translationResult.t);
      setResources(translationResult.resources);
    }
    loadTranslations();
  }, [locale]);

  useEffect ( () => {
    const fetchArticles = async () => {
      console.log("Henter artikler fra serveren...");
      try {
        const response = await fetch('/api/getArticle?section=FAQ');
          if (response.ok) {
              const data = await response.json();
              const formattedArticles = data.map(article => ({
                id: article._id, 
                title: article.title,
                content: article.content
              }));
              console.log("Artikler hentet med ID:", formattedArticles);
              setArticles(formattedArticles);
          } else {
              console.error('Feil ved henting av artikler');
          }
      } catch (error) {
          console.error('Nettverksfeil ved henting av artikler:', error);
      }
  };
  
  
  
    fetchArticles();
  }, []);
    //viktig i andre
  const handleEditorChange = (index, htmlContent) => {
    const { title, content } = parseHtmlToTitle(htmlContent);
    const updatedArticles = articles.map((article, i) => {
      if (i === index) {
        return { ...article, title, content };
      }
      return article;
    });
    setArticles(updatedArticles);
  };

  const startEditing = (index) => {
    console.log("oppdaterer artikkel med index:", index);
    setEditingIndex(index);
};

//viktig i andre
const handleSubmit = async (index) => {
  if (index < 0 || index >= articles.length) {
    console.error("Invalid index: Index is out of bounds.");
    return; 
  }

  const article = { ...articles[index], section: 'FAQ' };
  const isNewArticle = !article.id;  
  const method = isNewArticle ? 'POST' : 'PUT';
  const apiEndpoint = isNewArticle ? '/api/sendArticle' : `/api/putArticle?id=${encodeURIComponent(article.id)}`;

  try {
    console.log("Sending request to:", apiEndpoint);
    
    const response = await fetch(apiEndpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: article.id,
        title: article.title,
        content: article.content,
        section:'FAQ'
        
      }),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("Response data:", responseData);

      let newArticles = [...articles];
      if (isNewArticle) {
        newArticles[index] = { ...article, id: responseData.id };
      } else {
        newArticles = newArticles.map((art, idx) => idx === index ? { ...art, ...responseData } : art);
      }

      setArticles(newArticles);
      setEditingIndex(-1);
    } else {
      const errorDetails = await response.json();
      console.error('Feil ved oppdatering av artikkel:', errorDetails);
    }
  } catch (error) {
    console.error('Nettverksfeil ved oppdatering av artikkel:', error);
  }
};


  //viktig
const handleDeleteArticle = async (index) => {
  const article = articles[index];
  if (!article.id) {
      console.log('Artikkelen har ingen ID, kan ikke slettes.');
      return;
  }

  try {
    const response = await fetch(`/api/delArticle?id=${article.id}&section=FAQ`, {
          method: 'DELETE',
      });

      if (response.ok) {
          console.log(`Article med ID: ${article.id} er slettet.`);
          const newArticles = articles.filter((_, i) => i !== index);
          setArticles(newArticles);
      } else {
          console.error('Error ved sletting av artikkel');
      }
  } catch (error) {
      console.error('Network error ved sletting av artikkel', error);
  }
};

  const handleAddArticle = () => {
  const newArticle = { title: 'Skriv inn Spørsmålet med en av heading alternativene. Bruk paragraf som spørsmål', content: '',section:'FAQ' };
  setArticles([...articles, newArticle]);
  setEditingIndex(articles.length); 
};

  return (
    <TranslationsProvider resources={resources} locale={locale} namespaces={i18nNamespaces}>
      <div className="flex flex-col min-h-screen">
        <main>
          <div className={styles.blurBackground}></div>
          {session && session.user.role === "admin" && (
            <Button onClick={handleAddArticle}>Legg til Artikkel</Button>
          )}
          <Accordion className={styles.accordionContainer} selectionMode="multiple">
            {articles.map((article, index) => (
              <AccordionItem key={index} title={<h2 style={{ fontWeight: 'bold' }}>{article.title}</h2>} textValue={article.title}>
                {editingIndex === index ? (
                  <>
                    <ArticleEditor initialContent={article.content} handleEditorChange={(content) => handleEditorChange(index, content)} />
                    <Button onClick={() => handleSubmit(index)}>Lagre Endringer</Button>
                    <Button className={styles.cancelButton} onClick={() => setEditingIndex(-1)}>Avbryt</Button>
                    {article.id && <Button className={styles.delButton} onClick={() => handleDeleteArticle(index)}>Slett Artikkel</Button>}
                  </>
                ) : (
                  <>
                    <div className={styles.articleContent} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content) }} />
                    {session && session.user.role === "admin" && (
                    <Button onClick={() => startEditing(index)}>Rediger Artikkel</Button>
                    )}
                  </>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </main>
      </div>
    </TranslationsProvider>
  );
}
