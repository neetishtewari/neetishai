import Link from 'next/link';
import styles from './ThoughtJournal.module.css';

const POSTS = [
    {
        slug: 'future-of-small-models',
        title: 'The Future of Small Models',
        date: 'Jan 10, 2026',
        excerpt: 'Why local inference and SLMs might be the key to ubiquitous AI, despite the hype around massive parameter counts.',
        tags: ['Strategy', 'Edge AI'],
    },
    {
        slug: 'building-in-public',
        title: 'Why I Build in Public',
        date: 'Jan 02, 2026',
        excerpt: 'Transparency isn’t just marketing; it’s a forcing function for clarity and quality.',
        tags: ['Philosophy'],
    },
    {
        slug: 'automation-framework',
        title: 'A Framework for Internal Automation',
        date: 'Dec 20, 2025',
        excerpt: 'Before you automate, simplify. Here is the 3-step process I use with clients to identify high-ROI automation targets.',
        tags: ['Automation', 'Guide'],
    },
];

export default function ThoughtJournal() {
    return (
        <div className={`container ${styles.journalContainer}`}>
            <h1 className={styles.title}>Thought Journal</h1>
            <p className={styles.intro}>
                A digital garden for evolving ideas. Unpolished, honest, and focused on the craft.
            </p>

            <div className={styles.feed}>
                {POSTS.map((post) => (
                    <Link href={`/thought-journal/${post.slug}`} key={post.slug} className={styles.post}>
                        <div className={styles.meta}>
                            <span className={styles.date}>{post.date}</span>
                            <div className={styles.tags}>
                                {post.tags.map(tag => <span key={tag} className={styles.tag}>#{tag}</span>)}
                            </div>
                        </div>
                        <h2 className={styles.postTitle}>{post.title}</h2>
                        <p className={styles.excerpt}>{post.excerpt}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
