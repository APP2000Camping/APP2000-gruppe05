"use client";
// app/faq/page.js
//laget av sondre

import '../globals.css'; 
import NavBar from '../components/nav-bar'; 
import Footer from '../components/footer'; 
import Article from '../components/article';

export default function Services() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
      <Article title="Tjenester" content="Her skal det stå hvilke tjenester denne campingplassen leverer" />
      </main>
    </div>
  );
}
