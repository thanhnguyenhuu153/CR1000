import type { Metadata } from "next";
import HattricksClient from "./HattricksClient";

export const metadata: Metadata = {
  title: "66+ Cú Hat-trick & Poker Huyền Thoại Của Cristiano Ronaldo — CR1000",
  description:
    "Thống kê chi tiết toàn bộ 66+ cú hat-trick, 11 cú poker và 2 cú repoker trong sự nghiệp Cristiano Ronaldo tại Real Madrid, Man Utd, Juventus, Al Nassr và ĐTQG Bồ Đào Nha.",
  alternates: {
    canonical: "https://www.cr1000.live/hat-tricks",
  },
  openGraph: {
    title: "66+ Cú Hat-trick & Poker Huyền Thoại Của Cristiano Ronaldo — CR1000",
    description:
      "Toàn bộ 66+ cú hat-trick và poker đỉnh cao của Cristiano Ronaldo trong hành trình vươn tới 1.000 bàn thắng.",
    url: "https://www.cr1000.live/hat-tricks",
    siteName: "CR1000 Live Museum",
    locale: "vi_VN",
    type: "article",
    images: [
      {
        url: "/images/cr7/og-share.jpg",
        width: 1200,
        height: 630,
        alt: "CR1000 — 66+ Cú Hat-trick & Poker Huyền Thoại Của Cristiano Ronaldo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "66+ Cú Hat-trick & Poker Huyền Thoại Của Cristiano Ronaldo — CR1000",
    description:
      "Toàn bộ 66+ cú hat-trick và poker đỉnh cao của Cristiano Ronaldo trong hành trình vươn tới 1.000 bàn thắng.",
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

export default function HattricksPage() {
  return <HattricksClient />;
}
