"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  AREA_SERVED_SCHEMA,
  COUNTY_ROUTE,
  SERVICE_ROUTES,
  absoluteUrl,
} from "./_lib/local-seo";

type Service = "Driveway" | "Siding" | "Roofing";

const services: Array<{
  name: Service;
  eyebrow: string;
  title: string;
  description: string;
  rate: number;
  durationMinutes: number;
  measurementLabel: string;
  measurementHelp: string;
  href: string;
}> = [
  {
    name: "Driveway",
    eyebrow: "01 / GROUND",
    title: "Driveway Cleaning",
    description: "Lift algae, tire marks, and weather stains for a brighter welcome home.",
    rate: 0.45,
    durationMinutes: 90,
    measurementLabel: "Approximate driveway area",
    measurementHelp: "Multiply the driveway length by its average width to estimate square feet.",
    href: SERVICE_ROUTES.Driveway,
  },
  {
    name: "Siding",
    eyebrow: "02 / EXTERIOR",
    title: "House Soft Wash",
    description: "A low-pressure clean made for siding, stucco, and painted surfaces.",
    rate: 0.3,
    durationMinutes: 150,
    measurementLabel: "Approximate exterior wall area",
    measurementHelp: "Use your best estimate of the exterior wall area that needs washing.",
    href: SERVICE_ROUTES.Siding,
  },
  {
    name: "Roofing",
    eyebrow: "03 / ROOFLINE",
    title: "Roof Cleaning & Soft Wash",
    description: "Target dark streaks and organic growth with gentle, surface-safe care.",
    rate: 0.3,
    durationMinutes: 210,
    measurementLabel: "Approximate roof area",
    measurementHelp: "Use a previous property or roofing measurement. Never climb onto a roof to measure it.",
    href: SERVICE_ROUTES.Roofing,
  },
];

const minimumPrice = 175;
const bookingStartMinutes = 7 * 60;
const bookingEndMinutes = 16 * 60;
const bookingStepMinutes = 30;
const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});
const rateFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function formatMoney(value: number) {
  return moneyFormatter.format(value);
}

function formatRate(value: number) {
  return rateFormatter.format(value);
}

function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (!remainingMinutes) return `${hours} ${hours === 1 ? "hour" : "hours"}`;
  return `${hours} ${hours === 1 ? "hour" : "hours"} ${remainingMinutes} minutes`;
}

function formatClock(totalMinutes: number) {
  const hour24 = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const hour12 = hour24 % 12 || 12;
  const period = hour24 < 12 ? "AM" : "PM";
  return `${hour12}:${String(minutes).padStart(2, "0")} ${period}`;
}

function buildTimeOptions(durationMinutes: number) {
  const options: Array<{ value: string; label: string }> = [];
  for (
    let start = bookingStartMinutes;
    start + durationMinutes <= bookingEndMinutes;
    start += bookingStepMinutes
  ) {
    const hour = Math.floor(start / 60);
    const minutes = start % 60;
    options.push({
      value: `${String(hour).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`,
      label: `${formatClock(start)} – ${formatClock(start + durationMinutes)}`,
    });
  }
  return options;
}

function isBookingDay(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return false;
  const weekday = new Date(year, month - 1, day).getDay();
  return weekday >= 1 && weekday <= 4;
}

function formatDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

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
      description: "Small, local, eco-friendly exterior cleaning business providing pressure washing, power washing, softwashing, and roof cleaning throughout Jackson County, Oregon, including ZIP codes 97501 and 97530.",
      areaServed: AREA_SERVED_SCHEMA,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "pacificpurewash@gmail.com",
      },
      makesOffer: [
        { "@type": "Offer", itemOffered: { "@id": `${absoluteUrl(SERVICE_ROUTES.Driveway)}#service` } },
        { "@type": "Offer", itemOffered: { "@id": `${absoluteUrl(SERVICE_ROUTES.Siding)}#service` } },
        { "@type": "Offer", itemOffered: { "@id": `${absoluteUrl(SERVICE_ROUTES.Roofing)}#service` } },
      ],
    },
    {
      "@type": "Service",
      "@id": `${absoluteUrl(SERVICE_ROUTES.Driveway)}#service`,
      name: "Driveway Pressure Washing",
      alternateName: "Driveway Power Washing",
      url: absoluteUrl(SERVICE_ROUTES.Driveway),
      serviceType: "Controlled pressure washing for driveways",
      provider: { "@id": "https://pacificpurewash.com/#business" },
      areaServed: AREA_SERVED_SCHEMA,
    },
    {
      "@type": "Service",
      "@id": `${absoluteUrl(SERVICE_ROUTES.Siding)}#service`,
      name: "Siding and House Softwashing",
      url: absoluteUrl(SERVICE_ROUTES.Siding),
      serviceType: "Softwashing for siding, stucco, and painted exterior surfaces",
      provider: { "@id": "https://pacificpurewash.com/#business" },
      areaServed: AREA_SERVED_SCHEMA,
    },
    {
      "@type": "Service",
      "@id": `${absoluteUrl(SERVICE_ROUTES.Roofing)}#service`,
      name: "Roof Cleaning and Softwashing",
      url: absoluteUrl(SERVICE_ROUTES.Roofing),
      serviceType: "Lower-pressure roof cleaning and softwashing",
      provider: { "@id": "https://pacificpurewash.com/#business" },
      areaServed: AREA_SERVED_SCHEMA,
    },
    {
      "@type": "WebSite",
      "@id": "https://pacificpurewash.com/#website",
      url: "https://pacificpurewash.com/",
      name: "Pacific Pure Wash",
      publisher: { "@id": "https://pacificpurewash.com/#business" },
    },
  ],
};

