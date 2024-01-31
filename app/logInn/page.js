// Skrevet av Rolf
"use client";
import { useState } from 'react';
import '../globals.css';
import NavBar from '../components/nav-bar';
import Footer from '../components/footer';
import styles from '../logInn/login.module.css';

export default function Home() {
  // Må være const, initialiserer userID og password, vil bli sent gjennom api-en
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    //e.preventDefault(); // Stopper siden fra å refreshe
    try {
      // Kaller på api-en
      const response = await fetch("../api/registerUser", {
        method: "POST", // POST for å sende data
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ // Konverterer javascript verdi til JSON objekt
          "userID": userID,
          "password": password,
        }),
      });

      if (response) {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Lager siden med form
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className = {styles.formContainer}>
      <form onSubmit = {handleSubmit} className={styles.form}>

      <input
      type="text"
      className={styles.inputField}
      value={userID}
      onChange={(e)=> setUserID(e.target.value)}
      placeholder = "Skriv brukernavn"
      />

      <input 
      type="password"
      className= {styles.inputField}
      value={password}
      onChange={(e)=> setPassword(e.target.value)}
      placeholder = "Skriv passord"
      />

      <button type="submit">Log inn</button>
      </form>
      </div>
      <Footer />
    </div>
  )
}
