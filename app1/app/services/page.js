"use client";
// app/faq/page.js
//laget av sondre

import '../globals.css'; 
import NavBar from '../components/nav-bar'; 
import Footer from '../components/footer'; 

export default function Services() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        <h1>Tjenester</h1>
        <p>her er hvilke tjenester du kan få hos oss</p>
      </main>
      <Footer />
    </div>
  );
}
