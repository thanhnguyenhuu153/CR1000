"use client";

import React from "react";
import { cr7CareerSummary } from "@/data/cr7-stats";
import { useSiteData } from "@/context/SiteDataContext";
import { useLanguage } from "@/context/LanguageContext";
import { Sparkles, Calendar, MapPin, ChevronRight, Trophy, Flame, ShieldCheck } from "lucide-react";

interface HeroCountdownProps {
  currentGoals: number;
}

export default function HeroCountdown({ currentGoals }: HeroCountdownProps) {
  const { images, nextMatch } = useSiteData();
  const { language, t } = useLanguage();
  const target = cr7CareerSummary.countdownTarget;
  const remaining = Math.max(0, target - currentGoals);
  const percentage = Math.min(100, (currentGoals / target) * 100);

  return (
    <section id="countdown" className="relative min-h-[96vh] flex items-center justify-center pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden">
      {/* Refined Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#D4AF37]/10 rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#1E2330_1px,transparent_1px)] [background-size:36px_36px] opacity-40" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-6 uppercase leading-tight">
          {t.hero.headlinePart1}{" "}
          <span className="gold-gradient-text block sm:inline">{t.hero.headlineGold}</span>
        </h1>

        <p className="max-w-2xl mx-auto text-sm sm:text-lg text-gray-400 font-light mb-12 leading-relaxed">
          {t.hero.subheadline}
        </p>

        {/* Hero Photo Banner - REAL PHOTO OF CR7 */}
        <div className="relative max-w-4xl mx-auto mb-12 rounded-3xl overflow-hidden border border-white/10 shadow-2xl gold-border-glow">
          <div className="relative h-64 sm:h-80 md:h-[420px] w-full bg-[#0E1017]">
            <img
              src={images.hero}
              alt="Cristiano Ronaldo - Hành trình 1000 bàn thắng"
              width={1200}
              height={600}
              fetchPriority="high"
              decoding="sync"
              className="w-full h-full object-cover object-top filter brightness-95 contrast-105"
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D13] via-[#0B0D13]/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0D13]/70 via-transparent to-[#0B0D13]/70" />

            {/* In-image Caption Overlay */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 text-left">
              <div>
                <span className="px-3 py-1 rounded-full bg-black/60 border border-[#D4AF37]/30 text-[#D4AF37] text-[11px] font-bold uppercase tracking-wider backdrop-blur-md">
                  {language === "vi" ? "Chân dung Huyền Thoại" : "Legendary Portrait"}
                </span>
                <h2 className="text-xl sm:text-3xl font-extrabold text-white mt-2 tracking-tight">
                  Cristiano Ronaldo dos Santos Aveiro
                </h2>
                <p className="text-xs sm:text-sm text-gray-300 mt-0.5">
                  {language === "vi"
                    ? "Madeira, Bồ Đào Nha • Sinh ngày 05/02/1985 • Al Nassr & ĐTQG Bồ Đào Nha"
                    : "Madeira, Portugal • Born Feb 5, 1985 • Al Nassr & Portugal National Team"}
                </p>
              </div>

              <div className="shrink-0">
                <span className="text-[10px] uppercase font-mono font-bold text-gray-300 px-2.5 py-1 rounded bg-black/70 border border-white/10 backdrop-blur-md">
                  {language === "vi" ? "Tư liệu Lịch sử" : "Historic Archive"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Countdown Display Card */}
        <div className="relative max-w-3xl mx-auto bg-gradient-to-b from-[#131622]/95 to-[#0B0D13]/95 border border-[#D4AF37]/25 rounded-3xl p-6 sm:p-10 shadow-2xl gold-border-glow backdrop-blur-xl mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
            {/* Current Goals */}
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-semibold">
                {t.hero.totalGoalsLabel}
              </span>
              <div className="text-6xl sm:text-7xl lg:text-8xl font-black font-mono tracking-tighter text-white whitespace-nowrap">
                {currentGoals}
              </div>
              <span className="text-xs font-medium text-gray-300 flex items-center justify-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-[#D4AF37]" /> {language === "vi" ? "1.341 trận chính thức" : "1,341 official matches"}
              </span>
            </div>

            {/* Middle Divider / Target Icon */}
            <div className="flex flex-col items-center justify-center py-4 sm:py-0 border-y sm:border-y-0 sm:border-x border-white/10">
              <div className="w-14 h-14 rounded-2xl bg-[#090A0F] border border-[#D4AF37]/30 flex items-center justify-center mb-2 shadow-inner">
                <Trophy className="w-7 h-7 text-[#D4AF37]" />
              </div>
              <span className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">
                {t.hero.remainingLabel}
              </span>
              <div className="mt-1 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold tracking-wide">
                {language === "vi" ? `Chỉ còn ${remaining} bàn` : `Only ${remaining} goals left`}
              </div>
            </div>

            {/* Target 1000 */}
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-semibold">
                {t.hero.targetLabel}
              </span>
              <div className="text-6xl sm:text-7xl lg:text-8xl font-black font-mono tracking-tighter gold-gradient-text whitespace-nowrap">
                1000
              </div>
              <span className="text-xs font-medium text-gray-300 flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> {language === "vi" ? "Đỉnh cao nhân loại" : "All-Time Pinnacle"}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-8 space-y-2">
            <div className="flex justify-between text-xs font-semibold text-gray-400">
              <span className="tracking-wide">{t.hero.progressLabel}</span>
              <span className="text-[#D4AF37] font-mono font-bold">{percentage.toFixed(1)}%</span>
            </div>
            <div className="w-full h-2.5 bg-[#08090C] rounded-full overflow-hidden p-0.5 border border-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#8C7335] via-[#D4AF37] to-[#F5E6A3] transition-all duration-700 shadow-sm"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Official Verification Notice */}
          <div className="mt-6 pt-5 border-t border-white/[0.08] flex items-center justify-center gap-2 text-[11px] text-gray-400">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>{t.hero.fifaCertified}</span>
          </div>
        </div>

        {/* Next Fixture Alert Card */}
        <div className="max-w-xl mx-auto bg-[#10131C]/80 border border-white/10 hover:border-[#D4AF37]/40 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all backdrop-blur-md">
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-11 h-11 rounded-xl bg-[#161A26] flex items-center justify-center shrink-0 border border-white/10">
              <Calendar className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/25">
                  {nextMatch.competition}
                </span>
                <span className="text-xs text-gray-400 font-medium">{t.hero.nextMatchKicker}</span>
              </div>
              <h3 className="text-sm font-bold text-white mt-1">
                {nextMatch.homeTeam} {t.hero.vs} {nextMatch.awayTeam}
              </h3>
              <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-gray-500" />
                {nextMatch.stadium}
              </p>
            </div>
          </div>

          <a
            href="#archive"
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold bg-[#171B26] hover:bg-[#D4AF37] text-gray-200 hover:text-black border border-white/10 hover:border-[#D4AF37] transition-all flex items-center justify-center gap-1 shrink-0"
          >
            <span>{language === "vi" ? "Tra cứu 985 bàn" : "Explore 985 Goals"}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
