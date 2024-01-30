"use client";
// app/faq/page.js

import '../globals.css'; 
import NavBar from '../components/nav-bar'; 
import Footer from '../components/footer'; 

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        <h1>OM OSS!</h1>
        <p>Her skal du kunne lese om oss.</p>
      </main>
      <Footer />
    </div>
  );
}
