'use client';
import React, { useState, useEffect } from 'react';
import '../globals.css';
import BookingForm from '../../components/bookingForm';
import TranslationsProvider from '../../components/TranslationsProvider';
import initTranslations from '../../i18n';
import styles from '../booking/booking.module.css';

const i18nNamespaces = ['Booking', 'Common'];

export default function BookingPage({ params: { locale } }) {
  const [booking, setBooking] = useState([]);
  const [translations, setTranslations] = useState({ t: () => '', resources: {} });
  const [availableSites, setAvailableSites] = useState([]);


 // Effekt for å laste oversettelser basert på den valgte lokaliseringen.
useEffect(() => {
  async function loadTranslations() {
   
    const translationResult = await initTranslations(locale, i18nNamespaces);
    setTranslations(translationResult);
  }
  // Kaller funksjonen for å laste oversettelser når lokaliseringen endres.
  loadTranslations();
}, [locale]);

// Effekt for å hente bookingdata og tilgjengelige plasser fra serveren ved lasting av komponenten.
useEffect(() => {
  async function fetchBookingAndAvailableSites() {
    console.log("Fetching booking data from the server...");
    try {
      const response = await fetch('/api/getBooking');
      const allSites = Array.from({ length: 20 }, (v, i) => `A${i + 1}`);

      if (response.ok) {
        // Behandler svaret hvis det var vellykket.
        const bookingData = await response.json();
        const formattedBooking = bookingData.map(booking => ({
          id: booking.id,
          plassNr: booking.plassNr,
          type: booking.type,
          navn: booking.navn,
          email: booking.email,
          fraDato: booking.fraDato,
          tilDato: booking.tilDato
        }));
        console.log("Booking data with IDs:", formattedBooking);

        // Lager et sett med opptatte plasser.
        const occupiedSites = new Set(formattedBooking.map(b => b.plassNr));
        // Filtrer ut tilgjengelige plasser ved å sammenligne med opptatte plasser.
        const availableSitesData = allSites.filter(site => !occupiedSites.has(site));
        // Oppdaterer tilstanden med de tilgjengelige plassene.
        setAvailableSites(availableSitesData);
      } else {
        // Håndterer feil ved henting av bookingdata.
        console.error('Error fetching booking data');
       
        setAvailableSites(allSites);
      }
    } catch (error) {
      // Håndterer nettverksfeil ved henting av bookingdata
      console.error('Network error while fetching booking data:', error);
     
      setAvailableSites(allSites);
    }
  }
  // Kaller funksjonen for å hente bookingdata og tilgjengelige plasser når komponenten lastes
  fetchBookingAndAvailableSites();
}, []);

// Funksjon for å håndtere booking
const handleBooking = async (bookingData) => {
  const apiEndpoint = '/api/sendBooking';

  try {
    console.log("Sending booking data to:", apiEndpoint);

    // Sender bookingdataen til serveren.
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        plassNr: bookingData.plassNr,
        type: bookingData.type,
        navn: bookingData.navn,
        email: bookingData.email,
        tlfnr: bookingData.tlfnr,
        fraDato: bookingData.fraDato,
        tilDato: bookingData.tilDato
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
      <BookingForm handleBooking = {handleBooking} availableSites={availableSites}/>
      <div className={styles.background}></div>
      </main>
    </div>
    </TranslationsProvider> )
};


