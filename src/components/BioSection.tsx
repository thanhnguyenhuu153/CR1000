"use client";

import React, { useState } from "react";
import { cr7BioMilestones } from "@/data/cr7-bio";
import { useSiteData } from "@/context/SiteDataContext";
import { Award, Target, Trophy, Quote, CheckCircle2, ChevronRight, Image as ImageIcon } from "lucide-react";

export default function BioSection() {
  const { images } = useSiteData();
  const [activeEraIndex, setActiveEraIndex] = useState(2); // Mặc định mở Real Madrid - thời kỳ rực rỡ nhất
  const currentEra = cr7BioMilestones[activeEraIndex];

  // Map to customizable images
  const eraImageMap = [
    images.eraMadeira,
    images.eraManUtd1,
    images.eraRealMadrid,
    images.eraJuventus,
    images.eraManUtd2,
    images.eraAlNassr,
    images.eraPortugal,
  ];
  const activeImageUrl = eraImageMap[activeEraIndex] || currentEra.imageUrl;

  return (
    <section id="bio" className="py-28 sm:py-36 relative bg-[#08090C] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#121520] border border-[#D4AF37]/25 text-[#D4AF37] text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">
            Chương 1 • Tiểu sử & Kỷ nguyên
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-tight">
            Hành trình tiến hóa của <span className="gold-gradient-text">Huyền Thoại</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-400 font-light leading-relaxed">
            Từ một cậu bé mắc hội chứng tim đập nhanh tại hòn đảo Madeira nghèo khó, tới biểu tượng vĩ đại nhất của sự khổ luyện, kỷ luật và ý chí không giới hạn trong lịch sử thể thao.
          </p>
        </div>

        {/* Era Navigation Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar">
          {cr7BioMilestones.map((era, index) => {
            const isActive = activeEraIndex === index;
            return (
              <button
                key={era.era}
                onClick={() => setActiveEraIndex(index)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 border ${
                  isActive
                    ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20"
                    : "bg-[#11131C] text-gray-400 border-white/10 hover:text-white hover:border-white/20"
                }`}
              >
                <span className="block text-[10px] font-mono opacity-80">{era.year}</span>
                <span>{era.era}</span>
              </button>
            );
          })}
        </div>

        {/* Active Era Featured Showcase Card */}
        <div className="bg-[#0F121A]/90 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Story & Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-semibold uppercase tracking-wider">
                  {currentEra.badge}
                </span>
                <span className="text-xs font-mono text-gray-400">{currentEra.year}</span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {currentEra.title}
                </h3>
                <p className="text-sm sm:text-base font-medium text-[#D4AF37] mt-1">
                  {currentEra.subtitle}
                </p>
              </div>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-light">
                {currentEra.description}
              </p>

              {currentEra.quote && (
                <div className="relative p-5 rounded-2xl bg-[#141724]/60 border-l-2 border-[#D4AF37] text-gray-200">
                  <Quote className="w-5 h-5 text-[#D4AF37] opacity-60 mb-2" />
                  <p className="text-sm sm:text-base italic font-serif leading-relaxed text-gray-300">
                    &ldquo;{currentEra.quote}&rdquo;
                  </p>
                  <span className="block text-right text-xs font-semibold text-gray-400 mt-2">
                    — Cristiano Ronaldo
                  </span>
                </div>
              )}

              {/* Milestones in this Era */}
              <div className="space-y-3 bg-[#131622]/80 p-5 rounded-2xl border border-white/5">
                <h4 className="text-xs uppercase font-bold tracking-widest text-[#D4AF37] flex items-center gap-2">
                  <Trophy className="w-4 h-4" /> Dấu ấn không thể quên
                </h4>
                <ul className="space-y-2.5">
                  {currentEra.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: REAL PHOTO OF CR7 IN THIS ERA + Stats */}
            <div className="lg:col-span-5 space-y-6">
              {/* Real Era Photo */}
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0E1017] shadow-xl relative group">
                <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                  <img
                    src={activeImageUrl}
                    alt={currentEra.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1017] via-transparent to-transparent opacity-80" />
                  <span className="absolute bottom-3 left-3 right-3 text-xs text-gray-300 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                    📸 {currentEra.imageCaption}
                  </span>
                </div>
              </div>

              {/* Quick Numbers in this Era */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#131622]/80 border border-white/10">
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
                  <div className="text-2xl sm:text-3xl font-black font-mono text-[#D4AF37]">
                    {currentEra.stats.trophies}
                  </div>
                  <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
                    Danh hiệu
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
