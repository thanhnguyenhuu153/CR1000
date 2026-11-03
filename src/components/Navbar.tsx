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
    { name: "Đếm ngược 1000", href: "#countdown" },
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
          ? "bg-[#08090C]/90 backdrop-blur-md border-b border-[#232733]/80 py-3 shadow-2xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#countdown" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#991B1B] via-[#D4AF37] to-[#F59E0B] p-[2px] transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-[#08090C] rounded-full flex items-center justify-center">
              <span className="font-black text-sm tracking-tighter text-[#FFF7D6] font-mono">
                CR7
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-[#F3C623] transition-colors">
                CR1000
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-[#D4AF37]/20 text-[#F3C623] border border-[#D4AF37]/30">
                LIVE
              </span>
            </div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium hidden sm:block">
              Road to 1000 Goals
            </p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs uppercase tracking-wider font-semibold text-gray-300 hover:text-[#F3C623] transition-colors"
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
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-black hover:opacity-90 active:scale-95 transition-all shadow-md shadow-[#D4AF37]/20"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>SIUUU!</span>
          </button>

          {/* Language badge */}
          <div className="flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-[#161922] border border-[#2B313F] text-gray-300">
            <span className="text-[#F3C623]">🇻🇳 VI</span>
            <span className="text-gray-500 mx-1">|</span>
            <span className="text-gray-400 hover:text-white cursor-pointer" title="Sắp ra mắt phiên bản tiếng Anh">EN</span>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-[#161922] text-gray-300 hover:text-white border border-[#2B313F]"
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
                className="text-sm font-medium text-gray-300 hover:text-[#F3C623] py-1 border-b border-gray-800/50"
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
