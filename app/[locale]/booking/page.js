'use client';

import React, { useState, useEffect } from 'react';
import '../globals.css';
import BookingForm from '../../components/bookingForm';
import TranslationsProvider from '../../components/TranslationsProvider';
import initTranslations from '../../i18n';

const i18nNamespaces = ['Booking', 'Common'];

export default function BookingPage({ params: { locale } }) {
  const [booking, setBooking] = useState([]);
  const [translations, setTranslations] = useState({ t: () => '', resources: {} });

  useEffect(() => {
    async function loadTranslations() {
      const translationResult = await initTranslations(locale, i18nNamespaces);
      setTranslations(translationResult);
    }
    loadTranslations();
  }, [locale]);

  useEffect(() => {
    async function fetchBooking() {
      console.log("Henter booking fra serveren...");
      try {
        const response = await fetch('/api/getBooking');
        if (response.ok) {
          const data = await response.json();
          const formattedBooking = data.map(bookingData => ({
            id: bookingData.id,
            plassNr: bookingData.plassNr,
            type: bookingData.type,
            navn: bookingData.navn,
            email: bookingData.email,
            tlfnr: bookingData.tlfnr,
            dato: bookingData.dato
          }));
          console.log("booking med ID:", formattedBooking);
          setBooking(formattedBooking);
        } else {
          console.error('Feil ved henting av booking');
        }
      } catch (error) {
        console.error('Nettverksfeil ved henting av booking:', error);
      }
    }
    fetchBooking();
  }, []);
  const handleBooking = async (bookingData) => {
    const apiEndpoint = '/api/sendBooking';
  
    try {
      console.log("Sending booking data to:", apiEndpoint);
  
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plassNr: bookingData.plassNr,
          type: bookingData.type,
          navn: bookingData.navn,
          email: bookingData.email,
          tlfnr: bookingData.tlfnr,
          dato: bookingData.dato
        }),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log("Booking response data:", responseData);
  
     
      } else {
        const errorDetails = await response.json();
        console.error('Feil ved opprettelse av booking:', errorDetails);
      }
    } catch (error) {
      console.error('Nettverksfeil ved opprettelse av booking:', error);
    }
  };

  return (
    <TranslationsProvider 
      resources={translations.resources} 
      locale={locale} 
      namespaces={i18nNamespaces}>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
        <BookingForm handleBooking={handleBooking} />
        </main>
        <footer />
      </div>
    </TranslationsProvider>
  );
}
