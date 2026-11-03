"use client";

import React from "react";
import { cr7TopOpponents } from "@/data/cr7-opponents";
import { Target, Skull, Trophy, Flame } from "lucide-react";

export default function OpponentsSection() {
  return (
    <section id="opponents" className="py-20 bg-[#08090C] relative border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181B24] border border-gray-800 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3">
            Chương 4 • Danh sách nạn nhân
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Top &ldquo;Con Mồi&rdquo; <span className="crimson-gradient-text">Ưa Thích Nhất</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-400">
            Từ Sevilla, Atlético Madrid, Barcelona đến Juventus. Càng là đối thủ sừng sỏ và áp lực nghẹt thở, bản năng sát thủ của CR7 lại càng bùng nổ dữ dội.
          </p>
        </div>

        {/* Top 3 Victims Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {cr7TopOpponents.slice(0, 3).map((victim, idx) => (
            <div
              key={victim.team}
              className={`rounded-3xl p-6 border relative overflow-hidden transition-all duration-300 shadow-2xl ${
                idx === 0
                  ? "bg-gradient-to-b from-[#221710] to-[#120F0D] border-[#D4AF37]/50"
                  : idx === 1
                  ? "bg-gradient-to-b from-[#1C1318] to-[#100C11] border-red-900/50"
                  : "bg-gradient-to-b from-[#131720] to-[#0D1017] border-blue-900/40"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="w-9 h-9 rounded-full bg-black/50 border border-gray-700 flex items-center justify-center font-black font-mono text-sm text-[#F3C623]">
                  #{victim.rank}
                </span>
                <span className="text-xs uppercase font-bold tracking-wider text-gray-400">
                  {victim.country}
                </span>
              </div>

              <h3 className="text-2xl font-black text-white mb-1">{victim.team}</h3>
              <p className="text-xs text-gray-400 mb-6">{victim.notableMatch}</p>

              <div className="grid grid-cols-3 gap-2 py-3 border-y border-gray-800/80 text-center">
                <div>
                  <div className="text-3xl font-black font-mono text-white">
                    {victim.goals}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-gray-400">
                    Bàn thắng
                  </span>
                </div>
                <div className="border-x border-gray-800/80">
                  <div className="text-3xl font-black font-mono text-gray-300">
                    {victim.matches}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-gray-400">
                    Trận đấu
                  </span>
                </div>
                <div>
                  <div className="text-3xl font-black font-mono text-[#F3C623]">
                    {victim.hattricks}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-gray-400">
                    Hat-trick
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="text-gray-400">Hiệu suất:</span>
                <span className="font-mono font-bold text-[#F3C623]">{victim.ratio} bàn/trận</span>
              </div>
            </div>
          ))}
        </div>

        {/* Table List for Top 4 - 10 */}
        <div className="bg-[#10121A] border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 sm:p-5 border-b border-gray-800 flex items-center justify-between">
            <h4 className="text-xs sm:text-sm uppercase font-bold tracking-wider text-gray-300 flex items-center gap-2">
              <Skull className="w-4 h-4 text-[#E63946]" /> Danh sách các đội bóng bị chọc thủng lưới nhiều nhất (Hạng 4 - 10)
            </h4>
            <span className="text-xs text-gray-400 hidden sm:inline">Nguồn đối soát: Transfermarkt & IFFHS</span>
          </div>

          <div className="divide-y divide-gray-800/80">
            {cr7TopOpponents.slice(3).map((item) => (
              <div
                key={item.team}
                className="p-4 sm:p-5 hover:bg-[#161922] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono font-bold text-gray-400 text-sm w-6">
                    #{item.rank}
                  </span>
                  <div>
                    <h5 className="font-bold text-white text-base">{item.team}</h5>
                    <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">
                      {item.notableMatch}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 sm:shrink-0 justify-between sm:justify-end">
                  <div className="text-right">
                    <span className="text-lg font-black font-mono text-white">
                      {item.goals} <span className="text-xs text-gray-400 font-normal">bàn</span>
                    </span>
                    <span className="text-[11px] text-gray-400 block font-mono">
                      {item.matches} trận ({item.ratio} b/t)
                    </span>
                  </div>

                  <div className="w-24 bg-[#08090C] h-2 rounded-full overflow-hidden hidden md:block">
                    <div
                      className="h-full bg-gradient-to-r from-[#D4AF37] to-[#E63946]"
                      style={{ width: `${(item.goals / 27) * 100}%` }}
                    />
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
