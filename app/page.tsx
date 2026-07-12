"use client";

import { FormEvent, useState } from "react";

type Service = "Driveway" | "Siding" | "Roofing";

const services: Array<{
  name: Service;
  eyebrow: string;
  title: string;
  description: string;
}> = [
  {
    name: "Driveway",
    eyebrow: "01 / GROUND",
    title: "Driveway Cleaning",
    description: "Lift algae, tire marks, and weather stains for a brighter welcome home.",
  },
  {
    name: "Siding",
    eyebrow: "02 / EXTERIOR",
    title: "House Soft Wash",
    description: "A low-pressure clean made for siding, stucco, and painted surfaces.",
  },
  {
    name: "Roofing",
    eyebrow: "03 / ROOFLINE",
    title: "Roof Soft Wash",
    description: "Target dark streaks and organic growth with gentle, surface-safe care.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://pacificpurewash.com/#business",
      name: "Pacific Pure Wash",
      url: "https://pacificpurewash.com/",
      email: "pacificpurewash@gmail.com",
      logo: "https://pacificpurewash.com/pacific-pure-wash-logo.jpg",
      image: "https://pacificpurewash.com/og.jpg",
      description: "Exterior pressure washing and softwashing for driveways, siding, and roofing at residential and commercial properties.",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "pacificpurewash@gmail.com",
      },
      makesOffer: [
        { "@type": "Offer", itemOffered: { "@id": "https://pacificpurewash.com/#driveway-cleaning" } },
        { "@type": "Offer", itemOffered: { "@id": "https://pacificpurewash.com/#house-soft-wash" } },
        { "@type": "Offer", itemOffered: { "@id": "https://pacificpurewash.com/#roof-soft-wash" } },
      ],
    },
    {
      "@type": "Service",
      "@id": "https://pacificpurewash.com/#driveway-cleaning",
      name: "Driveway Cleaning",
      serviceType: "Pressure washing for driveways",
      provider: { "@id": "https://pacificpurewash.com/#business" },
    },
    {
      "@type": "Service",
      "@id": "https://pacificpurewash.com/#house-soft-wash",
      name: "House Soft Wash",
      serviceType: "Softwashing for siding, stucco, and painted exterior surfaces",
      provider: { "@id": "https://pacificpurewash.com/#business" },
    },
    {
      "@type": "Service",
      "@id": "https://pacificpurewash.com/#roof-soft-wash",
      name: "Roof Soft Wash",
      serviceType: "Softwashing for roofing",
      provider: { "@id": "https://pacificpurewash.com/#business" },
    },
  ],
};

