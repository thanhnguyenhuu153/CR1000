"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { cr7CareerSummary } from "@/data/cr7-stats";
import { cr7BioMilestones, BioMilestone } from "@/data/cr7-bio";
import { cr7Trophies, TrophyItem } from "@/data/cr7-trophies";
import { cr7ShopItems as defaultShopItems, ShopItem } from "@/data/cr7-shop";

export interface CustomImages {
  hero: string;
  eraMadeira: string;
  eraManUtd1: string;
  eraRealMadrid: string;
  eraJuventus: string;
  eraManUtd2: string;
  eraAlNassr: string;
  eraPortugal: string;
  trophyUcl: string;
  trophyBallonDor: string;
  trophyEuro: string;
  trophyPremierLeague: string;
}

export const defaultImages: CustomImages = {
  hero: "/images/cr7/hero-cr7.jpg",
  eraMadeira: "/images/cr7/era-madeira.jpg",
  eraManUtd1: "/images/cr7/era-manutd-1.jpg",
  eraRealMadrid: "/images/cr7/era-realmadrid.jpg",
  eraJuventus: "/images/cr7/era-juventus.jpg",
  eraManUtd2: "/images/cr7/era-manutd-2.jpg",
  eraAlNassr: "/images/cr7/era-alnassr.jpg",
  eraPortugal: "/images/cr7/era-portugal.jpg",
  trophyUcl: "/images/trophies/ucl.jpg",
  trophyBallonDor: "/images/trophies/cr7-ballon-dor.jpg",
  trophyEuro: "/images/trophies/euro-trophy.jpg",
  trophyPremierLeague: "/images/trophies/premier-league.png",
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
}

const SiteDataContext = createContext<SiteDataContextType | null>(null);

export function SiteDataProvider({ children }: { children: React.ReactNode }) {
  const [goals, setGoalsState] = useState<number>(cr7CareerSummary.totalGoals);
  const [images, setImages] = useState<CustomImages>(defaultImages);
  const [shopItems, setShopItems] = useState<ShopItem[]>(defaultShopItems);
  const [nextMatch, setNextMatchState] = useState(cr7CareerSummary.nextMatch);

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
