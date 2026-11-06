import type { MetadataRoute } from "next";
import { cr7JournalArticles } from "@/data/cr7-journal";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.cr1000.live";
  const now = new Date();

  const articleUrls: MetadataRoute.Sitemap = cr7JournalArticles.map((art) => ({
    url: `${baseUrl}/road-to-1000/${art.slug}`,
    lastModified: new Date(`${art.publishedDate}T12:00:00Z`),
    changeFrequency: "daily",
    priority: art.isFeatured ? 0.95 : 0.85,
  }));

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/road-to-1000`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 0.95,
    },
    ...articleUrls,
    {
      url: `${baseUrl}/hat-tricks`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/trophies`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/free-kicks`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
