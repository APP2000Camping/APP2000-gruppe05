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
            <ul>
              <li>
                <Link href="index.html" passHref>
                  <a className={styles.link}>Om oss</a>
                </Link>
              </li>
              <li>
                <Link href="booking.html" passHref>
                  <a className={styles.link}>Booking</a>
                </Link>
              </li>
              <li>
                <Link href="contact.html" passHref>
                  <a className={styles.link}>Kontakt</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles['footer-col']}>
            <h4>© 2024 laget av Sondre, Matias, Jesper, Rolf, Marcus.</h4>
          </div>
          <div className={styles['footer-col']}>
            <h4>Følg oss</h4>
            <div className={styles['social-links']}>
              <Link href="https://www.facebook.com" passHref>
                <a target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f" aria-hidden="true"></i>
                </a>
              </Link>
              <Link href="https://www.instagram.com" passHref>
                <a target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram" aria-hidden="true"></i>
                </a>
              </Link>
              <Link href="https://twitter.com" passHref>
                <a target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter" aria-hidden="true"></i>
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
