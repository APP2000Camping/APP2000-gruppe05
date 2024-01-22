"use client";
// app/logInn/page.js
//laget av sondre

import React from 'react';
import Form from '../components/form'; // Importer Form-komponenten
import NavBar from '../components/nav-bar';
import Footer from '../components/footer';
import { registerUser } from '../lib/db';

import '../globals.css';


export default function LogIn() {
  // Denne funksjonen vil bli kalt når brukeren sender inn skjemaet
  const handleLoginSubmit = async (userID, password) => {
    registerUser(userID, password);
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