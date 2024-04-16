'use client';
import React from 'react';
import '../globals.css';
import Article from '../../components/article';
import ArticleEditor from '../../components/editingComponent'; 
import { Button } from '@nextui-org/react'; // Oppdatert import
import TranslationsProvider from '../../components/TranslationsProvider';
import initTranslations from '../../i18n';



 

const i18nNamespaces = ['FAQ', 'Common'];

export default async function FAQ ({ params:{locale}}) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider 
      resources={resources} 
      locale={locale} 
      namespaces={i18nNamespaces}>
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
      <Article />
      <ArticleEditor /> 
        <div>
          <Button>Click me</Button>
        </div>
      </main>
    </div>
    </TranslationsProvider> 
  );
}



