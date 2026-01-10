import Link from 'next/link';
import styles from './JournalPost.module.css';
import { getPostBySlug } from '@/lib/posts';

type Props = {
    params: Promise<{ slug: string }>;
};

export default async function JournalPost({ params }: Props) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return (
            <div className={`container ${styles.postContainer}`}>
                <p>Post not found.</p>
                <Link href="/thought-journal" className={styles.backLink}>← Back to Journal</Link>
            </div>
        );
    }

    return (
        <div className={`container ${styles.postContainer}`}>
            <Link href="/thought-journal" className={styles.backLink}>← Back to Journal</Link>

            <article>
                <header className={styles.header}>
                    <span className={styles.date}>{post.date}</span>
                    <h1 className={styles.title}>{post.title}</h1>
                </header>

                <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>

            <div className={styles.footer}>
                <p>Thanks for reading.</p>
            </div>
        </div>
    );
}
