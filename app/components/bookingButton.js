'use client'
import React from 'react';
import Link from 'next/link';
import styles from './bookingButton.module.css';
import { useTranslation } from 'react-i18next';

export default function bookingButton() {
  const {t} = useTranslation();

    return (
        <div className={styles.buttonContainer}>
        <Link href="/booking">
            <p className={styles.bookingButton}>{t('home_button')}</p>
        </Link>
        </div>
    );
};

