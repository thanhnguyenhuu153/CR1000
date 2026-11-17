import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import {
  ArrowLeft,
  Clock,
  FileWarning,
  Globe,
  Mail,
  MessageSquare,
  ShieldCheck,
  Database,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Liên Hệ Ban Biên Tập & Góp Ý Số Liệu — CR1000",
  description:
    "Kênh liên hệ chính thức của Bảo tàng số CR1000 (cr1000.live): tiếp nhận hiệu đính số liệu bàn thắng, góp ý nội dung thể thao, bản quyền DMCA và hợp tác.",
  alternates: {
    canonical: "https://www.cr1000.live/contact",
  },
  openGraph: {
    title: "Liên Hệ Ban Biên Tập & Góp Ý Số Liệu — CR1000",
    description:
      "Gửi phản hồi, yêu cầu hiệu đính thống kê bàn thắng hoặc liên hệ bản quyền với đội ngũ CR1000.",
    url: "https://www.cr1000.live/contact",
    siteName: "CR1000 Live Museum",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/images/cr7/og-share.jpg",
        width: 1200,
        height: 630,
        alt: "Liên hệ CR1000",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Trang Chủ",
            item: "https://www.cr1000.live",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Liên Hệ",
            item: "https://www.cr1000.live/contact",
          },
        ],
      },
      {
        "@type": "ContactPage",
        "@id": "https://www.cr1000.live/contact#webpage",
        url: "https://www.cr1000.live/contact",
        name: "Liên hệ Ban biên tập CR1000",
        description: "Trang tiếp nhận phản hồi, hiệu đính số liệu và liên hệ chính thức của cr1000.live.",
        inLanguage: "vi-VN",
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#08090C] text-[#F8FAFC] selection:bg-[#D4AF37]/30 selection:text-[#FFF7D6]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        {/* Back link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#121520] hover:bg-[#1C2132] text-gray-300 hover:text-white border border-white/10 transition-all text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
            <span>Quay lại Trang chủ CR1000</span>
          </Link>
        </div>

        {/* Header */}
        <header className="border-b border-white/10 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121520] border border-[#D4AF37]/30 text-[#D4AF37] text-[11px] font-semibold uppercase tracking-wider mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Hỗ Trợ Độc Giả &amp; Hiệu Đính Dữ Liệu</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Liên Hệ <span className="gold-gradient-text">Ban Biên Tập CR1000</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-400 leading-relaxed">
            Chúng tôi luôn hoan nghênh mọi ý kiến đóng góp từ cộng đồng người hâm mộ, các nhà nghiên cứu thống kê bóng đá và đối tác truyền thông để giữ cho kho lưu trữ{" "}
            <strong className="text-white">cr1000.live</strong> đạt độ chính xác cao nhất.
          </p>
        </header>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-[#0F121A]/80 border border-white/10 rounded-2xl p-5 space-y-2">
            <Mail className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-sm font-bold text-white">Hộp thư chính thức</h2>
            <p className="text-xs font-mono text-[#D4AF37]">contact@cr1000.live</p>
            <p className="text-xs text-gray-400">Hỗ trợ cả Tiếng Việt &amp; Tiếng Anh.</p>
          </div>

          <div className="bg-[#0F121A]/80 border border-white/10 rounded-2xl p-5 space-y-2">
            <Clock className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-sm font-bold text-white">Thời gian phản hồi</h2>
            <p className="text-xs font-bold text-emerald-400">24 – 48 giờ làm việc</p>
            <p className="text-xs text-gray-400">Ưu tiên xử lý nhanh các thông báo lỗi dữ liệu trận đấu.</p>
          </div>

          <div className="bg-[#0F121A]/80 border border-white/10 rounded-2xl p-5 space-y-2">
            <Globe className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-sm font-bold text-white">Phạm vi tiếp nhận</h2>
            <p className="text-xs text-gray-300">Số liệu, Bản quyền DMCA &amp; Hợp tác</p>
            <p className="text-xs text-gray-400">Hoạt động độc lập trực tuyến trên tên miền cr1000.live.</p>
          </div>
        </div>

        {/* Contact Form Section */}
        <section className="bg-[#0F121A]/80 border border-white/10 rounded-2xl p-6 sm:p-8 mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
            1. Gửi phản hồi hoặc yêu cầu hiệu đính
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mb-6">
            Điền thông tin bên dưới để soạn nhanh thư gửi tới Ban biên tập, hoặc sao chép địa chỉ email chính thức để gửi trực tiếp từ hộp thư của bạn.
          </p>
          <ContactForm />
        </section>

        {/* Guidelines for Corrections & DMCA */}
        <div className="space-y-6 text-sm text-gray-300 leading-relaxed font-light">
          <section className="bg-[#0F121A]/80 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-3">
            <div className="flex items-center gap-2.5">
              <Database className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="text-lg sm:text-xl font-bold text-white">
                2. Quy trình hiệu đính số liệu trận đấu &amp; kỷ lục
              </h2>
            </div>
            <p>
              Khi gửi báo cáo về một cột mốc bàn thắng, cú hat-trick hoặc danh hiệu chưa khớp, vui lòng đính kèm <strong>ngày diễn ra trận đấu, tên giải đấu, cặp đấu và nguồn biên bản chính thức</strong> (FIFA, UEFA, AFC hoặc báo cáo trọng tài). Đội ngũ kiểm chứng sẽ đối chiếu lại dữ liệu trong vòng 24 giờ và cập nhật đính chính nếu hợp lệ.
            </p>
            <p className="text-xs text-gray-400">
              Tham khảo thêm:{" "}
              <Link href="/about" className="text-[#D4AF37] hover:underline font-medium">
                Phương pháp kiểm chứng số liệu của CR1000
              </Link>
              .
            </p>
          </section>

          <section className="bg-[#0F121A]/80 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-3">
            <div className="flex items-center gap-2.5">
              <FileWarning className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="text-lg sm:text-xl font-bold text-white">
                3. Tiếp nhận khiếu nại Bản quyền (DMCA / Fair Use)
              </h2>
            </div>
            <p>
              CR1000 tôn trọng quyền sở hữu trí tuệ của mọi cá nhân, nhiếp ảnh gia và đơn vị giữ bản quyền hình ảnh thể thao. Nếu bạn là chủ sở hữu hợp pháp của bất kỳ tư liệu nào xuất hiện trên website và muốn yêu cầu ghi nguồn bổ sung hoặc gỡ bỏ, vui lòng gửi thông báo qua email{" "}
              <strong className="text-white font-mono">contact@cr1000.live</strong> kèm đường dẫn URL cụ thể và thông tin xác minh quyền sở hữu. Chúng tôi cam kết xử lý và phản hồi trong thời gian sớm nhất.
            </p>
          </section>

          <section className="bg-[#0F121A]/80 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-3">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="text-lg sm:text-xl font-bold text-white">
                4. Các văn bản pháp lý liên quan
              </h2>
            </div>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                href="/about"
                className="px-4 py-2 rounded-xl bg-[#08090C] border border-white/10 hover:border-[#D4AF37]/50 text-xs font-semibold text-gray-200 transition-colors"
              >
                Giới thiệu &amp; Phương pháp luận
              </Link>
              <Link
                href="/terms"
                className="px-4 py-2 rounded-xl bg-[#08090C] border border-white/10 hover:border-[#D4AF37]/50 text-xs font-semibold text-gray-200 transition-colors"
              >
                Điều khoản sử dụng &amp; Miễn trừ
              </Link>
              <Link
                href="/privacy"
                className="px-4 py-2 rounded-xl bg-[#08090C] border border-white/10 hover:border-[#D4AF37]/50 text-xs font-semibold text-gray-200 transition-colors"
              >
                Chính sách bảo mật &amp; Cookie
              </Link>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
