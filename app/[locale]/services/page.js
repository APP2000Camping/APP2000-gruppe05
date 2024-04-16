"use client";
// app/faq/page.js
//laget av sondre

import '../globals.css'; 
import Article from '../../components/article';
import TranslationsProvider from '../../components/TranslationsProvider';
import initTranslations from '../../i18n';



 

const i18nNamespaces = ['Services', 'Common'];

export default async function Services ({ params:{locale}}) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider 
      resources={resources} 
      locale={locale} 
      namespaces={i18nNamespaces}>
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
      <Article />
      </main>
    </div>
    </TranslationsProvider> 
  );
}
