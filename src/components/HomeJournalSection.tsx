"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Newspaper,
  ArrowRight,
  Calendar,
  Clock,
  BookOpen,
} from "lucide-react";
import { cr7JournalArticles, JournalArticle } from "@/data/cr7-journal";
import { useLanguage } from "@/context/LanguageContext";

export default function HomeJournalSection() {
  const { language } = useLanguage();
  const isVi = language === "vi";
  const [articles, setArticles] = useState<JournalArticle[]>(cr7JournalArticles);

  useEffect(() => {
    fetch("/api/journal")
      .then((res) => res.json())
      .then((data) => {
        if (data?.articles && Array.isArray(data.articles) && data.articles.length > 0) {
          setArticles(data.articles);
        }
      })
      .catch(() => {});
  }, []);

  // Prioritize featured article first, then newest up to 4 cards
  const featured = articles.find((a) => a.isFeatured);
  const ordered = featured
    ? [featured, ...articles.filter((a) => a.slug !== featured.slug)]
    : articles;
  const topArticles = ordered.slice(0, 4);

  return (
    <section
      id="editorial-journal"
      className="py-16 sm:py-20 bg-[#0A0C12] border-y border-white/[0.06] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121520] border border-[#D4AF37]/30 text-[#D4AF37] text-[11px] font-bold uppercase tracking-wider">
              <Newspaper className="w-3.5 h-3.5" />
              <span>
                {isVi
                  ? "Báo Chí Dữ Liệu & Phân Tích Chuyên Sâu"
                  : "Data Journalism & Match Analysis"}
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {isVi ? (
                <>
                  Tiêu Điểm Phân Tích &amp;{" "}
                  <span className="gold-gradient-text">Ký Sự 1.000 Bàn</span>
                </>
              ) : (
                <>
                  Editorial Insights &amp;{" "}
                  <span className="gold-gradient-text">Road to 1,000 Journal</span>
                </>
              )}
            </h2>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              {isVi
                ? "Các bài phân tích chiến thuật, giải mã dữ liệu xG, vật lý sút phạt và lộ trình chạm mốc 1.000 bàn thắng chính thức được kiểm chứng theo tiêu chuẩn FIFA/IFFHS."
                : "In-depth tactical breakdowns, xG projections, biomechanics, and milestone chronicles verified against official FIFA and IFFHS records."}
            </p>
          </div>

          <Link
            href="/road-to-1000"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#F59E0B] text-black font-extrabold text-xs sm:text-sm transition-all shadow-lg shadow-[#D4AF37]/20 shrink-0 self-start md:self-auto"
          >
            <BookOpen className="w-4 h-4" />
            <span>
              {isVi ? "Xem toàn bộ Nhật Ký (Đọc thêm)" : "Explore Full Journal"}
            </span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4-Card Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {topArticles.map((art) => {
            const title = isVi ? art.titleVi : art.titleEn;
            const excerpt = isVi ? art.excerptVi : art.excerptEn;
            const category = isVi ? art.categoryVi : art.categoryEn;
            const readTime = isVi ? art.readTimeVi : art.readTimeEn;

            return (
              <article
                key={art.id || art.slug}
                className="group bg-[#10131E] border border-white/[0.08] hover:border-[#D4AF37]/40 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-lg"
              >
                <div>
                  <Link
                    href={`/road-to-1000/${art.slug}`}
                    className="block relative aspect-[16/10] bg-black overflow-hidden"
                  >
                    <Image
                      src={art.coverImage || "/images/cr7/hero-cr7.jpg"}
                      alt={title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#10131E] via-transparent to-transparent opacity-80" />
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-black/75 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/30">
                      {category}
                    </span>
                  </Link>

                  <div className="p-4 sm:p-5 space-y-2.5">
                    <div className="flex items-center gap-3 text-[11px] text-gray-400">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#D4AF37]" />
                        {art.publishedDate}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-500" />
                        {readTime}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#D4AF37] transition-colors line-clamp-2 leading-snug">
                      <Link href={`/road-to-1000/${art.slug}`}>{title}</Link>
                    </h3>

                    <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">
                      {excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-4 sm:px-5 pb-4 pt-2 border-t border-white/[0.05] flex items-center justify-between">
                  <span className="text-[11px] text-gray-500 font-medium truncate pr-2">
                    {art.author}
                  </span>
                  <Link
                    href={`/road-to-1000/${art.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#D4AF37] hover:underline shrink-0"
                  >
                    <span>{isVi ? "Đọc bài" : "Read"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
