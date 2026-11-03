"use client";

import React, { useState } from "react";
import { cr7BioMilestones } from "@/data/cr7-bio";
import { useSiteData } from "@/context/SiteDataContext";
import { useLanguage } from "@/context/LanguageContext";
import { Award, Target, Trophy, Quote, CheckCircle2, ChevronRight, Image as ImageIcon } from "lucide-react";

export default function BioSection() {
  const { images } = useSiteData();
  const { language, t } = useLanguage();
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
            {t.bio.chapterBadge}
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-tight">
            {t.bio.title} <span className="gold-gradient-text">{t.bio.titleGold}</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-400 font-light leading-relaxed">
            {t.bio.subtitle}
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
          {/* Top Half: Balanced 2-Column Split (Story vs Media) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Left Column: Narrative & Stats */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/35 text-xs font-bold uppercase tracking-wider">
                    {currentEra.badge}
                  </span>
                  <span className="text-xs font-mono text-gray-400 font-semibold">{currentEra.year}</span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                    {currentEra.title}
                  </h3>
                  <p className="text-sm sm:text-base font-semibold text-[#D4AF37] mt-1.5">
                    {currentEra.subtitle}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-light">
                  {currentEra.description}
                </p>
              </div>

              {/* Quote Box - font-sans italic (Fixed diacritics bug) */}
              {currentEra.quote && (
                <div className="relative p-5 rounded-2xl bg-[#141724]/90 border-l-2 border-[#D4AF37] text-gray-200 shadow-inner">
                  <Quote className="w-5 h-5 text-[#D4AF37] opacity-80 mb-2" />
                  <p className="text-sm sm:text-base italic font-sans leading-relaxed text-gray-200">
                    &ldquo;{currentEra.quote}&rdquo;
                  </p>
                  <span className="block text-right text-xs font-semibold text-[#D4AF37] mt-2 tracking-wide">
                    — Cristiano Ronaldo
                  </span>
                </div>
              )}

              {/* Quick Numbers in this Era (Balanced into Left Column) */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#131622]/90 border border-white/10 shadow-lg">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-black font-mono text-white">
                    {currentEra.stats.goals}
                  </div>
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-gray-400 font-semibold block mt-0.5">
                    {t.bio.goals}
                  </span>
                </div>
                <div className="text-center border-x border-white/10">
                  <div className="text-2xl sm:text-3xl font-black font-mono text-gray-200">
                    {currentEra.stats.matches}
                  </div>
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-gray-400 font-semibold block mt-0.5">
                    {t.bio.matches}
                  </span>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-black font-mono text-[#D4AF37]">
                    {currentEra.stats.trophies}
                  </div>
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-gray-400 font-semibold block mt-0.5">
                    {t.bio.trophies}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Striking Full-Height Portrait Photo */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0E1017] shadow-2xl relative group h-full min-h-[360px] sm:min-h-[420px] flex flex-col justify-end">
                <img
                  src={activeImageUrl}
                  alt={currentEra.title}
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-[#090A0F]/20 to-transparent opacity-90" />
                <div className="relative z-10 p-4 sm:p-5">
                  <span className="inline-block text-xs text-gray-200 bg-black/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15 shadow-xl leading-relaxed">
                    📸 {currentEra.imageCaption}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Half: Full-Width Milestones Grid (Balanced Architecture) */}
          <div className="mt-8 pt-8 border-t border-white/[0.08]">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-4 h-4 text-[#D4AF37]" />
              <h4 className="text-xs uppercase font-bold tracking-widest text-[#D4AF37]">
                {t.bio.notableMilestones}
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {currentEra.highlights.map((highlight, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-[#131622]/60 border border-white/5 hover:border-[#D4AF37]/30 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-300 leading-snug font-normal">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
