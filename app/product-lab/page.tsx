import Link from 'next/link';
import styles from './ProductLab.module.css';

const PROJECTS = [
    {
        slug: 'document-gem',
        title: 'Document Gem',
        summary: 'Multi-agent AI system designed to make sense of unstructured business documents.',
        category: 'Document Intelligence',
        status: 'Live',
    },
    {
        slug: 'aerospeak',
        title: 'AeroSpeak',
        summary: 'AI voice agent powered English coaching platform for aviation trainees.',
        category: 'EdTech, AI Voice Agents',
        status: 'Live',
    },
    {
        slug: 'vizdata',
        title: 'VizData',
        summary: 'Visualize data from databases or spreadsheets to uncover insights and patterns.',
        category: 'Data Visualization',
        status: 'Cooking',
    },
    {
        slug: 'expense-ai',
        title: 'Expense AI',
        summary: 'Review employee expense reimbursements automatically using RAG-based AI agents.',
        category: 'Finance Automation',
        status: 'Live',
    },
    {
        slug: 'driveex',
        title: 'DriveEx',
        summary: 'CRM built specifically for auto dealerships in India.',
        category: 'CRM, Automotive Tech',
        status: 'Cooking',
    },
    {
        slug: 'kidvid',
        title: 'KidVid',
        summary: 'Multi-platform educational app for kids that detects learning interests.',
        category: 'EdTech',
        status: 'Cooking',
    },
];

export default function ProductLab() {
    return (
        <div className={`container ${styles.labContainer}`}>
            <h1 className={styles.title}>Product Lab</h1>
            <p className={styles.intro}>
                A collection of products, prototypes, and experiments where I explore how AI can solve real, messy business and user problems.
                <br /><br />
                Some projects are <span className={styles.highlightLive}>live</span> and in use.
                Some are still <span className={styles.highlightCooking}>cooking</span> but open-sourced so others can learn, extend, or collaborate.
            </p>

            <div className={styles.grid}>
                {PROJECTS.map((project) => (
                    <Link href={`/product-lab/${project.slug}`} key={project.slug} className={styles.card}>
                        <div className={styles.header}>
                            <span className={`${styles.status} ${styles[project.status.toLowerCase()]}`}>
                                {project.status}
                            </span>
                            <span className={styles.category}>{project.category}</span>
                        </div>
                        <h3 className={styles.cardTitle}>{project.title}</h3>
                        <p className={styles.cardSummary}>{project.summary}</p>
                    </Link>
                ))}
            </div>

            <div className={styles.ctaSection}>
                <h3>If any of these resonate with what you are trying to build or solve, let’s talk.</h3>
                <p>I enjoy discussing ideas, exploring problems, and building things collaboratively.</p>
                <a href="https://calendly.com/neetish-tewari/30min" target="_blank" rel="noopener noreferrer" className={styles.ctaButton}>Let&#39;s Talk</a>
            </div>
        </div>
    );
}
