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

export default function HomePage() {
  const [goals, setGoals] = useState<number>(cr7CareerSummary.totalGoals);

  // Load from localStorage if updated in /admin
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

  return (
    <main className="min-h-screen bg-[#08090C] text-[#F8FAFC] selection:bg-[#D4AF37]/30 selection:text-[#FFF7D6]">
      {/* Sticky Navigation Bar */}
      <Navbar />

      {/* Hero Section: The Countdown Chamber */}
      <HeroCountdown currentGoals={goals} />

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
    </main>
  );
}
