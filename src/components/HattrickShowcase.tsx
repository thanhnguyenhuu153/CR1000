"use client";

import React, { useState } from "react";
import { cr7HattrickMatches, cr7HattrickStats, HattrickMatch } from "@/data/cr7-hattricks";
import { Flame, Calendar, MapPin, Trophy, Shield, Sparkles, Filter, CheckCircle2 } from "lucide-react";

export default function HattrickShowcase() {
  const [filter, setFilter] = useState<"all" | "manita" | "poker" | "iconic">("all");
  const [selectedMatch, setSelectedMatch] = useState<HattrickMatch | null>(null);

  const filteredMatches = cr7HattrickMatches.filter((match) => {
    if (filter === "manita") return match.type === "manita";
    if (filter === "poker") return match.type === "poker";
    if (filter === "iconic") return match.isIconic === true;
    return true;
  });

  return (
    <section id="hattricks" className="py-20 bg-[#0B0C10] relative border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181B24] border border-gray-800 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3">
            Chương 3 • Những đêm diễn điên rồ
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            66 Cú Hattrick & <span className="gold-gradient-text">Những Đêm Hủy Diệt</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-400">
            66 lần ghi từ 3 bàn trở lên trong một trận đấu chính thức (bao gồm 11 cú Poker 4 bàn và 2 cú Manita 5 bàn). Không một hàng thủ nào có thể ngủ yên.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
          <div className="bg-[#12141D] border border-gray-800 rounded-2xl p-4 text-center">
            <span className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">
              Tổng Hat-trick
            </span>
            <div className="text-3xl sm:text-4xl font-black font-mono gold-gradient-text mt-1">
              66
            </div>
            <span className="text-[11px] text-gray-400 mt-1 block">53 lần ghi 3 bàn</span>
          </div>

          <div className="bg-[#12141D] border border-gray-800 rounded-2xl p-4 text-center">
            <span className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">
              Cú Poker (4 Bàn)
            </span>
            <div className="text-3xl sm:text-4xl font-black font-mono text-purple-400 mt-1">
              11
            </div>
            <span className="text-[11px] text-gray-400 mt-1 block">Lần ghi 4 bàn/trận</span>
          </div>

          <div className="bg-[#12141D] border border-gray-800 rounded-2xl p-4 text-center">
            <span className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">
              Manita (5 Bàn)
            </span>
            <div className="text-3xl sm:text-4xl font-black font-mono text-[#E63946] mt-1">
              2
            </div>
            <span className="text-[11px] text-gray-400 mt-1 block">vs Granada & Espanyol</span>
          </div>

          <div className="bg-[#12141D] border border-gray-800 rounded-2xl p-4 text-center">
            <span className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">
              Hat-trick ĐTQG
            </span>
            <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-400 mt-1">
              10
            </div>
            <span className="text-[11px] text-gray-400 mt-1 block">Kỷ lục thế giới FIFA</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
          {[
            { id: "all", label: "Tất Cả Trận Tiêu Biểu" },
            { id: "manita", label: "Manita (5 Bàn)" },
            { id: "poker", label: "Poker (4 Bàn)" },
            { id: "iconic", label: "Kinh Điển C1 & World Cup" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border ${
                filter === item.id
                  ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20"
                  : "bg-[#141720] text-gray-300 border-gray-800 hover:border-gray-700"
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
              className="bg-gradient-to-b from-[#13151F] to-[#0D0F16] border border-gray-800 hover:border-[#D4AF37]/50 rounded-2xl p-6 transition-all duration-300 shadow-xl flex flex-col justify-between group"
            >
              <div>
                {/* Match Badges Header */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                      match.type === "manita"
                        ? "bg-red-500/20 text-red-400 border-red-500/30"
                        : match.type === "poker"
                        ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                        : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                    }`}
                  >
                    {match.type === "manita" && "5 BÀN (MANITA)"}
                    {match.type === "poker" && "4 BÀN (POKER)"}
                    {match.type === "hattrick" && "HAT-TRICK (3 BÀN)"}
                  </span>
                  <span className="text-xs font-mono text-gray-400">{match.date}</span>
                </div>

                {/* Score & Teams */}
                <div className="bg-[#090A0F] rounded-xl p-4 border border-gray-800/80 mb-4 text-center">
                  <div className="text-xs text-[#D4AF37] font-semibold mb-1">
                    {match.competition}
                  </div>
                  <div className="flex items-center justify-between font-black text-sm sm:text-base text-white">
                    <span className="truncate flex-1 text-right">{match.homeTeam}</span>
                    <span className="px-3 py-1 mx-2 rounded-lg bg-[#181B26] text-[#F3C623] font-mono text-lg shrink-0 border border-gray-700">
                      {match.score}
                    </span>
                    <span className="truncate flex-1 text-left">{match.awayTeam}</span>
                  </div>
                  <div className="text-[11px] text-gray-400 mt-2 flex items-center justify-center gap-1">
                    <MapPin className="w-3 h-3 text-gray-500" />
                    <span>{match.stadium}</span>
                  </div>
                </div>

                {/* Goals Timeline in this Match */}
                <div className="space-y-1.5 mb-4">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-1">
                    Chi tiết các bàn thắng của CR7:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {match.goals.map((g, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#1B1F2D] border border-gray-700 text-xs text-gray-200"
                        title={g.assistBy ? `Kiến tạo: ${g.assistBy}` : `Bàn thắng (${g.type})`}
                      >
                        <Flame className="w-3 h-3 text-[#F3C623]" />
                        <span className="font-mono font-bold">{g.minute}&apos;</span>
                        {g.type === "penalty" && <span className="text-[9px] text-red-400 font-bold">(P)</span>}
                        {g.type === "free-kick" && <span className="text-[9px] text-amber-400 font-bold">(FK)</span>}
                        {g.type === "header" && <span className="text-[9px] text-blue-400 font-bold">(Đầu)</span>}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Match Context Story */}
                <p className="text-xs text-gray-300 leading-relaxed italic line-clamp-3">
                  &ldquo;{match.description}&rdquo;
                </p>
              </div>

              {/* Card Footer Button */}
              <div className="mt-5 pt-3 border-t border-gray-800/80 flex items-center justify-between text-xs">
                <span className="text-gray-400">CLB: <strong className="text-white">{match.cr7Team}</strong></span>
                <button
                  onClick={() => setSelectedMatch(match)}
                  className="text-[#D4AF37] hover:text-white font-bold transition-colors"
                >
                  Xem chi tiết &rarr;
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
              onClick={() => setSelectedMatch(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 rounded-full bg-gray-800"
            >
              ✕
            </button>

            <div className="text-xs uppercase font-bold text-[#D4AF37] mb-2 tracking-wider">
              {selectedMatch.competition} • Mùa giải {selectedMatch.season}
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
                Nhật ký bàn thắng & kiến tạo:
              </h4>
              <ul className="space-y-2 text-sm">
                {selectedMatch.goals.map((g, i) => (
                  <li key={i} className="flex items-center justify-between text-gray-300 border-b border-gray-900 pb-1.5 last:border-0">
                    <span className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-[#F3C623]" />
                      <strong>Phút {g.minute}&apos;</strong>: {g.type === "penalty" ? "Phạt đền (11m)" : g.type === "free-kick" ? "Đá phạt trực tiếp" : g.type === "header" ? "Đánh đầu" : "Dứt điểm bóng sống"}
                    </span>
                    {g.assistBy && (
                      <span className="text-xs text-gray-400 font-light">
                        KT: {g.assistBy}
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
              onClick={() => setSelectedMatch(null)}
              className="w-full py-3 rounded-xl bg-[#D4AF37] text-black font-bold text-sm hover:opacity-90 transition-all"
            >
              Đóng lại
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
