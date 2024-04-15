'use client';
import React, { useState } from 'react';
import '../globals.css';
import Article from '../components/article'; // Sørg for at dette er riktig importert
import ArticleEditor from '../components/editingComponent'; // Aktivert import
import { Button, Accordion, AccordionItem } from '@nextui-org/react';

const FAQPage = () => {
  const [articleContent, setArticleContent] = useState(''); // Tilstand for å holde på redigert innhold

  // Håndterer endringer i editoren
  const handleEditorChange = (content) => {
    setArticleContent(content);
  };

  // Oppdatert for å inkludere innsending av `articleContent`
  const handleSubmit = async (e) => {
    e.preventDefault(); // Forhindrer at siden refresher
    console.log("Bruker Lagt inn");
    try {
      // Kaller på API-endepunktet
      const response = await fetch("../api/sendArticle", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: "articleFaq",
          article: articleContent, // Sender det redigerte innholdet
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Kanskje nullstill `articleContent` her eller gi tilbakemelding til brukeren
      } else {
        console.error("Server feil");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Article title="Frequently asked questions" content="Her skal ofte spurte spørsmål stå sammen med svaret" />
        <Accordion selectionMode="multiple">
          <AccordionItem key="editor" title="Edit FAQ">
            <ArticleEditor initialContent={articleContent} handleEditorChange={handleEditorChange} />
          </AccordionItem>
          {/* Flere AccordionItem for FAQ om nødvendig */}
        </Accordion>
        <div>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </main>
      <footer />
    </div>
  );
};

export default FAQPage;
