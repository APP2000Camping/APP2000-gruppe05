'use client'
// Laget av Rolf

import React from 'react';
import TranslationsProvider from '../../components/TranslationsProvider';
import initTranslations from '../../i18n';
import styles from './mySite.module.css';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const i18nNamespaces = ['Contact', 'Common'];

export default function mySite({ params: { locale } }) {
    const { t, resources } = initTranslations(locale, i18nNamespaces);
    const { data: session } = useSession();

    const [bookings, setBookings] = useState([]);

    const userEmail = session && session.user ? session.user.email : '';

    useEffect(() => {
        console.log("useEffect reached");
        const fetchBookings = async () => {
            console.log("fetchBookings called");
            try {
                console.log("try reached");
                if (userEmail) {
                    console.log("userEmail found");
                    const response = await fetch(`/api/getBooking?email=${encodeURIComponent(userEmail)}`);
                    console.log(response);
                    if (!response.ok) {
                        console.log("response not ok");
                        throw new Error('Failed to fetch bookings');
                    }
                    const data = await response.json();
                    setBookings(data);
                    console.log(data);
                    console.log("data set to booking const");
                }
            } catch (error) {
                console.log("try failed");
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
            <h2>Logg inn for å se min side</h2>
        ): (
            <div className={styles.main}>
                <div>
                    <h2>Bruker: {session.user.name}</h2>
                </div>
                <div>
                    <h2>Email: {userEmail}</h2>
                </div>
                <div>
                    <h2>Dine booking:</h2>
                    <ul>
                        {bookings.length > 0 ? (
                            bookings.map((booking) => (
                                <div key={booking._id}>
                                    <li>{booking.navn}</li>
                                    <li>{booking.plassNr}</li>
                                    <li>{booking.type}</li>
                                    <li>{booking.dato}</li>
                                    <li>{booking.tlfnr}</li>
                                </div> 
                            ))
                        ) : (
                            <li>No bookings found</li>
                        )}
                    </ul>
                </div>
            </div>
        )}
    
        </TranslationsProvider>
    );
}