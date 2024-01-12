// components/nav-bar.js
//kode skrevet av Sondre Matre
import Link from 'next/link';
import styles from './nav-bar.module.css'; 

const NavBar = () => {
  return (
    <nav className={styles.navBar}>
      <div className={styles.logo}>
        <Link href="/" passHref>
          CAMPING
        </Link>
      </div>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/about" passHref>
            Om oss
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/services" passHref>
            Tjenester
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/contact" passHref>
            Kontakt oss!
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/faq" passHref>
            FAQ
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
