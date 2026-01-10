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

      {/* Intro Section */}
      <section className={styles.intro}>
        <div className={styles.introContent}>
          <h2>Curiosity. Collaboration. Code.</h2>
          <p>
            I build products that go from zero to revenue. I work with startups, global banks and large staffing companies to solve real problems with speed and clarity.
          </p>
          <p>
            I have been obsessed with AI for the last five to six years, with a strong focus on generative and agentic AI in the last two to three years. I thrive in complex environments, turn ambiguity into clear product decisions and drive teams from first concept to launch. I focus on shipping products that scale, earn trust and create measurable impact.
          </p>
        </div>
      </section>

      {/* Live Feed Section */}
      <section className={styles.liveFeedSection}>
        <LiveFeed />
      </section>

    </div>
  );
}
