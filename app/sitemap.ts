import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-18");

  return [
    {
      url: "https://pacificpurewash.com/",
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://pacificpurewash.com/services/driveway-cleaning",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://pacificpurewash.com/services/siding-soft-washing",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://pacificpurewash.com/services/roof-cleaning",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://pacificpurewash.com/service-area/jackson-county-or",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
