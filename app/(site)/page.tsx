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
            Exploring the boundaries of <span className={styles.highlight}>Agentic AI</span> and <span className={styles.highlight}>Product Management</span>.
          </h1>
        </div>
        <p className={styles.subtitle}>
          Translating business pain points into actionable AI strategies that drive real value.
        </p>
        <a href="mailto:hello@neetish.ai" className={styles.cta}>
          Collaborate on Research <span className={styles.arrow}>→</span>
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
          <LiveFeed limit={4} showLink={true} />
        </div>
      </section>

      {/* Active Experiments Section */}
      <section className={styles.offerings}>
        <h2>What I&#39;m Learning &amp; Active Experiments</h2>
        <div className={styles.offeringsGrid}>
          <Link href="/thought-journal/automation-framework" className={styles.offeringCardLink}>
            <div className={styles.offeringCard}>
              <h3>Internal Automation Framework</h3>
              <p>Before automating, simplify. A 3-step process to identify high-ROI targets: Map, Simplify, then Automate.</p>
            </div>
          </Link>
          <Link href="/thought-journal/future-of-small-models" className={styles.offeringCardLink}>
            <div className={styles.offeringCard}>
              <h3>Small Language Models</h3>
              <p>Why local inference and SLMs might be the key to ubiquitous AI. Privacy, latency, and the edge.</p>
            </div>
          </Link>
          <div className={styles.offeringCard}>
            <h3>Agentic AI in Product</h3>
            <p>Exploring how autonomous agents are reshaping product management workflows and decision making.</p>
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
            description: 'AI Strategy Consultant focused on building useful, usable AI products with real business value.',
          }),
        }}
      />
    </div >
  );
}
