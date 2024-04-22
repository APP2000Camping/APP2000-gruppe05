// components/BookingForm.js

import React from 'react';
import styles from './bookingForm.module.css';
import { useTranslation } from 'react-i18next';

export default function BookingForm({ handleBooking }) {
  const { t } = useTranslation();

  const handleSubmit = (event) => {
    event.preventDefault(); 
    const formData = new FormData(event.target);
    const bookingData = {
      plassNr: formData.get('PlassNr'),
      type: formData.get('type'),
      navn: formData.get('name'),
      email: formData.get('email'),
      tlfnr: formData.get('phone'),
      dato: formData.get('date')
    };
    handleBooking(bookingData); 
  };

  return (
    <div>
      <h1 className={styles.title}>{t('booking_title')}</h1>
      <div className={styles.bookingForm}>
        <div className={styles.formWrapper}>
          <form onSubmit={handleSubmit}>
            <div className={styles.bookingItem}>
              <label htmlFor="PlassNr">{t('booking_area')}</label>
              <input type="text" id="PlassNr" name="PlassNr" placeholder="PlassNr" required />
            </div>
            <div className={styles.bookingItem}>
              <label htmlFor="type">{t('booking_type')}</label>
              <input type="text" id="type" name="type" placeholder="Type" required />
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
