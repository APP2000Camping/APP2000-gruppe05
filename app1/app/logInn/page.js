"use client";
// app/logInn/page.js
//laget av sondre

import React from 'react';
import '../globals.css'; 
import NavBar from '../components/nav-bar'; 
import Footer from '../components/footer'; 
import Form from '../components/form'; 

export default function LogIn() {
  const handleLoginSubmit = (inputValue) => {
    //  håndterer innsendingen av innloggingsdataen
    console.log('Innloggingsinformasjon:', inputValue);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        <h1>Innlogging!</h1>
        <p>Skriv inn brukernavn og passord her:</p>
        <Form onSubmit={handleLoginSubmit} /> {/* Bruk Form-komponenten */}
      </main>
      <Footer />
    </div>
  );
}
