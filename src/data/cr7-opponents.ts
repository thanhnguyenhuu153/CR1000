export interface OpponentStat {
  rank: number;
  team: string;
  country: string;
  goals: number;
  matches: number;
  ratio: number;
  hattricks: number;
  notableMatch: string;
  badgeSlug: string;
}

export const cr7TopOpponents: OpponentStat[] = [
  {
    rank: 1,
    team: "Sevilla FC",
    country: "Tây Ban Nha",
    goals: 27,
    matches: 18,
    ratio: 1.50,
    hattricks: 5,
    notableMatch: "Ghi 5 cú hat-trick vào lưới Sevilla, bao gồm 1 cú poker (4 bàn) tại Ramón Sánchez Pizjuán năm 2011.",
    badgeSlug: "sevilla",
  },
  {
    rank: 2,
    team: "Atlético Madrid",
    country: "Tây Ban Nha",
    goals: 25,
    matches: 37,
    ratio: 0.68,
    hattricks: 4,
    notableMatch: "Cơn ác mộng lớn nhất của Diego Simeone với 3 cú hat-trick tại Champions League (2017 cho Real, 2019 cho Juventus).",
    badgeSlug: "atletico-madrid",
  },
  {
    rank: 3,
    team: "Getafe CF",
    country: "Tây Ban Nha",
    goals: 23,
    matches: 14,
    ratio: 1.64,
    hattricks: 3,
    notableMatch: "Hiệu suất hủy diệt gần 1.7 bàn/trận, 3 cú hat-trick chỉ sau 14 lần đối đầu tại La Liga.",
    badgeSlug: "getafe",
  },
  {
    rank: 4,
    team: "FC Barcelona",
    country: "Tây Ban Nha",
    goals: 20,
    matches: 34,
    ratio: 0.59,
    hattricks: 0,
    notableMatch: "Đỉnh cao El Clásico: Cú đánh đầu hiệp phụ chung kết Cúp Nhà Vua 2011 và pha ăn mừng 'Calma' câm lặng Camp Nou 2012.",
    badgeSlug: "barcelona",
  },
  {
    rank: 5,
    team: "Celta de Vigo",
    country: "Tây Ban Nha",
    goals: 20,
    matches: 13,
    ratio: 1.54,
    hattricks: 3,
    notableMatch: "Ghi 4 bàn (poker) trong trận thắng 7-1 năm 2016 tại Bernabéu.",
    badgeSlug: "celta-vigo",
  },
  {
    rank: 6,
    team: "Athletic Bilbao",
    country: "Tây Ban Nha",
    goals: 17,
    matches: 18,
    ratio: 0.94,
    hattricks: 3,
    notableMatch: "3 cú hat-trick trước đại diện xứ Basque, bao gồm chiến thắng 5-0 năm 2014.",
    badgeSlug: "athletic-bilbao",
  },
  {
    rank: 7,
    team: "Málaga CF",
    country: "Tây Ban Nha",
    goals: 17,
    matches: 19,
    ratio: 0.89,
    hattricks: 2,
    notableMatch: "Ghi bàn mở tỷ số quyết định mang về chức vô địch La Liga 2016-2017 ở vòng đấu cuối cùng.",
    badgeSlug: "malaga",
  },
  {
    rank: 8,
    team: "RCD Espanyol",
    country: "Tây Ban Nha",
    goals: 15,
    matches: 16,
    ratio: 0.94,
    hattricks: 2,
    notableMatch: "Cú Manita ghi 5 bàn và 1 kiến tạo trong chiến thắng 6-0 ngay tại xứ Catalunya năm 2015.",
    badgeSlug: "espanyol",
  },
  {
    rank: 9,
    team: "Tottenham Hotspur",
    country: "Anh",
    goals: 14,
    matches: 20,
    ratio: 0.70,
    hattricks: 1,
    notableMatch: "Cú hat-trick đưa Ronaldo thành chân sút vĩ đại nhất lịch sử FIFA năm 2022 trong màu áo MU.",
    badgeSlug: "tottenham",
  },
  {
    rank: 10,
    team: "Juventus FC",
    country: "Ý",
    goals: 10,
    matches: 7,
    ratio: 1.43,
    hattricks: 0,
    notableMatch: "Hiệu suất 1.43 bàn/trận vào lưới Gianluigi Buffon; cú đúp chung kết C1 2017 và siêu phẩm xe đạp chổng ngược 2018.",
    badgeSlug: "juventus",
  },
];
