"use client";

import React, { useState } from "react";
import { cr7Trophies, cr7TrophySummary } from "@/data/cr7-trophies";
import { cr7CareerSummary } from "@/data/cr7-stats";
import { Trophy, Award, Crown, Globe, Shield, Star, Sparkles, CheckCircle2 } from "lucide-react";

export default function TrophyRoomSection() {
  const [activeCategory, setActiveCategory] = useState<"club" | "international" | "individual" | "records">("club");

  const filteredTrophies = cr7Trophies.filter((t) => {
    if (activeCategory === "records") return false;
    return t.category === activeCategory;
  });

  return (
    <section id="trophies" className="py-20 bg-[#0B0C10] relative border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181B24] border border-gray-800 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3">
            Chương 5 • Phòng truyền thống & Kỷ lục
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Ngôi Đền Của Những <span className="gold-gradient-text">Chiếc Cúp Vàng</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-400">
            35 danh hiệu tập thể đỉnh cao, 5 Quả bóng Vàng danh giá và một kho tàng kỷ lục thế giới đã được ghi vào Sách Kỷ Lục Guinness vĩnh cửu.
          </p>
        </div>

        {/* Trophy Summary Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-[#12141D] border border-[#D4AF37]/30 rounded-2xl p-5 text-center">
            <span className="text-xs uppercase font-bold text-gray-400">Danh hiệu tập thể</span>
            <div className="text-4xl font-black font-mono gold-gradient-text mt-1">
              {cr7TrophySummary.totalTeamTrophies}
            </div>
            <span className="text-[11px] text-gray-400">33 cấp CLB + 2 ĐTQG</span>
          </div>

          <div className="bg-[#12141D] border border-gray-800 rounded-2xl p-5 text-center">
            <span className="text-xs uppercase font-bold text-gray-400">Cúp C1 Champions League</span>
            <div className="text-4xl font-black font-mono text-white mt-1">
              5
            </div>
            <span className="text-[11px] text-gray-400">1 Man Utd + 4 Real Madrid</span>
          </div>

          <div className="bg-[#12141D] border border-gray-800 rounded-2xl p-5 text-center">
            <span className="text-xs uppercase font-bold text-gray-400">Quả bóng Vàng (Ballon d&apos;Or)</span>
            <div className="text-4xl font-black font-mono text-[#F3C623] mt-1">
              5
            </div>
            <span className="text-[11px] text-gray-400">2008, 2013, 2014, 2016, 2017</span>
          </div>

          <div className="bg-[#12141D] border border-gray-800 rounded-2xl p-5 text-center">
            <span className="text-xs uppercase font-bold text-gray-400">Chiếc giày Vàng châu Âu</span>
            <div className="text-4xl font-black font-mono text-amber-400 mt-1">
              4
            </div>
            <span className="text-[11px] text-gray-400">Kỷ lục tại cả Premier League & La Liga</span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
          {[
            { id: "club", label: "Cúp Câu Lạc Bộ (33)" },
            { id: "international", label: "Đội Tuyển Quốc Gia (2)" },
            { id: "individual", label: "Danh Hiệu Cá Nhân (32+)" },
            { id: "records", label: "Kỷ Lục Thế Giới Guinness" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border ${
                activeCategory === cat.id
                  ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20"
                  : "bg-[#141720] text-gray-300 border-gray-800 hover:border-gray-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Trophies Grid Display */}
        {activeCategory !== "records" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrophies.map((trophy) => (
              <div
                key={trophy.id}
                className="bg-gradient-to-b from-[#131520] to-[#0D0F16] border border-gray-800 hover:border-[#D4AF37]/50 rounded-2xl p-6 transition-all duration-300 shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#1B1E2B] border border-gray-700 flex items-center justify-center text-[#F3C623] group-hover:scale-110 transition-transform">
                      {trophy.iconName === "Trophy" && <Trophy className="w-6 h-6" />}
                      {trophy.iconName === "Crown" && <Crown className="w-6 h-6" />}
                      {trophy.iconName === "Globe" && <Globe className="w-6 h-6" />}
                      {trophy.iconName === "Award" && <Award className="w-6 h-6" />}
                      {trophy.iconName === "Shield" && <Shield className="w-6 h-6" />}
                      {trophy.iconName === "Star" && <Star className="w-6 h-6" />}
                      {trophy.iconName === "Sparkles" && <Sparkles className="w-6 h-6" />}
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-black font-mono gold-gradient-text block">
                        x{trophy.count}
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">
                        {trophy.teamOrOrg}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{trophy.name}</h3>
                  <p className="text-xs text-gray-300 leading-relaxed mb-4">
                    {trophy.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-800/80">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-1.5">
                    Các năm nâng cúp:
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
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                      Xác nhận: {record.verifiedBy}
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
