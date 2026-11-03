"use client";

import React, { useState } from "react";
import { cr7HattrickMatches, cr7HattrickStats, HattrickMatch } from "@/data/cr7-hattricks";
import { useLanguage } from "@/context/LanguageContext";
import { Flame, Calendar, MapPin, Trophy, Shield, Sparkles, Filter, CheckCircle2 } from "lucide-react";

export default function HattrickShowcase() {
  const { language, t } = useLanguage();
  const [filter, setFilter] = useState<"all" | "manita" | "poker" | "iconic">("all");
  const [selectedMatch, setSelectedMatch] = useState<HattrickMatch | null>(null);

  const filteredMatches = cr7HattrickMatches.filter((match) => {
    if (filter === "manita") return match.type === "manita";
    if (filter === "poker") return match.type === "poker";
    if (filter === "iconic") return match.isIconic === true;
    return true;
  });

  return (
    <section id="hattricks" className="py-28 sm:py-36 bg-[#08090C] relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#121520] border border-[#D4AF37]/25 text-[#D4AF37] text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">
            {t.hattricks.chapterBadge}
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-tight">
            {t.hattricks.title} <span className="gold-gradient-text">{t.hattricks.titleGold}</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-400 font-light leading-relaxed">
            {t.hattricks.subtitle}
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto mb-14">
          <div className="bg-[#0F121A]/80 border border-white/10 rounded-2xl p-5 text-center">
            <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
              {language === "vi" ? "Tổng Hat-trick" : "Total Hat-tricks"}
            </span>
            <div className="text-3xl sm:text-4xl font-black font-mono gold-gradient-text mt-1.5">
              66
            </div>
            <span className="text-[11px] text-gray-400 mt-1 block">
              {language === "vi" ? "53 lần ghi 3 bàn" : "53 x 3 Goals"}
            </span>
          </div>

          <div className="bg-[#0F121A]/80 border border-white/10 rounded-2xl p-5 text-center">
            <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
              {language === "vi" ? "Poker (4 Bàn)" : "Poker (4 Goals)"}
            </span>
            <div className="text-3xl sm:text-4xl font-black font-mono text-white mt-1.5">
              11
            </div>
            <span className="text-[11px] text-gray-400 mt-1 block">
              {language === "vi" ? "Lần ghi 4 bàn/trận" : "4 Goals / Match"}
            </span>
          </div>

          <div className="bg-[#0F121A]/80 border border-white/10 rounded-2xl p-5 text-center">
            <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
              {language === "vi" ? "Manita (5 Bàn)" : "Manita (5 Goals)"}
            </span>
            <div className="text-3xl sm:text-4xl font-black font-mono text-[#D4AF37] mt-1.5">
              2
            </div>
            <span className="text-[11px] text-gray-400 mt-1 block">
              vs Granada & Espanyol
            </span>
          </div>

          <div className="bg-[#0F121A]/80 border border-white/10 rounded-2xl p-5 text-center">
            <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
              {language === "vi" ? "Hat-trick ĐTQG" : "Country Hat-tricks"}
            </span>
            <div className="text-3xl sm:text-4xl font-black font-mono text-white mt-1.5">
              10
            </div>
            <span className="text-[11px] text-gray-400 mt-1 block">
              {language === "vi" ? "Kỷ lục thế giới FIFA" : "FIFA World Record"}
            </span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 mb-12 overflow-x-auto pb-2">
          {[
            { id: "all", label: t.hattricks.filterAll },
            { id: "manita", label: t.hattricks.filter5 },
            { id: "poker", label: t.hattricks.filter4 },
            { id: "iconic", label: language === "vi" ? "Kinh Điển C1 & World Cup" : "UCL & World Cup Classics" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                filter === item.id
                  ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20"
                  : "bg-[#11131C] text-gray-400 border-white/10 hover:text-white hover:border-white/20"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Match Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMatches.map((match) => (
            <div
              key={match.id}
              className="bg-[#0F121A]/90 border border-white/10 hover:border-[#D4AF37]/50 rounded-2xl p-6 transition-all duration-300 shadow-xl flex flex-col justify-between group"
            >
              <div>
                {/* Match Badges Header */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      match.type === "manita"
                        ? "bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/40"
                        : match.type === "poker"
                        ? "bg-white/10 text-white border-white/20"
                        : "bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/25"
                    }`}
                  >
                    {match.type === "manita" && (language === "vi" ? "5 BÀN (MANITA)" : "5 GOALS (MANITA)")}
                    {match.type === "poker" && (language === "vi" ? "4 BÀN (POKER)" : "4 GOALS (POKER)")}
                    {match.type === "hattrick" && (language === "vi" ? "HAT-TRICK (3 BÀN)" : "HAT-TRICK (3 GOALS)")}
                  </span>
                  <span className="text-xs font-mono text-gray-400">{match.date}</span>
                </div>

                {/* Score & Teams */}
                <div className="bg-[#090A0F] rounded-xl p-4 border border-white/5 mb-4 text-center">
                  <div className="text-xs text-[#D4AF37] font-semibold mb-2">
                    {match.competition}
                  </div>
                  <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2.5 text-white">
                    <span className="text-right font-extrabold text-xs sm:text-sm leading-snug break-words">
                      {match.homeTeam}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#151924] text-[#D4AF37] font-mono text-base sm:text-lg font-black shrink-0 border border-white/10 shadow-inner">
                      {match.score}
                    </span>
                    <span className="text-left font-extrabold text-xs sm:text-sm leading-snug break-words">
                      {match.awayTeam}
                    </span>
                  </div>
                  <div className="text-[11px] text-gray-400 mt-2.5 flex items-center justify-center gap-1">
                    <MapPin className="w-3 h-3 text-gray-500" />
                    <span>{match.stadium}</span>
                  </div>
                </div>

                {/* Goals Timeline in this Match */}
                <div className="space-y-1.5 mb-4">
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-gray-400 block mb-1">
                    {t.hattricks.cardGoals}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {match.goals.map((g, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#151924] border border-white/10 text-xs text-gray-300"
                        title={g.assistBy ? `${language === "vi" ? "Kiến tạo" : "Assist"}: ${g.assistBy}` : `${language === "vi" ? "Bàn thắng" : "Goal"} (${g.type})`}
                      >
                        <Flame className="w-3 h-3 text-[#D4AF37]" />
                        <span className="font-mono font-bold text-white">{g.minute}&apos;</span>
                        {g.type === "penalty" && <span className="text-[9px] text-gray-400 font-medium">(P)</span>}
                        {g.type === "free-kick" && <span className="text-[9px] text-[#D4AF37] font-medium">(FK)</span>}
                        {g.type === "header" && <span className="text-[9px] text-gray-400 font-medium">({language === "vi" ? "Đầu" : "Head"})</span>}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Match Context Story */}
                <p className="text-xs text-gray-300 leading-relaxed italic font-normal min-h-[3.6rem]">
                  &ldquo;{match.description}&rdquo;
                </p>
              </div>

              {/* Card Footer Button */}
              <div className="mt-5 pt-3.5 border-t border-white/[0.08] flex items-center justify-between text-xs">
                <span className="text-gray-400">
                  {language === "vi" ? "CLB:" : "Team:"} <strong className="text-white font-medium">{match.cr7Team}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedMatch(match)}
                  className="text-[#D4AF37] hover:text-white font-semibold transition-colors cursor-pointer"
                >
                  {t.hattricks.viewDetails}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedMatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#12141D] border border-[#D4AF37]/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setSelectedMatch(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 rounded-full bg-gray-800 cursor-pointer"
            >
              ✕
            </button>

            <div className="text-xs uppercase font-bold text-[#D4AF37] mb-2 tracking-wider">
              {selectedMatch.competition} • {language === "vi" ? "Mùa giải" : "Season"} {selectedMatch.season}
            </div>

            <h3 className="text-2xl font-black text-white mb-2">
              {selectedMatch.homeTeam} {selectedMatch.score} {selectedMatch.awayTeam}
            </h3>

            <p className="text-xs text-gray-400 flex items-center gap-1 mb-6">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              {selectedMatch.stadium} ({selectedMatch.city}) • {selectedMatch.date}
            </p>

            <div className="bg-[#0A0C10] p-4 rounded-2xl border border-gray-800 mb-6 space-y-3">
              <h4 className="text-xs uppercase font-bold tracking-wider text-gray-300">
                {language === "vi" ? "Nhật ký bàn thắng & kiến tạo:" : "Goal & Assist Log:"}
              </h4>
              <ul className="space-y-2 text-sm">
                {selectedMatch.goals.map((g, i) => (
                  <li key={i} className="flex items-center justify-between text-gray-300 border-b border-gray-900 pb-1.5 last:border-0">
                    <span className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-[#D4AF37]" />
                      <strong>{language === "vi" ? `Phút ${g.minute}'` : `Min ${g.minute}'`}</strong>:{" "}
                      {g.type === "penalty"
                        ? (language === "vi" ? "Phạt đền (11m)" : "Penalty kick")
                        : g.type === "free-kick"
                        ? (language === "vi" ? "Đá phạt trực tiếp" : "Direct free-kick")
                        : g.type === "header"
                        ? (language === "vi" ? "Đánh đầu" : "Header")
                        : (language === "vi" ? "Dứt điểm bóng sống" : "Open play goal")}
                    </span>
                    {g.assistBy && (
                      <span className="text-xs text-gray-400 font-light">
                        {language === "vi" ? "KT:" : "Assist:"} {g.assistBy}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed mb-6 italic">
              {selectedMatch.description}
            </p>

            <button
              type="button"
              onClick={() => setSelectedMatch(null)}
              className="w-full py-3 rounded-xl bg-[#D4AF37] text-black font-bold text-sm hover:opacity-90 transition-all cursor-pointer"
            >
              {language === "vi" ? "Đóng lại" : "Close"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
