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
            AI Product Leader Turning Ideas into <span className={styles.highlight}>Scalable Tech Products</span> for High Growth Teams
          </h1>
        </div>
        <p className={styles.subtitle}>
          Helping teams turn AI ideas into clean, practical, scalable products.
        </p>
        <a href="https://calendly.com/neetish-tewari/30min" target="_blank" rel="noopener noreferrer" className={styles.cta}>
          Let&#39;s talk AI <span className={styles.arrow}>→</span>
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

          <div className={styles.backgroundSection}>
            <h4>Background & Learning</h4>
            <p>
              Trained in computer applications and management, with postgraduate education from Symbiosis University, Pune, and IIM Lucknow. Over time, formal education has evolved into continuous learning through building products, experimenting with AI systems, and leveraging modern online learning platforms.
            </p>
          </div>

          <div className={styles.backgroundSection}>
            <h4>Learning Stack</h4>
            <p>
              Applied AI and product systems, learned through building, experimentation, and continuous iteration on real problems.
            </p>
          </div>
        </div>

        {/* Live Feed Section - Moved INSIDE intro to be a grid sibling */}
        <div className={styles.liveFeedSection}>
          <LiveFeed />
        </div>
      </section>

    </div>
  );
}
