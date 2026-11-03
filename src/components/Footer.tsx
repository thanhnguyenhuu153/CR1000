"use client";

import React from "react";
import { Trophy, ArrowUp, Heart, Sparkles, Share2 } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "CR1000 — Đếm ngược 1.000 Bàn thắng của Cristiano Ronaldo",
          text: "Khám phá bảo tàng số & hành trình chạm đỉnh 1.000 bàn thắng chính thức của CR7!",
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Đã sao chép liên kết website CR1000 vào bộ nhớ tạm!");
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
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D4AF37]/20 text-[#F3C623] border border-[#D4AF37]/30">
                LIVING MUSEUM
              </span>
            </div>

            <p className="text-gray-400 leading-relaxed text-xs max-w-sm">
              Bảo tàng số và hệ thống theo dõi trực tiếp hành trình hướng tới cột mốc 1.000 bàn thắng chính thức chưa từng có của Cristiano Ronaldo. Tôn vinh kỷ luật, ý chí và những khoảnh khắc bất tử.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#141720] hover:bg-[#D4AF37] text-gray-300 hover:text-black font-bold border border-gray-800 transition-all text-xs"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Chia sẻ trang web</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Khám phá các chương</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#countdown" className="hover:text-[#F3C623] transition-colors">Đếm ngược bàn thứ 1000</a></li>
              <li><a href="#bio" className="hover:text-[#F3C623] transition-colors">Tiểu sử & Các kỷ nguyên</a></li>
              <li><a href="#anatomy" className="hover:text-[#F3C623] transition-colors">Bóc tách cỗ máy ghi bàn</a></li>
              <li><a href="#hattricks" className="hover:text-[#F3C623] transition-colors">66 Cú Hattrick & Poker</a></li>
              <li><a href="#opponents" className="hover:text-[#F3C623] transition-colors">Top con mồi ưa thích</a></li>
              <li><a href="#trophies" className="hover:text-[#F3C623] transition-colors">Phòng cúp & Kỷ lục Guinness</a></li>
              <li><a href="#archive" className="hover:text-[#F3C623] transition-colors">Bàn thắng chung kết & Mốc son</a></li>
              <li><a href="#shop" className="hover:text-[#F3C623] transition-colors">Kỷ vật & Quà tặng Fan</a></li>
            </ul>
          </div>

          {/* Quick FAQ for SEO AI Overview */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Câu hỏi thường gặp (FAQ)</h4>
            <div className="space-y-2.5">
              <div>
                <strong className="text-gray-300 block">Cristiano Ronaldo hiện ghi bao nhiêu bàn?</strong>
                <span className="text-gray-500 text-[11px]">Đã ghi 985 bàn thắng chính thức cấp CLB và ĐTQG (FIFA/IFFHS/RSSSF).</span>
              </div>
              <div>
                <strong className="text-gray-300 block">CR7 còn cách 1.000 bàn bao nhiêu bàn nữa?</strong>
                <span className="text-gray-500 text-[11px]">Chỉ còn cách 15 bàn thắng nữa để viết nên trang sử mới.</span>
              </div>
              <div>
                <strong className="text-gray-300 block">Nguồn dữ liệu có uy tín không?</strong>
                <span className="text-gray-500 text-[11px]">Dữ liệu được đối soát trực tiếp từ FIFA, UEFA, IFFHS, Transfermarkt và Sofascore.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-[11px] text-center sm:text-left">
            © {new Date().getFullYear()} CR1000 Digital Museum. Dự án phi lợi nhuận vinh danh sự nghiệp của Cristiano Ronaldo dos Santos Aveiro.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#11131A] hover:bg-[#1E2230] text-gray-300 border border-gray-800 transition-all text-xs"
          >
            <span>Về đầu trang</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#D4AF37]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
