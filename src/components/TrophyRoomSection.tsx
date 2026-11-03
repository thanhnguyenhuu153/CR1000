"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cr7Trophies, cr7TrophySummary } from "@/data/cr7-trophies";
import { cr7CareerSummary } from "@/data/cr7-stats";
import { useSiteData } from "@/context/SiteDataContext";
import { useLanguage } from "@/context/LanguageContext";
import { Trophy, Award, Crown, Globe, Shield, Star, Sparkles, CheckCircle2 } from "lucide-react";

export default function TrophyRoomSection() {
  const { images } = useSiteData();
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<"club" | "international" | "individual" | "records">("club");

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

  const filteredTrophies = cr7Trophies.filter((tr) => {
    if (activeCategory === "records") return false;
    return tr.category === activeCategory;
  });

  return (
    <section id="trophies" className="py-28 sm:py-36 bg-[#08090C] relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#121520] border border-[#D4AF37]/25 text-[#D4AF37] text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">
            {t.trophies.chapterBadge}
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-tight">
            {t.trophies.title} <span className="gold-gradient-text">{t.trophies.titleGold}</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-400 font-light leading-relaxed">
            {t.trophies.subtitle}
          </p>
        </div>

        {/* Featured Real Photo Banner: CR7 with Ballon d'Or */}
        <div className="relative max-w-5xl mx-auto mb-16 rounded-3xl overflow-hidden border border-white/10 bg-[#0F121A]/90 p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
          <div className="w-full md:w-5/12 h-64 sm:h-72 rounded-2xl overflow-hidden border border-white/10 relative shrink-0 bg-[#090A0F]">
            <Image
              src={images.trophyBallonDor}
              alt={language === "vi" ? "Cristiano Ronaldo nhận Quả bóng Vàng" : "Cristiano Ronaldo receiving the Ballon d'Or"}
              width={600}
              height={450}
              loading="lazy"
              unoptimized={typeof images.trophyBallonDor === "string" && images.trophyBallonDor.startsWith("data:")}
              sizes="(max-width: 640px) 100vw, 400px"
              className="w-full h-full object-cover object-center filter brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <span className="absolute bottom-3 left-3 text-[11px] font-semibold text-gray-200 bg-black/70 px-2.5 py-1 rounded-md backdrop-blur-md border border-white/10">
              {language === "vi" ? "🏆 CR7 nâng cao Quả bóng Vàng thế giới" : "🏆 CR7 lifting the World Ballon d'Or"}
            </span>
          </div>

          <div className="flex-1 space-y-3.5 text-left">
            <span className="px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider">
              {language === "vi" ? "Bộ sưu tập bất tử" : "Immortal Silverware"}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {language === "vi" ? "Kỷ Lục 5 Quả Bóng Vàng & 5 Champions League" : "Record 5 Ballon d'Ors & 5 Champions Leagues"}
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed font-light">
              {language === "vi"
                ? "Từ danh hiệu Quả bóng Vàng đầu tiên năm 2008 ở tuổi 23 dưới thời Sir Alex Ferguson, tới cú đúp bảo vệ thành công danh hiệu năm 2016 và 2017 cùng Real Madrid. Cristiano Ronaldo là cầu thủ châu Âu duy nhất trong lịch sử đoạt tới 5 Quả bóng Vàng."
                : "From his first Ballon d'Or in 2008 at age 23 under Sir Alex Ferguson, to back-to-back triumphs in 2016 and 2017 with Real Madrid. Cristiano Ronaldo is the only European player in football history to win 5 Ballon d'Or awards."}
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs font-mono text-[#D4AF37]">
              <span>★ 2008</span>
              <span>★ 2013</span>
              <span>★ 2014</span>
              <span>★ 2016</span>
              <span>★ 2017</span>
            </div>
          </div>
        </div>

        {/* Trophy Summary Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-14">
          <div className="bg-[#0F121A]/80 border border-white/10 rounded-2xl p-5 text-center">
            <span className="text-[11px] uppercase font-semibold text-gray-400">
              {language === "vi" ? "Danh hiệu tập thể" : "Team Silverware"}
            </span>
            <div className="text-4xl font-black font-mono gold-gradient-text mt-1.5">
              {cr7TrophySummary.totalTeamTrophies}
            </div>
            <span className="text-[11px] text-gray-400 mt-1 block">
              {language === "vi" ? "33 CLB + 3 ĐTQG" : "33 Club + 3 Country"}
            </span>
          </div>

          <div className="bg-[#0F121A]/80 border border-white/10 rounded-2xl p-5 text-center">
            <span className="text-[11px] uppercase font-semibold text-gray-400">
              UEFA Champions League
            </span>
            <div className="text-4xl font-black font-mono text-white mt-1.5">
              5
            </div>
            <span className="text-[11px] text-gray-400 mt-1 block">
              1 Man Utd + 4 Real Madrid
            </span>
          </div>

          <div className="bg-[#0F121A]/80 border border-white/10 rounded-2xl p-5 text-center">
            <span className="text-[11px] uppercase font-semibold text-gray-400">
              {language === "vi" ? "Quả bóng Vàng (Ballon d'Or)" : "Ballon d'Or Awards"}
            </span>
            <div className="text-4xl font-black font-mono text-[#D4AF37] mt-1.5">
              5
            </div>
            <span className="text-[11px] text-gray-400 mt-1 block">
              2008, 2013, 2014, 2016, 2017
            </span>
          </div>

          <div className="bg-[#0F121A]/80 border border-white/10 rounded-2xl p-5 text-center">
            <span className="text-[11px] uppercase font-semibold text-gray-400">
              {language === "vi" ? "Chiếc giày Vàng châu Âu" : "European Golden Shoes"}
            </span>
            <div className="text-4xl font-black font-mono text-white mt-1.5">
              4
            </div>
            <span className="text-[11px] text-gray-400 mt-1 block">
              {language === "vi" ? "Kỷ lục Premier League & La Liga" : "Premier League & La Liga Record"}
            </span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 mb-12 overflow-x-auto pb-2">
          {[
            { id: "club", label: `${t.trophies.tabClub} (33)` },
            { id: "international", label: `${t.trophies.tabInternational} (3)` },
            { id: "individual", label: `${t.trophies.tabIndividual} (32+)` },
            { id: "records", label: language === "vi" ? "Kỷ Lục Thế Giới Guinness" : "Guinness World Records" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20"
                  : "bg-[#11131C] text-gray-400 border-white/10 hover:text-white hover:border-white/20"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Trophies Grid Display with REAL TROPHY PHOTOS */}
        {activeCategory !== "records" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrophies.map((trophy) => (
              <div
                key={trophy.id}
                className="bg-[#0F121A]/90 border border-white/10 hover:border-[#D4AF37]/50 rounded-2xl overflow-hidden transition-all duration-300 shadow-xl flex flex-col justify-between group"
              >
                {/* Trophy Real Image Header */}
                {getTrophyImage(trophy.id, trophy.trophyImageUrl) && (
                  <div className="relative h-44 w-full bg-[#08090C] overflow-hidden border-b border-gray-800">
                    <Image
                      src={getTrophyImage(trophy.id, trophy.trophyImageUrl)!}
                      alt={trophy.name}
                      width={400}
                      height={250}
                      loading="lazy"
                      unoptimized={typeof getTrophyImage(trophy.id, trophy.trophyImageUrl) === "string" && getTrophyImage(trophy.id, trophy.trophyImageUrl)!.startsWith("data:")}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 350px"
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 filter brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#131520] via-transparent to-transparent" />
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/70 border border-[#D4AF37]/40 text-[#D4AF37] font-mono font-black text-sm backdrop-blur-md">
                      x{trophy.count}
                    </div>
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#D4AF37]">
                      {trophy.teamOrOrg}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{trophy.name}</h3>
                  <p className="text-xs text-gray-300 leading-relaxed mb-4">
                    {trophy.description}
                  </p>

                  <div className="pt-3 border-t border-gray-800/80">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-1.5">
                      {language === "vi" ? "Các năm nâng cúp:" : "Years Won:"}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {trophy.years.map((y, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-[#1A1D27] text-gray-200 border border-gray-700"
                        >
                          {y}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* World Records Display */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cr7CareerSummary.worldRecords.map((record, index) => (
              <div
                key={index}
                className="bg-[#11131C] border border-[#D4AF37]/30 rounded-2xl p-6 shadow-xl relative overflow-hidden"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] px-2.5 py-0.5 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/25">
                      {language === "vi" ? "Xác nhận:" : "Certified:"} {record.verifiedBy}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-2">{record.title}</h3>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-2xl sm:text-3xl font-black font-mono gold-gradient-text block">
                      {record.value}
                    </span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mt-2">
                  {record.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
