"use client";

import "./globals.css";

import NavBar from "../app/components/nav-bar";
import Footer from "../app/components/footer";
import ImageUploader from "./components/ImageUploader";

export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-grow">
          {/* Resten av hjemmesidens innhold her */}
          <ImageUploader />
        </main>
        <Footer />
      </div>
    </>
  );
}
