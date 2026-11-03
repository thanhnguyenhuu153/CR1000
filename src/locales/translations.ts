export type LocaleType = "vi" | "en";

export interface TranslationSchema {
  nav: {
    museumTag: string;
    countdown: string;
    journey: string;
    anatomy: string;
    hattricks: string;
    opponents: string;
    trophies: string;
    archive: string;
    shop: string;
    siuuu: string;
    switchLangTooltip: string;
  };
  hero: {
    kicker: string;
    headlinePart1: string;
    headlineGold: string;
    subheadline: string;
    totalGoalsLabel: string;
    remainingLabel: string;
    targetLabel: string;
    progressLabel: string;
    nextMatchKicker: string;
    vs: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
    fifaCertified: string;
    celebrateBtn: string;
  };
  bio: {
    chapterBadge: string;
    title: string;
    titleGold: string;
    subtitle: string;
    matches: string;
    goals: string;
    trophies: string;
    notableMilestones: string;
    quoteTitle: string;
    readMore: string;
  };
  anatomy: {
    chapterBadge: string;
    title: string;
    titleGold: string;
    subtitle: string;
    masterGoals: string;
    masterMatches: string;
    masterRate: string;
    masterRateUnit: string;
    masterAssists: string;
    tabTeam: string;
    tabBody: string;
    tabMethod: string;
    tabVenue: string;
    goalsCount: string;
    percentage: string;
    minutesSummary: string;
  };
  hattricks: {
    chapterBadge: string;
    title: string;
    titleGold: string;
    subtitle: string;
    filterAll: string;
    filter3: string;
    filter4: string;
    filter5: string;
    cardGoals: string;
    viewDetails: string;
  };
  opponents: {
    chapterBadge: string;
    title: string;
    titleGold: string;
    subtitle: string;
    rank: string;
    club: string;
    goalsScored: string;
    matchesPlayed: string;
    efficiency: string;
    hattricksCount: string;
  };
  trophies: {
    chapterBadge: string;
    title: string;
    titleGold: string;
    subtitle: string;
    tabAll: string;
    tabClub: string;
    tabInternational: string;
    tabIndividual: string;
    trophyCount: string;
    majorHonors: string;
  };
  seasons: {
    chapterBadge: string;
    title: string;
    titleGold: string;
    subtitle: string;
    selectedYearBadge: string;
    peakBadge: string;
    topScorerBadge: string;
    totalGoals: string;
    breakdown: string;
    matches: string;
    ratio: string;
    assists: string;
    historicalHighlight: string;
    instruction: string;
    footerPeak: string;
    footerTopScorer: string;
    footerSummary: string;
  };
  archive: {
    chapterBadge: string;
    title: string;
    titleGold: string;
    subtitle: string;
    tabFinals: string;
    tabMilestones: string;
    searchPlaceholder: string;
    minute: string;
  };
  shop: {
    chapterBadge: string;
    title: string;
    titleGold: string;
    subtitle: string;
    filterAll: string;
    filterJersey: string;
    filterBoots: string;
    filterLifestyle: string;
    filterMemorabilia: string;
    buyNow: string;
    affiliateNotice: string;
  };
  footer: {
    brandTag: string;
    brandDesc: string;
    shareBtn: string;
    shareSuccess: string;
    exploreTitle: string;
    faqTitle: string;
    faq1Q: string;
    faq1A: string;
    faq2Q: string;
    faq2A: string;
    faq3Q: string;
    faq3A: string;
    copyright: string;
    privacyLink: string;
    termsLink: string;
    backToTop: string;
  };
}

