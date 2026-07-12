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

const path = COUNTY_ROUTE;
const title = "Pressure Washing Across Jackson County, OR | Pacific Pure Wash";
const description = "Pacific Pure Wash provides driveway pressure washing, siding softwashing, and roof cleaning throughout Jackson County, including 97501 and 97530.";

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
      intro="Pacific Pure Wash serves residential and commercial properties throughout Jackson County, including Medford ZIP 97501 and Jacksonville ZIP 97530. Choose driveway pressure washing, siding softwashing, or roof cleaning and get an instant estimate."
      currentLabel="Jackson County service area"
      schema={schema}
      facts={[
        { label: "County", value: "Jackson County, Oregon" },
        { label: "Included ZIPs", value: "97501 and 97530" },
        { label: "Services", value: "Driveways, siding, and roofing" },
        { label: "Requests", value: "Mon–Thu · 7:00 AM–4:00 PM PT" },
      ]}
      sections={[
        {
          eyebrow: "Local coverage",
          title: "Serving properties across Jackson County",
          paragraphs: [
            "Pacific Pure Wash is a small, local, eco-friendly exterior-cleaning business serving Jackson County, Oregon. ZIP codes 97501 in Medford and 97530 in Jacksonville are specifically included in the service area.",
            "Properties elsewhere in Jackson County can use the same instant estimator and appointment-request form. Enter the property ZIP code so Pacific Pure Wash can confirm the project details and availability.",
          ],
        },
        {
          eyebrow: "Three exterior services",
          title: "Pressure washing where strength fits, softwashing where care matters",
          paragraphs: [
            "Driveways receive controlled pressure washing for durable hard surfaces. Siding, stucco, painted exteriors, and roofing receive a gentler soft wash matched to those surfaces.",
            "This clear distinction helps people searching for power washing, pressure washing, house washing, exterior cleaning, or roof cleaning find the service that actually fits their project.",
          ],
        },
        {
          eyebrow: "Instant estimates",
          title: "Published rates and a straightforward request process",
          paragraphs: [
            "Driveway cleaning is $0.45 per square foot. Siding and roof cleaning are each $0.30 per square foot. Every service has a $175 minimum charge.",
            "Choose a surface, enter the approximate square footage, review the estimate, and request a preferred Monday-through-Thursday appointment. Estimates and appointment requests remain subject to property and availability confirmation.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Does Pacific Pure Wash serve ZIP code 97501?",
          answer: "Yes. ZIP code 97501 in Medford is included in the Pacific Pure Wash Jackson County service area.",
        },
        {
          question: "Does Pacific Pure Wash serve ZIP code 97530?",
          answer: "Yes. ZIP code 97530 in Jacksonville is included in the Pacific Pure Wash Jackson County service area.",
        },
        {
          question: "Do you serve other locations in Jackson County?",
          answer: "Yes. Pacific Pure Wash serves properties throughout Jackson County. Enter the property ZIP code in the quote form so the project and availability can be confirmed.",
        },
      ]}
      relatedLinks={[
        { href: SERVICE_ROUTES.Driveway, label: "Driveway pressure washing", description: "$0.45 per square foot with a $175 minimum." },
        { href: SERVICE_ROUTES.Siding, label: "Siding softwashing", description: "$0.30 per square foot with a $175 minimum." },
        { href: SERVICE_ROUTES.Roofing, label: "Roof cleaning", description: "$0.30 per square foot with a $175 minimum." },
      ]}
    />
  );
}
