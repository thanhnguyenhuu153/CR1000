"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { cr7CareerSummary } from "@/data/cr7-stats";
import { cr7BioMilestones, BioMilestone } from "@/data/cr7-bio";
import { cr7Trophies, TrophyItem } from "@/data/cr7-trophies";
import { cr7ShopItems as defaultShopItems, ShopItem } from "@/data/cr7-shop";

export interface CustomImages {
  // 1. Hero & Branding
  hero: string;
  ogImage?: string;

  // 2. Chapter 1: 7 Career Eras
  eraMadeira: string;
  eraManUtd1: string;
  eraRealMadrid: string;
  eraJuventus: string;
  eraManUtd2: string;
  eraAlNassr: string;
  eraPortugal: string;

  // 3. Chapter 5: Trophies & World Honors (Đầy đủ toàn bộ 27 danh hiệu)
  trophyBallonDor: string;
  trophyUcl: string;
  trophyEuro: string;
  trophyNationsLeague: string;
  trophyClubWc: string;
  trophyPremierLeague: string;
  trophyLaLiga: string;
  trophySerieA: string;
  trophySaudiProLeague: string;
  trophyCopaDelRey: string;
  trophyFaCup: string;
  trophyCoppaItalia: string;
  trophyLeagueCup: string;
  trophySupercopaEspana: string;
  trophySupercoppaItaliana: string;
  trophyUefaSuperCup: string;
  trophyCommunityShield: string;
  trophySupertacaPortugal: string;
  trophyArabClub: string;
  trophyGoldenShoe: string;
  trophyFifaTheBest: string;
  trophyPuskasAward: string;
  trophyUclTopScorer: string;
  trophySplGoldenBoot: string;
  trophyPichichi: string;
  trophyCapocannoniere: string;
  trophyPlGoldenBoot: string;

  // 4. Chapter 7: Finals & Iconic Moments (Đầy đủ 11 siêu phẩm & chung kết)
  finalChelsea2008: string;
  finalBarca2011: string;
  finalUcl2014: string;
  finalUcl2017: string;
  finalNationsLeague: string;
  finalArab2023: string;
  iconicBicycleJuve: string;
  iconicPorto40m: string;
  iconicCalmaCampNou: string;
  iconicFreekickPortsmouth: string;
  iconicSwedenPlayoff: string;
  iconicFreekickSpain: string;
}

export const defaultImages: CustomImages = {
  // 1. Hero & Branding
  hero: "/images/cr7/hero-cr7.jpg",
  ogImage: "/images/cr7/hero-cr7.jpg",

  // 2. 7 Eras
  eraMadeira: "/images/cr7/era-madeira.jpg",
  eraManUtd1: "/images/cr7/era-manutd-1.jpg",
  eraRealMadrid: "/images/cr7/era-realmadrid.jpg",
  eraJuventus: "/images/cr7/era-juventus.jpg",
  eraManUtd2: "/images/cr7/era-manutd-2.jpg",
  eraAlNassr: "/images/cr7/era-alnassr.jpg",
  eraPortugal: "/images/cr7/era-portugal.jpg",

  // 3. Trophies
  trophyBallonDor: "/images/trophies/cr7-ballon-dor.jpg",
  trophyUcl: "/images/trophies/ucl.jpg",
  trophyEuro: "/images/trophies/euro-trophy.jpg",
  trophyNationsLeague: "/images/trophies/euro-trophy.jpg",
  trophyClubWc: "/images/trophies/ucl.jpg",
  trophyPremierLeague: "/images/trophies/premier-league.png",
  trophyLaLiga: "/images/trophies/premier-league.png",
  trophySerieA: "/images/trophies/premier-league.png",
  trophySaudiProLeague: "/images/trophies/premier-league.png",
  trophyCopaDelRey: "/images/trophies/ucl.jpg",
  trophyFaCup: "/images/trophies/premier-league.png",
  trophyCoppaItalia: "/images/trophies/premier-league.png",
  trophyLeagueCup: "/images/trophies/premier-league.png",
  trophySupercopaEspana: "/images/trophies/premier-league.png",
  trophySupercoppaItaliana: "/images/trophies/premier-league.png",
  trophyUefaSuperCup: "/images/trophies/ucl.jpg",
  trophyCommunityShield: "/images/trophies/premier-league.png",
  trophySupertacaPortugal: "/images/trophies/euro-trophy.jpg",
  trophyArabClub: "/images/trophies/euro-trophy.jpg",
  trophyGoldenShoe: "/images/trophies/golden-shoe.jpg",
  trophyFifaTheBest: "/images/trophies/ballon-dor.png",
  trophyPuskasAward: "/images/trophies/ucl.jpg",
  trophyUclTopScorer: "/images/trophies/ucl.jpg",
  trophySplGoldenBoot: "/images/trophies/golden-shoe.jpg",
  trophyPichichi: "/images/trophies/golden-shoe.jpg",
  trophyCapocannoniere: "/images/trophies/golden-shoe.jpg",
  trophyPlGoldenBoot: "/images/trophies/golden-shoe.jpg",

  // 4. Finals & Iconic
  finalChelsea2008: "/images/cr7/final-chelsea.jpg",
  finalBarca2011: "/images/cr7/era-realmadrid.jpg",
  finalUcl2014: "/images/cr7/era-realmadrid.jpg",
  finalUcl2017: "/images/cr7/era-realmadrid.jpg",
  finalNationsLeague: "/images/cr7/era-portugal.jpg",
  finalArab2023: "/images/cr7/era-alnassr.jpg",
  iconicBicycleJuve: "/images/cr7/era-realmadrid.jpg",
  iconicPorto40m: "/images/cr7/era-manutd-1.jpg",
  iconicCalmaCampNou: "/images/cr7/era-realmadrid.jpg",
  iconicFreekickPortsmouth: "/images/cr7/era-manutd-1.jpg",
  iconicSwedenPlayoff: "/images/cr7/era-portugal.jpg",
  iconicFreekickSpain: "/images/cr7/era-portugal.jpg",
};