export const translations: Record<LocaleType, TranslationSchema> = {
  vi: {
    nav: {
      museumTag: "BẢO TÀNG",
      countdown: "Đếm ngược",
      journey: "Hành trình",
      anatomy: "Bóc tách chỉ số",
      hattricks: "Hattrick & Poker",
      opponents: "Con mồi ưa thích",
      trophies: "Phòng truyền thống",
      archive: "Chung kết & Mốc son",
      shop: "Kỷ vật Fan",
      siuuu: "SIUUU!",
      switchLangTooltip: "Chuyển sang English (US)",
    },
    hero: {
      kicker: "Hành trình bất tử • Khát vọng 1.000 bàn thắng chính thức",
      headlinePart1: "HÀNH TRÌNH CHẠM ĐỈNH",
      headlineGold: "1000 BÀN THẮNG",
      subheadline:
        "Chứng kiến từng bước chân của Cristiano Ronaldo – Cầu thủ ghi nhiều bàn thắng chính thức nhất lịch sử bóng đá trong hành trình chinh phục đỉnh cao chưa từng có.",
      totalGoalsLabel: "Bàn thắng chính thức",
      remainingLabel: "Còn cách cột mốc",
      targetLabel: "Mục tiêu tối thượng",
      progressLabel: "Tiến độ lịch sử",
      nextMatchKicker: "Trận đấu kế tiếp",
      vs: "đối đầu",
      days: "Ngày",
      hours: "Giờ",
      minutes: "Phút",
      seconds: "Giây",
      fifaCertified: "Kiểm định FIFA, UEFA, IFFHS & RSSSF",
      celebrateBtn: "Ăn mừng SIUUU!",
    },
    bio: {
      chapterBadge: "Chương 1 • Tiểu sử & Các kỷ nguyên",
      title: "Hành trình vĩ đại của",
      titleGold: "Huyền thoại bất tử",
      subtitle: "Từ cậu bé nghèo tại Funchal tới tượng đài thể thao vĩ đại nhất mọi thời đại.",
      matches: "Trận đấu",
      goals: "Bàn thắng",
      trophies: "Danh hiệu",
      notableMilestones: "Dấu ấn không thể quên",
      quoteTitle: "Triết lý sống & Ý chí",
      readMore: "Khám phá chi tiết",
    },
    anatomy: {
      chapterBadge: "Chương 2 • Bóc tách cỗ máy săn bàn",
      title: "Giải mã cỗ máy dứt điểm",
      titleGold: "Toàn Diện",
      subtitle: "Từ mọi góc độ cơ thể, mọi phương thức dứt điểm và trên mọi mặt sân bóng đá đỉnh cao.",
      masterGoals: "Tổng bàn thắng",
      masterMatches: "Số trận thi đấu",
      masterRate: "Hiệu suất nổ súng",
      masterRateUnit: "phút/bàn",
      masterAssists: "Tổng kiến tạo",
      tabTeam: "Theo Đội bóng",
      tabBody: "Bộ phận cơ thể",
      tabMethod: "Phương thức ghi bàn",
      tabVenue: "Địa điểm thi đấu",
      goalsCount: "bàn thắng",
      percentage: "tỷ lệ",
      minutesSummary: "Trung bình ~112 phút lại có 1 bàn thắng ra đời",
    },
    hattricks: {
      chapterBadge: "Chương 3 • 66 Cú Hattrick & Poker",
      title: "Bộ sưu tập bóng",
      titleGold: "Kỷ lục thế giới",
      subtitle: "Không một ai trong lịch sử bóng đá hiện đại sở hữu nhiều cú hat-trick chính thức hơn Cristiano Ronaldo.",
      filterAll: "Tất cả 66 Hattrick",
      filter3: "Hat-trick (3 bàn)",
      filter4: "Poker (4 bàn)",
      filter5: "Manita (5 bàn)",
      cardGoals: "Bàn thắng của CR7:",
      viewDetails: "Xem chi tiết →",
    },
    opponents: {
      chapterBadge: "Chương 4 • Top con mồi ưa thích",
      title: "Danh sách nạn nhân",
      titleGold: "Khét tiếng nhất",
      subtitle: "Các câu lạc bộ hàng đầu châu Âu từng nếm trải sức công phá hủy diệt của số 7 huyền thoại.",
      rank: "Hạng",
      club: "Câu lạc bộ / Đội tuyển",
      goalsScored: "Số bàn thắng",
      matchesPlayed: "Số trận",
      efficiency: "Hiệu suất",
      hattricksCount: "Hattrick",
    },
    trophies: {
      chapterBadge: "Chương 5 • Phòng truyền thống & Kỷ lục",
      title: "Kho tàng danh hiệu &",
      titleGold: "Kỷ lục Guinness",
      subtitle: "Bộ sưu tập đồ sộ gồm 36 danh hiệu tập thể và hàng chục giải thưởng cá nhân cao quý nhất hành tinh.",
      tabAll: "Toàn bộ danh hiệu",
      tabClub: "Danh hiệu CLB",
      tabInternational: "Danh hiệu ĐTQG",
      tabIndividual: "Giải thưởng Cá nhân",
      trophyCount: "Chiếc cúp",
      majorHonors: "Danh hiệu lớn",
    },
    seasons: {
      chapterBadge: "Chương 6 • Biểu đồ tiến hóa theo năm dương lịch",
      title: "Ma Trận Bàn Thắng &",
      titleGold: "Kỷ Lục Từng Năm",
      subtitle: "Thống kê hợp nhất toàn diện 25 năm thi đấu chuyên nghiệp (2002 – 2026) cấp Câu lạc bộ & Đội tuyển Quốc gia (FIFA, IFFHS & RSSSF Certified).",
      selectedYearBadge: "Năm dương lịch được chọn:",
      peakBadge: "Đỉnh cao lịch sử (All-Time Peak)",
      topScorerBadge: "Vua phá lưới thế giới 2023 (Tuổi 38)",
      totalGoals: "Tổng bàn thắng",
      breakdown: "Chi tiết bàn",
      matches: "Số trận",
      ratio: "Bàn / trận",
      assists: "Kiến tạo",
      historicalHighlight: "Dấu ấn lịch sử",
      instruction: "Bấm vào từng cột năm (2002 – 2026) để xem chi tiết thông số",
      footerPeak: "Đỉnh cao lịch sử (Năm 2013): 69 bàn thắng sau 59 trận (59 bàn Real Madrid + 10 bàn BĐN).",
      footerTopScorer: "Vua phá lưới thế giới 2023: 54 bàn sau 59 trận được ghi ở tuổi 38.",
      footerSummary: "Tổng hợp nhất 25 năm: 985 bàn thắng (839 CLB + 146 ĐTQG) qua 1.341 trận đấu chính thức.",
    },
    archive: {
      chapterBadge: "Chương 7 • Chung kết & Các cột mốc 1000",
      title: "Những Bàn Thắng Định Đoạt",
      titleGold: "Lịch Sử",
      subtitle: "Kho lưu trữ những khoảnh khắc vàng ở các trận chung kết đỉnh cao và hành trình vượt qua từng cột mốc thế kỷ.",
      tabFinals: "Bàn thắng Chung kết",
      tabMilestones: "Các cột mốc 100 bàn",
      searchPlaceholder: "Tìm kiếm trận đấu, đối thủ, giải đấu...",
      minute: "Phút",
    },
    shop: {
      chapterBadge: "Chương 8 • Bảo tàng Kỷ vật & Cửa hàng Fan",
      title: "Sưu tầm kỷ vật &",
      titleGold: "Di sản CR7",
      subtitle: "Sở hữu những món kỷ vật thi đấu chính hãng, áo đấu các đêm chung kết lịch sử và giày bóng đá phong cách Ronaldo.",
      filterAll: "Tất cả sản phẩm",
      filterJersey: "Áo đấu thi đấu",
      filterBoots: "Giày thi đấu",
      filterLifestyle: "Thời trang CR7",
      filterMemorabilia: "Kỷ vật lưu niệm",
      buyNow: "Mua chính hãng",
      affiliateNotice: "* Liên kết mua hàng trực tiếp từ các sàn thương mại chính hãng được ủy quyền.",
    },
    footer: {
      brandTag: "BẢO TÀNG SỐ",
      brandDesc:
        "Bảo tàng số và hệ thống theo dõi trực tiếp hành trình hướng tới cột mốc 1.000 bàn thắng chính thức chưa từng có của Cristiano Ronaldo. Tôn vinh kỷ luật, ý chí và những khoảnh khắc bất tử.",
      shareBtn: "Chia sẻ trang web",
      shareSuccess: "Đã sao chép liên kết website CR1000 vào bộ nhớ tạm!",
      exploreTitle: "Khám phá các chương",
      faqTitle: "Câu hỏi thường gặp (FAQ)",
      faq1Q: "Cristiano Ronaldo hiện ghi bao nhiêu bàn?",
      faq1A: "Đã ghi 985 bàn thắng chính thức cấp CLB và ĐTQG (theo dữ liệu FIFA/IFFHS/RSSSF).",
      faq2Q: "CR7 còn cách cột mốc 1.000 bàn bao nhiêu bàn nữa?",
      faq2A: "Chỉ còn cách đúng 15 bàn thắng nữa để chạm cột mốc lịch sử 1.000 bàn.",
      faq3Q: "Nguồn dữ liệu có uy tín không?",
      faq3A: "Dữ liệu được đối soát trực tiếp từ FIFA, UEFA, IFFHS, Transfermarkt và Sofascore.",
      copyright: "CR1000 Digital Museum. Dự án phi lợi nhuận vinh danh sự nghiệp của Cristiano Ronaldo dos Santos Aveiro.",
      privacyLink: "Chính sách bảo mật & Pháp lý",
      termsLink: "Điều khoản & Miễn trừ",
      backToTop: "Về đầu trang",
    },
  },
  en: {
    nav: {
      museumTag: "MUSEUM",
      countdown: "Countdown",
      journey: "Career Eras",
      anatomy: "Scoring Anatomy",
      hattricks: "66 Hattricks",
      opponents: "Favorite Opponents",
      trophies: "Trophy Room",
      archive: "Finals & Milestones",
      shop: "Fan Vault",
      siuuu: "SIUUU!",
      switchLangTooltip: "Switch to Tiếng Việt (VI)",
    },
    hero: {
      kicker: "The Immortal Pursuit • The Road to 1,000 Official Career Goals",
      headlinePart1: "THE ROAD TO",
      headlineGold: "1,000 GOALS",
      subheadline:
        "Witness every step of Cristiano Ronaldo — The greatest official goalscorer in football history on his quest for an unprecedented 1,000th career goal.",
      totalGoalsLabel: "Official Goals",
      remainingLabel: "Goals Remaining",
      targetLabel: "Ultimate Target",
      progressLabel: "Historic Progress",
      nextMatchKicker: "Next Fixture",
      vs: "vs",
      days: "Days",
      hours: "Hours",
      minutes: "Mins",
      seconds: "Secs",
      fifaCertified: "FIFA, UEFA, IFFHS & RSSSF Certified",
      celebrateBtn: "Celebrate SIUUU!",
    },
    bio: {
      chapterBadge: "Chapter 1 • Biography & Career Eras",
      title: "The Legendary Odyssey of",
      titleGold: "An Immortal Icon",
      subtitle: "From an impoverished boy in Funchal to the greatest athlete of modern times.",
      matches: "Matches",
      goals: "Goals",
      trophies: "Trophies",
      notableMilestones: "Unforgettable Milestones",
      quoteTitle: "Philosophy & Mentality",
      readMore: "Explore Era Details",
    },
    anatomy: {
      chapterBadge: "Chapter 2 • The Scoring Anatomy",
      title: "Deconstructing The",
      titleGold: "Ultimate Scoring Machine",
      subtitle: "Analyzed across every anatomical angle, scoring technique, and stadium atmosphere.",
      masterGoals: "Total Career Goals",
      masterMatches: "Official Appearances",
      masterRate: "Scoring Frequency",
      masterRateUnit: "mins/goal",
      masterAssists: "Total Assists",
      tabTeam: "By Club & Country",
      tabBody: "Body Part",
      tabMethod: "Scoring Method",
      tabVenue: "Venue Distribution",
      goalsCount: "goals",
      percentage: "share",
      minutesSummary: "A goal is created every ~112 minutes on average",
    },
    hattricks: {
      chapterBadge: "Chapter 3 • 66 Hat-tricks & Pokers",
      title: "The Match Ball Collection of",
      titleGold: "World Records",
      subtitle: "No player in the history of modern football has recorded more official hat-tricks than Cristiano Ronaldo.",
      filterAll: "All 66 Hat-tricks",
      filter3: "Hat-trick (3 Goals)",
      filter4: "Poker (4 Goals)",
      filter5: "Manita (5 Goals)",
      cardGoals: "CR7 Goals:",
      viewDetails: "View Details →",
    },
    opponents: {
      chapterBadge: "Chapter 4 • Favorite Opponents",
      title: "The Hunted List of",
      titleGold: "Europe's Giants",
      subtitle: "The most legendary football clubs that suffered the wrath of number 7's relentless finishing.",
      rank: "Rank",
      club: "Club / Opponent",
      goalsScored: "Goals",
      matchesPlayed: "Matches",
      efficiency: "Ratio",
      hattricksCount: "Hattricks",
    },
    trophies: {
      chapterBadge: "Chapter 5 • Trophy Room & World Records",
      title: "The Pantheon of Silverware &",
      titleGold: "Guinness Records",
      subtitle: "A monumental collection of 36 team trophies and dozens of the most prestigious individual honors on earth.",
      tabAll: "All Silverware",
      tabClub: "Club Honors",
      tabInternational: "International Honors",
      tabIndividual: "Individual Awards",
      trophyCount: "Trophies",
      majorHonors: "Major Honors",
    },
    seasons: {
      chapterBadge: "Chapter 6 • Calendar-Year Evolution Matrix",
      title: "Annual Scoring Matrix &",
      titleGold: "Year-By-Year Records",
      subtitle: "Comprehensive 25-year career ledger (2002–2026) across Club and International football (FIFA, IFFHS & RSSSF Certified).",
      selectedYearBadge: "Selected Calendar Year:",
      peakBadge: "All-Time Career Peak",
      topScorerBadge: "World Top Scorer 2023 (Age 38)",
      totalGoals: "Total Goals",
      breakdown: "Club / Country Split",
      matches: "Matches",
      ratio: "Goals / Match",
      assists: "Assists",
      historicalHighlight: "Historic Milestone",
      instruction: "Click on any year bar (2002–2026) to inspect detailed breakdown",
      footerPeak: "All-Time Peak (2013): 69 goals in 59 matches (59 Real Madrid + 10 Portugal).",
      footerTopScorer: "World Top Scorer 2023: 54 goals in 59 matches scored at age 38.",
      footerSummary: "25-Year Grand Total: 985 goals (839 Club + 146 Country) across 1,341 official matches.",
    },
    archive: {
      chapterBadge: "Chapter 7 • Finals & The 1000 Goals Archive",
      title: "Decisive Goals That Shaped",
      titleGold: "Football History",
      subtitle: "An interactive archive of clutch championship finals and century milestones toward 1,000 goals.",
      tabFinals: "Cup Final Goals",
      tabMilestones: "Century Milestones",
      searchPlaceholder: "Search by match, opponent, competition...",
      minute: "Min",
    },
    shop: {
      chapterBadge: "Chapter 8 • Fan Vault & Memorabilia Store",
      title: "Official Collectibles &",
      titleGold: "CR7 Heritage",
      subtitle: "Own authentic match memorabilia, retro final jerseys, and signature Cristiano Ronaldo football boots.",
      filterAll: "All Products",
      filterJersey: "Match Jerseys",
      filterBoots: "Boots",
      filterLifestyle: "CR7 Lifestyle",
      filterMemorabilia: "Memorabilia",
      buyNow: "Shop Official",
      affiliateNotice: "* Official links to authorized brand stores and certified retailers.",
    },
    footer: {
      brandTag: "DIGITAL MUSEUM",
      brandDesc:
        "The official interactive digital museum and real-time countdown to Cristiano Ronaldo's unprecedented 1,000th career goal. Honoring discipline, relentless will, and immortal moments.",
      shareBtn: "Share Website",
      shareSuccess: "CR1000 website link copied to clipboard!",
      exploreTitle: "Museum Chapters",
      faqTitle: "Frequently Asked Questions (FAQ)",
      faq1Q: "How many official goals has Cristiano Ronaldo scored?",
      faq1A: "Cristiano Ronaldo has scored 985 official goals for club and country (certified by FIFA/IFFHS/RSSSF).",
      faq2Q: "How many goals does CR7 need to reach 1,000?",
      faq2A: "Ronaldo needs exactly 15 more official goals to reach the historic 1,000-goal summit.",
      faq3Q: "How verified is this data?",
      faq3A: "Data is cross-verified in real time with FIFA, UEFA, IFFHS, Sofascore, and Transfermarkt.",
      copyright: "CR1000 Digital Museum. A non-profit tribute celebrating the historic career of Cristiano Ronaldo dos Santos Aveiro.",
      privacyLink: "Privacy Policy & Legal",
      termsLink: "Terms & Disclaimer",
      backToTop: "Back to Top",
    },
  },
};
