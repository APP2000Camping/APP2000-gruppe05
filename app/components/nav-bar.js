'use client';

import Link from 'next/link';
import styles from './nav-bar.module.css';
import { useTranslation } from 'react-i18next';
import { signOut, useSession } from 'next-auth/react';

export default function NavBar() {
  const { data: session } = useSession();
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
          <div>
            {!session ? (
              <>
                <ul className={styles.navList}>
                  <li className={styles.navItem}>
                    <Link href="/login">
                      Login
                    </Link>
                  </li>
                  <li className={styles.navItem}>
                    <Link href="/register">
                      Register
                    </Link>
                  </li>
                </ul>
              </>
            ): (
            <>
              <ul className={styles.navList}>
                <li className={styles.navItem}>
                  <Link href="/mySite">
                    {session.user?.name}
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <button onClick={() => { signOut(); }} className={styles.resKnapp}>
                    Logout
                  </button>
                </li>
              </ul>
            </>
            )}
          </div>
      </nav>
  );
};

