import type { Metadata } from "next";
import TrophiesClient from "./TrophiesClient";

export const metadata: Metadata = {
  title: "Phòng Truyền Thống & Toàn Bộ 37 Danh Hiệu Của Cristiano Ronaldo — CR1000",
  description:
    "Bảo tàng số lưu trữ toàn bộ 37 danh hiệu tập thể và cá nhân của Cristiano Ronaldo: 5 Quả bóng Vàng, 5 Champions League, Euro 2016, 2 Nations League, 4 Chiếc giày Vàng châu Âu.",
  alternates: {
    canonical: "https://www.cr1000.live/trophies",
  },
  openGraph: {
    title: "Phòng Truyền Thống & Toàn Bộ 37 Danh Hiệu Của Cristiano Ronaldo — CR1000",
    description:
      "Khám phá trọn vẹn bộ sưu tập 37 danh hiệu đỉnh cao thế giới của Cristiano Ronaldo tại CR1000 Live Museum.",
    url: "https://www.cr1000.live/trophies",
    siteName: "CR1000 Live Museum",
    locale: "vi_VN",
    type: "article",
    images: [
      {
        url: "/images/cr7/og-share.jpg",
        width: 1200,
        height: 630,
        alt: "CR1000 — Phòng Truyền Thống & Toàn Bộ 37 Danh Hiệu Của Cristiano Ronaldo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Phòng Truyền Thống & Toàn Bộ 37 Danh Hiệu Của Cristiano Ronaldo — CR1000",
    description:
      "Khám phá trọn vẹn bộ sưu tập 37 danh hiệu đỉnh cao thế giới của Cristiano Ronaldo tại CR1000 Live Museum.",
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

export default function TrophiesPage() {
  return <TrophiesClient />;
}
