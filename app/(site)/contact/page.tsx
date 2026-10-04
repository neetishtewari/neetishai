import Link from 'next/link';
import styles from './Contact.module.css';

export default function Contact() {
    return (
        <div className={`container ${styles.contactContainer}`}>
            <h1 className={styles.title}>Say hello</h1>
            <p className={styles.intro}>
                If you&#39;re working on similar problems in AI products, I&#39;d like to hear from you.
            </p>

            <div className={styles.grid}>
                <div className={styles.bookingSection}>
                    <h2>Message me</h2>
                    <p>
                        LinkedIn is the best place to reach me.
                    </p>
                    <a
                        href="https://www.linkedin.com/in/neetish/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.bookButton}
                    >
                        Message on LinkedIn ↗
                    </a>
                </div>

                <div className={styles.connectSection}>
                    <h2>Connect Elsewhere</h2>
                    <div className={styles.socials}>
                        <a href="https://www.linkedin.com/in/neetish/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                            LinkedIn ↗
                        </a>
                        <a href="https://x.com/neetish" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                            X (Twitter) ↗
                        </a>
                        <a href="https://github.com/neetishtewari" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                            GitHub ↗
                        </a>
                        <a href="mailto:hello@neetish.ai" className={styles.socialLink}>
                            hello@neetish.ai
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
