'use client';
// components/nav-bar.js
//kode skrevet av Sondre Matre, jesper Eikeland
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import styles from './nav-bar.module.css';

const NavBar = () => {
    const {user, isLoaded} = useUser();
  return (
    <nav className={styles.navBar}>
        <div className={styles.logo}>
        <Link legacyBehavior href="/" passHref>
                <a target="_blank" rel="noopener noreferrer">
                  <img src='images/camping1.png' aria-hidden="true" className={styles.logoImg}></img>
                </a>
                </Link>
        </div>
          <div className={styles.container}>
              <div className={styles.column}>
                <ul className={styles.navList}>
                  <li className={styles.navItem}>
                    <Link href="/" passHref>
                        Hjem
                    </Link>
                   </li>
        <li className={styles.navItem}>
          <Link href="/services" passHref>
            Tjenester
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/contact" passHref>
            Kontakt oss
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/faq" passHref>
            FAQ
          </Link>
          </li>
          <li className={styles.navItem}>
          <Link href="/about" passHref>
            Om oss
          </Link>
          </li>
          <li className={styles.navItem}>
          <Link href="/booking" passHref>
            Booking
          </Link>
          </li>
        </ul>
        </div>
      </div>
      {
        isLoaded && user && (
        <>
        <div className={styles.res}>
          <UserButton afterSignOutUrl='/' />
        </div>
        </>
      )}
    </nav>
  );
};

export default NavBar;
