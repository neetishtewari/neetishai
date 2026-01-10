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
    const posts = await getAllPosts();

    // Transform posts into Feed Items
    const postItems = posts.map(post => ({
        id: `post-${post.slug}`,
        type: 'Thought',
        title: post.title,
        date: post.date, // Note: In a real app, you'd parse dates to sort correctly. For now, assuming relatively recent.
        description: post.excerpt,
    }));

    // Combine: GitHub + Posts + Manual
    // In a real app, sort by actual Date object. 
    // Here we just stack them: Posts (High Priority) -> Manual -> GitHub
    const allItems = [...postItems, ...MANUAL_ITEMS, ...githubItems].slice(0, 4);

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
