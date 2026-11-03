"use client";

import React, { useState } from "react";
import { cr7CareerSummary } from "@/data/cr7-stats";
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
  const [activeTab, setActiveTab] = useState<"team" | "body" | "method" | "venue">("team");

  return (
    <section id="anatomy" className="py-28 sm:py-36 bg-[#08090C] relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#121520] border border-[#D4AF37]/25 text-[#D4AF37] text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">
            Chương 2 • Bóc tách cỗ máy săn bàn
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-tight">
            Giải mã cỗ máy dứt điểm <span className="gold-gradient-text">Toàn Diện</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-400 leading-relaxed font-light">
            Từ mọi góc độ cơ thể, mọi phương thức dứt điểm và trên mọi mặt sân. Ronaldo biến việc ghi bàn trở thành một chuẩn mực khoa học chính xác và bền bỉ.
          </p>
        </div>

        {/* 4 Master Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {/* Total Goals */}
          <div className="bg-[#0F121A]/80 border border-white/10 hover:border-[#D4AF37]/50 rounded-2xl p-5 sm:p-6 transition-all shadow-xl group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase font-semibold tracking-wider text-gray-400">
                Tổng bàn thắng
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:scale-105 transition-transform">
                <Target className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono text-white tracking-tight">
              {currentGoals}
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Kỷ lục mọi thời đại trong lịch sử bóng đá FIFA
            </p>
          </div>

          {/* Total Matches */}
          <div className="bg-[#0F121A]/80 border border-white/10 hover:border-[#D4AF37]/50 rounded-2xl p-5 sm:p-6 transition-all shadow-xl group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase font-semibold tracking-wider text-gray-400">
                Số trận thi đấu
              </span>
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-300 group-hover:scale-105 transition-transform">
                <Shield className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono text-white tracking-tight">
              {cr7CareerSummary.totalMatches.toLocaleString()}
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Trận đấu chính thức cấp CLB và ĐTQG
            </p>
          </div>

          {/* Minutes per Goal */}
          <div className="bg-[#0F121A]/80 border border-white/10 hover:border-[#D4AF37]/50 rounded-2xl p-5 sm:p-6 transition-all shadow-xl group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase font-semibold tracking-wider text-gray-400">
                Hiệu suất nổ súng
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:scale-105 transition-transform">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono text-white tracking-tight">
              {cr7CareerSummary.minutesPerGoal}
              <span className="text-sm font-sans font-normal text-gray-400 ml-1.5">phút/bàn</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Trung bình ~112 phút lại có 1 bàn thắng ra đời
            </p>
          </div>

          {/* Assists */}
          <div className="bg-[#0F121A]/80 border border-white/10 hover:border-[#D4AF37]/50 rounded-2xl p-5 sm:p-6 transition-all shadow-xl group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase font-semibold tracking-wider text-gray-400">
                Tổng kiến tạo
              </span>
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-300 group-hover:scale-105 transition-transform">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono text-white tracking-tight">
              {cr7CareerSummary.totalAssists}
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Đóng góp trực tiếp vào 1.240+ bàn thắng
            </p>
          </div>
        </div>

        {/* Tab Controls for Breakdown */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: "team", label: "Theo CLB & ĐTQG" },
            { id: "body", label: "Theo Bộ Phận Cơ Thể" },
            { id: "method", label: "Theo Tình Huống Ghi Bàn" },
            { id: "venue", label: "Theo Địa Điểm Sân Đấu" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
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
            {cr7CareerSummary.teamBreakdown.map((t) => (
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
                      {t.ratio} bàn/trận
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 py-4 border-y border-white/[0.08] text-center my-4">
                    <div>
                      <span className="block text-2xl font-black font-mono text-white">
                        {t.goals}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-gray-400">
                        Bàn thắng
                      </span>
                    </div>
                    <div className="border-x border-white/[0.08]">
                      <span className="block text-2xl font-black font-mono text-gray-300">
                        {t.matches}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-gray-400">
                        Trận đấu
                      </span>
                    </div>
                    <div>
                      <span className="block text-2xl font-black font-mono text-[#D4AF37]">
                        {t.assists}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-gray-400">
                        Kiến tạo
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
            {cr7CareerSummary.bodyPartBreakdown.map((part) => (
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
                    {part.goals} <span className="text-xs font-sans text-gray-400 font-normal">bàn</span>
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
            {cr7CareerSummary.methodBreakdown.map((method) => (
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
                    {method.goals} <span className="text-xs font-sans text-gray-400 font-normal">bàn</span>
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
            {cr7CareerSummary.venueBreakdown.map((venue) => (
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
                    {venue.goals} <span className="text-xs font-sans text-gray-400 font-normal">bàn</span>
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
