export interface BioMilestone {
  year: string;
  era: string;
  title: string;
  subtitle: string;
  description: string;
  quote?: string;
  badge: string;
  stats: {
    goals: number;
    matches: number;
    trophies: number;
  };
  highlights: string[];
}

export const cr7BioMilestones: BioMilestone[] = [
  {
    year: "1985 - 2002",
    era: "Khởi Nguyên Madeira",
    title: "Cậu bé đảo ngọc mang ý chí thép",
    subtitle: "Từ Funchal nghèo khó tới lò đào tạo danh giá Sporting Lisbon",
    description:
      "Sinh ra trong một gia đình lao động nghèo ở Santo António, Funchal, Madeira. Từ những con dốc gập ghềnh với quả bóng cao su rách, cậu bé Cristiano rời quê hương năm 12 tuổi sang thủ đô Lisbon một mình. Vượt qua nỗi cô đơn và chứng tim đập nhanh năm 15 tuổi, Ronaldo trui rèn kỷ luật và ý chí sắt đá không gì khuất phục.",
    quote: "Tài năng không đi cùng sự chăm chỉ thì chẳng có ý nghĩa gì cả.",
    badge: "Bắt đầu giấc mơ",
    stats: {
      goals: 5,
      matches: 31,
      trophies: 1,
    },
    highlights: [
      "1997: Gia nhập học viện Sporting CP với mức phí 1.500 Euro",
      "2002: Trở thành cầu thủ duy nhất lịch sử Sporting chơi cho đội U16, U17, U18, B và Đội 1 trong 1 mùa giải",
      "07/10/2002: Cú đúp bàn thắng chính thức đầu tiên sự nghiệp vào lưới Moreirense",
      "06/08/2003: Màn trình diễn 'ma thuật' trận giao hữu khánh thành sân Alvalade khiến Sir Alex Ferguson quyết định ký hợp đồng ngay trên máy bay về Anh",
    ],
  },
  {
    year: "2003 - 2009",
    era: "Manchester United (Kỷ nguyên 1)",
    title: "Chiếc áo số 7 huyền thoại & Đỉnh cao Quả bóng Vàng",
    subtitle: "Dưới bàn tay nhào nặn của Sir Alex Ferguson",
    description:
      "Kế thừa chiếc áo số 7 linh thiêng của George Best, Eric Cantona và David Beckham. Từ một 'chú ngựa non háu đá' với những pha đảo chân rườm rà, Ronaldo lột xác thành cỗ máy săn bàn hủy diệt. Mùa giải 2007-2008 bùng nổ với 42 bàn thắng, đưa Quỷ Đỏ lên đỉnh Premier League và Champions League, đoạt Quả bóng Vàng đầu tiên ở tuổi 23.",
    quote: "Sir Alex là người cha thứ hai của tôi trong bóng đá. Ông ấy dạy tôi cách chiến thắng.",
    badge: "Vươn tầm thế giới",
    stats: {
      goals: 118,
      matches: 292,
      trophies: 9,
    },
    highlights: [
      "2004: Đoạt danh hiệu FA Cup đầu tiên với MU",
      "2006-2009: 3 chức vô địch Ngoại hạng Anh liên tiếp",
      "2008: Vô địch UEFA Champions League tại Moscow (ghi bàn trong trận chung kết)",
      "2008: Quả bóng Vàng (Ballon d'Or) & Cầu thủ xuất sắc nhất thế giới FIFA",
      "2009: Cú nã đại bác 40m vào lưới FC Porto đoạt giải Puskás đầu tiên trong lịch sử",
    ],
  },
  {
    year: "2009 - 2018",
    era: "Real Madrid",
    title: "Bản trường ca vĩ đại tại Nhà Trắng Bernabéu",
    subtitle: "450 bàn sau 438 trận – 4 Quả bóng Vàng – 4 Champions League",
    description:
      "Gia nhập Real Madrid với bản hợp đồng kỷ lục thế giới 94 triệu Euro trước sự chứng kiến của 80.000 khán giả chật kín sân Bernabéu. 9 năm tại thủ đô Tây Ban Nha là thời kỳ đỉnh cao chói lọi nhất lịch sử bóng đá hiện đại. Hiệu suất phi lý 1.03 bàn/trận, xô đổ kỷ lục của Raul Gonzalez và Alfredo Di Stéfano, mang về 'La Décima' và cú hat-trick Champions League vô tiền khoáng hậu (2016, 2017, 2018).",
    quote: "Tôi không tìm kiếm kỷ lục. Kỷ lục tự tìm đến tôi.",
    badge: "Huyền thoại bất tử",
    stats: {
      goals: 450,
      matches: 438,
      trophies: 16,
    },
    highlights: [
      "4 danh hiệu Champions League (2014, 2016, 2017, 2018)",
      "4 Quả bóng Vàng trong màu áo Real Madrid (2013, 2014, 2016, 2017)",
      "Chân sút số 1 mọi thời đại của Real Madrid: 450 bàn sau 438 trận",
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
      "Chuyển đến nước Ý ở tuổi 33 với mức phí 100 triệu Euro, Ronaldo tiếp tục chứng minh sự thích nghi vô song tại giải đấu phòng ngự khét tiếng nhất thế giới. Anh trở thành cầu thủ nhanh nhất lịch sử Juventus chạm mốc 100 bàn thắng (chỉ sau 131 trận), ẵm trọn 2 Scudetto và hoàn tất bộ sưu tập danh hiệu quốc nội trọn vẹn ở cả 3 giải đấu hàng đầu: Anh, Tây Ban Nha và Ý.",
    quote: "Tôi cần một thử thách mới để đẩy giới hạn bản thân đi xa hơn.",
    badge: "Chinh phục nước Ý",
    stats: {
      goals: 101,
      matches: 134,
      trophies: 5,
    },
    highlights: [
      "2 chức vô địch Serie A (2018-19, 2019-20)",
      "Vua phá lưới Serie A (Capocannoniere) mùa giải 2020-21",
      "Cú hat-trick ngược dòng lịch sử trước Atletico Madrid tại vòng 1/8 Cúp C1",
      "Cầu thủ đầu tiên trong lịch sử giành trọn bộ danh hiệu quốc nội tại Premier League, La Liga và Serie A",
    ],
  },
  {
    year: "2021 - 2022",
    era: "Manchester United (Kỷ nguyên 2)",
    title: "Ngày về Old Trafford & Mốc son 800 bàn",
    subtitle: "Khoảnh khắc 'Viva Ronaldo' vang dội 'Nhà hát của những giấc mơ'",
    description:
      "Ngày 11/9/2021, Cristiano bước ra mặt cỏ Old Trafford trong tiếng gầm vang của 74.000 khán giả, lập ngay cú đúp vào lưới Newcastle. Dù đội bóng trải qua giai đoạn biến động, Ronaldo ở tuổi 37 vẫn là chân sút số 1 của CLB với 24 bàn thắng trên mọi đấu trường và chính thức cán mốc 800 bàn thắng trong sự nghiệp.",
    quote: "Tôi trở về nơi mình thuộc về. Tình yêu với Manchester United không bao giờ phai nhạt.",
    badge: "Ký ức Nhà hát",
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
    era: "Al Nassr & Bồ Đào Nha",
    title: "Người khai phá phương Đông & Cuộc săn 1000 bàn",
    subtitle: "Viết lại bản đồ bóng đá toàn cầu ở tuổi tứ tuần",
    description:
      "Quyết định đến với Saudi Pro League không chỉ làm rung chuyển làng túc cầu mà còn mở đầu cho làn sóng hàng loạt siêu sao cập bến Ả Rập. Ronaldo tiếp tục ghi bàn như thở, liên tiếp đoạt Vua phá lưới giải đấu, phá kỷ lục ghi nhiều bàn nhất trong một mùa giải Saudi League (35 bàn) và dẫn dắt ĐTQG Bồ Đào Nha tại Euro 2024. Mục tiêu tối thượng lúc này: Chạm mốc 1.000 bàn thắng chính thức!",
    quote: "Tôi muốn chạm mốc 1000 bàn thắng. Nếu không có chấn thương, đó là mục tiêu duy nhất của tôi.",
    badge: "Hành trình đến 1000",
    stats: {
      goals: 138,
      matches: 148,
      trophies: 1,
    },
    highlights: [
      "Vô địch Arab Club Champions Cup 2023 (ghi cú đúp trong trận chung kết)",
      "Phá kỷ lục ghi nhiều bàn nhất 1 mùa Saudi Pro League (35 bàn)",
      "Chân sút số 1 thế giới trong năm dương lịch 2023 (54 bàn thắng)",
      "Cán mốc 900 bàn thắng chính thức trong trận Bồ Đào Nha vs Croatia",
      "Chỉ còn 15 bàn nữa để trở thành cầu thủ đầu tiên lịch sử chạm 1.000 bàn chính thức",
    ],
  },
];
