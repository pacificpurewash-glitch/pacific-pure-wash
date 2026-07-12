type Fact = {
  label: string;
  value: string;
};

type ContentSection = {
  eyebrow?: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

type RelatedLink = {
  href: string;
  label: string;
  description: string;
};

type Faq = {
  question: string;
  answer: string;
};

type SeoLandingPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  facts: Fact[];
  sections: ContentSection[];
  relatedLinks: RelatedLink[];
  faqs?: Faq[];
  schema: Record<string, unknown>;
  currentLabel: string;
  quoteService?: "driveway" | "siding" | "roofing";
};

export default function SeoLandingPage({
  eyebrow,
  title,
  intro,
  facts,
  sections,
  relatedLinks,
  faqs = [],
  schema,
  currentLabel,
  quoteService,
}: SeoLandingPageProps) {
  const quoteHref = quoteService ? `/?service=${quoteService}#quote` : "/#quote";

  return (
    <main className="seo-landing">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <header className="site-header shell interior-header">
        <a className="brand" href="/" aria-label="Pacific Pure Wash home">
          <img
            className="brand-logo"
            src="/pacific-pure-wash-logo.jpg"
            alt=""
            width="70"
            height="70"
            decoding="async"
          />
          <span className="brand-copy">
            <strong>Pacific Pure Wash</strong>
            <small>Pressure washing &amp; softwashing</small>
          </span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="/">Home</a>
          <a href="/#services">Services</a>
          <a href="/service-area/jackson-county-or">Service area</a>
          <a className="button button-dark" href={quoteHref}>Instant estimate</a>
        </nav>
      </header>

      <nav className="breadcrumbs shell" aria-label="Breadcrumb">
        <a href="/">Home</a>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{currentLabel}</span>
      </nav>

      <section className="seo-hero shell">
        <div className="seo-hero-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{intro}</p>
          <div className="hero-actions">
            <a className="button button-dark" href={quoteHref}>Get my instant estimate <span>→</span></a>
            <a className="text-link" href="/service-area/jackson-county-or">View Jackson County coverage</a>
          </div>
        </div>

        <aside className="seo-fact-card" aria-label="Service facts">
          <p>Pacific Pure Wash at a glance</p>
          <dl>
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </section>

      <section className="seo-content shell" aria-label={`${currentLabel} details`}>
        {sections.map((section) => (
          <article key={section.title}>
            {section.eyebrow && <p className="eyebrow">{section.eyebrow}</p>}
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.bullets && (
              <ul>
                {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
              </ul>
            )}
          </article>
        ))}
      </section>

      {faqs.length > 0 && (
        <section className="seo-faq shell" aria-labelledby="seo-faq-title">
          <p className="eyebrow">Helpful answers</p>
          <h2 id="seo-faq-title">Questions about {currentLabel.toLowerCase()}</h2>
          <div>
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      <section className="related-services shell" aria-labelledby="related-title">
        <p className="eyebrow">Keep exploring</p>
        <h2 id="related-title">Services and local coverage</h2>
        <div>
          {relatedLinks.map((link) => (
            <a href={link.href} key={link.href}>
              <strong>{link.label}</strong>
              <span>{link.description}</span>
              <b aria-hidden="true">↗</b>
            </a>
          ))}
        </div>
      </section>

      <section className="seo-cta">
        <div className="shell">
          <div>
            <p className="eyebrow light">Price it. Plan it. Request it.</p>
            <h2>Ready for a cleaner exterior?</h2>
          </div>
          <a className="button button-mint" href={quoteHref}>Get an instant estimate <span>→</span></a>
        </div>
      </section>

      <footer>
        <div className="shell footer-grid">
          <a className="brand footer-brand" href="/">
            <img className="brand-logo" src="/pacific-pure-wash-logo.jpg" alt="" width="70" height="70" loading="lazy" decoding="async" />
            <span className="brand-copy"><strong>Pacific Pure Wash</strong><small>Pressure washing &amp; softwashing</small></span>
          </a>
          <a className="footer-email" href="mailto:pacificpurewash@gmail.com">pacificpurewash@gmail.com</a>
          <a href={quoteHref}>Get an instant estimate ↑</a>
        </div>
        <nav className="shell footer-seo-links" aria-label="Services and coverage">
          <a href="/services/driveway-cleaning">Driveway pressure washing</a>
          <a href="/services/siding-soft-washing">Siding softwashing</a>
          <a href="/services/roof-cleaning">Roof cleaning</a>
          <a href="/service-area/jackson-county-or">Jackson County service area</a>
        </nav>
        <div className="shell footer-bottom"><span>© {new Date().getFullYear()} Pacific Pure Wash</span><span>Go green. Shine brighter.</span></div>
      </footer>
    </main>
  );
}
