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

 // Effekt for å laste oversettelser basert på den valgte lokaliseringen.
useEffect(() => {
  async function loadTranslations() {
    const translationResult = await initTranslations(locale, i18nNamespaces);
   
    setT(() => translationResult.t);
    setResources(translationResult.resources);
  }
  // Kaller funksjonen for å laste oversettelser når lokaliseringen endres.
  loadTranslations();
}, [locale]);

// Effekt for å hente artikler fra serveren når komponenten lastes.
useEffect(() => {
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

  // Kaller funksjonen for å hente artikler når komponenten lastes.
  fetchArticles();
}, []);

// Funksjon for å håndtere endring av innhold i redigeringskomponenten.
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

// Funksjon for å starte redigering av en artikkel.
const startEditing = (index) => {
  console.log("oppdaterer artikkel med index:", index);
  setEditingIndex(index);
};

// Funksjon for å sende endringer til serveren.
const handleSubmit = async (index) => {
 

  
  if (index < 0 || index >= articles.length) {
    console.error("Invalid index: Index is out of bounds.");
    return;
  }

  // Opprette eller oppdatere artikkel basert på om den er ny eller eksisterende.
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
        section: 'FAQ'
      }),
    });

   
    if (response.ok) {
      
    } else {
      
    }
  } catch (error) {
    console.error('Nettverksfeil ved oppdatering av artikkel:', error);
  }
};

// Funksjon for å slette en artikkel.
const handleDeleteArticle = async (index) => {
 
};

// Funksjon for å legge til en ny artikkel.
const handleAddArticle = () => {
  // Oppretter en ny artikkel med standardverdier og legge den til i tilstanden.
  const newArticle = { title: 'Skriv inn Spørsmålet med en av heading alternativene. Bruk paragraf som spørsmål', content: '', section: 'FAQ' };
  setArticles([...articles, newArticle]);
  // Setter indeksen for redigering til den nyeste artikkelen.
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
