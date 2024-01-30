"use client";

import "./globals.css";

import NavBar from '../app/components/nav-bar';
import Footer from '../app/components/footer';
import BackgroundPicture from './components/backgroundpicture';


export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-grow">
          <BackgroundPicture />
        </main>
        <Footer />
      </div>
    </>
  );
}
