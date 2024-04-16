'use client'

// components/BookingForm.js
import React from 'react';
import styles from './bookingForm.module.css';
import { useTranslation } from 'react-i18next';

export default function BookingForm() {
  const {t} = useTranslation();

  return (
    
    <div>
      <h1>{t('booking_title')}</h1>
      <div className={styles.bookingForm}>
      <div className={styles.formWrapper}>
      <form>
      <div className={styles.bookingItem}>
          <label htmlFor="Plass">{t('booking_area')}</label>
          <input type="PlassNr" id="PlassNr" name="PLassNr" placeholder="PlassNr" required />
        </div>
        <div className={styles.bookingItem}>
          <label htmlFor="type">{t('booking_type')}</label>
          <input type="type" id="type" name="type" placeholder="Type" required />
        </div>
        <div className={styles.bookingItem}>
          <label htmlFor="name">{t('booking_name')}</label>
          <input type="text" id="name" name="name" placeholder="Navn" required />
        </div>
        <div className={styles.bookingItem}>
          <label htmlFor="email">{t('booking_email')}</label>
          <input type="email" id="email" name="email" placeholder="Email" required />
        </div>
        <div className={styles.bookingItem}>
          <label htmlFor="phone">{t('booking_phone')}</label>
          <input type="tel" id="phone" name="phone" placeholder="Telefonnummer" required />
        </div>
        <div className={styles.bookingItem}>
          <label htmlFor="date">{t('booking_date')}</label>
          <input type="date" id="date" name="date" required />
        </div>
        <button className={styles.formButton} type="submit">{t('booking_button')}</button>
      </form>
      </div>
      </div>
    </div>
  );
};



