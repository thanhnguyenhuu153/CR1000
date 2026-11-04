export interface ShopItem {
  id: string;
  name: string;
  category: "jersey" | "boots" | "lifestyle" | "memorabilia";
  priceText: string;
  originalPriceText?: string;
  badge?: string;
  description: string;
  image: string;
  affiliateUrl: string;
  platform: "Shopee" | "Lazada" | "Nike" | "Unisport" | "Amazon";
  rating: number;
  reviewsCount: number;
}

export const cr7ShopItemsVi: ShopItem[] = [
  {
    id: "jersey-mu-2008-retro",
    name: "Áo đấu Manchester United Retro 2008 Final Moscow #7 Ronaldo (Tay dài)",
    category: "jersey",
    priceText: "450.000₫ – 890.000₫",
    originalPriceText: "1.200.000₫",
    badge: "Bán chạy nhất",
    description: "Phiên bản áo đỏ tay dài kinh điển đêm mưa Moscow đoạt cúp C1 2008. Chất liệu dệt kim cao cấp, in font chuẩn Premier League & UCL.",
    image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=600&auto=format&fit=crop",
    affiliateUrl: "https://shopee.vn/search?keyword=ao+manchester+united+2008+ronaldo+7",
    platform: "Shopee",
    rating: 4.9,
    reviewsCount: 1420,
  },
  {
    id: "jersey-real-madrid-cardiff-2017",
    name: "Áo đấu Real Madrid Final Cardiff 2017 #7 Ronaldo (Phiên bản Tím)",
    category: "jersey",
    priceText: "490.000₫ – 950.000₫",
    originalPriceText: "1.300.000₫",
    badge: "Kỷ vật Duodécima",
    description: "Chiếc áo màu tím lịch sử trong đêm Ronaldo ghi cú đúp hạ Juventus 4-1, phá vỡ lời nguyền bảo vệ chức vô địch Champions League.",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=600&auto=format&fit=crop",
    affiliateUrl: "https://shopee.vn/search?keyword=ao+real+madrid+2017+cardiff+ronaldo",
    platform: "Shopee",
    rating: 4.9,
    reviewsCount: 980,
  },
  {
    id: "jersey-al-nassr-home",
    name: "Áo đấu Al Nassr Chính Hãng Home Vàng #7 Ronaldo 2024/2025",
    category: "jersey",
    priceText: "390.000₫ – 750.000₫",
    badge: "Xu hướng",
    description: "Áo đấu hiện tại của CR7 trên hành trình săn bàn thứ 1000. Form chuẩn thể thao thoáng khí, logo in nổi 3D sắc nét.",
    image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=600&auto=format&fit=crop",
    affiliateUrl: "https://shopee.vn/search?keyword=ao+al+nassr+ronaldo+7+chinh+hang",
    platform: "Shopee",
    rating: 4.8,
    reviewsCount: 2150,
  },
  {
    id: "boots-nike-mercurial-superfly",
    name: "Giày bóng đá Nike Mercurial Superfly 9 / 10 Elite CR7 FG/TF",
    category: "boots",
    priceText: "850.000₫ – 5.490.000₫",
    originalPriceText: "6.200.000₫",
    badge: "Vũ khí săn bàn",
    description: "Dòng giày huyền thoại gắn liền với sự nghiệp của Ronaldo. Đệm khí Air Zoom bứt tốc độ cao và thân giày dệt ôm sát bàn chân.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
    affiliateUrl: "https://shopee.vn/search?keyword=giay+nike+mercurial+superfly+cr7",
    platform: "Shopee",
    rating: 4.9,
    reviewsCount: 840,
  },
  {
    id: "perfume-cr7-fearless",
    name: "Nước hoa nam cao cấp CR7 Cristiano Ronaldo Eau de Toilette (100ml)",
    category: "lifestyle",
    priceText: "850.000₫ – 1.450.000₫",
    badge: "Phong cách Quý ông",
    description: "Mùi hương nam tính, mạnh mẽ kết hợp giữa hương gỗ tuyết tùng, hổ phách và bạch đậu khấu do chính Ronaldo tham gia sáng tạo.",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop",
    affiliateUrl: "https://shopee.vn/search?keyword=nuoc+hoa+cr7+cristiano+ronaldo+chinh+hang",
    platform: "Shopee",
    rating: 4.9,
    reviewsCount: 630,
  },
  {
    id: "poster-cr1000-metal",
    name: "Tranh kim loại tráng gương & LED / Canvas Kỷ niệm Hành trình 1000 bàn CR7",
    category: "memorabilia",
    priceText: "280.000₫ – 650.000₫",
    badge: "Sưu tầm giới hạn",
    description: "Tranh treo tường trang trí phòng cao cấp với hình ảnh khoảnh khắc ngả bàn đèn, ăn mừng Siuuu và đầy đủ thông số 1000 bàn thắng mạ vàng.",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600&auto=format&fit=crop",
    affiliateUrl: "https://shopee.vn/search?keyword=tranh+canvas+cristiano+ronaldo+cr7",
    platform: "Shopee",
    rating: 5.0,
    reviewsCount: 420,
  },
];

