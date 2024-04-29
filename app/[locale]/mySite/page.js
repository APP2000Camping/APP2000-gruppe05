'use client'
// Skrevet av Rolf / Jesper

import React from 'react';
import TranslationsProvider from '../../components/TranslationsProvider';
import initTranslations from '../../i18n';
import styles from './mySite.module.css';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const i18nNamespaces = ['mySite', 'Common'];

export default function mySite({ params: { locale } }) {
    const { t, resources } = initTranslations(locale, i18nNamespaces);
    const { data: session } = useSession();

    const [bookings, setBookings] = useState([]);
    
    // Henter email, rolle og tlfnr fra session, hentes utenfor useEffect sånn session ikke er tom når den blir hentet
    const userEmail = session && session.user ? session.user.email : '';
    const userRole = session && session.user ? session.user.role : '';
    const userTlf = session && session.user ? session.user.tlf : '';

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                if (userEmail) {
                    console.log("userEmail found");
                    const response = await fetch(`/api/getBooking?email=${encodeURIComponent(userEmail)}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch bookings');
                    }
                    const data = await response.json();
                    setBookings(data);
                    console.log(data);
                }
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, [userEmail]);

    return (
        <TranslationsProvider
        resources={resources}
        locale={locale}
        namespaces={i18nNamespaces}>

        {!session ? (
            <h2 className={styles.headerUlogget}>Logg inn for å se min side</h2>
            
        ): (
            <div className={styles.main}>

                <div>
                    <h2>Min profil</h2>
                </div>
                <div className={styles.Item}>
                    <ul className={styles.booking}>
                        <li>Navn: {session.user.name}</li>
                        <li>Email: {userEmail}</li>
                        <li>Telefonnummer: {userTlf}</li>
                        <li>Min rolle: {userRole}</li>
                    </ul>
                </div>
            
                <div>
                    <h2>Dine reservasjoner</h2>
                </div>
                <div className={styles.Item}>
                    <ul>
                        {bookings.length > 0 ? (
                            bookings.map((booking) => (
                                <div key={booking._id} className={styles.booking}>
                                    <li>Navn: {booking.navn}</li>
                                    <li>Plassnummer: {booking.plassNr}</li>
                                    <li>Type: {booking.type}</li>
                                    <li>Telefonnummer:  {booking.tlfnr}</li>
                                    <li>Startdato: {booking.dato}</li>
                                    <li>Sluttdato {booking.dato}</li>
                                </div> 
                            ))
                        ) : (
                            <li style={{ listStyleType: 'none' }}>Ingen reservasjoner funnet</li>
                        )}
                    </ul>
                </div>
            </div>
        )}
    
        </TranslationsProvider>
    );
}