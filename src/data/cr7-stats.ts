// Tổng quan chỉ số sự nghiệp Cristiano Ronaldo
export interface CR7CareerSummary {
  totalGoals: number;
  countdownTarget: number;
  goalsNeeded: number;
  totalMatches: number;
  totalAssists: number;
  minutesPlayed: number;
  minutesPerGoal: number;
  minutesPerContribution: number;
  nextMatch: {
    competition: string;
    homeTeam: string;
    awayTeam: string;
    homeLogo?: string;
    awayLogo?: string;
    stadium: string;
    kickoffTime: string;
    note: string;
  };
  teamBreakdown: {
    team: string;
    slug: string;
    period: string;
    goals: number;
    matches: number;
    assists: number;
    ratio: number;
    color: string;
    accentColor: string;
    badgeUrl: string;
  }[];
  bodyPartBreakdown: {
    type: string;
    goals: number;
    percentage: number;
    description: string;
    icon: string;
  }[];
  methodBreakdown: {
    type: string;
    goals: number;
    percentage: number;
    description: string;
  }[];
  venueBreakdown: {
    type: string;
    goals: number;
    percentage: number;
    description: string;
  }[];
  worldRecords: {
    title: string;
    value: string;
    description: string;
    category: "world" | "ucl" | "international" | "club";
    verifiedBy: string;
  }[];
}

