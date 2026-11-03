"use client";

import React, { useState } from "react";
import { cr7CareerSummary } from "@/data/cr7-stats";
import { Sparkles, Calendar, MapPin, ChevronRight, Trophy, Flame, Plus } from "lucide-react";
import confetti from "canvas-confetti";

interface HeroCountdownProps {
  currentGoals: number;
  onGoalIncrement: () => void;
}

export default function HeroCountdown({ currentGoals, onGoalIncrement }: HeroCountdownProps) {
  const target = cr7CareerSummary.countdownTarget;
  const remaining = Math.max(0, target - currentGoals);
  const percentage = Math.min(100, (currentGoals / target) * 100);
  const [animating, setAnimating] = useState(false);

  const handleGoalBoost = () => {
    setAnimating(true);
    onGoalIncrement();
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.5 },
      colors: ["#D4AF37", "#E63946", "#F59E0B"],
    });
    setTimeout(() => setAnimating(false), 600);
  };

  return (
    <section id="countdown" className="relative min-h-[96vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Lighting & Real Image Silhouette Backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-b from-[#D4AF37]/15 via-[#E63946]/10 to-transparent rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#262B36_1px,transparent_1px)] [background-size:32px_32px] opacity-30" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Top Official Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161922]/90 border border-[#D4AF37]/40 shadow-lg shadow-[#D4AF37]/10 mb-8 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs uppercase tracking-widest font-bold text-gray-200">
            Dữ liệu trực tiếp • FIFA & IFFHS Verified
          </span>
          <span className="text-[#D4AF37] font-black text-xs">#CR1000</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-6 uppercase">
          Hành trình chạm đỉnh{" "}
          <span className="gold-gradient-text block sm:inline">1.000 Bàn</span>
        </h1>

        <p className="max-w-3xl mx-auto text-base sm:text-xl text-gray-300 font-light mb-10 leading-relaxed">
          Chứng kiến từng bước chân của <strong className="text-white font-semibold">Cristiano Ronaldo</strong> – Cầu thủ ghi nhiều bàn thắng chính thức nhất mọi thời đại trong nỗ lực chinh phục đỉnh Everest chưa từng có của bóng đá nhân loại.
        </p>

        {/* Hero Photo Banner - REAL PHOTO OF CR7 */}
        <div className="relative max-w-4xl mx-auto mb-10 rounded-3xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl gold-border-glow">
          <div className="relative h-64 sm:h-80 md:h-96 w-full bg-[#0E1017]">
            <img
              src="/images/cr7/hero-cr7.jpg"
              alt="Cristiano Ronaldo - Hành trình 1000 bàn thắng"
              className="w-full h-full object-cover object-top filter brightness-95 contrast-105"
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F1117] via-[#0F1117]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F1117]/80 via-transparent to-[#0F1117]/80" />

            {/* In-image Caption Overlay */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 text-left">
              <div>
                <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F3C623] text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                  Chân dung Huyền Thoại
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
                  Cristiano Ronaldo dos Santos Aveiro
                </h2>
                <p className="text-xs sm:text-sm text-gray-300">
                  Madeira, Bồ Đào Nha • Sinh ngày 05/02/1985 • Đang thi đấu cho Al Nassr & ĐTQG
                </p>
              </div>

              <div className="shrink-0">
                <span className="text-xs uppercase font-mono font-bold text-[#F3C623] px-3 py-1 rounded-lg bg-black/60 border border-gray-700 backdrop-blur-md">
                  Ảnh tư liệu Wikimedia Commons
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Countdown Display Card */}
        <div className="relative max-w-3xl mx-auto bg-gradient-to-b from-[#161922]/90 to-[#0F1117]/95 border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-10 shadow-2xl gold-border-glow backdrop-blur-xl mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
            {/* Current Goals */}
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
                Đã ghi chính thức
              </span>
              <div
                className={`text-6xl sm:text-7xl lg:text-8xl font-black font-mono tracking-tighter text-white transition-transform duration-300 ${
                  animating ? "scale-110 text-[#F59E0B]" : ""
                }`}
              >
                {currentGoals}
              </div>
              <span className="text-xs font-medium text-emerald-400 flex items-center justify-center gap-1">
                <Flame className="w-3.5 h-3.5" /> 1.341 trận chính thức
              </span>
            </div>

            {/* Middle Divider / Target Icon */}
            <div className="flex flex-col items-center justify-center py-2 sm:py-0 border-y sm:border-y-0 sm:border-x border-gray-800">
              <div className="w-16 h-16 rounded-2xl bg-[#08090C] border border-[#D4AF37]/40 flex items-center justify-center mb-2 shadow-inner">
                <Trophy className="w-8 h-8 text-[#F3C623]" />
              </div>
              <span className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">
                Khoảng cách lịch sử
              </span>
              <div className="mt-1 px-3 py-1 rounded-full bg-[#E63946]/20 border border-[#E63946]/40 text-[#FF8A93] text-sm font-black tracking-wide">
                Chỉ còn {remaining} bàn!
              </div>
            </div>

            {/* Target 1000 */}
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
                Mục tiêu vĩ đại
              </span>
              <div className="text-6xl sm:text-7xl lg:text-8xl font-black font-mono tracking-tighter gold-gradient-text">
                1.000
              </div>
              <span className="text-xs font-medium text-[#F3C623] flex items-center justify-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Bất khả chiến bại
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-8 space-y-2">
            <div className="flex justify-between text-xs font-semibold text-gray-400">
              <span>Tiến trình hoàn thành</span>
              <span className="text-[#F3C623] font-mono">{percentage.toFixed(1)}%</span>
            </div>
            <div className="w-full h-3.5 bg-[#08090C] rounded-full overflow-hidden p-0.5 border border-gray-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#DC2626] via-[#D4AF37] to-[#F59E0B] transition-all duration-700 shadow-sm"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Interactive Simulation / Live goal trigger */}
          <div className="mt-6 pt-5 border-t border-gray-800/80 flex flex-wrap items-center justify-between gap-3 text-left">
            <div className="text-xs text-gray-400">
              <span className="text-gray-200 font-medium">Bạn vừa xem CR7 ghi bàn?</span> Cập nhật tức thì vào bộ đếm:
            </div>
            <button
              onClick={handleGoalBoost}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#232733] hover:bg-[#D4AF37] text-white hover:text-black text-xs font-bold transition-all border border-gray-700 hover:border-[#D4AF37]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+1 Bàn thắng thử nghiệm</span>
            </button>
          </div>
        </div>

        {/* Next Fixture Alert Card */}
        <div className="max-w-xl mx-auto bg-[#111318]/90 border border-gray-800 hover:border-[#D4AF37]/40 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all">
          <div className="flex items-center gap-3 text-left">
            <div className="w-12 h-12 rounded-xl bg-[#1D212C] flex items-center justify-center shrink-0 border border-gray-700">
              <Calendar className="w-6 h-6 text-[#F3C623]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  {cr7CareerSummary.nextMatch.competition}
                </span>
                <span className="text-xs text-gray-400">Sắp diễn ra</span>
              </div>
              <h3 className="text-sm font-bold text-white mt-1">
                {cr7CareerSummary.nextMatch.homeTeam} vs {cr7CareerSummary.nextMatch.awayTeam}
              </h3>
              <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-gray-500" />
                {cr7CareerSummary.nextMatch.stadium}
              </p>
            </div>
          </div>

          <a
            href="#archive"
            className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold bg-[#1C202B] hover:bg-[#D4AF37] text-gray-200 hover:text-black border border-gray-700 hover:border-[#D4AF37] transition-all flex items-center justify-center gap-1 shrink-0"
          >
            <span>Xem kho lưu trữ</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
