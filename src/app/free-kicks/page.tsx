"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { useSiteData } from "@/context/SiteDataContext";
import {
  cr7FreeKickSummary,
  getCr7IconicFreeKicks,
  cr7FreeKickFaqVi,
  cr7FreeKickFaqEn,
  FreeKickGoal,
} from "@/data/cr7-freekicks";
import {
  Zap,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Calendar,
  Gauge,
  Compass,
  Wind,
  Target,
} from "lucide-react";

export default function FreeKicksPage() {
  const { language } = useLanguage();
  const { images } = useSiteData();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Sync document title dynamically with active language
  useEffect(() => {
    document.title =
      language === "vi"
        ? "Tuyệt Kỹ Sút Phạt & 64+ Siêu Phẩm Knuckleball Của CR7 | CR1000"
        : "Cristiano Ronaldo: 64+ Career Free-kicks & Knuckleball Science | CR1000";
  }, [language]);

  const faqs = language === "vi" ? cr7FreeKickFaqVi : cr7FreeKickFaqEn;
  const iconicKicks = getCr7IconicFreeKicks(language);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: language === "vi" ? "Trang chủ CR1000" : "CR1000 Home",
            item: "https://www.cr1000.live",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: language === "vi" ? "64+ Bàn Thắng Sút Phạt Của Cristiano Ronaldo" : "Cristiano Ronaldo 64+ Career Free-kicks",
            item: "https://www.cr1000.live/free-kicks",
          },
        ],
      },
      {
        "@type": "FAQPage",
        inLanguage: language === "vi" ? "vi-VN" : "en-US",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.answer,
          },
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#08090C] text-[#F8FAFC]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 pb-16 relative overflow-hidden border-b border-white/[0.08]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#221710]/40 via-transparent to-[#08090C]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-[#D4AF37] mb-6 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>{language === "vi" ? "Quay lại Trang Chủ & Đếm ngược" : "Back to Home Countdown"}</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-black uppercase tracking-widest">
              {language === "vi" ? "CHUYÊN ĐỀ ĐẶC BIỆT • TUYỆT KỸ BÓNG ĐÁ" : "SPECIAL FEATURE • THE ICONIC SET-PIECE"}
            </span>
            <span className="text-xs text-gray-400 font-mono">THE LEGENDARY KNUCKLEBALL</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            {language === "vi" ? (
              <>
                Tuyệt Kỹ Sút Phạt & <span className="gold-gradient-text">64+ Siêu Phẩm Knuckleball</span> Của CR7
              </>
            ) : (
              <>
                Cristiano Ronaldo: <span className="gold-gradient-text">64+ Direct Free-kicks</span> & Knuckleball Science
              </>
            )}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed font-light">
            {language === "vi"
              ? "Khám phá vũ khí hủy diệt từng làm khiếp sợ mọi thủ môn trên thế giới: 64 bàn thắng sút phạt trực tiếp, giải mã vật lý khí động học cú sút Knuckleball và danh sách những siêu phẩm để đời."
              : "Discover the lethal set-piece weapon that redefined modern football: 64 official direct free-kick goals, aerodynamic knuckleball analysis, and iconic moments from Old Trafford to the Bernabeu."}
          </p>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
            <div className="p-5 rounded-2xl bg-[#0F121A]/90 border border-white/10 text-center">
              <span className="text-[11px] text-gray-400 uppercase font-semibold block">
                {language === "vi" ? "Tổng bàn thắng sút phạt" : "Total Free-kick Goals"}
              </span>
              <div className="text-3xl sm:text-4xl font-black font-mono text-white mt-1">
                {cr7FreeKickSummary.totalFreeKickGoals}
              </div>
              <span className="text-[10px] text-[#D4AF37] mt-1 block font-semibold">
                {language === "vi" ? "64 bàn chính thức" : "64 Official Goals"}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#0F121A]/90 border border-white/10 text-center">
              <span className="text-[11px] text-gray-400 uppercase font-semibold block">
                {language === "vi" ? "Cự ly xa nhất" : "Longest Distance"}
              </span>
              <div className="text-3xl sm:text-4xl font-black font-mono text-white mt-1">
                {cr7FreeKickSummary.longestDistanceMeters}m
              </div>
              <span className="text-[10px] text-gray-400 mt-1 block">
                vs Arsenal (2009)
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#0F121A]/90 border border-white/10 text-center">
              <span className="text-[11px] text-gray-400 uppercase font-semibold block">
                {language === "vi" ? "Tốc độ bóng tối đa" : "Peak Ball Velocity"}
              </span>
              <div className="text-3xl sm:text-4xl font-black font-mono text-white mt-1">
                {cr7FreeKickSummary.fastestSpeedKmh} <span className="text-base font-normal">km/h</span>
              </div>
              <span className="text-[10px] text-[#D4AF37] mt-1 block font-semibold">
                {language === "vi" ? "Nhanh như đạn bắn" : "Rocket strike"}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#0F121A]/90 border border-white/10 text-center">
              <span className="text-[11px] text-gray-400 uppercase font-semibold block">
                Real Madrid
              </span>
              <div className="text-3xl sm:text-4xl font-black font-mono text-white mt-1">
                {cr7FreeKickSummary.byTeam.realMadrid}
              </div>
              <span className="text-[10px] text-gray-400 mt-1 block">
                {language === "vi" ? "Nhiều bàn sút phạt nhất" : "Most for one club"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Free Kicks by Club Breakdown */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/[0.08]">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">
            {language === "vi" ? "PHÂN BỐ BÀN THẮNG" : "GOAL DISTRIBUTION"}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
            {language === "vi" ? "64 Bàn Thắng Sút Phạt Theo Màu Áo" : "Free-kicks Scored by Team"}
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { team: "Real Madrid", count: cr7FreeKickSummary.byTeam.realMadrid, desc: "2009–2018" },
            { team: "Man United", count: cr7FreeKickSummary.byTeam.manchesterUnited, desc: "2003–2009, 2021" },
            { team: language === "vi" ? "Bồ Đào Nha" : "Portugal", count: cr7FreeKickSummary.byTeam.portugal, desc: language === "vi" ? "2003–Nay" : "2003–Present" },
            { team: "Al Nassr", count: cr7FreeKickSummary.byTeam.alNassr, desc: language === "vi" ? "2023–Nay" : "2023–Present" },
            { team: "Juventus", count: cr7FreeKickSummary.byTeam.juventus, desc: "2018–2021" },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#0E1018] border border-white/10 text-center">
              <span className="text-xs font-bold text-gray-300 block">{item.team}</span>
              <span className="text-2xl font-black font-mono text-[#D4AF37] mt-1 block">
                {item.count}
              </span>
              <span className="text-[10px] text-gray-500 font-mono mt-0.5 block">{item.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Knuckleball Science & Physics Breakdown */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#121522] to-[#0B0D14] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="max-w-3xl">
            <span className="px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-black uppercase tracking-wider">
              {language === "vi" ? "KHOA HỌC THỂ THAO • BIỂU TƯỢNG CR7" : "SPORTS SCIENCE • THE CR7 TRADEMARK"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-4 tracking-tight">
              {language === "vi"
                ? "Giải Mã Vật Lý: Cú Sút Knuckleball 'Phi Trọng Lực' Của Ronaldo"
                : "The Aerodynamics of Cristiano Ronaldo's Knuckleball"}
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed mt-3 font-light">
              {language === "vi"
                ? "Khác với cú cứa lòng xoáy truyền thống (Magnus Effect), kỹ thuật Knuckleball đòi hỏi lực tác động cực đại vào chính diện tâm bóng (ngay vị trí van khí) với thời gian tiếp xúc cực ngắn. Kết quả là quả bóng bay vút đi ở tốc độ 100+ km/h với độ xoáy gần như bằng 0 (Zero-spin)."
                : "Unlike traditional curling free-kicks governed by the Magnus effect, the knuckleball strike transfers massive kinetic energy directly through the ball's center of gravity with near-zero rotation."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-white/10">
            <div className="p-4 rounded-2xl bg-[#08090C]/80 border border-white/10">
              <Compass className="w-6 h-6 text-[#D4AF37] mb-2" />
              <h3 className="text-sm font-bold text-white">
                {language === "vi" ? "1. Tư Thế Chân Chữ V" : "1. The Iconic Stance"}
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                {language === "vi"
                  ? "Ronaldo lùi đúng 5 bước, dạng hai chân tạo thành hình chữ V vững chãi, hít một hơi sâu để ổn định nhịp tim và tập trung 100% thị giác vào khung thành."
                  : "5 strides back, feet spread wide in a resolute V-stance, inhaling deeply to lower heart rate and laser-focus on the target."}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#08090C]/80 border border-white/10">
              <Target className="w-6 h-6 text-[#D4AF37] mb-2" />
              <h3 className="text-sm font-bold text-white">
                {language === "vi" ? "2. Điểm Chạm Van Bóng" : "2. The Air Valve Impact"}
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                {language === "vi"
                  ? "Tiếp xúc bằng phần xương cứng nhất của mu bàn chân ngay tại van bóng, triệt tiêu mọi lực ma sát gây xoáy, khóa chặt cổ chân để truyền 100% động năng."
                  : "Impact is delivered through the hardest bone of the instep directly upon the valve, locking the ankle rigid to eliminate sideways rotation."}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#08090C]/80 border border-white/10">
              <Wind className="w-6 h-6 text-[#D4AF37] mb-2" />
              <h3 className="text-sm font-bold text-white">
                {language === "vi" ? "3. Hỗn Loạn Khí Động Học" : "3. Aerodynamic Chaos"}
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                {language === "vi"
                  ? "Khi quả bóng phi với vận tốc 100+ km/h mà không xoay, các túi khí không đối xứng xung quanh bóng xé rách quỹ đạo, khiến bóng đổi hướng đột ngột và cắm thẳng xuống đất."
                  : "At 100+ km/h with zero spin, asymmetric boundary air layers induce turbulent vortex shedding, forcing sudden lateral swerves and late dips."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Iconic Free-kicks Showcase */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">
            {language === "vi" ? "BỘ SƯU TẬP SIÊU PHẨM" : "ICONIC FREE-KICK SHOWCASE"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            {language === "vi" ? "Những Cú Sút Phạt Đi Vào Lịch Sử" : "Iconic Career Free-kicks"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {iconicKicks.map((fk) => {
            const dynamicImg =
              fk.id === "fk-portsmouth-2008"
                ? images.iconicFreekickPortsmouth || fk.imageUrl
                : fk.id === "fk-spain-2018"
                ? images.iconicFreekickSpain || fk.imageUrl
                : fk.imageUrl;

            return (
              <div
                key={fk.id}
                className="bg-[#0F121A]/90 border border-white/10 hover:border-[#D4AF37]/50 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                {dynamicImg && (
                  <div className="relative h-48 w-full overflow-hidden border-b border-white/10">
                    <Image
                      src={dynamicImg}
                      alt={`${fk.team} vs ${fk.opponent}`}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F121A] via-transparent to-black/20" />
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] mb-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 font-bold uppercase font-mono">
                        {fk.technique.toUpperCase()}
                      </span>
                      <span className="text-gray-400 font-mono flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#D4AF37]" />
                        {fk.date}
                      </span>
                    </div>

                    <h3 className="text-lg font-extrabold text-white group-hover:text-[#D4AF37] transition-colors">
                      {fk.team} vs {fk.opponent}
                    </h3>
                    <div className="text-xs font-mono font-bold text-[#D4AF37] mt-0.5">
                      {fk.competition} • {language === "vi" ? "Tỷ số" : "Score"}: {fk.matchScore}
                    </div>

                    <p className="text-xs text-gray-300 leading-relaxed mt-3">
                      {fk.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-5 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                    <span className="text-gray-400 flex items-center gap-1">
                      <Target className="w-3.5 h-3.5 text-[#D4AF37]" />
                      {language === "vi" ? "Cự ly:" : "Distance:"} <strong className="text-white">{fk.distanceMeters}m</strong>
                    </span>
                    {fk.speedKmh && (
                      <span className="text-gray-400 flex items-center gap-1">
                        <Gauge className="w-3.5 h-3.5 text-[#D4AF37]" />
                        {language === "vi" ? "Tốc độ:" : "Speed:"} <strong className="text-[#D4AF37]">{fk.speedKmh} km/h</strong>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SEO FAQ Section */}
      <section className="py-16 bg-[#0B0D13] border-t border-white/[0.08]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              {language === "vi" ? "FAQ • CÂU HỎI THƯỜNG GẶP" : "FAQ • FREQUENTLY ASKED QUESTIONS"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
              {language === "vi" ? "Hỏi Đáp Về Tuyệt Kỹ Sút Phạt Của CR7" : "Cristiano Ronaldo Free-kicks FAQ"}
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-[#111420] border border-white/10 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02]"
                  >
                    <span className="text-sm sm:text-base font-bold text-white leading-snug">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#D4AF37] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/5">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
