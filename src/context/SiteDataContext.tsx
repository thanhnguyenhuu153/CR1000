"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { cr7CareerSummary, getUpcomingNextMatch } from "@/data/cr7-stats";
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
  hero: "/images/cr7/hero-cr7.png",
  ogImage: "/images/cr7/og-share.jpg",

  // 2. 7 Eras
  eraMadeira: "/images/cr7/era-madeira.webp",
  eraManUtd1: "/images/cr7/era-manutd-1.webp",
  eraRealMadrid: "/images/cr7/era-realmadrid.jpg",
  eraJuventus: "/images/cr7/era-juventus.webp",
  eraManUtd2: "/images/cr7/era-manutd-2.webp",
  eraAlNassr: "/images/cr7/era-alnassr.jpg",
  eraPortugal: "/images/cr7/era-portugal.webp",

  // 3. Trophies
  trophyBallonDor: "/images/trophies/trophy-ballon-dor.jpeg",
  trophyUcl: "/images/trophies/trophy-ucl.webp",
  trophyEuro: "/images/trophies/trophy-euro.jpeg",
  trophyNationsLeague: "/images/trophies/trophy-nations-league.webp",
  trophyClubWc: "/images/trophies/trophy-club-wc.webp",
  trophyPremierLeague: "/images/trophies/trophy-premier-league.jpeg",
  trophyLaLiga: "/images/trophies/trophy-la-liga.webp",
  trophySerieA: "/images/trophies/trophy-serie-a.jpeg",
  trophySaudiProLeague: "/images/trophies/trophy-saudi-pro-league.jpeg",
  trophyCopaDelRey: "/images/trophies/trophy-copa-del-rey.jpeg",
  trophyFaCup: "/images/trophies/trophy-fa-cup.webp",
  trophyCoppaItalia: "/images/trophies/trophy-coppa-italia.jpeg",
  trophyLeagueCup: "/images/trophies/trophy-league-cup.webp",
  trophySupercopaEspana: "/images/trophies/trophy-supercopa-espana.webp",
  trophySupercoppaItaliana: "/images/trophies/trophy-supercoppa-italiana.jpeg",
  trophyUefaSuperCup: "/images/trophies/trophy-uefa-super-cup.jpeg",
  trophyCommunityShield: "/images/trophies/trophy-community-shield.jpeg",
  trophySupertacaPortugal: "/images/trophies/trophy-supertaca-portugal.png",
  trophyArabClub: "/images/trophies/trophy-arab-club.jpeg",
  trophyGoldenShoe: "/images/trophies/trophy-golden-shoe.jpeg",
  trophyFifaTheBest: "/images/trophies/trophy-fifa-the-best.webp",
  trophyPuskasAward: "/images/trophies/trophy-puskas-award.jpeg",
  trophyUclTopScorer: "/images/trophies/trophy-ucl-top-scorer.jpg",
  trophySplGoldenBoot: "/images/trophies/trophy-spl-golden-boot.png",
  trophyPichichi: "/images/trophies/trophy-pichichi.jpg",
  trophyCapocannoniere: "/images/trophies/trophy-capocannoniere.jpg",
  trophyPlGoldenBoot: "/images/trophies/trophy-pl-golden-boot.jpeg",

  // 4. Finals & Iconic
  finalChelsea2008: "/images/cr7/final-chelsea-2008.jpeg",
  finalBarca2011: "/images/cr7/final-barca-2011.jpeg",
  finalUcl2014: "/images/cr7/final-ucl-2014.webp",
  finalUcl2017: "/images/cr7/final-ucl-2017.jpeg",
  finalNationsLeague: "/images/cr7/final-nations-league-2025.jpeg",
  finalArab2023: "/images/cr7/final-arab-2023.webp",
  iconicBicycleJuve: "/images/cr7/iconic-bicycle-juve.jpg",
  iconicPorto40m: "/images/cr7/iconic-porto-40m.jpg",
  iconicCalmaCampNou: "/images/cr7/iconic-calma-camp-nou.webp",
  iconicFreekickPortsmouth: "/images/cr7/iconic-freekick-portsmouth.jpeg",
  iconicSwedenPlayoff: "/images/cr7/iconic-sweden-playoff.jpeg",
  iconicFreekickSpain: "/images/cr7/iconic-freekick-spain.webp",
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
  resetNextMatchToSchedule: () => void;
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

  // Load from localStorage on mount & listen to cross-tab storage events
  useEffect(() => {
    const loadFromStorage = () => {
      try {
        const savedGoals = localStorage.getItem("cr1000_goals_count");
        if (savedGoals) {
          const parsed = parseInt(savedGoals, 10);
          if (!isNaN(parsed) && parsed >= 985) setGoalsState(parsed);
        }

        const legacyPlaceholders = new Set([
          "/images/cr7/hero-cr7.jpg",
          "/images/cr7/era-madeira.jpg",
          "/images/cr7/era-manutd.jpg",
          "/images/cr7/era-juventus.jpg",
          "/images/cr7/era-portugal.jpg",
          "/images/cr7/final-chelsea.jpg",
          "/images/trophies/premier-league.png",
          "/images/trophies/premier-league.jpg",
          "/images/trophies/ucl.jpg",
          "/images/trophies/euro-trophy.jpg",
          "/images/trophies/golden-shoe.jpg",
          "/images/trophies/cr7-ballon-dor.jpg",
          "/images/trophies/ballon-dor.png",
        ]);

        const savedImages = localStorage.getItem("cr1000_custom_images");
        if (savedImages) {
          const parsed = JSON.parse(savedImages);
          let needsMigration = false;
          const cleaned: Record<string, string> = {};
          for (const [k, v] of Object.entries(parsed)) {
            const key = k as keyof CustomImages;
            if (typeof v === "string" && legacyPlaceholders.has(v) && defaultImages[key]) {
              cleaned[key] = defaultImages[key] as string;
              needsMigration = true;
            } else if (typeof v === "string" && v.trim() !== "") {
              cleaned[key] = v;
            }
          }
          const mergedImages = { ...defaultImages, ...cleaned };
          setImages(mergedImages);
          if (needsMigration) {
            localStorage.setItem("cr1000_custom_images", JSON.stringify(mergedImages));
          }
        }

        const savedShop = localStorage.getItem("cr1000_shop_items");
        if (savedShop) {
          const parsed = JSON.parse(savedShop);
          if (Array.isArray(parsed) && parsed.length > 0) {
            let shopModified = false;
            const defaultMap = new Map(defaultShopItems.map((d) => [d.id, d]));
            const migrated = parsed.map((item: ShopItem) => {
              const def = defaultMap.get(item.id);
              if (def && item.image && item.image.includes("images.unsplash.com")) {
                shopModified = true;
                return { ...item, image: def.image };
              }
              return item;
            });
            const existingIds = new Set(migrated.map((p: any) => p.id));
            const missing = defaultShopItems.filter((d) => !existingIds.has(d.id));
            const finalShop = missing.length > 0 ? [...migrated, ...missing] : migrated;
            setShopItems(finalShop);
            if (shopModified || missing.length > 0) {
              localStorage.setItem("cr1000_shop_items", JSON.stringify(finalShop));
            }
          }
        }

        const savedNextMatch = localStorage.getItem("cr1000_next_match");
        if (savedNextMatch) {
          const parsed = JSON.parse(savedNextMatch);
          // Check if saved match is stale / expired
          const isStale =
            !parsed ||
            !parsed.awayTeam ||
            parsed.awayTeam === "Al Shabab" ||
            (parsed.kickoffTime && parsed.kickoffTime.includes("2026-11-08")) ||
            (parsed.kickoffIso && new Date(parsed.kickoffIso).getTime() + 2.5 * 3600 * 1000 < Date.now());

          if (isStale) {
            const freshMatch = getUpcomingNextMatch("vi");
            setNextMatchState(freshMatch);
            localStorage.setItem("cr1000_next_match", JSON.stringify(freshMatch));
          } else {
            setNextMatchState((prev) => ({ ...prev, ...parsed }));
          }
        } else {
          const freshMatch = getUpcomingNextMatch("vi");
          setNextMatchState(freshMatch);
        }

        const savedShowFanVault = localStorage.getItem("cr1000_show_fan_vault");
        if (savedShowFanVault !== null) {
          setShowFanVaultState(savedShowFanVault === "true");
        }
      } catch (e) {}
    };

    loadFromStorage();

    // Listen to changes made in other tabs (e.g. from /admin tab to / home tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "cr1000_custom_images" && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setImages((prev) => ({ ...prev, ...parsed }));
        } catch (err) {}
      }
      if (e.key === "cr1000_goals_count" && e.newValue) {
        const parsed = parseInt(e.newValue, 10);
        if (!isNaN(parsed)) setGoalsState(parsed);
      }
      if (e.key === "cr1000_next_match" && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setNextMatchState((prev) => ({ ...prev, ...parsed }));
        } catch (err) {}
      }
      if (e.key === "cr1000_show_fan_vault" && e.newValue !== null) {
        setShowFanVaultState(e.newValue === "true");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
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
      } catch (e: any) {
        console.warn("Storage quota warning:", e);
        if (typeof window !== "undefined") {
          alert(
            "⚠️ Bộ nhớ trình duyệt tạm thời đầy do tải nhiều file ảnh quá nặng. Khuyến khích bạn dán đường dẫn link ảnh trực tiếp (từ Imgur, Cloudinary, ImgBB, Unsplash) để đảm bảo hình ảnh hiển thị siêu nhẹ và ổn định vĩnh viễn!"
          );
        }
      }
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

  const resetNextMatchToSchedule = () => {
    const fresh = getUpcomingNextMatch("vi");
    setNextMatchState(fresh);
    try {
      localStorage.setItem("cr1000_next_match", JSON.stringify(fresh));
    } catch (e) {}
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
        resetNextMatchToSchedule,
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
