import { getSupabaseServerClient } from "./supabase";
import { revalidatePath } from "next/cache";
import { submitToIndexNow } from "./indexnow";

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

  // System prompt enforcing strict anti-AI tone, sports journalism, and GEO/AIO criteria
  const systemPrompt = `
Bạn là Trưởng ban Biên tập thể thao của bảo tàng số quốc tế CR1000 (cr1000.live) - nơi theo dõi hành trình lịch sử tới 1.000 bàn thắng của Cristiano Ronaldo.
Nhiệm vụ của bạn: Sản xuất các bài viết ký sự thể thao chuyên sâu song ngữ (Tiếng Việt & English) bao quát TOÀN BỘ sự nghiệp vĩ đại của Cristiano Ronaldo (Sporting CP, Manchester United, Real Madrid, Juventus, Al Nassr và ĐTQG Bồ Đào Nha), đạt chuẩn SEO & AIO/GEO (Generative Engine Optimization).

TIÊU CHUẨN BIÊN TẬP BẮT BUỘC:
1. ĐA DẠNG CHỦ ĐỀ & KHÔNG BỊ GIỚI HẠN:
   - Bạn có thể khai thác bất kỳ khía cạnh nào trong sự nghiệp 23+ năm của CR7: Các trận đấu mới nhất, dư âm các sự kiện nóng (như giã từ ĐTQG Bồ Đào Nha), phân tích chiến thuật, giải mã kỹ năng cơ học (bật nhảy 2.56m, knuckleball), so sánh số liệu với các huyền thoại (Pele, Messi, Romario), hoặc phân tích xác suất chạm mốc 1.000 bàn.
   - Nếu hôm nay không có trận đấu mới, hãy chọn một góc nhìn phân tích lịch sử hoặc chuyên đề số liệu độc bản có tính trường tồn (Evergreen & Data-driven) để độc giả luôn có nội dung chất lượng cao.

2. PHONG CÁCH VIẾT BÁO CHÍ THỂ THAO CAO CẤP (ANTI-AI TONE):
   - CẤM TUYỆT ĐỐI các cụm từ sáo rỗng AI: "Trong thế giới bóng đá", "Không thể phủ nhận rằng", "Tóm lại", "Một huyền thoại sống", "Hãy cùng bước vào hành trình".
   - BẮT BUỘC dùng văn phong ký sự thể thao giàu chuyên môn và nhịp thở sân cỏ (tương đương The Athletic, L'Équipe, Reuters): Sử dụng thuật ngữ chuyên môn (xG, cự ly dứt điểm, cú sút knuckleball, pressing, chạm bóng bước một, box-to-box, poacher, quãng nghỉ chuyển hóa metabolic...).

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
    : `Hãy quét toàn bộ dòng tin tức và các chủ đề thể thao nóng nhất xung quanh Cristiano Ronaldo (bao gồm các trận đấu mới nhất của Al Nassr, dư âm quyết định giã từ ĐTQG Bồ Đào Nha, các cột mốc kỷ lục hoặc phân tích cuộc đua tới 1.000 bàn thắng). Chọn ra một chủ đề hấp dẫn nhất và viết một bài ký sự thể thao chuyên sâu đạt điểm 10 về chất lượng nội dung.`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const requestBody = {
      contents: [
        {
          role: "user",
          parts: [{ text: `${systemPrompt}\n\n${userQuery}` }],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.3,
      },
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errText = await response.text();
      return {
        status: "error",
        error: `Lỗi gọi Gemini API (${response.status}): ${errText}`,
      };
    }

    const data = await response.json();
    const rawContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawContent) {
      return {
        status: "error",
        error: "Không nhận được phản hồi nội dung từ Gemini.",
      };
    }

    const articleData = JSON.parse(rawContent);

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

    const payload = {
      id: `art_auto_${Date.now()}`,
      slug: articleData.slug,
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
