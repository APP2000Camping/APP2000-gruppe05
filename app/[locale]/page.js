"use client";
import './globals.css';
import TranslationsProvider from '../components/TranslationsProvider';
import News from '../components/news';
import ButtonOnPicture from "../components/buttonOnPicture";
import initTranslations from '../i18n';
import { useSession } from 'next-auth/react';

const i18nNamespaces = ['Home', 'Common'];

export default function Home({ params:{locale}}) {
  
  const { t, resources } = initTranslations(locale, i18nNamespaces);

  const { data: session } = useSession();


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

      {session ? (
        <>
        <section>
          <div className="section-row">
            <div>
              <h2>Endre bilde:</h2>
              <input type='file' onChange={handleFileChange}/>
              <button onClick={handleSubmit}>Bytt bilde</button>
            </div>
          </div>
        </section>
        </>
      ): (
        <></>
      )}
      
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