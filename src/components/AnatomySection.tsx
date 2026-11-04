"use client";

import React, { useState } from "react";
import { getCr7CareerSummary } from "@/data/cr7-stats";
import { useLanguage } from "@/context/LanguageContext";
import {
  Target,
  Clock,
  Share2,
  Footprints,
  Zap,
  ArrowUpCircle,
  Sparkles,
  Shield,
  MapPin,
  TrendingUp,
} from "lucide-react";

export default function AnatomySection({ currentGoals }: { currentGoals: number }) {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"team" | "body" | "method" | "venue">("team");
  const stats = getCr7CareerSummary(language);

  return (
    <section id="anatomy" className="py-28 sm:py-36 bg-[#08090C] relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#121520] border border-[#D4AF37]/25 text-[#D4AF37] text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">
            {t.anatomy.chapterBadge}
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-tight">
            {t.anatomy.title} <span className="gold-gradient-text">{t.anatomy.titleGold}</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-400 leading-relaxed font-light">
            {t.anatomy.subtitle}
          </p>
        </div>

        {/* 4 Master Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {/* Total Goals */}
          <div className="bg-[#0F121A]/80 border border-white/10 hover:border-[#D4AF37]/50 rounded-2xl p-5 sm:p-6 transition-all shadow-xl group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase font-semibold tracking-wider text-gray-400">
                {t.anatomy.masterGoals}
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:scale-105 transition-transform">
                <Target className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono text-white tracking-tight">
              {currentGoals}
            </div>
            <p className="text-xs text-gray-400 mt-2">
              {language === "vi" ? "Kỷ lục mọi thời đại trong lịch sử bóng đá FIFA" : "All-time world record in official FIFA football"}
            </p>
          </div>

          {/* Total Matches */}
          <div className="bg-[#0F121A]/80 border border-white/10 hover:border-[#D4AF37]/50 rounded-2xl p-5 sm:p-6 transition-all shadow-xl group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase font-semibold tracking-wider text-gray-400">
                {t.anatomy.masterMatches}
              </span>
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-300 group-hover:scale-105 transition-transform">
                <Shield className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono text-white tracking-tight">
              {stats.totalMatches.toLocaleString()}
            </div>
            <p className="text-xs text-gray-400 mt-2">
              {language === "vi" ? "Trận đấu chính thức cấp CLB và ĐTQG" : "Official appearances across Club & Country"}
            </p>
          </div>

          {/* Minutes per Goal */}
          <div className="bg-[#0F121A]/80 border border-white/10 hover:border-[#D4AF37]/50 rounded-2xl p-5 sm:p-6 transition-all shadow-xl group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase font-semibold tracking-wider text-gray-400">
                {t.anatomy.masterRate}
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:scale-105 transition-transform">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono text-white tracking-tight">
              {stats.minutesPerGoal}
              <span className="text-sm font-sans font-normal text-gray-400 ml-1.5">{t.anatomy.masterRateUnit}</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              {t.anatomy.minutesSummary}
            </p>
          </div>

          {/* Assists */}
          <div className="bg-[#0F121A]/80 border border-white/10 hover:border-[#D4AF37]/50 rounded-2xl p-5 sm:p-6 transition-all shadow-xl group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase font-semibold tracking-wider text-gray-400">
                {t.anatomy.masterAssists}
              </span>
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-300 group-hover:scale-105 transition-transform">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono text-white tracking-tight">
              {stats.totalAssists}
            </div>
            <p className="text-xs text-gray-400 mt-2">
              {language === "vi" ? "Đóng góp trực tiếp vào 1.240+ bàn thắng" : "Directly involved in 1,240+ goals"}
            </p>
          </div>
        </div>

        {/* Tab Controls for Breakdown */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: "team", label: t.anatomy.tabTeam },
            { id: "body", label: t.anatomy.tabBody },
            { id: "method", label: t.anatomy.tabMethod },
            { id: "venue", label: t.anatomy.tabVenue },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20"
                  : "bg-[#11131C] text-gray-400 border-white/10 hover:text-white hover:border-white/20"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: By Team */}
        {activeTab === "team" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.teamBreakdown.map((t) => (
              <div
                key={t.team}
                className="bg-[#0F121A]/90 border border-white/10 rounded-2xl p-6 hover:border-[#D4AF37]/40 transition-all shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-base font-bold text-white">{t.team}</h3>
                      <span className="text-xs font-mono text-gray-400">{t.period}</span>
                    </div>
                    <div className="px-2.5 py-1 rounded-full bg-[#181B26] border border-white/10 text-xs font-mono font-bold text-[#D4AF37]">
                      {t.ratio} {language === "vi" ? "bàn/trận" : "goals/match"}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 py-4 border-y border-white/[0.08] text-center my-4">
                    <div>
                      <span className="block text-2xl font-black font-mono text-white">
                        {t.goals}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-gray-400">
                        {language === "vi" ? "Bàn thắng" : "Goals"}
                      </span>
                    </div>
                    <div className="border-x border-white/[0.08]">
                      <span className="block text-2xl font-black font-mono text-gray-300">
                        {t.matches}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-gray-400">
                        {language === "vi" ? "Trận đấu" : "Matches"}
                      </span>
                    </div>
                    <div>
                      <span className="block text-2xl font-black font-mono text-[#D4AF37]">
                        {t.assists}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-gray-400">
                        {language === "vi" ? "Kiến tạo" : "Assists"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-2">
                  <div className="w-full bg-[#08090C] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#8C7335] to-[#D4AF37]"
                      style={{ width: `${(t.goals / 450) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: By Body Part */}
        {activeTab === "body" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.bodyPartBreakdown.map((part) => (
              <div
                key={part.type}
                className="bg-[#0F121A]/90 border border-white/10 rounded-2xl p-6 hover:border-[#D4AF37]/40 transition-all shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#161A26] border border-white/10 flex items-center justify-center text-[#D4AF37] mb-4">
                    {part.icon === "Footprints" && <Footprints className="w-5 h-5" />}
                    {part.icon === "Zap" && <Zap className="w-5 h-5" />}
                    {part.icon === "ArrowUpCircle" && <ArrowUpCircle className="w-5 h-5" />}
                    {part.icon === "Sparkles" && <Sparkles className="w-5 h-5" />}
                  </div>
                  <h3 className="text-base font-bold text-white">{part.type}</h3>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed font-light">
                    {part.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-baseline justify-between">
                  <span className="text-3xl font-black font-mono text-white">
                    {part.goals} <span className="text-xs font-sans text-gray-400 font-normal">{language === "vi" ? "bàn" : "goals"}</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-[#D4AF37] px-2 py-0.5 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/25">
                    {part.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: By Method */}
        {activeTab === "method" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.methodBreakdown.map((method) => (
              <div
                key={method.type}
                className="bg-[#0F121A]/90 border border-white/10 rounded-2xl p-6 hover:border-[#D4AF37]/40 transition-all shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base font-bold text-white">{method.type}</h3>
                    <span className="text-xs font-mono font-bold text-[#D4AF37]">
                      {method.percentage}%
                    </span>
                  </div>
                  <div className="text-4xl font-black font-mono text-white mb-3">
                    {method.goals} <span className="text-xs font-sans text-gray-400 font-normal">{language === "vi" ? "bàn" : "goals"}</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed mb-6 font-light">
                    {method.description}
                  </p>
                </div>
                <div className="w-full bg-[#08090C] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#8C7335] to-[#D4AF37]"
                    style={{ width: `${method.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: By Venue */}
        {activeTab === "venue" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.venueBreakdown.map((venue) => (
              <div
                key={venue.type}
                className="bg-[#0F121A]/90 border border-white/10 rounded-2xl p-6 hover:border-[#D4AF37]/40 transition-all shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#D4AF37]" />
                      {venue.type}
                    </h3>
                    <span className="text-xs font-mono font-bold text-[#D4AF37]">
                      {venue.percentage}%
                    </span>
                  </div>
                  <div className="text-4xl font-black font-mono text-white mb-3">
                    {venue.goals} <span className="text-xs font-sans text-gray-400 font-normal">{language === "vi" ? "bàn" : "goals"}</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed mb-6 font-light">
                    {venue.description}
                  </p>
                </div>
                <div className="w-full bg-[#08090C] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#8C7335] to-[#D4AF37]"
                    style={{ width: `${venue.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
