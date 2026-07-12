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

const path = SERVICE_ROUTES.Siding;
const title = "Siding Softwashing in Jackson County | Pacific Pure Wash";
const description = "House and siding softwashing across Jackson County, Oregon, including 97501 and 97530. View pricing, estimate your project, and request service.";

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
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Pacific Pure Wash siding softwashing in Jackson County" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${absoluteUrl(path)}#service`,
      name: "Siding and House Softwashing",
      alternateName: "Exterior House Washing",
      serviceType: "Low-pressure softwashing for siding and exterior walls",
      url: absoluteUrl(path),
      provider: { "@id": BUSINESS_ID },
      areaServed: AREA_SERVED_SCHEMA,
      description: "House and siding softwashing throughout Jackson County, Oregon, including ZIP codes 97501 and 97530.",
    },
    breadcrumbSchema("Siding Softwashing", path),
  ],
};

export default function SidingSoftWashingPage() {
  return (
    <SeoLandingPage
      eyebrow="Siding cleaning · Jackson County"
      title="Siding and exterior softwashing in Jackson County, Oregon"
      intro="Pacific Pure Wash provides lower-pressure exterior cleaning for siding, stucco, and painted surfaces throughout Jackson County, including Medford ZIP 97501 and Jacksonville ZIP 97530."
      currentLabel="Siding softwashing"
      quoteService="siding"
      schema={schema}
      facts={[
        { label: "Published rate", value: "$0.30 per square foot" },
        { label: "Minimum", value: "$175 per service" },
        { label: "Estimated time", value: "About 2½ hours" },
        { label: "Service area", value: "Jackson County, Oregon" },
      ]}
      sections={[
        {
          eyebrow: "Gentler exterior care",
          title: "Softwashing for surfaces that need lower pressure",
          paragraphs: [
            "Siding does not need the same cleaning approach as a driveway. Pacific Pure Wash uses a gentler soft wash for siding, stucco, painted exteriors, and other exterior wall areas included in the current service offering.",
            "Matching the method to the surface helps keep the project focused on a careful exterior clean rather than relying on one pressure level everywhere.",
          ],
        },
        {
          eyebrow: "Clear pricing",
          title: "Estimate your siding or exterior wall area",
          paragraphs: [
            "Use your best estimate of the exterior wall area that needs washing. The estimator applies the published rate of $0.30 per square foot and a $175 minimum charge.",
            "The online result is an estimate, not a final or binding quote. Pacific Pure Wash confirms the property size, surface, condition, and access before final pricing.",
          ],
        },
        {
          eyebrow: "Request a time",
          title: "Plan a house-washing appointment",
          paragraphs: [
            "A siding appointment is estimated at about 2½ hours. Preferred appointment requests are available Monday through Thursday from 7:00 AM to 4:00 PM Pacific Time.",
            "Available start times automatically account for the expected service duration. Your request is pending until the property details and schedule are confirmed.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Is siding cleaned with the same pressure as a driveway?",
          answer: "No. Driveways use controlled pressure washing, while siding receives a lower-pressure soft wash suited to more delicate exterior surfaces.",
        },
        {
          question: "Which ZIP codes do you serve for house washing?",
          answer: "Pacific Pure Wash serves properties throughout Jackson County, including Medford ZIP 97501 and Jacksonville ZIP 97530.",
        },
        {
          question: "How long does a siding appointment take?",
          answer: "The estimated service time is about 2½ hours. Actual time can change after the property and project conditions are reviewed.",
        },
      ]}
      relatedLinks={[
        { href: SERVICE_ROUTES.Driveway, label: "Driveway pressure washing", description: "Controlled pressure cleaning for durable driveway surfaces." },
        { href: SERVICE_ROUTES.Roofing, label: "Roof cleaning", description: "Lower-pressure roof softwashing for dark streaks and organic growth." },
        { href: COUNTY_ROUTE, label: "Jackson County coverage", description: "See the county and ZIP codes served by Pacific Pure Wash." },
      ]}
    />
  );
}
