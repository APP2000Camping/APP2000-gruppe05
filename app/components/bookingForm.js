// Skrevet av Sondre / Jesper

import React from 'react';
import styles from './bookingForm.module.css';
import { useTranslation } from 'react-i18next';

export default function BookingForm({ handleBooking, availableSites }) {
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
      fraDato: formData.get('date'),
      tilDato: formData.get('date')
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
              <select id="PlassNr" name="PlassNr" required>
                {availableSites.map(site => (
                  <option key={site} value={site}>{site}</option>
                ))}
              </select>
            </div>
            <div className={styles.bookingItem}>
              <label htmlFor="type">{t('booking_type')}</label>
              <select id="type" name="type" required>
                <option value="">{t('select_type')}</option>
                <option value="bobil">{t('motorhome')}</option>
                <option value="teltplass">{t('tent spot')}</option>
                <option value="bobil_med_båtkai">{t('motorhome with dock')}</option>
                <option value="hytteplass">{t('cabin')}</option>
              </select>
            </div>
            <div className={styles.bookingItem}>
              <label htmlFor="name">{t('booking_name')}</label>
              <input type="text" id="name" name="name" placeholder={t('booking_name')} required />
            </div>
            <div className={styles.bookingItem}>
              <label htmlFor="email">{t('booking_email')}</label>
              <input type="email" id="email" name="email" placeholder={t('booking_email')} required />
            </div>
            <div className={styles.bookingItem}>
              <label htmlFor="phone">{t('booking_phone')}</label>
              <input type="tel" id="phone" name="phone" placeholder={t('booking_phone')} required />
            </div>
            <div className={styles.bookingItem}>
              <label htmlFor="date">{t('booking_date')}</label>
              <input type="date" id="date" name="date" required />
            </div>
            <div className={styles.bookingItem}>
              <label htmlFor="date">{t('booking_date')}</label>
              <input type="date" id="date" name="date" required />
            </div>
            <div className={styles.bookingItem}>
              <label htmlFor="date">{t('booking_dateStart')}</label>
              <input type="date" id="date" name="date" required />
            </div>
            <div className={styles.bookingItem}>
              <label htmlFor="date">{t('booking_dateEnd')}</label>
              <input type="date" id="date" name="date" required />
            </div>
            <button className={styles.formButton} type="submit">{t('booking_button')}</button>
          </form>
        </div>
      </div>
    </div>
  );
  
}