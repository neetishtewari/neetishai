import styles from './LiveFeed.module.css';
import { fetchGitHubActivity } from '@/lib/github';

const MANUAL_ITEMS = [
    {
        id: 'm1',
        type: 'Project',
        title: 'Launched "Auto-Feedback"',
        date: '2 days ago',
        description: 'An experiment in automated user feedback analysis using Gemini.',
    },
    {
        id: 'm2',
        type: 'Thought',
        title: 'The future of small models',
        date: '4 days ago',
        description: 'Reflecting on the balance between latency and intelligence in edge AI.',
    },
];

export default async function LiveFeed() {
    const githubItems = await fetchGitHubActivity();

    // Interleave or stack items. 
    // Prioritize GitHub items as they are "live".
    const allItems = [...githubItems, ...MANUAL_ITEMS].slice(0, 4);

    return (
        <div className={styles.feedContainer}>
            <h3 className={styles.heading}>Recent activity</h3>
            <div className={styles.feed}>
                {allItems.map((item) => (
                    <div key={item.id} className={styles.item}>
                        <div className={styles.meta}>
                            <span className={styles.type}>{item.type}</span>
                            <span className={styles.date}>{item.date}</span>
                        </div>
                        <h4 className={styles.title}>{item.title}</h4>
                        <p className={styles.description}>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
