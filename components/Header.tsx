'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className={styles.header}>
            <div className={`container ${styles.container}`}>
                <Link href="/" className={styles.logo}>
                    Neetish
                </Link>

                {/* Desktop Nav */}
                <nav className={styles.nav}>
                    <Link href="/interests" className={styles.link}>Interests</Link>
                    <Link href="/product-lab" className={styles.link}>Product Lab</Link>
                    <Link href="/thought-journal" className={styles.link}>Thought Journal</Link>
                    <a href="https://calendly.com/neetish-tewari/30min" target="_blank" rel="noopener noreferrer" className={styles.cta}>Let&#39;s Talk</a>
                </nav>

                {/* Mobile Menu Button */}
                <button className={styles.mobileMenuBtn} onClick={toggleMenu} aria-label="Toggle menu">
                    <span className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}></span>
                </button>

                {/* Mobile Nav Overlay */}
                <div className={`${styles.mobileNav} ${isMenuOpen ? styles.open : ''}`}>
                    <nav className={styles.mobileLinks}>
                        <Link href="/interests" className={styles.mobileLink} onClick={toggleMenu}>Interests</Link>
                        <Link href="/product-lab" className={styles.mobileLink} onClick={toggleMenu}>Product Lab</Link>
                        <Link href="/thought-journal" className={styles.mobileLink} onClick={toggleMenu}>Thought Journal</Link>
                        <a href="https://calendly.com/neetish-tewari/30min" target="_blank" rel="noopener noreferrer" className={styles.mobileCta} onClick={toggleMenu}>Let&#39;s Talk</a>
                    </nav>
                </div>
            </div>
        </header>
    );
}
