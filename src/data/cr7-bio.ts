export interface BioMilestone {
  year: string;
  era: string;
  title: string;
  subtitle: string;
  description: string;
  quote?: string;
  badge: string;
  imageUrl: string;
  imageCaption: string;
  stats: {
    goals: number;
    matches: number;
    trophies: number;
  };
  highlights: string[];
}

export const cr7BioMilestonesVi: BioMilestone[] = [
  {
    year: "1985 - 2003",
    era: "Madeira & Sporting",
    title: "Cậu bé đảo ngọc mang ý chí thép",
    subtitle: "Từ Funchal nghèo khó tới lò đào tạo danh giá Sporting Lisbon",
    description:
      "Sinh ra trong một gia đình lao động nghèo ở Santo António, Funchal, Madeira. Từ những con dốc gập ghềnh với quả bóng cao su rách, cậu bé Cristiano rời quê hương năm 12 tuổi sang thủ đô Lisbon một mình. Vượt qua nỗi cô đơn và chứng tim đập nhanh năm 15 tuổi, Ronaldo trui rèn kỷ luật và ý chí sắt đá không gì khuất phục.",
    quote: "Tài năng không đi cùng sự chăm chỉ thì chẳng có ý nghĩa gì cả.",
    badge: "Bắt đầu giấc mơ",
    imageUrl: "/images/cr7/era-madeira.webp",
    imageCaption: "Cậu thiếu niên Cristiano Ronaldo tạo địa chấn tại Bồ Đào Nha (2003-2004)",
    stats: {
      goals: 5,
      matches: 31,
      trophies: 1,
    },
    highlights: [
      "1997: Gia nhập học viện Sporting CP với mức phí 1.500 Euro",
      "2002: Cầu thủ duy nhất lịch sử Sporting chơi cho cả 5 cấp độ (U16, U17, U18, B và Đội 1) trong 1 mùa giải",
      "07/10/2002: Cú đúp bàn thắng chính thức đầu tiên sự nghiệp vào lưới Moreirense",
      "06/08/2003: Màn trình diễn ma thuật khánh thành sân Alvalade XXI khiến Sir Alex Ferguson quyết định ký hợp đồng ngay lập tức",
    ],
  },
  {
    year: "2003 - 2009",
    era: "Manchester United (Kỳ 1)",
    title: "Chiếc áo số 7 huyền thoại & Đỉnh cao Quả bóng Vàng",
    subtitle: "Dưới bàn tay nhào nặn của Sir Alex Ferguson",
    description:
      "Kế thừa chiếc áo số 7 linh thiêng của George Best, Eric Cantona và David Beckham. Từ một chàng trai trẻ với những pha đảo chân rườm rà, Ronaldo lột xác thành cỗ máy săn bàn hủy diệt. Mùa giải 2007-2008 bùng nổ với 42 bàn thắng, đưa Quỷ Đỏ lên đỉnh Premier League và Champions League, đoạt Quả bóng Vàng đầu tiên ở tuổi 23.",
    quote: "Sir Alex là người cha thứ hai của tôi trong bóng đá. Ông ấy dạy tôi cách chiến thắng.",
    badge: "Vươn tầm thế giới",
    imageUrl: "/images/cr7/era-manutd-1.webp",
    imageCaption: "Cristiano Ronaldo bùng nổ trong màu áo đỏ Manchester United năm 2008",
    stats: {
      goals: 118,
      matches: 292,
      trophies: 9,
    },
    highlights: [
      "2004: Đoạt danh hiệu FA Cup đầu tiên với MU",
      "2006-2009: 3 chức vô địch Ngoại hạng Anh liên tiếp",
      "2008: Vô địch UEFA Champions League tại Moscow (ghi bàn đánh đầu mở tỷ số trong trận chung kết)",
      "2008: Quả bóng Vàng (Ballon d'Or) & Cầu thủ xuất sắc nhất thế giới FIFA",
      "2009: Cú nã đại bác 40m vào lưới FC Porto đoạt giải Puskás đầu tiên trong lịch sử",
    ],
  },
  {
    year: "2009 - 2018",
    era: "Real Madrid",
    title: "Bản trường ca vĩ đại & Kỳ tích 3 lần liên tiếp vô địch Champions League",
    subtitle: "450 bàn sau 438 trận – 4 Quả bóng Vàng – 4 Champions League",
    description:
      "Gia nhập Real Madrid với bản hợp đồng kỷ lục thế giới 94 triệu Euro trước sự chứng kiến của 80.000 khán giả chật kín sân Bernabéu. 9 năm tại thủ đô Tây Ban Nha là thời kỳ đỉnh cao chói lọi nhất lịch sử bóng đá hiện đại. Hiệu suất phi lý 1.03 bàn/trận, xô đổ kỷ lục của Raúl và Di Stéfano, mang về 'La Décima' và kỳ tích 3 mùa giải liên tiếp thống trị đỉnh cao Champions League vô tiền khoáng hậu (2016, 2017, 2018).",
    quote: "Tôi không tìm kiếm kỷ lục. Kỷ lục tự tìm đến tôi.",
    badge: "Huyền thoại bất tử",
    imageUrl: "/images/cr7/era-realmadrid.jpg",
    imageCaption: "Ronaldo cùng Real Madrid làm nên lịch sử với 3 chức vô địch Champions League liên tiếp (Kyiv 2018)",
    stats: {
      goals: 450,
      matches: 438,
      trophies: 16,
    },
    highlights: [
      "4 danh hiệu Champions League (2014, 2016, 2017, 2018) với kỳ tích 3 năm liên tiếp vô địch vô tiền khoáng hậu",
      "4 Quả bóng Vàng trong màu áo Real Madrid (2013, 2014, 2016, 2017)",
      "Chân sút số 1 mọi thời đại của Real Madrid: 450 bàn sau 438 trận (1.03 bàn/trận)",
      "Kỷ lục ghi 17 bàn trong 1 mùa giải Champions League (2013-2014)",
      "Siêu phẩm xe đạp chổng ngược vào lưới Juventus ở độ cao 2.38m",
    ],
  },
  {
    year: "2018 - 2021",
    era: "Juventus",
    title: "Chinh phục Serie A & Kỷ lục trăm bàn chớp nhoáng",
    subtitle: "Đẳng cấp vượt qua mọi rào cản phòng ngự xứ mì ống",
    description:
      "Chuyển đến nước Ý ở tuổi 33 với mức phí 100 triệu Euro, Ronaldo tiếp tục chứng minh sự thích nghi vô song tại giải đấu phòng ngự khét tiếng nhất thế giới. Anh trở thành cầu thủ nhanh nhất lịch sử Juventus chạm mốc 100 bàn thắng (chỉ sau 131 trận), ẵm trọn 2 Scudetto và để lại cú bật cao 2.56m đánh đầu tung lưới Sampdoria chấn động thế giới.",
    quote: "Tôi cần một thử thách mới để đẩy giới hạn bản thân đi xa hơn.",
    badge: "Chinh phục nước Ý",
    imageUrl: "/images/cr7/era-juventus.webp",
    imageCaption: "Ronaldo trong trang phục sọc trắng đen truyền thống của Juventus",
    stats: {
      goals: 101,
      matches: 134,
      trophies: 5,
    },
    highlights: [
      "2 chức vô địch Serie A (2018-19, 2019-20)",
      "Vua phá lưới Serie A (Capocannoniere) mùa giải 2020-21",
      "Cú bật nhảy 2.56m dừng trên không 0.92 giây đánh đầu hạ Sampdoria",
      "Cú hat-trick ngược dòng lịch sử trước Atletico Madrid tại vòng 1/8 Cúp C1",
      "Cầu thủ đầu tiên trong lịch sử giành trọn bộ danh hiệu quốc nội tại Premier League, La Liga và Serie A",
    ],
  },
  {
    year: "2021 - 2022",
    era: "Manchester United (Kỳ 2)",
    title: "Ngày về Old Trafford & Màn ăn mừng bùng nổ",
    subtitle: "Khoảnh khắc 'Viva Ronaldo' vang dội 'Nhà hát của những giấc mơ'",
    description:
      "Ngày 11/9/2021, Cristiano bước ra mặt cỏ Old Trafford trong tiếng gầm vang của 74.000 khán giả, lập ngay cú đúp vào lưới Newcastle. Dù đội bóng trải qua giai đoạn biến động, Ronaldo ở tuổi 37 vẫn là chân sút số 1 của CLB với 24 bàn thắng trên mọi đấu trường và chính thức cán mốc 800 bàn thắng trong sự nghiệp.",
    quote: "Tôi trở về nơi mình thuộc về. Tình yêu với Manchester United không bao giờ phai nhạt.",
    badge: "Ký ức Nhà hát",
    imageUrl: "/images/cr7/era-manutd-2.webp",
    imageCaption: "Ronaldo ăn mừng bùng nổ cùng Bruno Fernandes trong trận thắng Newcastle 4-1 (11/09/2021)",
    stats: {
      goals: 27,
      matches: 54,
      trophies: 0,
    },
    highlights: [
      "Lập cú đúp ngay trong trận ra mắt thứ hai tại Old Trafford vs Newcastle",
      "Cán mốc 800 bàn thắng sự nghiệp với cú đúp hạ gục Arsenal (3-2)",
      "Hattrick vào lưới Tottenham Hotspur và Norwich City tại Premier League",
      "Cầu thủ xuất sắc nhất năm của Man United (Sir Matt Busby Player of the Year)",
    ],
  },
  {
    year: "2023 - Nay",
    era: "Al Nassr",
    title: "Người khai phá phương Đông & Cuộc săn 1000 bàn",
    subtitle: "Viết lại bản đồ bóng đá toàn cầu ở tuổi tứ tuần",
    description:
      "Quyết định đến với Saudi Pro League không chỉ làm rung chuyển làng túc cầu mà còn mở đầu cho làn sóng hàng loạt siêu sao cập bến Ả Rập. Ronaldo tiếp tục ghi bàn như thở, liên tiếp đoạt Vua phá lưới giải đấu, phá kỷ lục ghi nhiều bàn nhất trong một mùa giải Saudi League (35 bàn). Mục tiêu tối thượng lúc này: Chạm mốc 1.000 bàn thắng chính thức!",
    quote: "Tôi muốn chạm mốc 1000 bàn thắng. Nếu không có chấn thương, đó là mục tiêu duy nhất của tôi.",
    badge: "Hành trình đến 1000",
    imageUrl: "/images/cr7/era-alnassr.jpg",
    imageCaption: "Cristiano Ronaldo rực sáng trong màu áo vàng Al Nassr",
    stats: {
      goals: 138,
      matches: 160,
      trophies: 2,
    },
    highlights: [
      "Vô địch Saudi Pro League 2025–2026 cùng Al Nassr",
      "Vô địch Arab Club Champions Cup 2023 (ghi cú đúp trong trận chung kết)",
      "Phá kỷ lục ghi nhiều bàn nhất 1 mùa Saudi Pro League (35 bàn)",
      "Chân sút số 1 thế giới trong năm dương lịch 2023 (54 bàn thắng)",
      "Chỉ còn 15 bàn nữa để trở thành cầu thủ đầu tiên lịch sử chạm 1.000 bàn chính thức",
    ],
  },
  {
    year: "2003 - Nay",
    era: "ĐTQG Bồ Đào Nha",
    title: "Seleção das Quinas & Người Đội Trưởng Vĩ Đại",
    subtitle: "Từ giọt nước mắt Euro 2004 đến 3 danh hiệu châu lục lịch sử",
    description:
      "Hơn hai thập kỷ cống hiến trọn vẹn cho màu cờ sắc áo Bồ Đào Nha. Từ giọt nước mắt nghẹn ngào của chàng trai 19 tuổi trong trận chung kết Euro 2004 tại Lisbon, Ronaldo biến nỗi đau thành động lực phi thường. Anh vươn lên thành đội trưởng mẫu mực, dẫn dắt Bồ Đào Nha đoạt chiếc cúp Euro 2016 lịch sử và 2 danh hiệu UEFA Nations League (2019 & 2025), trở thành chân sút vĩ đại nhất lịch sử bóng đá quốc tế với 146 bàn thắng.",
    quote: "Thi đấu cho ĐTQG Bồ Đào Nha là niềm tự hào lớn nhất trong cuộc đời tôi.",
    badge: "Tượng đài Quốc gia",
    imageUrl: "/images/cr7/era-portugal.webp",
    imageCaption: "Người đội trưởng huyền thoại dẫn dắt Bồ Đào Nha đến đỉnh cao châu Âu (Euro 2016)",
    stats: {
      goals: 146,
      matches: 232,
      trophies: 3,
    },
    highlights: [
      "3 chức vô địch lớn: Euro 2016, UEFA Nations League 2018–19 và UEFA Nations League 2024–25",
      "Chân sút vĩ đại nhất lịch sử Đội tuyển Quốc gia mọi thời đại: 146 bàn thắng",
      "Kỷ lục cầu thủ ra sân nhiều nhất lịch sử bóng đá quốc tế (232+ trận)",
      "Cầu thủ duy nhất trong lịch sử ghi bàn tại 5 kỳ FIFA World Cup liên tiếp",
      "Vua phá lưới mọi thời đại của các Vòng chung kết Euro (14 bàn)",
    ],
  },
];

