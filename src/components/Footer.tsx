"use client";

import React from "react";
import Link from "next/link";
import { Trophy, ArrowUp, Heart, Sparkles, Share2 } from "lucide-react";
import { useSiteData } from "@/context/SiteDataContext";
import { useLanguage } from "@/context/LanguageContext";
import { cr7CareerSummary } from "@/data/cr7-stats";

export default function Footer() {
  const { goals, showFanVault } = useSiteData();
  const { language, t } = useLanguage();
  const target = cr7CareerSummary.countdownTarget;
  const remaining = Math.max(0, target - goals);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: language === "vi" ? "CR1000 — Đếm ngược 1.000 Bàn thắng của Cristiano Ronaldo" : "CR1000 — Road to 1,000 Goals for Cristiano Ronaldo",
          text: language === "vi" ? "Khám phá bảo tàng số & hành trình chạm đỉnh 1.000 bàn thắng chính thức của CR7!" : "Explore the interactive digital museum & countdown to CR7's 1,000th goal!",
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(t.footer.shareSuccess);
    }
  };

  return (
    <footer className="bg-[#050608] border-t border-gray-900 pt-16 pb-12 text-gray-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid: FAQ for SEO & Quick Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-gray-900">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#991B1B] via-[#D4AF37] to-[#F59E0B] p-[2px]">
                <div className="w-full h-full bg-[#08090C] rounded-full flex items-center justify-center">
                  <span className="font-black text-xs text-[#FFF7D6] font-mono">CR7</span>
                </div>
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">CR1000</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30">
                {t.footer.brandTag}
              </span>
            </div>

            <p className="text-gray-400 leading-relaxed text-xs max-w-sm">
              {t.footer.brandDesc}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#141720] hover:bg-[#D4AF37] text-gray-300 hover:text-black font-bold border border-gray-800 transition-all text-xs cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{t.footer.shareBtn}</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">{t.footer.exploreTitle}</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/" className="hover:text-[#D4AF37] transition-colors">{t.nav.countdown}</Link></li>
              <li><Link href="/road-to-1000" className="hover:text-[#D4AF37] transition-colors text-amber-300 font-bold flex items-center gap-1.5"><span className="text-[#D4AF37]">✦</span> {language === "vi" ? "Nhật Ký Đường Tới 1000 Bàn (Mới)" : "Road to 1,000 Journal (New)"}</Link></li>
              <li><Link href="/hat-tricks" className="hover:text-[#D4AF37] transition-colors text-gray-300 font-semibold flex items-center gap-1.5"><span className="text-[#D4AF37]">✦</span> {language === "vi" ? "66+ Cú Hat-trick" : "66+ Hat-tricks"}</Link></li>
              <li><Link href="/trophies" className="hover:text-[#D4AF37] transition-colors text-gray-300 font-semibold flex items-center gap-1.5"><span className="text-[#D4AF37]">✦</span> {language === "vi" ? "37 Chiếc Cúp & Danh Hiệu" : "37 Career Trophies"}</Link></li>
              <li><Link href="/free-kicks" className="hover:text-[#D4AF37] transition-colors text-gray-300 font-semibold flex items-center gap-1.5"><span className="text-[#D4AF37]">✦</span> {language === "vi" ? "64+ Bàn Sút Phạt (Knuckleball)" : "64+ Free-kicks"}</Link></li>
              <li><a href="/#bio" className="hover:text-[#D4AF37] transition-colors">{t.nav.journey}</a></li>
              <li><a href="/#anatomy" className="hover:text-[#D4AF37] transition-colors">{t.nav.anatomy}</a></li>
              <li><a href="/#opponents" className="hover:text-[#D4AF37] transition-colors">{t.nav.opponents}</a></li>
              <li><a href="/#archive" className="hover:text-[#D4AF37] transition-colors">{t.nav.archive}</a></li>
              {showFanVault && (
                <li><a href="/#shop" className="hover:text-[#D4AF37] transition-colors">{t.nav.shop}</a></li>
              )}
              <li><Link href="/privacy" className="hover:text-[#D4AF37] transition-colors text-gray-400">{t.footer.privacyLink}</Link></li>
            </ul>
          </div>

          {/* Quick FAQ for SEO AI Overview */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">{t.footer.faqTitle}</h4>
            <div className="space-y-2.5">
              <div>
                <strong className="text-gray-300 block">{t.footer.faq1Q}</strong>
                <span className="text-gray-400 text-[11px]">
                  {language === "vi" ? (
                    <>Đã ghi <strong className="text-white font-mono">{goals}</strong> bàn thắng chính thức cấp CLB và ĐTQG (theo dữ liệu FIFA/IFFHS/RSSSF).</>
                  ) : (
                    <>Has scored <strong className="text-white font-mono">{goals}</strong> official goals for club and country (FIFA/IFFHS/RSSSF certified).</>
                  )}
                </span>
              </div>
              <div>
                <strong className="text-gray-300 block">{t.footer.faq2Q}</strong>
                <span className="text-gray-400 text-[11px]">
                  {language === "vi" ? (
                    <>Chỉ còn cách đúng <strong className="text-[#D4AF37] font-mono">{remaining}</strong> bàn thắng nữa để chạm cột mốc lịch sử {target.toLocaleString()} bàn.</>
                  ) : (
                    <>Needs only <strong className="text-[#D4AF37] font-mono">{remaining}</strong> more goals to achieve the historic {target.toLocaleString()}-goal summit.</>
                  )}
                </span>
              </div>
              <div>
                <strong className="text-gray-300 block">{t.footer.faq3Q}</strong>
                <span className="text-gray-500 text-[11px]">{t.footer.faq3A}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 text-center sm:text-left">
            <p className="text-gray-500 text-[11px]">
              © {new Date().getFullYear()} {t.footer.copyright}
            </p>
            <div className="flex items-center gap-3 text-[11px] text-gray-500">
              <Link href="/privacy" className="hover:text-[#D4AF37] transition-colors underline-offset-2 hover:underline">
                {language === "vi" ? "Chính sách bảo mật" : "Privacy Policy"}
              </Link>
              <span>•</span>
              <Link href="/privacy#terms" className="hover:text-[#D4AF37] transition-colors underline-offset-2 hover:underline">
                {language === "vi" ? "Điều khoản & Miễn trừ" : "Terms & Disclaimer"}
              </Link>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#11131A] hover:bg-[#1E2230] text-gray-300 border border-gray-800 transition-all text-xs shrink-0 cursor-pointer"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#D4AF37]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
