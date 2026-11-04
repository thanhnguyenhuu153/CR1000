export interface FreeKickGoal {
  id: string;
  opponent: string;
  team: string;
  competition: string;
  date: string;
  distanceMeters: number;
  speedKmh?: number;
  matchScore: string;
  descriptionVi: string;
  descriptionEn: string;
  technique: "knuckleball" | "curl" | "power-drive";
  isIconic: boolean;
  videoUrl?: string;
  imageUrl?: string;
}

export const cr7FreeKickSummary = {
  totalFreeKickGoals: 64,
  byTeam: {
    realMadrid: 32,
    manchesterUnited: 14,
    portugal: 11,
    alNassr: 4,
    juventus: 1,
    other: 2,
  },
  longestDistanceMeters: 40, // vs Arsenal 2009 & Porto 2009
  fastestSpeedKmh: 105,
  knuckleballCount: 45,
};

export const cr7IconicFreeKicks: FreeKickGoal[] = [
  {
    id: "fk-portsmouth-2008",
    opponent: "Portsmouth",
    team: "Manchester United",
    competition: "Premier League",
    date: "30/01/2008",
    distanceMeters: 28,
    speedKmh: 102,
    matchScore: "2 - 0",
    descriptionVi:
      "Cú sút phạt knuckleball hoàn hảo nhất lịch sử Premier League. Bóng bay qua hàng rào găm thẳng vào góc chữ A khiến thủ thành David James chỉ biết đứng chôn chân.",
    descriptionEn:
      "The definitive knuckleball in Premier League history. Rocketing over the wall and into the top right stanchion, leaving David James completely motionless.",
    technique: "knuckleball",
    isIconic: true,
    imageUrl: "/images/cr7/iconic-freekick-portsmouth.jpeg",
  },
  {
    id: "fk-spain-2018",
    opponent: "Tây Ban Nha (Spain)",
    team: "Bồ Đào Nha (Portugal)",
    competition: "FIFA World Cup 2018",
    date: "15/06/2018",
    distanceMeters: 25,
    speedKmh: 98,
    matchScore: "3 - 3",
    descriptionVi:
      "Phút 88 định mệnh tại Sochi, CR7 vẽ nên đường cong tuyệt mỹ vượt qua hàng rào De Gea, hoàn tất cú hat-trick lịch sử giật lại 1 điểm quý giá cho Bồ Đào Nha.",
    descriptionEn:
      "An 88th-minute World Cup masterstroke in Sochi. Curled majestically past David de Gea to seal a historic hat-trick and rescue a 3-3 draw.",
    technique: "curl",
    isIconic: true,
    imageUrl: "/images/cr7/iconic-freekick-spain.webp",
  },
  {
    id: "fk-arsenal-2009",
    opponent: "Arsenal",
    team: "Manchester United",
    competition: "UEFA Champions League Bán kết",
    date: "05/05/2009",
    distanceMeters: 38,
    speedKmh: 105,
    matchScore: "3 - 1",
    descriptionVi:
      "Từ cự ly gần 40 mét chếch bên cánh phải tại Emirates, Ronaldo tung cú nã đại bác knuckleball xé toạc mành lưới Manuel Almunia đưa MU vào chung kết C1.",
    descriptionEn:
      "From nearly 40 yards out at Emirates Stadium, Ronaldo unleashed a trademark knuckleball thunderbolt that beat Manuel Almunia at his near post.",
    technique: "knuckleball",
    isIconic: true,
  },
  {
    id: "fk-wolfsburg-2016",
    opponent: "VfL Wolfsburg",
    team: "Real Madrid",
    competition: "UEFA Champions League Tứ kết",
    date: "12/04/2016",
    distanceMeters: 26,
    speedKmh: 92,
    matchScore: "3 - 0",
    descriptionVi:
      "Phút 77 tại Bernabeu, bóng lách qua khe hẹp hàng rào Wolfsburg găm thẳng góc dưới, hoàn tất cú hat-trick kinh điển lội ngược dòng thần thánh vào bán kết.",
    descriptionEn:
      "In the 77th minute at Bernabeu, Ronaldo guided a clever free-kick through the Wolfsburg wall to complete an iconic comeback hat-trick.",
    technique: "power-drive",
    isIconic: true,
  },
  {
    id: "fk-atletico-2012",
    opponent: "Atlético Madrid",
    team: "Real Madrid",
    competition: "La Liga",
    date: "11/04/2012",
    distanceMeters: 32,
    speedKmh: 100,
    matchScore: "4 - 1",
    descriptionVi:
      "Cú sút mu bàn chân với quỹ đạo bóng lắc lư dị thường khiến thủ thành trẻ Thibaut Courtois hoàn toàn bị đánh lừa trong trận derby Madrid nảy lửa.",
    descriptionEn:
      "A dipping 35-yard knuckleball that fooled a young Thibaut Courtois with its unpredictable lateral swerve during the Madrid derby.",
    technique: "knuckleball",
    isIconic: true,
  },
  {
    id: "fk-abha-2023",
    opponent: "Abha Club",
    team: "Al Nassr",
    competition: "Saudi Pro League",
    date: "18/03/2023",
    distanceMeters: 35,
    speedKmh: 102,
    matchScore: "2 - 1",
    descriptionVi:
      "Cú nã đại bác từ cự ly 35 mét làm rung chuyển cầu trường Al Awwal Park, bàn thắng sút phạt đầu tiên của CR7 tại Saudi Arabia thắp sáng chiến thắng ngược dòng.",
    descriptionEn:
      "A 35-meter rocket at Al Awwal Park, marking Ronaldo's first free-kick goal in Saudi Arabia and igniting a dramatic comeback win.",
    technique: "knuckleball",
    isIconic: true,
  },
  {
    id: "fk-marseille-2009",
    opponent: "Olympique de Marseille",
    team: "Real Madrid",
    competition: "UEFA Champions League",
    date: "08/12/2009",
    distanceMeters: 33,
    speedKmh: 103,
    matchScore: "3 - 1",
    descriptionVi:
      "Pha sút phạt từ cự ly 33 mét tại Stade Vélodrome. Bóng bay với quỹ đạo lượn từ phải sang trái rồi cắm thẳng nóc lưới thủ môn Steve Mandanda.",
    descriptionEn:
      "From 33 meters out at the Stade Vélodrome, curling powerfully away from Steve Mandanda into the top corner.",
    technique: "knuckleball",
    isIconic: true,
  },
  {
    id: "fk-torino-2020",
    opponent: "Torino",
    team: "Juventus",
    competition: "Serie A (Derby della Mole)",
    date: "04/07/2020",
    distanceMeters: 27,
    speedKmh: 89,
    matchScore: "4 - 1",
    descriptionVi:
      "Đường cong hoàn mỹ qua đầu hàng rào Torino, bàn thắng sút phạt chính thức đầu tiên của Ronaldo trong màu áo sọc trắng đen Juventus.",
    descriptionEn:
      "A sublime curling effort over the wall in the Derby della Mole, sealing his first free-kick goal for Juventus.",
    technique: "curl",
    isIconic: true,
  },
];

