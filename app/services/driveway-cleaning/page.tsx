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

const path = SERVICE_ROUTES.Driveway;
const title = "Driveway Pressure Washing in Jackson County | Pacific Pure Wash";
const description = "Driveway pressure washing across Jackson County, Oregon, including 97501 and 97530. See pricing, calculate an estimate, and request service.";

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
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Pacific Pure Wash driveway pressure washing in Jackson County" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${absoluteUrl(path)}#service`,
      name: "Driveway Pressure Washing",
      alternateName: "Driveway Power Washing",
      serviceType: "Controlled pressure washing for driveways",
      url: absoluteUrl(path),
      provider: { "@id": BUSINESS_ID },
      areaServed: AREA_SERVED_SCHEMA,
      description: "Driveway pressure washing throughout Jackson County, Oregon, including ZIP codes 97501 and 97530.",
    },
    breadcrumbSchema("Driveway Pressure Washing", path),
  ],
};

export default function DrivewayCleaningPage() {
  return (
    <SeoLandingPage
      eyebrow="Driveway cleaning · Jackson County"
      title="Driveway pressure washing in Jackson County, Oregon"
      intro="Pacific Pure Wash uses controlled pressure washing for durable driveway surfaces throughout Jackson County, including Medford ZIP 97501 and Jacksonville ZIP 97530. Get a clear instant estimate before requesting a preferred appointment."
      currentLabel="Driveway pressure washing"
      quoteService="driveway"
      schema={schema}
      facts={[
        { label: "Published rate", value: "$0.45 per square foot" },
        { label: "Minimum", value: "$175 per service" },
        { label: "Estimated time", value: "About 1½ hours" },
        { label: "Service area", value: "Jackson County, Oregon" },
      ]}
      sections={[
        {
          eyebrow: "Surface-matched care",
          title: "Controlled pressure for durable driveway surfaces",
          paragraphs: [
            "Driveway cleaning is the pressure-washing service in the Pacific Pure Wash lineup. It is intended for durable hard surfaces where controlled water pressure can lift algae, tire marks, and weather stains.",
            "People often call this power washing, pressure washing, or exterior hardscape cleaning. Whatever wording brought you here, the goal is the same: a brighter, cleaner-looking approach to your home or business.",
          ],
        },
        {
          eyebrow: "Clear pricing",
          title: "How the driveway estimate is calculated",
          paragraphs: [
            "Enter the approximate driveway length multiplied by its average width. The estimator applies the published rate of $0.45 per square foot and a $175 minimum charge.",
            "The result is an estimate based on the measurement you provide, not a final or binding quote. Final pricing can change after the size, surface, condition, and access are confirmed.",
          ],
        },
        {
          eyebrow: "Request a time",
          title: "Local scheduling that fits the service",
          paragraphs: [
            "Driveway appointments are estimated at about 1½ hours. Preferred appointment requests are available Monday through Thursday from 7:00 AM to 4:00 PM Pacific Time.",
            "The online form only shows start times that keep the estimated visit inside working hours. Every requested appointment remains pending until Pacific Pure Wash confirms the property and availability.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Do you provide driveway power washing in ZIP codes 97501 and 97530?",
          answer: "Yes. Pacific Pure Wash serves properties throughout Jackson County, including Medford ZIP 97501 and Jacksonville ZIP 97530.",
        },
        {
          question: "How do I estimate my driveway square footage?",
          answer: "Multiply the driveway length by its average width. Use your best approximate measurement; the final price can change after the property is reviewed.",
        },
        {
          question: "Is the instant price a final quote?",
          answer: "No. It is an estimate based on the square footage you provide and the published rate, subject to confirmation of the surface, condition, size, and access.",
        },
      ]}
      relatedLinks={[
        { href: SERVICE_ROUTES.Siding, label: "Siding softwashing", description: "Gentler exterior cleaning for siding, stucco, and painted surfaces." },
        { href: SERVICE_ROUTES.Roofing, label: "Roof cleaning", description: "Lower-pressure roof softwashing for dark streaks and organic growth." },
        { href: COUNTY_ROUTE, label: "Jackson County coverage", description: "See the county and ZIP codes served by Pacific Pure Wash." },
      ]}
    />
  );
}
