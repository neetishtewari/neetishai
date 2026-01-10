import Link from 'next/link';
import styles from './ProjectDetail.module.css';

const PROJECTS: Record<string, { title: string; summary: string; description: string; links: { demo?: string; github?: string } }> = {
    'document-gem': {
        title: 'Document Gem',
        summary: 'Multi-agent AI system designed to make sense of unstructured business documents.',
        description: `
            <p>Document Gem extracts key information, classifies documents, and surfaces insights hidden inside invoices, contracts, notices, and operational files.</p>
            <p>Built for teams that struggle with scattered documents and manual reviews.</p>
        `,
        links: { demo: 'https://documentgem.vercel.app/' }
    },
    'aerospeak': {
        title: 'AeroSpeak',
        summary: 'AI voice agent powered English coaching platform for aviation trainees.',
        description: `
            <p>AeroSpeak helps candidates practice real-world communication scenarios, improve aviation-specific English, and prepare for interviews using mock voice sessions.</p>
            <p>Designed to simulate real cockpit and interview conversations, not textbook exercises.</p>
        `,
        links: { demo: 'https://aersospeak.vercel.app/' }
    },
    'vizdata': {
        title: 'VizData',
        summary: 'Visualize data from databases or spreadsheets to uncover insights and patterns.',
        description: `
            <p>VizData allows users to visualize data from databases or spreadsheets to uncover insights and patterns that are often missed in raw tables. It focuses on clarity, quick exploration, and insight-first views rather than heavy dashboards.</p>
            <p>Ideal for fast analysis and early-stage decision making.</p>
        `,
        links: { github: 'https://github.com/neetishtewari/vizdata' }
    },
    'expense-ai': {
        title: 'Expense AI',
        summary: 'Automatically reviews employee expense reimbursements using RAG-based AI agents.',
        description: `
            <p>Expense AI checks submissions against company expense policies, flags violations, and reduces manual finance reviews.</p>
            <p>Built to help finance teams scale compliance without increasing overhead.</p>
        `,
        links: { demo: 'https://expenseai.streamlit.com/' }
    },
    'driveex': {
        title: 'DriveEx',
        summary: 'CRM built specifically for auto dealerships in India.',
        description: `
            <p>DriveEx centralizes customer data, interactions, and dealership workflows into a single system, replacing fragmented tools and spreadsheets.</p>
            <p>Focused on real dealership workflows rather than generic CRM features.</p>
        `,
        links: { github: 'https://github.com/neetishtewari/driveEx' }
    },
    'kidvid': {
        title: 'KidVid',
        summary: 'Multi-platform educational app for kids that detects learning interests.',
        description: `
            <p>KidVid is a multi-platform educational app for kids that detects learning interests and serves short-form educational content. It aims to replace doom scrolling on platforms like Instagram or YouTube Shorts with parent-approved, meaningful content.</p>
            <p>Built with a strong focus on safety, engagement, and learning outcomes.</p>
        `,
        links: { github: 'https://github.com/neetishtewari/kidvid/tree/main' }
    },
    'default': {
        title: 'Project Detail',
        summary: 'Detailed view of the project.',
        description: '<p>Project details coming soon.</p>',
        links: {}
    }
};

type Props = {
    params: Promise<{ slug: string }>;
};

export default async function ProjectDetail({ params }: Props) {
    const { slug } = await params;
    const project = PROJECTS[slug] || PROJECTS['default'];

    return (
        <div className={`container ${styles.detailContainer}`}>
            <Link href="/product-lab" className={styles.backLink}>← Back to Lab</Link>

            <header className={styles.header}>
                <h1 className={styles.title}>{project.title}</h1>
                <p className={styles.summary}>{project.summary}</p>

                <div className={styles.links}>
                    {project.links.demo && (
                        <a href={project.links.demo} className={styles.linkButton} target="_blank" rel="noopener noreferrer">View Deployment ↗</a>
                    )}
                    {project.links.github && (
                        <a href={project.links.github} className={styles.linkButtonSecondary} target="_blank" rel="noopener noreferrer">View Code ↗</a>
                    )}
                </div>
            </header>

            <section className={styles.section}>
                <h2>About the Project</h2>
                <div dangerouslySetInnerHTML={{ __html: project.description }} />
            </section>

            <div className={styles.cta}>
                <h3>Interested in something like this?</h3>
                <a href="https://calendly.com/neetish-tewari/30min" target="_blank" rel="noopener noreferrer">Let&#39;s discuss</a>
            </div>
        </div>
    );
}
