"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { useSiteData } from "@/context/SiteDataContext";
import {
  cr7TrophySummary,
  getCr7Trophies,
  cr7TrophiesFaqVi,
  cr7TrophiesFaqEn,
  TrophyItem,
} from "@/data/cr7-trophies";
import {
  Trophy,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Globe,
  Award,
  Shield,
  Medal,
} from "lucide-react";

export default function TrophiesPage() {
  const { language } = useLanguage();
  const { images } = useSiteData();
  const [activeCategory, setActiveCategory] = useState<"all" | "club" | "international" | "individual">("all");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const trophies = getCr7Trophies(language);
  const faqs = language === "vi" ? cr7TrophiesFaqVi : cr7TrophiesFaqEn;

  const filteredTrophies = trophies.filter((t) => {
    if (activeCategory === "all") return true;
    return t.category === activeCategory;
  });

  const getTrophyImage = (id: string, defaultUrl?: string) => {
    if (id === "ucl") return images.trophyUcl || defaultUrl;
    if (id === "ballon-dor") return images.trophyBallonDor || defaultUrl;
    if (id === "euro-2016") return images.trophyEuro || defaultUrl;
    if (id === "nations-league") return images.trophyNationsLeague || images.trophyEuro || defaultUrl;
    if (id === "premier-league") return images.trophyPremierLeague || defaultUrl;
    if (id === "la-liga") return images.trophyLaLiga || defaultUrl;
    if (id === "serie-a") return images.trophySerieA || defaultUrl;
    if (id === "saudi-pro-league") return images.trophySaudiProLeague || images.trophyPremierLeague || defaultUrl;
    if (id === "fifa-club-wc") return images.trophyClubWc || defaultUrl;
    if (id === "copa-del-rey") return images.trophyCopaDelRey || defaultUrl;
    if (id === "fa-cup") return images.trophyFaCup || images.trophyPremierLeague || defaultUrl;
    if (id === "coppa-italia") return images.trophyCoppaItalia || images.trophySerieA || defaultUrl;
    if (id === "league-cup") return images.trophyLeagueCup || images.trophyPremierLeague || defaultUrl;
    if (id === "supercopa-espana") return images.trophySupercopaEspana || images.trophyLaLiga || defaultUrl;
    if (id === "supercoppa-italiana") return images.trophySupercoppaItaliana || images.trophySerieA || defaultUrl;
    if (id === "uefa-super-cup") return images.trophyUefaSuperCup || images.trophyUcl || defaultUrl;
    if (id === "community-shield") return images.trophyCommunityShield || images.trophyPremierLeague || defaultUrl;
    if (id === "supertaca-portugal") return images.trophySupertacaPortugal || images.trophyEuro || defaultUrl;
    if (id === "arab-club-cup") return images.trophyArabClub || defaultUrl;
    if (id === "golden-boot" || id === "golden-shoe") return images.trophyGoldenShoe || defaultUrl;
    if (id === "spl-golden-boot") return images.trophySplGoldenBoot || images.trophyGoldenShoe || defaultUrl;
    if (id === "fifa-the-best") return images.trophyFifaTheBest || defaultUrl;
    if (id === "puskas-award") return images.trophyPuskasAward || images.trophyUcl || defaultUrl;
    if (id === "ucl-top-scorer") return images.trophyUclTopScorer || images.trophyUcl || defaultUrl;
    if (id === "pichichi") return images.trophyPichichi || images.trophyGoldenShoe || defaultUrl;
    if (id === "capocannoniere") return images.trophyCapocannoniere || images.trophyGoldenShoe || defaultUrl;
    if (id === "premier-league-golden-boot") return images.trophyPlGoldenBoot || images.trophyGoldenShoe || defaultUrl;
    if (id === "uefa-best-player") return images.trophyFifaTheBest || defaultUrl;
    if (id === "euro-golden-boot") return images.trophyGoldenShoe || defaultUrl;
    return defaultUrl;
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "CR1000 Home",
            item: "https://www.cr1000.live",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: language === "vi" ? "37 Chiếc Cúp & Danh Hiệu Cristiano Ronaldo" : "Cristiano Ronaldo 37 Trophies & Honors",
            item: "https://www.cr1000.live/trophies",
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
    <main className="min-h-screen bg-[#08090C] text-[#F8FAFC]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 pb-16 relative overflow-hidden border-b border-white/[0.08]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E1910]/40 via-transparent to-[#08090C]" />
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
              CHƯƠNG 5 • PHÒNG TRUYỀN THỐNG BẢO TÀNG SỐ
            </span>
            <span className="text-xs text-gray-400 font-mono">ALL-TIME OFFICIAL SILVERWARE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            {language === "vi" ? (
              <>
                Toàn Bộ 37 Chiếc Cúp & <span className="gold-gradient-text">Bảng Vàng Danh Hiệu</span> Của CR7
              </>
            ) : (
              <>
                Cristiano Ronaldo: <span className="gold-gradient-text">Complete 37 Trophies</span> & World Honors
              </>
            )}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed font-light">
            {language === "vi"
              ? "Bộ sưu tập danh hiệu vĩ đại nhất lịch sử bóng đá: 5 Cúp C1 Champions League, 3 chức vô địch Premier League, 2 La Liga, 2 Serie A, vô địch Euro 2016, 2 Nations League cùng 5 Quả bóng Vàng thế giới."
              : "The crowning glory of an unprecedented career: 5 UEFA Champions League titles, 3 Premier League crowns, Euro 2016 glory, and 5 Ballon d'Or triumphs."}
          </p>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
            <div className="p-5 rounded-2xl bg-[#0F121A]/90 border border-white/10 text-center">
              <span className="text-[11px] text-gray-400 uppercase font-semibold block">
                {language === "vi" ? "Danh hiệu tập thể" : "Team Trophies"}
              </span>
              <div className="text-3xl sm:text-4xl font-black font-mono text-white mt-1">
                {cr7TrophySummary.totalTeamTrophies}
              </div>
              <span className="text-[10px] text-[#D4AF37] mt-1 block font-semibold">
                34 CLB • 3 ĐTQG
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#0F121A]/90 border border-white/10 text-center">
              <span className="text-[11px] text-gray-400 uppercase font-semibold block">
                UEFA Champions League
              </span>
              <div className="text-3xl sm:text-4xl font-black font-mono text-white mt-1">
                5
              </div>
              <span className="text-[10px] text-gray-400 mt-1 block">
                1 Man Utd • 4 Real Madrid
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#0F121A]/90 border border-white/10 text-center">
              <span className="text-[11px] text-gray-400 uppercase font-semibold block">
                Quả bóng Vàng (Ballon d&apos;Or)
              </span>
              <div className="text-3xl sm:text-4xl font-black font-mono text-white mt-1">
                5
              </div>
              <span className="text-[10px] text-[#D4AF37] mt-1 block font-semibold">
                2008, 2013, 2014, 2016, 2017
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#0F121A]/90 border border-white/10 text-center">
              <span className="text-[11px] text-gray-400 uppercase font-semibold block">
                Chiếc giày Vàng châu Âu
              </span>
              <div className="text-3xl sm:text-4xl font-black font-mono text-white mt-1">
                4
              </div>
              <span className="text-[10px] text-gray-400 mt-1 block">
                {language === "vi" ? "Kỷ lục 2 giải đấu khác nhau" : "Record in 2 top leagues"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Trophies Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {[
            { id: "all", label: language === "vi" ? "Tất cả danh hiệu" : "All Trophies" },
            { id: "club", label: language === "vi" ? "Cúp Câu Lạc Bộ (34)" : "Club Trophies (34)" },
            { id: "international", label: language === "vi" ? "ĐTQG Bồ Đào Nha (3)" : "International Titles (3)" },
            { id: "individual", label: language === "vi" ? "Giải Thưởng Cá Nhân (32+)" : "Individual Honors (32+)" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20"
                  : "bg-[#11131C] text-gray-400 border-white/10 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Trophies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrophies.map((trophy) => {
            const imgSrc = getTrophyImage(trophy.id, trophy.trophyImageUrl);
            return (
              <div
                key={trophy.id}
                className="bg-[#0F121A]/90 border border-white/10 hover:border-[#D4AF37]/50 rounded-2xl overflow-hidden transition-all duration-300 shadow-xl flex flex-col justify-between group"
              >
                {imgSrc && (
                  <div className="relative h-48 w-full bg-[#08090C] overflow-hidden border-b border-gray-800">
                    <Image
                      src={imgSrc}
                      alt={trophy.name}
                      width={400}
                      height={250}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 filter brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F121A] via-transparent to-transparent" />
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/80 border border-[#D4AF37]/40 text-[#D4AF37] font-mono font-black text-sm backdrop-blur-md">
                      x{trophy.count}
                    </div>
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#D4AF37]">
                      {trophy.teamOrOrg}
                    </span>
                    <span className="text-[10px] text-gray-500 uppercase font-semibold">
                      {trophy.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
                    {trophy.name}
                  </h3>

                  <p className="text-xs text-gray-300 leading-relaxed mt-2.5 font-light">
                    {trophy.description}
                  </p>

                  <div className="pt-4 mt-4 border-t border-white/5 flex flex-wrap gap-1.5 items-center">
                    <span className="text-[10px] text-gray-500 uppercase font-semibold">
                      {language === "vi" ? "Các năm đạt được:" : "Years:"}
                    </span>
                    {trophy.years.map((y, yi) => (
                      <span
                        key={yi}
                        className="px-2 py-0.5 rounded bg-black/60 border border-white/10 text-[10px] font-mono font-semibold text-gray-300"
                      >
                        {y}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SEO FAQ Section */}
      <section className="py-16 bg-[#0B0D13] border-t border-white/[0.08]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              FAQ • CÂU HỎI THƯỜNG GẶP
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
              {language === "vi" ? "Hỏi Đáp Về Phòng Truyền Thống Của CR7" : "Cristiano Ronaldo Trophies FAQ"}
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
