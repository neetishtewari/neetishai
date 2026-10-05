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
                    <Link href="/#work" className={styles.link}>Work</Link>
                    <Link href="/product-lab" className={styles.link}>Product Lab</Link>
                    <Link href="/thought-journal" className={styles.link}>Thought Journal</Link>
                    <a href="https://www.linkedin.com/in/neetish/" target="_blank" rel="noopener noreferrer" className={styles.cta}>LinkedIn</a>
                </nav>

                {/* Mobile Menu Button */}
                <button className={styles.mobileMenuBtn} onClick={toggleMenu} aria-label="Toggle menu">
                    <span className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}></span>
                </button>

                {/* Mobile Nav Overlay */}
                <div className={`${styles.mobileNav} ${isMenuOpen ? styles.open : ''}`}>
                    <nav className={styles.mobileLinks}>
                        <Link href="/#work" className={styles.mobileLink} onClick={toggleMenu}>Work</Link>
                        <Link href="/product-lab" className={styles.mobileLink} onClick={toggleMenu}>Product Lab</Link>
                        <Link href="/thought-journal" className={styles.mobileLink} onClick={toggleMenu}>Thought Journal</Link>
                        <a href="https://www.linkedin.com/in/neetish/" target="_blank" rel="noopener noreferrer" className={styles.mobileCta} onClick={toggleMenu}>LinkedIn</a>
                    </nav>
                </div>
            </div>
        </header>
    );
}
