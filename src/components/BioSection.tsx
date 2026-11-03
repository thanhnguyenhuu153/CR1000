"use client";

import React, { useState } from "react";
import { cr7BioMilestones } from "@/data/cr7-bio";
import { Award, Target, Trophy, Quote, CheckCircle2, ChevronRight } from "lucide-react";

export default function BioSection() {
  const [activeEraIndex, setActiveEraIndex] = useState(2); // Mặc định mở Real Madrid - thời kỳ rực rỡ nhất
  const currentEra = cr7BioMilestones[activeEraIndex];

  return (
    <section id="bio" className="py-20 relative bg-[#0B0C10] border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181B24] border border-gray-800 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3">
            Chương 1 • Tiểu sử & Kỷ nguyên
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Hành trình tiến hóa của <span className="gold-gradient-text">Huyền Thoại</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-400">
            Từ một cậu bé mắc bệnh tim tại hòn đảo Madeira nghèo khó, tới biểu tượng vĩ đại nhất của sự khổ luyện và ý chí không giới hạn trong lịch sử thể thao.
          </p>
        </div>

        {/* Era Navigation Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {cr7BioMilestones.map((era, index) => {
            const isActive = activeEraIndex === index;
            return (
              <button
                key={era.era}
                onClick={() => setActiveEraIndex(index)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 border ${
                  isActive
                    ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20 scale-105"
                    : "bg-[#141720] text-gray-300 border-gray-800 hover:border-gray-700 hover:text-white"
                }`}
              >
                <span className="block text-[10px] font-mono opacity-80">{era.year}</span>
                <span>{era.era}</span>
              </button>
            );
          })}
        </div>

        {/* Active Era Featured Showcase Card */}
        <div className="bg-gradient-to-br from-[#141722] via-[#0E1017] to-[#0A0C10] border border-gray-800 rounded-3xl p-6 sm:p-10 shadow-2xl transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Story & Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#F3C623] border border-[#D4AF37]/30 text-xs font-bold uppercase tracking-wider">
                  {currentEra.badge}
                </span>
                <span className="text-sm font-mono text-gray-400">{currentEra.year}</span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {currentEra.title}
                </h3>
                <p className="text-sm sm:text-base font-medium text-[#D4AF37] mt-1">
                  {currentEra.subtitle}
                </p>
              </div>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                {currentEra.description}
              </p>

              {currentEra.quote && (
                <div className="relative p-4 sm:p-5 rounded-2xl bg-[#1B1F2B]/60 border-l-4 border-[#D4AF37] text-gray-200">
                  <Quote className="w-5 h-5 text-[#D4AF37] opacity-60 mb-2" />
                  <p className="text-sm sm:text-base italic font-serif leading-relaxed">
                    &ldquo;{currentEra.quote}&rdquo;
                  </p>
                  <span className="block text-right text-xs font-bold text-gray-400 mt-2">
                    — Cristiano Ronaldo
                  </span>
                </div>
              )}
            </div>

            {/* Right Column: Era Stats & Highlights */}
            <div className="lg:col-span-5 space-y-6">
              {/* Quick Numbers in this Era */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#11131B] border border-gray-800">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-black font-mono text-white">
                    {currentEra.stats.goals}
                  </div>
                  <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
                    Bàn thắng
                  </span>
                </div>
                <div className="text-center border-x border-gray-800">
                  <div className="text-2xl sm:text-3xl font-black font-mono text-gray-300">
                    {currentEra.stats.matches}
                  </div>
                  <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
                    Trận đấu
                  </span>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-black font-mono text-[#F3C623]">
                    {currentEra.stats.trophies}
                  </div>
                  <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
                    Danh hiệu
                  </span>
                </div>
              </div>

              {/* Milestones in this Era */}
              <div className="space-y-3 bg-[#11131B]/80 p-5 rounded-2xl border border-gray-800/80">
                <h4 className="text-xs uppercase font-bold tracking-widest text-[#D4AF37] flex items-center gap-2">
                  <Trophy className="w-4 h-4" /> Dấu ấn không thể quên
                </h4>
                <ul className="space-y-2.5">
                  {currentEra.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
