"use client";

import React, { useState } from "react";
import { cr7SeasonsData, YearRecord } from "@/data/cr7-seasons";
import { useLanguage } from "@/context/LanguageContext";
import { BarChart3, TrendingUp, Crown, Calendar, Sparkles, CheckCircle2, Flame, Trophy } from "lucide-react";

export default function SeasonsChartSection() {
  const { language, t } = useLanguage();
  // Mặc định chọn năm 2013 - Đỉnh cao sự nghiệp với 69 bàn thắng
  const defaultYear = cr7SeasonsData.find((y) => y.year === "2013") || cr7SeasonsData[11];
  const [selectedYear, setSelectedYear] = useState<YearRecord>(defaultYear);

  const maxGoals = 69; // Đỉnh cao năm 2013
  const totalGoals = 985;
  const totalMatches = 1341;
  const totalClubGoals = 839;
  const totalCountryGoals = 146;

  return (
    <section className="py-24 sm:py-32 bg-[#08090C] relative border-t border-white/[0.06] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D4AF37]/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#121520] border border-[#D4AF37]/30 text-[#D4AF37] text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            {t.seasons.chapterBadge}
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-tight">
            {t.seasons.title} <span className="gold-gradient-text">{t.seasons.titleGold}</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-300 font-light leading-relaxed">
            {t.seasons.subtitle}
          </p>
        </div>

        {/* Selected Year Detail Highlight Card */}
        <div className="bg-[#0F121A]/95 border border-white/10 rounded-2xl p-6 sm:p-8 mb-10 shadow-2xl relative overflow-hidden backdrop-blur-md">
          {/* Subtle gold line accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6 pb-6 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs uppercase font-semibold tracking-widest text-[#D4AF37] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> {t.seasons.selectedYearBadge}
                </span>
                {selectedYear.isPeakYear && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] text-[11px] font-bold uppercase tracking-wider animate-pulse">
                    <Crown className="w-3.5 h-3.5" /> {t.seasons.peakBadge}
                  </span>
                )}
                {selectedYear.year === "2023" && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-300 text-[11px] font-bold uppercase tracking-wider">
                    <Flame className="w-3.5 h-3.5" /> {t.seasons.topScorerBadge}
                  </span>
                )}
              </div>

              <h3 className="text-2xl sm:text-4xl font-black text-white mt-2 tracking-tight flex items-center gap-3">
                <span>{language === "vi" ? `Năm ${selectedYear.year}` : `Year ${selectedYear.year}`}</span>
                <span className="text-gray-500 font-light text-lg sm:text-2xl">•</span>
                <span className="text-gray-200 text-lg sm:text-2xl font-bold">{selectedYear.team}</span>
              </h3>
            </div>

            {/* Metrics Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 w-full lg:w-auto">
              {/* Total Goals */}
              <div className="text-center px-4 py-3 rounded-xl bg-[#141824] border border-[#D4AF37]/30 shadow-inner">
                <span className="text-2xl sm:text-3xl font-black font-mono text-[#D4AF37] block">
                  {selectedYear.goals}
                </span>
                <span className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">{t.seasons.totalGoals}</span>
              </div>

              {/* Club vs Country breakdown */}
              <div className="text-center px-4 py-3 rounded-xl bg-[#0B0D14] border border-white/10">
                <span className="text-sm sm:text-base font-bold font-mono text-gray-200 block mt-1">
                  {selectedYear.clubGoals} <span className="text-xs text-gray-400">{language === "vi" ? "CLB" : "Club"}</span> + {selectedYear.countryGoals} <span className="text-xs text-gray-400">{language === "vi" ? "ĐTQG" : "Country"}</span>
                </span>
                <span className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider mt-1 block">{t.seasons.breakdown}</span>
              </div>

              {/* Matches */}
              <div className="text-center px-4 py-3 rounded-xl bg-[#0B0D14] border border-white/10">
                <span className="text-2xl sm:text-3xl font-black font-mono text-gray-200 block">
                  {selectedYear.matches}
                </span>
                <span className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider">{t.seasons.matches}</span>
              </div>

              {/* Ratio */}
              <div className="text-center px-4 py-3 rounded-xl bg-[#0B0D14] border border-white/10">
                <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 block">
                  {selectedYear.ratio}
                </span>
                <span className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider">{t.seasons.ratio}</span>
              </div>

              {/* Assists */}
              <div className="text-center px-4 py-3 rounded-xl bg-[#0B0D14] border border-white/10 col-span-2 sm:col-span-1">
                <span className="text-2xl sm:text-3xl font-black font-mono text-cyan-300 block">
                  {selectedYear.assists}
                </span>
                <span className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider">{t.seasons.assists}</span>
              </div>
            </div>
          </div>

          {/* Historical Narrative for this Year */}
          <div className="flex items-start gap-3 bg-[#090A0F]/80 p-4 rounded-xl border border-white/[0.06]">
            <Trophy className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-light">
              <span className="font-semibold text-white">{t.seasons.historicalHighlight}: </span>
              {selectedYear.milestoneNote}
            </p>
          </div>
        </div>

        {/* Visual Bar Timeline Grid */}
        <div className="bg-[#0F121A]/90 border border-white/10 rounded-2xl p-5 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/[0.06]">
            <span className="text-xs uppercase font-semibold tracking-wider text-gray-300 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#D4AF37]" /> 
              {t.seasons.instruction}
            </span>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-gray-300">
                <span className="w-2.5 h-2.5 rounded bg-[#D4AF37]" /> {language === "vi" ? "Cột đang chọn" : "Selected Year"}
              </span>
              <span className="flex items-center gap-1.5 text-gray-300">
                <span className="w-2.5 h-2.5 rounded bg-[#D4AF37]/35" /> {language === "vi" ? "Các năm khác" : "Other Years"}
              </span>
              <span className="flex items-center gap-1.5 text-[#D4AF37] font-semibold">
                <Crown className="w-3.5 h-3.5" /> {language === "vi" ? "2013 (Đỉnh cao 69 bàn)" : "2013 (Peak 69 Goals)"}
              </span>
            </div>
          </div>

          {/* Bar Chart Representation */}
          <div className="overflow-x-auto pb-2 -mx-2 px-2 scrollbar-thin scrollbar-thumb-[#1e2230]">
            <div className="grid grid-cols-[repeat(25,minmax(0,1fr))] gap-1 sm:gap-1.5 items-end h-72 sm:h-80 pt-10 pb-2 border-b border-white/[0.08] min-w-[640px] sm:min-w-0">
              {cr7SeasonsData.map((s) => {
                const isSelected = selectedYear.year === s.year;
                const isPeak = s.isPeakYear;
                const heightPercent = (s.goals / maxGoals) * 100;

                return (
                  <button
                    key={s.year}
                    type="button"
                    onClick={() => setSelectedYear(s)}
                    className="flex flex-col items-center h-full justify-end group focus:outline-none relative transition-transform duration-200 hover:-translate-y-1 cursor-pointer"
                    title={language === "vi" ? `Năm ${s.year}: ${s.goals} bàn (${s.clubGoals} CLB + ${s.countryGoals} ĐTQG) / ${s.matches} trận` : `Year ${s.year}: ${s.goals} goals (${s.clubGoals} Club + ${s.countryGoals} Country) / ${s.matches} matches`}
                  >
                    {/* Peak Crown Badge for 2013 */}
                    {isPeak && (
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex flex-col items-center">
                        <Crown className="w-3.5 h-3.5 text-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                      </div>
                    )}

                    {/* Goal label above bar */}
                    <span
                      className={`text-[9px] sm:text-[10px] font-mono transition-opacity mb-1 font-bold ${
                        isSelected || isPeak
                          ? "text-[#D4AF37] opacity-100"
                          : "text-gray-400 opacity-60 group-hover:opacity-100"
                      }`}
                    >
                      {s.goals}
                    </span>

                    {/* The Bar */}
                    <div
                      className={`w-full rounded-t-sm transition-all duration-300 relative ${
                        isSelected
                          ? "bg-gradient-to-t from-[#B8860B] to-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.5)] ring-2 ring-[#D4AF37]"
                          : isPeak
                          ? "bg-[#D4AF37]/80 hover:bg-[#D4AF37]"
                          : "bg-[#D4AF37]/30 hover:bg-[#D4AF37]/60"
                      }`}
                      style={{ height: `${Math.max(6, heightPercent)}%` }}
                    />

                    {/* Year Label */}
                    <span
                      className={`text-[9px] sm:text-[10px] font-mono mt-2 w-full text-center transition-colors ${
                        isSelected
                          ? "text-[#D4AF37] font-black"
                          : isPeak
                          ? "text-amber-300 font-bold"
                          : "text-gray-400 group-hover:text-gray-200"
                      }`}
                    >
                      {s.year.slice(2, 4)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Aggregate Footnotes & Verified Proofs */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/[0.06] text-xs">
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#090A0F]/70 border border-white/[0.06]">
              <Crown className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold">{language === "vi" ? "Đỉnh cao lịch sử (Năm 2013)" : "All-Time Peak (2013)"}</strong>
                <span className="text-gray-400">
                  {language === "vi" ? (
                    <><strong>69 bàn thắng</strong> sau 59 trận (59 bàn cho Real Madrid + 10 bàn cho BĐN). Hiệu suất kỷ lục 1.17 bàn/trận.</>
                  ) : (
                    <><strong>69 goals</strong> in 59 matches (59 Real Madrid + 10 Portugal). Record ratio of 1.17 goals/match.</>
                  )}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#090A0F]/70 border border-white/[0.06]">
              <Flame className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold">{language === "vi" ? "Vua phá lưới thế giới 2023" : "World Top Scorer 2023"}</strong>
                <span className="text-gray-400">
                  {language === "vi" ? (
                    <><strong>54 bàn thắng</strong> sau 59 trận (44 bàn Al Nassr + 10 bàn BĐN) được ghi ở tuổi 38.</>
                  ) : (
                    <><strong>54 goals</strong> in 59 matches (44 Al Nassr + 10 Portugal) scored at age 38.</>
                  )}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#090A0F]/70 border border-white/[0.06]">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold">{language === "vi" ? "Tổng hợp nhất 25 năm (2002–2026)" : "25-Year Grand Total (2002–2026)"}</strong>
                <span className="text-gray-400">
                  {language === "vi" ? (
                    <><strong>{totalGoals} bàn thắng</strong> ({totalClubGoals} CLB + {totalCountryGoals} ĐTQG) qua <strong>{totalMatches.toLocaleString()} trận đấu chính thức</strong>.</>
                  ) : (
                    <><strong>{totalGoals} goals</strong> ({totalClubGoals} Club + {totalCountryGoals} Country) across <strong>{totalMatches.toLocaleString()} official matches</strong>.</>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
