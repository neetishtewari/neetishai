import Link from 'next/link';
import styles from './JournalPost.module.css';

// Dummy data for example
const POSTS: Record<string, { title: string; date: string; content: string }> = {
    'future-of-small-models': {
        title: 'The Future of Small Models',
        date: 'Jan 10, 2026',
        content: `
      <p>We are seeing a massive shift. As models get bigger, they get smarter, but they also get slower and more expensive.</p>
      <p>However, for 80% of business use cases, we don't need a PhD-level reasoning engine. We need a reliable, fast, and private processor.</p>
      <h3>The Edge is Winning</h3>
      <p>Local inference on laptops and even phones is becoming viable. This unlocks privacy-first AI applications that were previously impossible.</p>
      <p>I'm currently experimenting with fine-tuning 3B parameter models for specific classification tasks. The results are promising.</p>
    `
    },
    'default': {
        title: 'Journal Entry',
        date: 'Unknown Date',
        content: '<p>Content not found.</p>'
    }
};

type Props = {
    params: Promise<{ slug: string }>;
};

export default async function JournalPost({ params }: Props) {
    const { slug } = await params;
    const post = POSTS[slug] || POSTS['default'];

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
