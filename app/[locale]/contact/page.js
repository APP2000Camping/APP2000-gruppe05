'use client'
import React from 'react';
import TranslationsProvider from '../../components/TranslationsProvider';
import initTranslations from '../../i18n';
import ContactForm from '@/app/components/contactForm';

const i18nNamespaces = ['Contact', 'Common'];


export default async function Contact ({ params: { locale } }) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespaces}>
      <div className="flex flex-col min-h-screen">
        <main>
            <ContactForm />
        </main>
      </div>
    </TranslationsProvider>
  );
}