export default function Home() {
  const [service, setService] = useState<Service>("Driveway");
  const [submitted, setSubmitted] = useState(false);

  function chooseService(next: Service) {
    setService(next);
    setSubmitted(false);
    document.getElementById("quote")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function submitQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `${service} quote request — ${String(data.get("name") ?? "New customer")}`;
    const body = [
      "New Pacific Pure Wash quote request",
      "",
      `Service: ${service}`,
      `Name: ${String(data.get("name") ?? "")}`,
      `Phone: ${String(data.get("phone") ?? "")}`,
      `Email: ${String(data.get("email") ?? "")}`,
      `Property ZIP: ${String(data.get("zip") ?? "")}`,
      "",
      "Project details:",
      String(data.get("details") ?? "No additional details provided."),
    ].join("\n");
    setSubmitted(true);
    window.location.href = `mailto:pacificpurewash@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <header className="site-header shell">
        <a className="brand" href="#top" aria-label="Pacific Pure Wash home">
          <img className="brand-logo" src="/pacific-pure-wash-logo.jpg" alt="" width="70" height="70" decoding="async" />
          <span className="brand-copy">
            <strong>Pacific Pure Wash</strong>
            <small>Pressure washing & softwashing</small>
          </span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#services">Services</a>
          <a href="#about">About us</a>
          <a href="#process">Our process</a>
          <a href="#faq">FAQ</a>
          <a className="button button-dark" href="#quote">Get a free quote</a>
        </nav>
      </header>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Eco-conscious exterior cleaning</p>
          <h1>Powerful clean.<br /><em>Purely better.</em></h1>
          <p className="hero-intro">
            Professional pressure washing and softwashing for homes and businesses—combining surface-safe care with a fresh Pacific Northwest spirit.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="#quote">Start my free quote <span>→</span></a>
            <a className="text-link" href="#services">Explore our services</a>
          </div>
        </div>
        <div className="hero-art">
          <span className="forest-line" aria-hidden="true" />
          <img src="/pacific-pure-wash-logo.jpg" alt="Pacific Pure Wash logo featuring a pressure-washed building, evergreen trees, a mountain, water, and green leaves" width="640" height="640" decoding="async" fetchPriority="high" />
        </div>
      </section>

      <section className="trust-strip" aria-label="Why homeowners choose us">
        <div className="shell trust-grid">
          <p>Pure results, thoughtful care</p>
          <span><b>01</b> Eco-conscious approach</span>
          <span><b>02</b> Residential & commercial</span>
          <span><b>03</b> Surface-safe methods</span>
        </div>
      </section>

      <section className="about shell" id="about">
        <p className="eyebrow">Homes, businesses & our environment</p>
        <div>
          <h2>Small company care.<br />Professional results.</h2>
          <p>Pacific Pure Wash is a local exterior-cleaning company built around doing the job thoughtfully. We match the method to the surface—controlled pressure for hardscape and a gentler soft wash for siding and roofing—while keeping people, property, and the surrounding environment in mind.</p>
        </div>
      </section>

      <section className="services shell" id="services">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Choose your surface</p>
            <h2>Care tailored to every surface.</h2>
          </div>
          <p>Select a service to begin your free quote.</p>
        </div>
        <div className="service-grid">
          {services.map((item) => (
            <article className="service-card" key={item.name}>
              <span>{item.eyebrow}</span>
              <div className={`service-icon icon-${item.name.toLowerCase()}`} aria-hidden="true"><i /><i /><i /></div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <button type="button" onClick={() => chooseService(item.name)}>
                Quote my {item.name.toLowerCase()} <b>↗</b>
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="service-area shell" aria-labelledby="service-area-title">
        <div>
          <p className="eyebrow">Service availability</p>
          <h2 id="service-area-title">Is your property in our service area?</h2>
        </div>
        <div>
          <p>Pacific Pure Wash serves residential and commercial properties within its current local operating area. Enter your property ZIP code in the quote form and we’ll confirm availability for your location—without guessing or overpromising.</p>
          <a className="text-link" href="#quote">Check my ZIP code →</a>
        </div>
      </section>

      <section className="process" id="process">
        <div className="shell process-grid">
          <div>
            <p className="eyebrow light">Simple from start to shine</p>
            <h2>A cleaner home in three easy steps.</h2>
          </div>
          <ol>
            <li><b>01</b><span><strong>Tell us what needs care.</strong> Choose your surface and share a few details.</span></li>
            <li><b>02</b><span><strong>Receive your clear quote.</strong> We review the project and follow up with next steps.</span></li>
            <li><b>03</b><span><strong>Enjoy the fresh finish.</strong> We arrive ready to clean with care.</span></li>
          </ol>
        </div>
      </section>

      <section className="faq shell" id="faq" aria-labelledby="faq-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Frequently asked questions</p>
            <h2 id="faq-title">Helpful answers before your quote.</h2>
          </div>
        </div>
        <div className="faq-grid">
          <article><h3>What is the difference between pressure washing and softwashing?</h3><p>Pressure washing uses controlled water pressure for durable hard surfaces such as driveways. Softwashing uses lower pressure for surfaces that need gentler care, including siding and roofing.</p></article>
          <article><h3>Which exterior surfaces do you clean?</h3><p>The current services are driveway cleaning, house soft washing for siding, stucco, and painted exteriors, and roof soft washing.</p></article>
          <article><h3>How do I request a quote?</h3><p>Choose driveway, siding, or roofing, then provide your contact details, property ZIP code, and a short description. The form prepares an email to Pacific Pure Wash for review.</p></article>
          <article><h3>Do you serve residential and commercial properties?</h3><p>Yes. Pacific Pure Wash accepts quote requests for both residential and commercial exterior-cleaning projects. Availability is confirmed using the property ZIP code.</p></article>
        </div>
      </section>

      <section className="quote-section shell" id="quote">
        <div className="quote-intro">
          <p className="eyebrow">Free quote request</p>
          <h2>What can we refresh?</h2>
          <p>Choose a surface and tell us how to reach you. We’ll review the details and follow up with your personalized quote.</p>
          <div className="quote-note"><span>✓</span> No pressure. No obligation. Just a clear next step.</div>
        </div>
        <form className="quote-form" onSubmit={submitQuote}>
          <fieldset>
            <legend>1. Choose a surface</legend>
            <div className="service-options">
              {services.map((item) => (
                <button className={service === item.name ? "active" : ""} key={item.name} type="button" onClick={() => { setService(item.name); setSubmitted(false); }}>
                  <span>{item.name}</span><small>{item.title}</small>
                </button>
              ))}
            </div>
          </fieldset>
          <div className="form-grid">
            <label>Full name<input required name="name" autoComplete="name" placeholder="Your name" /></label>
            <label>Phone number<input required name="phone" type="tel" autoComplete="tel" placeholder="(555) 000-0000" /></label>
            <label>Email address<input required name="email" type="email" autoComplete="email" placeholder="you@example.com" /></label>
            <label>Property ZIP<input required name="zip" inputMode="numeric" autoComplete="postal-code" pattern="[0-9]{5}" placeholder="00000" /></label>
            <label className="full">Tell us a little about the project<textarea name="details" rows={3} placeholder={`Approximate size, condition, or anything we should know about your ${service.toLowerCase()}…`} /></label>
          </div>
          <button className="button button-mint submit-button" type="submit">Request my {service.toLowerCase()} quote <span>→</span></button>
          {submitted && <p className="success" role="status">Your quote request is ready. Please send the prepared email to complete your request.</p>}
        </form>
      </section>

      <footer>
        <div className="shell footer-grid">
          <a className="brand footer-brand" href="#top"><img className="brand-logo" src="/pacific-pure-wash-logo.jpg" alt="" width="70" height="70" loading="lazy" decoding="async" /><span className="brand-copy"><strong>Pacific Pure Wash</strong><small>Pressure washing & softwashing</small></span></a>
          <a className="footer-email" href="mailto:pacificpurewash@gmail.com">pacificpurewash@gmail.com</a>
          <a href="#quote">Get a free quote ↑</a>
        </div>
        <div className="shell footer-bottom"><span>© {new Date().getFullYear()} Pacific Pure Wash</span><span>Powerful clean. Purely better.</span></div>
      </footer>
    </main>
  );
}
