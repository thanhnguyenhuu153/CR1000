import { getSupabaseServerClient } from "./supabase";
import { revalidatePath } from "next/cache";
import { submitToIndexNow } from "./indexnow";
import { cr7JournalArticles } from "@/data/cr7-journal";

interface AutoGenerateResult {
  status: "published" | "skipped" | "error";
  reason?: string;
  article?: any;
  error?: string;
}

export async function runAutonomousJournalist(forceTopic?: string): Promise<AutoGenerateResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return {
      status: "error",
      error: "Thiếu biến GEMINI_API_KEY trong cấu hình Vercel.",
    };
  }

  const model = process.env.GEMINI_MODEL || "gemini-2.0-flash";

  // 1. Fetch recent articles from Supabase / fallback to provide dynamic deduplication memory
  let recentArticlesList: { titleVi: string; categoryVi: string; excerptVi: string }[] = [];
  try {
    const supabase = getSupabaseServerClient();
    if (supabase) {
      const { data: dbArticles } = await supabase
        .from("journal_articles")
        .select("title_vi, category_vi, excerpt_vi")
        .order("published_date", { ascending: false })
        .limit(10);
      if (dbArticles && dbArticles.length > 0) {
        recentArticlesList = dbArticles.map((a: any) => ({
          titleVi: a.title_vi,
          categoryVi: a.category_vi,
          excerptVi: a.excerpt_vi,
        }));
      }
    }
  } catch (e) {}

  if (recentArticlesList.length === 0) {
    recentArticlesList = cr7JournalArticles.slice(0, 5).map((a) => ({
      titleVi: a.titleVi,
      categoryVi: a.categoryVi,
      excerptVi: a.excerptVi,
    }));
  }

  const existingArticlesContext = recentArticlesList
    .map((a, i) => `${i + 1}. [${a.categoryVi}] "${a.titleVi}"\n   - Tóm tắt: ${a.excerptVi}`)
    .join("\n\n");

  // System prompt enforcing strict anti-AI tone, sports journalism, and GEO/AIO criteria
  const systemPrompt = `
Bạn là Trưởng ban Biên tập thể thao của bảo tàng số quốc tế CR1000 (cr1000.live) - nơi theo dõi hành trình lịch sử tới 1.000 bàn thắng của Cristiano Ronaldo.
Nhiệm vụ của bạn: Sản xuất các bài viết ký sự thể thao chuyên sâu song ngữ (Tiếng Việt & English) bao quát TOÀN BỘ sự nghiệp vĩ đại của Cristiano Ronaldo (Sporting CP, Manchester United, Real Madrid, Juventus, Al Nassr và ĐTQG Bồ Đào Nha), đạt chuẩn SEO & AIO/GEO (Generative Engine Optimization).

=============================================================
DANH SÁCH CÁC BÀI VIẾT ĐÃ XUẤT BẢN GẦN ĐÂY (BẮT BUỘC ĐỌC ĐỂ KHÔNG TRÙNG LẶP):
${existingArticlesContext}
=============================================================

TIÊU CHUẨN BIÊN TẬP & QUY TẮC CHỐNG TRÙNG LẶP (TOPIC ROTATION):
1. ĐỐI CHIẾU DANH SÁCH BÀI CŨ & XOAY TRỤC CHỦ ĐỀ:
   - TUYỆT ĐỐI CẤM chọn lại chủ đề, góc nhìn (angle) hoặc luận điểm tương tự các bài gần đây!
   - ĐẶC BIỆT: Nếu danh sách bài gần đây đã viết về "Tuổi sinh học", "Giấc ngủ", "Dinh dưỡng" hay "Cơ chế sinh học / trao đổi chất", BẠN BỊ CẤM TUYỆT ĐỐI viết thêm bất kỳ bài nào liên quan tới sinh học, tuổi sinh học hay y học thể thao nữa!
   - BẮT BUỘC CHỌN 1 TRONG CÁC TRỤ CỘT CHUYÊN MÔN MỚI SAU ĐÂY:
     + Trụ cột 1 (Tiến hóa chiến thuật): Từ Winger rê dắt tốc độ (MU 2003-2006) -> Máy ghi bàn toàn năng (Real Madrid 2009-2018) -> Sát thủ vòng cấm tối thượng (Poacher / Fox in the Box tại Juve & Al Nassr). Nghệ thuật di chuyển không bóng, khai thác điểm mù (blind-side run).
     + Trụ cột 2 (Ký sự trận cầu kinh điển & Chung kết): Hat-trick lật ngược thế cờ vs Atletico Madrid 2019, Siêu phẩm xe đạp chổng ngược vs Juventus 2018, Hat-trick kinh điển play-off World Cup vs Thụy Điển 2013, Hat-trick vs Tây Ban Nha World Cup 2018, hoặc Chung kết Champions League 2008 / 2014 / 2017.
     + Trụ cột 3 (Đối sánh số liệu lịch sử): So sánh hiệu suất bàn thắng xG sau tuổi 30 của CR7 với các huyền thoại (Pele, Messi, Romario, Ibrahimovic, Lewandowski, Gerd Muller). Tỷ lệ ghi bàn phút 75-90+ và bản lĩnh "Clutch Player" định đoạt trận cầu lớn.
     + Trụ cột 4 (Khoa học kỹ thuật sút phạt & Không chiến): Vật lý học khí động học Knuckleball (hiệu ứng xoáy ngược Magnus), lực sút 105+ km/h, hoặc kỹ năng bật nhảy cao 2.56m (sức bật thẳng đứng 78cm - vượt trội trung bình NBA), thời gian dừng trên không (hang time).
     + Trụ cột 5 (Đối thủ ưa thích & Nạn nhân lớn nhất): Ký sự về các đội bóng từng nếm trải nhiều bàn thua nhất từ CR7: Atletico Madrid (25 bàn), Sevilla (27 bàn), Barcelona (20 bàn), Tottenham, Bayern Munich...
     + Trụ cột 6 (Nhịp thở hiện tại & Lộ trình 1.000 bàn): Phân tích trận đấu kế tiếp của Al Nassr (Al-Qadsiah tại Saudi Pro League, Al-Sadd tại AFC Champions League Elite) hoặc mô hình xác suất chạm mốc 1.000 bàn thắng.

2. PHONG CÁCH VIẾT BÁO CHÍ THỂ THAO CAO CẤP (ANTI-AI TONE):
   - CẤM TUYỆT ĐỐI các cụm từ sáo rỗng AI: "Trong thế giới bóng đá", "Không thể phủ nhận rằng", "Tóm lại", "Một huyền thoại sống", "Hãy cùng bước vào hành trình".
   - BẮT BUỘC dùng văn phong ký sự thể thao giàu chuyên môn và nhịp thở sân cỏ (tương đương The Athletic, L'Équipe, Reuters): Sử dụng thuật ngữ chuyên môn (xG, cự ly dứt điểm, cú sút knuckleball, pressing, chạm bóng bước một, box-to-box, poacher, bản đồ nhiệt heatmap, bứt tốc high-intensity, clutch player...).

3. AIO & GEO (GENERATIVE ENGINE OPTIMIZATION):
   - quickTakeaway: Đoạn "Tóm tắt sự kiện" 2-3 câu ngắn gọn, trả lời trực diện facts (thời gian, đối thủ/kỷ lục, số liệu cụ thể, số bàn còn lại tới mốc 1.000). Đây là phần Google AI Overview và Perplexity sẽ trích nguồn.
   - Luôn liên kết với "Cuộc đua 1.000 bàn thắng" (Hiện tại đã ghi 985 bàn, còn 15 bàn nữa).

4. ĐỊNH DẠNG ĐẦU RA BẮT BUỘC (JSON ONLY):
Trả về duy nhất 1 chuỗi JSON hợp lệ với cấu trúc sau:
{
  "titleVi": "Tiêu đề tiếng Việt sắc sảo, có số liệu và góc nhìn báo chí",
  "titleEn": "English Title in high-end sports journalism style",
  "slug": "duong-dan-tinh-khong-dau-ngan-gon-viet-lien-bang-dau-gach-ngang",
  "categoryVi": "Tin Nóng & Bước Ngoặt" | "Phân Tích Số Liệu" | "Kỷ Lục & Di Sản",
  "categoryEn": "Breaking & Milestones" | "Data & Forecast" | "Legacy & Records",
  "categorySlug": "breaking" | "data" | "legacy",
  "excerptVi": "Đoạn mở đầu ngắn gọn 2-3 câu thu hút độc giả",
  "excerptEn": "English short excerpt",
  "quickTakeawayVi": "Tóm tắt sự kiện cô đọng cho Google AI trích nguồn",
  "quickTakeawayEn": "Key event summary for AI search citations",
  "coverImage": "/images/cr7/era-portugal.jpg" (hoặc /images/cr7/era-alnassr.jpg, /images/cr7/era-realmadrid.jpg, /images/cr7/final-nations-league-2025.jpeg, /images/cr7/hero-cr7.jpg),
  "keyStats": [
    { "labelVi": "Chỉ số 1", "labelEn": "Stat 1", "value": "Giá trị", "highlight": true },
    { "labelVi": "Chỉ số 2", "labelEn": "Stat 2", "value": "Giá trị" }
  ],
  "sectionsVi": [
    {
      "heading": "Tiêu đề phân đoạn 1",
      "content": ["Đoạn văn 1...", "Đoạn văn 2..."]
    },
    {
      "heading": "Tiêu đề phân đoạn 2",
      "content": ["Đoạn văn 3...", "Đoạn văn 4..."]
    }
  ],
  "sectionsEn": [
    {
      "heading": "Section Heading 1",
      "content": ["Paragraph 1...", "Paragraph 2..."]
    },
    {
      "heading": "Section Heading 2",
      "content": ["Paragraph 3...", "Paragraph 4..."]
    }
  ],
  "faqsVi": [
    { "question": "Câu hỏi thường gặp 1?", "answer": "Câu trả lời ngắn gọn, chuẩn xác..." }
  ],
  "faqsEn": [
    { "question": "Frequently asked question 1?", "answer": "Direct factual answer..." }
  ]
}
`;

  const userQuery = forceTopic
    ? `Hãy viết một bài báo phân tích chuyên sâu về chủ đề sau: "${forceTopic}". Đảm bảo tuân thủ mọi nguyên tắc phong cách thể thao đỉnh cao, AIO và cấu trúc JSON.`
    : `Dựa vào danh sách các bài viết gần đây ở trên, hãy CHỦ ĐỘNG CHỌN MỘT GÓC NHÌN HOÀN TOÀN MỚI MẺ chưa từng được khai thác (tránh trùng lặp với các bài cũ). Hãy chọn một chủ đề hấp dẫn từ các Trụ cột (chiến thuật, các trận cầu lịch sử ngược dòng, so sánh số liệu với các huyền thoại, hoặc khoa học sút phạt/không chiến). Viết một bài ký sự thể thao xuất sắc đạt điểm 10 về chuyên môn và thu hút độc giả.`;

  try {
    // 1. Dynamically query available models for this API key to guarantee 100% compatibility
    let candidateModels = [
      process.env.GEMINI_MODEL || "gemini-2.0-flash",
      "gemini-2.0-flash-001",
      "gemini-1.5-flash-002",
      "gemini-1.5-flash-001",
      "gemini-1.5-pro-002",
      "gemini-1.5-pro-001",
    ];

    try {
      const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
      if (listRes.ok) {
        const listData = await listRes.json();
        const availableGenerateModels = (listData.models || [])
          .filter(
            (m: any) =>
              m.supportedGenerationMethods?.includes("generateContent") &&
              !m.name.includes("tts") &&
              !m.name.includes("audio") &&
              !m.name.includes("embedding") &&
              !m.name.includes("imagen")
          )
          .map((m: any) => m.name.replace(/^models\//, ""));

        if (availableGenerateModels.length > 0) {
          // Put preferred text models first
          const preferred = [
            "gemini-2.0-flash",
            "gemini-2.0-flash-001",
            "gemini-1.5-flash-002",
            "gemini-1.5-flash-001",
            "gemini-1.5-pro-002",
            "gemini-1.5-pro-001",
          ];
          const matchedPreferred = preferred.filter((p) => availableGenerateModels.includes(p));
          candidateModels = Array.from(new Set([...matchedPreferred, ...availableGenerateModels]));
        }
      }
    } catch (e) {}

    const requestBody = {
      contents: [
        {
          role: "user",
          parts: [{ text: `${systemPrompt}\n\n${userQuery}` }],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: forceTopic ? 0.6 : 0.8,
      },
    };

    let data: any = null;
    let lastError = "";

    for (const currentModel of candidateModels) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${currentModel}:generateContent?key=${apiKey}`;
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          const errText = await response.text();
          lastError = `[${currentModel}] (${response.status}): ${errText}`;
          console.warn(`[Gemini Journalist] Model ${currentModel} returned ${response.status}. Attempting next model...`);
          continue;
        }

        const resJson = await response.json();
        const content = resJson.candidates?.[0]?.content?.parts?.[0]?.text;
        if (content) {
          data = resJson;
          break;
        }
      } catch (reqErr: any) {
        lastError = reqErr.message;
      }
    }

    if (!data) {
      return {
        status: "error",
        error: `Tất cả mô hình AI đang tạm thời quá tải hoặc không phản hồi. Lỗi gần nhất: ${lastError}`,
      };
    }

    const rawContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawContent) {
      return {
        status: "error",
        error: "Không nhận được phản hồi nội dung từ Gemini.",
      };
    }

    let cleanJson = rawContent.trim();
    if (cleanJson.startsWith("```json")) {
      cleanJson = cleanJson.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    } else if (cleanJson.startsWith("```")) {
      cleanJson = cleanJson.replace(/^```\s*/, "").replace(/\s*```$/, "");
    }

    let articleData: any;
    try {
      articleData = JSON.parse(cleanJson);
    } catch (parseErr: any) {
      return {
        status: "error",
        error: `Lỗi đọc định dạng JSON từ AI: ${parseErr.message}`,
      };
    }

    if (articleData.skip) {
      return {
        status: "skipped",
        reason: articleData.reason || "Bộ lọc thông minh xác định 24h qua không có sự kiện đủ lớn.",
      };
    }

    // Save article directly to Supabase
    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return {
        status: "error",
        error: "Supabase chưa được cấu hình hoặc thiếu biến môi trường.",
      };
    }

    // Ensure clean, unique slug
    let finalSlug = (articleData.slug || `cr7-article-${Date.now()}`)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    try {
      const { data: existingSlug } = await supabase
        .from("journal_articles")
        .select("slug")
        .eq("slug", finalSlug)
        .maybeSingle();

      if (existingSlug) {
        finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
      }
    } catch (e) {}

    const payload = {
      id: `art_auto_${Date.now()}`,
      slug: finalSlug,
      title_vi: articleData.titleVi,
      title_en: articleData.titleEn,
      excerpt_vi: articleData.excerptVi,
      excerpt_en: articleData.excerptEn,
      category_vi: articleData.categoryVi || "Tin Nóng & Bước Ngoặt",
      category_en: articleData.categoryEn || "Breaking & Milestones",
      category_slug: articleData.categorySlug || "breaking",
      published_date: new Date().toISOString().split("T")[0],
      read_time_vi: "5 phút đọc",
      read_time_en: "5 min read",
      author: "CR1000 AI Sports Analytics",
      cover_image: articleData.coverImage || "/images/cr7/era-alnassr.jpg",
      is_featured: false,
      tags: ["Ronaldo", "CR7", "1000 Goals", "Al Nassr"],
      quick_takeaway_vi: articleData.quickTakeawayVi,
      quick_takeaway_en: articleData.quickTakeawayEn,
      key_stats: articleData.keyStats || [],
      sections_vi: articleData.sectionsVi || [],
      sections_en: articleData.sectionsEn || [],
      faqs_vi: articleData.faqsVi || [],
      faqs_en: articleData.faqsEn || [],
      updated_at: new Date().toISOString(),
    };

    const { error: dbError } = await supabase
      .from("journal_articles")
      .upsert(payload, { onConflict: "slug" });

    if (dbError) {
      return {
        status: "error",
        error: `Lỗi lưu vào Supabase: ${dbError.message}`,
      };
    }

    // Instant revalidation
    revalidatePath("/road-to-1000");
    revalidatePath(`/road-to-1000/${payload.slug}`);
    revalidatePath("/sitemap.xml");

    // IndexNow instant search engine notification
    submitToIndexNow([
      `https://www.cr1000.live/road-to-1000/${payload.slug}`,
      "https://www.cr1000.live/road-to-1000",
      "https://www.cr1000.live",
    ]).catch(() => {});

    return {
      status: "published",
      article: payload,
    };
  } catch (err: any) {
    return {
      status: "error",
      error: `Ngoại lệ khi thực thi: ${err.message}`,
    };
  }
}
