/*Skrevet av Jesper*/

'use client'

// components/BookingForm.js
import React from 'react';
import styles from './contactForm.module.css';
import { useTranslation } from 'react-i18next';

export default function ContactForm() {
  const {t} = useTranslation();
  const email = 'Campingplass1@gmail.com';
  const tlf = '+ 47 999999999';

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t('contact_us')}</h1> {/*Her brukes use translation på key footer_about for å hente fra i18Nexus-databasen*/}
      <h2 className={styles.title}>{t('contact_p')}</h2> {/*Her brukes use translation på key footer_about for å hente fra i18Nexus-databasen*/}
         <div className={styles.contactForm}>
        <div className={styles.formWrapper}>
        <form>
      <div className={styles.contactItem}>
            <label htmlFor="name">{t('contact_name')}</label>
            <input type="text" id="name" name="name" required />
        </div>
        <div className={styles.contactItem}>
            <label htmlFor="email">{t('contact_urmail')}</label>
            <input type="email" id="email" name="email" required />
        </div>
        <div className={styles.contactItem}>
            <label htmlFor="message">{t('contact_message')}</label>
            <textarea id="message" name="message" rows="4" required></textarea>
        </div>
        <button className={styles.formButton} type="submit">{t('contact_submit')}</button>
        </form>
            
        </div>
            <div className={styles.contactForm}>
              <h2 className={styles.title}>{t('contact_info')}</h2>
              <p className={styles.contactItem}>{t('contact_email', {email})}</p>
              <p className={styles.contactItem}>{t('contact_phone', {tlf})}</p>
            </div>
    
    </div>
      </div>
    
  );
};



