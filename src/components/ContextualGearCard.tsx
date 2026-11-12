"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ShoppingBag, Star, ExternalLink, X, Sparkles, ShieldCheck } from "lucide-react";
import { getCr7ShopItems, ShopItem } from "@/data/cr7-shop";
import { JournalArticle } from "@/data/cr7-journal";
import { trackAffiliateClick } from "@/lib/track-affiliate";

interface ContextualGearCardProps {
  article: JournalArticle;
  language: "vi" | "en";
}

/**
 * Intelligent matcher that resolves the most contextual shop item
 * for a specific article based on keywords in title, slug, tags, or content.
 */
function findMatchingGear(article: JournalArticle, items: ShopItem[]): ShopItem {
  const textCorpus = `${article.slug} ${article.tags.join(" ")} ${article.titleVi} ${article.titleEn}`.toLowerCase();

  // 1. Portugal / Seleção / International matches
  if (
    textCorpus.includes("portugal") ||
    textCorpus.includes("bồ đào nha") ||
    textCorpus.includes("seleção") ||
    textCorpus.includes("nations league") ||
    textCorpus.includes("euro") ||
    textCorpus.includes("international")
  ) {
    const ptBoot = items.find((i) => i.id === "boots-mercurial-superfly-10-munich-2025");
    if (ptBoot) return ptBoot;
  }

  // 2. Al Nassr / Saudi Pro League matches
  if (
    textCorpus.includes("al-nassr") ||
    textCorpus.includes("al nassr") ||
    textCorpus.includes("saudi") ||
    textCorpus.includes("arab")
  ) {
    const alNassrJersey = items.find((i) => i.id === "jersey-al-nassr-home");
    if (alNassrJersey) return alNassrJersey;
  }

  // 3. Manchester United / Moscow matches
  if (
    textCorpus.includes("manchester") ||
    textCorpus.includes("mu") ||
    textCorpus.includes("moscow") ||
    textCorpus.includes("2008")
  ) {
    const muJersey = items.find((i) => i.id === "jersey-mu-2008-retro");
    if (muJersey) return muJersey;
  }

  // 4. Real Madrid / Cardiff / Turin matches
  if (
    textCorpus.includes("real madrid") ||
    textCorpus.includes("cardiff") ||
    textCorpus.includes("turin") ||
    textCorpus.includes("bicycle kick") ||
    textCorpus.includes("ngả bàn đèn")
  ) {
    const rmItem = items.find(
      (i) => i.id === "jersey-real-madrid-cardiff-2017" || i.id === "boots-mercurial-superfly-360-turin-2018"
    );
    if (rmItem) return rmItem;
  }

  // 5. Fallback: 1000 Goals Canvas or General Mercurial Boot
  return (
    items.find((i) => i.id === "poster-cr1000-metal") ||
    items.find((i) => i.id === "boots-nike-mercurial-superfly") ||
    items[0]
  );
}

