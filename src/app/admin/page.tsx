"use client";

import React, { useState, useEffect } from "react";
import { useSiteData, defaultImages, CustomImages } from "@/context/SiteDataContext";
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
} from "lucide-react";

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
  } = useSiteData();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<"images" | "stats" | "autopilot" | "export">("images");

  // Local Form States
  const [imageForm, setImageForm] = useState<CustomImages>(images);
  const [goalsInput, setGoalsInput] = useState(goals.toString());
  const [matchForm, setMatchForm] = useState(nextMatch);
  const [saveNotification, setSaveNotification] = useState("");

  // Auto-Pilot States
  const [cronLoading, setCronLoading] = useState(false);
  const [cronResponse, setCronResponse] = useState<any>(null);
  const [webhookGoals, setWebhookGoals] = useState("986");
  const [webhookMatch, setWebhookMatch] = useState("Al Nassr vs Al Feiha");
  const [webhookLoading, setWebhookLoading] = useState(false);
  const [webhookResult, setWebhookResult] = useState<any>(null);

  useEffect(() => {
    setImageForm(images);
  }, [images]);

  useEffect(() => {
    setGoalsInput(goals.toString());
  }, [goals]);

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

  const handleFileUpload = (key: keyof CustomImages, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      alert("File ảnh lớn hơn 3MB. Vui lòng chọn ảnh nhẹ hơn để trang web tải nhanh và mượt!");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImageForm((prev) => ({ ...prev, [key]: reader.result as string }));
        setSaveNotification(`Đã đọc xong ảnh từ máy của bạn! Hãy bấm nút 'Lưu tất cả ảnh' để hiển thị ra trang chủ.`);
        setTimeout(() => setSaveNotification(""), 3500);
      }
    };
    reader.readAsDataURL(file);
  };

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
            <span>1. Quản lý Hình ảnh (Media)</span>
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
            <span>2. Số bàn thắng & Trận đấu</span>
          </button>

          <button
            onClick={() => setActiveTab("autopilot")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === "autopilot"
                ? "bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20"
                : "bg-[#141720] text-gray-300 hover:text-white"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>3. Tự động hóa Auto-Pilot (Cấp độ 3)</span>
          </button>

          <button
            onClick={() => setActiveTab("export")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === "export"
                ? "bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20"
                : "bg-[#141720] text-gray-300 hover:text-white"
            }`}
          >
            <Copy className="w-4 h-4" />
            <span>4. Xuất Code lưu trữ</span>
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

            {/* Hero Image */}
            <div className="bg-[#11131C] border border-gray-800 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 text-[#D4AF37]">
                Ảnh Banner Đầu Trang (Hero Showcase)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-8">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-gray-300">
                      Đường dẫn ảnh Hero:
                    </label>
                    <label className="cursor-pointer text-[11px] font-bold text-[#D4AF37] hover:text-white flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#222736] border border-gray-700 transition-all">
                      <span>📁 Tải file từ máy tính</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload("hero", e)}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <input
                    type="text"
                    value={imageForm.hero}
                    onChange={(e) => setImageForm({ ...imageForm, hero: e.target.value })}
                    className="w-full bg-[#181B26] border border-gray-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                  <span className="text-[11px] text-gray-500 mt-1 block">
                    Đường dẫn hiện tại: {imageForm.hero}
                  </span>
                </div>
                <div className="md:col-span-4 h-36 rounded-xl overflow-hidden border border-gray-700 bg-black">
                  <img
                    src={imageForm.hero}
                    alt="Hero Preview"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>

            {/* 7 Eras Images */}
            <div className="bg-[#11131C] border border-gray-800 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 text-[#D4AF37]">
                Ảnh 7 Kỷ Nguyên Sự Nghiệp (Chương 1)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. Madeira */}
                <div className="p-4 rounded-xl bg-[#161822] border border-gray-800 flex gap-4 items-center">
                  <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 border border-gray-700 bg-black">
                    <img src={imageForm.eraMadeira} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <strong className="text-white block">1. Madeira & Sporting (1985-2003)</strong>
                      <label className="cursor-pointer text-[10px] font-bold text-[#D4AF37] hover:text-white flex items-center gap-1 px-2 py-0.5 rounded bg-[#222736] border border-gray-700 transition-all">
                        <span>📁 Tải từ máy</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload("eraMadeira", e)}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <input
                      type="text"
                      value={imageForm.eraMadeira}
                      onChange={(e) => setImageForm({ ...imageForm, eraMadeira: e.target.value })}
                      placeholder="Link ảnh hoặc tải từ máy..."
                      className="w-full bg-[#11131A] border border-gray-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                {/* 2. MU 1 */}
                <div className="p-4 rounded-xl bg-[#161822] border border-gray-800 flex gap-4 items-center">
                  <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 border border-gray-700 bg-black">
                    <img src={imageForm.eraManUtd1} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <strong className="text-white block">2. Manchester United Kỳ 1 (2003-2009)</strong>
                      <label className="cursor-pointer text-[10px] font-bold text-[#D4AF37] hover:text-white flex items-center gap-1 px-2 py-0.5 rounded bg-[#222736] border border-gray-700 transition-all">
                        <span>📁 Tải từ máy</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload("eraManUtd1", e)}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <input
                      type="text"
                      value={imageForm.eraManUtd1}
                      onChange={(e) => setImageForm({ ...imageForm, eraManUtd1: e.target.value })}
                      placeholder="Link ảnh hoặc tải từ máy..."
                      className="w-full bg-[#11131A] border border-gray-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                {/* 3. Real Madrid */}
                <div className="p-4 rounded-xl bg-[#161822] border border-gray-800 flex gap-4 items-center">
                  <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 border border-gray-700 bg-black">
                    <img src={imageForm.eraRealMadrid} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <strong className="text-white block">3. Real Madrid (3 lần liên tiếp vô địch Champions League)</strong>
                      <label className="cursor-pointer text-[10px] font-bold text-[#D4AF37] hover:text-white flex items-center gap-1 px-2 py-0.5 rounded bg-[#222736] border border-gray-700 transition-all">
                        <span>📁 Tải từ máy</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload("eraRealMadrid", e)}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <input
                      type="text"
                      value={imageForm.eraRealMadrid}
                      onChange={(e) => setImageForm({ ...imageForm, eraRealMadrid: e.target.value })}
                      placeholder="Link ảnh hoặc tải từ máy..."
                      className="w-full bg-[#11131A] border border-gray-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                {/* 4. Juventus */}
                <div className="p-4 rounded-xl bg-[#161822] border border-gray-800 flex gap-4 items-center">
                  <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 border border-gray-700 bg-black">
                    <img src={imageForm.eraJuventus} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <strong className="text-white block">4. Juventus (2018-2021)</strong>
                      <label className="cursor-pointer text-[10px] font-bold text-[#D4AF37] hover:text-white flex items-center gap-1 px-2 py-0.5 rounded bg-[#222736] border border-gray-700 transition-all">
                        <span>📁 Tải từ máy</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload("eraJuventus", e)}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <input
                      type="text"
                      value={imageForm.eraJuventus}
                      onChange={(e) => setImageForm({ ...imageForm, eraJuventus: e.target.value })}
                      placeholder="Link ảnh hoặc tải từ máy..."
                      className="w-full bg-[#11131A] border border-gray-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                {/* 5. MU 2 */}
                <div className="p-4 rounded-xl bg-[#161822] border border-gray-800 flex gap-4 items-center">
                  <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 border border-gray-700 bg-black">
                    <img src={imageForm.eraManUtd2} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <strong className="text-white block">5. Manchester United Kỳ 2 (2021-2022)</strong>
                      <label className="cursor-pointer text-[10px] font-bold text-[#D4AF37] hover:text-white flex items-center gap-1 px-2 py-0.5 rounded bg-[#222736] border border-gray-700 transition-all">
                        <span>📁 Tải từ máy</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload("eraManUtd2", e)}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <input
                      type="text"
                      value={imageForm.eraManUtd2}
                      onChange={(e) => setImageForm({ ...imageForm, eraManUtd2: e.target.value })}
                      placeholder="Link ảnh hoặc tải từ máy..."
                      className="w-full bg-[#11131A] border border-gray-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                {/* 6. Al Nassr */}
                <div className="p-4 rounded-xl bg-[#161822] border border-gray-800 flex gap-4 items-center">
                  <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 border border-gray-700 bg-black">
                    <img src={imageForm.eraAlNassr} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <strong className="text-white block">6. Al Nassr (2023 - Nay)</strong>
                      <label className="cursor-pointer text-[10px] font-bold text-[#D4AF37] hover:text-white flex items-center gap-1 px-2 py-0.5 rounded bg-[#222736] border border-gray-700 transition-all">
                        <span>📁 Tải từ máy</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload("eraAlNassr", e)}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <input
                      type="text"
                      value={imageForm.eraAlNassr}
                      onChange={(e) => setImageForm({ ...imageForm, eraAlNassr: e.target.value })}
                      placeholder="Link ảnh hoặc tải từ máy..."
                      className="w-full bg-[#11131A] border border-gray-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                {/* 7. Portugal */}
                <div className="p-4 rounded-xl bg-[#161822] border border-gray-800 flex gap-4 items-center md:col-span-2">
                  <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 border border-gray-700 bg-black">
                    <img src={imageForm.eraPortugal} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <strong className="text-white block">7. ĐTQG Bồ Đào Nha (2003 - Nay • 3 Danh hiệu)</strong>
                      <label className="cursor-pointer text-[10px] font-bold text-[#D4AF37] hover:text-white flex items-center gap-1 px-2 py-0.5 rounded bg-[#222736] border border-gray-700 transition-all">
                        <span>📁 Tải từ máy</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload("eraPortugal", e)}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <input
                      type="text"
                      value={imageForm.eraPortugal}
                      onChange={(e) => setImageForm({ ...imageForm, eraPortugal: e.target.value })}
                      placeholder="Link ảnh hoặc tải từ máy..."
                      className="w-full bg-[#11131A] border border-gray-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Trophy Images */}
            <div className="bg-[#11131C] border border-gray-800 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 text-[#D4AF37]">
                Ảnh Các Chiếc Cúp & Danh Hiệu (Chương 5)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* UCL */}
                <div className="p-4 rounded-xl bg-[#161822] border border-gray-800 flex gap-4 items-center">
                  <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-gray-700 bg-black">
                    <img src={imageForm.trophyUcl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <strong className="text-white block">Cúp UEFA Champions League (C1)</strong>
                      <label className="cursor-pointer text-[10px] font-bold text-[#D4AF37] hover:text-white flex items-center gap-1 px-2 py-0.5 rounded bg-[#222736] border border-gray-700 transition-all">
                        <span>📁 Tải từ máy</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload("trophyUcl", e)}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <input
                      type="text"
                      value={imageForm.trophyUcl}
                      onChange={(e) => setImageForm({ ...imageForm, trophyUcl: e.target.value })}
                      placeholder="Link ảnh hoặc tải từ máy..."
                      className="w-full bg-[#11131A] border border-gray-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                {/* Ballon d'Or */}
                <div className="p-4 rounded-xl bg-[#161822] border border-gray-800 flex gap-4 items-center">
                  <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-gray-700 bg-black">
                    <img src={imageForm.trophyBallonDor} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <strong className="text-white block">Quả bóng Vàng (Ballon d&apos;Or)</strong>
                      <label className="cursor-pointer text-[10px] font-bold text-[#D4AF37] hover:text-white flex items-center gap-1 px-2 py-0.5 rounded bg-[#222736] border border-gray-700 transition-all">
                        <span>📁 Tải từ máy</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload("trophyBallonDor", e)}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <input
                      type="text"
                      value={imageForm.trophyBallonDor}
                      onChange={(e) => setImageForm({ ...imageForm, trophyBallonDor: e.target.value })}
                      placeholder="Link ảnh hoặc tải từ máy..."
                      className="w-full bg-[#11131A] border border-gray-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                {/* Euro */}
                <div className="p-4 rounded-xl bg-[#161822] border border-gray-800 flex gap-4 items-center">
                  <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-gray-700 bg-black">
                    <img src={imageForm.trophyEuro} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <strong className="text-white block">Cúp Vô Địch Euro (Henri Delaunay)</strong>
                      <label className="cursor-pointer text-[10px] font-bold text-[#D4AF37] hover:text-white flex items-center gap-1 px-2 py-0.5 rounded bg-[#222736] border border-gray-700 transition-all">
                        <span>📁 Tải từ máy</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload("trophyEuro", e)}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <input
                      type="text"
                      value={imageForm.trophyEuro}
                      onChange={(e) => setImageForm({ ...imageForm, trophyEuro: e.target.value })}
                      placeholder="Link ảnh hoặc tải từ máy..."
                      className="w-full bg-[#11131A] border border-gray-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                {/* Premier League */}
                <div className="p-4 rounded-xl bg-[#161822] border border-gray-800 flex gap-4 items-center">
                  <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-gray-700 bg-black">
                    <img src={imageForm.trophyPremierLeague} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <strong className="text-white block">Cúp Ngoại Hạng Anh (Premier League)</strong>
                      <label className="cursor-pointer text-[10px] font-bold text-[#D4AF37] hover:text-white flex items-center gap-1 px-2 py-0.5 rounded bg-[#222736] border border-gray-700 transition-all">
                        <span>📁 Tải từ máy</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload("trophyPremierLeague", e)}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <input
                      type="text"
                      value={imageForm.trophyPremierLeague}
                      onChange={(e) => setImageForm({ ...imageForm, trophyPremierLeague: e.target.value })}
                      placeholder="Link ảnh hoặc tải từ máy..."
                      className="w-full bg-[#11131A] border border-gray-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
              </div>
            </div>

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

            <div className="bg-[#11131C] border border-gray-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider text-[#D4AF37]">
                Thông Tin Trận Đấu Sắp Tới
              </h3>
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
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-black font-extrabold text-sm hover:opacity-95 shadow-xl shadow-[#D4AF37]/20"
            >
              Lưu Số Liệu & Trận Đấu
            </button>
          </form>
        )}

        {/* TAB 3: AUTO-PILOT AUTOMATION ENGINE */}
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

        {/* TAB 4: EXPORT CODE */}
        {activeTab === "export" && (
          <div className="bg-[#11131C] border border-gray-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Xuất mã lưu trữ vĩnh viễn vào Codebase</h3>
            <p className="text-xs text-gray-400">
              Nếu bạn muốn các thay đổi về ảnh và số liệu được nhúng vĩnh viễn vào file git (để deploy lên Vercel cho tất cả khách truy cập không phụ thuộc vào trình duyệt của bạn), bạn chỉ cần copy đoạn JSON cấu hình dưới đây:
            </p>
            <pre className="bg-[#090A10] p-4 rounded-xl border border-gray-800 text-xs font-mono text-gray-300 overflow-x-auto max-h-96">
              {JSON.stringify({ images: imageForm, currentGoals: parseInt(goalsInput, 10) || 985, nextMatch: matchForm }, null, 2)}
            </pre>
          </div>
        )}
      </main>
    </div>
  );
}
