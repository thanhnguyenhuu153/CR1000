"use client";

import React, { useState, useEffect } from "react";
import { Trophy, Flame, Sparkles, Menu, X, Share2, Volume2, VolumeX } from "lucide-react";
import confetti from "canvas-confetti";

export default function Navbar() {
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

  const handleCelebrate = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#D4AF37", "#E63946", "#FFFFFF", "#F59E0B"],
    });

    if (soundEnabled) {
      // Audio notification if enabled
      try {
        const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3");
        audio.play().catch(() => {});
      } catch (e) {
        // Audio error handling
      }
    }
  };

  const navLinks = [
    { name: "Đếm ngược", href: "#countdown" },
    { name: "Hành trình", href: "#bio" },
    { name: "Bóc tách chỉ số", href: "#anatomy" },
    { name: "Hattrick & Poker", href: "#hattricks" },
    { name: "Con mồi ưa thích", href: "#opponents" },
    { name: "Phòng truyền thống", href: "#trophies" },
    { name: "Chung kết & Mốc son", href: "#archive" },
    { name: "Kỷ vật Fan", href: "#shop" },
  ];

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
        <a href="#countdown" className="flex items-center gap-3 group">
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
                MUSEUM
              </span>
            </div>
            <p className="text-[9px] text-gray-400 uppercase tracking-[0.2em] font-medium hidden sm:block">
              Road to 1000 Goals
            </p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs uppercase tracking-wider font-semibold text-gray-300 hover:text-[#D4AF37] transition-colors whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Celebrate Button */}
          <button
            onClick={handleCelebrate}
            title="Ăn mừng phong cách SIUUU!"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#D4AF37] text-black hover:opacity-90 active:scale-95 transition-all shadow-md shadow-[#D4AF37]/20"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>SIUUU!</span>
          </button>

          {/* Language badge with pixel-perfect SVG flag */}
          <div className="flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-[#11131C] border border-white/10 text-gray-300 select-none">
            <div className="flex items-center gap-1.5 text-[#D4AF37] leading-none">
              <svg className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm" viewBox="0 0 512 512" aria-hidden="true">
                <circle cx="256" cy="256" r="256" fill="#DA251D" />
                <polygon
                  points="256,92 293.5,207.5 414.9,207.5 316.7,278.9 354.2,394.4 256,323 157.8,394.4 195.3,278.9 97.1,207.5 218.5,207.5"
                  fill="#FFFF00"
                />
              </svg>
              <span className="font-bold text-[11px] tracking-wider leading-none">VI</span>
            </div>
            <span className="text-gray-600 mx-1.5 text-[10px] leading-none">|</span>
            <span className="text-gray-400 hover:text-white cursor-pointer font-bold text-[11px] tracking-wider leading-none transition-colors" title="Sắp ra mắt phiên bản tiếng Anh">
              EN
            </span>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-[#11131C] text-gray-300 hover:text-white border border-white/10"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0D0F14]/98 border-b border-[#232733] px-5 py-4 transition-all">
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
                className="w-full py-2.5 rounded-lg text-xs font-bold bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-black flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Ăn mừng SIUUU! (Bắn pháo hoa)</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
