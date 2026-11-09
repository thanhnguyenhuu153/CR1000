import type { MetadataRoute } from "next";
import { cr7JournalArticles } from "@/data/cr7-journal";
import { getSupabaseServerClient } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.cr1000.live";
  const now = new Date();

  // Load live articles from Supabase with fallback to local code
  let articles = cr7JournalArticles;
  try {
    const supabase = getSupabaseServerClient();
    if (supabase) {
      const { data } = await supabase
        .from("journal_articles")
        .select("slug, published_date, is_featured")
        .order("published_date", { ascending: false });

      if (data && data.length > 0) {
        const dbSlugs = new Set(data.map((d: any) => d.slug));
        const missingLocal = cr7JournalArticles.filter((a) => !dbSlugs.has(a.slug));
        articles = [
          ...data.map((d: any) => ({
            slug: d.slug,
            publishedDate: d.published_date,
            isFeatured: Boolean(d.is_featured),
          })),
          ...missingLocal,
        ] as any;
      }
    }
  } catch (e) {}

  const articleUrls: MetadataRoute.Sitemap = articles.map((art) => ({
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