interface SiteDataContextType {
  goals: number;
  setGoals: (val: number | ((prev: number) => number)) => void;
  images: CustomImages;
  updateImages: (newImages: Partial<CustomImages>) => void;
  resetImages: () => void;
  shopItems: ShopItem[];
  saveShopItems: (items: ShopItem[]) => void;
  nextMatch: typeof cr7CareerSummary.nextMatch;
  updateNextMatch: (match: Partial<typeof cr7CareerSummary.nextMatch>) => void;
  showFanVault: boolean;
  setShowFanVault: (val: boolean) => void;
}

const SiteDataContext = createContext<SiteDataContextType | null>(null);

export function SiteDataProvider({ children }: { children: React.ReactNode }) {
  const [goals, setGoalsState] = useState<number>(cr7CareerSummary.totalGoals);
  const [images, setImages] = useState<CustomImages>(defaultImages);
  const [shopItems, setShopItems] = useState<ShopItem[]>(defaultShopItems);
  const [nextMatch, setNextMatchState] = useState(cr7CareerSummary.nextMatch);
  const [showFanVault, setShowFanVaultState] = useState<boolean>(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedGoals = localStorage.getItem("cr1000_goals_count");
      if (savedGoals) {
        const parsed = parseInt(savedGoals, 10);
        if (!isNaN(parsed) && parsed >= 985) setGoalsState(parsed);
      }

      const savedImages = localStorage.getItem("cr1000_custom_images");
      if (savedImages) {
        const parsed = JSON.parse(savedImages);
        setImages((prev) => ({ ...prev, ...parsed }));
      }

      const savedShop = localStorage.getItem("cr1000_shop_items");
      if (savedShop) {
        const parsed = JSON.parse(savedShop);
        if (Array.isArray(parsed) && parsed.length > 0) setShopItems(parsed);
      }

      const savedNextMatch = localStorage.getItem("cr1000_next_match");
      if (savedNextMatch) {
        const parsed = JSON.parse(savedNextMatch);
        setNextMatchState((prev) => ({ ...prev, ...parsed }));
      }

      const savedShowFanVault = localStorage.getItem("cr1000_show_fan_vault");
      if (savedShowFanVault !== null) {
        setShowFanVaultState(savedShowFanVault === "true");
      }
    } catch (e) {}
  }, []);

  const setGoals = (val: number | ((prev: number) => number)) => {
    setGoalsState((prev) => {
      const nextVal = typeof val === "function" ? val(prev) : val;
      try {
        localStorage.setItem("cr1000_goals_count", nextVal.toString());
      } catch (e) {}
      return nextVal;
    });
  };

  const updateImages = (newImages: Partial<CustomImages>) => {
    setImages((prev) => {
      const updated = { ...prev, ...newImages };
      try {
        localStorage.setItem("cr1000_custom_images", JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const resetImages = () => {
    setImages(defaultImages);
    try {
      localStorage.removeItem("cr1000_custom_images");
    } catch (e) {}
  };

  const saveShopItems = (newItems: ShopItem[]) => {
    setShopItems(newItems);
    try {
      localStorage.setItem("cr1000_shop_items", JSON.stringify(newItems));
    } catch (e) {}
  };

  const updateNextMatch = (match: Partial<typeof cr7CareerSummary.nextMatch>) => {
    setNextMatchState((prev) => {
      const updated = { ...prev, ...match };
      try {
        localStorage.setItem("cr1000_next_match", JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const setShowFanVault = (val: boolean) => {
    setShowFanVaultState(val);
    try {
      localStorage.setItem("cr1000_show_fan_vault", val ? "true" : "false");
    } catch (e) {}
  };

  return (
    <SiteDataContext.Provider
      value={{
        goals,
        setGoals,
        images,
        updateImages,
        resetImages,
        shopItems,
        saveShopItems,
        nextMatch,
        updateNextMatch,
        showFanVault,
        setShowFanVault,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error("useSiteData must be used within a SiteDataProvider");
  }
  return context;
}
