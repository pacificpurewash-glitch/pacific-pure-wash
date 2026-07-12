import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://pacificpurewash.com/",
      lastModified: new Date("2026-07-11"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
