'use client'
import React from 'react';
import Picture from './picture';
import BookingButton from './bookingButton';
import styles from './buttonOnPicture.module.css';
import { useTranslation } from 'react-i18next';

export default function ButtonOnPicture() {
  const {t} = useTranslation();
    return (
        <div className={styles.buttonOnPicture}>
            <div className={styles.overlay}>
                <h2 className={styles.title}>{t('home_title')}</h2>
                <h1 className={styles.heading}>Campingplass1</h1>
            </div>
            <Picture imageUrl="https://media.istockphoto.com/id/840781816/photo/family-vacation-travel-rv-holiday-trip-in-motorhome-caravan-car-vacation-beautiful-nature.jpg?s=1024x1024&w=is&k=20&c=S37uwCKAbtIz7wVCKXG9l6IUPVYpRFGmLuj19IaZdKw=" altText="placeholder" />
            <div className={styles.gradientOverlayButton}><BookingButton /></div>
        </div>
    );
};

