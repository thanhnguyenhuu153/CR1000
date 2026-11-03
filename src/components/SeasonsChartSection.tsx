"use client";

import React, { useState } from "react";
import { cr7SeasonsData, SeasonRecord } from "@/data/cr7-seasons";
import { BarChart3, TrendingUp, AlertTriangle, ShieldAlert } from "lucide-react";

export default function SeasonsChartSection() {
  const [selectedSeason, setSelectedSeason] = useState<SeasonRecord>(cr7SeasonsData[12]); // Mùa 2014-15 kỷ lục 61 bàn

  return (
    <section className="py-20 bg-[#08090C] relative border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181B24] border border-gray-800 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3">
            Chương 6 • Biểu đồ tiến hóa
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Ma Trận Bàn Thắng & <span className="gold-gradient-text">Kỷ Luật Theo Mùa</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-400">
            Hơn 2 thập kỷ duy trì hiệu suất đỉnh cao từ một tài năng trẻ 17 tuổi tại Lisbon cho đến siêu sát thủ ở tuổi 41.
          </p>
        </div>

        {/* Selected Season Detail Highlight Card */}
        <div className="bg-gradient-to-r from-[#141724] via-[#0E1017] to-[#12141F] border border-[#D4AF37]/30 rounded-2xl p-6 mb-10 shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#D4AF37]">
                Chi tiết mùa giải đang chọn:
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Mùa giải {selectedSeason.season} • {selectedSeason.team}
              </h3>
            </div>

            <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
              <div className="text-center px-3 py-1.5 rounded-xl bg-[#090A0F] border border-gray-800">
                <span className="text-2xl font-black font-mono text-white block">
                  {selectedSeason.goals}
                </span>
                <span className="text-[10px] uppercase text-gray-400 font-bold">Bàn thắng</span>
              </div>

              <div className="text-center px-3 py-1.5 rounded-xl bg-[#090A0F] border border-gray-800">
                <span className="text-2xl font-black font-mono text-purple-400 block">
                  {selectedSeason.assists}
                </span>
                <span className="text-[10px] uppercase text-gray-400 font-bold">Kiến tạo</span>
              </div>

              <div className="text-center px-3 py-1.5 rounded-xl bg-[#090A0F] border border-gray-800">
                <span className="text-2xl font-black font-mono text-gray-300 block">
                  {selectedSeason.matches}
                </span>
                <span className="text-[10px] uppercase text-gray-400 font-bold">Trận đấu</span>
              </div>

              <div className="text-center px-3 py-1.5 rounded-xl bg-[#090A0F] border border-gray-800">
                <span className="text-2xl font-black font-mono text-yellow-400 block">
                  {selectedSeason.yellowCards}
                </span>
                <span className="text-[10px] uppercase text-gray-400 font-bold">Thẻ vàng</span>
              </div>

              <div className="text-center px-3 py-1.5 rounded-xl bg-[#090A0F] border border-gray-800">
                <span className="text-2xl font-black font-mono text-red-500 block">
                  {selectedSeason.redCards}
                </span>
                <span className="text-[10px] uppercase text-gray-400 font-bold">Thẻ đỏ</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Bar Timeline Grid */}
        <div className="bg-[#10121A] border border-gray-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs uppercase font-bold tracking-wider text-gray-400 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#F3C623]" /> Bấm vào từng mùa giải để xem chi tiết thông số
            </span>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-gray-300">
                <span className="w-3 h-3 rounded bg-[#D4AF37]" /> Bàn thắng
              </span>
              <span className="flex items-center gap-1.5 text-gray-400">
                <span className="w-3 h-3 rounded bg-purple-500" /> Kiến tạo
              </span>
            </div>
          </div>

          {/* Bar Chart Representation */}
          <div className="grid grid-cols-6 sm:grid-cols-12 md:grid-cols-24 gap-1.5 items-end h-64 pt-6 border-b border-gray-800">
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
                    className={`w-full rounded-t-md transition-all duration-300 ${
                      isSelected
                        ? "bg-[#F59E0B] shadow-lg shadow-[#F59E0B]/30 scale-105"
                        : "bg-[#D4AF37]/70 hover:bg-[#D4AF37]"
                    }`}
                    style={{ height: `${Math.max(8, heightPercent)}%` }}
                  />
                  <span
                    className={`text-[8px] font-mono mt-2 truncate w-full text-center ${
                      isSelected ? "text-[#F59E0B] font-bold" : "text-gray-400"
                    }`}
                  >
                    {s.season.slice(2, 4)}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-400">
            <span>* Mùa giải đỉnh cao: 2014-2015 với <strong>61 bàn thắng</strong> và <strong>22 kiến tạo</strong> sau 54 trận.</span>
            <span>Tổng số mùa giải chuyên nghiệp: <strong>24 mùa</strong></span>
          </div>
        </div>
      </div>
    </section>
  );
}
