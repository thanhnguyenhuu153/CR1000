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
    <section id="anatomy" className="py-20 bg-[#08090C] relative border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181B24] border border-gray-800 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3">
            Chương 2 • Bóc tách cỗ máy ghi bàn
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Giải mã cỗ máy sát thủ <span className="gold-gradient-text">Hoàn Hảo</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-400">
            Từ mọi góc độ cơ thể, mọi phương thức dứt điểm và trên mọi mặt sân. CR7 biến việc ghi bàn trở thành một môn khoa học chính xác tuyệt đối.
          </p>
        </div>

        {/* 4 Master Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-14">
          {/* Total Goals */}
          <div className="bg-[#11131A] border border-gray-800 hover:border-[#D4AF37]/50 rounded-2xl p-5 sm:p-6 transition-all shadow-xl group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase font-bold tracking-wider text-gray-400">
                Tổng bàn thắng
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform">
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
          <div className="bg-[#11131A] border border-gray-800 hover:border-gray-700 rounded-2xl p-5 sm:p-6 transition-all shadow-xl group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase font-bold tracking-wider text-gray-400">
                Số trận thi đấu
              </span>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
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
          <div className="bg-[#11131A] border border-gray-800 hover:border-emerald-500/50 rounded-2xl p-5 sm:p-6 transition-all shadow-xl group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase font-bold tracking-wider text-gray-400">
                Hiệu suất nổ súng
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono text-white tracking-tight">
              {cr7CareerSummary.minutesPerGoal}
              <span className="text-sm font-sans font-normal text-gray-400 ml-1">phút/bàn</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Cứ mỗi ~112 phút lại có 1 bàn thắng ra đời
            </p>
          </div>

          {/* Assists */}
          <div className="bg-[#11131A] border border-gray-800 hover:border-purple-500/50 rounded-2xl p-5 sm:p-6 transition-all shadow-xl group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase font-bold tracking-wider text-gray-400">
                Tổng kiến tạo
              </span>
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono text-white tracking-tight">
              {cr7CareerSummary.totalAssists}
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Đóng góp tổng cộng 1.240+ bàn thắng và kiến tạo
            </p>
          </div>
        </div>

        {/* Tab Controls for Breakdown */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[
            { id: "team", label: "Theo Đội Bóng & ĐTQG" },
            { id: "body", label: "Theo Bộ Phận Cơ Thể" },
            { id: "method", label: "Theo Phương Thức Dứt Điểm" },
            { id: "venue", label: "Theo Địa Điểm Sân Đấu" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all border ${
                activeTab === tab.id
                  ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20"
                  : "bg-[#141720] text-gray-300 border-gray-800 hover:border-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: By Team */}
        {activeTab === "team" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {cr7CareerSummary.teamBreakdown.map((t) => (
              <div
                key={t.team}
                className="bg-[#11131B] border border-gray-800 rounded-2xl p-5 hover:border-[#D4AF37]/40 transition-all shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">{t.team}</h3>
                    <span className="text-xs font-mono text-gray-400">{t.period}</span>
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-[#181B24] border border-gray-700 text-xs font-mono font-bold text-[#F3C623]">
                    {t.ratio} bàn/trận
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 py-3 border-y border-gray-800 text-center">
                  <div>
                    <span className="block text-2xl font-black font-mono text-white">
                      {t.goals}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-gray-400">
                      Bàn thắng
                    </span>
                  </div>
                  <div className="border-x border-gray-800">
                    <span className="block text-2xl font-black font-mono text-gray-300">
                      {t.matches}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-gray-400">
                      Trận đấu
                    </span>
                  </div>
                  <div>
                    <span className="block text-2xl font-black font-mono text-purple-400">
                      {t.assists}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-gray-400">
                      Kiến tạo
                    </span>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="w-full bg-[#08090C] h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F59E0B]"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {cr7CareerSummary.bodyPartBreakdown.map((part) => (
              <div
                key={part.type}
                className="bg-[#11131B] border border-gray-800 rounded-2xl p-6 hover:border-[#D4AF37]/40 transition-all shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#1A1D27] flex items-center justify-center text-[#F3C623] mb-4">
                    {part.icon === "Footprints" && <Footprints className="w-6 h-6" />}
                    {part.icon === "Zap" && <Zap className="w-6 h-6" />}
                    {part.icon === "ArrowUpCircle" && <ArrowUpCircle className="w-6 h-6" />}
                    {part.icon === "Sparkles" && <Sparkles className="w-6 h-6" />}
                  </div>
                  <h3 className="text-base font-bold text-white">{part.type}</h3>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                    {part.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-800 flex items-baseline justify-between">
                  <span className="text-3xl font-black font-mono text-white">
                    {part.goals} <span className="text-sm font-sans text-gray-400 font-normal">bàn</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-[#F3C623] px-2 py-0.5 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/30">
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
                className="bg-[#11131B] border border-gray-800 rounded-2xl p-6 hover:border-[#D4AF37]/40 transition-all shadow-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold text-white">{method.type}</h3>
                  <span className="text-xs font-mono font-bold text-[#F3C623]">
                    {method.percentage}%
                  </span>
                </div>
                <div className="text-4xl font-black font-mono text-white mb-3">
                  {method.goals} <span className="text-sm font-sans text-gray-400 font-normal">bàn</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed mb-4">
                  {method.description}
                </p>
                <div className="w-full bg-[#08090C] h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F59E0B]"
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
                className="bg-[#11131B] border border-gray-800 rounded-2xl p-6 hover:border-[#D4AF37]/40 transition-all shadow-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#F3C623]" />
                    {venue.type}
                  </h3>
                  <span className="text-xs font-mono font-bold text-[#F3C623]">
                    {venue.percentage}%
                  </span>
                </div>
                <div className="text-4xl font-black font-mono text-white mb-3">
                  {venue.goals} <span className="text-sm font-sans text-gray-400 font-normal">bàn</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed mb-4">
                  {venue.description}
                </p>
                <div className="w-full bg-[#08090C] h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 to-[#D4AF37]"
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
