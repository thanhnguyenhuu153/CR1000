"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroCountdown from "@/components/HeroCountdown";
import BioSection from "@/components/BioSection";
import AnatomySection from "@/components/AnatomySection";
import HattrickShowcase from "@/components/HattrickShowcase";
import OpponentsSection from "@/components/OpponentsSection";
import TrophyRoomSection from "@/components/TrophyRoomSection";
import SeasonsChartSection from "@/components/SeasonsChartSection";
import FinalsAndMilestonesSection from "@/components/FinalsAndMilestonesSection";
import FanVaultStore from "@/components/FanVaultStore";
import Footer from "@/components/Footer";
import { cr7CareerSummary } from "@/data/cr7-stats";
import { Plus, RotateCcw, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

export default function HomePage() {
  const [goals, setGoals] = useState<number>(cr7CareerSummary.totalGoals);
  const [isCelebrated, setIsCelebrated] = useState(false);

  // Load from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cr1000_goals_count");
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed >= 985) {
          setGoals(parsed);
        }
      }
    } catch (e) {
      // LocalStorage access handling
    }
  }, []);

  const handleGoalIncrement = () => {
    setGoals((prev) => {
      const nextVal = prev + 1;
      try {
        localStorage.setItem("cr1000_goals_count", nextVal.toString());
      } catch (e) {}

      if (nextVal >= 1000 && !isCelebrated) {
        setIsCelebrated(true);
        confetti({
          particleCount: 300,
          spread: 120,
          origin: { y: 0.4 },
          colors: ["#D4AF37", "#FFD700", "#E63946", "#FFFFFF"],
        });
      }
      return nextVal;
    });
  };

  const handleResetGoals = () => {
    setGoals(cr7CareerSummary.totalGoals);
    try {
      localStorage.removeItem("cr1000_goals_count");
    } catch (e) {}
  };

  return (
    <main className="min-h-screen bg-[#08090C] text-[#F8FAFC] selection:bg-[#D4AF37]/30 selection:text-[#FFF7D6]">
      {/* Sticky Navigation Bar */}
      <Navbar />

      {/* Hero Section: The Countdown Chamber */}
      <HeroCountdown
        currentGoals={goals}
        onGoalIncrement={handleGoalIncrement}
      />

      {/* Chapter 1: Bio & Eras */}
      <BioSection />

      {/* Chapter 2: The Scoring Anatomy */}
      <AnatomySection currentGoals={goals} />

      {/* Chapter 3: 66 Hattricks & Pokers */}
      <HattrickShowcase />

      {/* Chapter 4: Favorite Opponents (Prey List) */}
      <OpponentsSection />

      {/* Chapter 5: Trophy Room & World Records */}
      <TrophyRoomSection />

      {/* Chapter 6: Seasons Matrix & Discipline */}
      <SeasonsChartSection />

      {/* Chapter 7: Finals & 1000 Goals Archive */}
      <FinalsAndMilestonesSection />

      {/* Chapter 8: Fan Vault & Memorabilia Store */}
      <FanVaultStore />

      {/* Footer & SEO FAQ */}
      <Footer />

      {/* Floating Live Quick Controls (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        {goals > cr7CareerSummary.totalGoals && (
          <button
            onClick={handleResetGoals}
            title="Đặt lại số bàn gốc (985)"
            className="p-3 rounded-full bg-[#181B26] hover:bg-gray-800 text-gray-400 hover:text-white border border-gray-700 shadow-xl transition-all"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={handleGoalIncrement}
          title="Thêm 1 bàn thắng mới ngay khi CR7 ghi bàn!"
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-black font-extrabold text-xs shadow-2xl hover:opacity-95 active:scale-95 transition-all border border-[#FFF7D6]/40"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span className="hidden sm:inline">Cập nhật bàn mới (+1)</span>
          <span className="sm:hidden">+1 Bàn</span>
        </button>
      </div>
    </main>
  );
}
