import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowLeft,
  Scale,
  FileCheck2,
  ShieldAlert,
  Handshake,
  BookOpen,
  RefreshCw,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Điều Khoản Sử Dụng, Miễn Trừ Trách Nhiệm & Minh Bạch Quảng Cáo — CR1000",
  description:
    "Điều khoản sử dụng website cr1000.live, tuyên bố miễn trừ trách nhiệm dữ liệu thể thao, nguyên tắc Fair Use và minh bạch quảng cáo Google AdSense & Affiliate.",
  alternates: {
    canonical: "https://www.cr1000.live/terms",
  },
  openGraph: {
    title: "Điều Khoản Sử Dụng & Miễn Trừ Trách Nhiệm — CR1000",
    description:
      "Quy định sử dụng, bản quyền và minh bạch tiếp thị liên kết của Bảo tàng số CR1000.",
    url: "https://www.cr1000.live/terms",
    siteName: "CR1000 Live Museum",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/images/cr7/og-share.jpg",
        width: 1200,
        height: 630,
        alt: "Điều khoản sử dụng CR1000",
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

export default function TermsPage() {
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
            name: "Điều Khoản Sử Dụng",
            item: "https://www.cr1000.live/terms",
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": "https://www.cr1000.live/terms#webpage",
        url: "https://www.cr1000.live/terms",
        name: "Điều Khoản Sử Dụng & Miễn Trừ Trách Nhiệm — CR1000",
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
            <Scale className="w-3.5 h-3.5" />
            <span>Quy Định Pháp Lý &amp; Minh Bạch</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Điều Khoản Sử Dụng &amp; <span className="gold-gradient-text">Miễn Trừ Trách Nhiệm</span>
          </h1>
          <p className="mt-4 text-sm text-gray-400">
            Cập nhật lần cuối: Tháng 11 năm 2026 • Áp dụng cho toàn bộ người truy cập{" "}
            <strong className="text-[#D4AF37]">cr1000.live</strong>
          </p>
        </header>

        {/* Sections */}
        <div className="space-y-8 text-sm sm:text-base text-gray-300 leading-relaxed font-light">
          {/* 1 */}
          <section className="bg-[#0F121A]/80 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-3">
            <div className="flex items-center gap-3">
              <FileCheck2 className="w-5 h-5 text-[#D4AF37] shrink-0" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                1. Chấp thuận Điều khoản sử dụng
              </h2>
            </div>
            <p>
              Khi truy cập, đọc nội dung hoặc sử dụng bất kỳ tính năng thống kê, tra cứu nào tại{" "}
              <strong>cr1000.live</strong>, bạn xác nhận đã đọc, hiểu và đồng ý tuân thủ các điều khoản được quy định trên trang này cùng với{" "}
              <Link href="/privacy" className="text-[#D4AF37] hover:underline font-medium">
                Chính sách Bảo mật &amp; Cookie
              </Link>{" "}
              của chúng tôi. Nếu không đồng ý với bất kỳ nội dung nào dưới đây, vui lòng ngừng truy cập website.
            </p>
          </section>

          {/* 2 */}
          <section className="bg-[#0F121A]/80 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-3">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-[#D4AF37] shrink-0" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                2. Quyền Sở hữu Trí tuệ &amp; Nguyên tắc Sử dụng Hợp lý (Fair Use)
              </h2>
            </div>
            <p>
              Các bài viết phân tích, cấu trúc trực quan hóa dữ liệu, mã nguồn giao diện và phần tổng hợp thống kê song ngữ tại CR1000 được bảo hộ theo quyền tác giả của dự án CR1000. Bạn có thể chia sẻ liên kết hoặc trích dẫn số liệu với điều kiện ghi rõ nguồn{" "}
              <strong className="text-white">cr1000.live</strong>; không được sao chép hàng loạt, thu thập tự động (scraping) nhằm mục đích thương mại hóa trái phép.
            </p>
            <p>
              CR1000 hoạt động theo tinh thần tôn vinh lịch sử thể thao và nguyên tắc trích dẫn hợp lý (<em>Fair Use</em>). Mọi tên cầu thủ, tên câu lạc bộ (Sporting CP, Manchester United, Real Madrid, Juventus, Al Nassr), tên liên đoàn (FPF, FIFA, UEFA, AFC) và thương hiệu sản phẩm thuộc quyền sở hữu của các chủ thể hợp pháp tương ứng. Website không phải là trang thông tin chính thức của Cristiano Ronaldo hay bất kỳ tổ chức bóng đá nào.
            </p>
          </section>

          {/* 3 */}
          <section className="bg-[#0F121A]/80 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-3">
            <div className="flex items-center gap-3">
              <ShieldAlert className="w-5 h-5 text-[#D4AF37] shrink-0" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                3. Tuyên bố Miễn trừ Trách nhiệm Dữ liệu Thể thao (Phi Cá Cược)
              </h2>
            </div>
            <p>
              Toàn bộ số liệu thống kê (tổng số bàn thắng chính thức, số phút ghi bàn, hiệu suất xG, hat-trick, sút phạt, lịch thi đấu dự kiến) và các bài viết phân tích trên cr1000.live chỉ phục vụ mục đích{" "}
              <strong>thông tin báo chí, nghiên cứu lịch sử bóng đá và giáo dục thể thao</strong>.
            </p>
            <div className="bg-[#08090C] border border-white/[0.08] rounded-xl p-4 text-xs sm:text-sm text-gray-300 space-y-2">
              <p>
                • <strong>Không liên quan tới cá cược:</strong> CR1000 tuyệt đối không cung cấp, khuyến khích hoặc môi giới bất kỳ dịch vụ cá độ, dự đoán tỷ số ăn tiền hay giao dịch tài chính nào.
              </p>
              <p>
                • <strong>Độ trễ &amp; Điều chỉnh số liệu:</strong> Lịch thi đấu và thống kê trận đấu có thể thay đổi từ ban tổ chức giải (SPL, AFC, UEFA, FIFA) hoặc khi trọng tài/liên đoàn điều chỉnh báo cáo bàn thắng sau trận. Chúng tôi không chịu trách nhiệm đối với các thiệt hại gián tiếp phát sinh từ việc người dùng tự ý sử dụng số liệu vào mục đích ngoài phạm vi tham khảo thông tin.
              </p>
            </div>
          </section>

          {/* 4 */}
          <section className="bg-[#0F121A]/80 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-3">
            <div className="flex items-center gap-3">
              <Handshake className="w-5 h-5 text-[#D4AF37] shrink-0" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                4. Minh bạch Quảng cáo &amp; Tiếp thị Liên kết (AdSense &amp; Affiliate Disclosure)
              </h2>
            </div>
            <p>
              Để duy trì hạ tầng máy chủ và cung cấp kho dữ liệu hoàn toàn miễn phí cho người đọc, website tuân thủ đầy đủ các nguyên tắc công khai tài chính quốc tế:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-gray-300">
              <li>
                <strong>Quảng cáo Google AdSense:</strong> Website tích hợp mạng quảng cáo Google AdSense. Quảng cáo được đánh dấu rõ ràng và tuân thủ Chính sách Chương trình AdSense cũng như quy định Cookie trình bày tại{" "}
                <Link href="/privacy#adsense" className="text-[#D4AF37] hover:underline">
                  Chính sách Bảo mật
                </Link>
                .
              </li>
              <li>
                <strong>Liên kết Tiếp thị Liên kết (Affiliate Links):</strong> Một số bài viết hoặc chuyên mục giới thiệu kỷ vật (áo đấu, giày thi đấu, sách ảnh, vật phẩm lưu niệm) có thể gắn liên kết dẫn tới các sàn thương mại điện tử uy tín như Shopee hoặc Amazon. Nếu bạn quyết định nhấp vào liên kết và mua hàng, website có thể nhận một khoản hoa hồng nhỏ từ sàn mà{" "}
                <strong>không làm tăng giá bán</strong> đối với người mua. Mọi đánh giá và nội dung biên tập hoàn toàn độc lập, không bị chi phối bởi nhà bán hàng.
              </li>
            </ul>
          </section>

          {/* 5 */}
          <section className="bg-[#0F121A]/80 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-3">
            <div className="flex items-center gap-3">
              <RefreshCw className="w-5 h-5 text-[#D4AF37] shrink-0" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                5. Quy tắc Cộng đồng &amp; Cập nhật Điều khoản
              </h2>
            </div>
            <p>
              Người dùng cam kết không sử dụng website vào các hành vi phát tán mã độc, tấn công từ chối dịch vụ (DDoS) hoặc bình luận/liên hệ mang tính chất xúc phạm, spam. Ban quản trị có quyền cập nhật, sửa đổi Điều khoản Sử dụng bất cứ lúc nào nhằm phù hợp với quy định pháp luật và tiêu chuẩn vận hành mới. Ngày cập nhật luôn được ghi rõ ở đầu trang.
            </p>
            <p className="text-xs sm:text-sm text-gray-400">
              Mọi thắc mắc về Điều khoản sử dụng, vui lòng liên hệ qua trang{" "}
              <Link href="/contact" className="text-[#D4AF37] hover:underline font-medium">
                Liên hệ chính thức
              </Link>{" "}
              hoặc email <span className="font-mono text-white">thanhnguyenhuu153@live.com</span>.
            </p>
          </section>
        </div>

        {/* Navigation Links */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-4">
          <Link
            href="/about"
            className="px-5 py-2.5 rounded-xl bg-[#121520] hover:bg-[#1C2132] text-gray-200 font-semibold border border-white/10 transition-all text-xs"
          >
            Về CR1000 &amp; Phương pháp luận
          </Link>
          <Link
            href="/privacy"
            className="px-5 py-2.5 rounded-xl bg-[#121520] hover:bg-[#1C2132] text-gray-200 font-semibold border border-white/10 transition-all text-xs"
          >
            Chính sách Bảo mật &amp; Cookie
          </Link>
          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-xl bg-[#121520] hover:bg-[#1C2132] text-gray-200 font-semibold border border-white/10 transition-all text-xs"
          >
            Liên hệ Ban biên tập
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
