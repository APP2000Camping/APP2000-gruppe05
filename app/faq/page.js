"use client";
// app/faq/page.js
//laget av sondre

import '../globals.css'; 
import NavBar from '../components/nav-bar'; 
import Footer from '../components/footer'; 
import Article from '../components/article';

export default function FAQPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
      <Article title="Frequently asked questions" content="Her skal ofte spurte spørsmål stå sammen med svaret" />
      </main>
    </div>
  );
}
