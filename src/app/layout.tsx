import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#08090C",
};

export const metadata: Metadata = {
  title: "CR1000 — Đếm ngược Bàn thắng thứ 1000 & Bảo tàng số Cristiano Ronaldo",
  description:
    "Theo dõi thời gian thực hành trình đến 1.000 bàn thắng chính thức của Cristiano Ronaldo (CR7). Khám phá bảo tàng số: thống kê chi tiết, 66+ hattrick, poker, 5 bàn, các bàn thắng chung kết định đoạt danh hiệu, kỷ lục thế giới và kho lưu trữ toàn bộ sự nghiệp.",
  keywords: [
    "Cristiano Ronaldo",
    "CR7 1000 goals",
    "Đếm ngược 1000 bàn thắng Ronaldo",
    "CR7 stats",
    "Cristiano Ronaldo hattrick",
    "Bàn thắng chung kết Ronaldo",
    "CR7 records",
    "Al Nassr",
    "Real Madrid",
    "Manchester United",
    "Bồ Đào Nha",
  ],
  authors: [{ name: "CR1000 Museum" }],
  openGraph: {
    title: "CR1000 — Hành trình chạm đỉnh 1000 bàn thắng của Cristiano Ronaldo",
    description:
      "Bảo tàng số & Đồng hồ đếm ngược bàn thắng thứ 1.000 của huyền thoại vĩ đại nhất lịch sử bóng đá. Phân tích số liệu, kỷ lục thế giới và các khoảnh khắc bất tử.",
    url: "https://cr1000.vercel.app",
    siteName: "CR1000 Live Museum",
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CR1000 — Đếm ngược Bàn thắng thứ 1000 của CR7",
    description:
      "Thống kê chi tiết, 66+ hattrick, các bàn thắng chung kết và kho lưu trữ bàn thắng của Cristiano Ronaldo.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://cr1000.vercel.app/#cr7",
        name: "Cristiano Ronaldo",
        alternateName: ["CR7", "Cristiano Ronaldo dos Santos Aveiro", "El Bicho"],
        nationality: "Portugal",
        birthDate: "1985-02-05",
        jobTitle: "Professional Footballer",
        sameAs: [
          "https://en.wikipedia.org/wiki/Cristiano_Ronaldo",
          "https://www.transfermarkt.com/cristiano-ronaldo/profil/spieler/8198",
          "https://www.instagram.com/cristiano/",
          "https://www.cristianoronaldo.com/"
        ],
        award: [
          "5x Ballon d'Or",
          "5x UEFA Champions League",
          "UEFA European Championship 2016",
          "4x European Golden Shoe",
          "All-Time Top International Goalscorer"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://cr1000.vercel.app/#website",
        url: "https://cr1000.vercel.app",
        name: "CR1000 Countdown & Digital Museum",
        description: "Official interactive digital museum and real-time countdown to Cristiano Ronaldo's 1000th career goal.",
        inLanguage: "vi-VN"
      },
      {
        "@type": "FAQPage",
        "@id": "https://cr1000.vercel.app/#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "Cristiano Ronaldo hiện đã ghi bao nhiêu bàn thắng chính thức?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Tính đến hiện tại, Cristiano Ronaldo đã ghi 985 bàn thắng chính thức trong sự nghiệp cấp CLB và ĐTQG (theo thống kê chính thức của FIFA/IFFHS/RSSSF)."
            }
          },
          {
            "@type": "Question",
            name: "Cristiano Ronaldo còn cách cột mốc 1000 bàn thắng bao nhiêu bàn?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Cristiano Ronaldo hiện chỉ còn cách cột mốc lịch sử 1.000 bàn thắng đúng 15 bàn thắng nữa."
            }
          },
          {
            "@type": "Question",
            name: "Cristiano Ronaldo đã lập bao nhiêu hat-trick trong sự nghiệp?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Cristiano Ronaldo đã lập 66 cú hat-trick chính thức trong sự nghiệp, trong đó có 10 cú hat-trick cho ĐTQG Bồ Đào Nha và 56 cú hat-trick cấp CLB (bao gồm cả các trận ghi 4 bàn (poker) và 5 bàn)."
            }
          },
          {
            "@type": "Question",
            name: "Những bàn thắng đáng nhớ nhất của CR7 trong các trận chung kết là gì?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Các bàn thắng chung kết tiêu biểu gồm cú đánh đầu chung kết Champions League 2008 (MU vs Chelsea), cú đánh đầu phút 103 chung kết Cúp Nhà Vua 2011 (Real vs Barca), cú đúp chung kết Champions League 2017 (Real vs Juventus) và cú đúp chung kết Arab Club Champions Cup 2023 đưa Al Nassr vô địch."
            }
          }
        ]
      }
    ]
  };

  return (
    <html lang="vi" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#08090C] text-[#F8FAFC] min-h-screen selection:bg-[#D4AF37]/30 selection:text-[#FFF7D6]">
        {children}
      </body>
    </html>
  );
}
