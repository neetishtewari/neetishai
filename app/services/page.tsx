import Link from 'next/link';
import styles from './Services.module.css';

const SERVICES = [
    {
        id: 'workshops',
        title: 'AI Workshops',
        description: 'Hands-on sessions for teams to understand what AI can actually do (and what it can\'t). No fluff, just practical tools and frameworks.',
        outcome: 'Team alignment & actionable roadmap.',
    },
    {
        id: 'audits',
        title: 'AI Audits',
        description: 'A deep dive into your current systems or planned AI features. I identify risks, cost-saving opportunities, and architectural improvements.',
        outcome: 'Clear optimization report.',
    },
    {
        id: 'mvp',
        title: 'AI MVP Consulting',
        description: 'From idea to working prototype in record time. I help you scope, stack-pick, and build the first version of your AI product.',
        outcome: 'A working prototype.',
    },
    {
        id: 'automation',
        title: 'AI Automation Projects',
        description: 'Streamline internal workflows using LLMs and automation tools. Reduce manual toil and increase speed.',
        outcome: 'Automated workflows & time saved.',
    },
];

export default function Services() {
    return (
        <div className={`container ${styles.servicesContainer}`}>
            <h1 className={styles.title}>Services</h1>
            <p className={styles.intro}>
                Practical AI implementation for teams who want to build, not just talk.
            </p>

            <div className={styles.grid}>
                {SERVICES.map((service) => (
                    <div key={service.id} className={styles.card}>
                        <h3 className={styles.cardTitle}>{service.title}</h3>
                        <p className={styles.cardDesc}>{service.description}</p>
                        <div className={styles.outcome}>
                            <strong>Outcome:</strong> {service.outcome}
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.ctaSection}>
                <p>Not sure what you need?</p>
                <Link href="/contact" className={styles.cta}>
                    Let&#39;s have a conversation
                </Link>
            </div>
        </div>
    );
}
