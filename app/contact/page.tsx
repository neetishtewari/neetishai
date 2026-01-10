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
                <div className={styles.formSection}>
                    <form className={styles.form}>
                        <div className={styles.field}>
                            <label htmlFor="name" className={styles.label}>Name</label>
                            <input type="text" id="name" name="name" className={styles.input} placeholder="Your name" />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="email" className={styles.label}>Email</label>
                            <input type="email" id="email" name="email" className={styles.input} placeholder="your@email.com" />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="message" className={styles.label}>Message</label>
                            <textarea id="message" name="message" className={styles.textarea} placeholder="What's on your mind?" rows={5} />
                        </div>

                        <button type="submit" className={styles.submitButton}>Send Message</button>
                    </form>
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
