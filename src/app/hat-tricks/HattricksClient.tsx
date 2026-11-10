"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import {
  cr7HattrickStats,
  getCr7HattrickMatches,
  cr7HattrickFaqVi,
  cr7HattrickFaqEn,
  HattrickMatch,
} from "@/data/cr7-hattricks";
import {
  Flame,
  Trophy,
  ArrowLeft,
  Calendar,
  MapPin,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Search,
  Filter,
} from "lucide-react";

export default function HattricksClient() {
  const { language } = useLanguage();
  const [filterTeam, setFilterTeam] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Sync document title dynamically with active language
  useEffect(() => {
    document.title =
      language === "vi"
        ? "66+ Cú Hat-trick Huyền Thoại Của Cristiano Ronaldo | CR1000"
        : "Cristiano Ronaldo: All 66+ Career Hat-tricks & Pokers | CR1000";
  }, [language]);

  const matches = getCr7HattrickMatches(language);
  const faqs = language === "vi" ? cr7HattrickFaqVi : cr7HattrickFaqEn;

  const filteredMatches = matches.filter((m) => {
    const matchTeam =
      filterTeam === "all" ||
      (filterTeam === "portugal" &&
        (m.cr7Team.toLowerCase().includes("bồ đào nha") ||
          m.cr7Team.toLowerCase().includes("portugal"))) ||
      (filterTeam === "real" && m.cr7Team.toLowerCase().includes("real")) ||
      (filterTeam === "mu" &&
        (m.cr7Team.toLowerCase().includes("manchester") ||
          m.cr7Team.toLowerCase().includes("man utd"))) ||
      (filterTeam === "juventus" && m.cr7Team.toLowerCase().includes("juventus")) ||
      (filterTeam === "alnassr" && m.cr7Team.toLowerCase().includes("nassr"));

    const query = searchQuery.toLowerCase().trim();
    const matchQuery =
      !query ||
      m.opponent.toLowerCase().includes(query) ||
      m.competition.toLowerCase().includes(query) ||
      m.stadium.toLowerCase().includes(query) ||
      m.date.includes(query);

    return matchTeam && matchQuery;
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: language === "vi" ? "Trang chủ CR1000" : "CR1000 Home",
            item: "https://www.cr1000.live",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: language === "vi" ? "66+ Cú Hat-trick của Cristiano Ronaldo" : "Cristiano Ronaldo 66+ Hat-tricks",
            item: "https://www.cr1000.live/hat-tricks",
          },
        ],
      },
      {
        "@type": "FAQPage",
        inLanguage: language === "vi" ? "vi-VN" : "en-US",
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
    <main className="min-h-screen bg-[#08090C] text-[#F8FAFC]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 pb-16 relative overflow-hidden border-b border-white/[0.08]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#181B26]/40 via-transparent to-[#08090C]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-[#D4AF37] mb-6 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>{language === "vi" ? "Quay lại Trang Chủ & Đếm ngược" : "Back to Home Countdown"}</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-black uppercase tracking-widest">
              {language === "vi" ? "CHƯƠNG 3 • CHUYÊN ĐỀ KỶ LỤC" : "CHAPTER 3 • SPECIAL RECORD FEATURE"}
            </span>
            <span className="text-xs text-gray-400 font-mono">FIFA & IFFHS CERTIFIED</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            {language === "vi" ? (
              <>
                66+ Cú Hat-trick <span className="gold-gradient-text">Huyền Thoại</span> Của Cristiano Ronaldo
              </>
            ) : (
              <>
                Cristiano Ronaldo: <span className="gold-gradient-text">All 66+ Career Hat-tricks</span> & Pokers
              </>
            )}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed font-light">
            {language === "vi"
              ? "Khám phá biên niên sử trọn vẹn 66 cú hat-trick, 11 trận poker (4 bàn) và 2 trận repoker (5 bàn). Kỷ lục gia ghi nhiều hat-trick nhất bóng đá quốc tế và ông vua knock-out Champions League."
              : "Explore the comprehensive chronicle of Ronaldo's 66 official career hat-tricks, 11 pokers (4 goals), and 2 five-goal masterclasses for clubs and Portugal."}
          </p>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
            <div className="p-5 rounded-2xl bg-[#0F121A]/90 border border-white/10 text-center">
              <span className="text-[11px] text-gray-400 uppercase font-semibold block">
                {language === "vi" ? "Tổng cú Hat-trick" : "Total Hat-tricks"}
              </span>
              <div className="text-3xl sm:text-4xl font-black font-mono text-white mt-1">
                {cr7HattrickStats.totalHattricks}
              </div>
              <span className="text-[10px] text-[#D4AF37] mt-1 block font-semibold">
                {language === "vi" ? "Kỷ lục thế giới đương đại" : "World Record Era"}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#0F121A]/90 border border-white/10 text-center">
              <span className="text-[11px] text-gray-400 uppercase font-semibold block">
                {language === "vi" ? "Hat-trick ĐTQG" : "International (Portugal)"}
              </span>
              <div className="text-3xl sm:text-4xl font-black font-mono text-white mt-1">
                {cr7HattrickStats.byTeam.portugal}
              </div>
              <span className="text-[10px] text-gray-400 mt-1 block">
                {language === "vi" ? "Nhiều nhất lịch sử FIFA" : "All-time FIFA Record"}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#0F121A]/90 border border-white/10 text-center">
              <span className="text-[11px] text-gray-400 uppercase font-semibold block">
                {language === "vi" ? "Trận ghi 4 & 5 bàn" : "Pokers (4-5 Goals)"}
              </span>
              <div className="text-3xl sm:text-4xl font-black font-mono text-white mt-1">
                {cr7HattrickStats.fourGoals + cr7HattrickStats.fiveGoals}
              </div>
              <span className="text-[10px] text-[#D4AF37] mt-1 block font-semibold">
                {language === "vi" ? "11 Poker • 2 Repoker" : "11 Pokers • 2 Five-goals"}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#0F121A]/90 border border-white/10 text-center">
              <span className="text-[11px] text-gray-400 uppercase font-semibold block">
                {language === "vi" ? "Sau tuổi 30" : "After Age 30"}
              </span>
              <div className="text-3xl sm:text-4xl font-black font-mono text-white mt-1">
                36
              </div>
              <span className="text-[10px] text-gray-400 mt-1 block">
                {language === "vi" ? "> 54% tổng hat-trick" : "> 54% of career total"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Filterable Hat-trick Table */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          {/* Team Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {[
              { id: "all", label: language === "vi" ? "Tất cả (66)" : "All (66)" },
              { id: "real", label: `Real Madrid (${cr7HattrickStats.byTeam.realMadrid})` },
              { id: "portugal", label: `${language === "vi" ? "Bồ Đào Nha" : "Portugal"} (${cr7HattrickStats.byTeam.portugal})` },
              { id: "alnassr", label: `Al Nassr (${cr7HattrickStats.byTeam.alNassr})` },
              { id: "mu", label: `Man Utd (${cr7HattrickStats.byTeam.manUtd})` },
              { id: "juventus", label: `Juventus (${cr7HattrickStats.byTeam.juventus})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterTeam(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
                  filterTeam === tab.id
                    ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20"
                    : "bg-[#11131C] text-gray-400 border-white/10 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === "vi" ? "Tìm đối thủ, giải đấu..." : "Search opponent, league..."}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#11131C] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>

        {/* Hat-tricks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMatches.map((m, idx) => (
            <div
              key={`${m.date}-${idx}`}
              className="bg-[#0F121A]/90 border border-white/10 hover:border-[#D4AF37]/40 rounded-2xl p-5 shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 font-bold font-mono">
                    #{m.goals.length >= 5 ? "REPOKER (5)" : m.goals.length === 4 ? "POKER (4)" : "HAT-TRICK (3)"}
                  </span>
                  <span className="text-gray-400 font-mono flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#D4AF37]" />
                    {m.date}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-white group-hover:text-[#D4AF37] transition-colors">
                  {m.cr7Team} vs {m.opponent}
                </h3>
                <div className="text-xs font-mono font-black text-[#D4AF37] mt-0.5">
                  {language === "vi" ? "Tỷ số" : "Score"}: {m.score}
                </div>

                <div className="text-[11px] text-gray-400 flex items-center gap-1.5 mt-2">
                  <MapPin className="w-3 h-3 text-gray-500 shrink-0" />
                  <span className="truncate">{m.stadium} • {m.competition}</span>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed mt-3 line-clamp-3">
                  {m.description}
                </p>
              </div>

              {/* Goal Minutes Badge List */}
              <div className="pt-4 mt-4 border-t border-white/5 flex flex-wrap gap-1.5 items-center">
                <span className="text-[10px] text-gray-500 uppercase font-semibold">
                  {language === "vi" ? "Phút ghi bàn:" : "Goals:"}
                </span>
                {m.goals.map((g, gi) => (
                  <span
                    key={gi}
                    className="px-2 py-0.5 rounded bg-black/60 border border-white/10 text-[10px] font-mono font-bold text-gray-300"
                  >
                    {g.minute}&apos;
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEO FAQ Section */}
      <section className="py-16 bg-[#0B0D13] border-t border-white/[0.08]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              {language === "vi" ? "FAQ • CÂU HỎI THƯỜNG GẶP" : "FAQ • FREQUENTLY ASKED QUESTIONS"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
              {language === "vi" ? "Hỏi Đáp Về Các Kỷ Lục Hat-trick Của CR7" : "Cristiano Ronaldo Hat-tricks FAQ"}
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-[#111420] border border-white/10 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02]"
                  >
                    <span className="text-sm sm:text-base font-bold text-white leading-snug">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#D4AF37] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/5">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
