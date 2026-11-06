import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cr7JournalArticles, JournalArticle } from "@/data/cr7-journal";
import { getSupabaseServerClient } from "@/lib/supabase";
import ArticleClient from "./ArticleClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return cr7JournalArticles.map((article) => ({
    slug: article.slug,
  }));
}

async function getArticle(slug: string): Promise<JournalArticle | null> {
  const local = cr7JournalArticles.find((a) => a.slug === slug);
  if (local) return local;

  try {
    const supabase = getSupabaseServerClient();
    if (!supabase) return null;
    const { data } = await supabase
      .from("journal_articles")
      .select("*")
      .eq("slug", slug)
      .single();

    if (data) {
      return {
        id: data.id,
        slug: data.slug,
        titleVi: data.title_vi,
        titleEn: data.title_en,
        excerptVi: data.excerpt_vi,
        excerptEn: data.excerpt_en,
        categoryVi: data.category_vi,
        categoryEn: data.category_en,
        categorySlug: data.category_slug,
        publishedDate: data.published_date,
        readTimeVi: data.read_time_vi,
        readTimeEn: data.read_time_en,
        author: data.author,
        coverImage: data.cover_image,
        isFeatured: data.is_featured,
        tags: data.tags || [],
        quickTakeawayVi: data.quick_takeaway_vi,
        quickTakeawayEn: data.quick_takeaway_en,
        keyStats: data.key_stats || [],
        sectionsVi: data.sections_vi || [],
        sectionsEn: data.sections_en || [],
        faqsVi: data.faqs_vi || [],
        faqsEn: data.faqs_en || [],
      };
    }
  } catch (e) {}

  return null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return {
      title: "Bài viết không tìm thấy | CR1000",
      description: "Nội dung không tồn tại hoặc đã được chuyển hướng.",
    };
  }

  const url = `https://www.cr1000.live/road-to-1000/${article.slug}`;

  return {
    title: `${article.titleVi} | CR1000`,
    description: article.excerptVi,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: article.titleVi,
      description: article.excerptVi,
      url,
      siteName: "CR1000 — Cristiano Ronaldo Digital Museum & Countdown",
      images: [
        {
          url: `https://www.cr1000.live${article.coverImage}`,
          width: 1200,
          height: 630,
          alt: article.titleVi,
        },
      ],
      type: "article",
      publishedTime: `${article.publishedDate}T08:00:00Z`,
      authors: [article.author],
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.titleVi,
      description: article.excerptVi,
      images: [`https://www.cr1000.live${article.coverImage}`],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  return <ArticleClient slug={slug} initialArticle={article} />;
}
