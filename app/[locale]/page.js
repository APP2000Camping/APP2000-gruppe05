"use client";


import TranslationsProvider from '../components/TranslationsProvider';
import Article from '../components/article';
import ButtonOnPicture from "../components/buttonOnPicture";
import initTranslations from '../i18n';

const i18nNamespaces = ['Home', 'Common'];

export default async function Home({ params:{locale}}) {
const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <>
      <TranslationsProvider 
      resources={resources} 
      locale={locale} 
      namespaces={i18nNamespaces}>
        <main className="flex-grow">
          <h1>{t('home_header')}</h1>
          <ButtonOnPicture />
          <Article title="Nyheter" content="Her kommer det til å stå nyheter om hva som skjer på campingplassen" />
        </main>
      </TranslationsProvider>
    </>
  );
}