export default function ContextualGearCard({ article, language }: ContextualGearCardProps) {
  const isVi = language === "vi";
  const items = getCr7ShopItems(language);
  const gear =
    (article.relatedProductId && items.find((i) => i.id === article.relatedProductId)) ||
    findMatchingGear(article, items);

  const [showFloatingBar, setShowFloatingBar] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [userMarket, setUserMarket] = useState<"VN" | "US">(isVi ? "VN" : "US");

  // Auto-detect user region or load user's chosen market
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cr1000_target_market");
      if (saved === "VN" || saved === "US") {
        setUserMarket(saved);
        return;
      }
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      if (tz.includes("Ho_Chi_Minh") || tz.includes("Saigon") || tz.includes("Bangkok") || tz.includes("Asia")) {
        setUserMarket("VN");
      } else {
        setUserMarket("US");
      }
    } catch (e) {}
  }, [isVi]);

  const activeAffiliateUrl =
    userMarket === "VN"
      ? gear.geoLinks?.VN?.url || gear.affiliateUrl
      : gear.geoLinks?.US?.url || gear.affiliateUrl;
  const activePlatform =
    userMarket === "VN"
      ? gear.geoLinks?.VN?.platform || gear.platform || "Shopee"
      : gear.geoLinks?.US?.platform || "Amazon";

  // Monitor scroll depth to show floating mini-bar (throttled via RAF)
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (isDismissed || ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0) {
          const scrollPercent = (scrollY / docHeight) * 100;
          // Show after 35% scroll, hide near very top or very bottom
          const shouldShow = scrollPercent > 35 && scrollPercent < 90;
          setShowFloatingBar((prev) => (prev !== shouldShow ? shouldShow : prev));
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  const recordInterest = () => {
    try {
      localStorage.setItem("cr1000_user_fav_category", gear.category);
    } catch (e) {}
  };

  return (
    <>
      {/* 1. In-Article Curated Gear Showcase Card */}
      <div className="my-10 p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#121626] via-[#0E101A] to-[#0A0C14] border border-[#D4AF37]/40 shadow-2xl relative overflow-hidden group">
        {/* Ambient gold glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#D4AF37]/15 transition-all" />

        {/* Header Label */}
        <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-800/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-[#D4AF37] block">
                {isVi ? "Kỷ vật gắn liền với cột mốc này" : "Curated Milestone Gear"}
              </span>
              <h4 className="text-sm font-bold text-gray-200">
                {isVi ? "Bộ sưu tập tuyển chọn cho Fan CR7" : "Authentic Collectibles for CR7 Fans"}
              </h4>
            </div>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 text-gray-400 border border-gray-800">
            <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
            {gear.platform}
          </span>
        </div>

        {/* Product Details Grid */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Product Thumbnail */}
          <div className="relative w-full sm:w-44 h-44 rounded-2xl overflow-hidden bg-black/40 border border-white/5 shrink-0">
            <Image
              src={gear.image}
              alt={gear.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, 176px"
            />
            {gear.badge && (
              <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-[#D4AF37] text-black shadow-md">
                {gear.badge}
              </span>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 text-center sm:text-left space-y-2.5">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-amber-400">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="font-bold font-mono text-white">{gear.rating}</span>
              <span className="text-gray-500 text-[11px]">
                ({gear.reviewsCount} {isVi ? "đánh giá" : "reviews"})
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
              {gear.name}
            </h3>

            <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
              {gear.description}
            </p>

            {/* Call to Action & Live Check */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span className="font-medium">
                  {isVi ? "Xem giá & voucher mới nhất tại sàn" : "Check live pricing & vouchers"}
                </span>
              </div>

              <a
                href={activeAffiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  recordInterest();
                  trackAffiliateClick(gear.id, activePlatform, "article_card");
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] hover:opacity-90 active:scale-95 text-black font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#D4AF37]/20"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>
                  {isVi ? `Xem chi tiết trên ${activePlatform}` : `View on ${activePlatform}`}
                </span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Floating Sticky Mini-Bar (Non-intrusive bottom pill) */}
      {showFloatingBar && !isDismissed && (
        <aside
          aria-label={isVi ? "Gợi ý kỷ vật liên quan" : "Related gear recommendation"}
          className="fixed bottom-5 right-4 sm:right-6 z-40 max-w-sm w-[calc(100%-2rem)] sm:w-auto bg-[#0E111B]/95 backdrop-blur-md border border-[#D4AF37]/50 rounded-2xl p-3 shadow-2xl shadow-black/80 animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-black shrink-0 border border-white/10">
              <Image
                src={gear.image}
                alt={gear.name}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>

            <div className="flex-1 min-w-0 pr-1">
              <span className="text-[10px] font-bold text-[#D4AF37] block truncate">
                {isVi ? "Kỷ vật liên quan bài viết" : "Related Milestone Gear"}
              </span>
              <p className="text-xs font-bold text-white truncate">{gear.name}</p>
              <span className="text-[11px] text-gray-400 block truncate">
                {isVi ? `Xem giá trên ${activePlatform}` : `Check on ${activePlatform}`}
              </span>
            </div>

            <a
              href={activeAffiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                recordInterest();
                trackAffiliateClick(gear.id, activePlatform, "article_floating_bar");
              }}
              className="px-3 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#F59E0B] text-black font-black text-xs shrink-0 flex items-center gap-1 shadow-md transition-all active:scale-95"
            >
              <span>{isVi ? "Xem" : "Buy"}</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={() => setIsDismissed(true)}
              aria-label={isVi ? "Đóng gợi ý" : "Close suggestion"}
              className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </aside>
      )}
    </>
  );
}
