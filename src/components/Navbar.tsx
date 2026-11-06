"use client";

import React, { useState, useEffect } from "react";
import { Trophy, Flame, Sparkles, Menu, X, Share2, Volume2, VolumeX } from "lucide-react";
import { useSiteData } from "@/context/SiteDataContext";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const { showFanVault } = useSiteData();
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCelebrate = async () => {
    try {
      const confetti = (await import("canvas-confetti")).default;
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#D4AF37", "#E63946", "#FFFFFF", "#F59E0B"],
      });
    } catch (e) {}

    if (soundEnabled) {
      try {
        const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3");
        audio.play().catch(() => {});
      } catch (e) {}
    }
  };

  const navLinks = [
    { name: t.nav.countdown, href: "/#countdown" },
    { name: language === "vi" ? "Nhật Ký 1000 Bàn" : "Road to 1,000", href: "/road-to-1000", isNew: true },
    { name: t.nav.journey, href: "/#bio" },
    { name: t.nav.hattricks, href: "/hat-tricks" },
    { name: t.nav.trophies, href: "/trophies" },
    { name: language === "vi" ? "Sút Phạt" : "Free-kicks", href: "/free-kicks" },
    { name: t.nav.anatomy, href: "/#anatomy" },
    { name: t.nav.opponents, href: "/#opponents" },
    { name: t.nav.archive, href: "/#archive" },
    ...(showFanVault ? [{ name: t.nav.shop, href: "/#shop" }] : []),
  ];

  const LanguageSwitcher = ({ className = "" }: { className?: string }) => (
    <div
      className={`inline-flex items-center p-0.5 rounded-full bg-[#10131E] border border-white/10 shadow-inner select-none ${className}`}
      role="group"
      aria-label="Language selection"
    >
      {/* VI Button */}
      <button
        type="button"
        onClick={() => setLanguage("vi")}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold tracking-wider transition-all cursor-pointer ${
          language === "vi"
            ? "bg-[#D4AF37] text-black shadow-md shadow-[#D4AF37]/30 scale-105"
            : "text-gray-400 hover:text-white"
        }`}
        title="Tiếng Việt (Việt Nam)"
      >
        <svg className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm" viewBox="0 0 512 512" aria-hidden="true">
          <circle cx="256" cy="256" r="256" fill="#DA251D" />
          <polygon
            points="256,92 293.5,207.5 414.9,207.5 316.7,278.9 354.2,394.4 256,323 157.8,394.4 195.3,278.9 97.1,207.5 218.5,207.5"
            fill="#FFFF00"
          />
        </svg>
        <span>VI</span>
      </button>

      {/* EN Button */}
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold tracking-wider transition-all cursor-pointer ${
          language === "en"
            ? "bg-[#D4AF37] text-black shadow-md shadow-[#D4AF37]/30 scale-105"
            : "text-gray-400 hover:text-white"
        }`}
        title="English (United States)"
      >
        <svg className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm overflow-hidden" viewBox="0 0 512 512" aria-hidden="true">
          <circle cx="256" cy="256" r="256" fill="#fff" />
          <g fill="#B22234">
            <rect y="39.4" width="512" height="39.4" />
            <rect y="118.2" width="512" height="39.4" />
            <rect y="196.9" width="512" height="39.4" />
            <rect y="275.7" width="512" height="39.4" />
            <rect y="354.5" width="512" height="39.4" />
            <rect y="433.2" width="512" height="39.4" />
          </g>
          <rect width="204.8" height="275.7" fill="#3C3B6E" />
          <polygon points="102.4,90 109,110 130,110 113,122 120,142 102.4,130 85,142 92,122 75,110 96,110" fill="#ffffff" />
        </svg>
        <span>EN</span>
      </button>
    </div>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#08090C]/95 backdrop-blur-md border-b border-white/[0.08] py-3.5 shadow-2xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#996515] via-[#D4AF37] to-[#F5E6A3] p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-md shadow-[#D4AF37]/15">
            <div className="w-full h-full bg-[#08090C] rounded-full flex items-center justify-center">
              <span className="font-black text-xs tracking-wider text-[#D4AF37] font-mono">
                CR7
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-[#D4AF37] transition-colors">
                CR1000
              </span>
              <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 tracking-wider">
                {t.nav.museumTag}
              </span>
            </div>
            <p className="text-[10px] text-gray-400 font-mono tracking-widest hidden sm:block">
              ROAD TO 1000 GOALS
            </p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center space-x-6 text-xs font-semibold uppercase tracking-wider text-gray-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-[#D4AF37] transition-colors py-1 relative group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action Controls & Language Switcher */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* SIUUU Confetti Trigger Button */}
          <button
            onClick={handleCelebrate}
            title={language === "vi" ? "Ăn mừng phong cách SIUUU!" : "Celebrate with SIUUU!"}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#D4AF37] text-black hover:opacity-90 active:scale-95 transition-all shadow-md shadow-[#D4AF37]/20 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.nav.siuuu}</span>
          </button>

          {/* Dual Segment Language Switcher */}
          <LanguageSwitcher />

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg bg-[#11131C] text-gray-300 hover:text-white border border-white/10 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0D0F14]/98 border-b border-[#232733] px-5 py-4 transition-all">
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-gray-800">
            <span className="text-xs text-gray-400 uppercase font-semibold">
              {language === "vi" ? "Ngôn ngữ:" : "Language:"}
            </span>
            <LanguageSwitcher />
          </div>

          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-gray-300 hover:text-[#D4AF37] py-1 border-b border-gray-800/50"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2">
              <button
                onClick={() => {
                  handleCelebrate();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-lg text-xs font-bold bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-black flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>{language === "vi" ? "Ăn mừng SIUUU! (Bắn pháo hoa)" : "Celebrate SIUUU! (Fireworks)"}</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
