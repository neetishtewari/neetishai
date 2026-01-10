import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={`container ${styles.container}`}>
                <Link href="/" className={styles.logo}>
                    Neetish
                </Link>
                <nav className={styles.nav}>
                    <Link href="/services" className={styles.link}>Services</Link>
                    <Link href="/product-lab" className={styles.link}>Product Lab</Link>
                    <Link href="/thought-journal" className={styles.link}>Thought Journal</Link>
                    <Link href="/contact" className={styles.cta}>Let&#39;s Talk AI</Link>
                </nav>
            </div>
        </header>
    );
}
