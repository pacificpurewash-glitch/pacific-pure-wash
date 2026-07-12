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

const path = SERVICE_ROUTES.Roofing;
const title = "Roof Cleaning in Jackson County, Oregon | Pacific Pure Wash";
const description = "Roof cleaning and softwashing across Jackson County, Oregon, including 97501 and 97530. See pricing, calculate an estimate, and request service.";

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
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Pacific Pure Wash roof cleaning in Jackson County" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${absoluteUrl(path)}#service`,
      name: "Roof Cleaning and Softwashing",
      alternateName: "Roof Soft Wash",
      serviceType: "Lower-pressure softwashing for roofing",
      url: absoluteUrl(path),
      provider: { "@id": BUSINESS_ID },
      areaServed: AREA_SERVED_SCHEMA,
      description: "Roof cleaning and softwashing throughout Jackson County, Oregon, including ZIP codes 97501 and 97530.",
    },
    breadcrumbSchema("Roof Cleaning", path),
  ],
};

export default function RoofCleaningPage() {
  return (
    <SeoLandingPage
      eyebrow="Roof cleaning · Jackson County"
      title="Roof cleaning and softwashing in Jackson County, Oregon"
      intro="Pacific Pure Wash uses a lower-pressure soft wash to target dark streaks and organic growth on roofing throughout Jackson County, including Medford ZIP 97501 and Jacksonville ZIP 97530."
      currentLabel="Roof cleaning"
      quoteService="roofing"
      schema={schema}
      facts={[
        { label: "Published rate", value: "$0.30 per square foot" },
        { label: "Minimum", value: "$175 per service" },
        { label: "Estimated time", value: "About 3½ hours" },
        { label: "Service area", value: "Jackson County, Oregon" },
      ]}
      sections={[
        {
          eyebrow: "Lower-pressure care",
          title: "A roof-cleaning method matched to the surface",
          paragraphs: [
            "Roofing receives a gentler soft wash rather than the driveway pressure-washing method. The service is designed to target dark streaks and organic growth while keeping the cleaning approach appropriate for the roofline.",
            "Pacific Pure Wash keeps roof cleaning distinct from hard-surface power washing so customers can clearly understand which method is being requested.",
          ],
        },
        {
          eyebrow: "Clear pricing",
          title: "Use a safe existing roof-area estimate",
          paragraphs: [
            "Enter an approximate roof area from a previous property or roofing measurement. Never climb onto a roof to measure it. The estimator applies the published rate of $0.30 per square foot and a $175 minimum charge.",
            "The result is an estimate, not a final or binding quote. Final pricing can change after the size, surface, condition, and access are reviewed.",
          ],
        },
        {
          eyebrow: "Request a time",
          title: "Allow time for a careful roof-cleaning visit",
          paragraphs: [
            "A roof-cleaning appointment is estimated at about 3½ hours. Preferred appointment requests are available Monday through Thursday from 7:00 AM to 4:00 PM Pacific Time.",
            "The estimator shows only start times that keep the expected visit within working hours. Every appointment request remains pending confirmation.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Do you offer roof cleaning in ZIP codes 97501 and 97530?",
          answer: "Yes. Pacific Pure Wash serves properties throughout Jackson County, including Medford ZIP 97501 and Jacksonville ZIP 97530.",
        },
        {
          question: "Should I climb onto my roof to measure it?",
          answer: "No. Use an existing property or roofing measurement when available. Never climb onto a roof just to complete the estimator.",
        },
        {
          question: "Is roof cleaning the same as driveway pressure washing?",
          answer: "No. Roofing receives a lower-pressure soft wash, while durable driveway surfaces use controlled pressure washing.",
        },
      ]}
      relatedLinks={[
        { href: SERVICE_ROUTES.Driveway, label: "Driveway pressure washing", description: "Controlled pressure cleaning for durable driveway surfaces." },
        { href: SERVICE_ROUTES.Siding, label: "Siding softwashing", description: "Gentler exterior cleaning for siding, stucco, and painted surfaces." },
        { href: COUNTY_ROUTE, label: "Jackson County coverage", description: "See the county and ZIP codes served by Pacific Pure Wash." },
      ]}
    />
  );
}
