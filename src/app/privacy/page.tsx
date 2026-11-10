import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield, Lock, FileText, ExternalLink, HelpCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chính Sách Bảo Mật & Điều Khoản Sử Dụng — CR1000",
  description:
    "Chính sách bảo mật, thông báo cookie quảng cáo Google AdSense, điều khoản sử dụng và tuyên bố miễn trừ trách nhiệm của Bảo tàng số CR1000.",
  alternates: {
    canonical: "https://www.cr1000.live/privacy",
  },
  openGraph: {
    title: "Chính Sách Bảo Mật & Điều Khoản Sử Dụng — CR1000",
    description:
      "Chính sách bảo mật, cookie và điều khoản sử dụng của Bảo tàng số CR1000.",
    url: "https://www.cr1000.live/privacy",
    siteName: "CR1000 Live Museum",
    locale: "vi_VN",
    type: "website",
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

export default function PrivacyPolicyPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
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
        name: "Chính Sách Bảo Mật",
        item: "https://www.cr1000.live/privacy",
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#08090C] text-[#F8FAFC] py-20 px-4 sm:px-6 lg:px-8 relative selection:bg-[#D4AF37]/30 selection:text-[#FFF7D6]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#121520] hover:bg-[#1C2132] text-gray-300 hover:text-white border border-white/10 transition-all text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
            <span>Quay lại Trang chủ CR1000</span>
          </Link>
        </div>

        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121520] border border-[#D4AF37]/30 text-[#D4AF37] text-[11px] font-semibold uppercase tracking-wider mb-4">
            <Shield className="w-3.5 h-3.5" />
            Pháp Lý & Minh Bạch Thông Tin
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Chính Sách Bảo Mật & <span className="gold-gradient-text">Điều Khoản</span>
          </h1>
          <p className="mt-4 text-sm text-gray-400">
            Cập nhật lần cuối: Tháng 11 năm 2026 • Áp dụng cho toàn bộ người dùng truy cập tên miền{" "}
            <span className="text-[#D4AF37] font-medium">cr1000.live</span>
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-12 text-sm sm:text-base text-gray-300 leading-relaxed font-light">
          {/* Section 1 */}
          <section className="bg-[#0F121A]/80 border border-white/10 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                1. Giới thiệu dự án CR1000
              </h2>
            </div>
            <p>
              <strong>CR1000 (cr1000.live)</strong> là một bảo tàng kỹ thuật số tương tác độc lập, được xây dựng nhằm tôn vinh sự nghiệp vĩ đại, tinh thần kỷ luật và hành trình hướng tới cột mốc 1.000 bàn thắng chính thức của danh thủ <strong>Cristiano Ronaldo dos Santos Aveiro</strong>.
            </p>
            <p className="mt-3">
              Chúng tôi cam kết tôn trọng tuyệt đối quyền riêng tư của mọi người dùng và minh bạch tối đa trong việc thu thập, xử lý dữ liệu theo các chuẩn mực pháp lý quốc tế.
            </p>
          </section>

          {/* Section 2 - Google AdSense & Cookies (Bắt buộc cho AdSense Approval) */}
          <section className="bg-[#0F121A]/80 border border-white/10 rounded-2xl p-6 sm:p-8" id="adsense">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                2. Quảng cáo Google AdSense & Cookie của bên thứ ba
              </h2>
            </div>
            <p>
              Trang web của chúng tôi hợp tác cùng <strong>Google AdSense</strong> (dịch vụ quảng cáo trực tuyến được cung cấp bởi Google LLC) để duy trì chi phí máy chủ và vận hành hệ thống.
            </p>
            <div className="mt-4 space-y-3 bg-[#08090C] p-5 rounded-xl border border-white/[0.06]">
              <p className="font-semibold text-white">Theo quy định bắt buộc của Google AdSense:</p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-gray-300">
                <li>
                  Các nhà cung cấp bên thứ ba, bao gồm cả Google, sử dụng <strong>Cookie</strong> để phân phát quảng cáo dựa trên các lượt truy cập trước đó của người dùng vào trang web này hoặc các trang web khác trên Internet.
                </li>
                <li>
                  Việc Google sử dụng Cookie quảng cáo (như <em>DoubleClick cookie</em>) cho phép Google và các đối tác của họ phân phát các quảng cáo phù hợp nhất với sở thích của người dùng dựa trên lịch sử duyệt web.
                </li>
                <li>
                  Người dùng có thể chọn không tham gia quảng cáo được cá nhân hóa bằng cách truy cập trang cài đặt quảng cáo của Google:{" "}
                  <a
                    href="https://adssettings.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D4AF37] hover:underline inline-flex items-center gap-1 font-medium"
                  >
                    Google Ads Settings <ExternalLink className="w-3 h-3" />
                  </a>.
                </li>
                <li>
                  Bạn cũng có thể từ chối việc sử dụng cookie của bên thứ ba để quảng cáo theo sở thích thông qua tổ chức{" "}
                  <a
                    href="https://www.aboutads.info/choices/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D4AF37] hover:underline inline-flex items-center gap-1 font-medium"
                  >
                    www.aboutads.info <ExternalLink className="w-3 h-3" />
                  </a>.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3 - Analytics */}
          <section className="bg-[#0F121A]/80 border border-white/10 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                3. Dữ liệu phân tích truy cập (Analytics & Speed Insights)
              </h2>
            </div>
            <p>
              Để cải thiện tốc độ tải trang và trải nghiệm người dùng, chúng tôi sử dụng công cụ phân tích không định danh (như Vercel Analytics và Speed Insights). Các dữ liệu này hoàn toàn ẩn danh, bao gồm thời gian phản hồi trang, kích thước màn hình thiết bị và loại trình duyệt, không chứa bất kỳ thông tin nhận dạng cá nhân (PII) nào.
            </p>
          </section>

          {/* Section 4 - Terms of Service & Disclaimer */}
          <section className="bg-[#0F121A]/80 border border-white/10 rounded-2xl p-6 sm:p-8" id="terms">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                4. Tuyên bố miễn trừ trách nhiệm (Disclaimer) & Bản quyền
              </h2>
            </div>
            <p>
              <strong>Bản quyền & Tôn vinh:</strong> CR1000 không trực thuộc hoặc đại diện chính thức cho Cristiano Ronaldo, Gestifute, Al Nassr FC hay bất kỳ tổ chức bóng đá nào. Tất cả hình ảnh và tư liệu lịch sử được sử dụng với mục đích thông tin, giáo dục thể thao và tôn vinh theo nguyên tắc sử dụng hợp lý (Fair Use).
            </p>
            <p className="mt-3">
              <strong>Tính chính xác của số liệu:</strong> Dữ liệu thống kê về số bàn thắng, trận đấu, kiến tạo và danh hiệu được tổng hợp, đối soát độc lập từ các cơ quan lưu trữ thể thao uy tín nhất hành tinh: <strong>FIFA, UEFA, IFFHS, RSSSF, Sofascore và Transfermarkt</strong>. Mặc dù chúng tôi nỗ lực tối đa để đảm bảo dữ liệu cập nhật theo thời gian thực, trang web không chịu trách nhiệm pháp lý đối với bất kỳ sai lệch nào phát sinh ngoài ý muốn.
            </p>
          </section>

          {/* Section 5 - Contact */}
          <section className="bg-[#0F121A]/80 border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-4">
              5. Liên hệ & Phản hồi
            </h2>
            <p>
              Nếu quý vị có bất kỳ câu hỏi nào liên quan đến Chính sách bảo mật hoặc muốn đóng góp dữ liệu cho bảo tàng số, xin vui lòng gửi thư về:
            </p>
            <div className="mt-3 p-4 rounded-xl bg-[#08090C] border border-white/10 inline-block font-mono text-sm text-[#D4AF37]">
              contact@cr1000.live
            </div>
          </section>
        </div>

        {/* Footer Back */}
        <div className="mt-14 pt-8 border-t border-white/10 flex justify-center">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-bold hover:brightness-110 transition-all text-sm shadow-lg shadow-[#D4AF37]/20"
          >
            Quay lại Trang chủ Bảo tàng CR1000
          </Link>
        </div>
      </div>
    </main>
  );
}
