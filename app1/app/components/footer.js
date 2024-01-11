import Link from 'next/link';
import styles from './footer.module.css'; 

const Footer = () => {
  return (
    <footer className={styles.footer}>
        <div>
            <Link href="/about" passHref>Om oss</Link>
            <Link href="/contact" passHref>Kontakt Oss</Link>
            <Link href="/random" passHref>random</Link>
            <Link href="/random1" passHref>Random1</Link>
        </div>
        <p>© 2024 BrandName. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
