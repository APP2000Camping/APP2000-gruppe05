import React from 'react';
import Link from 'next/link';
import styles from './bookingButton.module.css';

const bookingButton = () => {
    return (
        <div className={styles.buttonContainer}>
        <Link href="/booking">
            <p className={styles.bookingButton}>Sjekk ut hva vi tilbyr!</p>
        </Link>
        </div>
    );
};

export default bookingButton;