import styles from './LiveFeed.module.css';
import { fetchGitHubActivity } from '@/lib/github';
import { getAllPosts } from '@/lib/posts';

import Link from 'next/link';

// You can still keep manual items for Project launches or major updates that aren't posts/github commits
const MANUAL_ITEMS = [
    {
        id: 'm2',
        type: 'Project',
        title: 'Launched "VizData"',
        date: '14th Feb', // Or current date
        description: 'VizData allows you to visualize data from databases or spreadsheets to uncover insights and patterns.',
        rawDate: new Date().toISOString(), // Use current time for manual items
    },
    {
        id: 'm1',
        type: 'Project',
        title: 'Launched "ResearchOS"',
        date: '28th Jan',
        description: 'ResearchOS is a private AI workspace that helps research teams think better, faster, and more consistently.',
        rawDate: '2025-01-28T10:00:00.000Z', // Fixed date for sorting
    }
];

interface LiveFeedProps {
    limit?: number;
    showLink?: boolean;
}

export default async function LiveFeed({ limit, showLink = false }: LiveFeedProps) {
    const githubItems = await fetchGitHubActivity();
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


    // Combine all items and sort by rawDate (newest first)
    let allItems = [...postItems, ...MANUAL_ITEMS, ...githubItems]
        .sort((a, b) => new Date(b.rawDate).getTime() - new Date(a.rawDate).getTime());

    if (limit) {
        allItems = allItems.slice(0, limit);
    }

    return (
        <div className={styles.feedContainer}>
            <div className={styles.headerRow}>
                <h3 className={styles.heading}>Recent activity</h3>
                {showLink && (
                    <Link href="/updates" className={styles.viewAllLink}>
                        All updates →
                    </Link>
                )}
            </div>
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
