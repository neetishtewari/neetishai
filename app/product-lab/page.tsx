import Link from 'next/link';
import styles from './ProductLab.module.css';

const PROJECTS = [
    {
        slug: 'ai-auditor',
        title: 'AI System Auditor',
        summary: 'Automated compliance checking for LLM outputs.',
        category: 'Automation',
        status: 'Prototype',
    },
    {
        slug: 'feedback-loop',
        title: 'Auto-Feedback Loop',
        summary: 'Analyzing user sentiment in real-time to adjust model parameters.',
        category: 'Experiment',
        status: 'Live',
    },
    {
        slug: 'legal-bot',
        title: 'Legal Doc Summarizer',
        summary: 'MVP for a boutique law firm to speed up discovery.',
        category: 'Client Work',
        status: 'Live',
    },
    {
        slug: 'agent-swarm',
        title: 'Multi-Agent Research',
        summary: 'Exploring emergent behavior in small agent swarms.',
        category: 'Experiment',
        status: 'Experiment',
    },
];

export default function ProductLab() {
    return (
        <div className={`container ${styles.labContainer}`}>
            <h1 className={styles.title}>Product Lab</h1>
            <p className={styles.intro}>
                Experiments, MVPs, and shipped products. This is where I build to learn.
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
        </div>
    );
}
