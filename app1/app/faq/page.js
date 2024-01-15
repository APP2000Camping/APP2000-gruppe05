"use client";
// app/faq/page.js
//laget av sondre

import '../globals.css'; 
import NavBar from '../components/nav-bar'; 
import Footer from '../components/footer'; 

export default function FAQPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        <h1>Ofte Stilte Spørsmål</h1>
        <p>Her finner du svar på ofte stilte spørsmål om vår campingtjeneste.</p>
      </main>
      <Footer />
    </div>
  );
}
