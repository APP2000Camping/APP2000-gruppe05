"use client";
//Skrevet av Rolf

import '../globals.css';
import styles from '../../components/form.module.css';
import Link from "next/link";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

export default function Home() {
    const [error, setError] = useState('');
    const router = useRouter();
    const session = useSession();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    useEffect(() => {
        if (session?.status === "authenticated") {
            router.replace("/");
        }
    }, [session, router])

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
            setError("Passord må være over 8 bokstaver")
            return;
        }

        const response = await signIn("credentials", {
            redirect: false,
            email,
            password
        })

        if (response?.error) {
            setError("Invalid email or password");
            console.log("Innlogging feilet")
            if (response?.url) {
                router.replace("/");
                console.log("Innlogging virket");
            }
        } else {
            setError("");
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className={styles.formContainer}>
                <main>
                    <h1 className="text-4xl text-center font-semibold mb-8">Login</h1>
                    <form onSubmit = {handleSubmit} className={styles.form}>

                    <input
                    type="text"
                    className={styles.inputField}
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    placeholder = "Skriv email"
                    required
                    />

                    <input 
                    type="password"
                    className= {styles.inputField}
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    placeholder = "Skriv passord"
                    required
                    />

                    <button type="submit" className={styles.submitButton}>Log inn</button>
                    <p className={styles.error}>{error}</p>

                    <Link href="/register">Registrer bruker</Link>
                    </form>
                </main>
            </div>
        </div>
    );
}