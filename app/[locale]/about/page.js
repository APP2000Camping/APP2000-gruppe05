
// Skrevet av Jesper

import '../globals.css'; 
import Article from '../../components/article';
import TranslationsProvider from '../../components/TranslationsProvider';
import initTranslations from '../../i18n';

const i18nNamespaces = ['About us', 'Common'];

export default async function Home ({ params:{locale}}) {
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
      <footer />
    </div>
    </TranslationsProvider>
  );
}
