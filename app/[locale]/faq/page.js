'use client';
import React from 'react';
import '../globals.css';
import Article from '../../components/article';
import ArticleEditor from '../../components/editingComponent'; 
import { Button } from '@nextui-org/react'; // Oppdatert import

const FAQPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Article title="Frequently asked questions" content="Her skal ofte spurte spørsmål stå sammen med svaret" />
        <ArticleEditor /> 
        <div>
          <Button>Click me</Button>
        </div>
      </main>
      <footer />
    </div>
  );
};

export default FAQPage;
