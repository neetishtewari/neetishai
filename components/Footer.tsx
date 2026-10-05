import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>
                <div className={styles.disclaimer}>
                    Everything on this site is a personal project built independently on my own time and equipment. None of it is offered as a service, and none of it reflects the views or proprietary work of any current or past employer.
                </div>
                <div className={styles.copyright}>
                    &copy; {new Date().getFullYear()} Neetish. All rights reserved.
                </div>
                <div className={styles.socials}>
                    <a href="https://www.linkedin.com/in/neetish/" target="_blank" rel="noopener noreferrer">LinkedIn Connect</a>
                    <a href="https://github.com/neetishtewari" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a href="https://x.com/neetish" target="_blank" rel="noopener noreferrer">X Follow</a>

                </div>
            </div>
        </footer>
    );
}
