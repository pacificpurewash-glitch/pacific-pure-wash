import type { Metadata } from "next";
import SeoLandingPage from "../../_components/SeoLandingPage";
import {
  AREA_SERVED_SCHEMA,
  BUSINESS_ID,
  COUNTY_ROUTE,
  SERVICE_ROUTES,
  absoluteUrl,
  breadcrumbSchema,
} from "../../_lib/local-seo";
import { MINIMUM_PRICE, QUOTE_PRICING } from "../../_lib/pricing";

const path = COUNTY_ROUTE;
const title = "Pressure Washing Across Jackson County, OR | Pacific Pure Wash";
const description = "Pacific Pure Wash provides driveway pressure washing, siding softwashing, and roof cleaning throughout Jackson County, including all of Ashland, Rogue River, 97501, and 97530.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl(path) },
  openGraph: {
    title,
    description,
    type: "website",
    url: absoluteUrl(path),
    siteName: "Pacific Pure Wash",
    locale: "en_US",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Pacific Pure Wash exterior cleaning across Jackson County, Oregon" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${absoluteUrl(path)}#webpage`,
      url: absoluteUrl(path),
      name: "Pacific Pure Wash Jackson County Service Area",
      description,
      about: { "@id": BUSINESS_ID },
      spatialCoverage: AREA_SERVED_SCHEMA,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: [
          { "@type": "ListItem", position: 1, url: absoluteUrl(SERVICE_ROUTES.Driveway), name: "Driveway Pressure Washing" },
          { "@type": "ListItem", position: 2, url: absoluteUrl(SERVICE_ROUTES.Siding), name: "Siding Softwashing" },
          { "@type": "ListItem", position: 3, url: absoluteUrl(SERVICE_ROUTES.Roofing), name: "Roof Cleaning" },
        ],
      },
    },
    breadcrumbSchema("Jackson County Service Area", path),
  ],
};

export default function JacksonCountyServiceAreaPage() {
  return (
    <SeoLandingPage
      eyebrow="Local service area · Southern Oregon"
      title="Exterior cleaning throughout Jackson County, Oregon"
      intro="Pacific Pure Wash serves residential and commercial properties throughout Jackson County, including all of Ashland, Rogue River, Medford ZIP 97501, and Jacksonville ZIP 97530. Choose driveway pressure washing, siding softwashing, or roof cleaning and get an estimate."
      currentLabel="Jackson County service area"
      schema={schema}
      facts={[
        { label: "County", value: "Jackson County, Oregon" },
        { label: "Highlighted areas", value: "All Ashland · Rogue River · 97501 · 97530" },
        { label: "Services", value: "Driveways, siding, and roofing" },
        { label: "Requests", value: "Mon–Thu · 7:00 AM–4:00 PM PT" },
      ]}
      sections={[
        {
          eyebrow: "Local coverage",
          title: "Serving Ashland, Rogue River, and communities across Jackson County",
          paragraphs: [
            "Pacific Pure Wash is a small, local, eco-friendly exterior-cleaning business serving Jackson County, Oregon. Coverage includes all of Ashland, Rogue River, Medford ZIP 97501, and Jacksonville ZIP 97530.",
            "Properties elsewhere in Jackson County can use the same estimator and appointment-request form. Enter the property ZIP code so Pacific Pure Wash can confirm the project details and availability.",
          ],
        },
        {
          eyebrow: "Three exterior services",
          title: "Pressure washing where strength fits, softwashing where care matters",
          paragraphs: [
            "Concrete or asphalt driveways receive controlled pressure washing. Siding, stucco, painted exteriors, and roofing receive a gentler soft wash matched to those surfaces.",
            "This clear distinction helps people searching for power washing, pressure washing, house washing, exterior cleaning, or roof cleaning find the service that actually fits their project.",
          ],
        },
        {
          eyebrow: "Instant estimates",
          title: "Published rates and a straightforward request process",
          paragraphs: [
            `Concrete or asphalt driveway cleaning is ${QUOTE_PRICING.Driveway.displayRate}. Siding cleaning is ${QUOTE_PRICING.Siding.displayRate}, and roof cleaning is ${QUOTE_PRICING.Roofing.displayRate}. Every service has a $${MINIMUM_PRICE} minimum charge.`,
            "Choose a surface, enter the approximate square footage, review the estimate, and request a preferred Monday-through-Thursday appointment. Estimates and appointment requests remain subject to property and availability confirmation.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Do you serve all of Ashland, Oregon?",
          answer: "Yes. Pacific Pure Wash provides driveway pressure washing, siding softwashing, and roof cleaning throughout Ashland, Oregon.",
        },
        {
          question: "Do you serve Rogue River, Oregon?",
          answer: "Yes. Rogue River, Oregon is included in the Pacific Pure Wash Jackson County service area.",
        },
        {
          question: "Are Medford ZIP 97501 and Jacksonville ZIP 97530 included?",
          answer: "Yes. Medford ZIP 97501 and Jacksonville ZIP 97530 are both included in the service area.",
        },
        {
          question: "Do you serve other locations in Jackson County?",
          answer: "Yes. Pacific Pure Wash serves properties throughout Jackson County. Enter the property ZIP code in the quote form so the project and availability can be confirmed.",
        },
      ]}
      relatedLinks={[
        { href: SERVICE_ROUTES.Driveway, label: "Driveway pressure washing", description: `${QUOTE_PRICING.Driveway.displayRate} with a $${MINIMUM_PRICE} minimum.` },
        { href: SERVICE_ROUTES.Siding, label: "Siding softwashing", description: `${QUOTE_PRICING.Siding.displayRate} with a $${MINIMUM_PRICE} minimum.` },
        { href: SERVICE_ROUTES.Roofing, label: "Roof cleaning", description: `${QUOTE_PRICING.Roofing.displayRate} with a $${MINIMUM_PRICE} minimum.` },
      ]}
    />
  );
}
