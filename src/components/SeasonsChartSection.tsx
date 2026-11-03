"use client";

import React, { useState } from "react";
import { cr7SeasonsData, SeasonRecord } from "@/data/cr7-seasons";
import { BarChart3, TrendingUp, AlertTriangle, ShieldAlert } from "lucide-react";

export default function SeasonsChartSection() {
  const [selectedSeason, setSelectedSeason] = useState<SeasonRecord>(cr7SeasonsData[12]); // Mùa 2014-15 kỷ lục 61 bàn

  return (
    <section className="py-28 sm:py-36 bg-[#08090C] relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#121520] border border-[#D4AF37]/25 text-[#D4AF37] text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">
            Chương 6 • Biểu đồ tiến hóa
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-tight">
            Ma Trận Bàn Thắng & <span className="gold-gradient-text">Kỷ Luật Theo Mùa</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-400 font-light leading-relaxed">
            Hơn 2 thập kỷ duy trì phong độ hủy diệt: từ một tài năng trẻ 17 tuổi tại Lisbon cho đến siêu sát thủ ở tuổi 41.
          </p>
        </div>

        {/* Selected Season Detail Highlight Card */}
        <div className="bg-[#0F121A]/90 border border-white/10 rounded-2xl p-6 sm:p-7 mb-10 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="text-[11px] uppercase font-semibold tracking-widest text-[#D4AF37]">
                Mùa giải đang chọn:
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1 tracking-tight">
                Mùa {selectedSeason.season} • {selectedSeason.team}
              </h3>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              <div className="text-center px-4 py-2 rounded-xl bg-[#090A0F] border border-white/10">
                <span className="text-2xl font-black font-mono text-white block">
                  {selectedSeason.goals}
                </span>
                <span className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Bàn thắng</span>
              </div>

              <div className="text-center px-4 py-2 rounded-xl bg-[#090A0F] border border-white/10">
                <span className="text-2xl font-black font-mono text-white block">
                  {selectedSeason.assists}
                </span>
                <span className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Kiến tạo</span>
              </div>

              <div className="text-center px-4 py-2 rounded-xl bg-[#090A0F] border border-white/10">
                <span className="text-2xl font-black font-mono text-gray-300 block">
                  {selectedSeason.matches}
                </span>
                <span className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Trận đấu</span>
              </div>

              <div className="text-center px-4 py-2 rounded-xl bg-[#090A0F] border border-white/10">
                <span className="text-2xl font-black font-mono text-amber-300 block">
                  {selectedSeason.yellowCards}
                </span>
                <span className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Thẻ vàng</span>
              </div>

              <div className="text-center px-4 py-2 rounded-xl bg-[#090A0F] border border-white/10">
                <span className="text-2xl font-black font-mono text-red-400 block">
                  {selectedSeason.redCards}
                </span>
                <span className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Thẻ đỏ</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Bar Timeline Grid */}
        <div className="bg-[#0F121A]/90 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs uppercase font-semibold tracking-wider text-gray-400 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#D4AF37]" /> Bấm vào từng cột mùa giải để xem chi tiết
            </span>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-gray-300">
                <span className="w-2.5 h-2.5 rounded bg-[#D4AF37]" /> Số bàn thắng
              </span>
            </div>
          </div>

          {/* Bar Chart Representation */}
          <div className="grid grid-cols-6 sm:grid-cols-12 md:grid-cols-24 gap-1.5 items-end h-64 pt-6 border-b border-white/[0.08]">
            {cr7SeasonsData.map((s) => {
              const isSelected = selectedSeason.season === s.season;
              const maxGoals = 61; // Mùa cao nhất
              const heightPercent = (s.goals / maxGoals) * 100;

              return (
                <button
                  key={s.season}
                  onClick={() => setSelectedSeason(s)}
                  className="flex flex-col items-center h-full justify-end group focus:outline-none"
                  title={`${s.season}: ${s.goals} bàn (${s.team})`}
                >
                  <span className="text-[9px] font-mono text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity mb-1">
                    {s.goals}
                  </span>
                  <div
                    className={`w-full rounded-t transition-all duration-300 ${
                      isSelected
                        ? "bg-[#D4AF37] shadow-lg shadow-[#D4AF37]/30 scale-105"
                        : "bg-[#D4AF37]/35 hover:bg-[#D4AF37]/75"
                    }`}
                    style={{ height: `${Math.max(8, heightPercent)}%` }}
                  />
                  <span
                    className={`text-[8px] font-mono mt-2 truncate w-full text-center ${
                      isSelected ? "text-[#D4AF37] font-bold" : "text-gray-400"
                    }`}
                  >
                    {s.season.slice(2, 4)}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-400 font-light">
            <span>* Mùa đỉnh cao: 2014–2015 với <strong>61 bàn thắng</strong> và <strong>22 kiến tạo</strong> sau 54 trận.</span>
            <span>Tổng cộng: <strong>24 mùa giải chuyên nghiệp</strong></span>
          </div>
        </div>
      </div>
    </section>
  );
}
