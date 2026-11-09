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
    kickoffIso?: string;
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

export interface CR7Fixture {
  id: string;
  competition: string;
  competitionEn: string;
  homeTeam: string;
  awayTeam: string;
  stadium: string;
  stadiumEn: string;
  kickoffTime: string;
  kickoffIso: string;
  noteVi: string;
  noteEn: string;
}

export const cr7UpcomingFixtures: CR7Fixture[] = [
  {
    id: "spl-2026-11-20-al-qadsiah",
    competition: "Saudi Pro League (Vòng 14)",
    competitionEn: "Saudi Pro League (Matchday 14)",
    homeTeam: "Al Nassr",
    awayTeam: "Al-Qadsiah",
    stadium: "Al Awwal Park, Riyadh",
    stadiumEn: "Al Awwal Park, Riyadh",
    kickoffTime: "2026-11-20 20:00 (GMT+3)",
    kickoffIso: "2026-11-20T17:00:00Z",
    noteVi: "00:00 21/11 (VN) • Săn bàn thắng chính thức thứ 986!",
    noteEn: "Pursuing official career goal #986!",
  },
  {
    id: "acl-2026-11-24-al-sadd",
    competition: "AFC Champions League Elite",
    competitionEn: "AFC Champions League Elite",
    homeTeam: "Al Nassr",
    awayTeam: "Al-Sadd",
    stadium: "Al Awwal Park, Riyadh",
    stadiumEn: "Al Awwal Park, Riyadh",
    kickoffTime: "2026-11-24 21:15 (GMT+3)",
    kickoffIso: "2026-11-24T18:15:00Z",
    noteVi: "01:15 25/11 (VN) • Vòng bảng AFC Champions League Elite",
    noteEn: "AFC Champions League Elite matchday",
  },
  {
    id: "spl-2026-11-29-al-khaleej",
    competition: "Saudi Pro League (Vòng 15)",
    competitionEn: "Saudi Pro League (Matchday 15)",
    homeTeam: "Al-Khaleej",
    awayTeam: "Al Nassr",
    stadium: "Prince Mohamed bin Fahd Stadium, Dammam",
    stadiumEn: "Prince Mohamed bin Fahd Stadium, Dammam",
    kickoffTime: "2026-11-29 17:30 (GMT+3)",
    kickoffIso: "2026-11-29T14:30:00Z",
    noteVi: "21:30 29/11 (VN) • Chuyến làm khách tại Dammam",
    noteEn: "Away match at Dammam",
  },
  {
    id: "acl-2026-12-02-al-gharafa",
    competition: "AFC Champions League Elite",
    competitionEn: "AFC Champions League Elite",
    homeTeam: "Al-Gharafa",
    awayTeam: "Al Nassr",
    stadium: "Al Bayt Stadium, Al Khor",
    stadiumEn: "Al Bayt Stadium, Al Khor",
    kickoffTime: "2026-12-02 19:00 (GMT+3)",
    kickoffIso: "2026-12-02T16:00:00Z",
    noteVi: "23:00 02/12 (VN) • Cúp C1 châu Á",
    noteEn: "AFC Champions League Elite",
  },
  {
    id: "spl-2026-12-06-al-ittihad",
    competition: "Saudi Pro League (Vòng 16)",
    competitionEn: "Saudi Pro League (Matchday 16)",
    homeTeam: "Al Nassr",
    awayTeam: "Al-Ittihad",
    stadium: "Al Awwal Park, Riyadh",
    stadiumEn: "Al Awwal Park, Riyadh",
    kickoffTime: "2026-12-06 20:00 (GMT+3)",
    kickoffIso: "2026-12-06T17:00:00Z",
    noteVi: "00:00 07/12 (VN) • Siêu kinh điển Saudi: CR7 vs Benzema",
    noteEn: "Saudi Superclasico: CR7 vs Benzema",
  },
];

export function getUpcomingNextMatch(lang: "vi" | "en" = "vi", refDate?: Date) {
  const now = (refDate || new Date()).getTime();
  // Find fixture where kickoff time + 2.5 hours is still in the future
  const upcoming = cr7UpcomingFixtures.find((fix) => {
    const kickoffMs = new Date(fix.kickoffIso).getTime();
    return kickoffMs + 2.5 * 3600 * 1000 > now;
  });

  const selected = upcoming || cr7UpcomingFixtures[0];
  return {
    competition: lang === "vi" ? selected.competition : selected.competitionEn,
    homeTeam: selected.homeTeam,
    awayTeam: selected.awayTeam,
    stadium: lang === "vi" ? selected.stadium : selected.stadiumEn,
    kickoffTime: selected.kickoffTime,
    kickoffIso: selected.kickoffIso,
    note: lang === "vi" ? selected.noteVi : selected.noteEn,
  };
}