export const cr7ShopItemsEn: ShopItem[] = [
  {
    id: "jersey-mu-2008-retro",
    name: "Manchester United Retro 2008 Moscow Final #7 Ronaldo Long Sleeve Kit",
    category: "jersey",
    priceText: "$35 – $65",
    originalPriceText: "$89",
    badge: "Best Seller",
    description: "Classic long-sleeve red kit from the rain in Moscow winning the 2008 Champions League. Premium breathable knit with authentic Premier League & UCL font.",
    image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=600&auto=format&fit=crop",
    affiliateUrl: "https://shopee.vn/search?keyword=ao+manchester+united+2008+ronaldo+7",
    platform: "Shopee",
    rating: 4.9,
    reviewsCount: 1420,
  },
  {
    id: "jersey-real-madrid-cardiff-2017",
    name: "Real Madrid Final Cardiff 2017 #7 Ronaldo Purple Away Kit",
    category: "jersey",
    priceText: "$39 – $75",
    originalPriceText: "$95",
    badge: "Duodécima Relic",
    description: "Historic purple jersey worn as Ronaldo struck a final brace to crush Juventus 4-1 and shatter the Champions League retention curse.",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=600&auto=format&fit=crop",
    affiliateUrl: "https://shopee.vn/search?keyword=ao+real+madrid+2017+cardiff+ronaldo",
    platform: "Shopee",
    rating: 4.9,
    reviewsCount: 980,
  },
  {
    id: "jersey-al-nassr-home",
    name: "Al Nassr Official Home Gold #7 Ronaldo Match Jersey 2024/2025",
    category: "jersey",
    priceText: "$45 – $85",
    badge: "Trending",
    description: "Official current home kit of CR7 on the road to his 1,000th goal. Athletic fit, breathable mesh, with precision 3D embossed crest.",
    image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=600&auto=format&fit=crop",
    affiliateUrl: "https://shopee.vn/search?keyword=ao+al+nassr+ronaldo+7+chinh+hang",
    platform: "Shopee",
    rating: 4.8,
    reviewsCount: 2150,
  },
  {
    id: "boots-nike-mercurial-superfly",
    name: "Nike Mercurial Superfly 9 / 10 Elite CR7 FG/TF Football Boots",
    category: "boots",
    priceText: "$95 – $285",
    originalPriceText: "$310",
    badge: "Lethal Weapon",
    description: "The signature speed silo synonymous with Cristiano Ronaldo's career. Zoom Air unit for explosive acceleration with a snug Flyknit collar.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
    affiliateUrl: "https://shopee.vn/search?keyword=giay+nike+mercurial+superfly+cr7",
    platform: "Shopee",
    rating: 4.9,
    reviewsCount: 840,
  },
  {
    id: "perfume-cr7-fearless",
    name: "CR7 Cristiano Ronaldo Fearless Eau de Toilette (100ml)",
    category: "lifestyle",
    priceText: "$45 – $65",
    badge: "Gentleman Style",
    description: "Masculine, empowering fragrance blending woody cedar, warm amber, and spicy cardamom, co-created by Cristiano Ronaldo.",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop",
    affiliateUrl: "https://shopee.vn/search?keyword=nuoc+hoa+cr7+cristiano+ronaldo+chinh+hang",
    platform: "Shopee",
    rating: 4.9,
    reviewsCount: 630,
  },
  {
    id: "poster-cr1000-metal",
    name: "CR1000 Road to 1,000 Goals Commemorative LED / Metal Art Canvas",
    category: "memorabilia",
    priceText: "$25 – $55",
    badge: "Limited Edition",
    description: "Luxury wall art featuring the iconic Turin bicycle kick, the Siuuu celebration, and complete gold-embossed career stats.",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600&auto=format&fit=crop",
    affiliateUrl: "https://shopee.vn/search?keyword=tranh+canvas+cristiano+ronaldo+cr7",
    platform: "Shopee",
    rating: 5.0,
    reviewsCount: 420,
  },
];

export const getCr7ShopItems = (lang: "vi" | "en"): ShopItem[] => {
  return lang === "en" ? cr7ShopItemsEn : cr7ShopItemsVi;
};

// Default export for backwards compatibility
export const cr7ShopItems = cr7ShopItemsVi;
