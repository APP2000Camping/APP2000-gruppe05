/*Skrevet av Jesper/Rolf*/

"use client";
// Skrevet av Jesper / Sondre
import './globals.css'; 
import TranslationsProvider from '../components/TranslationsProvider';
import initTranslations from '../i18n';
import Grid from './../components/gridHome'; 
import ArticleEditor from './../components/editingComponent'; 
import { parseHtmlToTitle } from '@/app/components/parser';
import DOMPurify from 'dompurify';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@nextui-org/react';
import ButtonOnPicture from "../components/buttonOnPicture";

const i18nNamespaces = ['Home', 'Common']; // bestemmer hvilke namespaces som skal bli brukt fra i18nexus for denne filen

export default function Home({ params:{locale}}) {
  const { data: session } = useSession();
  const [t, setT] = useState(() => (key) => key);
  const [resources, setResources] = useState({});
  const [articles, setArticles] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);


  useEffect(() => {
    async function loadTranslations() {
      const translationResult = await initTranslations(locale, i18nNamespaces);
      setT(() => translationResult.t);
      setResources(translationResult.resources);
    }
    loadTranslations();
  }, [locale]);

  useEffect(() => {
    const fetchArticles = async () => {
      console.log("Fetching articles from the server...");
      try {
        const response = await fetch('/api/getArticle?section=Home');
        if (response.ok) {
          const data = await response.json();
          const formattedArticles = data.map(article => ({
            id: article._id,
            title: article.title,
            content: article.content
          }));
          console.log("Articles fetched with IDs:", formattedArticles);
          setArticles(formattedArticles);
        } else {
          console.error('Error fetching articles');
        }
      } catch (error) {
        console.error('Network error when fetching articles:', error);
      }
    };
    fetchArticles();
  }, []);

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

  const handleSubmit = async (index) => {
    if (index < 0 || index >= articles.length) {
      console.error("Invalid index: Index is out of bounds.");
      return;
    }

    const article = { ...articles[index], section: 'Home' };
    const isNewArticle = !article.id;
    const method = isNewArticle ? 'POST' : 'PUT';
    const apiEndpoint = isNewArticle ? '/api/sendArticle' : `/api/putArticle?id=${encodeURIComponent(article.id)}`;

    try {
      console.log("Sending request to:", apiEndpoint);
      const response = await fetch(apiEndpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article),
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
        console.error('Error updating article:', errorDetails);
      }
    } catch (error) {
      console.error('Network error updating article:', error);
    }
  };

  const handleDeleteArticle = async (index) => {
    const article = articles[index];
    if (!article.id) {
      console.log('Article has no ID, cannot be deleted.');
      return;
    }

    try {
      const response = await fetch(`/api/delArticle?id=${encodeURIComponent(article.id)}&section=Home`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log(`Article with ID: ${article.id} has been deleted.`);
        const newArticles = articles.filter((_, i) => i !== index);
        setArticles(newArticles);
      } else {
        console.error('Error deleting article');
      }
    } catch (error) {
      console.error('Network error deleting article', error);
    }
  };

  const handleAddArticle = () => {
    const newArticle = { title: '', content: '', section: 'Home' };
    setArticles([...articles, newArticle]);
    setEditingIndex(articles.length);
  };


  return (
    <TranslationsProvider resources={resources} locale={locale} namespaces={i18nNamespaces}>
      <main>
        <section>
          <div className="section-row">
            <div className="picture-component">
              <ButtonOnPicture />  
            </div>
          </div>
        </section>

        {session && session.user.role === "admin" && (
          <>
            <section>
              <div className="section-row">
                
                {editingIndex >= 0 ? (
                  
                  <>
                    <ArticleEditor
                      initialContent={editingIndex >= 0 && articles[editingIndex] ? DOMPurify.sanitize(articles[editingIndex].content) : ''}
                      handleEditorChange={(content) => handleEditorChange(editingIndex, content)}
                    />
                    <button onClick={() => handleSubmit(editingIndex)}>Lagre Endringer</button>
                    <button onClick={() => setEditingIndex(-1)}>Avbryt</button>
                    <button onClick={() => handleDeleteArticle(editingIndex)}>Slett Artikkel</button>
                  </>
                ) : (
                  null
                )}
              </div>
            </section>
            {articles.length > 0 && (
              <section>
                
                
              </section>
            )}
          </>
        )}

        <section>
          <div className="section-row">
            <Grid
              articles={articles}
              onEdit={setEditingIndex}  
            />
          </div>
        </section>

       
        <section>
          <div className="section-row">
            <div className="">
              
            </div>
          </div>
        </section>

      </main>
    </TranslationsProvider>
  );
}