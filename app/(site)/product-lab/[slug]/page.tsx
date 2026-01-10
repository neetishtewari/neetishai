import Link from 'next/link';
import styles from './ProjectDetail.module.css';

const PROJECTS: Record<string, {
    title: string;
    summary: string;
    problem: string;
    approach: string;
    outcome: string;
    links: { demo?: string; github?: string }
}> = {
    'document-gem': {
        title: 'Document Gem',
        summary: 'Multi-agent AI system designed to make sense of unstructured business documents.',
        problem: 'Businesses struggle with scattered unstructured documents (invoices, contracts, notices). Manual review is slow, error-prone, and leaves valuable insights hidden in piles of files.',
        approach: 'Built a multi-agent AI system that ingests documents, automatically extracts key fields, classifies them by type, and surfaces hidden insights without manual intervention.',
        outcome: 'Drastically reduced manual review time, enabling teams to instantly find and act on information buried in their document archives.',
        links: { demo: 'https://documentgem.vercel.app/' }
    },
    'aerospeak': {
        title: 'AeroSpeak',
        summary: 'AI voice agent powered English coaching platform for aviation trainees.',
        problem: 'Aviation trainees often lack realistic practice environments. Textbook exercises do not prepare them for the high-pressure, specific communication required in cockpits and interviews.',
        approach: 'Developed an AI voice agent platform that simulates real-world aviation scenarios, allowing candidates to practice speaking and listening in a safe, interactive environment.',
        outcome: 'Candidates gain confidence and improve their aviation-specific English skills through realistic, on-demand practice sessions.',
        links: { demo: 'https://aersospeak.vercel.app/' }
    },
    'vizdata': {
        title: 'VizData',
        summary: 'Visualize data from databases or spreadsheets to uncover insights and patterns.',
        problem: 'Raw data in spreadsheets and databases is hard to interpret at a glance. Building complex dashboards for quick analysis is often too slow and resource-intensive.',
        approach: 'Created a tool that connects directly to data sources to generate instant, clarity-focused visualizations, prioritizing quick exploration over complex setup.',
        outcome: 'Enables users to spot patterns and trends immediately, facilitating faster early-stage decision making.',
        links: { github: 'https://github.com/neetishtewari/vizdata' }
    },
    'expense-ai': {
        title: 'Expense AI',
        summary: 'Automatically reviews employee expense reimbursements using RAG-based AI agents.',
        problem: 'Finance teams spend countless hours manually checking expense claims against complex company policies, creating bottlenecks and delaying reimbursements.',
        approach: 'Implemented RAG-based AI agents that read company policies and automatically valid expense submissions, flagging violations and approving valid claims.',
        outcome: 'Scales expense compliance effortlessly, reducing overhead for finance teams while speeding up reimbursement cycles for employees.',
        links: { demo: 'https://expenseai.streamlit.com/' }
    },
    'driveex': {
        title: 'DriveEx',
        summary: 'CRM built specifically for auto dealerships in India.',
        problem: 'Auto dealerships in India often rely on fragmented tools, paper records, and spreadsheets, leading to siloed customer data and inefficient sales workflows.',
        approach: 'Built a centralized CRM tailored to local dealership workflows, unifying customer data, interactions, and sales tracking into a single modern interface.',
        outcome: 'Streamlined dealership operations, providing a single source of truth for customer data and improving sales team productivity.',
        links: { github: 'https://github.com/neetishtewari/driveEx' }
    },
    'kidvid': {
        title: 'KidVid',
        summary: 'Multi-platform educational app for kids that detects learning interests.',
        problem: 'Children are often exposed to mindless "doom scrolling" on general video platforms, with content that is often irrelevant or unsafe.',
        approach: 'Developed a multi-platform app that detects a child\'s learning interests and serves short-form, safe, and educational content approved by parents.',
        outcome: 'Creates a safe, engaging digital environment where screen time becomes a productive learning experience.',
        links: { github: 'https://github.com/neetishtewari/kidvid/tree/main' }
    },
    'default': {
        title: 'Project Detail',
        summary: 'Detailed view of the project.',
        problem: 'Project details are currently unavailable.',
        approach: 'Please check back later.',
        outcome: 'Under construction.',
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

            <div className={styles.contentGrid}>
                <section className={styles.section}>
                    <h2>Problem</h2>
                    <p>{project.problem}</p>
                </section>

                <section className={styles.section}>
                    <h2>Approach</h2>
                    <p>{project.approach}</p>
                </section>

                <section className={styles.section}>
                    <h2>Outcome</h2>
                    <p>{project.outcome}</p>
                </section>
            </div>

            <div className={styles.cta}>
                <h3>Interested in something like this?</h3>
                <a href="https://calendly.com/neetish-tewari/30min" target="_blank" rel="noopener noreferrer" className={styles.ctaLink}>Let&#39;s discuss <span className={styles.arrow}>→</span></a>
            </div>
        </div>
    );
}
