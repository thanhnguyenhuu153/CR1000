"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Newspaper,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Save,
  RotateCcw,
  Sparkles,
  Calendar,
  Clock,
  Tag,
  ArrowRight,
  Database,
  RefreshCw,
  X,
  HelpCircle,
  Check,
} from "lucide-react";
import { JournalArticle, cr7JournalArticles } from "@/data/cr7-journal";

export default function JournalManagerTab() {
  const [articles, setArticles] = useState<JournalArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [source, setSource] = useState<string>("loading");
  const [notification, setNotification] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<JournalArticle | null>(null);
  const [saving, setSaving] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState<Partial<JournalArticle>>({
    id: "",
    slug: "",
    titleVi: "",
    titleEn: "",
    excerptVi: "",
    excerptEn: "",
    categoryVi: "Tin Nóng & Bước Ngoặt",
    categoryEn: "Breaking & Milestones",
    categorySlug: "breaking",
    publishedDate: new Date().toISOString().split("T")[0],
    readTimeVi: "5 phút đọc",
    readTimeEn: "5 min read",
    author: "CR1000 Editorial Team",
    coverImage: "/images/cr7/hero-cr7.jpg",
    isFeatured: false,
    tags: ["Ronaldo", "CR7", "1000 Goals"],
    quickTakeawayVi: "",
    quickTakeawayEn: "",
    keyStats: [
      { labelVi: "Bàn thắng", labelEn: "Goals", value: "985", highlight: true },
      { labelVi: "Còn lại", labelEn: "Remaining", value: "15" },
    ],
    sectionsVi: [
      {
        heading: "Nội dung chính",
        content: ["Nhập nội dung bài viết tiếng Việt tại đây..."],
      },
    ],
    sectionsEn: [
      {
        heading: "Main Story",
        content: ["Enter English content here..."],
      },
    ],
    faqsVi: [
      {
        question: "Cristiano Ronaldo còn cách mốc 1000 bàn bao xa?",
        answer: "CR7 hiện đã ghi 985 bàn, chỉ còn cách đúng 15 bàn thắng.",
      },
    ],
    faqsEn: [
      {
        question: "How many goals does Cristiano Ronaldo still need for 1,000?",
        answer: "CR7 has scored 985 official career goals, needing only 15 more.",
      },
    ],
  });

  // Load articles from /api/journal
  const loadArticles = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/journal");
      const data = await res.json();
      if (data?.articles) {
        setArticles(data.articles);
        setSource(data.source || "supabase");
      }
    } catch (err: any) {
      setArticles(cr7JournalArticles);
      setSource("fallback");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const notify = (text: string, type: "success" | "error" = "success") => {
    setNotification({ text, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Local text buffer for rich paragraphs
  const [viContent, setViContent] = useState("");
  const [enContent, setEnContent] = useState("");

  const handleOpenCreate = () => {
    setEditingArticle(null);
    setViContent("");
    setEnContent("");
    setFormData({
      id: `art_${Date.now()}`,
      slug: "",
      titleVi: "",
      titleEn: "",
      excerptVi: "",
      excerptEn: "",
      categoryVi: "Tin Nóng & Bước Ngoặt",
      categoryEn: "Breaking & Milestones",
      categorySlug: "breaking",
      publishedDate: new Date().toISOString().split("T")[0],
      readTimeVi: "5 phút đọc",
      readTimeEn: "5 min read",
      author: "CR1000 Editorial Team",
      coverImage: "/images/cr7/hero-cr7.jpg",
      isFeatured: false,
      tags: ["Ronaldo", "CR7", "1000 Goals"],
      quickTakeawayVi: "",
      quickTakeawayEn: "",
      keyStats: [
        { labelVi: "Bàn thắng", labelEn: "Goals", value: "985", highlight: true },
        { labelVi: "Còn lại", labelEn: "Remaining", value: "15" },
      ],
      sectionsVi: [],
      sectionsEn: [],
      faqsVi: [],
      faqsEn: [],
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (article: JournalArticle) => {
    setEditingArticle(article);
    setFormData({ ...article });
    
    // Combine all sections paragraphs for clean editing
    const fullVi = (article.sectionsVi || [])
      .map((s) => s.content.join("\n\n"))
      .join("\n\n\n");
    const fullEn = (article.sectionsEn || [])
      .map((s) => s.content.join("\n\n"))
      .join("\n\n\n");

    setViContent(fullVi);
    setEnContent(fullEn);
    setIsModalOpen(true);
  };

  const handleDelete = async (article: JournalArticle) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa bài viết "${article.titleVi}" không?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/journal?slug=${article.slug}&id=${article.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        notify("Đã xóa bài viết thành công!");
        loadArticles();
      } else {
        notify(data.error || "Không thể xóa bài viết", "error");
      }
    } catch (e: any) {
      notify(e.message, "error");
    }
  };

  // Seed default 3 articles into Supabase if empty
  const handleSeedDefaults = async () => {
    if (!confirm("Hệ thống sẽ đồng bộ 3 bài viết mẫu hiện có lên database Supabase của bạn. Tiếp tục?")) {
      return;
    }

    setSaving(true);
    let successCount = 0;
    for (const art of cr7JournalArticles) {
      try {
        const res = await fetch("/api/journal", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ article: art }),
        });
        if (res.ok) successCount++;
      } catch (e) {}
    }

    setSaving(false);
    notify(`Đã đồng bộ thành công ${successCount}/3 bài viết lên Supabase!`);
    loadArticles();
  };

  // Submit article
  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titleVi || !formData.slug) {
      notify("Vui lòng điền tiêu đề tiếng Việt và đường dẫn slug!", "error");
      return;
    }

    setSaving(true);
    try {
      const viParagraphs = viContent.split("\n\n").map((p) => p.trim()).filter(Boolean);
      const enParagraphs = enContent.split("\n\n").map((p) => p.trim()).filter(Boolean);

      const payload = {
        ...formData,
        sectionsVi: [
          {
            heading: "Diễn biến sự kiện",
            content: viParagraphs.length ? viParagraphs : [viContent],
          },
        ],
        sectionsEn: [
          {
            heading: "Event Breakdown",
            content: enParagraphs.length ? enParagraphs : [enContent || viContent],
          },
        ],
      };

      const res = await fetch("/api/journal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ article: payload }),
      });
      const data = await res.json();

      if (res.ok) {
        notify("Xuất bản bài viết thành công! Trang web đã được cập nhật tức thì.");
        setIsModalOpen(false);
        loadArticles();
      } else {
        notify(data.error || "Có lỗi xảy ra khi lưu bài viết", "error");
      }
    } catch (err: any) {
      notify(err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  // Auto-slug generator
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  };

  return (
    <div className="space-y-6">
      {/* Notification Toast */}
      {notification && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-2.5 text-xs sm:text-sm font-semibold shadow-xl transition-all ${
            notification.type === "success"
              ? "bg-emerald-950/80 border border-emerald-500/50 text-emerald-200"
              : "bg-red-950/80 border border-red-500/50 text-red-200"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          )}
          <span>{notification.text}</span>
        </div>
      )}

      {/* Top Banner / Integration Status */}
      <div className="p-6 rounded-3xl bg-[#101422] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl font-black text-white">Quản lý Nhật Ký Đường Tới 1.000 Bàn</h2>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                source === "supabase"
                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                  : "bg-amber-500/20 text-amber-400 border-amber-500/40"
              }`}
            >
              {source === "supabase" ? "● SUPABASE LIVE" : "○ STATIC FALLBACK"}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1 max-w-xl">
            Đăng và chỉnh sửa bài viết mọi lúc mọi nơi. Nhờ cơ chế On-Demand Revalidation, bài viết sau khi xuất bản sẽ hiển thị ngay trên web trong 0.5s mà không cần deploy lại mã nguồn!
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={loadArticles}
            className="p-2.5 rounded-xl bg-[#141720] hover:bg-gray-800 text-gray-300 transition-colors border border-gray-800"
            title="Làm mới danh sách"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          <button
            type="button"
            onClick={handleSeedDefaults}
            disabled={saving}
            className="px-3.5 py-2.5 rounded-xl bg-[#181C28] hover:bg-gray-800 text-xs font-bold text-[#D4AF37] border border-[#D4AF37]/30 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Database className="w-3.5 h-3.5" />
            <span>Đồng bộ 3 bài mẫu lên DB</span>
          </button>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="px-4 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#F59E0B] text-black font-extrabold text-xs transition-all flex items-center gap-1.5 shadow-lg shadow-[#D4AF37]/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Viết bài mới</span>
          </button>
        </div>
      </div>

      {/* Articles List */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-12 text-center text-gray-400 text-sm">
            Đang tải dữ liệu bài viết từ Supabase...
          </div>
        ) : articles.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#10131E] border border-white/5 space-y-3">
            <p className="text-gray-400 text-sm">Chưa có bài viết nào trên database Supabase của bạn.</p>
            <button
              onClick={handleSeedDefaults}
              className="px-4 py-2 rounded-xl bg-[#D4AF37] text-black text-xs font-bold"
            >
              Nhấn vào đây để đẩy 3 bài viết có sẵn lên Supabase
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {articles.map((art) => (
              <div
                key={art.id || art.slug}
                className="p-4 sm:p-5 rounded-2xl bg-[#10131E] border border-white/5 hover:border-[#D4AF37]/30 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-white/10">
                    <Image
                      src={art.coverImage || "/images/cr7/hero-cr7.jpg"}
                      alt={art.titleVi}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20">
                        {art.categoryVi}
                      </span>
                      {art.isFeatured && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-black bg-red-600/30 text-red-400 border border-red-500/30">
                          FEATURED
                        </span>
                      )}
                      <span className="text-[11px] text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {art.publishedDate}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1">
                      {art.titleVi}
                    </h3>

                    <p className="text-xs text-gray-400 line-clamp-1 max-w-xl">
                      {art.excerptVi}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <Link
                    href={`/road-to-1000/${art.slug}`}
                    target="_blank"
                    className="p-2 rounded-xl bg-gray-800/80 hover:bg-gray-700 text-gray-300 transition-colors"
                    title="Xem trên web"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => handleOpenEdit(art)}
                    className="p-2 rounded-xl bg-[#141720] hover:bg-[#D4AF37] text-gray-300 hover:text-black transition-colors"
                    title="Chỉnh sửa bài viết"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(art)}
                    className="p-2 rounded-xl bg-red-950/40 hover:bg-red-600 text-red-400 hover:text-white transition-colors"
                    title="Xóa bài viết"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CREATE / EDIT ARTICLE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0C0F17] border border-gray-800 rounded-3xl shadow-2xl overflow-y-auto p-6 sm:p-8 space-y-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
                  <Newspaper className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {editingArticle ? "Chỉnh sửa bài viết" : "Viết bài mới vào Nhật Ký"}
                  </h3>
                  <p className="text-xs text-gray-400">
                    Bài viết sẽ lưu trực tiếp vào Supabase và kích hoạt hiển thị tức thời
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-gray-800 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveArticle} className="space-y-6">
              {/* Basic Meta Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Title VI */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-gray-300">
                    Tiêu đề Tiếng Việt <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.titleVi || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        titleVi: val,
                        slug: prev.slug ? prev.slug : generateSlug(val),
                      }));
                    }}
                    placeholder="VD: Cristiano Ronaldo nổ súng cú đúp vào lưới Al-Shabab..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#141724] border border-gray-800 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {/* Title EN */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-gray-300">
                    Tiêu đề Tiếng Anh (English Title)
                  </label>
                  <input
                    type="text"
                    value={formData.titleEn || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, titleEn: e.target.value }))}
                    placeholder="VD: Cristiano Ronaldo scores a stunning brace against Al-Shabab..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#141724] border border-gray-800 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {/* Slug */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-300">
                    Đường dẫn tĩnh (Slug) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                    placeholder="vd: ronaldo-brace-vs-al-shabab"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#141724] border border-gray-800 text-xs font-mono text-[#D4AF37] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {/* Category */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-300">Danh mục bài viết</label>
                  <select
                    value={formData.categorySlug || "breaking"}
                    onChange={(e) => {
                      const slug = e.target.value as "breaking" | "data" | "legacy";
                      const names = {
                        breaking: { vi: "Tin Nóng & Bước Ngoặt", en: "Breaking & Milestones" },
                        data: { vi: "Phân Tích Số Liệu", en: "Data & Forecast" },
                        legacy: { vi: "Kỷ Lục & Di Sản", en: "Legacy & Records" },
                      };
                      setFormData((prev) => ({
                        ...prev,
                        categorySlug: slug,
                        categoryVi: names[slug].vi,
                        categoryEn: names[slug].en,
                      }));
                    }}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#141724] border border-gray-800 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="breaking">Tin Nóng & Bước Ngoặt (Breaking)</option>
                    <option value="data">Phân Tích Số Liệu (Data)</option>
                    <option value="legacy">Kỷ Lục & Di Sản (Legacy)</option>
                  </select>
                </div>

                {/* Published Date */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-300">Ngày xuất bản</label>
                  <input
                    type="date"
                    value={formData.publishedDate || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, publishedDate: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#141724] border border-gray-800 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {/* Cover Image */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-300">Ảnh bìa (Đường dẫn)</label>
                  <input
                    type="text"
                    value={formData.coverImage || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, coverImage: e.target.value }))}
                    placeholder="/images/cr7/era-alnassr.jpg hoặc https://..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#141724] border border-gray-800 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* AIO Quick Takeaway Box */}
              <div className="space-y-3 p-4 rounded-2xl bg-[#141724] border border-[#D4AF37]/30">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#D4AF37]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Tóm tắt cốt lõi AIO (Dành cho Google AI Overview trích dẫn)</span>
                </div>
                <div className="space-y-2">
                  <textarea
                    rows={2}
                    value={formData.quickTakeawayVi || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, quickTakeawayVi: e.target.value }))}
                    placeholder="Tóm tắt 2-3 câu ngắn gọn chứa số liệu và thông tin then chốt (Tiếng Việt)..."
                    className="w-full p-3 rounded-xl bg-[#0B0D14] border border-gray-800 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                  <textarea
                    rows={2}
                    value={formData.quickTakeawayEn || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, quickTakeawayEn: e.target.value }))}
                    placeholder="English AIO Summary..."
                    className="w-full p-3 rounded-xl bg-[#0B0D14] border border-gray-800 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-300">Đoạn mở đầu / Trích dẫn ngắn (Excerpt)</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <textarea
                    rows={3}
                    value={formData.excerptVi || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, excerptVi: e.target.value }))}
                    placeholder="Trích dẫn Tiếng Việt hiển thị trên thẻ bài viết..."
                    className="w-full p-3 rounded-xl bg-[#141724] border border-gray-800 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                  <textarea
                    rows={3}
                    value={formData.excerptEn || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, excerptEn: e.target.value }))}
                    placeholder="English Excerpt..."
                    className="w-full p-3 rounded-xl bg-[#141724] border border-gray-800 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Main Content Paragraphs (Bilingual Editor) */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1 border-b border-gray-800">
                  <label className="text-xs font-bold text-gray-200 uppercase tracking-wider">
                    Nội dung bài viết chi tiết (Song ngữ VI & EN)
                  </label>
                  <span className="text-[11px] text-gray-400">
                    Mỗi đoạn văn cách nhau bằng 1 dòng trống (Enter 2 lần)
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* VI Content */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <span>🇻🇳</span>
                      <span>Nội dung chi tiết (Tiếng Việt)</span>
                    </span>
                    <textarea
                      rows={9}
                      value={viContent}
                      onChange={(e) => setViContent(e.target.value)}
                      placeholder="Nhập nội dung các đoạn văn tiếng Việt tại đây (Mỗi đoạn cách nhau 1 dòng trống)..."
                      className="w-full p-3.5 rounded-xl bg-[#141724] border border-gray-800 text-xs text-white focus:outline-none focus:border-[#D4AF37] font-sans leading-relaxed"
                    />
                  </div>

                  {/* EN Content */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <span>🇺🇸</span>
                      <span>Main Content (English)</span>
                    </span>
                    <textarea
                      rows={9}
                      value={enContent}
                      onChange={(e) => setEnContent(e.target.value)}
                      placeholder="Enter English article paragraphs here (Separate paragraphs by an empty line)..."
                      className="w-full p-3.5 rounded-xl bg-[#141724] border border-gray-800 text-xs text-white focus:outline-none focus:border-[#D4AF37] font-sans leading-relaxed"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 text-xs font-semibold text-gray-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(formData.isFeatured)}
                      onChange={(e) => setFormData((prev) => ({ ...prev, isFeatured: e.target.checked }))}
                      className="rounded accent-[#D4AF37]"
                    />
                    <span>Đặt làm bài viết nổi bật (Featured)</span>
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-gray-800 text-gray-300 text-xs font-bold hover:bg-gray-700"
                  >
                    Hủy bỏ
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#F59E0B] text-black font-extrabold text-xs transition-all flex items-center gap-2 shadow-lg shadow-[#D4AF37]/20 cursor-pointer disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>{saving ? "Đang xuất bản..." : "Xuất bản bài viết tức thì"}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