export const cr7CareerSummary: CR7CareerSummary = {
  totalGoals: 985,
  countdownTarget: 1000,
  goalsNeeded: 15,
  totalMatches: 1341,
  totalAssists: 256,
  minutesPlayed: 110160,
  minutesPerGoal: 111.8,
  minutesPerContribution: 88.8,
  nextMatch: {
    competition: "Saudi Pro League / AFC Champions League",
    homeTeam: "Al Nassr",
    awayTeam: "Al Shabab",
    stadium: "Al Awwal Park, Riyadh",
    kickoffTime: "2026-11-08 20:00 (GMT+3)",
    note: "Săn bàn thắng chính thức thứ 986!",
  },
  teamBreakdown: [
    {
      team: "Real Madrid",
      slug: "real-madrid",
      period: "2009 - 2018",
      goals: 450,
      matches: 438,
      assists: 131,
      ratio: 1.03,
      color: "#FFFFFF",
      accentColor: "#D4AF37",
      badgeUrl: "/badges/real-madrid.png",
    },
    {
      team: "ĐTQG Bồ Đào Nha",
      slug: "portugal",
      period: "2003 - Nay",
      goals: 146,
      matches: 232,
      assists: 37,
      ratio: 0.63,
      color: "#DC2626",
      accentColor: "#16A34A",
      badgeUrl: "/badges/portugal.png",
    },
    {
      team: "Manchester United",
      slug: "man-utd",
      period: "2003-2009, 2021-2022",
      goals: 145,
      matches: 346,
      assists: 64,
      ratio: 0.42,
      color: "#DA291C",
      accentColor: "#FBE122",
      badgeUrl: "/badges/man-utd.png",
    },
    {
      team: "Al Nassr",
      slug: "al-nassr",
      period: "2023 - Nay",
      goals: 138,
      matches: 160,
      assists: 23,
      ratio: 0.86,
      color: "#EAB308",
      accentColor: "#1E3A8A",
      badgeUrl: "/badges/al-nassr.png",
    },
    {
      team: "Juventus",
      slug: "juventus",
      period: "2018 - 2021",
      goals: 101,
      matches: 134,
      assists: 22,
      ratio: 0.75,
      color: "#18181B",
      accentColor: "#F4F4F5",
      badgeUrl: "/badges/juventus.png",
    },
    {
      team: "Sporting CP",
      slug: "sporting-cp",
      period: "2002 - 2003",
      goals: 5,
      matches: 31,
      assists: 6,
      ratio: 0.16,
      color: "#15803D",
      accentColor: "#FFFFFF",
      badgeUrl: "/badges/sporting.png",
    },
  ],
  bodyPartBreakdown: [
    {
      type: "Chân phải (Right Foot)",
      goals: 634,
      percentage: 64.4,
      description: "Vũ khí sát thương chính: Mu bàn chân, lòng trong và những cú nã đại bác xa 35-40 mét.",
      icon: "Footprints",
    },
    {
      type: "Chân trái (Left Foot)",
      goals: 188,
      percentage: 19.1,
      description: "Chân không thuận là một huyền thoại. Hàng chục siêu phẩm sút xa và bắt vô-lê một chạm.",
      icon: "Zap",
    },
    {
      type: "Đánh đầu (Header)",
      goals: 160,
      percentage: 16.2,
      description: "Air CR7: Khả năng bật nhảy 2.93m, thời gian treo người trên không (hang-time) thách thức trọng lực.",
      icon: "ArrowUpCircle",
    },
    {
      type: "Bộ phận khác (Khác)",
      goals: 3,
      percentage: 0.3,
      description: "Bằng ngực, đùi và những pha chớp thời cơ nhạy bén trước vạch vôi.",
      icon: "Sparkles",
    },
  ],
  methodBreakdown: [
    {
      type: "Bóng sống (Open Play)",
      goals: 735,
      percentage: 74.6,
      description: "Khả năng di chuyển không bóng ma quái, đệm bóng cận thành, đột phá và dứt điểm uy lực.",
    },
    {
      type: "Phạt đền (Penalties)",
      goals: 184,
      percentage: 18.7,
      description: "Bản lĩnh thép ở khoảng cách 11m. Tỷ lệ thành công vượt trội ở các trận chung kết nghẹt thở.",
    },
    {
      type: "Đá phạt trực tiếp (Direct Free-kick)",
      goals: 66,
      percentage: 6.7,
      description: "Tuyệt kỹ Knuckleball trứ danh với quỹ đạo bóng lắc lư khó lường làm bó tay mọi thủ môn.",
    },
  ],
  venueBreakdown: [
    {
      type: "Sân nhà (Home)",
      goals: 508,
      percentage: 51.6,
      description: "Thánh địa Santiago Bernabéu, Old Trafford và Al Awwal Park luôn ngập tràn tiếng hô 'SIUUU'.",
    },
    {
      type: "Sân khách (Away)",
      goals: 402,
      percentage: 40.8,
      description: "Kẻ hủy diệt áp lực. Ghi bàn và biến tiếng la ó của khán giả đối phương thành sự câm lặng.",
    },
    {
      type: "Sân trung lập (Neutral)",
      goals: 75,
      percentage: 7.6,
      description: "Bản lĩnh ở các trận chung kết cúp C1, World Cup, Euro, FIFA Club World Cup.",
    },
  ],
  worldRecords: [
    {
      title: "Cầu thủ ghi nhiều bàn thắng chính thức nhất lịch sử",
      value: "985+ Bàn",
      description: "Kỷ lục mọi thời đại của bóng đá thế giới được FIFA, IFFHS và Sách kỷ lục Guinness công nhận.",
      category: "world",
      verifiedBy: "Guinness World Records & FIFA",
    },
    {
      title: "Chân sút vĩ đại nhất lịch sử Đội tuyển Quốc gia",
      value: "146 Bàn",
      description: "Vượt qua kỷ lục 109 bàn của Ali Daei (Iran) để độc tôn đứng đầu lịch sử bóng đá quốc tế.",
      category: "international",
      verifiedBy: "UEFA & FIFA",
    },
    {
      title: "Cầu thủ ghi nhiều bàn nhất lịch sử UEFA Champions League",
      value: "140 Bàn",
      description: "Ông vua cúp C1 châu Âu (Mr. Champions League) với 140 bàn trong 183 trận đấu đỉnh cao.",
      category: "ucl",
      verifiedBy: "UEFA",
    },
    {
      title: "Cầu thủ ra sân nhiều nhất lịch sử ĐTQG",
      value: "232+ Trận",
      description: "Sự bền bỉ phi thường khoác áo ĐT Bồ Đào Nha suốt hơn hai thập kỷ từ năm 2003 đến nay.",
      category: "international",
      verifiedBy: "FIFA",
    },
    {
      title: "Ghi bàn tại 5 kỳ FIFA World Cup liên tiếp",
      value: "5 VCK World Cup",
      description: "Kỷ lục duy nhất trong lịch sử bóng đá nam thế giới (2006, 2010, 2014, 2018, 2022).",
      category: "world",
      verifiedBy: "FIFA",
    },
    {
      title: "Chân sút vĩ đại nhất lịch sử VCK Euro",
      value: "14 Bàn",
      description: "Giữ kỷ lục số bàn thắng qua các kỳ Euro (2004, 2008, 2012, 2016, 2020) và số lần tham dự (6 VCK).",
      category: "international",
      verifiedBy: "UEFA",
    },
    {
      title: "Cầu thủ lập nhiều Hat-trick nhất cho ĐTQG",
      value: "10 Hattrick",
      description: "Không một cầu thủ nào trong lịch sử bóng đá quốc tế có số lần ghi 3 bàn/trận nhiều hơn CR7.",
      category: "international",
      verifiedBy: "FIFA",
    },
    {
      title: "Chuỗi trận ghi bàn liên tiếp dài nhất Champions League",
      value: "11 Trận",
      description: "Ghi bàn liên tục trong 11 trận đấu cúp C1 liên tiếp (mùa giải 2017-2018), ghi tổng cộng 17 bàn.",
      category: "ucl",
      verifiedBy: "UEFA",
    },
  ],
};
