"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Share2, 
  Check, 
  Sparkles, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Quote, 
  TrendingUp, 
  Trophy, 
  Flame, 
  ArrowRight,
  BookOpen
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingShareButton from "@/components/FloatingShareButton";
import { useLanguage } from "@/context/LanguageContext";
import { cr7JournalArticles, JournalArticle } from "@/data/cr7-journal";

export default function ArticleClient({
  slug,
  initialArticle,
}: {
  slug: string;
  initialArticle?: JournalArticle;
}) {
  const { language } = useLanguage();
  const isVi = language === "vi";

  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [article, setArticle] = useState<JournalArticle | undefined>(
    initialArticle || cr7JournalArticles.find((a) => a.slug === slug)
  );

  // If not found in memory, try fetching from api
  useEffect(() => {
    if (!article) {
      fetch("/api/journal")
        .then((res) => res.json())
        .then((data) => {
          if (data?.articles) {
            const found = data.articles.find((a: JournalArticle) => a.slug === slug);
            if (found) setArticle(found);
          }
        })
        .catch(() => {});
    }
  }, [article, slug]);

  useEffect(() => {
    if (article) {
      document.title = `${isVi ? article.titleVi : article.titleEn} | CR1000`;
    }
  }, [article, isVi]);

  if (!article) {
    return notFound();
  }

  const title = isVi ? article.titleVi : article.titleEn;
  const excerpt = isVi ? article.excerptVi : article.excerptEn;
  const category = isVi ? article.categoryVi : article.categoryEn;
  const readTime = isVi ? article.readTimeVi : article.readTimeEn;
  const quickTakeaway = isVi ? article.quickTakeawayVi : article.quickTakeawayEn;
  const sections = isVi ? article.sectionsVi : article.sectionsEn;
  const faqs = isVi ? article.faqsVi : article.faqsEn;

  const handleShare = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      navigator.share({ title, url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const relatedArticles = cr7JournalArticles.filter((a) => a.slug !== slug);

  // Schema.org Article & FAQPage JSON-LD
  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NewsArticle",
        "@id": `https://www.cr1000.live/road-to-1000/${article.slug}#article`,
        isPartOf: {
          "@type": "WebPage",
          "@id": `https://www.cr1000.live/road-to-1000/${article.slug}`,
          url: `https://www.cr1000.live/road-to-1000/${article.slug}`,
          name: title,
        },
        headline: title,
        description: excerpt,
        image: `https://www.cr1000.live${article.coverImage}`,
        datePublished: `${article.publishedDate}T08:00:00+07:00`,
        dateModified: `${article.publishedDate}T12:00:00+07:00`,
        author: {
          "@type": "Organization",
          name: article.author,
          url: "https://www.cr1000.live",
        },
        publisher: {
          "@type": "Organization",
          name: "CR1000 Digital Museum",
          logo: {
            "@type": "ImageObject",
            url: "https://www.cr1000.live/images/cr7/og-share.jpg",
          },
        },
        mainEntityOfPage: `https://www.cr1000.live/road-to-1000/${article.slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: isVi ? "Trang Chủ" : "Home",
            item: "https://www.cr1000.live",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: isVi ? "Nhật Ký 1000 Bàn" : "Road to 1,000",
            item: "https://www.cr1000.live/road-to-1000",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: title,
            item: `https://www.cr1000.live/road-to-1000/${article.slug}`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-white selection:bg-[#D4AF37] selection:text-black">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <Navbar />

      <main className="pt-24 pb-20">
        {/* Breadcrumb Navigation */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <nav className="flex items-center gap-2 text-xs text-gray-400">
            <Link href="/" className="hover:text-[#D4AF37] transition-colors">
              {isVi ? "Trang Chủ" : "Home"}
            </Link>
            <span>/</span>
            <Link href="/road-to-1000" className="hover:text-[#D4AF37] transition-colors">
              {isVi ? "Nhật Ký 1000 Bàn" : "Road to 1,000"}
            </Link>
            <span>/</span>
            <span className="text-gray-300 font-medium truncate max-w-[200px] sm:max-w-md">
              {title}
            </span>
          </nav>
        </div>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-bold tracking-wide uppercase">
              {category}
            </span>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gray-500" />
                {article.publishedDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gray-500" />
                {readTime}
              </span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
            {title}
          </h1>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-normal">
            {excerpt}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-gray-800 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#181C28] border border-white/10 flex items-center justify-center font-bold text-[#D4AF37] text-[10px]">
                CR
              </div>
              <span className="font-semibold text-gray-300">{article.author}</span>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#141720] hover:bg-[#D4AF37] text-gray-300 hover:text-black font-bold border border-gray-800 transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">{isVi ? "Đã copy link" : "Copied"}</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{isVi ? "Chia sẻ bài viết" : "Share"}</span>
                </>
              )}
            </button>
          </div>
        </header>

        {/* Featured Image */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="relative h-[280px] sm:h-[450px] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src={article.coverImage}
              alt={title}
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        </div>

        {/* Article Body Container */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* AIO Optimization Box: Quick Takeaway / Summary for AI Overview */}
          <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#121624] to-[#0A0D14] border border-[#D4AF37]/30 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-2.5 text-xs font-black text-[#D4AF37] uppercase tracking-wider mb-2.5">
              <Sparkles className="w-4 h-4" />
              <span>{isVi ? "Tóm tắt cốt lõi (Quick Takeaways)" : "Key Takeaways (AIO Summary)"}</span>
            </div>
            <p className="text-sm text-gray-200 leading-relaxed font-medium">
              {quickTakeaway}
            </p>
          </div>

          {/* Key Stats Grid */}
          {article.keyStats && article.keyStats.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-12">
              {article.keyStats.map((st, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-2xl border text-center transition-all ${
                    st.highlight
                      ? "bg-gradient-to-b from-[#1C170A] to-[#111420] border-[#D4AF37]/50 shadow-lg shadow-[#D4AF37]/10"
                      : "bg-[#10131E] border-white/5"
                  }`}
                >
                  <span className="block font-mono text-xl sm:text-2xl font-black text-[#D4AF37] mb-1">
                    {st.value}
                  </span>
                  <span className="block text-[11px] font-semibold text-gray-400 leading-tight">
                    {isVi ? st.labelVi : st.labelEn}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Main Article Content */}
          <div className="space-y-10 text-gray-300 leading-relaxed text-sm sm:text-base">
            {sections.map((sec, idx) => (
              <section key={idx} className="space-y-4">
                {sec.heading && (
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight pt-2 border-b border-gray-800/80 pb-2 flex items-center gap-2">
                    <span className="text-[#D4AF37]">✦</span>
                    <span>{sec.heading}</span>
                  </h2>
                )}

                {sec.content.map((p, pIdx) => (
                  <p key={pIdx} className="leading-relaxed text-gray-300">
                    {p}
                  </p>
                ))}

                {sec.quote && (
                  <blockquote className="my-6 p-5 sm:p-6 rounded-2xl bg-[#121624] border-l-4 border-[#D4AF37] space-y-2 text-gray-200 shadow-md">
                    <div className="flex items-start gap-3.5">
                      <Quote className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5 opacity-90" />
                      <p className="text-sm sm:text-base leading-relaxed italic font-sans font-medium text-amber-50/95">
                        &ldquo;{sec.quote.text}&rdquo;
                      </p>
                    </div>
                    <cite className="block text-right text-xs not-italic font-bold text-[#D4AF37] tracking-wide">
                      — {sec.quote.author}
                    </cite>
                  </blockquote>
                )}

                {sec.table && (
                  <div className="my-6 overflow-x-auto rounded-2xl border border-gray-800 bg-[#0A0D15]">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-[#141824] text-gray-300 uppercase tracking-wider text-[11px] font-bold border-b border-gray-800">
                        <tr>
                          {sec.table.headers.map((h, hIdx) => (
                            <th key={hIdx} className="p-3 sm:p-4">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800/80">
                        {sec.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-white/[0.02] transition-colors">
                            {row.map((cell, cIdx) => (
                              <td
                                key={cIdx}
                                className={`p-3 sm:p-4 text-gray-300 ${
                                  cIdx === 0 ? "font-semibold text-white" : ""
                                }`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Tags */}
          <div className="pt-8 pb-10 border-t border-gray-800 mt-12 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-gray-400 mr-2">
              {isVi ? "Thẻ liên quan:" : "Tags:"}
            </span>
            {article.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="px-3 py-1 rounded-xl bg-[#111420] text-gray-300 border border-white/5 text-xs font-semibold"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* FAQ Accordion Section for Rich Snippets */}
          {faqs && faqs.length > 0 && (
            <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-[#10131E] border border-white/5 space-y-5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {isVi ? "Câu hỏi thường gặp về sự kiện này" : "Frequently Asked Questions"}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {isVi ? "Giải đáp nhanh theo tiêu chuẩn dữ liệu cấu trúc Google FAQ" : "Fact-checked direct answers"}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, fIdx) => {
                  const isOpen = openFaqIndex === fIdx;
                  return (
                    <div
                      key={fIdx}
                      className="rounded-xl border border-gray-800/80 bg-[#090B12] overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                        className="w-full p-4 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-bold text-gray-200 hover:text-[#D4AF37] transition-colors"
                      >
                        <span>{faq.question}</span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-xs sm:text-sm text-gray-400 leading-relaxed border-t border-gray-800/50 pt-3">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Related Articles Navigation */}
          {relatedArticles.length > 0 && (
            <div className="pt-8 border-t border-gray-800 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">
                  {isVi ? "Bài viết liên quan trong nhật ký" : "Related Journal Entries"}
                </h3>
                <Link
                  href="/road-to-1000"
                  className="text-xs font-bold text-[#D4AF37] hover:underline inline-flex items-center gap-1"
                >
                  <span>{isVi ? "Xem tất cả" : "View All"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedArticles.slice(0, 2).map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/road-to-1000/${rel.slug}`}
                    className="p-4 rounded-2xl bg-[#10131E] border border-white/5 hover:border-[#D4AF37]/30 transition-all flex gap-4 group"
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                      <Image
                        src={rel.coverImage}
                        alt={isVi ? rel.titleVi : rel.titleEn}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-[#D4AF37]">
                        {isVi ? rel.categoryVi : rel.categoryEn}
                      </span>
                      <h4 className="text-xs font-bold text-white group-hover:text-[#D4AF37] transition-colors line-clamp-2 leading-snug">
                        {isVi ? rel.titleVi : rel.titleEn}
                      </h4>
                      <span className="text-[10px] text-gray-500 block">
                        {rel.publishedDate}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <FloatingShareButton />
    </div>
  );
}
