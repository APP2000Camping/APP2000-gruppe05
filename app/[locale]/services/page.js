"use client";
// Skrevet av Sondre
import React, { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';
import TranslationsProvider from '../../components/TranslationsProvider';
import initTranslations from '../../i18n';
import Grid from '../../components/gridService';
import ArticleEditor from '../../components/editingComponent'; 
import { parseHtmlToTitle } from '@/app/components/parser';
import DOMPurify from 'dompurify';
import { useSession } from 'next-auth/react';

const i18nNamespaces = ['Services', 'Common'];

export default function Services ({ params:{locale}}) {
  const [t, setT] = useState(() => (key) => key);
  const [resources, setResources] = useState({});
  const [articles, setArticles] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const { data: session } = useSession();

  // Effekt for å laste oversettelser basert på den valgte lokaliseringen.
useEffect(() => {
  async function loadTranslations() {
    // Kaller initTranslations-funksjonen for å laste oversettelsene.
    const translationResult = await initTranslations(locale, i18nNamespaces);
    // Setter oversettelsesfunksjonen og ressursene fra resultatet.
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
      // Sender forespørsel til serveren for å hente artikler fra seksjonen 'Services'.
      const response = await fetch('/api/getArticle?section=Services');
      if (response.ok) {
        
        const data = await response.json();
        
        const formattedArticles = data.map(article => ({
          id: article._id,
          title: article.title,
          content: article.content
        }));
        console.log("Artikler hentet med ID:", formattedArticles);
        // Oppdaterer tilstanden med de hentede artiklene.
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

// Funksjon for å sende endringer til serveren.
const handleSubmit = async (index) => {
  if (index < 0 || index >= articles.length) {
    console.error("Invalid index: Index is out of bounds.");
    return; 
  }

  // Henter den aktuelle artikkelen som skal oppdateres.
  const article = { ...articles[index], section: 'Services' };
  const isNewArticle = !article.id;  
  const method = isNewArticle ? 'POST' : 'PUT';
  const apiEndpoint = isNewArticle ? '/api/sendArticle' : `/api/putArticle?id=${encodeURIComponent(article.id)}`;

  try {
    console.log("Sending request to:", apiEndpoint);
    // Sender forespørsel til serveren med artikkeldetaljer.
    const response = await fetch(apiEndpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(article),
    });

    // Behandle svaret fra serveren.
    if (response.ok) {
      // Behandle suksesssituasjonen
      const responseData = await response.json();
      console.log("Response data:", responseData);

      // Oppdaterer tilstanden med de nye artiklene.
      let newArticles = [...articles];
      if (isNewArticle) {
        newArticles[index] = { ...article, id: responseData.id };
      } else {
        newArticles = newArticles.map((art, idx) => idx === index ? { ...art, ...responseData } : art);
      }

      setArticles(newArticles);
      setEditingIndex(-1);
    } else {
      // Behandle feilsituasjonen
      const errorDetails = await response.json();
      console.error('Feil ved oppdatering av artikkel:', errorDetails);
    }
  } catch (error) {
    // Håndterer nettverksfeil ved oppdatering av artikkel.
    console.error('Nettverksfeil ved oppdatering av artikkel:', error);
  }
};

// Funksjon for å slette en artikkel.
const handleDeleteArticle = async (index) => {
  const article = articles[index];
  if (!article.id) {
    console.log('Artikkelen har ingen ID, kan ikke slettes.');
    return;
  }

  try {
    const response = await fetch(`/api/delArticle?id=${encodeURIComponent(article.id)}&section=Services`, {
      method: 'DELETE',
    });

   
    if (response.ok) {
      
      console.log(`Artikkel med ID: ${article.id} er slettet.`);
     
      const newArticles = articles.filter((_, i) => i !== index);
      setArticles(newArticles);
    } else {
     
      console.error('Feil ved sletting av artikkel');
    }
  } catch (error) {
    
    console.error('Nettverksfeil ved sletting av artikkel', error);
  }
};

// Funksjon for å legge til en ny artikkel.
const handleAddArticle = () => {
  const newArticle = { title: '', content: '', section: 'Services' };
  setArticles([...articles, newArticle]);
  setEditingIndex(articles.length); 
};


  return (
    <TranslationsProvider resources={resources} locale={locale} namespaces={i18nNamespaces}>
        <div className="flex flex-col min-h-screen">
            <main>
              {session && session.user.role === "admin" && (
                <Button onClick={handleAddArticle}>Legg til Artikkel</Button>
              )}
                {editingIndex >= 0 ? (
                    <>
                        <ArticleEditor
                            initialContent={DOMPurify.sanitize(articles[editingIndex].content)}
                            handleEditorChange={(content) => handleEditorChange(editingIndex, content)}
                        />
                        <Button onClick={() => handleSubmit(editingIndex)}>Lagre Endringer</Button>
                        <Button onClick={() => setEditingIndex(-1)}>Avbryt</Button>
                        <Button onClick={() => handleDeleteArticle(editingIndex)}>Slett Artikkel</Button>
                    </>
                ) : (
                    <Grid
                        articles={articles.map(article => ({
                            ...article,
                            content: DOMPurify.sanitize(article.content)
                        }))}
                        onEdit={setEditingIndex}
                    />
                    
                )}
                
            </main>
        </div>
    </TranslationsProvider>
  );
}
