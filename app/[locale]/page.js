"use client";
import './globals.css';
import TranslationsProvider from '../components/TranslationsProvider';
import News from '../components/news';
import ButtonOnPicture from "../components/buttonOnPicture";
import initTranslations from '../i18n';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';

const i18nNamespaces = ['Home', 'Common'];

export default function Home({ params:{locale}}) {


const { data: session } = useSession(); 
const [t, setT] = useState(() => (key) => key);
const [resources, setResources] = useState({});


useEffect(() => {
  async function loadTranslations() {
    const translationResult = await initTranslations(locale, i18nNamespaces);
    setT(() => translationResult.t);
    setResources(translationResult.resources);
  }
  loadTranslations();
}, [locale]);


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

      {session && session.user.role === "admin" && (
        <>
        <section>
          <div className="section-row">
            <div>
              <h2>Endre bilde:</h2>
              <input type='file' />
              <button >Bytt bilde</button>
            </div>
          </div>
        </section>
        </>
      ) } 
      
      <section>
        <div className="section-row">
          <div className="news-component">
            <News />
          </div>
        </div>
      </section>
      
    </main>
  </TranslationsProvider>
    
  );
}