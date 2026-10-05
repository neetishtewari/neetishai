import Link from 'next/link';
import Image from 'next/image';
import LiveFeed from '@/components/LiveFeed';
import { getAllPosts, Post } from '@/lib/posts';
import styles from './page.module.css';

const TRACK_RECORD = [
  {
    when: '2025 – now',
    title: 'AI product, enterprise clients',
    role: 'global digital engineering firm',
    body: 'Helping a US-based SaaS company launch key AI features in a rewrite of its product, opening up a brand-new customer segment.',
  },
  {
    when: '2021 – 2025',
    title: 'Hobasa',
    role: 'Senior PM, AI & Analytics',
    body: 'Led a 15+ person team building Hobasa.io, an AI platform for compliance, document intelligence and finance analytics, on multi-agent and RAG workflows.',
    win: '93% faster document processing · 60% shorter compliance reviews',
  },
  {
    when: '2016 – 2021',
    title: 'Renepay',
    role: 'Product Manager',
    body: 'Took CheckanInvoice from idea to revenue and pivoted it to ML fraud detection. Owned Renepay.sg, a B2B card-payments platform built with Citi and Visa.',
    win: '$6-7M weekly volume · acquired by CardUp',
  },
  {
    when: '2008 – 2015',
    title: 'Wordstream & Teknowledge',
    role: 'PM, Business Analyst',
    body: 'Built DocMode.org and DepIndia.com, e-learning and certification platforms for thousands of doctors and dentists in India.',
  },
];

type LabProject = {
  tag: string;
  name: string;
  body: string;
  links: { label: string; href: string }[];
};

const LAB: LabProject[] = [
  {
    tag: 'Document AI',
    name: 'Document Gem',
    body: 'Pulls structure and answers out of messy documents. I use it to test new document-AI ideas.',
    links: [
      { label: 'Demo', href: 'https://documentgem.vercel.app/' },
      { label: 'Code', href: 'https://github.com/neetishtewari/document-gem' },
    ],
  },
  {
    tag: 'Voice agents · EdTech',
    name: 'AeroSpeak',
    body: 'A voice agent you practise speaking with.',
    links: [
      { label: 'Demo', href: 'https://aersospeak.vercel.app/' },
      { label: 'Code', href: 'https://github.com/neetishtewari/aerospeak' },
    ],
  },
  {
    tag: 'Agents · research',
    name: 'ResearchOS',
    body: 'A private workspace where agents do the legwork of market research.',
    links: [{ label: 'Code', href: 'https://github.com/neetishtewari/researchOS' }],
  },
  {
    tag: 'Finance automation',
    name: 'Expense AI',
    body: 'Turns receipts and statements into categorised expenses.',
    links: [
      { label: 'Demo', href: 'https://expenseai.streamlit.app/' },
      { label: 'Code', href: 'https://github.com/neetishtewari/expense-ai' },
    ],
  },
  {
    tag: 'Data',
    name: 'VizData',
    body: 'Drop in data, get a dashboard you can explore.',
    links: [
      { label: 'Demo', href: 'https://vizdataboard.vercel.app/' },
      { label: 'Code', href: 'https://github.com/neetishtewari/vizdata' },
    ],
  },
];

const PRINCIPLES = [
  {
    title: 'Clarity before code',
    body: "Building is cheap now. Knowing exactly which problem you're solving, and for whom, is the hard part.",
  },
  {
    title: 'Evals are the spec',
    body: 'AI features fail in ways normal tests miss. I decide how we\'ll measure "good" before the first prompt is written.',
  },
  {
    title: 'Not everything needs a chatbot',
    body: "Many business tasks are better served by structured outputs, or by models that aren't LLMs at all.",
  },
];

