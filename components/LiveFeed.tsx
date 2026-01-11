import styles from './LiveFeed.module.css';
import { fetchGitHubActivity } from '@/lib/github';
import { getAllPosts } from '@/lib/posts';

// You can still keep manual items for Project launches or major updates that aren't posts/github commits
const MANUAL_ITEMS = [
    {
        id: 'm1',
        type: 'Project',
        title: 'Launched "Auto-Feedback"',
        date: '2 days ago',
        description: 'An experiment in automated user feedback analysis using Gemini.',
    }
];

export default async function LiveFeed() {
    const githubItems = await fetchGitHubActivity();
    console.log('GitHub items:', githubItems);
    const posts = await getAllPosts();

    // Transform posts into Feed Items
    const postItems = posts.map(post => ({
        id: `post-${post.slug}`,
        type: 'Thought',
        title: post.title,
        date: new Date(post.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        rawDate: post.date, // ISO string for sorting
        description: post.excerpt,
    }));

    // Add rawDate to manual items (convert to ISO for sorting)
    const manualItems = MANUAL_ITEMS.map(item => ({
        ...item,
        rawDate: new Date(item.date).toISOString(),
    }));

    // Combine all items and sort by rawDate (newest first)
    const allItems = [...postItems, ...manualItems, ...githubItems]
        .sort((a, b) => new Date(b.rawDate).getTime() - new Date(a.rawDate).getTime())
        .slice(0, 4);

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
