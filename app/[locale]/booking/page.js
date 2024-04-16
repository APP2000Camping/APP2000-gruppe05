// Skrevet av Jesper
import React from 'react';

import '../globals.css';  
import BookingForm from '../../components/bookingForm';
import TranslationsProvider from '../../components/TranslationsProvider';
import initTranslations from '../../i18n';



 

const i18nNamespaces = ['Booking', 'Common'];

export default async function BookingPage ({ params:{locale}}) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  return (

    <TranslationsProvider 
      resources={resources} 
      locale={locale} 
      namespaces={i18nNamespaces}>
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
      <BookingForm />
      </main>
      <footer />
    </div>
    </TranslationsProvider> )
};