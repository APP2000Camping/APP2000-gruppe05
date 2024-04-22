"use client";
import './globals.css';
import TranslationsProvider from '../components/TranslationsProvider';
import News from '../components/news';
import ButtonOnPicture from "../components/buttonOnPicture";
import initTranslations from '../i18n';


const i18nNamespaces = ['Home', 'Common'];

export default async function Home({ params:{locale}}) {
const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
   
    <TranslationsProvider resources={resources} locale={locale} namespaces={i18nNamespaces}>
    <main>
     
      <section>
        <div className="section-row">
          <div className="picture-component">
            <ButtonOnPicture />
          </div>
        </div>
      </section>
      
      <section>
        <div className="section-row">
          <div className="news-component">
            <News />
          </div>
        </div>
      </section>
      
      <section>
        <div className="section-row">
          <div className="">
            <h1> GRID HER </h1>
          </div>
        </div>
      </section>
    </main>
  </TranslationsProvider>
    
  );
}



  

