"use client";

import React, { useState, useEffect } from "react";
import { useSiteData, defaultImages, CustomImages } from "@/context/SiteDataContext";
import { cr7UpcomingFixtures, getUpcomingNextMatch, CR7Fixture } from "@/data/cr7-stats";
import { ShopItem, cr7ShopItems as defaultShopItems } from "@/data/cr7-shop";
import {
  Lock,
  Unlock,
  KeyRound,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Save,
  RotateCcw,
  Eye,
  LogOut,
  Flame,
  ShoppingBag,
  ExternalLink,
  Plus,
  Trash2,
  Edit,
  Copy,
  ChevronRight,
  ShieldAlert,
  Sparkles,
  Activity,
  RefreshCw,
  Send,
  X,
  Tag,
  Newspaper,
} from "lucide-react";
import JournalManagerTab from "@/components/admin/JournalManagerTab";

export default function AdminPage() {
  const {
    goals,
    setGoals,
    images,
    updateImages,
    resetImages,
    shopItems,
    saveShopItems,
    nextMatch,
    updateNextMatch,
    resetNextMatchToSchedule,
    showFanVault,
    setShowFanVault,
  } = useSiteData();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<"images" | "stats" | "journal" | "fanvault" | "autopilot" | "export">("images");

  // Local Form States
  const [imageForm, setImageForm] = useState<CustomImages>(images);
  const [imageCategoryFilter, setImageCategoryFilter] = useState<"all" | "hero" | "eras" | "trophies" | "finals">("all");
  const [goalsInput, setGoalsInput] = useState(goals.toString());
  const [matchForm, setMatchForm] = useState(nextMatch);
  const [saveNotification, setSaveNotification] = useState("");

  // Fan Vault & Affiliate States
  const [localShopItems, setLocalShopItems] = useState<ShopItem[]>(shopItems);
  const [editingShopItem, setEditingShopItem] = useState<ShopItem | null>(null);
  const [isShopModalOpen, setIsShopModalOpen] = useState(false);
  const [shopCategoryFilter, setShopCategoryFilter] = useState<"all" | "jersey" | "boots" | "lifestyle" | "memorabilia">("all");

  // Auto-Pilot States
  const [cronLoading, setCronLoading] = useState(false);
  const [cronResponse, setCronResponse] = useState<any>(null);
  const [webhookGoals, setWebhookGoals] = useState("986");
  const [webhookMatch, setWebhookMatch] = useState("Al Nassr vs Al-Qadsiah");
  const [webhookLoading, setWebhookLoading] = useState(false);
  const [webhookResult, setWebhookResult] = useState<any>(null);

  useEffect(() => {
    setImageForm(images);
  }, [images]);

  useEffect(() => {
    setGoalsInput(goals.toString());
  }, [goals]);

  useEffect(() => {
    setLocalShopItems(shopItems);
  }, [shopItems]);

  // Check existing session
  useEffect(() => {
    try {
      const session = sessionStorage.getItem("cr1000_admin_auth");
      if (session === "true") {
        setIsAuthenticated(true);
      }
    } catch (e) {}
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default credentials (configured by owner)
    const validUser = "cr1000";
    const validPass = "#cr7@1000#";

    if (username.trim() === validUser && password === validPass) {
      setIsAuthenticated(true);
      setLoginError("");
      try {
        sessionStorage.setItem("cr1000_admin_auth", "true");
      } catch (e) {}
    } else {
      setLoginError("Tên đăng nhập hoặc mật khẩu không đúng! Vui lòng thử lại.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem("cr1000_admin_auth");
    } catch (e) {}
  };

  const handleSaveImages = (e: React.FormEvent) => {
    e.preventDefault();
    updateImages(imageForm);
    setSaveNotification("Đã lưu và cập nhật toàn bộ hình ảnh trên trang chủ thành công!");
    setTimeout(() => setSaveNotification(""), 3500);
  };

  /**
   * Tự động nén và resize hình ảnh ngay trên trình duyệt trước khi lưu
   * Tối ưu kích thước 800px & quality 0.72 giúp mỗi ảnh chỉ nặng ~25–45 KB
   * Đảm bảo không bao giờ bị tràn bộ nhớ localStorage (5MB) của trình duyệt
   */
  const compressClientImage = (
    file: File,
    maxWidth = 800,
    quality = 0.72
  ): Promise<{ dataUrl: string; originalKb: number; compressedKb: number }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          let width = img.width;
          let height = img.height;

          // Resize giữ nguyên tỷ lệ nếu kích thước vượt quá 800px
          if (width > maxWidth || height > maxWidth) {
            if (width > height) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxWidth) / height);
              height = maxWidth;
            }
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            const kb = Math.round(file.size / 1024);
            resolve({ dataUrl: img.src, originalKb: kb, compressedKb: kb });
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
          const originalKb = Math.round(file.size / 1024);
          const compressedKb = Math.round((compressedDataUrl.length * 3) / 4 / 1024);

          resolve({ dataUrl: compressedDataUrl, originalKb, compressedKb });
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = async (key: keyof CustomImages, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setSaveNotification("⚡ Đang tự động nén và tối ưu hóa hình ảnh...");
      const { dataUrl, originalKb, compressedKb } = await compressClientImage(file, 800, 0.72);
      setImageForm((prev) => ({ ...prev, [key]: dataUrl }));
      // TỰ ĐỘNG LƯU NGAY LẬP TỨC: Không cần người dùng phải bấm thêm nút Lưu
      updateImages({ [key]: dataUrl });

      const savedPercent = Math.max(0, Math.round(((originalKb - compressedKb) / originalKb) * 100));
      setSaveNotification(
        `✓ Đã tự động nén & ÁP DỤNG NGAY: ${originalKb} KB ➔ ${compressedKb} KB (Tiết kiệm ${savedPercent}%)! Trang chủ đã được cập nhật tức thì.`
      );
      setTimeout(() => setSaveNotification(""), 4500);
    } catch (err) {
      alert("Không thể đọc file ảnh này. Vui lòng thử lại với định dạng JPG, PNG hoặc WebP.");
      setSaveNotification("");
    }
  };

  useEffect(() => {
    if (nextMatch) {
      setMatchForm(nextMatch);
    }
  }, [nextMatch]);

  const handleSaveStats = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(goalsInput, 10);
    if (!isNaN(val) && val >= 985) {
      setGoals(val);
    }
    updateNextMatch(matchForm);
    setSaveNotification("Đã cập nhật số bàn thắng và trận đấu tiếp theo!");
    setTimeout(() => setSaveNotification(""), 3500);
  };

  const handleAutoSyncFixture = () => {
    const fresh = getUpcomingNextMatch("vi");
    setMatchForm(fresh);
    updateNextMatch(fresh);
    setSaveNotification(`⚡ Đã tự động đồng bộ lịch mới nhất: ${fresh.homeTeam} vs ${fresh.awayTeam} (${fresh.kickoffTime})`);
    setTimeout(() => setSaveNotification(""), 4000);
  };

  const handleSelectFixture = (fix: CR7Fixture) => {
    const selected = {
      competition: fix.competition,
      homeTeam: fix.homeTeam,
      awayTeam: fix.awayTeam,
      stadium: fix.stadium,
      kickoffTime: fix.kickoffTime,
      kickoffIso: fix.kickoffIso,
      note: fix.noteVi,
    };
    setMatchForm(selected);
    updateNextMatch(selected);
    setSaveNotification(`✅ Đã chọn trận đấu: ${fix.homeTeam} vs ${fix.awayTeam} (${fix.kickoffTime})`);
    setTimeout(() => setSaveNotification(""), 3500);
  };

  // Fan Vault & Affiliate Handlers
  const handleToggleFanVault = (publish: boolean) => {
    setShowFanVault(publish);
    setSaveNotification(
      publish
        ? "🟢 Đã BẬT xuất bản Kỷ vật Fan Vault ra website! Người dùng có thể xem trên trang chủ."
        : "🔴 Đã TẠM ẨN Kỷ vật Fan Vault khỏi website! Bạn có thể thoải mái chỉnh sửa nội dung, ảnh và link affiliate."
    );
    setTimeout(() => setSaveNotification(""), 4500);
  };

  const handleSaveAllShopItems = () => {
    saveShopItems(localShopItems);
    setSaveNotification("✓ Đã lưu toàn bộ danh sách sản phẩm và Affiliate Links vào hệ thống!");
    setTimeout(() => setSaveNotification(""), 3500);
  };

  const handleResetShopItems = () => {
    if (confirm("Bạn có chắc chắn muốn khôi phục danh sách kỷ vật về mặc định ban đầu?")) {
      setLocalShopItems(defaultShopItems);
      saveShopItems(defaultShopItems);
      setSaveNotification("✓ Đã khôi phục danh sách kỷ vật về mặc định ban đầu!");
      setTimeout(() => setSaveNotification(""), 3500);
    }
  };

  const handleDeleteShopItem = (id: string) => {
    if (confirm("Bạn có chắc muốn xóa sản phẩm này khỏi Fan Vault?")) {
      const updated = localShopItems.filter((item) => item.id !== id);
      setLocalShopItems(updated);
      saveShopItems(updated);
      setSaveNotification("✓ Đã xóa sản phẩm thành công!");
      setTimeout(() => setSaveNotification(""), 3000);
    }
  };

  const handleOpenAddShopItem = () => {
    setEditingShopItem({
      id: "shop-" + Date.now(),
      name: "",
      category: "jersey",
      priceText: "490.000₫ – 890.000₫",
      originalPriceText: "1.200.000₫",
      badge: "Xu hướng",
      description: "Mô tả sản phẩm kỷ vật CR7...",
      image: "/images/shop/jersey-al-nassr-home.jpg",
      affiliateUrl: "https://s.shopee.vn/",
      platform: "Shopee",
      rating: 5.0,
      reviewsCount: 150,
      geoLinks: {
        VN: {
          platform: "Shopee",
          url: "https://s.shopee.vn/",
        },
        US: {
          platform: "Amazon",
          url: "https://www.amazon.com/",
        },
      },
    });
    setIsShopModalOpen(true);
  };

  const handleEditShopItem = (item: ShopItem) => {
    setEditingShopItem({ ...item });
    setIsShopModalOpen(true);
  };

  const handleSaveShopItemModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingShopItem) return;
    if (!editingShopItem.name.trim()) {
      alert("Vui lòng nhập tên sản phẩm!");
      return;
    }

    const itemToSave: ShopItem = {
      ...editingShopItem,
      affiliateUrl:
        editingShopItem.geoLinks?.VN?.url ||
        editingShopItem.affiliateUrl ||
        editingShopItem.geoLinks?.US?.url ||
        "",
    };

    const exists = localShopItems.some((i) => i.id === itemToSave.id);
    let updated: ShopItem[];
    if (exists) {
      updated = localShopItems.map((i) => (i.id === itemToSave.id ? itemToSave : i));
    } else {
      updated = [itemToSave, ...localShopItems];
    }

    setLocalShopItems(updated);
    saveShopItems(updated);
    setIsShopModalOpen(false);
    setEditingShopItem(null);
    setSaveNotification(`✓ Đã lưu sản phẩm "${itemToSave.name}" và link đa quốc gia thành công!`);
    setTimeout(() => setSaveNotification(""), 3500);
  };

  const renderImageInputCard = (
    key: keyof CustomImages,
    title: string,
    subtitle: string,
    aspectRatio: "video" | "square" | "wide" = "video"
  ) => {
    const aspectClass =
      aspectRatio === "square"
        ? "w-20 h-20 sm:w-24 sm:h-24"
        : aspectRatio === "wide"
        ? "w-32 h-20 sm:w-36 sm:h-24"
        : "w-28 h-20 sm:w-32 sm:h-20";

    return (
      <div
        key={key}
        className="p-4 rounded-xl bg-[#161822] border border-gray-800/80 hover:border-gray-700 transition-all flex flex-col sm:flex-row gap-4 items-start sm:items-center"
      >
        <div
          className={`${aspectClass} rounded-lg overflow-hidden shrink-0 border border-gray-700 bg-black relative flex items-center justify-center`}
        >
          {imageForm[key] ? (
            <img
              src={imageForm[key]}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "https://placehold.co/400x300/111827/d4af37?text=CR7";
              }}
            />
          ) : (
            <span className="text-[10px] text-gray-500">Chưa có ảnh</span>
          )}
        </div>
        <div className="flex-1 w-full text-xs">
          <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1">
            <div>
              <strong className="text-white block font-semibold">{title}</strong>
              <span className="text-[11px] text-gray-400 block">{subtitle}</span>
            </div>
            <label className="cursor-pointer text-[10px] font-bold text-[#D4AF37] hover:text-white flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#222736] border border-gray-700 hover:border-[#D4AF37] transition-all">
              <span>📁 Tải từ máy</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(key, e)}
                className="hidden"
              />
            </label>
          </div>
          <input
            type="text"
            value={imageForm[key] || ""}
            onChange={(e) => setImageForm({ ...imageForm, [key]: e.target.value })}
            onBlur={() => {
              if (imageForm[key] !== images[key]) {
                updateImages({ [key]: imageForm[key] });
                setSaveNotification(`✓ Đã tự động lưu đường dẫn ảnh "${title}"!`);
                setTimeout(() => setSaveNotification(""), 3500);
              }
            }}
            placeholder="Dán link ảnh (https://...) hoặc bấm Tải từ máy..."
            className="w-full bg-[#11131A] border border-gray-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
          />
        </div>
      </div>
    );
  };

  // If Not Authenticated -> Show Login Portal
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#08090C] text-[#F8FAFC] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#11131B] border border-gray-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#D4AF37] via-[#E63946] to-[#F59E0B]" />

          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#1A1D27] border border-[#D4AF37]/30 flex items-center justify-center mx-auto mb-4 text-[#D4AF37] shadow-lg">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-white">Quản Trị CR1000</h1>
            <p className="text-xs text-gray-400 mt-1">
              Khu vực bảo mật chỉ dành riêng cho chủ sở hữu website
            </p>
          </div>

          {loginError && (
            <div className="mb-6 p-3 rounded-xl bg-red-950/50 border border-red-800/80 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-gray-300 font-bold mb-1.5">Tài khoản quản trị:</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập tên đăng nhập..."
                className="w-full bg-[#161922] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-bold mb-1.5">Mật khẩu:</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu bí mật..."
                className="w-full bg-[#161922] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-black font-extrabold text-sm hover:opacity-95 active:scale-95 transition-all shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4" />
                <span>Đăng nhập Quản Trị</span>
              </button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-800/80 text-center">
            <p className="text-[11px] text-gray-400">
              Khu vực bảo mật dành riêng cho Quản trị viên CR1000.
            </p>
            <a href="/" className="inline-block mt-3 text-xs text-[#D4AF37] hover:underline">
              &larr; Quay lại trang chủ Bảo tàng
            </a>
          </div>
        </div>
      </div>
    );
  }

  // If Authenticated -> Show Admin Dashboard
  return (
    <div className="min-h-screen bg-[#08090C] text-[#F8FAFC] pb-24">
      {/* Admin Top Navigation */}
      <header className="bg-[#10121A] border-b border-gray-800 sticky top-0 z-40 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-extrabold text-base text-white tracking-tight">CR1000 Control Hub</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              ADMIN MODE
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              className="text-xs font-bold text-[#D4AF37] hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>Xem trang chủ</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl bg-red-950/40 border border-red-800 text-red-300 hover:text-white hover:bg-red-800 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        {/* Success Alert Banner */}
        {saveNotification && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-lg">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{saveNotification}</span>
          </div>
        )}

        {/* Admin Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-gray-800">
          <button
            onClick={() => setActiveTab("images")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === "images"
                ? "bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20"
                : "bg-[#141720] text-gray-300 hover:text-white"
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>1. Hình ảnh (Media)</span>
          </button>

          <button
            onClick={() => setActiveTab("stats")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === "stats"
                ? "bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20"
                : "bg-[#141720] text-gray-300 hover:text-white"
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>2. Bàn thắng & Trận đấu</span>
          </button>

          <button
            onClick={() => setActiveTab("journal")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 ${
              activeTab === "journal"
                ? "bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20"
                : "bg-[#141720] text-gray-300 hover:text-white"
            }`}
          >
            <Newspaper className="w-4 h-4" />
            <span>3. Nhật Ký 1000 Bàn (Bài Viết)</span>
          </button>

          <button
            onClick={() => setActiveTab("fanvault")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 ${
              activeTab === "fanvault"
                ? "bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20"
                : "bg-[#141720] text-gray-300 hover:text-white"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>4. Kỷ vật Fan Vault & Affiliate</span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                showFanVault
                  ? activeTab === "fanvault"
                    ? "bg-black text-emerald-400 border border-emerald-400"
                    : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                  : activeTab === "fanvault"
                  ? "bg-black text-red-400 border border-red-400"
                  : "bg-red-500/20 text-red-400 border border-red-500/40"
              }`}
            >
              {showFanVault ? "● LIVE (ĐÃ BẬT)" : "○ DRAFT (ĐANG ẨN)"}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("autopilot")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 ${
              activeTab === "autopilot"
                ? "bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20"
                : "bg-[#141720] text-gray-300 hover:text-white"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>5. Auto-Pilot (Cấp độ 3)</span>
          </button>

          <button
            onClick={() => setActiveTab("export")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 ${
              activeTab === "export"
                ? "bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20"
                : "bg-[#141720] text-gray-300 hover:text-white"
            }`}
          >
            <Copy className="w-4 h-4" />
            <span>6. Xuất Code lưu trữ</span>
          </button>
        </div>

        {/* TAB 1: MEDIA & IMAGE MANAGER */}
        {activeTab === "images" && (
          <form onSubmit={handleSaveImages} className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-white">Thay thế hình ảnh trực quan</h2>
                <p className="text-xs text-gray-400 mt-1">
                  Nhập đường link ảnh mới (từ Imgur, Cloudinary, Unsplash hoặc file local /images/...). Ảnh sẽ tự động cập nhật ngay trên trang chủ!
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={resetImages}
                  className="px-3.5 py-2 rounded-xl bg-[#1A1D27] border border-gray-700 text-gray-300 hover:text-red-400 text-xs font-bold flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Khôi phục ảnh mặc định</span>
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#D4AF37] text-black text-xs font-extrabold flex items-center gap-1.5 hover:opacity-90 shadow-md shadow-[#D4AF37]/20"
                >
                  <Save className="w-4 h-4" />
                  <span>Lưu tất cả ảnh</span>
                </button>
              </div>
            </div>

            {/* Image Specs & Guidelines Card */}
            <div className="bg-[#10131E] border border-[#D4AF37]/30 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] text-xs font-black">
                  ℹ️
                </div>
                <h3 className="text-sm font-extrabold text-[#D4AF37] uppercase tracking-wide">
                  Quy chuẩn kích thước & Định dạng ảnh tối ưu cho CR1000
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-[#161926] border border-gray-800">
                  <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    <span>1. Banner Hero (Đầu trang)</span>
                  </div>
                  <ul className="text-gray-400 space-y-1 text-[11px] list-disc list-inside">
                    <li>Kích thước: <strong className="text-gray-200">1920 × 1080 px</strong> (tỷ lệ 16:9)</li>
                    <li>Định dạng: <strong className="text-gray-200">JPG, WebP, PNG</strong></li>
                    <li>Dung lượng: <strong className="text-emerald-400">&lt; 1.5 MB</strong> (tốt nhất: 300–800 KB)</li>
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-[#161926] border border-gray-800">
                  <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                    <span>2. 7 Kỷ nguyên sự nghiệp</span>
                  </div>
                  <ul className="text-gray-400 space-y-1 text-[11px] list-disc list-inside">
                    <li>Kích thước: <strong className="text-gray-200">800 × 600 px</strong> hoặc <strong className="text-gray-200">1200 × 800 px</strong></li>
                    <li>Định dạng: <strong className="text-gray-200">JPG, WebP</strong></li>
                    <li>Dung lượng: <strong className="text-emerald-400">&lt; 1.0 MB</strong> (tốt nhất: 200–500 KB)</li>
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-[#161926] border border-gray-800">
                  <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>3. Cúp & Kỷ vật bảo tàng</span>
                  </div>
                  <ul className="text-gray-400 space-y-1 text-[11px] list-disc list-inside">
                    <li>Kích thước: <strong className="text-gray-200">600 × 600 px</strong> hoặc <strong className="text-gray-200">800 × 800 px</strong> (1:1)</li>
                    <li>Định dạng: <strong className="text-gray-200">PNG</strong> (tách nền trong suốt) hoặc JPG</li>
                    <li>Dung lượng: <strong className="text-emerald-400">&lt; 800 KB</strong> (tốt nhất: 150–400 KB)</li>
                  </ul>
                </div>
              </div>
              <p className="text-[11px] text-gray-500 mt-3 pt-3 border-t border-gray-800/80">
                💡 <em>Mẹo tối ưu:</em> Để website tải nhanh như chớp trên cả điện thoại 4G/5G, bạn có thể nén ảnh miễn phí qua các trang như <span className="text-[#D4AF37]">TinyPNG.com</span> hoặc <span className="text-[#D4AF37]">Squoosh.app</span> trước khi tải lên.
              </p>
            </div>

            {/* Filter Pills for Image Sections */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-800">
              <span className="text-xs font-semibold text-gray-400 shrink-0 mr-1">Bộ lọc vị trí:</span>
              {[
                { id: "all", label: "Tất cả ảnh (47)" },
                { id: "hero", label: "1. Đầu trang & Brand (2)" },
                { id: "eras", label: "2. 7 Kỷ nguyên sự nghiệp (7)" },
                { id: "trophies", label: "3. 27 Cúp vàng & Danh hiệu (27)" },
                { id: "finals", label: "4. 11 Chung kết & Siêu phẩm (11)" },
              ].map((pill) => (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => setImageCategoryFilter(pill.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                    imageCategoryFilter === pill.id
                      ? "bg-[#D4AF37] text-black shadow-md shadow-[#D4AF37]/20"
                      : "bg-[#181B26] text-gray-300 hover:text-white hover:bg-[#202534] border border-gray-800"
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* 1. HERO & BRANDING */}
            {(imageCategoryFilter === "all" || imageCategoryFilter === "hero") && (
              <div className="bg-[#11131C] border border-gray-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider text-[#D4AF37]">
                    1. Ảnh Đầu Trang & Nhận Diện Thương Hiệu (Hero & Share Preview)
                  </h3>
                  <span className="text-[11px] text-gray-400 font-medium">2 vị trí</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {renderImageInputCard(
                    "hero",
                    "Banner Hero Đầu Trang (Hero Showcase)",
                    "Hiển thị đầu trang chủ, đếm ngược 1000 bàn thắng",
                    "wide"
                  )}
                  {renderImageInputCard(
                    "ogImage",
                    "Ảnh OpenGraph Thumbnail Chia Sẻ (Facebook, Zalo, X)",
                    "Kích thước chuẩn 1200 × 630 px khi chia sẻ link website",
                    "wide"
                  )}
                </div>
              </div>
            )}

            {/* 2. 7 ERAS */}
            {(imageCategoryFilter === "all" || imageCategoryFilter === "eras") && (
              <div className="bg-[#11131C] border border-gray-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider text-[#D4AF37]">
                    2. Ảnh 7 Kỷ Nguyên Sự Nghiệp Huyền Thoại (Chương 1)
                  </h3>
                  <span className="text-[11px] text-gray-400 font-medium">7 giai đoạn</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {renderImageInputCard(
                    "eraMadeira",
                    "1. Madeira & Sporting CP (1985–2003)",
                    "Thời niên thiếu & khởi đầu giấc mơ chuyên nghiệp tại Bồ Đào Nha"
                  )}
                  {renderImageInputCard(
                    "eraManUtd1",
                    "2. Manchester United Kỳ 1 (2003–2009)",
                    "Số 7 huyền thoại, QBV đầu tiên & Champions League 2008"
                  )}
                  {renderImageInputCard(
                    "eraRealMadrid",
                    "3. Real Madrid Galáctico (2009–2018)",
                    "450 bàn/438 trận, 4 Champions League, 4 Quả bóng Vàng"
                  )}
                  {renderImageInputCard(
                    "eraJuventus",
                    "4. Juventus & Serie A (2018–2021)",
                    "101 bàn thắng, thống trị bóng đá Ý & kỷ lục Capocannoniere"
                  )}
                  {renderImageInputCard(
                    "eraManUtd2",
                    "5. Manchester United Kỳ 2 (2021–2022)",
                    "Cú tái xuất Old Trafford & mốc 800 bàn thắng lịch sử"
                  )}
                  {renderImageInputCard(
                    "eraAlNassr",
                    "6. Al Nassr & Saudi Pro League (2023–Nay)",
                    "Vô địch Saudi Pro League, 1000 bàn thắng trong tầm tay"
                  )}
                  <div className="md:col-span-2">
                    {renderImageInputCard(
                      "eraPortugal",
                      "7. Đội Tuyển Quốc Gia Bồ Đào Nha (2003–Nay)",
                      "Đội trưởng vĩ đại, Vô địch Euro 2016, 217+ lần khoác áo tuyển"
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 3. TROPHIES */}
            {(imageCategoryFilter === "all" || imageCategoryFilter === "trophies") && (
              <div className="bg-[#11131C] border border-gray-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider text-[#D4AF37]">
                    3. Ảnh 27 Chiếc Cúp Vàng & Danh Hiệu Đỉnh Cao (Chương 5)
                  </h3>
                  <span className="text-[11px] text-gray-400 font-medium">27 danh hiệu</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Cúp CLB Chính */}
                  {renderImageInputCard("trophyUcl", "UEFA Champions League (5 Cúp C1)", "5 lần vô địch C1 vĩ đại cùng MU & Real", "square")}
                  {renderImageInputCard("trophyClubWc", "FIFA Club World Cup (4 cúp)", "4 lần Vô địch các CLB thế giới", "square")}
                  {renderImageInputCard("trophyUefaSuperCup", "UEFA Super Cup (3 cúp)", "3 lần đoạt Siêu cúp châu Âu cùng Real Madrid", "square")}
                  {renderImageInputCard("trophyPremierLeague", "Premier League (3 cúp)", "3 chức vô địch Ngoại Hạng Anh liên tiếp", "square")}
                  {renderImageInputCard("trophyLaLiga", "La Liga (2 cúp)", "2 lần vô địch La Liga cùng Real Madrid", "square")}
                  {renderImageInputCard("trophySerieA", "Serie A Scudetto (2 cúp)", "2 chức vô địch Serie A cùng Juventus", "square")}
                  {renderImageInputCard("trophySaudiProLeague", "Saudi Pro League (1 cúp)", "Vô địch giải VĐQG Ả Rập Xê Út 2025–26", "square")}
                  {renderImageInputCard("trophyArabClub", "Arab Club Champions Cup (1 cúp)", "Chiếc cúp vô địch đầu tiên tại Al Nassr 2023", "square")}
                  {renderImageInputCard("trophyCopaDelRey", "Copa del Rey (2 cúp)", "2 cúp Nhà Vua Tây Ban Nha", "square")}
                  {renderImageInputCard("trophyFaCup", "FA Cup (1 cúp)", "Cúp FA nước Anh năm 2004 cùng Man Utd", "square")}
                  {renderImageInputCard("trophyCoppaItalia", "Coppa Italia (1 cúp)", "Cúp Quốc gia Ý năm 2021 cùng Juventus", "square")}
                  {renderImageInputCard("trophyLeagueCup", "EFL Cup / League Cup (2 cúp)", "2 Cúp Liên đoàn Anh (2006, 2009)", "square")}
                  {renderImageInputCard("trophySupercopaEspana", "Supercopa de España (2 cúp)", "2 Siêu cúp Tây Ban Nha (2012, 2017)", "square")}
                  {renderImageInputCard("trophySupercoppaItaliana", "Supercoppa Italiana (2 cúp)", "2 Siêu cúp Ý (2018, 2020) cùng Juventus", "square")}
                  {renderImageInputCard("trophyCommunityShield", "FA Community Shield (2 cúp)", "2 Siêu cúp Anh (2007, 2008)", "square")}
                  {renderImageInputCard("trophySupertacaPortugal", "Supertaça Cândido (1 cúp)", "Siêu cúp Bồ Đào Nha 2002 cùng Sporting", "square")}

                  {/* Cúp ĐTQG */}
                  {renderImageInputCard("trophyEuro", "UEFA Euro 2016", "Vô địch Châu Âu lịch sử tại Paris", "square")}
                  {renderImageInputCard("trophyNationsLeague", "UEFA Nations League (2 cúp)", "Vô địch Nations League 2019 & 2025", "square")}

                  {/* Danh Hiệu Cá Nhân */}
                  {renderImageInputCard("trophyBallonDor", "Quả bóng Vàng (Ballon d'Or)", "5 lần đoạt Quả bóng Vàng thế giới", "square")}
                  {renderImageInputCard("trophyFifaTheBest", "FIFA The Best / World Player", "3 lần Cầu thủ xuất sắc nhất FIFA", "square")}
                  {renderImageInputCard("trophyGoldenShoe", "Chiếc Giày Vàng Châu Âu (4 cúp)", "4 lần Vua phá lưới toàn châu Âu", "square")}
                  {renderImageInputCard("trophyUclTopScorer", "Vua phá lưới Champions League (7 lần)", "Kỷ lục 7 mùa ghi nhiều bàn nhất C1", "square")}
                  {renderImageInputCard("trophySplGoldenBoot", "Vua phá lưới Saudi Pro League (35 bàn)", "Kỷ lục lịch sử 35 bàn thắng giải SPL", "square")}
                  {renderImageInputCard("trophyPuskasAward", "FIFA Puskás Award 2009", "Bàn thắng đẹp nhất thế giới (40m vs Porto)", "square")}
                  {renderImageInputCard("trophyPichichi", "Pichichi La Liga (3 cúp)", "3 lần Vua phá lưới giải VĐQG Tây Ban Nha", "square")}
                  {renderImageInputCard("trophyCapocannoniere", "Capocannoniere Serie A (1 cúp)", "Vua phá lưới giải VĐQG Ý năm 2021", "square")}
                  {renderImageInputCard("trophyPlGoldenBoot", "Premier League Golden Boot", "Vua phá lưới giải Ngoại hạng Anh năm 2008", "square")}
                </div>
              </div>
            )}

            {/* 4. FINALS & ICONIC MOMENTS */}
            {(imageCategoryFilter === "all" || imageCategoryFilter === "finals") && (
              <div className="bg-[#11131C] border border-gray-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider text-[#D4AF37]">
                    4. Ảnh 11 Trận Chung Kết Lịch Sử & Siêu Phẩm Để Đời (Chương 7)
                  </h3>
                  <span className="text-[11px] text-gray-400 font-medium">11 khoảnh khắc</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {renderImageInputCard(
                    "finalChelsea2008",
                    "Chung kết Champions League 2008 (Moscow)",
                    "Đánh đầu mở tỷ số vs Chelsea & vô địch C1 đầu tiên"
                  )}
                  {renderImageInputCard(
                    "finalBarca2011",
                    "Chung kết Cúp Nhà Vua 2011 (Mestalla)",
                    "Cú bật cao đánh đầu phút 103 hạ Barcelona"
                  )}
                  {renderImageInputCard(
                    "finalUcl2014",
                    "Chung kết Champions League 2014 (Lisbon)",
                    "La Décima lịch sử của Real Madrid vs Atletico"
                  )}
                  {renderImageInputCard(
                    "finalUcl2017",
                    "Chung kết Champions League 2017 (Cardiff)",
                    "Cú đúp đẳng cấp hủy diệt Juventus 4-1"
                  )}
                  {renderImageInputCard(
                    "finalNationsLeague",
                    "Chung kết Nations League 2025 (Munich)",
                    "Bàn gỡ 2-2 phút 61 hạ Tây Ban Nha & Hat-trick bán kết 2019"
                  )}
                  {renderImageInputCard(
                    "finalArab2023",
                    "Chung kết Arab Club Cup 2023 (Taif)",
                    "Cú đúp 10 người quả cảm vs Al-Hilal đăng quang vô địch"
                  )}
                  {renderImageInputCard(
                    "iconicBicycleJuve",
                    "Tuyệt phẩm Ngả người móc bóng 2.38m (Juventus 2018)",
                    "Bàn thắng phi thường khiến cả sân Juventus Stadium đứng dậy tán thưởng"
                  )}
                  {renderImageInputCard(
                    "iconicPorto40m",
                    "Nã đại bác 40 mét Puskás Award (vs Porto 2009)",
                    "Bàn thắng giành giải thưởng Puskás đầu tiên trong lịch sử"
                  )}
                  {renderImageInputCard(
                    "iconicCalmaCampNou",
                    "Ăn mừng 'Calma Calma' câm lặng 98.000 CĐV Camp Nou (2012)",
                    "Bàn thắng định đoạt chức vô địch La Liga 100 điểm của Real"
                  )}
                  {renderImageInputCard(
                    "iconicFreekickPortsmouth",
                    "Đỉnh cao sút phạt Knuckleball (vs Portsmouth 2008)",
                    "Quả sút phạt không xoáy hoàn hảo nhất lịch sử Premier League"
                  )}
                  {renderImageInputCard(
                    "iconicSwedenPlayoff",
                    "Hat-trick Play-off World Cup 2014 (vs Thụy Điển)",
                    "Màn so tài rực lửa vs Ibrahimovic đưa Bồ Đào Nha tới Brazil"
                  )}
                </div>
              </div>
            )}

            <div className="pt-2 text-right">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-black font-extrabold text-sm hover:opacity-95 shadow-xl shadow-[#D4AF37]/20"
              >
                Lưu Thay Đổi Hình Ảnh Ngay
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: STATS & NEXT MATCH */}
        {activeTab === "stats" && (
          <form onSubmit={handleSaveStats} className="space-y-6 max-w-2xl">
            <div className="bg-[#11131C] border border-gray-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider text-[#D4AF37]">
                Bộ Đếm Bàn Thắng Chính Thức (Countdown)
              </h3>
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Số bàn thắng chính thức hiện tại:
                </label>
                <input
                  type="number"
                  value={goalsInput}
                  onChange={(e) => setGoalsInput(e.target.value)}
                  className="w-full bg-[#181B26] border border-gray-700 rounded-xl px-4 py-3 text-lg font-mono font-bold text-[#D4AF37] focus:outline-none focus:border-[#D4AF37]"
                />
                <span className="text-[11px] text-gray-400 mt-1 block">
                  Khi bạn đổi số này, bộ đếm trên trang chủ sẽ tự động tính số bàn còn lại tới mốc 1000!
                </span>
              </div>
            </div>

            <div className="bg-[#11131C] border border-gray-800 rounded-2xl p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-800">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider text-[#D4AF37]">
                    Thông Tin Trận Đấu Sắp Tới
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Hệ thống tự động lăn bánh theo thời gian thực hoặc bạn có thể chọn nhanh trận đấu bên dưới.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAutoSyncFixture}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-xs font-bold text-[#D4AF37] hover:bg-[#D4AF37]/25 transition-colors shrink-0"
                  title="Tự động đồng bộ trận đấu tiếp theo theo lịch thi đấu chính thức"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Đồng bộ lịch mới nhất (Auto-Sync)
                </button>
              </div>

              {/* Quick Select Fixture Pills */}
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-gray-400 block uppercase tracking-wider">
                  Chọn nhanh từ lịch thi đấu Al Nassr sắp tới:
                </span>
                <div className="flex flex-wrap gap-2">
                  {cr7UpcomingFixtures.map((fix) => {
                    const isSelected = matchForm.awayTeam === fix.awayTeam;
                    return (
                      <button
                        key={fix.id}
                        type="button"
                        onClick={() => handleSelectFixture(fix)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all text-left ${
                          isSelected
                            ? "bg-[#D4AF37] text-black border-[#D4AF37] font-bold shadow-md shadow-[#D4AF37]/20"
                            : "bg-[#181B26] text-gray-300 border-gray-700 hover:border-[#D4AF37]/50 hover:text-white"
                        }`}
                      >
                        <span className="font-bold">{fix.homeTeam} vs {fix.awayTeam}</span>
                        <span className="ml-1.5 opacity-80 text-[10px]">({fix.kickoffTime.split(" ")[0]})</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Đội nhà:</label>
                  <input
                    type="text"
                    value={matchForm.homeTeam}
                    onChange={(e) => setMatchForm({ ...matchForm, homeTeam: e.target.value })}
                    className="w-full bg-[#181B26] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Đội khách:</label>
                  <input
                    type="text"
                    value={matchForm.awayTeam}
                    onChange={(e) => setMatchForm({ ...matchForm, awayTeam: e.target.value })}
                    className="w-full bg-[#181B26] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Giải đấu:</label>
                <input
                  type="text"
                  value={matchForm.competition}
                  onChange={(e) => setMatchForm({ ...matchForm, competition: e.target.value })}
                  className="w-full bg-[#181B26] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Sân vận động:</label>
                <input
                  type="text"
                  value={matchForm.stadium}
                  onChange={(e) => setMatchForm({ ...matchForm, stadium: e.target.value })}
                  className="w-full bg-[#181B26] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Thời gian thi đấu:</label>
                <input
                  type="text"
                  value={matchForm.kickoffTime}
                  onChange={(e) => setMatchForm({ ...matchForm, kickoffTime: e.target.value })}
                  className="w-full bg-[#181B26] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Ghi chú trận đấu / Mục tiêu:</label>
                <input
                  type="text"
                  value={matchForm.note || ""}
                  onChange={(e) => setMatchForm({ ...matchForm, note: e.target.value })}
                  placeholder="Ví dụ: Săn bàn thắng chính thức thứ 986!"
                  className="w-full bg-[#181B26] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-black font-extrabold text-sm hover:opacity-95 shadow-xl shadow-[#D4AF37]/20"
            >
              Lưu Số Liệu & Trận Đấu
            </button>
          </form>
        )}

        {/* TAB 3: JOURNAL & ARTICLES MANAGEMENT */}
        {activeTab === "journal" && <JournalManagerTab />}

        {/* TAB 4: FAN VAULT & AFFILIATE MANAGEMENT */}
        {activeTab === "fanvault" && (
          <div className="space-y-8">
            {/* Master Publishing Control Banner */}
            <div
              className={`p-6 sm:p-8 rounded-3xl border transition-all shadow-2xl relative overflow-hidden ${
                showFanVault
                  ? "bg-gradient-to-br from-[#0B1C13] via-[#09140E] to-[#08090C] border-emerald-500/40 shadow-emerald-950/20"
                  : "bg-gradient-to-br from-[#1C0D11] via-[#140A0D] to-[#08090C] border-red-500/40 shadow-red-950/20"
              }`}
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span
                      className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                        showFanVault
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50"
                          : "bg-red-500/20 text-red-300 border border-red-500/50"
                      }`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${showFanVault ? "bg-emerald-400 animate-pulse" : "bg-red-400"}`} />
                      {showFanVault ? "● ĐÃ XUẤT BẢN RA WEBSITE (LIVE)" : "○ TẠM ẨN KHỎI WEBSITE (DRAFT)"}
                    </span>
                    <span className="text-xs text-gray-400 font-semibold">Chương 8 • Bảo tàng Kỷ vật & Cửa hàng Fan</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {showFanVault
                      ? "Kỷ vật Fan Vault đang hiển thị công khai trên website"
                      : "Kỷ vật Fan Vault đang được TẠM ẨN để bạn chuẩn bị nội dung"}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 max-w-3xl leading-relaxed font-light">
                    {showFanVault
                      ? "Khách truy cập cr1000.live có thể xem trọn vẹn danh mục kỷ vật, áo đấu và click mua hàng qua các link tiếp thị liên kết (Affiliate). Menu 'Kỷ vật Fan' trên Navbar và Footer đang hiển thị bình thường."
                      : "Section này cùng mục 'Kỷ vật Fan' trên Navbar và Footer đã được ẩn hoàn toàn khỏi mắt người xem. Bạn có thể thoải mái thêm sản phẩm, cập nhật link affiliate Shopee, Lazada, TikTok Shop, Nike mà không sợ ảnh hưởng giao diện chính."}
                  </p>
                </div>

                <div className="shrink-0">
                  {showFanVault ? (
                    <button
                      type="button"
                      onClick={() => handleToggleFanVault(false)}
                      className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-xl shadow-red-950/60 cursor-pointer active:scale-95"
                    >
                      <Lock className="w-4 h-4" />
                      <span>Tạm ẩn khỏi Website (Draft)</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleToggleFanVault(true)}
                      className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:brightness-110 text-black font-black text-xs sm:text-sm flex items-center gap-2 transition-all shadow-xl shadow-emerald-950/60 cursor-pointer active:scale-95"
                    >
                      <Unlock className="w-4 h-4" />
                      <span>Kích hoạt Xuất bản ra Website (Publish Live)</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Catalog Toolbar */}
            <div className="bg-[#10131E] border border-gray-800 rounded-2xl p-5 shadow-lg">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-800">
                <div>
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
                    <span>Danh mục Sản phẩm & Affiliate Link ({localShopItems.length} sản phẩm)</span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Gắn link Shopee Affiliate, Lazada, TikTok Shop, Nike hoặc Amazon để nhận hoa hồng mỗi khi fan bóng đá click mua.
                  </p>
                </div>

                <div className="flex items-center gap-2.5 flex-wrap">
                  <button
                    type="button"
                    onClick={handleOpenAddShopItem}
                    className="px-4 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#F59E0B] text-black font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-[#D4AF37]/20 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Thêm sản phẩm mới</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResetShopItems}
                    className="px-3.5 py-2.5 rounded-xl bg-[#1A1D27] hover:bg-[#252A38] text-gray-300 text-xs font-bold border border-gray-700 flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Khôi phục mẫu</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveAllShopItems}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-950/40 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Lưu tất cả sản phẩm</span>
                  </button>
                </div>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {[
                  { id: "all", label: "Tất cả sản phẩm" },
                  { id: "jersey", label: "Áo đấu thi đấu" },
                  { id: "boots", label: "Giày bóng đá" },
                  { id: "lifestyle", label: "Thời trang CR7" },
                  { id: "memorabilia", label: "Kỷ vật lưu niệm" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setShopCategoryFilter(tab.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                      shopCategoryFilter === tab.id
                        ? "bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40"
                        : "bg-[#161924] text-gray-400 hover:text-white border border-transparent"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {localShopItems
                .filter((item) => (shopCategoryFilter === "all" ? true : item.category === shopCategoryFilter))
                .map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#0F121C] border border-gray-800 hover:border-[#D4AF37]/40 rounded-2xl p-4 transition-all duration-300 flex flex-col justify-between group shadow-lg"
                  >
                    <div>
                      {/* Thumbnail & Badges */}
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-black/50 mb-3 border border-white/5">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as any).src = "https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=600&auto=format&fit=crop";
                          }}
                        />
                        {item.badge && (
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#D4AF37] text-black text-[10px] font-black uppercase tracking-wider shadow">
                            {item.badge}
                          </span>
                        )}
                        <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur text-white text-[10px] font-bold border border-white/10">
                          {item.platform}
                        </span>
                      </div>

                      {/* Title & Category */}
                      <div className="mb-2">
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                          {item.category === "jersey"
                            ? "Áo đấu"
                            : item.category === "boots"
                            ? "Giày thi đấu"
                            : item.category === "lifestyle"
                            ? "Đời sống"
                            : "Kỷ vật"}
                        </span>
                        <h4 className="text-sm font-bold text-white line-clamp-2 mt-0.5 group-hover:text-[#D4AF37] transition-colors">
                          {item.name}
                        </h4>
                      </div>

                      {/* Pricing */}
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-sm font-extrabold text-[#D4AF37] font-mono">{item.priceText}</span>
                        {item.originalPriceText && (
                          <span className="text-xs text-gray-500 line-through font-mono">{item.originalPriceText}</span>
                        )}
                      </div>

                      {/* Affiliate Link Preview */}
                      <div className="bg-[#090A10] p-2.5 rounded-xl border border-gray-800 text-[11px] text-gray-400 mb-3 space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="flex items-center gap-1.5 text-white font-semibold min-w-0">
                            <span>🇻🇳</span>
                            <span className="text-[10px] text-orange-400 font-bold shrink-0">Shopee VN:</span>
                            <span className="truncate font-mono text-[10px] text-gray-300">
                              {item.geoLinks?.VN?.url || item.affiliateUrl || "Chưa gắn link"}
                            </span>
                          </span>
                          {(item.geoLinks?.VN?.url || item.affiliateUrl) && (
                            <a
                              href={item.geoLinks?.VN?.url || item.affiliateUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#D4AF37] hover:underline shrink-0"
                              title="Thử mở link Shopee VN"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                        {item.geoLinks?.US?.url && (
                          <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/5">
                            <span className="flex items-center gap-1.5 text-white font-semibold min-w-0">
                              <span>🇺🇸</span>
                              <span className="text-[10px] text-amber-400 font-bold shrink-0">Amazon US:</span>
                              <span className="truncate font-mono text-[10px] text-gray-400">
                                {item.geoLinks.US.url}
                              </span>
                            </span>
                            <a
                              href={item.geoLinks.US.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-amber-400 hover:underline shrink-0"
                              title="Thử mở link Amazon US"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 pt-3 border-t border-gray-800">
                      <button
                        type="button"
                        onClick={() => handleEditShopItem(item)}
                        className="flex-1 py-2 rounded-xl bg-[#1B1F2D] hover:bg-[#252B3D] text-gray-200 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Chỉnh sửa</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteShopItem(item.id)}
                        className="p-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-400 hover:text-red-300 transition-all cursor-pointer"
                        title="Xóa sản phẩm này"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            {/* Modal Edit / Add Item */}
            {isShopModalOpen && editingShopItem && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-[#11131E] border border-gray-700 rounded-3xl max-w-xl w-full p-6 shadow-2xl relative my-8">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-800 mb-5">
                    <h3 className="text-lg font-black text-white flex items-center gap-2">
                      <Tag className="w-5 h-5 text-[#D4AF37]" />
                      <span>{localShopItems.some((i) => i.id === editingShopItem.id) ? "Chỉnh sửa Kỷ vật" : "Thêm Kỷ vật mới"}</span>
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsShopModalOpen(false)}
                      className="p-1.5 rounded-lg bg-gray-800 text-gray-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveShopItemModal} className="space-y-4 text-xs">
                    <div>
                      <label className="block text-gray-300 font-bold mb-1">Tên sản phẩm kỷ vật (*):</label>
                      <input
                        type="text"
                        required
                        value={editingShopItem.name}
                        onChange={(e) => setEditingShopItem({ ...editingShopItem, name: e.target.value })}
                        placeholder="VD: Áo đấu Real Madrid Final Cardiff 2017 #7 Ronaldo"
                        className="w-full bg-[#181B26] border border-gray-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-gray-300 font-bold mb-1">Phân loại:</label>
                        <select
                          value={editingShopItem.category}
                          onChange={(e) => setEditingShopItem({ ...editingShopItem, category: e.target.value as any })}
                          className="w-full bg-[#181B26] border border-gray-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                        >
                          <option value="jersey">Áo đấu thi đấu (Jersey)</option>
                          <option value="boots">Giày thi đấu (Boots)</option>
                          <option value="lifestyle">Thời trang & Đời sống (Lifestyle)</option>
                          <option value="memorabilia">Kỷ vật lưu niệm (Memorabilia)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-300 font-bold mb-1">Nền tảng mua hàng:</label>
                        <select
                          value={editingShopItem.platform}
                          onChange={(e) => setEditingShopItem({ ...editingShopItem, platform: e.target.value as any })}
                          className="w-full bg-[#181B26] border border-gray-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                        >
                          <option value="Shopee">Shopee</option>
                          <option value="Lazada">Lazada</option>
                          <option value="Nike">Nike Official</option>
                          <option value="Unisport">Unisport</option>
                          <option value="Amazon">Amazon</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-gray-300 font-bold mb-1">Giá bán hiển thị:</label>
                        <input
                          type="text"
                          value={editingShopItem.priceText}
                          onChange={(e) => setEditingShopItem({ ...editingShopItem, priceText: e.target.value })}
                          placeholder="490.000₫ – 890.000₫"
                          className="w-full bg-[#181B26] border border-gray-700 rounded-xl px-3 py-2 text-white text-xs font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 font-bold mb-1">Giá gốc (gạch ngang):</label>
                        <input
                          type="text"
                          value={editingShopItem.originalPriceText || ""}
                          onChange={(e) => setEditingShopItem({ ...editingShopItem, originalPriceText: e.target.value })}
                          placeholder="1.200.000₫"
                          className="w-full bg-[#181B26] border border-gray-700 rounded-xl px-3 py-2 text-white text-xs font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 font-bold mb-1">Huy hiệu (Badge):</label>
                        <input
                          type="text"
                          value={editingShopItem.badge || ""}
                          onChange={(e) => setEditingShopItem({ ...editingShopItem, badge: e.target.value })}
                          placeholder="Bán chạy nhất / Xu hướng"
                          className="w-full bg-[#181B26] border border-gray-700 rounded-xl px-3 py-2 text-white text-xs"
                        />
                      </div>
                    </div>

                    {/* Dynamic Multi-Market Geo Links */}
                    <div className="bg-[#0B0D15] p-3.5 rounded-2xl border border-[#D4AF37]/30 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-gray-200 font-bold flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>Link Tiếp thị liên kết theo Quốc gia (Dynamic Geo-Links):</span>
                        </label>
                        <span className="text-[10px] text-amber-400 font-semibold bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                          Tự động nhận diện User
                        </span>
                      </div>

                      {/* VN */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-gray-300 font-semibold flex items-center gap-1.5">
                            <span>🇻🇳</span>
                            <span>Link Shopee (Việt Nam) (*):</span>
                          </label>
                          <span className="text-[10px] text-gray-500 font-mono">Hiển thị cho khách tại VN</span>
                        </div>
                        <input
                          type="url"
                          required
                          value={
                            editingShopItem.geoLinks?.VN?.url ||
                            (editingShopItem.platform === "Shopee" ? editingShopItem.affiliateUrl : "")
                          }
                          onChange={(e) => {
                            const val = e.target.value;
                            setEditingShopItem({
                              ...editingShopItem,
                              affiliateUrl: val || editingShopItem.affiliateUrl,
                              geoLinks: {
                                ...editingShopItem.geoLinks,
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
                          <label className="text-gray-300 font-semibold flex items-center gap-1.5">
                            <span>🇺🇸</span>
                            <span>Link Amazon (Mỹ & Toàn cầu):</span>
                          </label>
                          <span className="text-[10px] text-gray-500 font-mono">Hiển thị cho khách Quốc tế</span>
                        </div>
                        <input
                          type="url"
                          value={
                            editingShopItem.geoLinks?.US?.url ||
                            (editingShopItem.platform === "Amazon" ? editingShopItem.affiliateUrl : "")
                          }
                          onChange={(e) => {
                            const val = e.target.value;
                            setEditingShopItem({
                              ...editingShopItem,
                              geoLinks: {
                                ...editingShopItem.geoLinks,
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
                          <label className="text-gray-300 font-semibold flex items-center gap-1.5">
                            <span>🇪🇺</span>
                            <span>Link Châu Âu (Tùy chọn - Unisport / Nike):</span>
                          </label>
                          <span className="text-[10px] text-gray-500 font-mono">Hiển thị cho khách Châu Âu</span>
                        </div>
                        <input
                          type="url"
                          value={editingShopItem.geoLinks?.EU?.url || ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEditingShopItem({
                              ...editingShopItem,
                              geoLinks: {
                                ...editingShopItem.geoLinks,
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
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-gray-300 font-bold">Hình ảnh sản phẩm (Image URL hoặc Tải lên):</label>
                        <label className="text-[11px] text-[#D4AF37] hover:underline cursor-pointer flex items-center gap-1 font-semibold">
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>Tải ảnh từ máy</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                const img = new Image();
                                img.onload = () => {
                                  const canvas = document.createElement("canvas");
                                  const maxDim = 800;
                                  let w = img.width;
                                  let h = img.height;
                                  if (w > maxDim || h > maxDim) {
                                    if (w > h) {
                                      h = Math.round((h * maxDim) / w);
                                      w = maxDim;
                                    } else {
                                      w = Math.round((w * maxDim) / h);
                                      h = maxDim;
                                    }
                                  }
                                  canvas.width = w;
                                  canvas.height = h;
                                  const ctx = canvas.getContext("2d");
                                  ctx?.drawImage(img, 0, 0, w, h);
                                  const base64 = canvas.toDataURL("image/jpeg", 0.85);
                                  setEditingShopItem({ ...editingShopItem, image: base64 });
                                };
                                img.src = event.target?.result as string;
                              };
                              reader.readAsDataURL(file);
                            }}
                          />
                        </label>
                      </div>
                      <input
                        type="text"
                        value={editingShopItem.image}
                        onChange={(e) => setEditingShopItem({ ...editingShopItem, image: e.target.value })}
                        placeholder="https://images.unsplash.com/... hoặc bấm 'Tải ảnh từ máy'"
                        className="w-full bg-[#181B26] border border-gray-700 rounded-xl px-3 py-2 text-white text-xs font-mono focus:outline-none focus:border-[#D4AF37]"
                      />
                      {editingShopItem.image && (
                        <div className="mt-2 flex items-center gap-3 bg-[#0A0C13] p-2 rounded-xl border border-gray-800">
                          <img
                            src={editingShopItem.image}
                            alt="Preview"
                            className="w-12 h-12 rounded-lg object-cover border border-gray-700"
                            onError={(e) => {
                              (e.target as any).src = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop";
                            }}
                          />
                          <span className="text-[11px] text-gray-400">Xem trước ảnh sản phẩm</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-300 font-bold mb-1">Mô tả sản phẩm:</label>
                      <textarea
                        rows={2}
                        value={editingShopItem.description}
                        onChange={(e) => setEditingShopItem({ ...editingShopItem, description: e.target.value })}
                        placeholder="Mô tả ngắn gọn về kỷ vật, chất liệu, ý nghĩa lịch sử..."
                        className="w-full bg-[#181B26] border border-gray-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div className="pt-3 flex items-center justify-end gap-3 border-t border-gray-800">
                      <button
                        type="button"
                        onClick={() => setIsShopModalOpen(false)}
                        className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300 font-bold text-xs hover:bg-gray-700"
                      >
                        Hủy bỏ
                      </button>

                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#F59E0B] text-black font-black text-xs shadow-md shadow-[#D4AF37]/20"
                      >
                        Lưu Kỷ vật
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: AUTO-PILOT AUTOMATION ENGINE */}
        {activeTab === "autopilot" && (
          <div className="space-y-6">
            {/* Overview Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#121522] to-[#0A0C13] border border-[#D4AF37]/30 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 text-[10px] font-bold uppercase tracking-wider mb-2">
                    <Activity className="w-3.5 h-3.5 animate-pulse" />
                    <span>Cấp độ 3 • Tự Động Hóa 100% (Auto-Pilot)</span>
                  </div>
                  <h3 className="text-xl font-black text-white">Hệ Thống Tự Động Quét & Cập Nhật Bàn Thắng</h3>
                  <p className="text-xs text-gray-400 mt-1 max-w-2xl leading-relaxed">
                    Hệ thống tích hợp <strong>Vercel Cron Jobs</strong> (chạy định kỳ 1 lần/ngày lúc 05:00 sáng VN - ngay sau khi các trận đấu đêm của Al Nassr & ĐTQG kết thúc) và <strong>Webhook Endpoint</strong> tiếp nhận dữ liệu thời gian thực.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={async () => {
                    setCronLoading(true);
                    setCronResponse(null);
                    try {
                      const res = await fetch("/api/cron/sync-cr7?force=true");
                      const data = await res.json();
                      setCronResponse(data);
                    } catch (e: any) {
                      setCronResponse({ error: e.message });
                    } finally {
                      setCronLoading(false);
                    }
                  }}
                  disabled={cronLoading}
                  className="px-5 py-2.5 rounded-xl bg-[#D4AF37] text-black font-bold text-xs flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-[#D4AF37]/20 shrink-0"
                >
                  <RefreshCw className={`w-4 h-4 ${cronLoading ? "animate-spin" : ""}`} />
                  <span>{cronLoading ? "Đang quét API..." : "⚡ Chạy quét kiểm tra ngay"}</span>
                </button>
              </div>

              {/* Status Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10 text-xs">
                <div className="p-3.5 rounded-xl bg-[#0B0D14] border border-white/5">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Vercel Cron Engine</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Đã cấu hình (1 lần/ngày • 22:00 UTC / 05:00 sáng VN)
                  </span>
                  <span className="text-[10px] font-mono text-gray-500 block mt-1">/api/cron/sync-cr7</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0B0D14] border border-white/5">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Cổng Webhook Thời Gian Thực</span>
                  <span className="text-[#D4AF37] font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Sẵn sàng tiếp nhận POST
                  </span>
                  <span className="text-[10px] font-mono text-gray-500 block mt-1">/api/webhook/goal-alert</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0B0D14] border border-white/5">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">GitOps Zero-Touch</span>
                  <span className="text-gray-300 font-bold flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Hỗ trợ GitHub Auto-Commit
                  </span>
                  <span className="text-[10px] text-gray-500 block mt-1">Vercel Deploy tự động 25s</span>
                </div>
              </div>

              {/* Cron Run Response Display */}
              {cronResponse && (
                <div className="mt-4 p-4 rounded-xl bg-[#05060A] border border-emerald-500/30 text-xs font-mono text-emerald-300 overflow-x-auto">
                  <div className="flex items-center justify-between mb-2 pb-1 border-b border-white/10 text-white font-bold">
                    <span>Kết quả quét mới nhất từ Football Auto-Pilot Engine:</span>
                    <span className="text-emerald-400">✓ Hoạt động hoàn hảo</span>
                  </div>
                  <pre className="text-[11px] leading-relaxed">{JSON.stringify(cronResponse, null, 2)}</pre>
                </div>
              )}
            </div>

            {/* Test Webhook Simulator */}
            <div className="p-6 rounded-2xl bg-[#11131C] border border-gray-800 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Send className="w-4 h-4 text-[#D4AF37]" />
                <span>Thử nghiệm kích hoạt Webhook khi CR7 ghi bàn mới</span>
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Mô phỏng tín hiệu gửi tới hệ thống khi Ronaldo nổ súng. Bạn có thể test trực tiếp xem website tiếp nhận dữ liệu thế nào:
              </p>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setWebhookLoading(true);
                  setWebhookResult(null);
                  try {
                    const res = await fetch("/api/webhook/goal-alert", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        goals: parseInt(webhookGoals, 10),
                        match: webhookMatch,
                        secret: "cr1000_secret_webhook_key",
                      }),
                    });
                    const data = await res.json();
                    setWebhookResult(data);
                    if (data.status === "success" && data.currentGoals) {
                      setGoals(data.currentGoals);
                      setSaveNotification(`⚡ Auto-Pilot Webhook đã ghi nhận: ${data.currentGoals} bàn thắng!`);
                    }
                  } catch (err: any) {
                    setWebhookResult({ error: err.message });
                  } finally {
                    setWebhookLoading(false);
                  }
                }}
                className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end"
              >
                <div className="sm:col-span-3">
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Số bàn thắng mới:</label>
                  <input
                    type="number"
                    value={webhookGoals}
                    onChange={(e) => setWebhookGoals(e.target.value)}
                    className="w-full bg-[#181B26] border border-gray-700 rounded-xl px-3 py-2 text-xs font-mono font-bold text-[#D4AF37]"
                  />
                </div>

                <div className="sm:col-span-6">
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Tên trận đấu / Bối cảnh:</label>
                  <input
                    type="text"
                    value={webhookMatch}
                    onChange={(e) => setWebhookMatch(e.target.value)}
                    className="w-full bg-[#181B26] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="sm:col-span-3">
                  <button
                    type="submit"
                    disabled={webhookLoading}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-black font-bold text-xs flex items-center justify-center gap-1.5 hover:opacity-95"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{webhookLoading ? "Đang gửi..." : "Gửi Webhook Test"}</span>
                  </button>
                </div>
              </form>

              {webhookResult && (
                <div className="p-3 rounded-xl bg-[#090B10] border border-emerald-500/30 text-xs font-mono text-emerald-300">
                  <pre>{JSON.stringify(webhookResult, null, 2)}</pre>
                </div>
              )}
            </div>

            {/* Step by Step Zero-Touch Guide */}
            <div className="p-6 rounded-2xl bg-[#0D0F17] border border-white/5 space-y-3 text-xs text-gray-300 leading-relaxed">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider text-[#D4AF37]">
                Hướng dẫn kích hoạt Zero-Touch Auto-Commit (100% rảnh tay)
              </h4>
              <p>
                Để bot có quyền tự động chỉnh sửa file code và tự kích hoạt Vercel build lại mà không cần bạn làm bất cứ điều gì:
              </p>
              <ol className="list-decimal list-inside space-y-1.5 text-gray-400">
                <li>Vào <strong>Vercel Dashboard</strong> ➔ Chọn dự án <strong>CR1000</strong> ➔ Tab <strong>Settings</strong> ➔ <strong>Environment Variables</strong>.</li>
                <li>Thêm biến: <code className="text-[#D4AF37] font-mono">GITHUB_PAT</code> với giá trị là mã Personal Access Token GitHub của bạn.</li>
                <li>Thêm biến (tùy chọn): <code className="text-[#D4AF37] font-mono">CRON_SECRET</code> để bảo mật endpoint cron.</li>
                <li>Từ thời điểm đó, mỗi khi có bàn thắng mới, Cron Job hoặc Webhook sẽ tự gọi GitHub API để tạo commit, và Vercel sẽ tự động build lại trang web trong 25 giây!</li>
              </ol>
            </div>
          </div>
        )}

        {/* TAB 5: EXPORT CODE */}
        {activeTab === "export" && (
          <div className="bg-[#11131C] border border-gray-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Xuất mã lưu trữ vĩnh viễn vào Codebase</h3>
            <p className="text-xs text-gray-400">
              Nếu bạn muốn các thay đổi về ảnh, số liệu và kỷ vật Fan Vault được nhúng vĩnh viễn vào file git (để deploy lên Vercel cho tất cả khách truy cập không phụ thuộc vào trình duyệt của bạn), bạn chỉ cần copy đoạn JSON cấu hình dưới đây:
            </p>
            <pre className="bg-[#090A10] p-4 rounded-xl border border-gray-800 text-xs font-mono text-gray-300 overflow-x-auto max-h-96">
              {JSON.stringify({ images: imageForm, currentGoals: parseInt(goalsInput, 10) || 985, nextMatch: matchForm, showFanVault, shopItemsCount: localShopItems.length }, null, 2)}
            </pre>
          </div>
        )}
      </main>
    </div>
  );
}
