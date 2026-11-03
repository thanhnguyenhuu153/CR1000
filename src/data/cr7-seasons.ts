export interface YearRecord {
  year: string;
  team: string;
  clubGoals: number;
  countryGoals: number;
  goals: number;
  matches: number;
  assists: number;
  ratio: string;
  isPeakYear?: boolean;
  milestoneNote: string;
}

// Giữ lại alias SeasonRecord cho tương thích ngược nếu cần
export type SeasonRecord = YearRecord;

export const cr7SeasonsData: YearRecord[] = [
  {
    year: "2002",
    team: "Sporting CP",
    clubGoals: 5,
    countryGoals: 0,
    goals: 5,
    matches: 18,
    assists: 3,
    ratio: "0.28",
    milestoneNote: "Bước ra ánh sáng tại Sporting CP: Cú đúp mở màn sự nghiệp chuyên nghiệp vào lưới Moreirense ở tuổi 17."
  },
  {
    year: "2003",
    team: "Sporting CP / Manchester United",
    clubGoals: 1,
    countryGoals: 0,
    goals: 1,
    matches: 35,
    assists: 3,
    ratio: "0.03",
    milestoneNote: "Màn trình diễn mê hoặc Sir Alex Ferguson đưa chàng trai Madeira đến Old Trafford tiếp quản chiếc áo số 7 huyền thoại."
  },
  {
    year: "2004",
    team: "Manchester United / Bồ Đào Nha",
    clubGoals: 6,
    countryGoals: 7,
    goals: 13,
    matches: 60,
    assists: 12,
    ratio: "0.22",
    milestoneNote: "Mở tài khoản cấp ĐTQG tại Euro 2004, đoạt FA Cup cùng Man United và lọt vào Đội hình tiêu biểu Euro."
  },
  {
    year: "2005",
    team: "Manchester United / Bồ Đào Nha",
    clubGoals: 13,
    countryGoals: 2,
    goals: 15,
    matches: 52,
    assists: 11,
    ratio: "0.29",
    milestoneNote: "Ghi bàn thắng thứ 1.000 trong lịch sử Premier League của Manchester United; rèn giũa thể lực và ý chí thép."
  },
  {
    year: "2006",
    team: "Manchester United / Bồ Đào Nha",
    clubGoals: 19,
    countryGoals: 6,
    goals: 25,
    matches: 60,
    assists: 17,
    ratio: "0.42",
    milestoneNote: "Vào bán kết World Cup 2006; bắt đầu bùng nổ tại Ngoại hạng Anh sau giai đoạn thử thách tâm lý khắc nghiệt."
  },
  {
    year: "2007",
    team: "Manchester United / Bồ Đào Nha",
    clubGoals: 29,
    countryGoals: 5,
    goals: 34,
    matches: 60,
    assists: 20,
    ratio: "0.57",
    milestoneNote: "Vô địch Premier League; đoạt trọn bộ Cầu thủ xuất sắc nhất năm của PFA và xếp thứ 2 Quả bóng Vàng thế giới."
  },
  {
    year: "2008",
    team: "Manchester United / Bồ Đào Nha",
    clubGoals: 34,
    countryGoals: 1,
    goals: 35,
    matches: 58,
    assists: 14,
    ratio: "0.60",
    milestoneNote: "Đỉnh cao cú đúp Premier League & Champions League Moscow; đoạt Quả bóng Vàng đầu tiên và Chiếc giày vàng châu Âu."
  },
  {
    year: "2009",
    team: "Man United / Real Madrid / BĐN",
    clubGoals: 29,
    countryGoals: 1,
    goals: 30,
    matches: 49,
    assists: 13,
    ratio: "0.61",
    milestoneNote: "Bản hợp đồng kỷ lục thế giới 94 triệu Euro đến Bernabéu trước 80.000 CĐV; đoạt giải FIFA Puskás đầu tiên."
  },
  {
    year: "2010",
    team: "Real Madrid / Bồ Đào Nha",
    clubGoals: 45,
    countryGoals: 3,
    goals: 48,
    matches: 59,
    assists: 21,
    ratio: "0.81",
    milestoneNote: "Thiết lập cỗ máy ghi bàn không thể ngăn chặn tại La Liga, lần đầu tiên vượt mốc 45 bàn trong một năm dương lịch."
  },
  {
    year: "2011",
    team: "Real Madrid / Bồ Đào Nha",
    clubGoals: 53,
    countryGoals: 7,
    goals: 60,
    matches: 60,
    assists: 18,
    ratio: "1.00",
    milestoneNote: "Chạm mốc tròn 60 bàn thắng trong 60 trận (hiệu suất chính xác 1.00 bàn/trận); vô địch Cúp Nhà Vua Tây Ban Nha."
  },
  {
    year: "2012",
    team: "Real Madrid / Bồ Đào Nha",
    clubGoals: 58,
    countryGoals: 5,
    goals: 63,
    matches: 71,
    assists: 13,
    ratio: "0.89",
    milestoneNote: "Vô địch La Liga kỷ lục 100 điểm cùng Real Madrid, đưa Bồ Đào Nha vào bán kết Euro 2012."
  },
  {
    year: "2013",
    team: "Real Madrid / Bồ Đào Nha",
    clubGoals: 59,
    countryGoals: 10,
    goals: 69,
    matches: 59,
    assists: 17,
    ratio: "1.17",
    isPeakYear: true,
    milestoneNote: "Đỉnh cao sự nghiệp: 69 bàn sau 59 trận (59 bàn cho Real Madrid + 10 bàn cho BĐN). Cú hat-trick vĩ đại tại Solna đưa BĐN đến World Cup và đoạt Quả bóng Vàng 2013."
  },
  {
    year: "2014",
    team: "Real Madrid / Bồ Đào Nha",
    clubGoals: 56,
    countryGoals: 5,
    goals: 61,
    matches: 60,
    assists: 20,
    ratio: "1.02",
    milestoneNote: "Hiện thực hóa giấc mơ 'La Décima' lịch sử cho Real Madrid; kỷ lục vô tiền khoáng hậu 17 bàn trong một mùa UCL."
  },
  {
    year: "2015",
    team: "Real Madrid / Bồ Đào Nha",
    clubGoals: 54,
    countryGoals: 3,
    goals: 57,
    matches: 57,
    assists: 17,
    ratio: "1.00",
    milestoneNote: "Chính thức vượt qua Raúl González để trở thành Chân sút số 1 vĩ đại nhất lịch sử Real Madrid chỉ sau hơn 6 mùa giải."
  },
  {
    year: "2016",
    team: "Real Madrid / Bồ Đào Nha",
    clubGoals: 42,
    countryGoals: 13,
    goals: 55,
    matches: 57,
    assists: 17,
    ratio: "0.96",
    milestoneNote: "Năm vinh quang tột đỉnh: Vô địch Champions League và đưa Đội tuyển Bồ Đào Nha lần đầu tiên lên đỉnh châu Âu tại Euro 2016."
  },
  {
    year: "2017",
    team: "Real Madrid / Bồ Đào Nha",
    clubGoals: 42,
    countryGoals: 11,
    goals: 53,
    matches: 59,
    assists: 13,
    ratio: "0.90",
    milestoneNote: "Phá bỏ lời nguyền Champions League bảo vệ ngai vàng Cardiff, thâu tóm Quả bóng Vàng thứ 5 trong sự nghiệp."
  },
  {
    year: "2018",
    team: "Real Madrid / Juventus / BĐN",
    clubGoals: 43,
    countryGoals: 6,
    goals: 49,
    matches: 53,
    assists: 13,
    ratio: "0.92",
    milestoneNote: "Kỳ tích 3 năm liên tiếp vô địch Champions League (Kyiv 2018); siêu phẩm xe đạp chổng ngược vào lưới Juventus gây chấn động."
  },
  {
    year: "2019",
    team: "Juventus / Bồ Đào Nha",
    clubGoals: 25,
    countryGoals: 14,
    goals: 39,
    matches: 50,
    assists: 5,
    ratio: "0.78",
    milestoneNote: "Vô địch Serie A và Nations League; cú hat-trick ngược dòng kinh điển vòng 1/8 UCL trước Atletico Madrid."
  },
  {
    year: "2020",
    team: "Juventus / Bồ Đào Nha",
    clubGoals: 41,
    countryGoals: 3,
    goals: 44,
    matches: 45,
    assists: 7,
    ratio: "0.98",
    milestoneNote: "Bảo vệ thành công Scudetto; vượt mốc 100 bàn quốc tế cho Bồ Đào Nha với cú đúp siêu phẩm sút phạt vào lưới Thụy Điển."
  },
  {
    year: "2021",
    team: "Juventus / Man Utd / BĐN",
    clubGoals: 34,
    countryGoals: 13,
    goals: 47,
    matches: 65,
    assists: 7,
    ratio: "0.72",
    milestoneNote: "Vua phá lưới Euro 2020 và chính thức phá vỡ kỷ lục của Ali Daei để trở thành Cầu thủ ghi nhiều bàn nhất lịch sử bóng đá quốc tế."
  },
  {
    year: "2022",
    team: "Man United / Bồ Đào Nha",
    clubGoals: 13,
    countryGoals: 3,
    goals: 16,
    matches: 46,
    assists: 5,
    ratio: "0.35",
    milestoneNote: "Trở thành cầu thủ đầu tiên trong lịch sử ghi bàn ở 5 kỳ World Cup liên tiếp (2006, 2010, 2014, 2018, 2022)."
  },
  {
    year: "2023",
    team: "Al Nassr / Bồ Đào Nha",
    clubGoals: 44,
    countryGoals: 10,
    goals: 54,
    matches: 59,
    assists: 15,
    ratio: "0.92",
    milestoneNote: "Chân sút số 1 thế giới năm 2023 ở tuổi 38 với 54 bàn thắng (44 bàn Al Nassr + 10 bàn BĐN), vô địch Arab Club Champions Cup."
  },
  {
    year: "2024",
    team: "Al Nassr / Bồ Đào Nha",
    clubGoals: 36,
    countryGoals: 7,
    goals: 43,
    matches: 52,
    assists: 6,
    ratio: "0.83",
    milestoneNote: "Phá kỷ lục mọi thời đại của Saudi Pro League với 35 bàn/mùa; chạm mốc bàn thắng chính thức thứ 900 trong sự nghiệp."
  },
  {
    year: "2025",
    team: "Al Nassr / Bồ Đào Nha",
    clubGoals: 34,
    countryGoals: 7,
    goals: 41,
    matches: 64,
    assists: 7,
    ratio: "0.64",
    milestoneNote: "Tiếp tục nâng cao các kỷ lục ghi bàn ở tuổi 40, duy trì vị thế đầu tàu của Al Nassr và Đội tuyển Bồ Đào Nha."
  },
  {
    year: "2026",
    team: "Al Nassr / Bồ Đào Nha",
    clubGoals: 24,
    countryGoals: 4,
    goals: 28,
    matches: 33,
    assists: 5,
    ratio: "0.85",
    milestoneNote: "Vô địch Saudi Pro League 2025–2026 cùng Al Nassr. Đạt mốc 985 bàn thắng chính thức, chỉ còn cách 15 bàn để chạm đỉnh 1.000 bàn thắng lịch sử."
  }
];
