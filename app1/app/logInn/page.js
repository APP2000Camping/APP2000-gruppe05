"use client";
// app/logInn/page.js
//laget av sondre

import React from 'react';
import Form from '../components/form'; // Importer Form-komponenten
import NavBar from '../components/nav-bar';
import Footer from '../components/footer';
//import { routes } from '../routes/index.js';

import '../globals.css';


export default function LogIn() {
  // Denne funksjonen vil bli kalt når brukeren sender inn skjemaet
  const handleLoginSubmit = async (formData) => {
    try {
      const response = await fetch('/api/insertData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // formData inneholder username og password
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Behandler suksessresponsen her
      const result = await response.json();
      console.log('Innlogging vellykket:', result);
    } catch (error) {
      // Håndter eventuelle feil her
      console.error('Innlogging feilet:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        <h1>Innlogging!</h1>
        <Form onSubmit={handleLoginSubmit} />
      </main>
      <Footer />
    </div>
  );
}