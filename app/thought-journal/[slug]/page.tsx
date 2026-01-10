import Link from 'next/link';
import styles from './JournalPost.module.css';

// Dummy data for example
const POSTS: Record<string, { title: string; date: string; content: string }> = {
    'future-of-small-models': {
        title: 'The Future of Small Models',
        date: 'Jan 10, 2026',
        content: `
            <p>Everyone is chasing trillions of parameters. The biggest labs are building data centers that consume more power than small cities. But I think the real breakthrough for businesses isn't in making models bigger. It is in making them small enough to run everywhere.</p>
            
            <h3>Latency is the killer</h3>
            <p>If you are building a voice agent or a real-time copilot, waiting 2 seconds for a cloud API is too long. The magic breaks. Small Language Models (SLMs) that run locally on a device can respond in milliseconds. That feels like a conversation, not a transaction.</p>

            <h3>Data stays home</h3>
            <p>Privacy is the other massive lever. Financial data, health records, and personal chats should not leave the device if they don't have to. Running a 3B parameter model on a laptop is now possible and surprisingly capable for specific tasks like summarization or classification.</p>
            
            <p>The future isn't one giant brain in the cloud. It is billions of tiny, specialized brains running on the edge.</p>
        `
    },
    'building-in-public': {
        title: 'Why I Build in Public',
        date: 'Jan 02, 2026',
        content: `
            <p>I used to wait until a project was perfect before showing it to anyone. The result? I usually never showed it. Or when I did, I realized I had built the wrong thing.</p>
            
            <p>Building in public changes the incentive structure. It turns "perfect" into "shipped."</p>

            <h3>Feedback is fuel</h3>
            <p>When you share a half-baked prototype, you get feedback early. You catch the obvious flaws that you became blind to. You also find collaborators who are excited about the same messy problems you are solving.</p>

            <p>It is uncomfortable. You have to be okay with looking dumb sometimes. You have to be okay with broken demos and typos. But the speed of learning you get in return is worth the ego hit.</p>
            
            <p>This site itself is an example. It isn't done. It probably never will be. And that is the point.</p>
        `
    },
    'automation-framework': {
        title: 'A Framework for Internal Automation',
        date: 'Dec 20, 2025',
        content: `
            <p>I see this all the time. A team is drowning in manual work, so they hire an engineer to "automate it." The engineer scripts the exact messy process the team was doing manually. Now they have a messy process that just happens faster.</p>
            
            <p><strong>Never automate a bad process.</strong></p>

            <p>Here is the simple framework I use when helping teams:</p>
            
            <h3>1. Map the Flow</h3>
            <p>Write down every single step. Who emails whom? Where does the data go? You will be surprised how many loops and dead ends exist once you see them on paper.</p>

            <h3>2. Simplify (The Delete Button)</h3>
            <p>Before writing a line of code, ask: "Do we need to do this step at all?" Most approvals, CCs, and double-checks are legacy habits, not requirements. Cut them.</p>

            <h3>3. Automate the Remainder</h3>
            <p>Now that the process is clean, let the robots handle it. Use LLMs for decision points and scripts for moving data. But only automate what creates value.</p>
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
