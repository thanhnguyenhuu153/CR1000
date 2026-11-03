export interface IconicGoal {
  id: string;
  category: "final" | "iconic" | "clutch";
  title: string;
  match: string;
  date: string;
  competition: string;
  trophyOrAward?: string;
  minute: number;
  scoreBefore: string;
  scoreFinal: string;
  team: string;
  opponent: string;
  stadium: string;
  description: string;
  impact: string;
  matchImageUrl?: string;
  gearTag?: {
    bootName: string;
    description: string;
    affiliateKeyword: string;
  };
}

export const cr7FinalsAndIconicGoals: IconicGoal[] = [
  // CÁC BÀN THẮNG TRONG TRẬN CHUNG KẾT ĐOẠT CÚP
  {
    id: "final-nations-league-2025",
    category: "final",
    title: "Cú vô-lê phút 61 chung kết Nations League 2025 – Danh hiệu quốc tế thứ 3",
    match: "Bồ Đào Nha 2 - 2 Tây Ban Nha (Pen 5-3)",
    date: "08/06/2025",
    competition: "UEFA Nations League Final 2025",
    trophyOrAward: "Cúp Vô địch UEFA Nations League 2024–25",
    minute: 61,
    scoreBefore: "1 - 2",
    scoreFinal: "2 - 2 (Thắng Penalty 5-3)",
    team: "Bồ Đào Nha",
    opponent: "Tây Ban Nha",
    stadium: "Allianz Arena (Munich, Đức)",
    matchImageUrl: "/images/cr7/era-portugal.jpg",
    description:
      "Tây Ban Nha hai lần vượt lên dẫn trước tại Munich. Phút 61, từ quả tạt sấm sét của Nuno Mendes, Ronaldo băng cắt đệm bóng cận thành tung nóc lưới Unai Simón gỡ hòa 2-2 trong sự vỡ òa của hàng vạn CĐV Bồ Đào Nha, mở đường cho chiến thắng 5-3 ở loạt luân lưu.",
    impact: "Mang về danh hiệu Nations League thứ 2 trong lịch sử bóng đá Bồ Đào Nha (2019 & 2025), đưa tổng số danh hiệu quốc tế của CR7 lên con số 3.",
    gearTag: {
      bootName: "Nike Mercurial Superfly 10 Elite CR7",
      description: "Vũ khí định đoạt trận chung kết nghẹt thở tại Allianz Arena",
      affiliateKeyword: "Nike Mercurial Superfly 10 CR7",
    },
  },
  {
    id: "final-ucl-2008",
    category: "final",
    title: "Cú đánh đầu trong mưa tuyết Moscow – Cúp C1 đầu tiên",
    match: "Manchester United 1 - 1 Chelsea (Pen 6-5)",
    date: "21/05/2008",
    competition: "UEFA Champions League Final",
    trophyOrAward: "Cúp Vô địch UEFA Champions League 2008",
    minute: 26,
    scoreBefore: "0 - 0",
    scoreFinal: "1 - 1 (Thắng Penalty)",
    team: "Manchester United",
    opponent: "Chelsea FC",
    stadium: "Luzhniki Stadium (Moscow, Nga)",
    matchImageUrl: "/images/cr7/final-chelsea.jpg",
    description:
      "Từ quả tạt của Wes Brown, Ronaldo bật nhảy cao hơn Michael Essien nửa thân người, dừng lại trên không trung một khoảnh khắc rồi lắc đầu găm bóng vào góc hiểm của Petr Čech.",
    impact: "Mở ra chức vô địch Champions League đầu tiên trong sự nghiệp và đảm bảo Quả bóng Vàng 2008.",
    gearTag: {
      bootName: "Nike Mercurial Vapor IV Rosa (Pink)",
      description: "Đôi giày hồng nổi loạn làm nên lịch sử dưới mưa Moscow",
      affiliateKeyword: "Nike Mercurial Vapor IV",
    },
  },
  {
    id: "final-copa-2011",
    category: "final",
    title: "Cú bật nhảy phút 103 lật đổ triều đại Pep Guardiola",
    match: "Real Madrid 1 - 0 Barcelona",
    date: "20/04/2011",
    competition: "Copa del Rey Final",
    trophyOrAward: "Cúp Nhà Vua Tây Ban Nha 2011",
    minute: 103,
    scoreBefore: "0 - 0",
    scoreFinal: "1 - 0",
    team: "Real Madrid",
    opponent: "FC Barcelona",
    stadium: "Mestalla (Valencia, Tây Ban Nha)",
    description:
      "Hiệp phụ thứ nhất, Angel Di Maria tạt bóng từ cánh trái. Ronaldo bật nhảy cao 2.65m vượt qua Adriano, đánh đầu cầu âu thẳng vào góc xa khiến Pinto hoàn toàn bất lực.",
    impact: "Danh hiệu đầu tiên của Ronaldo cùng Real Madrid, chấm dứt chuỗi thống trị tuyệt đối của Barcelona thời kỳ đỉnh cao tiki-taka.",
    gearTag: {
      bootName: "Nike Mercurial Superfly II Safari",
      description: "Đôi giày họa tiết da báo huyền thoại của CR7",
      affiliateKeyword: "Nike Mercurial Superfly Safari",
    },
  },
  {
    id: "final-ucl-2014",
    category: "final",
    title: "Ấn định La Décima lịch sử & Kỷ lục 17 bàn một mùa",
    match: "Real Madrid 4 - 1 Atlético Madrid",
    date: "24/05/2014",
    competition: "UEFA Champions League Final",
    trophyOrAward: "Cúp Vô địch UEFA Champions League 2014 (La Décima)",
    minute: 120,
    scoreBefore: "3 - 1",
    scoreFinal: "4 - 1",
    team: "Real Madrid",
    opponent: "Atlético Madrid",
    stadium: "Estádio da Luz (Lisbon, Bồ Đào Nha)",
    description:
      "Bị phạm lỗi trong vòng cấm ở những giây cuối hiệp phụ, Ronaldo lạnh lùng đánh lừa Courtois trên chấm 11m, rồi cởi áo khoe cơ bắp ăn mừng nghẹt thở trên quê hương Bồ Đào Nha.",
    impact: "Hiện thực hóa giấc mơ La Décima (chiếc cúp C1 thứ 10) sau 12 năm chờ đợi của Real Madrid và lập kỷ lục vô tiền khoáng hậu: 17 bàn trong 1 mùa giải Champions League.",
    gearTag: {
      bootName: "Nike Mercurial Superfly IV",
      description: "Đôi giày cổ cao Dynamic Fit collar đầu tiên của Nike",
      affiliateKeyword: "Nike Mercurial Superfly IV",
    },
  },
  {
    id: "final-ucl-2017",
    category: "final",
    title: "Cú đúp xé toang bức tường Juventus – Phá lời nguyền C1",
    match: "Real Madrid 4 - 1 Juventus",
    date: "03/06/2017",
    competition: "UEFA Champions League Final",
    trophyOrAward: "Cúp Vô địch UEFA Champions League 2017 (Duodécima)",
    minute: 20,
    scoreBefore: "0 - 0",
    scoreFinal: "4 - 1",
    team: "Real Madrid",
    opponent: "Juventus FC",
    stadium: "Millennium Stadium (Cardiff, Xứ Wales)",
    matchImageUrl: "/images/cr7/era-realmadrid.jpg",
    description:
      "Ghi bàn mở tỷ số với pha đệm bóng một chạm đẳng cấp từ đường chuyền của Carvajal, sau đó nâng tỷ số lên 3-1 với pha băng cắt tinh quái hạ gục thủ thành Gianluigi Buffon.",
    impact: "Giúp Real Madrid trở thành đội bóng đầu tiên trong lịch sử bảo vệ thành công chức vô địch Champions League trong kỷ nguyên hiện đại.",
    gearTag: {
      bootName: "Nike Mercurial Superfly V CR7 Chapter 4",
      description: "Đôi giày ghi dấu ấn rực rỡ tại Cardiff",
      affiliateKeyword: "Nike Mercurial Superfly V CR7",
    },
  },
  {
    id: "final-arab-2023",
    category: "final",
    title: "Cú đúp quật khởi khi chơi 9 người – Danh hiệu đầu tiên ở Ả Rập",
    match: "Al Nassr 2 - 1 Al Hilal",
    date: "12/08/2023",
    competition: "Arab Club Champions Cup Final",
    trophyOrAward: "Cúp Vô địch Arab Club Champions Cup 2023",
    minute: 74,
    scoreBefore: "0 - 1",
    scoreFinal: "2 - 1",
    team: "Al Nassr",
    opponent: "Al Hilal",
    stadium: "King Fahd Stadium (Taif, Ả Rập Xê Út)",
    description:
      "Trong thế trận Al Nassr bị đuổi người và đang bị dẫn 0-1, CR7 ghi bàn gỡ hòa 1-1 ở phút 74, rồi đánh đầu quả cảm ấn định chiến thắng 2-1 ở hiệp phụ trước khi rời sân vì chấn thương.",
    impact: "Danh hiệu đầu tiên của Ronaldo tại Trung Đông, khẳng định bản lĩnh thủ lĩnh không tuổi.",
    gearTag: {
      bootName: "Nike Mercurial Superfly 9 Elite CR7",
      description: "Đôi giày đồng hành cùng chiến dịch chinh phục Ả Rập",
      affiliateKeyword: "Nike Mercurial Superfly 9 CR7",
    },
  },

  // CÁC SIÊU PHẨM BIỂU TƯỢNG BẤT TỬ
  {
    id: "iconic-bicycle-juve-2018",
    category: "iconic",
    title: "Cú ngả bàn đèn 2.38m khiến cả Turin đứng dậy vỗ tay",
    match: "Juventus 0 - 3 Real Madrid",
    date: "03/04/2018",
    competition: "UEFA Champions League (Tứ kết)",
    minute: 64,
    scoreBefore: "0 - 1",
    scoreFinal: "0 - 3",
    team: "Real Madrid",
    opponent: "Juventus FC",
    stadium: "Allianz Stadium (Turin, Ý)",
    description:
      "Đón đường tạt bóng của Dani Carvajal, Ronaldo ngả người song song với mặt đất ở độ cao 2.38m, tung cú móc bóng bằng chân phải hoàn hảo găm thẳng góc chết. Cả sân vận động đối phương đứng dậy vỗ tay tán thưởng một kiệt tác lịch sử.",
    impact: "Khoảnh khắc được bình chọn là bàn thắng đẹp nhất lịch sử Champions League và là cơ duyên đưa CR7 tới Juventus sau này.",
    gearTag: {
      bootName: "Nike Mercurial Superfly 360 Elite",
      description: "Đôi giày trong siêu phẩm ngả bàn đèn thế kỷ",
      affiliateKeyword: "Nike Mercurial Superfly 360",
    },
  },
  {
    id: "iconic-puskas-porto-2009",
    category: "iconic",
    title: "Cú nã đại bác 40 mét đoạt giải FIFA Puskás đầu tiên",
    match: "FC Porto 0 - 1 Manchester United",
    date: "15/04/2009",
    competition: "UEFA Champions League (Tứ kết)",
    minute: 6,
    scoreBefore: "0 - 0",
    scoreFinal: "0 - 1",
    team: "Manchester United",
    opponent: "FC Porto",
    stadium: "Estádio do Dragão (Porto, Bồ Đào Nha)",
    description:
      "Nhận bóng ở cự ly hơn 40 mét (gần nửa sân), Ronaldo tung cú đại bác sấm sét với vận tốc gần 105 km/h. Trái bóng bay căng như kẻ chỉ găm thẳng vào góc chữ A trong sự bàng hoàng của thủ thành Helton.",
    impact: "Đoạt giải thưởng FIFA Puskás đầu tiên trong lịch sử cho bàn thắng đẹp nhất năm 2009 và đưa MU vào bán kết C1.",
    gearTag: {
      bootName: "Nike Mercurial Vapor Superfly I",
      description: "Vũ khí tốc độ mang tính cách mạng của Nike với sợi Flywire",
      affiliateKeyword: "Nike Mercurial Vapor Superfly",
    },
  },
  {
    id: "iconic-calma-campnou-2012",
    category: "iconic",
    title: "Pha ăn mừng 'Calma Calma' câm lặng 98.000 cule Camp Nou",
    match: "FC Barcelona 1 - 2 Real Madrid",
    date: "21/04/2012",
    competition: "La Liga (Vòng 35)",
    minute: 73,
    scoreBefore: "1 - 1",
    scoreFinal: "1 - 2",
    team: "Real Madrid",
    opponent: "FC Barcelona",
    stadium: "Camp Nou (Barcelona, Tây Ban Nha)",
    description:
      "Mesut Özil chọc khe xé toang hàng thủ Barca. Ronaldo bứt tốc loại bỏ Puyol và thủ thành Valdés trước khi dứt điểm góc hẹp tinh tế rồi làm cử chỉ 'Bình tĩnh nào, đã có tôi ở đây'.",
    impact: "Định đoạt chức vô địch La Liga 100 điểm lịch sử của Real Madrid dưới trướng José Mourinho.",
  },
  {
    id: "iconic-freekick-portsmouth-2008",
    category: "iconic",
    title: "Đỉnh cao tuyệt kỹ sút phạt Knuckleball thách thức vật lý",
    match: "Manchester United 2 - 0 Portsmouth",
    date: "30/01/2008",
    competition: "Premier League",
    minute: 13,
    scoreBefore: "1 - 0",
    scoreFinal: "2 - 0",
    team: "Manchester United",
    opponent: "Portsmouth FC",
    stadium: "Old Trafford (Manchester, Anh)",
    description:
      "Đứng trước quả phạt cách khung thành 25m với dáng đứng bành chân trứ danh. Cú sút bằng mu bàn chân khiến trái bóng không hề xoáy, lắc lư dữ dội trên không trung rồi rơi thẳng góc chữ A làm David James chỉ biết chôn chân đứng nhìn.",
    impact: "Được Sir Alex Ferguson ca ngợi là 'Quả đá phạt trực tiếp hoàn hảo nhất lịch sử Premier League'.",
  },
  {
    id: "iconic-sweden-masterclass-2013",
    category: "clutch",
    title: "Cú hat-trick một mình kéo Bồ Đào Nha đến World Cup 2014",
    match: "Thụy Điển 2 - 3 Bồ Đào Nha",
    date: "19/11/2013",
    competition: "Vòng loại World Cup 2014 (Play-off)",
    minute: 79,
    scoreBefore: "2 - 2",
    scoreFinal: "2 - 3",
    team: "Bồ Đào Nha",
    opponent: "Thụy Điển",
    stadium: "Friends Arena (Solna, Thụy Điển)",
    matchImageUrl: "/images/cr7/era-portugal.jpg",
    description:
      "Trong trận đấu sinh tử trước 2 bàn thắng của Zlatan Ibrahimovic, Ronaldo đáp trả bằng 3 pha bứt tốc phản công chớp nhoáng với 3 cú dứt điểm lạnh lùng bằng chân trái và chân phải.",
    impact: "Đưa Bồ Đào Nha đến World Cup và đóng vai trò quyết định giúp Ronaldo đoạt Quả bóng Vàng 2013.",
  },
];
