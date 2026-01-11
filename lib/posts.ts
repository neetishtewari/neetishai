import { getNotionPosts, getNotionPostBySlug, NotionPost } from './notion';
import { marked } from 'marked';

export type Post = {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    content: string; // HTML string
    tags: readonly string[];
};

export async function getAllPosts(): Promise<Post[]> {
    const notionPosts = await getNotionPosts();

    // Map NotionPost to Post
    const posts: Post[] = notionPosts.map(p => ({
        slug: p.slug,
        title: p.title,
        date: p.date,
        excerpt: p.excerpt,
        content: "", // Listing doesn't need full content
        tags: p.tags
    }));

    return posts;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const notionPost = await getNotionPostBySlug(slug);
    if (!notionPost) return null;

    // Convert Markdown to HTML
    const htmlContent = await marked(notionPost.content || "");

    return {
        slug: notionPost.slug,
        title: notionPost.title,
        date: notionPost.date,
        excerpt: notionPost.excerpt,
        content: htmlContent,
        tags: notionPost.tags
    };
}
