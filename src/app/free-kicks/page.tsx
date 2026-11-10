import type { Metadata } from "next";
import FreeKicksClient from "./FreeKicksClient";

export const metadata: Metadata = {
  title: "Tuyệt Kỹ Sút Phạt & 64+ Siêu Phẩm Knuckleball Của CR7 — CR1000",
  description:
    "Khám phá toàn bộ 64+ bàn thắng từ chấm đá phạt trực tiếp của Cristiano Ronaldo: khoa học khí động học Knuckleball, vận tốc 105+ km/h, danh sách các cú sút phạt lịch sử.",
  alternates: {
    canonical: "https://www.cr1000.live/free-kicks",
  },
  openGraph: {
    title: "Tuyệt Kỹ Sút Phạt & 64+ Siêu Phẩm Knuckleball Của CR7 — CR1000",
    description:
      "Khám phá toàn bộ 64+ bàn thắng sút phạt trực tiếp của Cristiano Ronaldo và khoa học quỹ đạo Knuckleball bất tử.",
    url: "https://www.cr1000.live/free-kicks",
    siteName: "CR1000 Live Museum",
    locale: "vi_VN",
    type: "article",
    images: [
      {
        url: "/images/cr7/og-share.jpg",
        width: 1200,
        height: 630,
        alt: "CR1000 — Tuyệt Kỹ Sút Phạt & 64+ Siêu Phẩm Knuckleball Của CR7",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tuyệt Kỹ Sút Phạt & 64+ Siêu Phẩm Knuckleball Của CR7 — CR1000",
    description:
      "Khám phá toàn bộ 64+ bàn thắng sút phạt trực tiếp của Cristiano Ronaldo và khoa học quỹ đạo Knuckleball bất tử.",
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

export default function FreeKicksPage() {
  return <FreeKicksClient />;
}
