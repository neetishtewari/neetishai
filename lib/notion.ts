import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

// Initialize client for n2m (if it works for blocks)
const notion = new Client({
    auth: process.env.NOTION_KEY,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export interface NotionPost {
    id: string;
    slug: string;
    title: string;
    date: string;       // ISO string
    excerpt: string;
    tags: string[];
    content?: string;   // Markdown content
}

// Helper for direct fetch to bypass SDK issues
async function notionFetch(endpoint: string, method: string, body?: any) {
    const res = await fetch(`https://api.notion.com/v1${endpoint}`, {
        method,
        headers: {
            "Authorization": `Bearer ${process.env.NOTION_KEY}`,
            "Notion-Version": "2022-06-28", // Use a recent version
            "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
        next: { revalidate: 60 }
    });

    if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Notion API Error: ${res.status} ${txt}`);
    }
    return res.json();
}

export const getNotionPosts = async (): Promise<NotionPost[]> => {
    const databaseId = process.env.NOTION_DATABASE_ID;

    if (!databaseId) {
        console.error("NOTION_DATABASE_ID is not defined in environment variables");
        return [];
    }

    try {
        // Direct fetch for database query
        const response = await notionFetch(`/databases/${databaseId}/query`, 'POST', {
            filter: {
                property: "Status",
                select: {
                    equals: "Published",
                },
            },
            sorts: [
                {
                    property: "Date",
                    direction: "descending",
                },
            ],
        });

        const posts = response.results.map((page: any) => {
            const props = page.properties;
            return {
                id: page.id,
                slug: props.Slug?.rich_text[0]?.plain_text || "",
                title: props.Title?.title[0]?.plain_text || "Untitled",
                date: props.Date?.date?.start || new Date().toISOString(),
                excerpt: props.Excerpt?.rich_text[0]?.plain_text || "",
                tags: props.Tags?.multi_select?.map((tag: any) => tag.name) || [],
            };
        });

        return posts.filter((post: any) => post.slug && post.title);
    } catch (error) {
        console.error("Error fetching Notion posts:", error);
        return [];
    }
};

// Polyfill Notion SDK methods that are missing in this environment
// @ts-ignore
if (!notion.blocks) {
    // @ts-ignore
    notion.blocks = {
        children: {
            list: async ({ block_id }: { block_id: string }) => {
                return notionFetch(`/blocks/${block_id}/children`, 'GET');
            }
        }
    };
}

export const getNotionPostBySlug = async (slug: string): Promise<NotionPost | null> => {
    const databaseId = process.env.NOTION_DATABASE_ID;

    if (!databaseId) return null;

    // Decode slug to handle spaces/special chars from URL
    const decodedSlug = decodeURIComponent(slug);

    try {
        // Fallback strategy: Fetch all posts and find in memory to avoid strict API filtering issues
        const posts = await getNotionPosts();
        console.error(`DEBUG: Fetching slug: "${decodedSlug}". Found ${posts.length} posts.`);

        const foundPost = posts.find(p => p.slug.trim() === decodedSlug.trim());

        if (!foundPost) {
            return null;
        }

        let mdString = "";
        try {
            // Now that we polyfilled notion.blocks, this should work
            const mdblocks = await n2m.pageToMarkdown(foundPost.id);
            mdString = n2m.toMarkdownString(mdblocks).parent;
        } catch (e) {
            console.error("n2m failed to convert content:", e);
            mdString = "*Content could not be loaded.*";
        }

        return {
            ...foundPost,
            content: mdString,
        };
    } catch (error) {
        console.error(`Error fetching post by slug ${slug}:`, error);
        return null;
    }
};
