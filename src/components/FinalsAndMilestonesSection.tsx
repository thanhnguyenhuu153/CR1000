"use client";

import React, { useState } from "react";
import { cr7FinalsAndIconicGoals, IconicGoal } from "@/data/cr7-finals-and-iconic";
import { cr7Milestones, CareerMilestoneGoal } from "@/data/cr7-milestones";
import { Trophy, Sparkles, Flame, Calendar, MapPin, Tag, Search, ExternalLink, ShieldCheck } from "lucide-react";

export default function FinalsAndMilestonesSection() {
  const [subTab, setSubTab] = useState<"finals" | "milestones">("finals");
  const [filterQuery, setFilterQuery] = useState("");

  const filteredFinals = cr7FinalsAndIconicGoals.filter((item) => {
    const q = filterQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.opponent.toLowerCase().includes(q) ||
      item.competition.toLowerCase().includes(q) ||
      item.team.toLowerCase().includes(q)
    );
  });

  const filteredMilestones = cr7Milestones.filter((m) => {
    const q = filterQuery.toLowerCase();
    return (
      m.goalNumber.toString().includes(q) ||
      m.opponent.toLowerCase().includes(q) ||
      m.team.toLowerCase().includes(q) ||
      m.competition.toLowerCase().includes(q)
    );
  });

  return (
    <section id="archive" className="py-28 sm:py-36 bg-[#08090C] relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#121520] border border-[#D4AF37]/25 text-[#D4AF37] text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">
            Chương 7 • Thư viện tra cứu & Khoảnh khắc bất tử
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-tight">
            Bàn Thắng Chung Kết & <span className="gold-gradient-text">Mốc Son Lịch Sử</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-400 font-light leading-relaxed">
            Nơi lưu giữ những pha lập công định đoạt ngai vàng cúp C1, các siêu phẩm làm rung chuyển cầu trường thế giới và hành trình từng bước chạm mốc 1000 bàn thắng.
          </p>
        </div>

        {/* Sub-tab Switcher & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setSubTab("finals")}
              className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all border flex items-center justify-center gap-2 ${
                subTab === "finals"
                  ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20"
                  : "bg-[#141720] text-gray-300 border-gray-800 hover:border-gray-700"
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Chung Kết Đoạt Cúp & Siêu Phẩm</span>
            </button>
            <button
              onClick={() => setSubTab("milestones")}
              className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all border flex items-center justify-center gap-2 ${
                subTab === "milestones"
                  ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20"
                  : "bg-[#141720] text-gray-300 border-gray-800 hover:border-gray-700"
              }`}
            >
              <Flame className="w-4 h-4" />
              <span>Cột Mốc Vàng (50 • 100 • 900 • 1000)</span>
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Tìm kiếm đối thủ, giải đấu, bàn thắng..."
              className="w-full bg-[#141720] border border-gray-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>

        {/* TAB 1: FINALS & ICONIC GOALS */}
        {subTab === "finals" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredFinals.map((goal) => (
              <div
                key={goal.id}
                className="bg-gradient-to-b from-[#141724] to-[#0D0F17] border border-gray-800 hover:border-[#D4AF37]/50 rounded-3xl overflow-hidden transition-all duration-300 shadow-2xl flex flex-col justify-between group"
              >
                {/* Optional Real Photo Header */}
                {goal.matchImageUrl && (
                  <div className="relative h-48 w-full bg-[#0E1017] overflow-hidden border-b border-gray-800">
                    <img
                      src={goal.matchImageUrl}
                      alt={goal.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105 filter brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141724] via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-4 text-xs font-semibold text-gray-200 bg-black/60 px-3 py-1 rounded-lg backdrop-blur-md">
                      📸 Khoảnh khắc lịch sử
                    </span>
                  </div>
                )}

                <div className="p-6 sm:p-7">
                  {/* Top Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        goal.category === "final"
                          ? "bg-[#D4AF37]/15 text-[#D4AF37] border-[#D4AF37]/35"
                          : "bg-white/10 text-white border-white/20"
                      }`}
                    >
                      {goal.category === "final" ? "CHUNG KẾT ĐOẠT CÚP" : "SIÊU PHẨM BẤT TỬ"}
                    </span>
                    <span className="text-xs font-mono text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {goal.date}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white mb-2 group-hover:text-[#D4AF37] transition-colors tracking-tight">
                    {goal.title}
                  </h3>

                  {/* Match Information Box */}
                  <div className="bg-[#090A0F] rounded-2xl p-4 border border-white/5 mb-4">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#D4AF37] mb-1">
                      <span>{goal.competition}</span>
                      <span className="font-mono text-white">Phút {goal.minute}&apos;</span>
                    </div>
                    <div className="text-sm font-bold text-white">
                      {goal.match}
                    </div>
                    <div className="text-xs text-gray-400 mt-1 flex items-center gap-1 font-light">
                      <MapPin className="w-3.5 h-3.5 text-gray-500" />
                      <span>{goal.stadium}</span>
                    </div>
                    {goal.trophyOrAward && (
                      <div className="mt-2.5 pt-2 border-t border-white/[0.08] flex items-center gap-2 text-xs font-semibold text-[#D4AF37]">
                        <Trophy className="w-3.5 h-3.5" />
                        <span>Danh hiệu: {goal.trophyOrAward}</span>
                      </div>
                    )}
                  </div>

                  {/* Narrative & Impact */}
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-3">
                    {goal.description}
                  </p>
                  <p className="text-xs text-[#D4AF37] italic font-medium mb-4">
                    Ý nghĩa: {goal.impact}
                  </p>

                  {/* Contextual Gear Tag (Monetization & Immersion) */}
                  {goal.gearTag && (
                    <div className="mt-4 pt-4 border-t border-gray-800/80 flex items-center justify-between bg-[#11131C] p-3 rounded-xl border border-gray-700/60">
                      <div className="flex items-center gap-2 text-xs">
                        <Tag className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        <div>
                          <span className="text-gray-400 text-[10px] block">Vũ khí thi đấu trong trận:</span>
                          <strong className="text-white text-xs">{goal.gearTag.bootName}</strong>
                        </div>
                      </div>
                      <a
                        href={`https://shopee.vn/search?keyword=${encodeURIComponent(goal.gearTag.affiliateKeyword)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-[#222736] hover:bg-[#D4AF37] text-gray-200 hover:text-black text-xs font-bold transition-all flex items-center gap-1 shrink-0"
                      >
                        <span>Khám phá</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: MILESTONES (1, 50, 100, 200 ... 1000) */}
        {subTab === "milestones" && (
          <div className="space-y-4">
            {filteredMilestones.map((m) => (
              <div
                key={m.goalNumber}
                className={`rounded-2xl p-5 sm:p-6 border transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                  m.isUpcoming
                    ? "bg-[#16130A] border-[#D4AF37]/50 gold-border-glow"
                    : m.isSpecialFinal
                    ? "bg-[#0F121A]/95 border-[#D4AF37]/30"
                    : "bg-[#0F121A]/80 border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-4 sm:gap-6">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center font-black font-mono text-xl sm:text-2xl shrink-0 border ${
                      m.isUpcoming
                        ? "bg-[#D4AF37] text-black border-[#FFF7D6]"
                        : "bg-[#161A26] text-white border-white/10"
                    }`}
                  >
                    #{m.goalNumber}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-gray-400">{m.date}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#161A26] text-[#D4AF37] font-semibold border border-white/10">
                        {m.competition}
                      </span>
                      {m.isUpcoming && (
                        <span className="text-[10px] px-2.5 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37] font-bold border border-[#D4AF37]/40">
                          SẮP RA ĐỜI
                        </span>
                      )}
                    </div>
                    <h4 className="text-lg font-black text-white mt-1">{m.match}</h4>
                    <p className="text-xs text-gray-300 mt-1 max-w-2xl leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 text-right self-end md:self-center">
                  <div>
                    <span className="text-xs font-bold text-gray-300 block">{m.team}</span>
                    <span className="text-[11px] text-[#D4AF37] font-mono">
                      {m.minute > 0 ? `Phút ${m.minute}' • ${m.method}` : "Chờ đón..."}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
