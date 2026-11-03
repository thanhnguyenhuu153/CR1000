"use client";

import React from "react";
import { cr7TopOpponents } from "@/data/cr7-opponents";
import { useLanguage } from "@/context/LanguageContext";
import { Target, Skull, Trophy, Flame } from "lucide-react";

export default function OpponentsSection() {
  const { language, t } = useLanguage();

  return (
    <section id="opponents" className="py-28 sm:py-36 bg-[#08090C] relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#121520] border border-[#D4AF37]/25 text-[#D4AF37] text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">
            {t.opponents.chapterBadge}
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-tight">
            {t.opponents.title} <span className="gold-gradient-text">{t.opponents.titleGold}</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-400 font-light leading-relaxed">
            {t.opponents.subtitle}
          </p>
        </div>

        {/* Top 3 Victims Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {cr7TopOpponents.slice(0, 3).map((victim, idx) => (
            <div
              key={victim.team}
              className="bg-[#0F121A]/90 border border-white/10 hover:border-[#D4AF37]/50 rounded-3xl p-6 sm:p-7 relative overflow-hidden transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-black font-mono text-xs border ${
                      idx === 0
                        ? "bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]"
                        : idx === 1
                        ? "bg-white/10 border-white/30 text-white"
                        : "bg-[#8C7335]/20 border-[#8C7335] text-[#D4AF37]"
                    }`}
                  >
                    #{victim.rank}
                  </span>
                  <span className="text-[11px] uppercase font-semibold tracking-wider text-gray-400">
                    {victim.country}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-white mb-1 tracking-tight">{victim.team}</h3>
                <p className="text-xs text-gray-400 mb-6 font-light">{victim.notableMatch}</p>
              </div>

              <div>
                <div className="grid grid-cols-3 gap-2 py-3.5 border-y border-white/[0.08] text-center my-4">
                  <div>
                    <div className="text-3xl font-black font-mono text-white">
                      {victim.goals}
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-gray-400">
                      {t.opponents.goalsScored}
                    </span>
                  </div>
                  <div className="border-x border-white/[0.08]">
                    <div className="text-3xl font-black font-mono text-gray-300">
                      {victim.matches}
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-gray-400">
                      {t.opponents.matchesPlayed}
                    </span>
                  </div>
                  <div>
                    <div className="text-3xl font-black font-mono text-[#D4AF37]">
                      {victim.hattricks}
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-gray-400">
                      {t.opponents.hattricksCount}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="text-gray-400 font-light">{t.opponents.efficiency}:</span>
                  <span className="font-mono font-bold text-[#D4AF37]">
                    {victim.ratio} {language === "vi" ? "bàn/trận" : "goals/match"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Table List for Top 4 - 10 */}
        <div className="bg-[#0F121A]/90 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center justify-between">
            <h4 className="text-xs sm:text-sm uppercase font-bold tracking-wider text-gray-300 flex items-center gap-2">
              <Target className="w-4 h-4 text-[#D4AF37]" />{" "}
              {language === "vi" ? "Các đối thủ bị chọc thủng lưới nhiều nhất (Hạng 4 – 10)" : "Most Punished Opponents (Ranks 4 – 10)"}
            </h4>
            <span className="text-xs text-gray-500 hidden sm:inline">
              {language === "vi" ? "Nguồn đối soát: Transfermarkt & IFFHS" : "Source: Transfermarkt & IFFHS"}
            </span>
          </div>

          <div className="divide-y divide-white/[0.06]">
            {cr7TopOpponents.slice(3).map((item) => (
              <div
                key={item.team}
                className="p-4 sm:p-5 hover:bg-white/[0.02] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono font-bold text-gray-400 text-sm w-6">
                    #{item.rank}
                  </span>
                  <div>
                    <h5 className="font-bold text-white text-sm sm:text-base">{item.team}</h5>
                    <span className="text-xs text-gray-400 font-light">{item.notableMatch}</span>
                  </div>
                </div>

                <div className="flex items-center gap-6 justify-between sm:justify-end text-xs">
                  <div className="text-center sm:text-right">
                    <span className="font-mono font-black text-white text-base block">{item.goals}</span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                      {language === "vi" ? "bàn" : "goals"}
                    </span>
                  </div>
                  <div className="text-center sm:text-right">
                    <span className="font-mono font-bold text-gray-300 text-base block">{item.matches}</span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                      {language === "vi" ? "trận" : "matches"}
                    </span>
                  </div>
                  <div className="text-center sm:text-right">
                    <span className="font-mono font-bold text-[#D4AF37] text-base block">{item.ratio}</span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                      {language === "vi" ? "bàn/trận" : "goals/game"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
