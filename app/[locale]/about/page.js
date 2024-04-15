
// app/faq/page.js

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
        <h1>{t('about_us_header')}</h1>
        <p>
          <b>{t('our_address')}</b>
          </p>
          <p>123 Eksempel
            <br />
            Bø
          </p>
      <Article title="Om oss" content="Her skal det stå informasjon om campingplassen, de som jobber der og mer nyttig informasjon som f.eks adresse, åpningstider osv" />
      </main>
      <footer />
    </div>
    </TranslationsProvider>
  );
}
