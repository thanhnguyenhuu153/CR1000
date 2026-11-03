"use client";

import React, { useState } from "react";
import { cr7ShopItems, ShopItem } from "@/data/cr7-shop";
import { ShoppingBag, Star, ExternalLink, ShieldCheck, Tag } from "lucide-react";

export default function FanVaultStore() {
  const [filter, setFilter] = useState<"all" | "jersey" | "boots" | "lifestyle" | "memorabilia">("all");

  const filteredItems = cr7ShopItems.filter((item) => {
    if (filter === "all") return true;
    return item.category === filter;
  });

  return (
    <section id="shop" className="py-20 bg-[#08090C] relative border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181B24] border border-gray-800 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3">
            Bảo tàng Kỷ vật • Fan Vault Store
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Bộ Sưu Tập Kỷ Vật <span className="gold-gradient-text">CR7 Chính Hãng</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-400">
            Sở hữu các kỷ vật biểu tượng: từ chiếc áo đỏ tay dài đêm Moscow 2008, dòng giày Mercurial săn bàn tới những bức tranh tráng gương ghi dấu bàn thắng thứ 1.000.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
          {[
            { id: "all", label: "Tất Cả Sản Phẩm" },
            { id: "jersey", label: "Áo Đấu Biểu Tượng" },
            { id: "boots", label: "Giày Đá Bóng Mercurial" },
            { id: "lifestyle", label: "Nước Hoa & Thời Trang" },
            { id: "memorabilia", label: "Tranh & Kỷ Vật Sưu Tầm" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border ${
                filter === cat.id
                  ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20"
                  : "bg-[#141720] text-gray-300 border-gray-800 hover:border-gray-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#11131C] border border-gray-800 hover:border-[#D4AF37]/50 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Product Image Thumbnail */}
              <div className="relative h-56 w-full overflow-hidden bg-[#181B26]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#11131C] via-transparent to-transparent opacity-80" />

                {item.badge && (
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#D4AF37] text-black shadow-md">
                    {item.badge}
                  </span>
                )}

                <span className="absolute top-4 right-4 px-2.5 py-1 rounded-md text-[10px] font-bold bg-black/70 backdrop-blur-md text-gray-300 border border-gray-700">
                  {item.platform}
                </span>
              </div>

              {/* Product Content */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-amber-400 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="font-bold font-mono">{item.rating}</span>
                    <span className="text-gray-500">({item.reviewsCount} đánh giá)</span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 line-clamp-2 group-hover:text-[#F3C623] transition-colors">
                    {item.name}
                  </h3>

                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-base sm:text-lg font-black font-mono text-[#F3C623] block">
                      {item.priceText}
                    </span>
                    {item.originalPriceText && (
                      <span className="text-[11px] text-gray-500 line-through">
                        {item.originalPriceText}
                      </span>
                    )}
                  </div>

                  <a
                    href={item.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] hover:opacity-90 active:scale-95 text-black font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-[#D4AF37]/20"
                  >
                    <span>Xem ưu đãi</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust & Performance Note */}
        <div className="bg-[#11131A] border border-gray-800 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>
              Tất cả liên kết sản phẩm được tuyển chọn uy tín dành riêng cho người hâm mộ CR7. Giao dịch trực tiếp qua các sàn thương mại điện tử bảo đảm quyền lợi người mua.
            </span>
          </div>
          <span className="text-gray-500 text-[11px] shrink-0 font-mono">
            Zero-CLS • Không quảng cáo làm phiền
          </span>
        </div>
      </div>
    </section>
  );
}
