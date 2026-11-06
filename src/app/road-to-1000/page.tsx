"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Flame, 
  Trophy, 
  Sparkles, 
  Clock, 
  Calendar, 
  ArrowRight, 
  Bookmark, 
  Share2, 
  Newspaper, 
  Check, 
  TrendingUp, 
  AlertCircle,
  HelpCircle,
  Search,
  ChevronDown
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingShareButton from "@/components/FloatingShareButton";
import { useLanguage } from "@/context/LanguageContext";
import { useSiteData } from "@/context/SiteDataContext";
import { cr7JournalArticles, JournalArticle } from "@/data/cr7-journal";

export default function RoadTo1000HubPage() {
  const { language } = useLanguage();
  const { goals } = useSiteData();
  const isVi = language === "vi";

  const [articles, setArticles] = useState<JournalArticle[]>(cr7JournalArticles);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const remainingGoals = Math.max(0, 1000 - goals);

  // Sync with Supabase API on load if available
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

  // Dynamic document.title update
  useEffect(() => {
    document.title = isVi
      ? "Nhật Ký Đường Tới 1.000 Bàn Thắng — Cristiano Ronaldo (CR1000)"
      : "Road to 1,000 Goals Journal — Cristiano Ronaldo Analysis & News";
  }, [isVi]);

  // Filtering articles
  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      activeCategory === "all" || article.categorySlug === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      (isVi
        ? article.titleVi.toLowerCase().includes(q) || article.excerptVi.toLowerCase().includes(q)
        : article.titleEn.toLowerCase().includes(q) || article.excerptEn.toLowerCase().includes(q)) ||
      article.tags.some((t) => t.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  const featuredArticle = articles.find((a) => a.isFeatured) || articles[0];

  const handleShare = (slug: string, title: string) => {
    const url = `${window.location.origin}/road-to-1000/${slug}`;
    if (navigator.share) {
      navigator.share({ title, url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      setCopiedId(slug);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  // Structured Data Schema.org
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: isVi ? "Nhật Ký Đường Tới 1.000 Bàn Thắng — CR7" : "Road to 1,000 Goals Journal — CR7",
    description: isVi
      ? "Chuyên mục phân tích số liệu, tin tức bước ngoặt và nhật ký từng bước chân của Cristiano Ronaldo tiến về cột mốc 1.000 bàn thắng lịch sử."
      : "In-depth sports analytics, breaking milestones, and comprehensive match journals chronicling Cristiano Ronaldo's sprint to 1,000 career goals.",
    url: "https://www.cr1000.live/road-to-1000",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: articles.map((art, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `https://www.cr1000.live/road-to-1000/${art.slug}`,
        name: isVi ? art.titleVi : art.titleEn,
      })),
    },
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-white selection:bg-[#D4AF37] selection:text-black">
      {/* Schema.org Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <Navbar />

      <main className="pt-24 pb-20">
        {/* Top Breaking Ticker */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-950/80 via-[#18111A] to-amber-950/50 border border-red-500/30 p-4 sm:p-5 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <span className="px-2.5 py-1 rounded-md bg-red-600/30 text-red-400 text-xs font-black uppercase tracking-wider border border-red-500/40">
                  {isVi ? "SỰ KIỆN NÓNG" : "BREAKING NEWS"}
                </span>
                <p className="text-sm font-semibold text-gray-200 line-clamp-1">
                  {isVi
                    ? "CR7 chính thức giã từ ĐTQG Bồ Đào Nha sau 23 năm cống hiến (146 bàn / 234 trận)"
                    : "CR7 officially announces retirement from Portugal national team after 23 years (146 goals / 234 caps)"}
                </p>
              </div>
              <Link
                href={`/road-to-1000/${featuredArticle.slug}`}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shrink-0 shadow-lg shadow-red-600/20"
              >
                <span>{isVi ? "Đọc bài phân tích" : "Read Analysis"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#181C28] border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold">
              <Newspaper className="w-3.5 h-3.5" />
              <span>{isVi ? "NHẬT KÝ & PHÂN TÍCH CHUYÊN SÂU" : "EDITORIAL & DATA JOURNAL"}</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              {isVi ? "Nhật Ký Đường Tới" : "The Road to"}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#E5A93C]">
                1.000 Bàn Thắng
              </span>
            </h1>

            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              {isVi
                ? "Theo sát từng bước chạy, phân tích số liệu khoa học và cập nhật những biến chuyển lịch sử của Cristiano Ronaldo trên hành trình chinh phục đỉnh cao chưa từng có trong lịch sử bóng đá nhân loại."
                : "Tracking every touch, mathematical probability, and historic shift as Cristiano Ronaldo chases football's most coveted and uncharted frontier: 1,000 official career goals."}
            </p>

            {/* Quick Live Milestone Counter Badge */}
            <div className="inline-flex items-center gap-4 px-5 py-2.5 rounded-2xl bg-[#10131E] border border-white/10 shadow-inner">
              <div className="text-left">
                <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                  {isVi ? "Đã ghi" : "Current Goals"}
                </span>
                <span className="font-mono text-xl font-extrabold text-[#D4AF37]">{goals}</span>
              </div>
              <div className="h-7 w-[1px] bg-gray-800"></div>
              <div className="text-left">
                <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                  {isVi ? "Còn cách mốc" : "Goals to 1,000"}
                </span>
                <span className="font-mono text-xl font-extrabold text-white">{remainingGoals}</span>
              </div>
              <div className="h-7 w-[1px] bg-gray-800"></div>
              <div className="text-left">
                <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                  {isVi ? "Tiến độ" : "Completion"}
                </span>
                <span className="font-mono text-xl font-extrabold text-emerald-400">
                  {((goals / 1000) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Article Card */}
        {featuredArticle && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="relative rounded-3xl overflow-hidden bg-[#111420] border border-white/10 hover:border-[#D4AF37]/40 transition-all duration-300 shadow-2xl group">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Image */}
                <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[420px] overflow-hidden">
                  <Image
                    src={featuredArticle.coverImage}
                    alt={isVi ? featuredArticle.titleVi : featuredArticle.titleEn}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-95"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111420] via-transparent to-black/30 lg:bg-gradient-to-r lg:from-transparent lg:to-[#111420]" />
                  <div className="absolute top-4 left-4 z-10 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-red-600/90 backdrop-blur-md text-white text-xs font-black uppercase tracking-wider shadow-lg">
                      {isVi ? "NỔI BẬT NHẤT" : "FEATURED"}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-bold">
                      {isVi ? featuredArticle.categoryVi : featuredArticle.categoryEn}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gray-500" />
                        {featuredArticle.publishedDate}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-gray-500" />
                        {isVi ? featuredArticle.readTimeVi : featuredArticle.readTimeEn}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
                      <Link href={`/road-to-1000/${featuredArticle.slug}`}>
                        {isVi ? featuredArticle.titleVi : featuredArticle.titleEn}
                      </Link>
                    </h2>

                    <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                      {isVi ? featuredArticle.excerptVi : featuredArticle.excerptEn}
                    </p>

                    {/* AIO Quick Summary Pill */}
                    <div className="p-3.5 rounded-xl bg-[#090B12] border border-white/5 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider">
                        <Sparkles className="w-3 h-3" />
                        <span>{isVi ? "Tóm tắt cốt lõi" : "Key Takeaway"}</span>
                      </div>
                      <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                        {isVi ? featuredArticle.quickTakeawayVi : featuredArticle.quickTakeawayEn}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-800/80 flex items-center justify-between">
                    <Link
                      href={`/road-to-1000/${featuredArticle.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#F59E0B] text-black font-extrabold text-xs transition-all shadow-lg shadow-[#D4AF37]/20"
                    >
                      <span>{isVi ? "Xem chi tiết bài viết" : "Read Full Article"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <button
                      onClick={() =>
                        handleShare(
                          featuredArticle.slug,
                          isVi ? featuredArticle.titleVi : featuredArticle.titleEn
                        )
                      }
                      className="p-2.5 rounded-xl bg-gray-800/60 hover:bg-gray-700 text-gray-300 transition-colors"
                      title={isVi ? "Chia sẻ bài viết" : "Share article"}
                    >
                      {copiedId === featuredArticle.slug ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Share2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Filter & Search Bar */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-gray-800">
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              {[
                { id: "all", labelVi: "Tất cả bài viết", labelEn: "All Articles" },
                { id: "breaking", labelVi: "Tin nóng & Bước ngoặt", labelEn: "Breaking News" },
                { id: "data", labelVi: "Phân tích số liệu", labelEn: "Data Analytics" },
                { id: "legacy", labelVi: "Kỷ lục & Di sản", labelEn: "Legacy & Records" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeCategory === tab.id
                      ? "bg-[#D4AF37] text-black shadow-md shadow-[#D4AF37]/20"
                      : "bg-[#111420] text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  {isVi ? tab.labelVi : tab.labelEn}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={isVi ? "Tìm kiếm bài viết, thẻ..." : "Search articles, tags..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-[#111420] border border-gray-800 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
            </div>
          </div>
        </section>

        {/* Article Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => {
              const title = isVi ? article.titleVi : article.titleEn;
              const excerpt = isVi ? article.excerptVi : article.excerptEn;
              const category = isVi ? article.categoryVi : article.categoryEn;
              const readTime = isVi ? article.readTimeVi : article.readTimeEn;

              return (
                <article
                  key={article.id}
                  className="rounded-2xl bg-[#10131E] border border-white/5 hover:border-[#D4AF37]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-lg"
                >
                  <div>
                    {/* Thumbnail */}
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={article.coverImage}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/30 text-[11px] font-bold">
                          {category}
                        </span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-5 space-y-3">
                      <div className="flex items-center gap-3 text-[11px] text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-gray-500" />
                          {article.publishedDate}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gray-500" />
                          {readTime}
                        </span>
                      </div>

                      <h3 className="font-extrabold text-base text-white group-hover:text-[#D4AF37] transition-colors line-clamp-2 leading-snug">
                        <Link href={`/road-to-1000/${article.slug}`}>{title}</Link>
                      </h3>

                      <p className="text-gray-400 text-xs line-clamp-3 leading-relaxed">
                        {excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-5 pt-0">
                    <div className="pt-4 border-t border-gray-800/80 flex items-center justify-between">
                      <Link
                        href={`/road-to-1000/${article.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#D4AF37] hover:text-[#FFF3B0] transition-colors"
                      >
                        <span>{isVi ? "Đọc tiếp" : "Read More"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        onClick={() => handleShare(article.slug, title)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-white transition-colors"
                        title={isVi ? "Chia sẻ" : "Share"}
                      >
                        {copiedId === article.slug ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Share2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Global FAQ Block for Hub Page SEO */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#10131E] border border-white/5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {isVi ? "Hỏi & Đáp Về Hành Trình 1.000 Bàn Thắng" : "FAQ — Road to 1,000 Goals"}
                </h3>
                <p className="text-xs text-gray-400">
                  {isVi ? "Những thắc mắc phổ biến nhất về cột mốc lịch sử của CR7" : "Common questions about Ronaldo's pursuit of 1,000 goals"}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#090B12] border border-gray-800/60">
                <h4 className="text-xs font-bold text-gray-200 mb-1">
                  {isVi
                    ? "Tại sao Ronaldo lại giã từ ĐTQG Bồ Đào Nha vào tháng 11/2026?"
                    : "Why did Ronaldo retire from Portugal in November 2026?"}
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {isVi
                    ? "Ở tuổi 41, sau 23 năm cống hiến với 146 bàn thắng và 3 danh hiệu lớn, Ronaldo quyết định trao lại chiếc áo số 7 cho thế hệ trẻ để bảo tồn thể lực, dồn toàn bộ sự tập trung chinh phục 15 bàn thắng còn lại cùng Al Nassr."
                    : "At age 41, following 23 years, 146 goals, and 3 major trophies, Ronaldo stepped aside to allow the next generation to lead, freeing his physical workload to focus exclusively on scoring his final 15 goals with Al Nassr."}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#090B12] border border-gray-800/60">
                <h4 className="text-xs font-bold text-gray-200 mb-1">
                  {isVi
                    ? "Số bàn thắng của Ronaldo có được FIFA và IFFHS công nhận chính thức không?"
                    : "Are Ronaldo's 985+ goals officially verified by FIFA and IFFHS?"}
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {isVi
                    ? "Có. Mọi bàn thắng được ghi nhận trên CR1000 đều là bàn thắng trong các trận đấu chính thức cấp độ 1 (hạng cao nhất) theo chuẩn thống kê nghiêm ngặt của FIFA, UEFA và IFFHS, loại trừ hoàn toàn các trận giao hữu không chính thức của CLB."
                    : "Yes. Every goal tracked on CR1000 complies with official senior tier-1 match standards recognized by FIFA, UEFA, and IFFHS, strictly excluding non-competitive club friendlies."}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingShareButton />
    </div>
  );
}