export const cr7CareerSummaryVi: CR7CareerSummary = {
  totalGoals: 985,
  countdownTarget: 1000,
  goalsNeeded: 15,
  totalMatches: 1341,
  totalAssists: 256,
  minutesPlayed: 110160,
  minutesPerGoal: 111.8,
  minutesPerContribution: 88.8,
  nextMatch: {
    competition: "Saudi Pro League (Vòng 14)",
    homeTeam: "Al Nassr",
    awayTeam: "Al-Qadsiah",
    stadium: "Al Awwal Park, Riyadh",
    kickoffTime: "2026-11-20 20:00 (GMT+3)",
    kickoffIso: "2026-11-20T17:00:00Z",
    note: "00:00 21/11 (VN) • Săn bàn thắng chính thức thứ 986!",
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

export const cr7CareerSummaryEn: CR7CareerSummary = {
  totalGoals: 985,
  countdownTarget: 1000,
  goalsNeeded: 15,
  totalMatches: 1341,
  totalAssists: 256,
  minutesPlayed: 110160,
  minutesPerGoal: 111.8,
  minutesPerContribution: 88.8,
  nextMatch: {
    competition: "Saudi Pro League (Matchday 14)",
    homeTeam: "Al Nassr",
    awayTeam: "Al-Qadsiah",
    stadium: "Al Awwal Park, Riyadh",
    kickoffTime: "2026-11-20 20:00 (GMT+3)",
    kickoffIso: "2026-11-20T17:00:00Z",
    note: "Pursuing official career goal #986!",
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
      team: "Portugal National Team",
      slug: "portugal",
      period: "2003 - Present",
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
      period: "2023 - Present",
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
      type: "Right Foot",
      goals: 634,
      percentage: 64.4,
      description: "Primary lethal weapon: Instep drives, bending curlers, and thunderous screamers from 35-40 meters.",
      icon: "Footprints",
    },
    {
      type: "Left Foot",
      goals: 188,
      percentage: 19.1,
      description: "The most prolific 'weak' foot in football history. Dozens of long-range rockets and first-time volleys.",
      icon: "Zap",
    },
    {
      type: "Header",
      goals: 160,
      percentage: 16.2,
      description: "Air CR7: Gravity-defying 2.93m vertical leap with unmatched hang-time and heading precision.",
      icon: "ArrowUpCircle",
    },
    {
      type: "Other / Torso",
      goals: 3,
      percentage: 0.3,
      description: "Scored using chest, thigh, and lightning-fast reflex reactions right on the goal-line.",
      icon: "Sparkles",
    },
  ],
  methodBreakdown: [
    {
      type: "Open Play",
      goals: 735,
      percentage: 74.6,
      description: "Telepathic off-ball movement, clinical tap-ins, counter-attacking bursts, and devastating finishes.",
    },
    {
      type: "Penalties",
      goals: 184,
      percentage: 18.7,
      description: "Nerves of absolute steel from 11 meters. Unrivaled composure in high-stakes championship finals.",
    },
    {
      type: "Direct Free-kick",
      goals: 66,
      percentage: 6.7,
      description: "Trademark knuckleball technique with unpredictable dip, swerve, and ferocious velocity.",
    },
  ],
  venueBreakdown: [
    {
      type: "Home",
      goals: 508,
      percentage: 51.6,
      description: "Fortresses Santiago Bernabéu, Old Trafford, and Al Awwal Park echoing with iconic 'SIUUU' roars.",
    },
    {
      type: "Away",
      goals: 402,
      percentage: 40.8,
      description: "Hostile ground silencer. Thriving on away hostility and turning jeering crowds into awe-struck silence.",
    },
    {
      type: "Neutral",
      goals: 75,
      percentage: 7.6,
      description: "Clutch performer on the biggest stages: Champions League finals, World Cups, Euros, and Club World Cups.",
    },
  ],
  worldRecords: [
    {
      title: "All-Time Official Top Goalscorer in Football History",
      value: "985+ Goals",
      description: "The all-time world record in official association football recognized by FIFA, IFFHS, and Guinness World Records.",
      category: "world",
      verifiedBy: "Guinness World Records & FIFA",
    },
    {
      title: "All-Time Top International Goalscorer",
      value: "146 Goals",
      description: "Surpassed Ali Daei's 109-goal record to stand alone as the most prolific international marksman in history.",
      category: "international",
      verifiedBy: "UEFA & FIFA",
    },
    {
      title: "All-Time Top Scorer in UEFA Champions League",
      value: "140 Goals",
      description: "The undisputed Mr. Champions League with 140 goals in 183 elite appearances.",
      category: "ucl",
      verifiedBy: "UEFA",
    },
    {
      title: "Most Men's International Caps in World History",
      value: "232+ Matches",
      description: "Extraordinary longevity and dedication representing Portugal across more than two decades since 2003.",
      category: "international",
      verifiedBy: "FIFA",
    },
    {
      title: "Scored in 5 Consecutive FIFA World Cups",
      value: "5 World Cups",
      description: "The only male player in football history to score in five consecutive World Cup finals tournaments (2006, 2010, 2014, 2018, 2022).",
      category: "world",
      verifiedBy: "FIFA",
    },
    {
      title: "All-Time Top Scorer in UEFA European Championship",
      value: "14 Goals",
      description: "Record goalscorer across Euro tournaments (2004, 2008, 2012, 2016, 2020) and record 6 finals appearances.",
      category: "international",
      verifiedBy: "UEFA",
    },
    {
      title: "Most International Hat-tricks in History",
      value: "10 Hat-tricks",
      description: "No player in international football history has recorded more 3+ goal performances than CR7.",
      category: "international",
      verifiedBy: "FIFA",
    },
    {
      title: "Longest Consecutive Scoring Streak in Champions League",
      value: "11 Matches",
      description: "Scored in 11 consecutive Champions League matches during the 2017-2018 campaign, tallying 17 goals.",
      category: "ucl",
      verifiedBy: "UEFA",
    },
  ],
};

export const getCr7CareerSummary = (lang: "vi" | "en"): CR7CareerSummary => {
  const base = lang === "en" ? cr7CareerSummaryEn : cr7CareerSummaryVi;
  return {
    ...base,
    nextMatch: getUpcomingNextMatch(lang),
  };
};

// Default export for backwards compatibility
export const cr7CareerSummary = cr7CareerSummaryVi;
