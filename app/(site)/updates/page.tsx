import LiveFeed from '@/components/LiveFeed';
import styles from '../page.module.css'; // Reusing home page styles for consistency often works, or create new

export default function UpdatesPage() {
    return (
        <div className={`container ${styles.homeContainer}`}>
            <section className={styles.intro}>
                <h1>All Updates</h1>
                <p>A log of all changes, launches, and thoughts.</p>
                <div style={{ marginTop: '2rem' }}>
                    <LiveFeed />
                </div>
            </section>
        </div>
    );
}
