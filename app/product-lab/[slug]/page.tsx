import Link from 'next/link';
import styles from './ProjectDetail.module.css';

// Dummy data lookup for demo purposes. 
// In a real app, this would fetch from a CMS or MDX files.
const PROJECTS: Record<string, { title: string; summary: string; problem: string; approach: string; outcome: string; links: { demo?: string; github?: string } }> = {
    'ai-auditor': {
        title: 'AI System Auditor',
        summary: 'Automated compliance checking for LLM outputs.',
        problem: 'Companies deploy LLMs without knowing if they infringe on policies or output checkable hallucinations.',
        approach: 'Built a pipeline that runs multiple "Red Teaming" agents against the target model to stress-test specific policy violations.',
        outcome: 'Caught 15% more violations than standard keyword filters in initial tests.',
        links: { github: 'https://github.com/neetish/ai-auditor' }
    },
    'feedback-loop': {
        title: 'Auto-Feedback Loop',
        summary: 'Analyzing user sentiment in real-time to adjust model parameters.',
        problem: 'Static prompts become stale; users give implicit feedback that isn\'t captured.',
        approach: 'Implemented a feedback ingestion service that categorizes user interactions and suggests prompt refinements weekly.',
        outcome: 'Increased user satisfaction scores by 20% over a month.',
        links: { demo: '#' }
    },
    // Default fallback for other slugs
    'default': {
        title: 'Project Detail',
        summary: 'Detailed view of the project.',
        problem: 'Description of the problem solved.',
        approach: 'The technical approach taken.',
        outcome: 'The results achieved.',
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
                        <a href={project.links.demo} className={styles.linkButton}>View Deployment ↗</a>
                    )}
                    {project.links.github && (
                        <a href={project.links.github} className={styles.linkButtonSecondary}>View Code ↗</a>
                    )}
                </div>
            </header>

            <section className={styles.section}>
                <h2>The Problem</h2>
                <p>{project.problem}</p>
            </section>

            <section className={styles.section}>
                <h2>The Approach</h2>
                <p>{project.approach}</p>
            </section>

            <section className={styles.section}>
                <h2>The Outcome</h2>
                <p>{project.outcome}</p>
            </section>

            <div className={styles.cta}>
                <h3>Interested in something like this?</h3>
                <Link href="/contact">Let&#39;s discuss</Link>
            </div>
        </div>
    );
}
