//skrevet av Jesper

'use client'
import React from 'react';
import TranslationsProvider from '../../components/TranslationsProvider';
import initTranslations from '../../i18n';
import ContactForm from '@/app/components/contactForm';
import styles from './contact.module.css'

const i18nNamespaces = ['Contact', 'Common']; // bestemmer hvilke namespaces som skal bli brukt fra i18nexus for denne filen


export default async function Contact ({ params: { locale } }) { // denne koden setter opp kontaktsiden og initialiserer oversettelser basert på den gitte lokaliseringen og namespaces
  const { t, resources } = await initTranslations(locale, i18nNamespaces); 
  

  return (
    <TranslationsProvider 
      resources={resources}
      locale={locale}
      namespaces={i18nNamespaces}>
      <div className="flex flex-col min-h-screen">
        <main> 
        <div className={styles.blurBackground}></div>
            <ContactForm />
        </main>
      </div>
    </TranslationsProvider>
  );
}
