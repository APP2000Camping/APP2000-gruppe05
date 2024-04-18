"use client";

//laget av Jesper

import '../globals.css'; 
import Article from '../../components/article';
import TranslationsProvider from '../../components/TranslationsProvider';
import initTranslations from '../../i18n';
import Grid from '../../components/grid'


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

      <h1>{t('grid_title')}</h1>
      <Grid />
      <Article />
      </main>
    </div>
    </TranslationsProvider> 
  );
}
