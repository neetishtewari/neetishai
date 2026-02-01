import Link from 'next/link';
import Image from 'next/image';
import LiveFeed from '@/components/LiveFeed';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={`container ${styles.homeContainer}`}>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroHeader}>
          <Image
            src="/neetish.jpg"
            alt="Neetish"
            width={80}
            height={80}
            className={styles.avatar}
            priority
          />
          <h1 className={styles.title}>
            I help mid-size and enterprise teams identify and implement <span className={styles.highlight}>high-ROI AI use cases</span> from discovery to adoption.
          </h1>
        </div>
        <p className={styles.subtitle}>
          Translating business pain points into actionable AI strategies that drive real value.
        </p>
        <a href="https://calendly.com/neetish-tewari/30min" target="_blank" rel="noopener noreferrer" className={styles.cta}>
          Let&#39;s Talk <span className={styles.arrow}>→</span>
        </a>
      </section>

      {/* Intro Section - Now wrapping both Content and LiveFeed for grid layout */}
      <section className={styles.intro}>
        <div className={styles.introContent}>
          <h2>Curiosity. Collaboration. Creativity.</h2>

          <p>
            I build products that go from zero to revenue. I work with startups, global banks and large staffing companies to solve real problems with speed and clarity.
          </p>
          <p>
            I have been obsessed with AI for the last five to six years, with a strong focus on generative and agentic AI in the last two to three years. I thrive in complex environments, turn ambiguity into clear product decisions and drive teams from first concept to launch. I focus on shipping products that scale, earn trust and create measurable impact.
          </p>

          <div className={styles.pillars}>
            <div className={styles.pillar}>
              <span className={styles.pillarNumber}>01</span>
              <h3>Product Vision</h3>
              <p>17+ years of building. I bridge the gap between abstract business goals and concrete technical execution.</p>
            </div>

            <div className={styles.pillar}>
              <span className={styles.pillarNumber}>02</span>
              <h3>UX Obsession</h3>
              <p>User-first approach. I believe AI should feel invisible, intuitive, and relentlessly helpful.</p>
            </div>

            <div className={styles.pillar}>
              <span className={styles.pillarNumber}>03</span>
              <h3>Execution</h3>
              <p>From zero to revenue. I don't just strategize; I ship products that scale and solve real problems.</p>
            </div>
          </div>

          <div className={styles.backgroundGrid}>
            <div className={styles.backgroundCard}>
              <h4>Background & Learning</h4>
              <p>
                Trained in computer applications and management, with postgraduate education from Symbiosis University, Pune, and IIM Lucknow. Over time, formal education has evolved into continuous learning through building products, experimenting with AI systems, and leveraging modern online learning platforms.
              </p>
            </div>

            <div className={styles.backgroundCard}>
              <h4>Learning Stack</h4>
              <p>
                Applied AI and product systems, learned through building, experimentation, and continuous iteration on real problems.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.liveFeedSection}>
          <LiveFeed />
        </div>
      </section>

      {/* What I Help With Section */}
      <section className={styles.offerings}>
        <h2>What I Help With</h2>
        <div className={styles.offeringsGrid}>
          <div className={styles.offeringCard}>
            <h3>AI Workshops</h3>
            <p>Practical, hands-on sessions to help teams understand and apply AI to real business problems.</p>
          </div>
          <div className={styles.offeringCard}>
            <h3>AI Audits</h3>
            <p>A structured review of workflows, data, and tools to identify where AI and automation can deliver real ROI.</p>
          </div>
          <div className={styles.offeringCard}>
            <h3>Product MVPs</h3>
            <p>Helping founders and teams shape, prototype, and ship their first AI-powered product quickly.</p>
          </div>
          <div className={styles.offeringCard}>
            <h3>Automation Projects</h3>
            <p>Designing and building AI-driven automations across documents, operations, finance, and internal workflows.</p>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Neetish Tewari',
            url: 'https://neetish.ai', // Update with actual domain if known
            image: 'https://neetish.ai/neetish.jpg',
            jobTitle: 'AI Strategy Consultant',
            sameAs: [
              'https://www.linkedin.com/in/neetish/',
              'https://x.com/neetish',
              'https://github.com/neetishtewari',
            ],
            description: 'AI Strategy Consultant helping mid-size and enterprise teams identify and implement high-ROI AI use cases.',
          }),
        }}
      />
    </div >
  );
}
