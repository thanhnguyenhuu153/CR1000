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

  const model = process.env.GEMINI_MODEL || "gemini-3.8-flash";

  // 1. Fetch recent articles from Supabase / fallback to provide dynamic deduplication memory
  let recentArticlesList: { slug?: string; titleVi: string; categoryVi: string; excerptVi: string }[] = [];
  try {
    const supabase = getSupabaseServerClient();
    if (supabase) {
      const { data: dbArticles } = await supabase
        .from("journal_articles")
        .select("slug, title_vi, category_vi, excerpt_vi")
        .order("published_date", { ascending: false })
        .limit(15);
      if (dbArticles && dbArticles.length > 0) {
        recentArticlesList = dbArticles.map((a: any) => ({
          slug: a.slug,
          titleVi: a.title_vi,
          categoryVi: a.category_vi,
          excerptVi: a.excerpt_vi,
        }));
      }
    }
  } catch (e) {}

  if (recentArticlesList.length === 0) {
    recentArticlesList = cr7JournalArticles.slice(0, 5).map((a) => ({
      slug: a.slug,
      titleVi: a.titleVi,
      categoryVi: a.categoryVi,
      excerptVi: a.excerptVi,
    }));
  }

  const existingArticlesContext = recentArticlesList
    .map((a, i) => `${i + 1}. [${a.categoryVi}] "${a.titleVi}" (slug: ${a.slug || "n/a"})\n   - Tóm tắt: ${a.excerptVi}`)
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
1. ĐỐI CHIẾU DANH SÁCH 15 BÀI CŨ & XOAY TRỤC CHỦ ĐỀ:
   - TUYỆT ĐỐI CẤM chọn lại chủ đề, góc nhìn (angle), tiêu đề, slug hoặc luận điểm tương tự bất kỳ bài nào trong danh sách đã xuất bản ở trên!
   - ĐẶC BIỆT CẤM LẶP LẠI các chủ đề đã khai thác gần đây: "Tuổi sinh học / Cơ sinh học tuổi 40", "ADN Clutch Player & 25 nạn nhân", "Vật lý sút phạt Knuckleball & bật nhảy 2m56". Nếu chủ đề nào đã có trong danh sách 15 bài gần đây, PHẢI CHỌN GÓC NHÌN HOÀN TOÀN KHÁC (ví dụ: sự nghiệp Sporting CP/MU thời trẻ, đối đầu Barcelona ở El Clásico, trận play-off Thụy Điển 2013, kỷ lục EURO qua 6 kỳ, chiến thuật dưới thời Ancelotti/Zidane, hiệu suất tại AFC Champions League...).
   - BẮT BUỘC CHỌN 1 TRONG CÁC TRỤ CỘT CHUYÊN MÔN CHƯA BỊ TRÙNG:
     + Trụ cột 1 (Tiến hóa chiến thuật): Từ Winger rê dắt tốc độ (MU 2003-2006) -> Máy ghi bàn toàn năng (Real Madrid 2009-2018) -> Sát thủ vòng cấm tối thượng (Poacher / Fox in the Box tại Juve & Al Nassr). Nghệ thuật di chuyển không bóng, khai thác điểm mù (blind-side run).
     + Trụ cột 2 (Ký sự trận cầu kinh điển & Chung kết): Hat-trick lật ngược thế cờ vs Atletico Madrid 2019, Siêu phẩm xe đạp chổng ngược vs Juventus 2018, Hat-trick kinh điển play-off World Cup vs Thụy Điển 2013, Hat-trick vs Tây Ban Nha World Cup 2018, hoặc Chung kết Champions League 2008 / 2014 / 2017.
     + Trụ cột 3 (Đối sánh số liệu lịch sử): So sánh hiệu suất bàn thắng xG và cự ly dứt điểm của CR7 với các huyền thoại (Pele, Messi, Romario, Ibrahimovic, Lewandowski, Gerd Muller, Josef Bican) tại các giải đấu đỉnh cao châu Âu.
     + Trụ cột 4 (Di sản tại các giải đấu & Huấn luyện viên): Dấu ấn chiến thuật dưới thời Sir Alex Ferguson, José Mourinho, Carlo Ancelotti, Zinedine Zidane hay kỷ lục 140 bàn tại UEFA Champions League.
     + Trụ cột 5 (Đối thủ ưa thích & Cuộc đối đầu kinh điển): Ký sự chuyên sâu về các đại chiến El Clásico, Derby Madrid hoặc các trận cầu trước Sevilla (27 bàn), Bayern Munich (9 bàn), Juventus (10 bàn)...
     + Trụ cột 6 (Nhịp thở hiện tại & Lộ trình 1.000 bàn): Phân tích chiến thuật, phong độ và lịch thi đấu sắp tới của Al Nassr (Al-Qadsiah tại Saudi Pro League, Al-Sadd tại AFC Champions League Elite) cùng mô hình xác suất chạm mốc 1.000 bàn thắng.

