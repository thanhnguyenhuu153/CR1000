"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function EditorialStandardsBanner() {
  const { language } = useLanguage();
  const isVi = language === "vi";

  return (
    <section
      aria-label={isVi ? "Phương pháp Kiểm chứng & Tiêu chuẩn Biên tập" : "Data Verification & Editorial Standards"}
      className="py-10 sm:py-12 bg-[#08090C] border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-[#121625] via-[#0F121D] to-[#121625] border border-[#D4AF37]/25 p-5 sm:p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>
                  {isVi
                    ? "Phương pháp Kiểm chứng & Tiêu chuẩn Biên tập CR1000"
                    : "CR1000 Data Verification & Editorial Standards"}
                </span>
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed max-w-3xl">
                {isVi
                  ? "Mọi số liệu bàn thắng và bài phân tích trên cr1000.live chỉ ghi nhận các giải đấu chính thức cấp cao nhất (loại trừ giao hữu CLB & đội trẻ), được đối chiếu độc lập qua FIFA, UEFA, IFFHS, RSSSF và Transfermarkt."
                  : "Every goal tally and match report on cr1000.live covers official senior competitions only (excluding club friendlies & youth matches), cross-checked with FIFA, UEFA, IFFHS, RSSSF, and Transfermarkt."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-end lg:self-center">
            <Link
              href="/about"
              className="px-4 py-2 rounded-xl bg-[#1A1F30] hover:bg-[#232A40] text-white border border-white/10 text-xs font-bold transition-colors"
            >
              {isVi ? "Xem Phương pháp luận" : "Our Methodology"}
            </Link>
            <Link
              href="/road-to-1000"
              className="px-4 py-2 rounded-xl bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-bold transition-colors"
            >
              {isVi ? "Kho bài phân tích" : "Article Archive"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
