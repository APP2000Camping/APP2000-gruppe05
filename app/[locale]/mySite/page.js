// Skrevet av Jesper

import '../globals.css'; 
import TranslationsProvider from '../../components/TranslationsProvider';
import initTranslations from '../../i18n';
import User from '../../components/mySiteUser';

const i18nNamespaces = ['My Page', 'Common'];

export default async function myPage ({ params:{locale}}) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  return (

    <TranslationsProvider 
      resources={resources} 
      locale={locale} 
      namespaces={i18nNamespaces}>
    <div className="flex flex-col min-h-screen">
      <main>
      <User />
      </main>
    </div>
    </TranslationsProvider>
  );
}