import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '@/keystatic.config';
import Markdoc from '@markdoc/markdoc';

const reader = createReader(process.cwd(), keystaticConfig);

export type Post = {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    content: string; // HTML string
    tags: readonly string[];
};

export async function getAllPosts(): Promise<Post[]> {
    const posts = await reader.collections.posts.all();

    const formattedPosts = posts.map(entry => {
        // Convert Markdoc AST to HTML
        const ast = entry.entry.content; // This is the AST node
        // @ts-ignore - formatting specific to Markdoc types
        const content = Markdoc.renderers.html(ast);

        return {
            slug: entry.slug,
            title: entry.entry.title,
            date: entry.entry.date as string,
            excerpt: entry.entry.excerpt,
            tags: entry.entry.tags,
            content: content
        };
    });

    // Sort by date descending (newest first)
    return formattedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const post = await reader.collections.posts.read(slug);
    if (!post) return null;

    // @ts-ignore
    const content = Markdoc.renderers.html(post.content);

    return {
        slug: slug,
        title: post.title,
        date: post.date as string,
        excerpt: post.excerpt,
        tags: post.tags,
        content: content
    };
}
