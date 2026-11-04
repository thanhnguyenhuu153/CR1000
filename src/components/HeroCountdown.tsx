"use client";

import React from "react";
import Image from "next/image";
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
            <Image
              src={images.hero}
              alt={language === "vi" ? "Cristiano Ronaldo - Hành trình 1000 bàn thắng" : "Cristiano Ronaldo - Road to 1,000 Goals"}
              width={1200}
              height={600}
              priority
              unoptimized={typeof images.hero === "string" && images.hero.startsWith("data:")}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
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

        {/* Next Fixture Alert Card - Luxury Gold Ticker */}
        <div className="max-w-2xl mx-auto bg-gradient-to-b from-[#121624]/90 via-[#0D101A]/95 to-[#08090E] border border-white/10 hover:border-[#D4AF37]/50 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden backdrop-blur-xl group transition-all duration-300">
          {/* Subtle gold line accent on top */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-20 bg-[#D4AF37]/10 blur-2xl pointer-events-none rounded-full" />

          {/* Card Top Meta Bar */}
          <div className="flex items-center justify-between gap-3 pb-3.5 mb-4 border-b border-white/[0.08]">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#D4AF37] shrink-0">
                {t.hero.nextMatchKicker}
              </span>
              <span className="text-gray-600 hidden sm:inline">•</span>
              <span className="text-xs text-gray-300 font-medium truncate">
                {nextMatch.competition}
              </span>
            </div>

            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider shrink-0">
              <Flame className="w-3 h-3 text-[#D4AF37]" />
              {language === "vi" ? `Mục tiêu bàn ${currentGoals + 1}` : `Pursuit: Goal ${currentGoals + 1}`}
            </span>
          </div>

          {/* Match Clash & Action */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="space-y-2 text-left">
              {/* Teams Display */}
              <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                <span className="text-lg sm:text-2xl font-black text-white tracking-tight">
                  {nextMatch.homeTeam}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-[#161B29] border border-white/10 text-[11px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider shadow-inner">
                  {t.hero.vs}
                </span>
                <span className="text-lg sm:text-2xl font-black text-gray-300 tracking-tight">
                  {nextMatch.awayTeam}
                </span>
              </div>

              {/* Stadium & Kickoff Info */}
              <div className="flex items-center flex-wrap gap-x-4 gap-y-1.5 text-xs text-gray-400 font-light">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span>{nextMatch.stadium}</span>
                </span>
                {nextMatch.kickoffTime && (
                  <>
                    <span className="hidden sm:inline text-gray-700">•</span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                      <span>{nextMatch.kickoffTime}</span>
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Quick Link Action Button */}
            <a
              href="#archive"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-extrabold bg-[#161B26] hover:bg-[#D4AF37] text-white hover:text-black border border-white/10 hover:border-[#D4AF37] transition-all duration-200 flex items-center justify-center gap-2 shrink-0 group/btn shadow-md"
            >
              <span>{language === "vi" ? `Tra cứu ${currentGoals} bàn` : `Explore ${currentGoals} Goals`}</span>
              <ChevronRight className="w-4 h-4 text-[#D4AF37] group-hover/btn:text-black group-hover/btn:translate-x-0.5 transition-all" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
