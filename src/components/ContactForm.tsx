"use client";

import React, { useState } from "react";
import { Mail, Copy, Check, Send, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("data-correction");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [submittedNotice, setSubmittedNotice] = useState(false);

  const contactEmail = "thanhnguyenhuu153@live.com";

  const topicLabels: Record<string, string> = {
    "data-correction": "Hiệu đính số liệu bàn thắng / Trận đấu",
    "editorial": "Đóng góp nội dung & Phân tích chiến thuật",
    "dmca": "Vấn đề Bản quyền (DMCA / Fair Use)",
    "partnership": "Hợp tác truyền thông & Quảng cáo",
    "other": "Câu hỏi khác về CR1000",
  };

  const handleCopyEmail = () => {
    try {
      navigator.clipboard.writeText(contactEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {}
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `[CR1000] ${topicLabels[topic] || "Liên hệ"} - ${name || "Độc giả"}`;
    const body = `Họ tên / Độc giả: ${name}\nEmail phản hồi: ${email}\nChủ đề: ${topicLabels[topic] || topic}\n\nNội dung chi tiết:\n${message}`;
    const mailtoUrl = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
    setSubmittedNotice(true);
  };

  return (
    <div className="space-y-6">
      {/* Quick Copy Email Box */}
      <div className="p-4 rounded-xl bg-[#08090C] border border-[#D4AF37]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37]">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-gray-400 block">Email Ban biên tập chính thức:</span>
            <a
              href={`mailto:${contactEmail}`}
              className="text-base font-mono font-bold text-[#D4AF37] hover:underline"
            >
              {contactEmail}
            </a>
          </div>
        </div>
        <button
          type="button"
          onClick={handleCopyEmail}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#141824] hover:bg-[#1E2436] border border-white/10 text-xs font-bold text-white transition-all cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />}
          <span>{copied ? "Đã sao chép email" : "Sao chép địa chỉ"}</span>
        </button>
      </div>

      {/* Contact Composer Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="contact-name" className="text-xs font-bold text-gray-300 block">
              Tên của bạn <span className="text-red-400">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="VD: Nguyễn Văn A"
              className="w-full px-4 py-2.5 rounded-xl bg-[#08090C] border border-gray-800 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="contact-email" className="text-xs font-bold text-gray-300 block">
              Email nhận phản hồi <span className="text-red-400">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@domain.com"
              className="w-full px-4 py-2.5 rounded-xl bg-[#08090C] border border-gray-800 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="contact-topic" className="text-xs font-bold text-gray-300 block">
            Chủ đề liên hệ
          </label>
          <select
            id="contact-topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-[#08090C] border border-gray-800 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
          >
            {Object.entries(topicLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="contact-message" className="text-xs font-bold text-gray-300 block">
            Nội dung chi tiết <span className="text-red-400">*</span>
          </label>
          <textarea
            id="contact-message"
            rows={4}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Mô tả chi tiết thông tin trận đấu cần hiệu đính (ngày, đối thủ, giải đấu) hoặc câu hỏi của bạn..."
            className="w-full px-4 py-3 rounded-xl bg-[#08090C] border border-gray-800 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        {submittedNotice && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              Trình gửi email mặc định trên thiết bị của bạn đã được mở với nội dung soạn sẵn. Nếu chưa mở được, vui lòng gửi trực tiếp tới{" "}
              <strong className="font-mono text-white">{contactEmail}</strong>.
            </span>
          </div>
        )}

        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-extrabold text-sm hover:brightness-110 transition-all shadow-lg shadow-[#D4AF37]/20 inline-flex items-center gap-2 cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span>Gửi Thư tới Ban Biên Tập</span>
        </button>
      </form>
    </div>
  );
}