function formatMonth(date: string) {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

async function getRecentPosts(limit: number): Promise<Post[]> {
  try {
    const posts = await getAllPosts();
    return [...posts]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  } catch (error) {
    console.error('Error loading posts for home page:', error);
    return [];
  }
}

export default async function Home() {
  const posts = await getRecentPosts(5);

  return (
    <div className={styles.home}>
      {/* Hero */}
      <header className={`container ${styles.hero}`}>
        <div className={styles.heroMain}>
        <div className={styles.heroTop}>
          <Image src="/neetish.jpg" alt="Neetish Tewari" width={64} height={64} className={styles.avatar} priority />
          <p className={styles.eyebrow}>AI Product Manager · 18 years in product</p>
        </div>
        <h1 className={styles.title}>I turn AI ideas into products people use.</h1>
        <p className={styles.lede}>
          I&apos;ve spent <b>18 years building products</b> across edtech, fintech, document automation and
          analytics platforms, launching several startup products from zero and leading AI teams along the way.
          Outside work, whenever I spot a problem, I build an AI app around it to learn what holds up. This site is
          where those experiments and notes live.
        </p>
        <div className={styles.ctaGroup}>
          <Link href="/product-lab" className={`${styles.btn} ${styles.btnPrimary}`}>
            See the lab →
          </Link>
          <Link href="/thought-journal" className={styles.btn}>
            Read my notes
          </Link>
          <a href="https://www.linkedin.com/in/neetish/" target="_blank" rel="noopener noreferrer" className={styles.btn}>
            LinkedIn
          </a>
        </div>
        </div>
        <aside className={styles.heroFeed}>
          <LiveFeed limit={4} showLink={true} />
        </aside>
      </header>

      <div className="container">
        {/* Track record */}
        <section id="work" className={styles.section}>
          <div className={styles.sectionHead}>
            <h2>Track record</h2>
            <p>Most of it at B2B startups, building products from zero.</p>
          </div>
          <div>
            {TRACK_RECORD.map((job) => (
              <div key={job.when} className={styles.job}>
                <div className={styles.when}>{job.when}</div>
                <div>
                  <h3 className={styles.jobTitle}>
                    {job.title} <span>· {job.role}</span>
                  </h3>
                  <p className={styles.jobBody}>{job.body}</p>
                  {job.win && <span className={styles.win}>{job.win}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Lab */}
        <section id="lab" className={styles.section}>
          <div className={styles.sectionHead}>
            <h2>The lab</h2>
            <p>
              When I spot a problem, I build an AI app around it and take it far enough to see whether it makes
              sense. Superfit is live on Google Play; the rest are demos and code you can try.
            </p>
          </div>
          <div className={styles.grid}>
            <article className={`${styles.card} ${styles.feature}`}>
              <span className={styles.tag}>Health · on-device AI</span>
              <h3 className={styles.cardTitle}>
                Superfit <span className={styles.live}>Live on Google Play</span>
              </h3>
              <p className={styles.cardBody}>
                Log a meal by speaking in any language, Hindi and Hinglish included, and get macros instantly.
                Targets adjust to your sleep and workouts through Health Connect. Everything stays encrypted on the
                phone.
              </p>
              <p className={styles.why}>
                What I learned: multilingual voice input removes the biggest drop-off point in nutrition apps, which
                is search.
              </p>
              <div className={styles.cardLinks}>
                <a href="https://play.google.com/store/apps/details?id=com.superfit.aifitness" target="_blank" rel="noopener noreferrer">
                  Google Play
                </a>
                <Link href="/superfit">Product page</Link>
                <a href="https://github.com/neetishtewari/superfit" target="_blank" rel="noopener noreferrer">
                  Code
                </a>
              </div>
            </article>
            {LAB.map((p) => (
              <article key={p.name} className={styles.card}>
                <span className={styles.tag}>{p.tag}</span>
                <h3 className={styles.cardTitle}>{p.name}</h3>
                <p className={styles.cardBody}>{p.body}</p>
                <div className={styles.cardLinks}>
                  {p.links.map((l) => (
                    <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
                      {l.label}
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Principles */}
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2>How I think about AI products</h2>
          </div>
          <div className={styles.principles}>
            {PRINCIPLES.map((p) => (
              <div key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Notes */}
        <section id="writing" className={styles.section}>
          <div className={styles.sectionHead}>
            <h2>Notes</h2>
            <p>
              <Link href="/thought-journal" className={styles.allLink}>
                All notes →
              </Link>
            </p>
          </div>
          {posts.length > 0 && (
            <ul className={styles.posts}>
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link href={`/thought-journal/${post.slug}`}>
                    <span className={styles.postDate}>{formatMonth(post.date)}</span>
                    <span>
                      <span className={styles.postTitle}>{post.title}</span>
                      {post.excerpt && <span className={styles.postExcerpt}>{post.excerpt}</span>}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* About */}
        <section id="about" className={styles.section}>
          <div className={styles.about}>
            <div>
              <h2>About</h2>
              <p>
                I started as a business analyst in 2008 and have spent most of my career since taking products from
                an idea to something customers pay for, mostly at startups in fintech, SaaS and EdTech.
              </p>
              <p>
                For the last five or six years I&apos;ve been focused on AI, and for the last two or three on
                generative and agentic systems. I build hands-on because it keeps me honest about what models can do,
                where latency and cost decide the product, and what evals catch.
              </p>
              <p>
                Outside product, I&apos;ve published a Hindi poetry collection, <em>Kuch Hakikat Kuch Falsafe</em>,
                which became an Amazon bestseller.
              </p>
            </div>
            <dl className={styles.facts}>
              <dt>Education</dt>
              <dd>
                Executive MBA, IIM Lucknow
                <br />
                MSc Computer Applications, Symbiosis, Pune
              </dd>
              <dt>Focus</dt>
              <dd>AI agents, document AI, B2B SaaS, voice and on-device AI</dd>
              <dt>Based in</dt>
              <dd>Dehradun, India (IST)</dd>
            </dl>
          </div>
        </section>

        {/* Contact */}
        <div className={styles.contact}>
          <h2>Say hello</h2>
          <p>If you&apos;re working on similar problems in AI products, I&apos;d like to hear from you.</p>
          <div className={styles.ctaGroup}>
            <a href="https://www.linkedin.com/in/neetish/" target="_blank" rel="noopener noreferrer" className={`${styles.btn} ${styles.btnLight}`}>
              Message me on LinkedIn
            </a>
            <a href="mailto:neetish.tewari@gmail.com" className={`${styles.btn} ${styles.btnGhost}`}>
              Email
            </a>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Neetish Tewari',
            url: 'https://neetishtewari.co',
            image: 'https://neetishtewari.co/neetish.jpg',
            jobTitle: 'AI Product Manager',
            sameAs: [
              'https://www.linkedin.com/in/neetish/',
              'https://x.com/neetish',
              'https://github.com/neetishtewari',
            ],
            description:
              'AI Product Manager with 18 years in product. Launched startup products from zero, one acquired. Builds AI apps around problems he spots.',
            knowsAbout: [
              'Artificial Intelligence',
              'Product Management',
              'Generative AI',
              'Agentic AI',
              'Document AI',
              'LLMs',
              'Machine Learning',
            ],
          }),
        }}
      />
    </div>
  );
}
