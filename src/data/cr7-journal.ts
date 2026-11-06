export interface JournalArticle {
  id: string;
  slug: string;
  titleVi: string;
  titleEn: string;
  excerptVi: string;
  excerptEn: string;
  categoryVi: string;
  categoryEn: string;
  categorySlug: "breaking" | "data" | "legacy";
  publishedDate: string; // ISO date YYYY-MM-DD
  readTimeVi: string;
  readTimeEn: string;
  author: string;
  coverImage: string;
  isFeatured?: boolean;
  tags: string[];
  
  // AIO (AI Overview) & Featured Snippet optimized fields
  quickTakeawayVi: string;
  quickTakeawayEn: string;
  keyStats: {
    labelVi: string;
    labelEn: string;
    value: string;
    highlight?: boolean;
  }[];
  
  // Rich Structured Content
  sectionsVi: {
    heading?: string;
    content: string[]; // paragraphs
    quote?: {
      text: string;
      author: string;
    };
    table?: {
      headers: string[];
      rows: string[][];
    };
  }[];
  sectionsEn: {
    heading?: string;
    content: string[];
    quote?: {
      text: string;
      author: string;
    };
    table?: {
      headers: string[];
      rows: string[][];
    };
  }[];
  
  // FAQs for Schema.org FAQPage & AI Answer engines
  faqsVi: {
    question: string;
    answer: string;
  }[];
  faqsEn: {
    question: string;
    answer: string;
  }[];
}

