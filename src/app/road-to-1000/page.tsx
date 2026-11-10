import type { Metadata } from "next";
import RoadTo1000Client from "./RoadTo1000Client";

export const metadata: Metadata = {
  title: "Nhật Ký Đường Tới 1.000 Bàn Thắng — Cristiano Ronaldo (CR1000)",
  description:
    "Ký sự thể thao, phân tích số liệu độc quyền, mô hình xác suất và cập nhật từng bước chạy của Cristiano Ronaldo trong hành trình vươn tới cột mốc 1.000 bàn thắng lịch sử.",
  alternates: {
    canonical: "https://www.cr1000.live/road-to-1000",
  },
  openGraph: {
    title: "Nhật Ký Đường Tới 1.000 Bàn Thắng — Cristiano Ronaldo (CR1000)",
    description:
      "Ký sự thể thao, phân tích số liệu độc quyền và cập nhật từng bước chạy của CR7 trong hành trình vươn tới cột mốc 1.000 bàn thắng.",
    url: "https://www.cr1000.live/road-to-1000",
    siteName: "CR1000 Live Museum",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/images/cr7/og-share.jpg",
        width: 1200,
        height: 630,
        alt: "CR1000 — Nhật Ký Đường Tới 1.000 Bàn Thắng Cristiano Ronaldo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nhật Ký Đường Tới 1.000 Bàn Thắng — Cristiano Ronaldo (CR1000)",
    description:
      "Ký sự thể thao, phân tích số liệu độc quyền và cập nhật từng bước chạy của CR7 trong hành trình vươn tới cột mốc 1.000 bàn thắng.",
    images: ["/images/cr7/og-share.jpg"],
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

export default function Page() {
  return <RoadTo1000Client />;
}
