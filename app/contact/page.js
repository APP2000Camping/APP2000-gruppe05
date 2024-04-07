"use client";
// app/faq/page.js
//laget av sondre

import '../globals.css';
import NavBar from '../components/nav-bar';
import Footer from '../components/footer';

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <h1>Kontakt oss</h1>
        <p>her er hvordan dere kan kontakte oss: </p>
      </main>
    </div>
  );
}
