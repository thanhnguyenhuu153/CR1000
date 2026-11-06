import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cr7JournalArticles } from "@/data/cr7-journal";
import ArticleClient from "./ArticleClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return cr7JournalArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = cr7JournalArticles.find((a) => a.slug === slug);

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
  const exists = cr7JournalArticles.some((a) => a.slug === slug);

  if (!exists) {
    notFound();
  }

  return <ArticleClient slug={slug} />;
}
