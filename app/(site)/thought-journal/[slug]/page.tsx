import Link from 'next/link';
import type { Metadata } from 'next';
import styles from './JournalPost.module.css';
import { getPostBySlug } from '@/lib/posts';

type Props = {
    params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: post.title,
        description: post.excerpt || `${post.title} — Thought Journal by Neetish Tewari, AI Product Manager.`,
        alternates: {
            canonical: `https://neetishtewari.co/thought-journal/${slug}`,
        },
        openGraph: {
            title: post.title,
            description: post.excerpt || `${post.title} — by Neetish Tewari`,
            type: 'article',
            url: `https://neetishtewari.co/thought-journal/${slug}`,
            publishedTime: post.date,
            authors: ['Neetish Tewari'],
            tags: [...post.tags],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt || `${post.title} — by Neetish Tewari`,
        },
    };
}

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

    const articleJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        datePublished: post.date,
        author: {
            '@type': 'Person',
            name: 'Neetish Tewari',
            url: 'https://neetishtewari.co',
        },
        publisher: {
            '@type': 'Person',
            name: 'Neetish Tewari',
        },
        description: post.excerpt,
        url: `https://neetishtewari.co/thought-journal/${slug}`,
        keywords: [...post.tags].join(', '),
    };

    return (
        <div className={`container ${styles.postContainer}`}>
            <Link href="/thought-journal" className={styles.backLink}>← Back to Journal</Link>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
            />

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

