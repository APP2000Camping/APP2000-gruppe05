"use client";

import "./globals.css";

import NavBar from "../app/components/nav-bar";
import Footer from "../app/components/footer";
import BackgroundUploader from "./components/backgrounduploader";


export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-grow">
          
          <BackgroundUploader />
         
        </main>
        <Footer />
      </div>
    </>
  );
}
