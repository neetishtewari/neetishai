import Link from 'next/link';
import styles from './ThoughtJournal.module.css';
import { getAllPosts } from '@/lib/posts';

export const revalidate = 60;

export default async function ThoughtJournal() {
    const posts = await getAllPosts();

    return (
        <div className={`container ${styles.journalContainer}`}>
            <h1 className={styles.title}>Thought Journal</h1>
            <p className={styles.intro}>
                A digital garden for evolving ideas. Unpolished, honest, and focused on the craft.
            </p>

            <div className={styles.feed}>
                {posts.map((post) => (
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
