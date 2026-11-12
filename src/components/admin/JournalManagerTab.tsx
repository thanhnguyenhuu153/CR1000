"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Upload,
  ImageIcon,
} from "lucide-react";
import { JournalArticle, cr7JournalArticles } from "@/data/cr7-journal";

export default function JournalManagerTab() {
  const [articles, setArticles] = useState<JournalArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [source, setSource] = useState<string>("loading");
  const [notification, setNotification] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // AI Generator state
  const [aiGenerating, setAiGenerating] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [customTopic, setCustomTopic] = useState("");

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<JournalArticle | null>(null);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Preset Iconic CR7 Images (curated high-res library)
  const imagePresets = [
    { label: "Bồ Đào Nha (Euro)", url: "/images/cr7/era-portugal.webp" },
    { label: "Cúp Nations League 2025", url: "/images/cr7/final-nations-league-2025.jpeg" },
    { label: "Hat-trick Solna 2013", url: "/images/cr7/iconic-sweden-playoff.jpeg" },
    { label: "Sút phạt TBN 2018", url: "/images/cr7/iconic-freekick-spain.webp" },
    { label: "Al Nassr", url: "/images/cr7/era-alnassr.jpg" },
    { label: "Real Madrid (La Decima)", url: "/images/cr7/era-realmadrid.webp" },
    { label: "Man Utd (2008)", url: "/images/cr7/era-manutd.webp" },
    { label: "Juventus", url: "/images/cr7/era-juventus.webp" },
    { label: "Xe đạp chổng ngược", url: "/images/cr7/iconic-bicycle-juve.jpg" },
    { label: "Calma Camp Nou", url: "/images/cr7/iconic-calma-camp-nou.webp" },
    { label: "Chân dung Hero CR7", url: "/images/cr7/hero-cr7.webp" },
  ];

  // Structured Section Editor State (preserves headings, quotes, tables, and in-article images)
  interface EditableSection {
    headingVi: string;
    headingEn: string;
    contentVi: string;
    contentEn: string;
    image: string;
    imageCaptionVi: string;
    imageCaptionEn: string;
    quoteVi?: { text: string; author: string };
    quoteEn?: { text: string; author: string };
    tableVi?: { headers: string[]; rows: string[][] };
    tableEn?: { headers: string[]; rows: string[][] };
  }

  const [editableSections, setEditableSections] = useState<EditableSection[]>([
    {
      headingVi: "Diễn biến sự kiện",
      headingEn: "Event Breakdown",
      contentVi: "",
      contentEn: "",
      image: "",
      imageCaptionVi: "",
      imageCaptionEn: "",
    },
  ]);
  const sectionFileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});
  const [uploadingSectionIdx, setUploadingSectionIdx] = useState<number | null>(null);

  const handleSectionImageUpload = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      notify("Vui lòng chọn file hình ảnh hợp lệ (jpg, png, webp)!", "error");
      return;
    }

    setUploadingSectionIdx(idx);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxWidth = 1200;
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.82);
          setEditableSections((prev) =>
            prev.map((sec, i) => (i === idx ? { ...sec, image: compressedDataUrl } : sec))
          );
          notify(`Đã tải ảnh vào mục #${idx + 1} thành công (${Math.round((compressedDataUrl.length * 3) / 4 / 1024)} KB)!`);
        }
        setUploadingSectionIdx(null);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      notify("Vui lòng chọn file hình ảnh hợp lệ (jpg, png, webp)!", "error");
      return;
    }

    setUploadingImage(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxWidth = 1200;
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.82);
          setFormData((prev) => ({ ...prev, coverImage: compressedDataUrl }));
          notify(`Đã nạp ảnh thành công (${Math.round((compressedDataUrl.length * 3) / 4 / 1024)} KB)!`);
        }
        setUploadingImage(false);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

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

  const handleOpenCreate = () => {
    setEditingArticle(null);
    setEditableSections([
      {
        headingVi: "Diễn biến sự kiện",
        headingEn: "Event Breakdown",
        contentVi: "",
        contentEn: "",
        image: "",
        imageCaptionVi: "",
        imageCaptionEn: "",
      },
    ]);
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
      coverImage: "/images/cr7/hero-cr7.webp",
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

    const secsVi = article.sectionsVi || [];
    const secsEn = article.sectionsEn || [];
    const maxLen = Math.max(secsVi.length, secsEn.length, 1);

    const mapped: EditableSection[] = [];
    for (let i = 0; i < maxLen; i++) {
      const sVi = secsVi[i];
      const sEn = secsEn[i];
      mapped.push({
        headingVi: sVi?.heading || "",
        headingEn: sEn?.heading || sVi?.heading || "",
        contentVi: (sVi?.content || []).join("\n\n"),
        contentEn: (sEn?.content || []).join("\n\n"),
        image: sVi?.image || sEn?.image || "",
        imageCaptionVi: sVi?.imageCaption || "",
        imageCaptionEn: sEn?.imageCaption || sVi?.imageCaption || "",
        quoteVi: sVi?.quote,
        quoteEn: sEn?.quote,
        tableVi: sVi?.table,
        tableEn: sEn?.table,
      });
    }

    setEditableSections(mapped);
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

  // Seed only missing default articles into Supabase without overwriting existing Supabase articles
  const handleSeedDefaults = async () => {
    const existingSlugs = new Set(articles.map((a) => a.slug));
    const missingArticles = cr7JournalArticles.filter((a) => !existingSlugs.has(a.slug));

    if (missingArticles.length === 0) {
      notify("Tất cả các bài viết gốc đều đã có trên Supabase (Không ghi đè lên các bài viết hiện tại của bạn)!");
      return;
    }

    if (!confirm(`Hệ thống sẽ bổ sung ${missingArticles.length} bài viết còn thiếu lên Supabase (Giữ nguyên 100% các bài viết hiện có). Tiếp tục?`)) {
      return;
    }

    setSaving(true);
    let successCount = 0;
    for (const art of missingArticles) {
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
    notify(`Đã bổ sung thành công ${successCount}/${missingArticles.length} bài viết lên Supabase!`);
    loadArticles();
  };

  // Trigger Autonomous AI Journalist
  const handleTriggerAi = async (topic?: string) => {
    setAiGenerating(true);
    notify("AI đang kết nối Google Search để quét tin tức mới nhất về CR7...", "success");

    try {
      const res = await fetch("/api/journal/auto-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic || undefined }),
      });
      const data = await res.json();

      if (data.success) {
        if (data.skipped) {
          notify(`Thông báo: ${data.message}`, "success");
        } else {
          notify("Thành công! AI đã tạo bài viết mới và xuất bản lên website.", "success");
          loadArticles();
          setShowAiModal(false);
          setCustomTopic("");
        }
      } else {
        notify(data.error || "Không thể tạo bài tự động", "error");
      }
    } catch (e: any) {
      notify(e.message, "error");
    } finally {
      setAiGenerating(false);
    }
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
      const builtSectionsVi = editableSections.map((sec) => {
        const viParagraphs = sec.contentVi
          .split("\n\n")
          .map((p) => p.trim())
          .filter(Boolean);
        return {
          ...(sec.headingVi ? { heading: sec.headingVi } : {}),
          content: viParagraphs.length ? viParagraphs : [sec.contentVi || ""],
          ...(sec.image ? { image: sec.image } : {}),
          ...(sec.imageCaptionVi ? { imageCaption: sec.imageCaptionVi } : {}),
          ...(sec.quoteVi ? { quote: sec.quoteVi } : {}),
          ...(sec.tableVi ? { table: sec.tableVi } : {}),
        };
      });

      const builtSectionsEn = editableSections.map((sec) => {
        const enParagraphs = (sec.contentEn || sec.contentVi)
          .split("\n\n")
          .map((p) => p.trim())
          .filter(Boolean);
        return {
          ...(sec.headingEn || sec.headingVi ? { heading: sec.headingEn || sec.headingVi } : {}),
          content: enParagraphs.length ? enParagraphs : [sec.contentEn || sec.contentVi || ""],
          ...(sec.image ? { image: sec.image } : {}),
          ...(sec.imageCaptionEn || sec.imageCaptionVi
            ? { imageCaption: sec.imageCaptionEn || sec.imageCaptionVi }
            : {}),
          ...(sec.quoteEn || sec.quoteVi ? { quote: sec.quoteEn || sec.quoteVi } : {}),
          ...(sec.tableEn || sec.tableVi ? { table: sec.tableEn || sec.tableVi } : {}),
        };
      });

      const payload = {
        ...formData,
        sectionsVi: builtSectionsVi,
        sectionsEn: builtSectionsEn,
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
            <span>Đồng bộ bài viết từ mã nguồn ({cr7JournalArticles.length} bài)</span>
          </button>

          <button
            type="button"
            disabled={aiGenerating}
            onClick={() => setShowAiModal(true)}
            className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-purple-950/80 to-indigo-950/80 hover:from-purple-900 hover:to-indigo-900 text-purple-200 border border-purple-500/50 text-xs font-bold transition-all flex items-center gap-1.5 shadow-lg shadow-purple-950/30 cursor-pointer disabled:opacity-50"
            title="Tự động quét tin và viết bài chuẩn SEO/AIO"
          >
            <Sparkles className={`w-3.5 h-3.5 text-purple-400 ${aiGenerating ? "animate-spin" : ""}`} />
            <span>{aiGenerating ? "AI đang quét & viết..." : "AI Tự Viết Bài"}</span>
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

                {/* Cover Image Upload & Selection */}
                <div className="space-y-2 sm:col-span-2 p-3.5 rounded-2xl bg-[#0F121D] border border-gray-800">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="text-xs font-bold text-gray-200 flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-[#D4AF37]" />
                      <span>Ảnh bìa bài viết (Cover Image)</span>
                    </label>

                    {/* Hidden file input for direct upload */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />

                    <button
                      type="button"
                      disabled={uploadingImage}
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#D4AF37] hover:bg-[#F59E0B] text-black font-extrabold text-xs transition-all shadow-md cursor-pointer disabled:opacity-50"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploadingImage ? "Đang xử lý ảnh..." : "Tải ảnh mới từ máy / điện thoại"}</span>
                    </button>
                  </div>

                  {/* Image Preview & URL Row */}
                  <div className="flex items-center gap-3 pt-1">
                    <div className="relative w-24 h-16 rounded-xl overflow-hidden border border-white/10 shrink-0 bg-black">
                      <Image
                        src={formData.coverImage || "/images/cr7/hero-cr7.jpg"}
                        alt="Cover Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <input
                        type="text"
                        value={formData.coverImage || ""}
                        onChange={(e) => setFormData((prev) => ({ ...prev, coverImage: e.target.value }))}
                        placeholder="/images/cr7/era-alnassr.jpg hoặc https://..."
                        className="w-full px-3 py-1.5 rounded-xl bg-[#141724] border border-gray-800 text-xs font-mono text-gray-300 focus:outline-none focus:border-[#D4AF37]"
                      />
                      <span className="text-[10px] text-gray-500 block">
                        Có thể tải ảnh lên từ thiết bị, chọn nhanh từ thư viện bên dưới hoặc dán link ảnh tùy ý:
                      </span>
                    </div>
                  </div>

                  {/* Preset Iconic Thumbnails */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-gray-800/60">
                    <span className="text-[10px] text-gray-400 font-bold uppercase mr-1">Gợi ý nhanh:</span>
                    {imagePresets.map((preset, pIdx) => (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, coverImage: preset.url }))}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
                          formData.coverImage === preset.url
                            ? "bg-[#D4AF37] text-black border-[#D4AF37] font-bold"
                            : "bg-[#141724] text-gray-300 border-gray-800 hover:text-white hover:bg-gray-800"
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* AIO Quick Takeaway Box */}
              <div className="space-y-3 p-4 rounded-2xl bg-[#141724] border border-[#D4AF37]/30">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#D4AF37]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Tóm tắt sự kiện (Event Summary) — Tối ưu cho AI Search & Người đọc</span>
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

              {/* Structured Sections & In-Article Images Editor */}
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-gray-800">
                  <div>
                    <label className="text-xs font-bold text-gray-200 uppercase tracking-wider flex items-center gap-2">
                      <span>Các phần nội dung & Hình ảnh bên trong bài viết ({editableSections.length} phần)</span>
                    </label>
                    <span className="text-[11px] text-gray-400 block mt-0.5">
                      Bạn có thể chỉnh sửa tiêu đề, nội dung từng phần và chèn/thay đổi hình ảnh minh họa ngay bên trong từng phần của bài viết.
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setEditableSections((prev) => [
                        ...prev,
                        {
                          headingVi: `Phần ${prev.length + 1}`,
                          headingEn: `Section ${prev.length + 1}`,
                          contentVi: "",
                          contentEn: "",
                          image: "",
                          imageCaptionVi: "",
                          imageCaptionEn: "",
                        },
                      ])
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#D4AF37]/15 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black border border-[#D4AF37]/40 text-xs font-bold transition-all cursor-pointer shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Thêm phần nội dung / hình ảnh mới</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {editableSections.map((sec, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-4 sm:p-5 rounded-2xl bg-[#101420] border border-gray-800/90 space-y-4 relative"
                    >
                      {/* Section Top Bar */}
                      <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-gray-800/70">
                        <span className="px-2.5 py-1 rounded-lg bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-extrabold">
                          Phần #{sIdx + 1} {sec.headingVi ? `— ${sec.headingVi}` : ""}
                        </span>

                        {editableSections.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              setEditableSections((prev) => prev.filter((_, i) => i !== sIdx))
                            }
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-950/50 hover:bg-red-600 text-red-400 hover:text-white text-[11px] font-bold transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Xóa phần này</span>
                          </button>
                        )}
                      </div>

                      {/* Section Headings (VI & EN) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-gray-300">
                            Tiêu đề phần #{sIdx + 1} (Tiếng Việt)
                          </label>
                          <input
                            type="text"
                            value={sec.headingVi}
                            onChange={(e) => {
                              const val = e.target.value;
                              setEditableSections((prev) =>
                                prev.map((item, i) => (i === sIdx ? { ...item, headingVi: val } : item))
                              );
                            }}
                            placeholder="VD: 1. Đêm mưa bướm và đỉnh cao Euro 2016..."
                            className="w-full px-3 py-2 rounded-xl bg-[#141724] border border-gray-800 text-xs font-bold text-white focus:outline-none focus:border-[#D4AF37]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-gray-300">
                            Tiêu đề phần #{sIdx + 1} (English Heading)
                          </label>
                          <input
                            type="text"
                            value={sec.headingEn}
                            onChange={(e) => {
                              const val = e.target.value;
                              setEditableSections((prev) =>
                                prev.map((item, i) => (i === sIdx ? { ...item, headingEn: val } : item))
                              );
                            }}
                            placeholder="e.g. 1. The Parisian Moths and Euro 2016 Glory..."
                            className="w-full px-3 py-2 rounded-xl bg-[#141724] border border-gray-800 text-xs font-bold text-white focus:outline-none focus:border-[#D4AF37]"
                          />
                        </div>
                      </div>

                      {/* Section Paragraphs (VI & EN) */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1.5">
                            <span>🇻🇳</span>
                            <span>Nội dung phần #{sIdx + 1} (Mỗi đoạn cách nhau 1 dòng trống)</span>
                          </span>
                          <textarea
                            rows={5}
                            value={sec.contentVi}
                            onChange={(e) => {
                              const val = e.target.value;
                              setEditableSections((prev) =>
                                prev.map((item, i) => (i === sIdx ? { ...item, contentVi: val } : item))
                              );
                            }}
                            placeholder="Nhập các đoạn văn tiếng Việt của phần này..."
                            className="w-full p-3 rounded-xl bg-[#141724] border border-gray-800 text-xs text-white focus:outline-none focus:border-[#D4AF37] leading-relaxed"
                          />
                        </div>

                        <div className="space-y-1">
                          <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1.5">
                            <span>🇺🇸</span>
                            <span>English Content (Section #{sIdx + 1})</span>
                          </span>
                          <textarea
                            rows={5}
                            value={sec.contentEn}
                            onChange={(e) => {
                              const val = e.target.value;
                              setEditableSections((prev) =>
                                prev.map((item, i) => (i === sIdx ? { ...item, contentEn: val } : item))
                              );
                            }}
                            placeholder="Enter English paragraphs for this section..."
                            className="w-full p-3 rounded-xl bg-[#141724] border border-gray-800 text-xs text-white focus:outline-none focus:border-[#D4AF37] leading-relaxed"
                          />
                        </div>
                      </div>

                      {/* IN-ARTICLE IMAGE FOR THIS SECTION */}
                      <div className="p-3.5 rounded-xl bg-[#0B0E17] border border-gray-800/90 space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <label className="text-xs font-bold text-[#D4AF37] flex items-center gap-1.5">
                            <ImageIcon className="w-3.5 h-3.5" />
                            <span>Hình ảnh minh họa bên trong Phần #{sIdx + 1} (Tùy chọn)</span>
                          </label>

                          <div className="flex items-center gap-2">
                            <input
                              type="file"
                              ref={(el) => {
                                sectionFileInputRefs.current[sIdx] = el;
                              }}
                              accept="image/*"
                              onChange={(e) => handleSectionImageUpload(sIdx, e)}
                              className="hidden"
                            />
                            <button
                              type="button"
                              disabled={uploadingSectionIdx === sIdx}
                              onClick={() => sectionFileInputRefs.current[sIdx]?.click()}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#D4AF37] hover:bg-[#F59E0B] text-black font-extrabold text-[11px] transition-all cursor-pointer disabled:opacity-50"
                            >
                              <Upload className="w-3 h-3" />
                              <span>
                                {uploadingSectionIdx === sIdx
                                  ? "Đang tải..."
                                  : "Tải ảnh từ máy vào phần này"}
                              </span>
                            </button>

                            {sec.image && (
                              <button
                                type="button"
                                onClick={() =>
                                  setEditableSections((prev) =>
                                    prev.map((item, i) =>
                                      i === sIdx
                                        ? { ...item, image: "", imageCaptionVi: "", imageCaptionEn: "" }
                                        : item
                                    )
                                  )
                                }
                                className="px-2.5 py-1 rounded-lg bg-red-950/60 hover:bg-red-600 text-red-300 hover:text-white text-[11px] font-bold transition-colors cursor-pointer"
                              >
                                Xóa ảnh
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                          {sec.image ? (
                            <div className="relative w-28 h-20 rounded-xl overflow-hidden border border-[#D4AF37]/40 shrink-0 bg-black">
                              <img
                                src={sec.image}
                                alt={`Section ${sIdx + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-28 h-20 rounded-xl border border-dashed border-gray-700 flex items-center justify-center text-[10px] text-gray-500 shrink-0 bg-[#111420]">
                              Chưa có ảnh
                            </div>
                          )}

                          <div className="flex-1 w-full space-y-2">
                            <input
                              type="text"
                              value={sec.image}
                              onChange={(e) => {
                                const val = e.target.value;
                                setEditableSections((prev) =>
                                  prev.map((item, i) => (i === sIdx ? { ...item, image: val } : item))
                                );
                              }}
                              placeholder="Dán link ảnh (/images/cr7/... hoặc https://...) hoặc bấm 'Tải ảnh từ máy' ở trên"
                              className="w-full px-3 py-1.5 rounded-lg bg-[#141724] border border-gray-800 text-xs font-mono text-gray-300 focus:outline-none focus:border-[#D4AF37]"
                            />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <input
                                type="text"
                                value={sec.imageCaptionVi}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setEditableSections((prev) =>
                                    prev.map((item, i) =>
                                      i === sIdx ? { ...item, imageCaptionVi: val } : item
                                    )
                                  );
                                }}
                                placeholder="Chú thích dưới ảnh (Tiếng Việt)..."
                                className="w-full px-3 py-1.5 rounded-lg bg-[#141724] border border-gray-800 text-[11px] text-gray-300 focus:outline-none focus:border-[#D4AF37]"
                              />
                              <input
                                type="text"
                                value={sec.imageCaptionEn}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setEditableSections((prev) =>
                                    prev.map((item, i) =>
                                      i === sIdx ? { ...item, imageCaptionEn: val } : item
                                    )
                                  );
                                }}
                                placeholder="Image Caption (English)..."
                                className="w-full px-3 py-1.5 rounded-lg bg-[#141724] border border-gray-800 text-[11px] text-gray-300 focus:outline-none focus:border-[#D4AF37]"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Quick Preset Picker for Section Image */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          <span className="text-[10px] text-gray-400 font-bold uppercase mr-1">
                            Chọn ảnh có sẵn:
                          </span>
                          {imagePresets.map((preset, pIdx) => (
                            <button
                              key={pIdx}
                              type="button"
                              onClick={() =>
                                setEditableSections((prev) =>
                                  prev.map((item, i) =>
                                    i === sIdx ? { ...item, image: preset.url } : item
                                  )
                                )
                              }
                              className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border transition-all cursor-pointer ${
                                sec.image === preset.url
                                  ? "bg-[#D4AF37] text-black border-[#D4AF37] font-bold"
                                  : "bg-[#141724] text-gray-400 border-gray-800 hover:text-white hover:bg-gray-800"
                              }`}
                            >
                              {preset.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
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

      {/* AI AUTO-WRITER MODAL */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-[#0E111B] border border-purple-500/40 rounded-3xl shadow-2xl p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">AI Ký Sự Thể Thao Tự Động</h3>
                  <p className="text-[11px] text-gray-400">Powered by Gemini & Google Search</p>
                </div>
              </div>
              <button
                onClick={() => setShowAiModal(false)}
                className="p-1.5 rounded-lg bg-gray-800 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-gray-300 leading-relaxed">
                Bạn có thể chọn để <strong>AI tự động quét tin 24h qua</strong> theo bộ lọc chất lượng, hoặc nhập một chủ đề cụ thể để AI viết ngay:
              </p>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400">
                  Chủ đề tùy chọn (Để trống nếu muốn AI tự động quét tin & chống lặp):
                </label>
                <input
                  type="text"
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  placeholder="Ví dụ: Phân tích cú hat-trick ngược dòng vs Atletico Madrid 2019..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#141824] border border-gray-800 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Quick Topic Suggestions */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">
                  Gợi ý chủ đề chuyên sâu (bấm để chọn nhanh):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Tiến hóa chiến thuật: Từ Winger MU sang Poacher vòng cấm",
                    "Ký sự kinh điển: Hat-trick lật ngược thế cờ vs Atletico 2019",
                    "Khoa học không chiến: Cú bật nhảy 2.56m và thời gian dừng trên không",
                    "Đối sánh lịch sử: Hiệu suất sau tuổi 30 so với Messi & Pele",
                    "Vật lý học Knuckleball: Quỹ đạo bóng đảo chiều ở 105 km/h",
                    "Xem trước trận Al Nassr vs Al-Qadsiah & săn bàn thắng thứ 986",
                  ].map((topic, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCustomTopic(topic)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] transition-colors border text-left ${
                        customTopic === topic
                          ? "bg-purple-600 text-white border-purple-400 font-bold"
                          : "bg-[#141824] text-gray-300 border-gray-800 hover:border-purple-500/50 hover:text-white"
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#090B12] border border-gray-800 text-[11px] text-gray-400 space-y-1">
                <span className="font-bold text-amber-400 block">✦ Bộ tiêu chuẩn chất lượng & Chống lặp tự động:</span>
                <span>• Tự động đối chiếu 10 bài gần nhất để không lặp góc nhìn • Song ngữ VI / EN song song • Khối AIO Snippet • FAQ Schema.org • Tự động gắn mốc đếm ngược 1000 bàn.</span>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowAiModal(false)}
                className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300 text-xs font-bold hover:bg-gray-700"
              >
                Hủy bỏ
              </button>

              <button
                type="button"
                disabled={aiGenerating}
                onClick={() => handleTriggerAi(customTopic)}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs transition-all flex items-center gap-2 shadow-lg shadow-purple-600/30 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{aiGenerating ? "Đang xử lý..." : customTopic ? "Viết theo chủ đề này" : "Tự động quét tin & Viết"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
