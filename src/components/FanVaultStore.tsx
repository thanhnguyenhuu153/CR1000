"use client";

import React, { useState, useEffect } from "react";
import { getCr7ShopItems, ShopItem } from "@/data/cr7-shop";
import { useLanguage } from "@/context/LanguageContext";
import { trackAffiliateClick } from "@/lib/track-affiliate";
import {
  ShoppingBag,
  Star,
  ExternalLink,
  ShieldCheck,
  Tag,
  Settings,
  Plus,
  Trash2,
  Edit2,
  X,
  Check,
  Copy,
  RotateCcw,
  Sparkles,
} from "lucide-react";

export default function FanVaultStore() {
  const { language, t } = useLanguage();
  const [filter, setFilter] = useState<"all" | "jersey" | "boots" | "lifestyle" | "memorabilia">("all");
  const [targetMarket, setTargetMarket] = useState<"VN" | "US">(() => (language === "vi" ? "VN" : "US"));
  const [userFavCategory, setUserFavCategory] = useState<string | null>(null);
  const [items, setItems] = useState<ShopItem[]>(() => getCr7ShopItems(language === "vi" ? "vi" : "en"));
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [editingItem, setEditingItem] = useState<ShopItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Sync market with language initially, or load saved preference
  useEffect(() => {
    try {
      const savedCategory = localStorage.getItem("cr1000_user_fav_category");
      if (savedCategory) {
        setUserFavCategory(savedCategory);
      }
      const savedMarket = localStorage.getItem("cr1000_target_market") as "VN" | "US" | null;
      if (savedMarket) {
        setTargetMarket(savedMarket);
      } else {
        setTargetMarket(language === "vi" ? "VN" : "US");
      }
    } catch (e) {}
  }, [language]);

  // Load customized items or fallback to market-specific items
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cr1000_shop_items");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setItems(parsed);
          return;
        }
      }
    } catch (e) {}
    setItems(getCr7ShopItems(targetMarket === "VN" ? "vi" : "en"));
  }, [targetMarket, language]);

  const handleMarketChange = (market: "VN" | "US") => {
    setTargetMarket(market);
    try {
      localStorage.setItem("cr1000_target_market", market);
    } catch (e) {}
  };

  const handleFilterChange = (catId: "all" | "jersey" | "boots" | "lifestyle" | "memorabilia") => {
    setFilter(catId);
    if (catId !== "all") {
      try {
        localStorage.setItem("cr1000_user_fav_category", catId);
        setUserFavCategory(catId);
      } catch (e) {}
    }
  };

  const saveItems = (newItems: ShopItem[]) => {
    setItems(newItems);
    try {
      localStorage.setItem("cr1000_shop_items", JSON.stringify(newItems));
    } catch (e) {}
  };

  const handleAddNew = () => {
    setEditingItem({
      id: "shop-" + Date.now(),
      name: "",
      category: "jersey",
      priceText: "",
      originalPriceText: "",
      badge: language === "vi" ? "Mới" : "New",
      description: "",
      image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=600&auto=format&fit=crop",
      affiliateUrl: "https://shopee.vn/",
      platform: "Shopee",
      rating: 5.0,
      reviewsCount: 1,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (item: ShopItem) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm(language === "vi" ? "Bạn có chắc chắn muốn xóa sản phẩm này khỏi danh sách?" : "Are you sure you want to remove this item?")) {
      const updated = items.filter((item) => item.id !== id);
      saveItems(updated);
    }
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    const exists = items.some((item) => item.id === editingItem.id);
    let updated: ShopItem[];
    if (exists) {
      updated = items.map((item) => (item.id === editingItem.id ? editingItem : item));
    } else {
      updated = [editingItem, ...items];
    }

    saveItems(updated);
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleResetDefault = () => {
    if (confirm(language === "vi" ? "Khôi phục danh sách sản phẩm về cài đặt gốc ban đầu?" : "Reset product list to defaults?")) {
      const defaultItems = getCr7ShopItems(language);
      saveItems(defaultItems);
      localStorage.removeItem("cr1000_shop_items");
    }
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(items, null, 2));
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  const filteredItems = items
    .filter((item) => {
      if (filter === "all") return true;
      return item.category === filter;
    })
    .sort((a, b) => {
      // Behavior-driven sorting: If user demonstrated interest in a category, rank those items first
      if (filter === "all" && userFavCategory) {
        if (a.category === userFavCategory && b.category !== userFavCategory) return -1;
        if (b.category === userFavCategory && a.category !== userFavCategory) return 1;
      }
      return 0;
    });

  return (
    <section id="shop" className="py-28 sm:py-36 bg-[#08090C] relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 relative">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#121520] border border-[#D4AF37]/25 text-[#D4AF37] text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">
            {t.shop.chapterBadge}
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-tight">
            {t.shop.title} <span className="gold-gradient-text">{t.shop.titleGold}</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-400 font-light leading-relaxed">
            {t.shop.subtitle}
          </p>

          {/* Admin Mode Toggle */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={() => setIsAdminMode(!isAdminMode)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border flex items-center gap-1.5 ${
                isAdminMode
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-lg shadow-amber-500/20"
                  : "bg-[#141720] text-gray-400 border-gray-800 hover:text-white hover:border-gray-700"
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>{isAdminMode ? (language === "vi" ? "Đang bật chế độ Quản trị (Admin On)" : "Admin Mode (ON)") : (language === "vi" ? "Bật chế độ Quản trị / Sửa sản phẩm" : "Admin Mode / Edit Items")}</span>
            </button>

            {isAdminMode && (
              <>
                <button
                  onClick={handleAddNew}
                  className="px-3 py-1.5 rounded-full bg-[#D4AF37] text-black text-xs font-bold flex items-center gap-1 hover:opacity-90"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{language === "vi" ? "+ Thêm sản phẩm" : "+ Add Item"}</span>
                </button>
                <button
                  onClick={handleCopyJSON}
                  className="px-3 py-1.5 rounded-full bg-[#181B24] border border-gray-700 text-gray-300 hover:text-white text-xs font-bold flex items-center gap-1"
                  title={language === "vi" ? "Sao chép toàn bộ danh sách sản phẩm dạng JSON" : "Copy full product list as JSON"}
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedNotification ? (language === "vi" ? "Đã copy!" : "Copied!") : (language === "vi" ? "Copy mã JSON" : "Copy JSON")}</span>
                </button>
                <button
                  onClick={handleResetDefault}
                  className="p-1.5 rounded-full bg-[#181B24] border border-gray-700 text-gray-400 hover:text-red-400 text-xs"
                  title={language === "vi" ? "Khôi phục mặc định" : "Reset to default"}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Dynamic Market & Geo Selection Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
            {language === "vi" ? "Sàn phân phối:" : "Store Platform:"}
          </span>
          <button
            onClick={() => handleMarketChange("VN")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border flex items-center gap-1.5 cursor-pointer ${
              targetMarket === "VN"
                ? "bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-300 border-orange-500/60 shadow-lg shadow-orange-500/20"
                : "bg-[#10131E] text-gray-400 border-gray-800 hover:text-white hover:border-gray-700"
            }`}
          >
            <span>🇻🇳</span>
            <span>Shopee Việt Nam</span>
          </button>
          <button
            onClick={() => handleMarketChange("US")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border flex items-center gap-1.5 cursor-pointer ${
              targetMarket === "US"
                ? "bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-300 border-amber-500/60 shadow-lg shadow-amber-500/20"
                : "bg-[#10131E] text-gray-400 border-gray-800 hover:text-white hover:border-gray-700"
            }`}
          >
            <span>🇺🇸</span>
            <span>Amazon US / Global</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
          {[
            { id: "all", label: t.shop.filterAll },
            { id: "jersey", label: t.shop.filterJersey },
            { id: "boots", label: t.shop.filterBoots },
            { id: "lifestyle", label: t.shop.filterLifestyle },
            { id: "memorabilia", label: t.shop.filterMemorabilia },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleFilterChange(cat.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border cursor-pointer ${
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
          {filteredItems.map((item) => {
            const activeAffiliateUrl =
              targetMarket === "VN"
                ? item.geoLinks?.VN?.url || item.affiliateUrl
                : item.geoLinks?.US?.url || item.affiliateUrl;
            const activePlatform =
              targetMarket === "VN"
                ? item.geoLinks?.VN?.platform || item.platform || "Shopee"
                : item.geoLinks?.US?.platform || "Amazon";

            return (
              <div
                key={item.id}
                className="bg-[#11131C] border border-gray-800 hover:border-[#D4AF37]/50 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 flex flex-col justify-between group relative"
              >
                {/* Admin Actions Overlay Buttons */}
                {isAdminMode && (
                  <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-black/80 backdrop-blur-md p-1.5 rounded-xl border border-gray-700">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-1.5 rounded-lg bg-[#222736] hover:bg-[#D4AF37] text-gray-300 hover:text-black transition-all"
                      title={language === "vi" ? "Chỉnh sửa sản phẩm này" : "Edit this item"}
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 rounded-lg bg-red-900/40 hover:bg-red-600 text-red-300 hover:text-white transition-all"
                      title={language === "vi" ? "Xóa sản phẩm này" : "Delete this item"}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Product Image Thumbnail */}
                <div className="relative h-56 w-full overflow-hidden bg-[#181B26]">
                  <img
                    src={item.image}
                    alt={item.name}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11131C] via-transparent to-transparent opacity-80" />

                  {item.badge && (
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#D4AF37] text-black shadow-md">
                      {item.badge}
                    </span>
                  )}

                  {filter === "all" && item.category === userFavCategory && (
                    <span className="absolute bottom-3 left-4 px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-black/80 text-amber-300 border border-amber-500/50 backdrop-blur-md">
                      ★ {language === "vi" ? "Theo sở thích của bạn" : "Matched for you"}
                    </span>
                  )}

                  {!isAdminMode && (
                    <span className="absolute top-4 right-4 px-2.5 py-1 rounded-md text-[10px] font-bold bg-black/70 backdrop-blur-md text-gray-300 border border-gray-700">
                      {activePlatform}
                    </span>
                  )}
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
                      <span className="text-gray-500">({item.reviewsCount} {language === "vi" ? "đánh giá" : "reviews"})</span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-2 line-clamp-2 group-hover:text-[#D4AF37] transition-colors">
                      {item.name}
                    </h3>

                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-800/80 flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-medium flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{language === "vi" ? "Xem ưu đãi sàn" : "Live platform deals"}</span>
                    </span>

                    <a
                      href={activeAffiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackAffiliateClick(item.id, activePlatform, "fanvault_store")}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] hover:opacity-90 active:scale-95 text-black font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-[#D4AF37]/20"
                    >
                      <span>{t.shop.buyNow} ({activePlatform})</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust & Performance Note */}
        <div className="bg-[#0F121A]/80 border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0" />
            <span>
              {language === "vi"
                ? "Tất cả liên kết sản phẩm được tuyển chọn uy tín dành riêng cho người hâm mộ CR7. Giao dịch trực tiếp qua các sàn thương mại điện tử bảo đảm quyền lợi người mua."
                : "All product links are curated for CR7 supporters. Transactions take place directly on authorized commerce platforms ensuring full buyer protection."}
            </span>
          </div>
          <span className="text-gray-500 text-[11px] shrink-0 font-mono">
            {language === "vi" ? "Trải nghiệm mượt mà • Không quảng cáo pop-up" : "Smooth Experience • No Pop-up Ads"}
          </span>
        </div>
      </div>

      {/* Admin Edit/Add Modal */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#12141D] border border-[#D4AF37]/50 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 rounded-full bg-gray-800"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5 text-[#D4AF37]" />
              <span>
                {editingItem.id.startsWith("shop-")
                  ? (language === "vi" ? "Thêm Sản Phẩm Mới" : "Add New Item")
                  : (language === "vi" ? "Chỉnh Sửa Sản Phẩm" : "Edit Item")}
              </span>
            </h3>

            <form onSubmit={handleSaveModal} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-bold mb-1">
                  {language === "vi" ? "Tên sản phẩm:" : "Product Name:"}
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="w-full bg-[#181B26] border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                  placeholder={language === "vi" ? "Ví dụ: Áo đấu Al Nassr Home Vàng #7..." : "e.g. Al Nassr Home Yellow #7 Kit..."}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">
                    {language === "vi" ? "Danh mục:" : "Category:"}
                  </label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as any })}
                    className="w-full bg-[#181B26] border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="jersey">{language === "vi" ? "Áo đấu biểu tượng" : "Iconic Kits"}</option>
                    <option value="boots">{language === "vi" ? "Giày đá bóng Mercurial" : "Mercurial Boots"}</option>
                    <option value="lifestyle">{language === "vi" ? "Nước hoa & Thời trang" : "Lifestyle & Fragrance"}</option>
                    <option value="memorabilia">{language === "vi" ? "Tranh & Kỷ vật sưu tầm" : "Memorabilia & Collectibles"}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">
                    {language === "vi" ? "Sàn thương mại:" : "Platform:"}
                  </label>
                  <select
                    value={editingItem.platform}
                    onChange={(e) => setEditingItem({ ...editingItem, platform: e.target.value as any })}
                    className="w-full bg-[#181B26] border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Shopee">Shopee</option>
                    <option value="Lazada">Lazada</option>
                    <option value="Nike">Nike</option>
                    <option value="Unisport">Unisport</option>
                    <option value="Amazon">Amazon</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">
                    {language === "vi" ? "Giá bán hiển thị:" : "Display Price:"}
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.priceText}
                    onChange={(e) => setEditingItem({ ...editingItem, priceText: e.target.value })}
                    className="w-full bg-[#181B26] border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                    placeholder={language === "vi" ? "390.000₫ – 750.000₫" : "$45 – $85"}
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">
                    {language === "vi" ? "Giá gốc (gạch ngang):" : "Original Price (strike):"}
                  </label>
                  <input
                    type="text"
                    value={editingItem.originalPriceText || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, originalPriceText: e.target.value })}
                    className="w-full bg-[#181B26] border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                    placeholder={language === "vi" ? "1.200.000₫ (tùy chọn)" : "$120 (optional)"}
                  />
                </div>
              </div>

              {/* Dynamic Multi-Market Geo Links */}
              <div className="bg-[#0B0D15] p-3.5 rounded-2xl border border-[#D4AF37]/30 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-gray-200 font-bold flex items-center gap-1.5 text-xs">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>
                      {language === "vi"
                        ? "Link Tiếp thị liên kết Đa Quốc Gia (Dynamic Geo-Links):"
                        : "Dynamic Geo-Affiliate Links:"}
                    </span>
                  </label>
                  <span className="text-[10px] text-amber-400 font-semibold bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                    {language === "vi" ? "Tự động nhận diện User" : "Auto Geo-Routed"}
                  </span>
                </div>

                {/* VN */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-gray-300 font-semibold text-xs flex items-center gap-1.5">
                      <span>🇻🇳</span>
                      <span>{language === "vi" ? "Link Shopee (Việt Nam) (*):" : "Shopee Vietnam Link (*):"}</span>
                    </label>
                    <span className="text-[10px] text-gray-500 font-mono">
                      {language === "vi" ? "Khách tại VN" : "For VN Visitors"}
                    </span>
                  </div>
                  <input
                    type="url"
                    required
                    value={
                      editingItem.geoLinks?.VN?.url ||
                      (editingItem.platform === "Shopee" ? editingItem.affiliateUrl : "")
                    }
                    onChange={(e) => {
                      const val = e.target.value;
                      setEditingItem({
                        ...editingItem,
                        affiliateUrl: val || editingItem.affiliateUrl,
                        geoLinks: {
                          ...editingItem.geoLinks,
                          VN: {
                            platform: "Shopee",
                            url: val,
                          },
                        },
                      });
                    }}
                    placeholder="https://s.shopee.vn/..."
                    className="w-full bg-[#181B26] border border-gray-700 focus:border-[#D4AF37] rounded-xl px-3 py-2 text-white text-xs font-mono"
                  />
                </div>

                {/* US */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-gray-300 font-semibold text-xs flex items-center gap-1.5">
                      <span>🇺🇸</span>
                      <span>{language === "vi" ? "Link Amazon (Mỹ & Toàn Cầu):" : "Amazon US / Global Link:"}</span>
                    </label>
                    <span className="text-[10px] text-gray-500 font-mono">
                      {language === "vi" ? "Khách Quốc Tế" : "Global Visitors"}
                    </span>
                  </div>
                  <input
                    type="url"
                    value={
                      editingItem.geoLinks?.US?.url ||
                      (editingItem.platform === "Amazon" ? editingItem.affiliateUrl : "")
                    }
                    onChange={(e) => {
                      const val = e.target.value;
                      setEditingItem({
                        ...editingItem,
                        geoLinks: {
                          ...editingItem.geoLinks,
                          US: {
                            platform: "Amazon",
                            url: val,
                          },
                        },
                      });
                    }}
                    placeholder="https://www.amazon.com/..."
                    className="w-full bg-[#181B26] border border-gray-700 focus:border-[#D4AF37] rounded-xl px-3 py-2 text-white text-xs font-mono"
                  />
                </div>

                {/* EU */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-gray-300 font-semibold text-xs flex items-center gap-1.5">
                      <span>🇪🇺</span>
                      <span>{language === "vi" ? "Link Châu Âu (Tùy chọn - Unisport/Nike):" : "Europe Link (Optional):"}</span>
                    </label>
                    <span className="text-[10px] text-gray-500 font-mono">
                      {language === "vi" ? "Khách Châu Âu" : "Europe Visitors"}
                    </span>
                  </div>
                  <input
                    type="url"
                    value={editingItem.geoLinks?.EU?.url || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEditingItem({
                        ...editingItem,
                        geoLinks: {
                          ...editingItem.geoLinks,
                          EU: {
                            platform: "Unisport",
                            url: val,
                          },
                        },
                      });
                    }}
                    placeholder="https://www.unisportstore.com/... hoặc để trống"
                    className="w-full bg-[#181B26] border border-gray-700 focus:border-[#D4AF37] rounded-xl px-3 py-2 text-white text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">
                  {language === "vi" ? "Đường dẫn hình ảnh (Image URL):" : "Image URL:"}
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.image}
                  onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                  className="w-full bg-[#181B26] border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                  placeholder={language === "vi" ? "https://... hoặc /images/..." : "https://... or /images/..."}
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">
                  {language === "vi" ? "Huy hiệu tag nổi bật:" : "Badge Tag:"}
                </label>
                <input
                  type="text"
                  value={editingItem.badge || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, badge: e.target.value })}
                  className="w-full bg-[#181B26] border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                  placeholder={language === "vi" ? "Bán chạy nhất / Kỷ vật giới hạn..." : "Best Seller / Limited Edition..."}
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">
                  {language === "vi" ? "Mô tả sản phẩm:" : "Product Description:"}
                </label>
                <textarea
                  rows={3}
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full bg-[#181B26] border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                  placeholder={language === "vi" ? "Mô tả chất liệu, cảm hứng và chi tiết..." : "Description of material, details, and heritage..."}
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300 hover:text-white"
                >
                  {language === "vi" ? "Hủy bỏ" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#D4AF37] text-black font-bold hover:opacity-90 flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{language === "vi" ? "Lưu thay đổi" : "Save Changes"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
