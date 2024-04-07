"use client";
// app/faq/page.js

import '../globals.css'; 
import NavBar from '../components/nav-bar'; 
import Footer from '../components/footer'; 
import Article from '../components/article';

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
      <Article title="Om oss" content="Her skal det stå informasjon om campingplassen, de som jobber der og mer nyttig informasjon som f.eks adresse, åpningstider osv" />
      </main>
    </div>
  );
}
