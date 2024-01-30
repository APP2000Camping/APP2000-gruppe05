// components/nav-bar.js
//kode skrevet av Sondre Matre
import Link from 'next/link';
import styles from './nav-bar.module.css'; 

const NavBar = () => {
  return (
    <nav className={styles.navBar}>
      
        <div className={styles.logo}>
        <Link legacyBehavior href="/" passHref>
                <a target="_blank" rel="noopener noreferrer">
                  <img src='images/campingplass1.png' aria-hidden="true" className={styles.logoImg}></img>
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
        </ul>
        </div>
      </div>
      <div className={styles.resKnapp}>
        <Link href="/logInn" passHref>
          Booking
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
