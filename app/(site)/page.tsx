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
          Exploring the development of AI ideas into clean, practical, scalable products.
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
            Having built products for startups and global banks, I now focus on personal research into GenAI and agentic systems.
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

      {/* My AI Research & Capability Lab */}
      <section className={styles.offerings}>
        <h2>My AI Research &amp; Capability Lab</h2>
        <p className={styles.sectionSubtitle}>Exploring the intersection of Generative AI and Product Strategy.</p>
        <div className={styles.offeringsGrid}>
          <div className={styles.offeringCard}>
            <h3>AI Strategy &amp; Workshops</h3>
            <p>I document frameworks for helping teams bridge the gap between AI hype and practical business application. My research focuses on how organizations can move from curiosity to implementation through structured discovery.</p>
          </div>
          <div className={styles.offeringCard}>
            <h3>Product Audits &amp; ROI Analysis</h3>
            <p>I experiment with methodologies to audit workflows and data structures. My goal is to identify where Agentic AI and automation can deliver measurable impact and solve &quot;The Risk of Not Investing&quot; (RONI).</p>
          </div>
          <div className={styles.offeringCard}>
            <h3>Rapid Prototyping (MVPs)</h3>
            <p>I build &quot;proof-of-concept&quot; products to explore how quickly a founder&#39;s vision can be turned into a functional, scalable AI-powered tool. This is my playground for testing speed-to-market strategies.</p>
          </div>
          <div className={styles.offeringCard}>
            <h3>Automation Engineering</h3>
            <p>I design and share internal experiments focused on AI-driven workflows across documents, finance, and operations, pushing the boundaries of what invisible, intuitive AI can achieve.</p>
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