export default function Home() {
  const [service, setService] = useState<Service>("Driveway");
  const [squareFeet, setSquareFeet] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [minimumDate, setMinimumDate] = useState("");
  const [scheduleError, setScheduleError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const selectedService = services.find((item) => item.name === service) ?? services[0];
  const numericSquareFeet = Number(squareFeet);
  const hasValidMeasurement = Number.isFinite(numericSquareFeet) && numericSquareFeet > 0;
  const calculatedPrice = hasValidMeasurement ? numericSquareFeet * selectedService.rate : null;
  const estimatedPrice = calculatedPrice === null ? null : Math.max(minimumPrice, calculatedPrice);
  const minimumApplies = calculatedPrice !== null && calculatedPrice < minimumPrice;
  const timeOptions = useMemo(
    () => buildTimeOptions(selectedService.durationMinutes),
    [selectedService.durationMinutes],
  );

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    setMinimumDate(`${year}-${month}-${day}`);

    const requestedService = new URLSearchParams(window.location.search).get("service")?.toLowerCase();
    const matchingService = services.find((item) => item.name.toLowerCase() === requestedService);
    if (matchingService) setService(matchingService.name);
  }, []);

  function chooseService(next: Service) {
    setService(next);
    setSquareFeet("");
    setAppointmentTime("");
    setScheduleError("");
    setSubmitted(false);
    document.getElementById("quote")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function updateAppointmentDate(value: string) {
    setAppointmentDate(value);
    setSubmitted(false);
    if (value && minimumDate && value < minimumDate) {
      setScheduleError("Please choose a future appointment date.");
    } else if (value && !isBookingDay(value)) {
      setScheduleError("Appointments are available Monday through Thursday.");
    } else {
      setScheduleError("");
    }
  }

  function submitQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!hasValidMeasurement || estimatedPrice === null) return;
    if ((minimumDate && appointmentDate < minimumDate) || !isBookingDay(appointmentDate)) {
      setScheduleError("Please choose a future Monday-through-Thursday appointment.");
      return;
    }

    const data = new FormData(event.currentTarget);
    const selectedTime = timeOptions.find((option) => option.value === appointmentTime);
    if (!selectedTime) {
      setScheduleError("Please choose an available appointment time.");
      return;
    }

    const subject = `${service} estimate and appointment request — ${String(data.get("name") ?? "New customer")}`;
    const body = [
      "New Pacific Pure Wash estimate and appointment request",
      "",
      `Service: ${service}`,
      `Approximate area: ${numericSquareFeet.toLocaleString("en-US")} sq. ft.`,
      `Rate: ${formatRate(selectedService.rate)} per sq. ft.`,
      `Estimated price: ${formatMoney(estimatedPrice)}`,
      `Minimum charge: ${formatMoney(minimumPrice)}${minimumApplies ? " (applied)" : ""}`,
      `Expected service time: ${formatDuration(selectedService.durationMinutes)}`,
      "",
      `Requested date: ${formatDate(appointmentDate)}`,
      `Requested time: ${selectedTime.label} Pacific Time`,
      "This requested appointment is pending confirmation.",
      "",
      `Name: ${String(data.get("name") ?? "")}`,
      `Phone: ${String(data.get("phone") ?? "")}`,
      `Email: ${String(data.get("email") ?? "")}`,
      `Property address: ${String(data.get("address") ?? "")}`,
      `City: ${String(data.get("city") ?? "")}`,
      `State: ${String(data.get("state") ?? "")}`,
      `ZIP: ${String(data.get("zip") ?? "")}`,
      "",
      "Project details:",
      String(data.get("details") ?? "No additional details provided."),
      "",
      "Estimate notice: This estimate is based on customer-provided measurements and is not a final or binding quote. Final price and service availability may change after the property size, surface, condition, and access are reviewed.",
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
          <a href={COUNTY_ROUTE}>Service area</a>
          <a href="#about">About us</a>
          <a href="#faq">FAQ</a>
          <a className="button button-dark" href="#quote" aria-label="Get an instant estimate"><span className="header-cta-long">Instant estimate</span><span className="header-cta-short" aria-hidden="true">Estimate</span></a>
        </nav>
      </header>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Go green. Shine brighter.</p>
          <h1>Pressure washing<br /><em>across Jackson County.</em></h1>
          <p className="hero-intro">
            <strong>Powerful clean. Purely better.</strong> Pacific Pure Wash provides driveway pressure washing, siding softwashing, and roof cleaning throughout Jackson County, Oregon—including 97501 and 97530.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="#quote">Get my instant estimate <span>→</span></a>
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
          <p>Community-focused care</p>
          <span><b>01</b> Local small business</span>
          <span><b>02</b> Eco-friendly approach</span>
          <span><b>03</b> Surface-safe methods</span>
        </div>
      </section>

      <section className="about shell" id="about">
        <p className="eyebrow">Homes, businesses & our environment</p>
        <div>
          <h2>Small company care.<br />A brighter community.</h2>
          <p>Pacific Pure Wash is a small, local, eco-friendly exterior-cleaning business serving Jackson County, Oregon, with a simple goal: help our community shine brighter. We match the method to the surface—controlled pressure for hardscape and a gentler soft wash for siding and roofing—while keeping people, property, and the surrounding environment in mind.</p>
        </div>
      </section>

      <section className="services shell" id="services">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Choose your surface</p>
            <h2>Care tailored to every surface.</h2>
          </div>
          <p>Select a service to calculate an estimate and choose a preferred appointment.</p>
        </div>
        <div className="service-grid">
          {services.map((item) => (
            <article className="service-card" key={item.name}>
              <span>{item.eyebrow}</span>
              <div className={`service-icon icon-${item.name.toLowerCase()}`} aria-hidden="true"><i /><i /><i /></div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <a className="service-detail-link" href={item.href}>Learn about {item.title.toLowerCase()} →</a>
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
          <h2 id="service-area-title">Exterior cleaning throughout Jackson County.</h2>
        </div>
        <div>
          <p>Pacific Pure Wash serves residential and commercial properties throughout Jackson County, Oregon, including Medford ZIP 97501 and Jacksonville ZIP 97530. Enter your property ZIP code in the quote form and we’ll confirm the project details and availability.</p>
          <div className="service-area-links">
            <a className="text-link" href={COUNTY_ROUTE}>Explore our Jackson County service area →</a>
            <a className="text-link" href="#quote">Get an estimate →</a>
          </div>
        </div>
      </section>

      <section className="process" id="process">
        <div className="shell process-grid">
          <div>
            <p className="eyebrow light">Simple from start to shine</p>
            <h2>A cleaner home in three easy steps.</h2>
          </div>
          <ol>
            <li><b>01</b><span><strong>Choose and measure.</strong> Select your surface and enter its approximate square footage.</span></li>
            <li><b>02</b><span><strong>See your instant estimate.</strong> The calculator applies the service rate and $175 minimum.</span></li>
            <li><b>03</b><span><strong>Request a convenient time.</strong> Choose a Monday-through-Thursday opening that fits the service.</span></li>
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
          <details><summary>What is the difference between pressure washing and softwashing?</summary><p>Pressure washing uses controlled water pressure for durable hard surfaces such as driveways. Softwashing uses lower pressure for surfaces that need gentler care, including siding and roofing.</p></details>
          <details><summary>Do you offer power washing or pressure washing?</summary><p>People often use both terms for hard-surface exterior cleaning. Pacific Pure Wash provides controlled pressure washing for durable driveways and uses lower-pressure softwashing for siding and roofing.</p></details>
          <details><summary>How does the instant estimate work?</summary><p>Choose driveway, siding, or roofing and enter the approximate square footage. The calculator uses the published service rate and a $175 minimum charge. The result is an estimate, not a final or binding quote.</p></details>
          <details><summary>Where do you provide exterior cleaning?</summary><p>Pacific Pure Wash serves residential and commercial properties throughout Jackson County, Oregon, including Medford ZIP 97501 and Jacksonville ZIP 97530.</p></details>
          <details><summary>When are appointments available?</summary><p>Appointment requests are available Monday through Thursday from 7:00 AM to 4:00 PM Pacific Time. The form only shows start times that allow the selected service to finish by 4:00 PM.</p></details>
          <details><summary>How long does each service take?</summary><p>A driveway appointment is estimated at 1½ hours, siding at 2½ hours, and roofing at 3½ hours. Actual time can change after the property and conditions are reviewed.</p></details>
        </div>
      </section>

      <section className="quote-section shell" id="quote">
        <div className="quote-intro">
          <p className="eyebrow">Instant estimate & scheduling</p>
          <h2>Price it. Plan it. Request it.</h2>
          <p>Choose a Jackson County exterior-cleaning service, enter the approximate square footage, and see an estimated price before selecting a preferred service time.</p>
          <div className="quote-note"><span>✓</span> Monday–Thursday · 7:00 AM–4:00 PM Pacific Time</div>
        </div>
        <form className="quote-form" onSubmit={submitQuote}>
          <fieldset>
            <legend>1. Choose a surface</legend>
            <div className="service-options">
              {services.map((item) => (
                <button className={service === item.name ? "active" : ""} key={item.name} type="button" aria-pressed={service === item.name} onClick={() => { setService(item.name); setSquareFeet(""); setAppointmentTime(""); setScheduleError(""); setSubmitted(false); }}>
                  <span>{item.name}</span><small>{item.title}</small>
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>2. Enter the approximate size</legend>
            <div className="measurement-grid">
              <label htmlFor="square-feet">
                {selectedService.measurementLabel} in square feet
                <input
                  id="square-feet"
                  required
                  name="squareFeet"
                  type="number"
                  inputMode="numeric"
                  min="1"
                  max="100000"
                  step="1"
                  value={squareFeet}
                  onChange={(event) => { setSquareFeet(event.target.value); setSubmitted(false); }}
                  aria-describedby="measurement-help"
                  placeholder="Example: 800"
                />
              </label>
              <div className="rate-summary" aria-label={`${service} pricing`}>
                <span>{formatRate(selectedService.rate)} / sq. ft.</span>
                <span>{formatMoney(minimumPrice)} minimum</span>
                <span>{formatDuration(selectedService.durationMinutes)}</span>
              </div>
            </div>
            <p className="field-help" id="measurement-help">{selectedService.measurementHelp}</p>
          </fieldset>

          <div className={`estimate-card${estimatedPrice === null ? " waiting" : ""}`} aria-live="polite">
            {estimatedPrice === null ? (
              <>
                <span>Your estimate will appear here</span>
                <p>Enter the approximate square footage above.</p>
              </>
            ) : (
              <>
                <span>Estimated price</span>
                <strong>{formatMoney(estimatedPrice)}</strong>
                <p>
                  {numericSquareFeet.toLocaleString("en-US")} sq. ft. × {formatRate(selectedService.rate)}
                  {minimumApplies ? ` · ${formatMoney(minimumPrice)} minimum applied` : ""}
                </p>
                <small>This is an estimate based on the information you provided, not a final or binding quote. Final price may change after size, surface, condition, and access are confirmed.</small>
              </>
            )}
          </div>

          <fieldset className="schedule-fields">
            <legend>3. Choose a preferred appointment</legend>
            <p className="schedule-summary" id="schedule-summary">{service} service time: <strong>{formatDuration(selectedService.durationMinutes)}</strong>. Available start times automatically keep the full visit within working hours.</p>
            <div className="form-grid">
              <label htmlFor="appointment-date">Preferred date
                <input id="appointment-date" required name="appointmentDate" type="date" min={minimumDate} value={appointmentDate} aria-invalid={Boolean(scheduleError)} aria-describedby={`schedule-summary schedule-help${scheduleError ? " schedule-error" : ""}`} onChange={(event) => updateAppointmentDate(event.target.value)} />
              </label>
              <label htmlFor="appointment-time">Preferred time
                <select id="appointment-time" required name="appointmentTime" value={appointmentTime} aria-invalid={scheduleError.includes("time")} aria-describedby={`schedule-summary schedule-help${scheduleError ? " schedule-error" : ""}`} onChange={(event) => { setAppointmentTime(event.target.value); setScheduleError(""); setSubmitted(false); }}>
                  <option value="">Choose a time</option>
                  {timeOptions.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}
                </select>
              </label>
            </div>
            {scheduleError && <p className="form-error" id="schedule-error" role="alert">{scheduleError}</p>}
            <p className="field-help" id="schedule-help">Appointment requests are pending until Pacific Pure Wash confirms the address, project details, and availability.</p>
          </fieldset>

          <fieldset className="contact-fields">
            <legend>4. Tell us where to go and how to reach you</legend>
            <div className="form-grid">
            <label>Full name<input required name="name" autoComplete="name" placeholder="Your name" /></label>
            <label>Phone number<input required name="phone" type="tel" autoComplete="tel" placeholder="(555) 000-0000" /></label>
            <label>Email address<input required name="email" type="email" autoComplete="email" placeholder="you@example.com" /></label>
            <label className="full">Property street address<input required name="address" autoComplete="street-address" placeholder="Street address" /></label>
            <label>City<input required name="city" autoComplete="address-level2" placeholder="City" /></label>
            <label className="field-state">State<input required name="state" autoComplete="address-level1" maxLength={2} placeholder="OR" /></label>
            <label className="field-zip">Property ZIP<input required name="zip" inputMode="numeric" autoComplete="postal-code" pattern="[0-9]{5}" placeholder="00000" /></label>
            <label className="full">Tell us a little about the project<textarea name="details" rows={3} placeholder={`Approximate size, condition, or anything we should know about your ${service.toLowerCase()}…`} /></label>
            </div>
          </fieldset>
          <button className="button button-mint submit-button" type="submit">Send estimate & request time <span>→</span></button>
          {submitted && <p className="success" role="status">Your estimate and appointment request are ready. Please send the prepared email to complete your request.</p>}
        </form>
      </section>

      <footer>
        <div className="shell footer-grid">
          <a className="brand footer-brand" href="#top"><img className="brand-logo" src="/pacific-pure-wash-logo.jpg" alt="" width="70" height="70" loading="lazy" decoding="async" /><span className="brand-copy"><strong>Pacific Pure Wash</strong><small>Pressure washing & softwashing</small></span></a>
          <a className="footer-email" href="mailto:pacificpurewash@gmail.com">pacificpurewash@gmail.com</a>
          <a href="#quote">Get an instant estimate ↑</a>
        </div>
        <nav className="shell footer-seo-links" aria-label="Services and coverage">
          <a href={SERVICE_ROUTES.Driveway}>Driveway pressure washing</a>
          <a href={SERVICE_ROUTES.Siding}>Siding softwashing</a>
          <a href={SERVICE_ROUTES.Roofing}>Roof cleaning</a>
          <a href={COUNTY_ROUTE}>Jackson County service area</a>
        </nav>
        <div className="shell footer-bottom"><span>© {new Date().getFullYear()} Pacific Pure Wash</span><span>Go green. Shine brighter.</span></div>
      </footer>
    </main>
  );
}
