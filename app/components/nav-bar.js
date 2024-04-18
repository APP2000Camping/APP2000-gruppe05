'use client';

import Link from 'next/link';
import styles from './nav-bar.module.css';
import { useTranslation } from 'react-i18next';

export default function NavBar() {
  const {t} = useTranslation();
  return (
    <nav className={styles.navBar}>
        <div className={styles.logo}>
        <Link legacyBehavior href="/" passHref >
                <a target="_blank" rel="noopener noreferrer" >
                  <img src='images\Camping1.png' aria-hidden="true" className={styles.logoImg}></img>
                </a>
                </Link>
        </div>
          <div className={styles.container}>
              <div className={styles.column}>
                <ul className={styles.navList}>
                  <li className={styles.navItem}>
                    <Link href="/" passHref>
                        {t('navbar_home')}
                    </Link>
                   </li>
        <li className={styles.navItem}>
          <Link href="/services" passHref>
            {t('navbar_services')}
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/contact" passHref>
            {t('navbar_contact')}
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/faq" passHref>
            {t('navbar_faq')}
          </Link>
          </li>
          <li className={styles.navItem}>
          <Link href="/about" passHref>
            {t('navbar_about')}
          </Link>
          </li>
          <li className={styles.navItem}>
          <Link href="/booking" passHref>
            {t('navbar_booking')}
          </Link>
          </li>
        </ul>
        </div>
      </div>
      <div className={styles.navMySite}>
          <Link href="/mySite" passHref>
            {t('navbar_mysite')}
          </Link>
        </div>
    </nav>
  );
};

