"use client";

import React, { useState, useEffect } from "react";
import { Share2, X, Copy, Check, MessageCircle, Send, Globe, Sparkles } from "lucide-react";
import { useSiteData } from "@/context/SiteDataContext";
import { useLanguage } from "@/context/LanguageContext";
import { cr7CareerSummary } from "@/data/cr7-stats";

export default function FloatingShareButton() {
  const { goals } = useSiteData();
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("https://www.cr1000.live");

  const target = cr7CareerSummary.countdownTarget;
  const remaining = Math.max(0, target - goals);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const shareCaptionVi = `🔥 Cristiano Ronaldo hiện đã đạt ${goals} bàn thắng chính thức! Chỉ còn đúng ${remaining} bàn nữa để chạm cột mốc lịch sử 1.000 bàn thắng vĩ đại. Cùng tôi theo dõi đồng hồ đếm ngược trực tiếp tại: ${currentUrl}`;
  const shareCaptionEn = `🔥 Cristiano Ronaldo has reached ${goals} official career goals! Only ${remaining} goals away from the historic 1,000 summit. Follow the live countdown with me at: ${currentUrl}`;

  const currentCaption = language === "vi" ? shareCaptionVi : shareCaptionEn;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentCaption);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      // fallback
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "CR1000 — Đếm ngược 1.000 Bàn thắng của Cristiano Ronaldo",
          text: currentCaption,
          url: currentUrl,
        });
        setIsOpen(false);
      } catch (e) {}
    } else {
      handleCopy();
    }
  };

  const shareToFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(currentCaption)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const shareToX = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(currentCaption)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const shareToZalo = () => {
    window.open(
      `https://sp.zalo.me/plugins/share?url=${encodeURIComponent(currentUrl)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const shareToTelegram = () => {
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(currentCaption)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const shareToWhatsApp = () => {
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(currentCaption)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <>
      {/* Floating Trigger Button: Minimal & Compact */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 print:hidden">
        <button
          onClick={() => setIsOpen(true)}
          title={language === "vi" ? "Chia sẻ đồng hồ đếm ngược CR1000" : "Share CR1000 Countdown"}
          className="group relative flex items-center gap-2 p-3 sm:px-4 sm:py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-black font-extrabold text-xs shadow-xl shadow-[#D4AF37]/25 hover:shadow-2xl hover:shadow-[#D4AF37]/40 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/40"
          aria-label="Share"
        >
          <Share2 className="w-4 h-4 text-black group-hover:rotate-12 transition-transform duration-300" />
          <span className="hidden sm:inline tracking-wider uppercase text-[11px] font-black">
            {language === "vi" ? "Chia sẻ" : "Share"}
          </span>
          {/* Subtle pulse ping */}
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#996515]" />
          </span>
        </button>
      </div>

      {/* Share Modal Dialog */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-[#0F121A] border border-white/15 rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white tracking-tight">
                    {language === "vi" ? "Lan tỏa cột mốc CR1000" : "Spread the Road to 1,000"}
                  </h3>
                  <p className="text-[11px] text-gray-400">
                    {language === "vi" ? "1-Click chia sẻ tới bạn bè & hội fan CR7" : "1-Click share with football fans worldwide"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Live Goal Status Card */}
            <div className="my-5 p-4 rounded-2xl bg-gradient-to-br from-[#151926] to-[#0A0C12] border border-[#D4AF37]/30 relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/35 text-[10px] font-black uppercase tracking-wider">
                  CR1000 LIVE COUNTDOWN
                </span>
                <span className="text-[10px] text-gray-400 font-mono">cr1000.live</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black font-mono text-white tracking-tight">{goals}</span>
                <span className="text-sm font-bold text-gray-400 font-mono">/ 1,000 {language === "vi" ? "bàn" : "goals"}</span>
              </div>
              <p className="text-xs text-[#D4AF37] font-semibold mt-1">
                {language === "vi" ? `Chỉ còn ${remaining} bàn thắng nữa!` : `Only ${remaining} goals away from history!`}
              </p>
            </div>

            {/* Caption Text Box */}
            <div className="space-y-2 mb-5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 flex items-center justify-between">
                <span>{language === "vi" ? "Lời dẫn hấp dẫn" : "Share Caption"}</span>
                <button
                  onClick={handleCopy}
                  className="text-[#D4AF37] hover:underline flex items-center gap-1 normal-case font-semibold text-xs cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-green-400">{language === "vi" ? "Đã chép!" : "Copied!"}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{language === "vi" ? "Sao chép" : "Copy"}</span>
                    </>
                  )}
                </button>
              </label>
              <div className="p-3 rounded-xl bg-[#08090C] border border-white/10 text-xs text-gray-300 leading-relaxed max-h-24 overflow-y-auto font-sans select-all">
                {currentCaption}
              </div>
            </div>

            {/* Social Share Grid */}
            <div className="grid grid-cols-5 gap-2 pt-1">
              {/* Facebook */}
              <button
                onClick={shareToFacebook}
                title="Chia sẻ lên Facebook"
                className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-[#1877F2]/10 hover:bg-[#1877F2]/25 text-[#1877F2] border border-[#1877F2]/30 transition-all cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-full bg-[#1877F2] text-white flex items-center justify-center font-black text-sm group-hover:scale-110 transition-transform">
                  f
                </div>
                <span className="text-[10px] font-bold text-gray-300">Facebook</span>
              </button>

              {/* X / Twitter */}
              <button
                onClick={shareToX}
                title="Chia sẻ lên X (Twitter)"
                className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-white border border-white/20 transition-all cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-full bg-black border border-white/40 text-white flex items-center justify-center font-black text-xs group-hover:scale-110 transition-transform">
                  𝕏
                </div>
                <span className="text-[10px] font-bold text-gray-300">Twitter</span>
              </button>

              {/* Zalo */}
              <button
                onClick={shareToZalo}
                title="Chia sẻ qua Zalo"
                className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-[#0068FF]/10 hover:bg-[#0068FF]/25 text-[#0068FF] border border-[#0068FF]/30 transition-all cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-full bg-[#0068FF] text-white flex items-center justify-center font-black text-[11px] group-hover:scale-110 transition-transform">
                  Z
                </div>
                <span className="text-[10px] font-bold text-gray-300">Zalo</span>
              </button>

              {/* Telegram */}
              <button
                onClick={shareToTelegram}
                title="Chia sẻ qua Telegram"
                className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-[#229ED9]/10 hover:bg-[#229ED9]/25 text-[#229ED9] border border-[#229ED9]/30 transition-all cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-full bg-[#229ED9] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Send className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-bold text-gray-300">Telegram</span>
              </button>

              {/* WhatsApp */}
              <button
                onClick={shareToWhatsApp}
                title="Chia sẻ qua WhatsApp"
                className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/30 transition-all cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-full bg-[#25D366] text-white flex items-center justify-center font-bold text-xs group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-bold text-gray-300">WhatsApp</span>
              </button>
            </div>

            {/* Native Mobile Share Button */}
            {typeof navigator !== "undefined" && typeof navigator.share === "function" && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <button
                  onClick={handleNativeShare}
                  className="w-full py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#F3E5AB] text-black font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Globe className="w-4 h-4" />
                  <span>{language === "vi" ? "Mở menu chia sẻ của thiết bị" : "Open device share menu"}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
