import Link from 'next/link';
import styles from './Contact.module.css';

export default function Contact() {
    return (
        <div className={`container ${styles.contactContainer}`}>
            <h1 className={styles.title}>Let&#39;s Chat</h1>
            <p className={styles.intro}>
                If you&#39;re curious about AI, have a specific challenge, or just want to swap ideas, I&#39;d love to hear from you.
                No sales pitches, just conversation.
            </p>

            <div className={styles.grid}>
                <div className={styles.bookingSection}>
                    <h2>Book a time</h2>
                    <p>
                        The easiest way to connect is to grab a 30-minute slot on my calendar.
                    </p>
                    <a
                        href="https://calendly.com/neetish-tewari/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.bookButton}
                    >
                        Schedule 30 mins ↗
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
