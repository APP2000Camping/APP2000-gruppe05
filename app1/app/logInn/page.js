"use client";
// app/logInn/page.js
//laget av sondre

import '../globals.css'; 
import NavBar from '../components/nav-bar'; 
import Footer from '../components/footer'; 

export default function LogIn() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        <h1>Innlogging!</h1>
        <p>Skriv inn brukernavn og Passord her:  </p>
      </main>
      <Footer />
    </div>
  );
}