export const cr7JournalArticles: JournalArticle[] = [
  {
    id: "cr7-retires-portugal-2026",
    slug: "cr7-retires-from-portugal-national-team-road-to-1000",
    titleVi: "Cristiano Ronaldo chính thức giã từ ĐTQG Bồ Đào Nha: Khép lại 23 năm huyền thoại và dồn toàn lực cho mốc 1.000 bàn",
    titleEn: "Cristiano Ronaldo Officially Retires from Portugal: The End of an Unrivaled 23-Year Era and the Final Sprint to 1,000 Goals",
    excerptVi: "Ở tuổi 41, Cristiano Ronaldo chính thức tuyên bố chia tay màu áo Bồ Đào Nha sau 23 năm cống hiến, dừng lại với 146 bàn thắng và 234 lần ra sân. Quyết định lịch sử này sẽ tác động thế nào tới cuộc đua 1.000 bàn thắng?",
    excerptEn: "At age 41, Cristiano Ronaldo has officially announced his retirement from the Portugal national team after a 23-year career, concluding with 146 goals in 234 appearances. How will this landmark decision shape his pursuit of 1,000 career goals?",
    categoryVi: "Tin Nóng & Bước Ngoặt",
    categoryEn: "Breaking & Milestones",
    categorySlug: "breaking",
    publishedDate: "2026-11-05",
    readTimeVi: "6 phút đọc",
    readTimeEn: "6 min read",
    author: "CR1000 Sports Analytics",
    coverImage: "/images/cr7/era-portugal.jpg",
    isFeatured: true,
    tags: ["Ronaldo", "Portugal", "Retirement", "1000 Goals", "Euro 2016", "Al Nassr"],
    
    quickTakeawayVi: "Ngày 5/11/2026, Cristiano Ronaldo chính thức đăng tải thông điệp chia tay chiếc áo số 7 ĐTQG Bồ Đào Nha ở tuổi 41. Anh dừng lại với kỷ lục thế giới bóng đá nam: 146 bàn thắng sau 234 lần khoác áo, giành chức vô địch Euro 2016 và 2 danh hiệu UEFA Nations League (2019, 2025). Quyết định này giúp CR7 giải phóng hoàn toàn gánh nặng thi đấu quốc tế để dồn 100% thể lực săn 15 bàn thắng còn lại cùng Al Nassr nhằm cán mốc 1.000 bàn thắng lịch sử.",
    quickTakeawayEn: "On November 5, 2026, Cristiano Ronaldo officially announced his retirement from the Portugal national team at age 41. He departs with all-time men's international records of 146 goals in 234 caps, alongside the Euro 2016 trophy and two UEFA Nations League titles (2019, 2025). Stepping away from international duty allows CR7 to conserve peak physical fitness and focus entirely on scoring the remaining 15 goals with Al Nassr to achieve the historic 1,000-goal benchmark.",
    
    keyStats: [
      { labelVi: "Bàn thắng ĐTQG (Kỷ lục thế giới)", labelEn: "International Goals (World Record)", value: "146", highlight: true },
      { labelVi: "Số trận khoác áo tuyển", labelEn: "Total International Caps", value: "234" },
      { labelVi: "Danh hiệu cùng Bồ Đào Nha", labelEn: "Major International Trophies", value: "3 (Euro 2016, NL 2019, NL 2025)" },
      { labelVi: "Số bàn cần để chạm mốc 1000", labelEn: "Goals to 1,000 Milestone", value: "15", highlight: true },
    ],

    sectionsVi: [
      {
        heading: "Lời từ biệt xúc động và chiếc áo số 7 được trao lại",
        content: [
          "Tối ngày 5/11/2026, thế giới bóng đá chứng kiến khoảnh khắc lịch sử khi Cristiano Ronaldo đăng tải đoạn video tri ân kéo dài gần 4 phút trên các nền tảng mạng xã hội cá nhân. Không ồn ào trong một buổi họp báo căng thẳng, siêu sao 41 tuổi chọn cách chia sẻ mộc mạc nhưng chan chứa cảm xúc: 'Đã đến lúc tôi trao lại chiếc áo số 7 cho thế hệ kế tiếp. 23 năm qua, mỗi lần khoác lên mình màu áo bã trầu là mỗi lần tôi chiến đấu bằng cả linh hồn và thể xác cho quê hương'.",
          "Thông điệp này chính thức chấm dứt một trong những kỷ nguyên quốc tế bền bỉ và vĩ đại nhất lịch sử thể thao. Kể từ màn ra mắt vào tháng 8 năm 2003 trước Kazakhstan dưới thời HLV Luiz Felipe Scolari, Ronaldo đã biến một Bồ Đào Nha vốn chỉ là 'kẻ ngoài rìa' các danh hiệu lớn trở thành thế lực hàng đầu lục địa già với chức vô địch Euro 2016 lịch sử và 2 danh hiệu UEFA Nations League (2019, 2025)."
        ],
        quote: {
          text: "Đã đến lúc tôi trao lại chiếc áo số 7 cho thế hệ kế tiếp. 23 năm qua, mỗi lần khoác áo Bồ Đào Nha là mỗi lần tôi chiến đấu bằng cả linh hồn cho quê hương.",
          author: "Cristiano Ronaldo (5/11/2026)"
        }
      },
      {
        heading: "Di sản 146 bàn thắng: Tượng đài vô tiền khoáng hậu",
        content: [
          "Khi Ronaldo vượt qua cột mốc 108 bàn của huyền thoại Iran Ali Daei vào tháng 9/2021, nhiều người nghĩ rằng anh sẽ dừng lại ở ngưỡng 120 bàn. Nhưng sự bền bỉ đáng kinh ngạc đã đưa con số ấy leo thẳng lên 146 bàn thắng trong 234 trận đấu chính thức.",
          "Đáng chú ý, Ronaldo là cầu thủ duy nhất trong lịch sử nhân loại nổ súng ở 6 kỳ World Cup liên tiếp (từ 2006 đến 2026) và 6 kỳ Euro liên tiếp. Ở tuổi ngoài 30 — độ tuổi mà phần lớn tiền đạo đã giải nghệ hoặc lùi sâu về tuyến giữa — Ronaldo ghi tới 91 bàn thắng cho ĐTQG, nhiều hơn tổng số bàn thắng cả sự nghiệp quốc tế của hầu hết các chân sút huyền thoại châu Âu."
        ],
        table: {
          headers: ["Giải đấu / Cột mốc", "Số trận", "Số bàn", "Thành tích tốt nhất"],
          rows: [
            ["FIFA World Cup", "26", "9", "Hạng 4 (2006) / Tứ kết"],
            ["UEFA European Championship (Euro)", "30", "14", "Vô địch (Euro 2016)"],
            ["UEFA Nations League", "16", "11", "Vô địch (2019, 2025)"],
            ["Vòng loại World Cup / Euro", "83", "77", "Vua phá lưới mọi thời đại"],
            ["Giao hữu quốc tế chính thức", "79", "35", "—"]
          ]
        }
      },
      {
        heading: "Bước đi chiến lược: Dồn 100% sinh lực cho 15 bàn thắng cuối cùng",
        content: [
          "Nhiều chuyên gia thể lực tại châu Âu nhận định: Việc dừng lại ở ĐTQG vào thời điểm này không phải là dấu hiệu của sự yếu đuối, mà là một tính toán chiến lược bậc thầy của Ronaldo và đội ngũ huấn luyện.",
          "Ở tuổi 41, các chuyến bay xuyên lục địa giữa Riyadh và châu Âu trong các đợt tập trung FIFA Days luôn lấy đi 3-4 ngày hồi phục thể lực quý giá. Không còn nghĩa vụ quốc tế, Ronaldo sẽ có các quãng nghỉ trọn vẹn từ 10 đến 14 ngày giữa các chặng thi đấu của CLB. Cơ bắp, khớp gối và hệ hô hấp của anh sẽ được đưa về trạng thái tối ưu nhất.",
          "Với 985 bàn thắng hiện tại, mục tiêu 1.000 bàn chỉ còn cách đúng 15 pha lập công. Mọi nỗ lực, mọi đường chuyền từ các đồng đội tại Al Nassr và mọi cú sút phạt giờ đây sẽ tập trung trọn vẹn vào giải VĐQG Saudi Arabia và Cúp C1 Châu Á. Mốc 1.000 bàn thắng không còn là một giấc mơ xa vời, mà là một kế hoạch tác chiến có lộ trình rõ ràng từng tuần."
        ]
      }
    ],

    sectionsEn: [
      {
        heading: "An Emotional Farewell and Passing the Number 7 Jersey",
        content: [
          "On the evening of November 5, 2026, the footballing world paused as Cristiano Ronaldo shared a deeply personal video message across his social media channels. Free of corporate platitudes, the 41-year-old superstar addressed millions of supporters: 'The time has come to hand back the number 7 shirt to the next generation. For 23 years, every time I pulled on the Seleção jersey, I fought with my entire soul for Portugal.'",
          "This momentous announcement brings an end to the longest and most prolific international career in football history. From his senior debut in August 2003 against Kazakhstan under Luiz Felipe Scolari to lifting the Euro 2016 trophy in Paris and dual UEFA Nations League triumphs (2019, 2025), Ronaldo redefined the stature of Portuguese football on the global stage."
        ],
        quote: {
          text: "The time has come to hand back the number 7 shirt to the next generation. For 23 years, every time I pulled on the Seleção jersey, I fought with my entire soul for Portugal.",
          author: "Cristiano Ronaldo (November 5, 2026)"
        }
      },
      {
        heading: "The 146-Goal Legacy: An Untouchable World Record",
        content: [
          "When Ronaldo surpassed Ali Daei's long-standing tally of 108 international goals in September 2021, critics assumed his peak had arrived. Instead, his unmatched physical longevity powered him all the way to 146 goals across 234 official caps.",
          "Ronaldo remains the only male footballer in history to score across six distinct FIFA World Cups (2006 through 2026) and six European Championships. Astonishingly, over 90 of his 146 international goals arrived after his 30th birthday — eclipsing the lifetime international totals of most legendary European strikers."
        ],
        table: {
          headers: ["Competition / Stage", "Caps", "Goals", "Peak Achievement"],
          rows: [
            ["FIFA World Cup", "26", "9", "4th Place (2006) / Quarterfinals"],
            ["UEFA European Championship (Euro)", "30", "14", "Champions (Euro 2016)"],
            ["UEFA Nations League", "16", "11", "Champions (2019, 2025)"],
            ["World Cup & Euro Qualifiers", "83", "77", "All-Time Top Scorer"],
            ["International Friendlies", "79", "35", "—"]
          ]
        }
      },
      {
        heading: "A Masterstroke Calculation: 100% Focus on the Final 15 Goals",
        content: [
          "Prominent sports scientists across Europe note that retiring from international football at 41 is a deliberate tactical calibration rather than an admission of defeat.",
          "Intercontinental travel between Riyadh and European qualifiers during FIFA international windows demanded heavy metabolic recovery tolls. By stepping away from the national team, Ronaldo secures uninterrupted 10-to-14-day training cycles. His muscular, cardiovascular, and joint health will remain conditioned specifically for club fixtures.",
          "Currently standing at 985 official career goals, the historic 1,000-goal frontier requires precisely 15 more finishes. With Al Nassr's tactical setup tailored to his penalty box instincts across the Saudi Pro League and AFC Champions League, the sprint to 1,000 is now a focused, week-by-week master operation."
        ]
      }
    ],

    faqsVi: [
      {
        question: "Cristiano Ronaldo ghi được bao nhiêu bàn thắng cho ĐTQG Bồ Đào Nha?",
        answer: "Ronaldo kết thúc sự nghiệp quốc tế với 146 bàn thắng sau 234 lần khoác áo ĐTQG Bồ Đào Nha, giữ kỷ lục thế giới về số bàn thắng và số trận đấu quốc tế mọi thời đại của bóng đá nam."
      },
      {
        question: "Ronaldo đã giành được những danh hiệu nào cùng Bồ Đào Nha?",
        answer: "CR7 đã dẫn dắt Bồ Đào Nha vô địch UEFA Euro 2016 và 2 chức vô địch UEFA Nations League vào các năm 2019 và 2025."
      },
      {
        question: "Việc giã từ ĐTQG ảnh hưởng như thế nào đến mục tiêu 1.000 bàn thắng của CR7?",
        answer: "Việc dừng thi đấu quốc tế giúp Ronaldo không còn phải di chuyển đường dài và vắt kiệt thể lực ở các giải đấu mùa hè. Toàn bộ 15 bàn thắng còn lại để chạm mốc 1.000 bàn sẽ được ghi trong màu áo CLB Al Nassr."
      }
    ],
    faqsEn: [
      {
        question: "How many international goals did Cristiano Ronaldo score for Portugal?",
        answer: "Ronaldo concluded his international career with 146 goals in 234 caps for Portugal, securing the all-time world records for both most international goals and most appearances in men's football."
      },
      {
        question: "What major trophies did Ronaldo win with Portugal?",
        answer: "Ronaldo captained Portugal to glory at UEFA Euro 2016 and secured two UEFA Nations League titles in 2019 and 2025."
      },
      {
        question: "How does his international retirement impact the race to 1,000 career goals?",
        answer: "Retiring from national team duty eliminates exhaustive intercontinental travel. All remaining 15 goals required to reach 1,000 will be pursued with Al Nassr in the Saudi Pro League and AFC Champions League."
      }
    ]
  },

  {
    id: "when-where-1000th-goal",
    slug: "when-and-where-will-ronaldo-score-1000th-goal",
    titleVi: "Còn đúng 15 bàn: Cristiano Ronaldo sẽ cán mốc 1.000 bàn thắng vào thời điểm nào và ở đâu?",
    titleEn: "15 Goals Remaining: When and Where Will Cristiano Ronaldo Score His Historic 1,000th Goal?",
    excerptVi: "Mô hình phân tích dữ liệu hiệu suất 0.82 bàn/trận tại Al Nassr chỉ ra khung thời gian vàng để CR7 chạm tới bàn thắng thứ 1.000 trong lịch sử bóng đá nhân loại.",
    excerptEn: "Statistical modeling based on Ronaldo's 0.82 goals-per-game ratio at Al Nassr pinpoints the exact projected window for his historic 1,000th career goal.",
    categoryVi: "Phân Tích Số Liệu",
    categoryEn: "Data & Forecast",
    categorySlug: "data",
    publishedDate: "2026-11-06",
    readTimeVi: "5 phút đọc",
    readTimeEn: "5 min read",
    author: "CR1000 Predictive Model",
    coverImage: "/images/cr7/era-alnassr.jpg",
    tags: ["Data Analytics", "Al Nassr", "1000 Goals", "Saudi Pro League", "Prediction"],
    
    quickTakeawayVi: "Dựa trên hiệu suất săn bàn ổn định 0.82 bàn/trận tại Al Nassr, mô hình máy học dự báo Cristiano Ronaldo cần thêm từ 17 đến 20 trận đấu chính thức để ghi 15 bàn thắng còn lại. Khung thời gian khả dĩ nhất để xuất hiện bàn thắng thứ 1.000 là khoảng từ tháng 3 đến tháng 5 năm 2027, với 62% xác suất diễn ra ngay tại thánh địa Al-Awwal Park (Riyadh).",
    quickTakeawayEn: "Based on an established scoring rate of 0.82 goals per game for Al Nassr, statistical predictive models estimate Cristiano Ronaldo needs 17 to 20 official appearances to net his remaining 15 goals. The highest-probability window to witness the 1,000th goal falls between March and May 2027, with a 62% likelihood of occurring at Al-Awwal Park in Riyadh.",
    
    keyStats: [
      { labelVi: "Hiệu suất ghi bàn tại Al Nassr", labelEn: "Al Nassr Scoring Rate", value: "0.82 bàn/trận", highlight: true },
      { labelVi: "Số trận dự kiến cần thêm", labelEn: "Projected Matches Needed", value: "17 - 20 trận" },
      { labelVi: "Khung thời gian dự kiến", labelEn: "Projected Milestone Window", value: "Tháng 3 - Tháng 5/2027", highlight: true },
      { labelVi: "Tỷ lệ nổ súng tại sân nhà Al-Awwal Park", labelEn: "Home Ground Scoring Ratio", value: "62%" },
    ],

    sectionsVi: [
      {
        heading: "Hiệu suất săn bàn thực tế: Những con số không biết nói dối",
        content: [
          "Để trả lời câu hỏi 'Khi nào Ronaldo ghi bàn thứ 1.000?', chúng ta không thể dựa vào cảm tính mà phải nhìn vào dữ liệu thi đấu thực tế tại Trung Đông trong 3 mùa giải gần nhất.",
          "Kể từ khi gia nhập Al Nassr, Cristiano Ronaldo đã ghi hơn 130 bàn thắng sau 160 trận đấu chính thức trên mọi đấu trường (Saudi Pro League, King's Cup, AFC Champions League). Hiệu suất trung bình đạt 0.82 bàn/trận. Đáng kinh ngạc hơn, trong các trận đấu tại giải quốc nội gặp các đội nhóm dưới, hiệu suất của CR7 tăng vọt lên 1.05 bàn/trận nhờ khả năng chớp cơ hội trong vòng cấm và tỷ lệ sút phạt đền thành công trên 93%."
        ]
      },
      {
        heading: "Mô hình toán học: Bao nhiêu trận đấu nữa cho 15 bàn thắng?",
        content: [
          "Với 15 bàn thắng còn lại để điền tên vào trang sử nhân loại, áp dụng phân phối Poisson và mô hình hồi quy hiệu suất thể lực ở tuổi 41:",
          "• Kịch bản tối ưu (Phong độ thăng hoa, lập 2-3 cú hat-trick): CR7 có thể chỉ cần 13 - 15 trận đấu.",
          "• Kịch bản tiêu chuẩn (Hiệu suất 0.75 - 0.82 bàn/trận): Cần khoảng 18 - 20 trận đấu chính thức.",
          "• Kịch bản bảo toàn (HLV xoay tua đội hình): Cần tối đa 22 - 24 trận đấu."
        ],
        table: {
          headers: ["Kịch bản", "Hiệu suất (Bàn/trận)", "Số trận cần", "Thời điểm dự kiến"],
          rows: [
            ["Bùng nổ (Hat-tricks liên tiếp)", "1.10", "14 trận", "Tháng 2 / 2027"],
            ["Tiêu chuẩn (Mô hình chính)", "0.82", "18 trận", "Tháng 3 - Tháng 4 / 2027"],
            ["Thận trọng (Xoay tua dưỡng sức)", "0.65", "23 trận", "Tháng 5 / 2027"]
          ]
        }
      },
      {
        heading: "Đấu trường nào sẽ là nơi bùng nổ khoảnh khắc 1.000?",
        content: [
          "Lịch thi đấu mùa giải 2026/2027 của Al Nassr cho thấy giai đoạn tháng 3 đến tháng 5 năm 2027 là thời điểm các trận tứ kết, bán kết Cúp C1 Châu Á (AFC Champions League) và các vòng đấu nước rút của Saudi Pro League diễn ra dồn dập.",
          "Al-Awwal Park — sân nhà của Al Nassr với sức chứa 25.000 khán giả — là nơi Ronaldo có tỷ lệ ghi bàn cao nhất (chiếm 62% tổng số bàn thắng của anh tại Ả Rập). Giới mộ điệu bóng đá thế giới đang chờ đợi một đêm thi đấu bùng nổ tại Riyadh, nơi tiếng hô 'SIUUU' thứ 1.000 sẽ làm rung chuyển các khán đài."
        ]
      }
    ],

    sectionsEn: [
      {
        heading: "Empirical Scoring Rates: The Data Does Not Lie",
        content: [
          "Projecting the exact timeline of Ronaldo's 1,000th goal demands mathematical rigor rather than romantic speculation.",
          "Across his tenure in Saudi Arabia, Cristiano Ronaldo has registered over 130 goals in 160 appearances for Al Nassr across all official competitions (Saudi Pro League, King's Cup, and AFC Champions League). That translates to a sustained conversion rate of 0.82 goals per match. Against bottom-half domestic opposition, his output surges to 1.05 goals per game, propelled by elite penalty-box movement and a 93%+ spot-kick conversion rate."
        ]
      },
      {
        heading: "Predictive Scenarios: How Many Fixtures for 15 Goals?",
        content: [
          "Simulating his remaining 15 goals via Poisson distribution adjusted for age-41 load management produces three distinct scenarios:",
          "• High-Yield Surge (Clustered braces and hat-tricks): 13 to 15 matches.",
          "• Baseline Expectation (Sustained 0.82 goals/game): 18 to 20 matches.",
          "• Conservative Rotation (Resting in domestic cup ties): 22 to 24 matches."
        ],
        table: {
          headers: ["Scenario", "Scoring Rate (Goals/Game)", "Caps Required", "Projected Horizon"],
          rows: [
            ["High Surge (Braces & Hat-tricks)", "1.10", "14 games", "February 2027"],
            ["Baseline (Primary Projection)", "0.82", "18 games", "March - April 2027"],
            ["Conservative (Rotational Rest)", "0.65", "23 games", "May 2027"]
          ]
        }
      },
      {
        heading: "The Stage: Why Riyadh's Al-Awwal Park is the Prime Venue",
        content: [
          "The 2026/2027 fixture calendar indicates that the March–May 2027 stretch aligns precisely with the knockout stages of the AFC Champions League and decisive Saudi Pro League fixtures.",
          "Al-Awwal Park in Riyadh, where Ronaldo records 62% of his total goals in Saudi football, offers the ideal theatre. Global broadcasters are already preparing coverage for the evening when the 1,000th 'SIUUU' echoes through the Saudi capital."
        ]
      }
    ],

    faqsVi: [
      {
        question: "Cristiano Ronaldo còn cần bao nhiêu bàn thắng nữa để chạm mốc 1000 bàn?",
        answer: "Tính đến tháng 11/2026, Ronaldo đã ghi 985 bàn thắng chính thức, còn cách cột mốc 1.000 bàn đúng 15 bàn thắng."
      },
      {
        question: "Dự kiến khi nào Ronaldo sẽ ghi bàn thứ 1000?",
        answer: "Dựa trên hiệu suất 0.82 bàn/trận tại Al Nassr, Ronaldo được dự báo sẽ cán mốc 1.000 bàn thắng trong khoảng từ tháng 3 đến tháng 5 năm 2027."
      },
      {
        question: "Những bàn thắng còn lại của CR7 sẽ được ghi ở giải đấu nào?",
        answer: "Do đã chia tay ĐTQG Bồ Đào Nha, toàn bộ 15 bàn thắng còn lại sẽ được ghi trong màu áo CLB Al Nassr tại giải VĐQG Saudi Arabia (SPL), Cúp Nhà Vua (King's Cup) và Cúp C1 Châu Á (AFC Champions League)."
      }
    ],
    faqsEn: [
      {
        question: "How many goals does Cristiano Ronaldo still need for 1,000 career goals?",
        answer: "As of November 2026, Cristiano Ronaldo has scored 985 official career goals, leaving him exactly 15 goals shy of the 1,000 milestone."
      },
      {
        question: "When is Ronaldo projected to reach 1,000 goals?",
        answer: "Based on his scoring rate of 0.82 goals per game with Al Nassr, predictive analytics place his 1,000th goal milestone between March and May 2027."
      },
      {
        question: "In which competitions will Ronaldo score his final milestone goals?",
        answer: "Having retired from international football, all remaining goals will be scored for Al Nassr in the Saudi Pro League, King's Cup, and AFC Champions League."
      }
    ]
  },

  {
    id: "anatomy-146-international-goals",
    slug: "anatomy-of-cr7-146-international-goals",
    titleVi: "Giải mã 146 bàn thắng quốc tế của Ronaldo: Tượng đài vĩ đại nhất lịch sử bóng đá nam thế giới",
    titleEn: "Deciphering Ronaldo's 146 International Goals: Why the Greatest Men's Record Will Stand for Decades",
    excerptVi: "Mổ xẻ chi tiết 146 pha lập công trong màu áo Bồ Đào Nha: cấu trúc chân sút, danh sách con mồi ưa thích và những khoảnh khắc sinh tử định đoạt lịch sử.",
    excerptEn: "A comprehensive breakdown of Ronaldo's 146 goals for Portugal: striking anatomy, favorite opponents, and legendary high-stakes clutch moments.",
    categoryVi: "Kỷ Lục & Di Sản",
    categoryEn: "Legacy & Records",
    categorySlug: "legacy",
    publishedDate: "2026-11-04",
    readTimeVi: "7 phút đọc",
    readTimeEn: "7 min read",
    author: "CR1000 Historical Archives",
    coverImage: "/images/cr7/iconic-sweden-playoff.jpeg",
    tags: ["Portugal", "Records", "World Cup", "Euro", "Hat-tricks", "History"],
    
    quickTakeawayVi: "146 bàn thắng quốc tế của Cristiano Ronaldo cho Bồ Đào Nha được cấu thành từ 89 bàn chân phải, 29 bàn chân trái và 28 pha không chiến bằng đầu. Bỏ xa Lionel Messi 34 bàn (112 bàn) và Ali Daei 38 bàn (108 bàn), đây được đánh giá là một trong những kỷ lục thể thao bất khả xâm phạm nhất thế kỷ 21 nhờ sự kết hợp giữa 23 năm thi đấu liên tục và hiệu suất săn bàn bền bỉ đến khó tin.",
    quickTakeawayEn: "Cristiano Ronaldo's 146 international goals for Portugal comprise 89 right-footed, 29 left-footed, and 28 headed finishes. Leading Lionel Messi by 34 goals (112) and Ali Daei by 38 goals (108), CR7's international tally stands as one of the most impregnable records in world sports, underpinned by 23 continuous years of supreme athletic conditioning.",
    
    keyStats: [
      { labelVi: "Chân phải ghi bàn", labelEn: "Right Foot Goals", value: "89 bàn (61%)" },
      { labelVi: "Chân trái ghi bàn", labelEn: "Left Foot Goals", value: "29 bàn (20%)" },
      { labelVi: "Đánh đầu không chiến", labelEn: "Headed Goals", value: "28 bàn (19%)" },
      { labelVi: "Khoảng cách với người đứng thứ 2", labelEn: "Lead Over 2nd All-Time", value: "+34 bàn (vs Messi 112)", highlight: true },
    ],

    sectionsVi: [
      {
        heading: "Cấu trúc cơ học của một cỗ máy săn bàn toàn diện",
        content: [
          "Điểm khác biệt lớn nhất giữa Cristiano Ronaldo và phần còn lại của lịch sử bóng đá quốc tế nằm ở sự hoàn hảo trong bộ kỹ năng dứt điểm. Trong 146 bàn thắng cho Bồ Đào Nha, không có bất kỳ điểm mù nào trong vòng cấm địa.",
          "89 bàn bằng chân phải thể hiện uy lực từ những cú nã đại bác ngoài vòng cấm lẫn những pha đệm bóng một chạm sắc lẹm. 29 bàn bằng chân trái chứng minh CR7 nguy hiểm ở cả hai hành lang cánh. Và đặc biệt, 28 bàn bằng đầu — với những cú bật nhảy đo được lên tới 2.56 mét — đã biến anh thành nỗi khiếp sợ trên không của mọi trung vệ châu Âu."
        ]
      },
      {
        heading: "Những 'con mồi' ưa thích và khả năng trừng phạt đối thủ lớn",
        content: [
          "Nhiều người thường chỉ trích việc các tiền đạo châu Âu hưởng lợi từ các đội bóng nhỏ. Nhưng nhìn vào danh sách đối thủ bị Ronaldo xé lưới, sự đa dạng là không thể bàn cãi:",
          "Luxembourg là nạn nhân số một với 11 bàn thua, theo sau là Lithuania (7 bàn), Thụy Điển (7 bàn), Hungary (6 bàn), Thụy Sĩ (5 bàn) và Tây Ban Nha (3 bàn). Ronaldo đã ghi bàn vào lưới hơn 48 đội tuyển quốc gia khác nhau trên toàn cầu — một kỷ lục địa lý bóng đá chưa từng có tiền lệ."
        ],
        table: {
          headers: ["Đối thủ", "Số bàn thua", "Trận đấu tiêu biểu", "Khoảnh khắc lịch sử"],
          rows: [
            ["Luxembourg", "11", "Vòng loại Euro / World Cup", "Cú xe đạp chổng ngược và sút phạt"],
            ["Thụy Điển", "7", "Play-off World Cup 2014", "Hat-trick nghẹt thở tại Solna"],
            ["Lithuania", "7", "Vòng loại Euro 2020", "Poker (4 bàn) tại Vilnius"],
            ["Hungary", "6", "Euro 2016 & Euro 2020", "Cú đúp giật gót cứu Bồ Đào Nha"],
            ["Thụy Sĩ", "5", "Bán kết Nations League 2019", "Hat-trick đưa Bồ Đào Nha vào chung kết"],
            ["Tây Ban Nha", "3", "World Cup 2018 (Sochi)", "Hat-trick kinh điển & cú sút phạt phút 88"]
          ]
        }
      },
      {
        heading: "Ba trận cầu định đoạt vị thế vĩ đại nhất",
        content: [
          "Nếu phải chọn ra 3 khoảnh khắc đại diện cho tinh thần của Cristiano Ronaldo tại ĐTQG:",
          "1. Ngày 19/11/2013 (Solna, Thụy Điển): Trận play-off World Cup kinh điển giữa Ronaldo và Ibrahimovic. CR7 lập một cú hat-trick siêu hạng trong vỏn vẹn 29 phút hiệp hai để kéo cả dân tộc Bồ Đào Nha đến Brazil.",
          "2. Ngày 15/06/2018 (Sochi, Nga): Trận mở màn World Cup 2018 gặp ứng viên vô địch Tây Ban Nha. Khi tỷ số là 2-3 ở phút 88, Ronaldo bước lên chấm đá phạt trực tiếp, thực hiện cú sút vòng cung knuckleball hoàn hảo gỡ hòa 3-3, hoàn tất cú hat-trick vĩ đại nhất lịch sử các kỳ World Cup.",
          "3. Ngày 05/06/2019 (Porto): Bán kết Nations League gặp Thụy Sĩ. Ronaldo một mình ghi cả 3 bàn thắng (trong đó có siêu phẩm sút phạt phút 25) để đưa Bồ Đào Nha vào chung kết rồi bước lên đỉnh vinh quang."
        ]
      }
    ],

    sectionsEn: [
      {
        heading: "The Biomechanics of an Ultimate Scoring Machine",
        content: [
          "The critical differentiator between Cristiano Ronaldo and all other international goalscorers in history is biomechanical completeness. Across 146 goals for Portugal, no blind spots existed in his attacking arsenal.",
          "His 89 right-footed strikes blended perimeter ballistic power with instinctive one-touch finishes. His 29 left-footed goals neutralized defender overplay, while 28 headed goals — powered by vertical leaps exceeding 2.56 meters — established him as the most dominant aerial threat in modern international football."
        ]
      },
      {
        heading: "Victims Across the Globe: Unmatched Geographical Reach",
        content: [
          "Skeptics periodically point to regional qualifiers, yet Ronaldo's scoring register spans 48 distinct nations worldwide — an unprecedented geographic spread.",
          "Luxembourg conceded 11 goals, followed by Sweden (7), Lithuania (7), Hungary (6), Switzerland (5), and Spain (3). Crucially, his most lethal performances arrived when tournament stakes were highest."
        ],
        table: {
          headers: ["Opponent", "Goals Conceded", "Signature Fixture", "Historical Significance"],
          rows: [
            ["Luxembourg", "11", "Euro / World Cup Qualifiers", "Acrobatic bicycle kick and free-kicks"],
            ["Sweden", "7", "2014 World Cup Play-off", "Solo hat-trick masterclass in Solna"],
            ["Lithuania", "7", "Euro 2020 Qualifiers", "Four-goal poker in Vilnius"],
            ["Hungary", "6", "Euro 2016 & Euro 2020", "Backheel brace securing knockout passage"],
            ["Switzerland", "5", "2019 Nations League Semi-final", "Clinical hat-trick to seal final spot"],
            ["Spain", "3", "2018 World Cup (Sochi)", "Iconic hat-trick & 88th-minute free-kick equalizer"]
          ]
        }
      },
      {
        heading: "Three Matches That Cemented His Immortal Status",
        content: [
          "Three specific fixtures encapsulate Ronaldo's clutch greatness on the international stage:",
          "1. November 19, 2013 (Solna, Sweden): The legendary World Cup playoff duel against Zlatan Ibrahimović. Ronaldo delivered an explosive second-half hat-trick in 29 minutes to single-handedly drag Portugal to Brazil.",
          "2. June 15, 2018 (Sochi, Russia): World Cup group stage against Spain. Trailing 2-3 in the 88th minute, Ronaldo stepped up to a 25-yard free-kick, delivering a curling knuckleball into the top corner to complete his immortal World Cup hat-trick.",
          "3. June 5, 2019 (Porto): UEFA Nations League semi-final against Switzerland. A virtuoso hat-trick, highlighted by a 25th-minute dipping free-kick, propelled Portugal to the inaugural title."
        ]
      }
    ],

    faqsVi: [
      {
        question: "Cầu thủ nào bị Ronaldo chọc thủng lưới nhiều nhất ở cấp ĐTQG?",
        answer: "Luxembourg là đội tuyển để Ronaldo ghi nhiều bàn nhất với 11 bàn thua, tiếp theo là Lithuania (7 bàn) và Thụy Điển (7 bàn)."
      },
      {
        question: "Ronaldo ghi bao nhiêu bàn bằng đầu cho đội tuyển Bồ Đào Nha?",
        answer: "Ronaldo đã ghi 28 bàn thắng bằng đầu cho ĐTQG Bồ Đào Nha, chiếm gần 20% tổng số bàn thắng quốc tế của anh."
      },
      {
        question: "Ai là người đứng thứ hai sau Ronaldo về số bàn thắng quốc tế?",
        answer: "Người đứng thứ hai trong lịch sử bóng đá nam là Lionel Messi (Argentina) với 112 bàn thắng, kém Ronaldo tới 34 bàn."
      }
    ],
    faqsEn: [
      {
        question: "Which nation conceded the most goals to Cristiano Ronaldo?",
        answer: "Luxembourg suffered the most, conceding 11 goals to Ronaldo, followed by Sweden (7) and Lithuania (7)."
      },
      {
        question: "How many headed goals did Ronaldo score for Portugal?",
        answer: "Ronaldo scored 28 headed goals for Portugal, accounting for nearly 20% of his entire international haul."
      },
      {
        question: "Who is second to Ronaldo in all-time men's international goals?",
        answer: "Lionel Messi (Argentina) ranks second in men's international football history with 112 goals, trailing Ronaldo by 34 goals."
      }
    ]
  }
];
