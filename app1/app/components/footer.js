import React from 'react';
import Link from 'next/link';
import styles from './footer.module.css';


const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles['footer-col']}>
            <h4>Camping</h4>
            <ul className={styles.footList}>
              <li className={styles.navItem}>
                  <Link href="/about" passHref>
                     Om oss
                  </Link>
              </li>
              <li className={styles.footItem}>
                 <Link href="/services" passHref>
                     Tjenester
                 </Link>
              </li>
              <li className={styles.footItem}>
                  <Link href="/contact" passHref>
                     Kontakt oss!
                  </Link>
              </li>
              <li className={styles.footItem}>
                  <Link href="/faq" passHref>
                    FAQ
                 </Link>
              </li>
                <li className={styles.footItem}>
                  <Link href="/logInn" passHref>
                    Logg inn
                  </Link>
              </li>
            </ul>
          </div>
          <div className={styles['footer-col']}>
            <h4>© 2024 laget av Sondre, Matias, Jesper, Rolf, Marcus.</h4>
          </div>
          <div className={styles['footer-col']}>
            <h4>Utforsk</h4>
            <div className={styles['social-links']}>
              <Link legacyBehavior href="https://www.facebook.com" passHref>
                <a target="_blank" rel="noopener noreferrer">
                  <img src='images/faclogo.png' aria-hidden="true"></img>
                </a>
              </Link>
              <Link legacyBehavior href="https://www.instagram.com" passHref>
                <a target="_blank" rel="noopener noreferrer">
                  <img src='images/inlogo.png' aria-hidden="true"></img>
                </a>
              </Link>
              <Link legacyBehavior href="https://twitter.com" passHref>
                <a target="_blank" rel="noopener noreferrer">
                  <img src='images/twlogo.png' aria-hidden="true"></img>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
