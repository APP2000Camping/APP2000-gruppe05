"use client";
//Skrevet av Rolf

import '../globals.css';
import styles from '../../components/form.module.css';
import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  
  const [error, setError] = useState('')
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!isValidEmail(email)) {
      return;
    }
    
    if (!password || password.length < 8) {
      return;
    }

    try {
      const response = await fetch("../api/register", {
        method: "POST", // POST for å sende data
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ // Konverterer javascript verdi til JSON objekt
          "email": email,
          "password": password,
        }),
      });

      if (response) {
        const data = await response.json();
        console.log(data);
      }
      if (response.status == 400) {
        setError("Denne mailen er allerede i bruk");
      } if (response.status == 201) {
        setError("");
        router.push("/login")
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
        <div className={styles.formContainer}>
            <main>
                <h1 className="text-4xl text-center font-semibold mb-8">Registrer</h1>
                <form onSubmit = {handleSubmit} className={styles.form}>

                  <input
                  type="text"
                  className={styles.inputField}
                  value={email}
                  onChange={(e)=> setEmail(e.target.value)}
                  placeholder = "Skriv email"
                  />

                  <input 
                  type="password"
                  className= {styles.inputField}
                  value={password}
                  onChange={(e)=> setPassword(e.target.value)}
                  placeholder = "Skriv passord"
                  />

                  <p className={styles.error}>{error}</p>
                  <button type="submit" className={styles.submitButton}>Registrer</button>

                  <Link href="/login">Log inn med en eksisterende bruker</Link>
                </form>
            </main>
        </div>
    </div>
  );
}
