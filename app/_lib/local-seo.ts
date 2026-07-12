export const SITE_URL = "https://pacificpurewash.com";
export const BUSINESS_ID = `${SITE_URL}/#business`;

export const AREA_SERVED_SCHEMA = [
  {
    "@type": "AdministrativeArea",
    name: "Jackson County, Oregon",
  },
  {
    "@type": "Place",
    name: "Medford, Oregon 97501",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Medford",
      addressRegion: "OR",
      postalCode: "97501",
      addressCountry: "US",
    },
  },
  {
    "@type": "Place",
    name: "Jacksonville, Oregon 97530",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jacksonville",
      addressRegion: "OR",
      postalCode: "97530",
      addressCountry: "US",
    },
  },
];

export const SERVICE_ROUTES = {
  Driveway: "/services/driveway-cleaning",
  Siding: "/services/siding-soft-washing",
  Roofing: "/services/roof-cleaning",
} as const;

export const COUNTY_ROUTE = "/service-area/jackson-county-or";

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path}`;
}

export function breadcrumbSchema(currentName: string, currentPath: string) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Pacific Pure Wash",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: currentName,
        item: absoluteUrl(currentPath),
      },
    ],
  };
}
