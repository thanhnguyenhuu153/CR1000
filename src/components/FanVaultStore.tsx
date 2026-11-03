"use client";

import React, { useState, useEffect } from "react";
import { cr7ShopItems as initialShopItems, ShopItem } from "@/data/cr7-shop";
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
} from "lucide-react";

export default function FanVaultStore() {
  const [filter, setFilter] = useState<"all" | "jersey" | "boots" | "lifestyle" | "memorabilia">("all");
  const [items, setItems] = useState<ShopItem[]>(initialShopItems);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [editingItem, setEditingItem] = useState<ShopItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Load customized items from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cr1000_shop_items");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setItems(parsed);
        }
      }
    } catch (e) {}
  }, []);

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
      badge: "Mới",
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
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi danh sách?")) {
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
    if (confirm("Khôi phục danh sách sản phẩm về cài đặt gốc ban đầu?")) {
      saveItems(initialShopItems);
      localStorage.removeItem("cr1000_shop_items");
    }
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(items, null, 2));
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  const filteredItems = items.filter((item) => {
    if (filter === "all") return true;
    return item.category === filter;
  });

  return (
    <section id="shop" className="py-20 bg-[#08090C] relative border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 relative">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181B24] border border-gray-800 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3">
            Bảo tàng Kỷ vật • Fan Vault Store
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Bộ Sưu Tập Kỷ Vật <span className="gold-gradient-text">CR7 Chính Hãng</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-400">
            Sở hữu các kỷ vật biểu tượng: từ chiếc áo đỏ tay dài đêm Moscow 2008, dòng giày Mercurial săn bàn tới những bức tranh tráng gương ghi dấu bàn thắng thứ 1.000.
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
              <span>{isAdminMode ? "Đang bật chế độ Quản trị (Admin On)" : "Bật chế độ Quản trị / Sửa sản phẩm"}</span>
            </button>

            {isAdminMode && (
              <>
                <button
                  onClick={handleAddNew}
                  className="px-3 py-1.5 rounded-full bg-[#D4AF37] text-black text-xs font-bold flex items-center gap-1 hover:opacity-90"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Thêm sản phẩm</span>
                </button>
                <button
                  onClick={handleCopyJSON}
                  className="px-3 py-1.5 rounded-full bg-[#181B24] border border-gray-700 text-gray-300 hover:text-white text-xs font-bold flex items-center gap-1"
                  title="Sao chép toàn bộ danh sách sản phẩm dạng JSON"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedNotification ? "Đã copy!" : "Copy mã JSON"}</span>
                </button>
                <button
                  onClick={handleResetDefault}
                  className="p-1.5 rounded-full bg-[#181B24] border border-gray-700 text-gray-400 hover:text-red-400 text-xs"
                  title="Khôi phục mặc định"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>
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
              className="bg-[#11131C] border border-gray-800 hover:border-[#D4AF37]/50 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 flex flex-col justify-between group relative"
            >
              {/* Admin Actions Overlay Buttons */}
              {isAdminMode && (
                <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-black/80 backdrop-blur-md p-1.5 rounded-xl border border-gray-700">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-1.5 rounded-lg bg-[#222736] hover:bg-[#D4AF37] text-gray-300 hover:text-black transition-all"
                    title="Chỉnh sửa sản phẩm này"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-lg bg-red-900/40 hover:bg-red-600 text-red-300 hover:text-white transition-all"
                    title="Xóa sản phẩm này"
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
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#11131C] via-transparent to-transparent opacity-80" />

                {item.badge && (
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#D4AF37] text-black shadow-md">
                    {item.badge}
                  </span>
                )}

                {!isAdminMode && (
                  <span className="absolute top-4 right-4 px-2.5 py-1 rounded-md text-[10px] font-bold bg-black/70 backdrop-blur-md text-gray-300 border border-gray-700">
                    {item.platform}
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
              <span>{editingItem.id.startsWith("shop-") ? "Thêm Sản Phẩm Mới" : "Chỉnh Sửa Sản Phẩm"}</span>
            </h3>

            <form onSubmit={handleSaveModal} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-bold mb-1">Tên sản phẩm:</label>
                <input
                  type="text"
                  required
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="w-full bg-[#181B26] border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                  placeholder="Ví dụ: Áo đấu Al Nassr Home Vàng #7..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">Danh mục:</label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as any })}
                    className="w-full bg-[#181B26] border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="jersey">Áo đấu biểu tượng</option>
                    <option value="boots">Giày đá bóng Mercurial</option>
                    <option value="lifestyle">Nước hoa & Thời trang</option>
                    <option value="memorabilia">Tranh & Kỷ vật sưu tầm</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">Sàn thương mại:</label>
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
                  <label className="block text-gray-300 font-bold mb-1">Giá bán hiển thị:</label>
                  <input
                    type="text"
                    required
                    value={editingItem.priceText}
                    onChange={(e) => setEditingItem({ ...editingItem, priceText: e.target.value })}
                    className="w-full bg-[#181B26] border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                    placeholder="390.000₫ – 750.000₫"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">Giá gốc (gạch ngang):</label>
                  <input
                    type="text"
                    value={editingItem.originalPriceText || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, originalPriceText: e.target.value })}
                    className="w-full bg-[#181B26] border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                    placeholder="1.200.000₫ (tùy chọn)"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Link Tiếp Thị Liên Kết (Affiliate URL):</label>
                <input
                  type="url"
                  required
                  value={editingItem.affiliateUrl}
                  onChange={(e) => setEditingItem({ ...editingItem, affiliateUrl: e.target.value })}
                  className="w-full bg-[#181B26] border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                  placeholder="https://shopee.vn/..."
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Đường dẫn hình ảnh (Image URL):</label>
                <input
                  type="text"
                  required
                  value={editingItem.image}
                  onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                  className="w-full bg-[#181B26] border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                  placeholder="https://... hoặc /images/..."
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Huy hiệu tag nổi bật:</label>
                <input
                  type="text"
                  value={editingItem.badge || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, badge: e.target.value })}
                  className="w-full bg-[#181B26] border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                  placeholder="Bán chạy nhất / Kỷ vật giới hạn..."
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Mô tả sản phẩm:</label>
                <textarea
                  rows={3}
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full bg-[#181B26] border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                  placeholder="Mô tả chất liệu, cảm hứng và chi tiết..."
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300 hover:text-white"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#D4AF37] text-black font-bold hover:opacity-90 flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Lưu thay đổi</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
