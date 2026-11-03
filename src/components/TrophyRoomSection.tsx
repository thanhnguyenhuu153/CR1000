"use client";

import React, { useState } from "react";
import { cr7Trophies, cr7TrophySummary } from "@/data/cr7-trophies";
import { cr7CareerSummary } from "@/data/cr7-stats";
import { useSiteData } from "@/context/SiteDataContext";
import { Trophy, Award, Crown, Globe, Shield, Star, Sparkles, CheckCircle2 } from "lucide-react";

export default function TrophyRoomSection() {
  const { images } = useSiteData();
  const [activeCategory, setActiveCategory] = useState<"club" | "international" | "individual" | "records">("club");

  const getTrophyImage = (id: string, defaultUrl?: string) => {
    if (id === "ucl") return images.trophyUcl;
    if (id === "ballon-dor") return images.trophyBallonDor;
    if (id === "euro-2016" || id === "nations-league") return images.trophyEuro;
    if (id === "premier-league") return images.trophyPremierLeague;
    return defaultUrl;
  };

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

        {/* Featured Real Photo Banner: CR7 with Ballon d'Or */}
        <div className="relative max-w-5xl mx-auto mb-14 rounded-3xl overflow-hidden border border-[#D4AF37]/30 bg-gradient-to-r from-[#171410] via-[#0E1017] to-[#14120D] p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 shadow-2xl">
          <div className="w-full md:w-5/12 h-64 sm:h-72 rounded-2xl overflow-hidden border border-gray-700 relative shrink-0">
            <img
              src={images.trophyBallonDor}
              alt="Cristiano Ronaldo nhận Quả bóng Vàng"
              className="w-full h-full object-cover object-center filter brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <span className="absolute bottom-3 left-3 text-[11px] font-semibold text-gray-200 bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-md">
              🏆 CR7 nâng cao Quả bóng Vàng thế giới
            </span>
          </div>

          <div className="flex-1 space-y-3 text-left">
            <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F3C623] text-xs font-bold uppercase tracking-wider">
              Bộ sưu tập bất tử
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Kỷ Lục 5 Quả Bóng Vàng & 5 Champions League
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Từ danh hiệu Quả bóng Vàng đầu tiên năm 2008 ở tuổi 23 dưới thời Sir Alex Ferguson, tới cú đúp bảo vệ thành công danh hiệu năm 2016 và 2017 cùng Real Madrid. Cristiano Ronaldo là cầu thủ châu Âu duy nhất trong lịch sử đạt tới cột mốc 5 Quả bóng Vàng.
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-[#12141D] border border-[#D4AF37]/30 rounded-2xl p-5 text-center">
            <span className="text-xs uppercase font-bold text-gray-400">Danh hiệu tập thể</span>
            <div className="text-4xl font-black font-mono gold-gradient-text mt-1">
              {cr7TrophySummary.totalTeamTrophies}
            </div>
            <span className="text-[11px] text-gray-400">33 cấp CLB + 3 ĐTQG</span>
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
            { id: "international", label: "Đội Tuyển Quốc Gia (3)" },
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

        {/* Trophies Grid Display with REAL TROPHY PHOTOS */}
        {activeCategory !== "records" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrophies.map((trophy) => (
              <div
                key={trophy.id}
                className="bg-gradient-to-b from-[#131520] to-[#0D0F16] border border-gray-800 hover:border-[#D4AF37]/50 rounded-2xl overflow-hidden transition-all duration-300 shadow-xl flex flex-col justify-between group"
              >
                {/* Trophy Real Image Header */}
                {getTrophyImage(trophy.id, trophy.trophyImageUrl) && (
                  <div className="relative h-44 w-full bg-[#08090C] overflow-hidden border-b border-gray-800">
                    <img
                      src={getTrophyImage(trophy.id, trophy.trophyImageUrl)}
                      alt={trophy.name}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 filter brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#131520] via-transparent to-transparent" />
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/70 border border-[#D4AF37]/40 text-[#F3C623] font-mono font-black text-sm backdrop-blur-md">
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