export const cr7FreeKickFaqVi = [
  {
    question: "Cristiano Ronaldo đã ghi bao nhiêu bàn thắng từ sút phạt trực tiếp trong sự nghiệp?",
    answer:
      "Tính đến thời điểm hiện tại, Cristiano Ronaldo đã ghi được 64 bàn thắng từ các tình huống đá phạt trực tiếp (Direct Free-kick) trong sự nghiệp thi đấu đỉnh cao cấp CLB và ĐTQG.",
  },
  {
    question: "Bàn thắng sút phạt nào nổi tiếng nhất của Cristiano Ronaldo?",
    answer:
      "Bàn thắng nổi tiếng nhất là siêu phẩm sút phạt vào lưới Portsmouth ngày 30/01/2008 tại Old Trafford. Cú sút đạt vận tốc trên 100 km/h với quỹ đạo bóng không xoáy (knuckleball) dị thường, được xem là một trong những quả đá phạt đẹp nhất lịch sử Premier League.",
  },
  {
    question: "Kỹ thuật sút phạt Knuckleball của CR7 hoạt động như thế nào?",
    answer:
      "Ronaldo tiếp xúc bóng bằng phần xương mu bàn chân cứng nhất, chạm ngay vào vị trí van bóng (valve) với lực tác động cực mạnh và hạn chế tối đa độ xoáy (spin). Khi quả bóng bay đi với tốc độ cao mà không xoáy, luồng không khí hỗn loạn xung quanh khiến quỹ đạo bóng đổi hướng đột ngột và chao đảo bất thường trong không trung trước khi cắm thẳng xuống đất.",
  },
  {
    question: "Ronaldo ghi nhiều bàn sút phạt nhất cho câu lạc bộ nào?",
    answer:
      "Real Madrid là CLB mà Cristiano Ronaldo ghi nhiều bàn thắng sút phạt nhất với 32 bàn thắng, tiếp theo là Manchester United (14 bàn), ĐTQG Bồ Đào Nha (11 bàn), Al Nassr (4 bàn) và Juventus (1 bàn).",
  },
  {
    question: "Cự ly sút phạt xa nhất của Cristiano Ronaldo từng ghi bàn là bao nhiêu mét?",
    answer:
      "Cự ly xa nhất là xấp xỉ 38–40 mét trong trận bán kết Champions League 2009 gặp Arsenal ngay tại sân Emirates, khi cú nã đại bác của Ronaldo hạ gục thủ thành Almunia từ khoảng cách không tưởng.",
  },
];

export const cr7FreeKickFaqEn = [
  {
    question: "How many free-kick goals has Cristiano Ronaldo scored in his career?",
    answer:
      "To date, Cristiano Ronaldo has scored 64 direct free-kick goals throughout his illustrious career for clubs and the Portugal national team.",
  },
  {
    question: "What is Cristiano Ronaldo's most famous free-kick goal?",
    answer:
      "His most iconic free-kick is the legendary knuckleball against Portsmouth on January 30, 2008, at Old Trafford. Flying at over 100 km/h into the top corner, it is widely regarded as the greatest free-kick in Premier League history.",
  },
  {
    question: "How does Cristiano Ronaldo's Knuckleball technique work?",
    answer:
      "Ronaldo strikes the ball with his instep directly on the air valve, imparting tremendous force with near-zero rotation. Because the ball does not spin, erratic aerodynamic turbulence forces the ball to wobble unpredictably in mid-air before dipping sharply.",
  },
  {
    question: "Which team has Ronaldo scored the most free-kicks for?",
    answer:
      "Real Madrid is the club where Ronaldo scored the most free-kicks with 32 goals, followed by Manchester United (14 goals), the Portugal national team (11 goals), Al Nassr (4 goals), and Juventus (1 goal).",
  },
  {
    question: "What is the longest distance Ronaldo has scored a free-kick from?",
    answer:
      "His longest recorded free-kick distance is approximately 38–40 meters against Arsenal in the 2009 UEFA Champions League Semi-Final at Emirates Stadium.",
  },
];
