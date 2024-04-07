"use client";

import "./globals.css";
import NavBar from '../app/components/nav-bar';
import Footer from '../app/components/footer';
import Article from './components/article';
import ButtonOnPicture from "./components/buttonOnPicture";


export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-grow">
        <ButtonOnPicture />
        <Article title="Nyheter" content="Her kommer det til å stå nyheter om hva som skjer på campingplassen" />
        </main>
        <Footer />
      </div>
    </>
  );
}
