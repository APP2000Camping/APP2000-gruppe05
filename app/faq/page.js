/**@author sondreem */
'use client';
import React, { useState, useEffect } from 'react';
import { Button, Accordion, AccordionItem } from '@nextui-org/react';
import { parseHtmlToTitle } from '../components/parser';
import ArticleEditor from '../components/editingComponent'; 
import DOMPurify from 'dompurify';


const FAQPage = () => {
  const [articles, setArticles] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1); 

  useEffect(() => {
    const fetchArticles = async () => {
      console.log("Henter artikler fra serveren...");
      try {
          const response = await fetch('/api/getArticle');
          if (response.ok) {
              const data = await response.json();
              const formattedArticles = data.map(article => ({
                  ...article,
                  id: article._id  
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
    console.log("Editing article at index:", index);
    setEditingIndex(index);
};

const handleSubmit = async (index) => {
  const article = articles[index];
  const isNewArticle = !article.id;
  const method = isNewArticle ? 'POST' : 'PUT';
  const apiEndpoint = isNewArticle ? '/api/sendArticle' : `/api/putArticle?id=${article.id}`;

  try {
    const response = await fetch(apiEndpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: article.title, content: article.content }),
    });

    if (response.ok) {
      const updatedArticle = await response.json();
      const newArticles = articles.map((art, idx) => {
        if (idx === index) {
          return { ...art, id: updatedArticle.id || art.id }; 
        }
        return art;
      });
      setArticles(newArticles);
      setEditingIndex(-1); 
    } else {
      console.error('Feil ved oppdatering av artikkel');
    }
  } catch (error) {
    console.error('Nettverksfeil ved oppdatering av artikkel:', error);
  }
};

const handleDeleteArticle = async (index) => {
  const article = articles[index];
  if (!article.id) {
      console.log('Artikkelen har ingen ID, kan ikke slettes.');
      return;
  }

  try {
      const response = await fetch(`/api/delArticle?id=${article.id}`, {
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
      console.error('Network error deleting article:', error);
  }
};





  const handleAddArticle = () => {
  const newArticle = { title: 'Skriv inn Spørsmålet med en av heading alternativene. Bruk paragraf som spørsmål', content: '' };
  setArticles([...articles, newArticle]);
  setEditingIndex(articles.length); 
};

return (
  <div className="flex flex-col min-h-screen">
    <main className="flex-grow">
      <Button onClick={handleAddArticle}>Legg til Artikkel</Button>
      <Accordion selectionMode="multiple">
        {articles.map((article, index) => (
          <AccordionItem key={index} title={<h2 style={{ fontWeight: 'bold' }}>{article.title}</h2>} textValue={article.title}>
            {editingIndex === index ? (
              <>
         <ArticleEditor
            initialContent={article.content}
            handleEditorChange={(content) => handleEditorChange(index, content)}
        />
        <Button onClick={() => handleSubmit(index)}>Lagre Endringer</Button>
        <Button onClick={() => setEditingIndex(-1)}>Avbryt</Button>
        {article.id && <Button onClick={() => handleDeleteArticle(index)}>Slett Artikkel</Button>}
    </>
            ) : (
              <>
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content) }} />
                <Button onClick={() => startEditing(index)}>Rediger Artikkel</Button>
              </>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </main>
    <footer />
  </div>
);

              }

export default FAQPage;

            