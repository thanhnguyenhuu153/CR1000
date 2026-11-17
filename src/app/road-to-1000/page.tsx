import type { Metadata } from "next";
import RoadTo1000Client from "./RoadTo1000Client";
import { getSupabaseServerClient } from "@/lib/supabase";
import { cr7JournalArticles, JournalArticle } from "@/data/cr7-journal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Nhật Ký Đường Tới 1.000 Bàn Thắng — Cristiano Ronaldo (CR1000)",
  description:
    "Ký sự thể thao, phân tích số liệu độc quyền, mô hình xác suất và cập nhật từng bước chạy của Cristiano Ronaldo trong hành trình vươn tới cột mốc 1.000 bàn thắng lịch sử.",
  alternates: {
    canonical: "https://www.cr1000.live/road-to-1000",
  },
  openGraph: {
    title: "Nhật Ký Đường Tới 1.000 Bàn Thắng — Cristiano Ronaldo (CR1000)",
    description:
      "Ký sự thể thao, phân tích số liệu độc quyền và cập nhật từng bước chạy của CR7 trong hành trình vươn tới cột mốc 1.000 bàn thắng.",
    url: "https://www.cr1000.live/road-to-1000",
    siteName: "CR1000 Live Museum",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/images/cr7/og-share.jpg",
        width: 1200,
        height: 630,
        alt: "CR1000 — Nhật Ký Đường Tới 1.000 Bàn Thắng Cristiano Ronaldo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nhật Ký Đường Tới 1.000 Bàn Thắng — Cristiano Ronaldo (CR1000)",
    description:
      "Ký sự thể thao, phân tích số liệu độc quyền và cập nhật từng bước chạy của CR7 trong hành trình vươn tới cột mốc 1.000 bàn thắng.",
    images: ["/images/cr7/og-share.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

async function getServerArticles(): Promise<JournalArticle[]> {
  try {
    const supabase = getSupabaseServerClient();
    if (!supabase) return cr7JournalArticles;

    const { data, error } = await supabase
      .from("journal_articles")
      .select("*")
      .order("published_date", { ascending: false });

    if (error || !data || data.length === 0) {
      return cr7JournalArticles;
    }

    return data.map((row: any) => ({
      id: row.id,
      slug: row.slug,
      titleVi: row.title_vi,
      titleEn: row.title_en,
      excerptVi: row.excerpt_vi,
      excerptEn: row.excerpt_en,
      categoryVi: row.category_vi,
      categoryEn: row.category_en,
      categorySlug: row.category_slug,
      publishedDate: row.published_date,
      readTimeVi: row.read_time_vi,
      readTimeEn: row.read_time_en,
      author: row.author,
      coverImage: row.cover_image,
      isFeatured: row.is_featured,
      tags: row.tags || [],
      quickTakeawayVi: row.quick_takeaway_vi,
      quickTakeawayEn: row.quick_takeaway_en,
      keyStats: row.key_stats || [],
      sectionsVi: row.sections_vi || [],
      sectionsEn: row.sections_en || [],
      faqsVi: row.faqs_vi || [],
      faqsEn: row.faqs_en || [],
      relatedProductId:
        row.related_product_id ||
        (Array.isArray(row.tags)
          ? row.tags.find((t: string) => t.startsWith("gear:"))?.replace("gear:", "")
          : undefined) ||
        undefined,
    }));
  } catch (e) {
    return cr7JournalArticles;
  }
}

export default async function Page() {
  const articles = await getServerArticles();
  return <RoadTo1000Client initialArticles={articles} />;
}