export const cr7BioMilestonesEn: BioMilestone[] = [
  {
    year: "1985 - 2003",
    era: "Madeira & Sporting",
    title: "The Island Boy with an Iron Will",
    subtitle: "From an impoverished Funchal childhood to Sporting Lisbon's prestigious academy",
    description:
      "Born into a working-class family in Santo António, Funchal, Madeira. Honing his skills on steep cobblestone slopes with a worn-out ball, 12-year-old Cristiano moved alone to Lisbon. Overcoming intense loneliness and a racing heart condition at age 15, Ronaldo forged an unbreakable discipline and relentless work ethic.",
    quote: "Talent without hard work is nothing.",
    badge: "The Dream Begins",
    imageUrl: "/images/cr7/era-madeira.webp",
    imageCaption: "Teenager Cristiano Ronaldo creating shockwaves across Portuguese football (2003-2004)",
    stats: {
      goals: 5,
      matches: 31,
      trophies: 1,
    },
    highlights: [
      "1997: Joined Sporting CP youth academy for a development fee of €1,500",
      "2002: Only player in Sporting history to feature for U16, U17, U18, B team, and First Team in a single season",
      "07/10/2002: Scored his first official senior brace against Moreirense",
      "06/08/2003: Dazzling display at the inauguration of Estádio José Alvalade convinced Sir Alex Ferguson to sign him immediately",
    ],
  },
  {
    year: "2003 - 2009",
    era: "Manchester United (1st Spell)",
    title: "The Iconic No. 7 & The First Ballon d'Or",
    subtitle: "Forged and perfected under the visionary guidance of Sir Alex Ferguson",
    description:
      "Inheriting the sacred No. 7 shirt previously worn by Best, Cantona, and Beckham. Evolving from an exuberant trickster into an unstoppable goal machine. A monumental 42-goal campaign in 2007-08 propelled United to Premier League and Champions League glory, sealing his first Ballon d'Or at age 23.",
    quote: "Sir Alex was my second father in football. He taught me the true meaning of winning.",
    badge: "Global Ascendance",
    imageUrl: "/images/cr7/era-manutd-1.webp",
    imageCaption: "Cristiano Ronaldo taking the world by storm in Manchester United red in 2008",
    stats: {
      goals: 118,
      matches: 292,
      trophies: 9,
    },
    highlights: [
      "2004: Won first FA Cup silverware with Manchester United",
      "2006-2009: Three consecutive Premier League titles",
      "2008: UEFA Champions League triumph in Moscow (opened scoring with a towering header in the final)",
      "2008: Ballon d'Or & FIFA World Player of the Year",
      "2009: Inaugural FIFA Puskás Award winner for his 40-meter thunderbolt against FC Porto",
    ],
  },
  {
    year: "2009 - 2018",
    era: "Real Madrid",
    title: "The Immortal Dynasty & Historic Champions League Three-Peat",
    subtitle: "450 goals in 438 matches – 4 Ballon d'Ors – 4 Champions Leagues",
    description:
      "Unveiled before 80,000 roaring Madridistas at the Santiago Bernabéu following a world-record €94m transfer. Nine years in the Spanish capital cemented the greatest individual prime in football history. A superhuman ratio of 1.03 goals per match demolished club records held by Raúl and Di Stéfano, bringing 'La Décima' and an unprecedented 3-peat Champions League dynasty (2016, 2017, 2018).",
    quote: "I don't chase records. Records chase me.",
    badge: "Immortal Legend",
    imageUrl: "/images/cr7/era-realmadrid.jpg",
    imageCaption: "Ronaldo and Real Madrid making history with 3 consecutive Champions League titles (Kyiv 2018)",
    stats: {
      goals: 450,
      matches: 438,
      trophies: 16,
    },
    highlights: [
      "4 Champions League titles (2014, 2016, 2017, 2018) highlighted by the historic 3-year three-peat dynasty",
      "4 Ballon d'Or honors in Real Madrid white (2013, 2014, 2016, 2017)",
      "Real Madrid's all-time record goalscorer: 450 goals in 438 appearances (1.03 goals/game)",
      "All-time record 17 goals in a single UEFA Champions League season (2013-14)",
      "Gravity-defying 2.38m overhead bicycle kick against Juventus in Turin",
    ],
  },
  {
    year: "2018 - 2021",
    era: "Juventus",
    title: "Conquering Serie A & The Fast-Track Century",
    subtitle: "Elite pedigree overcoming Italy's fiercest tactical defenses",
    description:
      "Moving to Italy at age 33 for €100m, Ronaldo demonstrated unmatched adaptability in the world's most defensive league. He became the fastest player in Juventus history to reach 100 goals (in just 131 matches), claimed two Scudettos, and delivered a physics-defying 2.56m leap with 0.92-second hang-time against Sampdoria that captivated the globe.",
    quote: "I needed a new challenge to push my boundaries even further.",
    badge: "Italian Conquest",
    imageUrl: "/images/cr7/era-juventus.webp",
    imageCaption: "Ronaldo in the iconic black and white bianconeri stripes of Juventus",
    stats: {
      goals: 101,
      matches: 134,
      trophies: 5,
    },
    highlights: [
      "2 Serie A Scudettos (2018-19, 2019-20)",
      "Serie A Top Scorer (Capocannoniere) in 2020-21",
      "Stunning 2.56m leap with 0.92-second hang-time header vs Sampdoria",
      "Iconic second-leg comeback hat-trick against Atlético Madrid in the Champions League Round of 16",
      "First player in history to win every domestic trophy in England, Spain, and Italy",
    ],
  },
  {
    year: "2021 - 2022",
    era: "Manchester United (2nd Spell)",
    title: "Homecoming to Old Trafford & The Electric Return",
    subtitle: "Viva Ronaldo echoing through the Theatre of Dreams",
    description:
      "On September 11, 2021, Cristiano strode out onto the Old Trafford turf to a thunderous standing ovation from 74,000 spectators, announcing his return with an explosive brace against Newcastle. Despite a turbulent season, 37-year-old Ronaldo finished as United's top scorer with 24 goals across all competitions and officially crossed 800 career goals.",
    quote: "I'm back where I belong. My love for Manchester United will never fade.",
    badge: "Theatre Memories",
    imageUrl: "/images/cr7/era-manutd-2.webp",
    imageCaption: "Ronaldo celebrating alongside Bruno Fernandes in a 4-1 triumph over Newcastle (11/09/2021)",
    stats: {
      goals: 27,
      matches: 54,
      trophies: 0,
    },
    highlights: [
      "Scored a brace on his second Old Trafford debut against Newcastle United",
      "Surpassed 800 career goals with a decisive double against Arsenal (3-2)",
      "Premier League hat-tricks against Tottenham Hotspur and Norwich City",
      "Named Manchester United Sir Matt Busby Player of the Year",
    ],
  },
  {
    year: "2023 - Present",
    era: "Al Nassr",
    title: "Pioneering the East & The Quest for 1,000 Goals",
    subtitle: "Redrawing the global football map in his forties",
    description:
      "His decision to join the Saudi Pro League electrified world football and sparked an unprecedented influx of international superstars to the Middle East. Ronaldo continued scoring with ease, clinching back-to-back Golden Boots and smashing the single-season Saudi Pro League scoring record with 35 goals. The ultimate prize: The historic 1,000 official career goals summit!",
    quote: "I want to reach 1,000 goals. If I avoid injury, that remains my ultimate destination.",
    badge: "Road to 1,000",
    imageUrl: "/images/cr7/era-alnassr.jpg",
    imageCaption: "Cristiano Ronaldo shining in Al Nassr gold",
    stats: {
      goals: 138,
      matches: 160,
      trophies: 2,
    },
    highlights: [
      "Saudi Pro League Champion 2025–2026 with Al Nassr",
      "Arab Club Champions Cup 2023 champion (scored twice in the final with 10 men)",
      "All-time record 35 goals in a single Saudi Pro League season",
      "World Top Goalscorer of the calendar year 2023 with 54 goals at age 38",
      "Only 15 goals away from becoming the first official 1,000-goal scorer in football history",
    ],
  },
  {
    year: "2003 - Present",
    era: "Portugal National Team",
    title: "Seleção das Quinas & The Eternal Captain",
    subtitle: "From heartbreak at Euro 2004 to three continental championships",
    description:
      "Over two decades of selfless dedication to Portugal's badge. From the tears of a 19-year-old in the Euro 2004 final in Lisbon, Ronaldo transformed sorrow into an unrelenting competitive fire. Captaining his country with exemplary passion, he led Portugal to historic glory at Euro 2016 in Paris and two UEFA Nations League titles (2019 & 2025), reigning as the greatest international marksman in history with 146 goals.",
    quote: "Representing Portugal is the greatest pride and honor of my life.",
    badge: "National Monument",
    imageUrl: "/images/cr7/era-portugal.webp",
    imageCaption: "The legendary captain lifting Portugal to European glory (Euro 2016)",
    stats: {
      goals: 146,
      matches: 232,
      trophies: 3,
    },
    highlights: [
      "3 major international trophies: Euro 2016, UEFA Nations League 2018–19, and UEFA Nations League 2024–25",
      "All-time top goalscorer in international football history: 146 goals",
      "Most international caps in football history (232+ matches)",
      "Only male player in history to score in 5 consecutive FIFA World Cups",
      "All-time top goalscorer in UEFA European Championship history (14 goals)",
    ],
  },
];

export const getCr7BioMilestones = (lang: "vi" | "en"): BioMilestone[] => {
  return lang === "en" ? cr7BioMilestonesEn : cr7BioMilestonesVi;
};

// Default export for backwards compatibility
export const cr7BioMilestones = cr7BioMilestonesVi;
