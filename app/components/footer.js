'use client'
import React from 'react';
import Link from 'next/link';
import styles from './footer.module.css';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';




export default function Footer() {
  const {t} = useTranslation();
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles['footer-col']}>
          <h4>Campingplass1</h4>
            <ul className={styles.footList}>
              <li className={styles.navItem}>
                  <Link href="/about" passHref>
                  {t('footer_about')}
                  </Link>
              </li>
              <li className={styles.footItem}>
                 <Link href="/services" passHref>
                 {t('footer_services')}
                 </Link>
              </li>
              <li className={styles.footItem}>
                  <Link href="/contact" passHref>
                  {t('footer_contact')}
                  </Link>
              </li>
              
            </ul>
          </div>
          <div className={styles['footer-col']}>
            <h4>{t('footer_madeby')}</h4>
          </div>
          <div className={styles['footer-col']}>
            <h4>{t('footer_title2')}</h4>
            <div className={styles['social-links']}>
              <Link legacyBehavior href="https://www.facebook.com"  passHref>
                <a target="_blank" rel="noopener noreferrer">
                  <img src='images/faclogo.png' aria-hidden="true" className={styles.FooterIconfac}></img>
                </a>
              </Link>
              <Link legacyBehavior href="https://www.instagram.com" passHref>
                <a target="_blank" rel="noopener noreferrer">
                  <img src='images/inlogo.png' aria-hidden="true" className={styles.FooterIconin}></img>
                </a>
              </Link>
              <Link legacyBehavior href="https://twitter.com" passHref>
                <a target="_blank" rel="noopener noreferrer">
                  <img src='images/twlogo.png' aria-hidden="true"className={styles.FooterIcontw}></img>
                </a>
              </Link>
              
            </div>
            <LanguageSwitcher />
          </div>
          
        </div>
        
      </div>
      
    </footer>
  );
};