2. PHONG CÁCH & ĐỘ DÀI BÁO CHÍ CHUYÊN SÂU (LONG-FORM STANDARD — BẮT BUỘC):
   - CẤM TUYỆT ĐỐI các cụm từ sáo rỗng AI: "Trong thế giới bóng đá", "Không thể phủ nhận rằng", "Tóm lại", "Một huyền thoại sống", "Hãy cùng bước vào hành trình".
   - ĐỘ DÀI BẮT BUỘC (CHỐNG THIN CONTENT): Bài viết Tiếng Việt PHẢI đạt **900 – 1.300+ từ** (và bản Tiếng Anh tương đương). Phải có **tối thiểu 4–5 phân đoạn lớn** (\`sectionsVi\` & \`sectionsEn\`), mỗi phân đoạn có **2–3 đoạn văn sâu sắc, chi tiết**, phân tích số liệu cụ thể thay vì viết tóm tắt ngắn.
   - BẮT BUỘC nhúng ít nhất **1 bảng số liệu đối chiếu (\`table\`)** và ít nhất **1 trích dẫn kinh điển (\`quote\`)** ngay trong các phân đoạn nội dung, cùng **3–4 câu hỏi FAQ (\`faqsVi\` / \`faqsEn\`)**.
   - Văn phong tương đương The Athletic, L'Équipe, Reuters: giàu chuyên môn (xG, pressing, blind-side run, heatmap, box-to-box, half-space...).

3. AIO & GEO (GENERATIVE ENGINE OPTIMIZATION):
   - quickTakeaway: Đoạn "Tóm tắt sự kiện" 2-3 câu ngắn gọn, trả lời trực diện facts (thời gian, đối thủ/kỷ lục, số liệu cụ thể, số bàn còn lại tới mốc 1.000).
   - Luôn liên kết tự nhiên với "Cuộc đua 1.000 bàn thắng" (Hiện tại đã ghi 986 bàn, còn 14 bàn nữa).

4. ĐỊNH DẠNG ĐẦU RA BẮT BUỘC (JSON ONLY):
Trả về duy nhất 1 chuỗi JSON hợp lệ với cấu trúc sau:
{
  "titleVi": "Tiêu đề tiếng Việt sắc sảo, có số liệu và góc nhìn báo chí",
  "titleEn": "English Title in high-end sports journalism style",
  "slug": "duong-dan-tinh-khong-dau-doc-nhat-chua-tung-co-trong-danh-sach-bai-cu",
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
    { "labelVi": "Chỉ số 2", "labelEn": "Stat 2", "value": "Giá trị" },
    { "labelVi": "Chỉ số 3", "labelEn": "Stat 3", "value": "Giá trị" },
    { "labelVi": "Chỉ số 4", "labelEn": "Stat 4", "value": "Giá trị" }
  ],
  "sectionsVi": [
    {
      "heading": "Tiêu đề phân đoạn 1 (Bối cảnh & Dữ liệu cốt lõi)",
      "content": ["Đoạn văn phân tích chi tiết 1 (80-120 từ)...", "Đoạn văn phân tích chi tiết 2 (80-120 từ)..."]
    },
    {
      "heading": "Tiêu đề phân đoạn 2 (Giải phẫu chiến thuật & Bảng đối chiếu)",
      "content": ["Đoạn văn phân tích chi tiết 3...", "Đoạn văn phân tích chi tiết 4..."],
      "table": {
        "headers": ["Chỉ số / Giai đoạn", "Giá trị CR7", "Chuẩn đối chiếu / Bối cảnh"],
        "rows": [
          ["Hàng dữ liệu 1", "Số liệu 1", "Ghi chú chuyên môn 1"],
          ["Hàng dữ liệu 2", "Số liệu 2", "Ghi chú chuyên môn 2"],
          ["Hàng dữ liệu 3", "Số liệu 3", "Ghi chú chuyên môn 3"]
        ]
      }
    },
    {
      "heading": "Tiêu đề phân đoạn 3 (Góc nhìn chuyên gia & Bước ngoặt)",
      "content": ["Đoạn văn phân tích chi tiết 5...", "Đoạn văn phân tích chi tiết 6..."],
      "quote": {
        "text": "Trích dẫn thực tế tiêu biểu hoặc nhận định chuyên môn đắt giá",
        "author": "Tên nhân vật / Chuyên gia"
      }
    },
    {
      "heading": "Tiêu đề phân đoạn 4 (Tác động tới hành trình 1.000 bàn thắng)",
      "content": ["Đoạn văn phân tích chi tiết 7...", "Đoạn văn phân tích chi tiết 8..."]
    }
  ],
  "sectionsEn": [
    {
      "heading": "Section Heading 1",
      "content": ["Detailed paragraph 1...", "Detailed paragraph 2..."]
    },
    {
      "heading": "Section Heading 2",
      "content": ["Detailed paragraph 3...", "Detailed paragraph 4..."],
      "table": {
        "headers": ["Metric / Era", "CR7 Value", "Benchmark / Context"],
        "rows": [
          ["Row 1", "Value 1", "Note 1"],
          ["Row 2", "Value 2", "Note 2"],
          ["Row 3", "Value 3", "Note 3"]
        ]
      }
    },
    {
      "heading": "Section Heading 3",
      "content": ["Detailed paragraph 5...", "Detailed paragraph 6..."],
      "quote": {
        "text": "Authentic notable quote",
        "author": "Author Name"
      }
    },
    {
      "heading": "Section Heading 4",
      "content": ["Detailed paragraph 7...", "Detailed paragraph 8..."]
    }
  ],
  "faqsVi": [
    { "question": "Câu hỏi thường gặp 1?", "answer": "Câu trả lời chi tiết, chuẩn xác..." },
    { "question": "Câu hỏi thường gặp 2?", "answer": "Câu trả lời chi tiết, chuẩn xác..." },
    { "question": "Câu hỏi thường gặp 3?", "answer": "Câu trả lời chi tiết, chuẩn xác..." }
  ],
  "faqsEn": [
    { "question": "Frequently asked question 1?", "answer": "Direct factual answer..." },
    { "question": "Frequently asked question 2?", "answer": "Direct factual answer..." },
    { "question": "Frequently asked question 3?", "answer": "Direct factual answer..." }
  ]
}
`;

  const userQuery = forceTopic
    ? `Hãy viết một bài báo phân tích chuyên sâu dài 900–1.300 từ (tối thiểu 4 phân đoạn, kèm 1 bảng số liệu và 1 trích dẫn) về chủ đề sau: "${forceTopic}". Đảm bảo tuân thủ mọi nguyên tắc phong cách thể thao đỉnh cao, AIO và cấu trúc JSON.`
    : `Dựa vào danh sách 15 bài viết gần đây ở trên, hãy CHỦ ĐỘNG CHỌN MỘT GÓC NHÌN HOÀN TOÀN MỚI MẺ chưa từng xuất hiện (tuyệt đối không lặp lại tuổi sinh học, ADN clutch player 25 nạn nhân hay knuckleball bật nhảy). Viết một bài ký sự thể thao chuyên sâu dài 900–1.300 từ gồm tối thiểu 4 phân đoạn lớn, có bảng số liệu đối chiếu, trích dẫn và 3 câu hỏi FAQ đạt điểm 10 về chuyên môn.`;

  try {
    // 1. Prioritize Gemini 3.8 Flash (and user env override) with fast verified fallbacks
    const userPreferredModel = process.env.GEMINI_MODEL || "gemini-3.8-flash";
    const candidateModels = Array.from(
      new Set([
        userPreferredModel,
        "gemini-3.8-flash",
        "gemini-3.6-flash",
        "gemini-2.0-flash",
        "gemini-1.5-flash-002",
      ])
    );

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
        maxOutputTokens: 4096,
      },
    };

    let data: any = null;
    let lastError = "";
    const startedAt = Date.now();
    const TOTAL_BUDGET_MS = 52000; // Leave 8s buffer before Vercel 60s maxDuration

    for (let i = 0; i < candidateModels.length; i++) {
      const currentModel = candidateModels[i];
      const remainingMs = TOTAL_BUDGET_MS - (Date.now() - startedAt);
      if (remainingMs < 5000) {
        lastError = lastError || "Hết quỹ thời gian xử lý trước ngưỡng 60s của Vercel.";
        break;
      }

      const attemptTimeoutMs = Math.min(i === 0 ? 28000 : 20000, remainingMs);

      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${currentModel}:generateContent?key=${apiKey}`;
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
          signal: AbortSignal.timeout(attemptTimeoutMs),
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

    // Intelligently resolve the most contextual memorabilia/shop item
    const textCorpus = `${articleData.titleVi || ""} ${articleData.titleEn || ""} ${finalSlug}`.toLowerCase();
    let suggestedGearId = "poster-cr1000-metal";
    if (textCorpus.includes("knuckleball") || textCorpus.includes("sút phạt") || textCorpus.includes("free kick")) {
      suggestedGearId = "boots-mercurial-superfly-iv-gala-2014";
    } else if (textCorpus.includes("bật nhảy") || textCorpus.includes("jump") || textCorpus.includes("aerial") || textCorpus.includes("không chiến") || textCorpus.includes("turin") || textCorpus.includes("bicycle")) {
      suggestedGearId = "boots-mercurial-superfly-360-turin-2018";
    } else if (textCorpus.includes("portugal") || textCorpus.includes("bồ đào nha") || textCorpus.includes("seleção")) {
      suggestedGearId = "boots-mercurial-superfly-10-munich-2025";
    } else if (textCorpus.includes("al-nassr") || textCorpus.includes("al nassr") || textCorpus.includes("saudi")) {
      suggestedGearId = "jersey-al-nassr-home";
    } else if (textCorpus.includes("manchester") || textCorpus.includes("mu ") || textCorpus.includes("moscow") || textCorpus.includes("2008")) {
      suggestedGearId = "jersey-mu-2008-retro";
    } else if (textCorpus.includes("real madrid") || textCorpus.includes("cardiff") || textCorpus.includes("champions league")) {
      suggestedGearId = "jersey-real-madrid-cardiff-2017";
    }

    const tagsWithGear = ["Ronaldo", "CR7", "1000 Goals", "Al Nassr", `gear:${suggestedGearId}`];

    let payload: any = {
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
      tags: tagsWithGear,
      related_product_id: suggestedGearId,
      quick_takeaway_vi: articleData.quickTakeawayVi,
      quick_takeaway_en: articleData.quickTakeawayEn,
      key_stats: articleData.keyStats || [],
      sections_vi: articleData.sectionsVi || [],
      sections_en: articleData.sectionsEn || [],
      faqs_vi: articleData.faqsVi || [],
      faqs_en: articleData.faqsEn || [],
      updated_at: new Date().toISOString(),
    };

    let { error: dbError } = await supabase
      .from("journal_articles")
      .upsert(payload, { onConflict: "slug" });

    // Fallback if related_product_id column does not exist yet in Supabase
    if (dbError && dbError.message?.includes("related_product_id")) {
      delete payload.related_product_id;
      const retry = await supabase
        .from("journal_articles")
        .upsert(payload, { onConflict: "slug" });
      dbError = retry.error;
    }

    if (dbError) {
      return {
        status: "error",
        error: `Lỗi lưu vào Supabase: ${dbError.message}`,
      };
    }

    // Instant revalidation
    revalidatePath("/");
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
