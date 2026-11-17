import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowLeft,
  Award,
  BookOpen,
  CheckCircle2,
  Database,
  FileCheck2,
  Globe,
  ShieldCheck,
  Target,
  Mail,
  FileText,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Về CR1000 & Phương Pháp Kiểm Chứng Dữ Liệu — Bảo Tàng Số Cristiano Ronaldo",
  description:
    "Tìm hiểu về dự án Bảo tàng số CR1000 (cr1000.live), quy chuẩn đối soát bàn thắng chính thức từ FIFA, IFFHS, RSSSF, Transfermarkt và tiêu chuẩn biên tập thể thao độc lập.",
  alternates: {
    canonical: "https://www.cr1000.live/about",
  },
  openGraph: {
    title: "Về CR1000 & Phương Pháp Kiểm Chứng Dữ Liệu — Bảo Tàng Số Cristiano Ronaldo",
    description:
      "Quy chuẩn kiểm chứng số liệu bàn thắng chính thức và tiêu chuẩn biên tập ký sự thể thao của CR1000.",
    url: "https://www.cr1000.live/about",
    siteName: "CR1000 Live Museum",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/images/cr7/og-share.jpg",
        width: 1200,
        height: 630,
        alt: "Về CR1000 — Bảo tàng số Cristiano Ronaldo",
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

export default function AboutPage() {
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
            name: "Giới Thiệu & Phương Pháp Luận",
            item: "https://www.cr1000.live/about",
          },
        ],
      },
      {
        "@type": "AboutPage",
        "@id": "https://www.cr1000.live/about#webpage",
        url: "https://www.cr1000.live/about",
        name: "Về Bảo tàng số CR1000 & Phương pháp kiểm chứng dữ liệu",
        description:
          "Tổng quan sứ mệnh, phương pháp kiểm chứng số liệu bàn thắng và tiêu chuẩn biên tập độc lập của cr1000.live.",
        inLanguage: "vi-VN",
        isPartOf: {
          "@id": "https://www.cr1000.live/#website",
        },
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

        {/* Hero Header */}
        <header className="border-b border-white/10 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121520] border border-[#D4AF37]/30 text-[#D4AF37] text-[11px] font-semibold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>Hồ Sơ Dự Án & Minh Bạch Biên Tập</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Về Bảo Tàng Số <span className="gold-gradient-text">CR1000</span> &amp; Phương Pháp Kiểm Chứng Dữ Liệu
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-400 leading-relaxed">
            Tìm hiểu sứ mệnh lưu trữ, quy chuẩn đối chiếu bàn thắng chính thức cấp cao nhất (Official Senior Goals) và nguyên tắc sản xuất nội dung báo chí dữ liệu của{" "}
            <strong className="text-white">cr1000.live</strong>.
          </p>
        </header>

        {/* Main Editorial Content */}
        <div className="space-y-8 text-sm sm:text-base text-gray-300 leading-relaxed font-light">
          {/* Section 1 */}
          <section className="bg-[#0F121A]/80 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <Target className="w-5 h-5 text-[#D4AF37] shrink-0" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                1. Sứ mệnh &amp; Tầm nhìn của Bảo tàng số CR1000
              </h2>
            </div>
            <p>
              <strong>CR1000 (cr1000.live)</strong> ra đời với mục tiêu trở thành ấn phẩm chuyên đề và bảo tàng dữ liệu tương tác độc lập bằng song ngữ (Tiếng Việt &amp; Tiếng Anh), ghi chép có hệ thống toàn bộ sự nghiệp thi đấu chuyên nghiệp kéo dài hơn hai thập kỷ của Cristiano Ronaldo dos Santos Aveiro — từ những bước chạy đầu tiên tại Sporting CP mùa giải 2002–2003, giai đoạn bùng nổ tại Manchester United, thời kỳ đỉnh cao kỷ lục ở Real Madrid, thử thách tại Juventus, chương lịch sử cùng ĐTQG Bồ Đào Nha cho tới hành trình nước rút trong màu áo Al Nassr hướng tới cột mốc chưa từng có tiền lệ: <strong>1.000 bàn thắng chính thức</strong>.
            </p>
            <p>
              Thay vì chỉ liệt kê những con số rời rạc hay tin tức ngắn hạn, chúng tôi xây dựng CR1000 theo cấu trúc kết hợp giữa <strong>kho lưu trữ thống kê đa chiều</strong> (phân tách theo giải đấu, bộ phận ghi bàn, phút thi đấu, hat-trick, sút phạt và danh hiệu) với chuyên mục <strong>Nhật Ký Đường Tới 1.000 Bàn</strong> — nơi mỗi cột mốc đều được giải phẫu bằng dữ liệu bàn thắng kỳ vọng (xG), bối cảnh chiến thuật, cơ sinh học thể thao và giá trị lịch sử.
            </p>
          </section>

          {/* Section 2 */}
          <section className="bg-[#0F121A]/80 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-[#D4AF37] shrink-0" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                2. Phương pháp Kiểm chứng &amp; Quy chuẩn Thống kê Bàn thắng
              </h2>
            </div>
            <p>
              Trong lịch sử bóng đá thế giới, tranh cãi về tổng số bàn thắng của các huyền thoại thường phát sinh từ sự khác biệt giữa <em>bàn thắng chính thức ở cấp độ chuyên nghiệp (Official Senior Career Goals)</em> và các trận giao hữu cấp CLB, trận đấu biểu diễn hoặc giải trẻ. Tại CR1000, Ban biên tập áp dụng nghiêm ngặt quy chuẩn phân loại của Liên đoàn Bóng đá Thế giới (<strong>FIFA</strong>), Liên đoàn Thống kê và Lịch sử Bóng đá Quốc tế (<strong>IFFHS</strong>) và Tổ chức Lưu trữ Số liệu Thể thao (<strong>RSSSF</strong>).
            </p>
            <div className="bg-[#08090C] border border-white/[0.08] rounded-xl p-5 space-y-3">
              <h3 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider">
                Tiêu chuẩn 4 bước xác thực mỗi bàn thắng:
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Điều kiện giải đấu (Official Competitions Only):</strong> Chỉ tính các bàn thắng được ghi trong khuôn khổ giải Vô địch Quốc gia hạng cao nhất (Primeira Liga, Premier League, La Liga, Serie A, Saudi Pro League), cúp Quốc gia, Siêu cúp, cúp Châu lục (UEFA Champions League, Europa League, AFC Champions League Elite, Arab Club Champions Cup) và các trận đấu hạng A của ĐTQG Bồ Đào Nha (World Cup, EURO, UEFA Nations League, Vòng loại &amp; Giao hữu quốc tế hạng A được FIFA công nhận).
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Loại trừ tuyệt đối trận giao hữu CLB &amp; giải trẻ:</strong> Các bàn thắng trong tour du đấu mùa hè, trận giao hữu trước mùa giải (pre-season friendlies), đội dự bị (B-team) hoặc cấp độ U15–U21 không được cộng vào bộ đếm chính thức 1.000 bàn thắng.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Đối chiếu chéo đa nguồn (Cross-Verification):</strong> Sau mỗi trận đấu của Al Nassr hoặc đội tuyển quốc gia, biên bản trận đấu (Match Report) được kiểm tra đồng thời trên hệ thống dữ liệu chính thức của ban tổ chức giải (SPL/AFC/UEFA), kết hợp đối chiếu với Opta, Sofascore và Transfermarkt nhằm loại trừ các tình huống bàn phản lưới nhà (own goal) hoặc điều chỉnh người ghi bàn sau trận.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Phân loại chi tiết thuộc tính bàn thắng:</strong> Mỗi bàn thắng được bóc tách theo chân thuận (chân phải), chân không thuận (chân trái), đánh đầu, sút phạt trực tiếp (bao gồm kỹ thuật knuckleball), phạt đền và bối cảnh phút ghi bàn để phục vụ trực quan hóa trên trang chủ và các chuyên mục con.
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="bg-[#0F121A]/80 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-[#D4AF37] shrink-0" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                3. Tiêu chuẩn Biên tập &amp; Chiều sâu Nội dung Chuyên môn
              </h2>
            </div>
            <p>
              Chuyên mục{" "}
              <Link href="/road-to-1000" className="text-[#D4AF37] hover:underline font-semibold">
                Nhật Ký Đường Tới 1.000 Bàn
              </Link>{" "}
              cùng các kho lưu trữ chuyên sâu như{" "}
              <Link href="/hat-tricks" className="text-[#D4AF37] hover:underline font-semibold">
                66+ Cú Hat-trick
              </Link>
              ,{" "}
              <Link href="/trophies" className="text-[#D4AF37] hover:underline font-semibold">
                Phòng Truyền Thống 37 Danh Hiệu
              </Link>{" "}
              và{" "}
              <Link href="/free-kicks" className="text-[#D4AF37] hover:underline font-semibold">
                Kho Lưu Trữ 64+ Bàn Sút Phạt
              </Link>{" "}
              được biên soạn theo chuẩn mực báo chí phân tích thể thao (Sports Data Journalism).
            </p>
            <p>
              Mỗi bài viết đều trải qua quy trình kiểm soát chủ đề để tránh trùng lặp nội dung, yêu cầu cấu trúc mạch lạc gồm bối cảnh trận đấu, chỉ số hiệu suất định lượng (xG, số phút/bàn, tần suất dứt điểm trong vòng cấm), đối sánh lịch sử với các chân sút vĩ đại khác (Pelé, Lionel Messi, Romário, Josef Bican, Gerd Müller) và phần hỏi đáp súc tích giúp độc giả dễ dàng tra cứu. Nếu phát hiện bất kỳ sai sót nào về ngày tháng, tỷ số hoặc số liệu, chúng tôi luôn cập nhật đính chính công khai ngay khi nhận được phản hồi.
            </p>
          </section>

          {/* Section 4 */}
          <section className="bg-[#0F121A]/80 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                4. Tính Độc Lập, Pháp Lý &amp; Cộng Đồng Độc Giả
              </h2>
            </div>
            <p>
              <strong>CR1000</strong> là dự án lưu trữ và báo chí thể thao độc lập, hoạt động phi cá cược và không trực thuộc hay đại diện thương mại cho cá nhân Cristiano Ronaldo, công ty đại diện Gestifute, CLB Al Nassr, Liên đoàn Bóng đá Bồ Đào Nha (FPF) hay bất kỳ giải đấu nào. Mọi thương hiệu, huy hiệu và tên giải đấu được nhắc tới đều thuộc quyền sở hữu của các chủ thể hợp pháp tương ứng và chỉ được trích dẫn phục vụ mục đích thông tin báo chí, nghiên cứu lịch sử bóng đá.
            </p>
            <p>
              Để duy trì máy chủ tốc độ cao, hạ tầng lưu trữ dữ liệu và chi phí biên tập hoàn toàn miễn phí cho người hâm mộ tại Việt Nam cũng như quốc tế, website sử dụng quảng cáo hiển thị (Google AdSense) và có thể bao gồm các liên kết tiếp thị liên kết (Affiliate) tới các sàn thương mại điện tử uy tín đối với một số kỷ vật sưu tầm. Việc gắn quảng cáo hay liên kết sản phẩm không bao giờ ảnh hưởng tới tính khách quan và độ chính xác của số liệu thống kê.
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#141824] hover:bg-[#1E2436] border border-white/10 text-xs font-bold text-white transition-all"
              >
                <Mail className="w-4 h-4 text-[#D4AF37]" />
                <span>Liên hệ Ban biên tập</span>
              </Link>
              <Link
                href="/terms"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#141824] hover:bg-[#1E2436] border border-white/10 text-xs font-bold text-white transition-all"
              >
                <FileCheck2 className="w-4 h-4 text-[#D4AF37]" />
                <span>Điều khoản sử dụng</span>
              </Link>
              <Link
                href="/privacy"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#141824] hover:bg-[#1E2436] border border-white/10 text-xs font-bold text-white transition-all"
              >
                <FileText className="w-4 h-4 text-[#D4AF37]" />
                <span>Chính sách bảo mật</span>
              </Link>
            </div>
          </section>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/road-to-1000"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-bold hover:brightness-110 transition-all text-sm shadow-lg shadow-[#D4AF37]/20 inline-flex items-center gap-2"
          >
            <Globe className="w-4 h-4" />
            <span>Đọc Nhật Ký Đường Tới 1.000 Bàn</span>
          </Link>
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-[#121520] hover:bg-[#1C2132] text-white font-semibold border border-white/10 transition-all text-sm"
          >
            Xem Đồng Hồ Đếm Ngược 1.000 Bàn
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
