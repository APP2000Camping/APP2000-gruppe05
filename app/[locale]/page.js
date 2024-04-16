"use client";


import TranslationsProvider from '../components/TranslationsProvider';
import News from '../components/news';
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
          <ButtonOnPicture />
          <News />
        </main>
      </TranslationsProvider>
    </>
  );
}
