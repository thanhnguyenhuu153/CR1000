import { getSupabaseServerClient } from "./supabase";
import { revalidatePath } from "next/cache";

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
Bạn là Trưởng ban Biên tập thể thao của bảo tàng số quốc tế CR1000 (cr1000.live).
Nhiệm vụ của bạn: Quét và phân tích sự kiện mới nhất về Cristiano Ronaldo (CR7), sau đó xuất ra bài viết song ngữ (Tiếng Việt & English) đạt chuẩn báo chí thể thao cao cấp và chuẩn AIO/GEO (Generative Engine Optimization).

TIÊU CHUẨN BIÊN TẬP BẮT BUỘC:
1. QUY TẮC PHÒNG NGỰ (CHỐNG LÁ CẢI):
   - Chỉ viết khi có sự kiện thực tế quan trọng trong 24-48h qua: Trận đấu mới, bàn thắng mới, kiến tạo, phát biểu lịch sử, danh hiệu, hoặc bước ngoặt sự nghiệp (như giã từ ĐTQG Bồ Đào Nha).
   - Nếu không có sự kiện thể thao đáng kể trong 24h qua, trả về JSON với "skip": true và "reason": "Không có sự kiện thể thao nổi bật".

2. PHONG CÁCH VIẾT BÁO CHÍ (ANTI-AI TONE):
   - CẤM TUYỆT ĐỐI các cụm từ sáo rỗng AI: "Trong thế giới bóng đá", "Không thể phủ nhận rằng", "Tóm lại", "Một huyền thoại sống", "Hãy cùng bước vào hành trình".
   - BẮT BUỘC dùng văn phong ký sự thể thao chuyên nghiệp (tương đương The Athletic, L'Équipe, Reuters): Sử dụng thuật ngữ chuyên môn (xG, cự ly sút, cú sút knuckleball, pressing, chạm bóng bước một, box-to-box, quãng nghỉ chuyển hóa...).

3. AIO & GEO (GENERATIVE ENGINE OPTIMIZATION):
   - quickTakeaway: Đoạn tóm tắt 2-3 câu trả lời trực diện facts (thời gian, đối thủ, số bàn thắng chính thức, số bàn còn lại tới mốc 1.000). Đây là phần Google AI Overview và Perplexity sẽ trích dẫn.
   - Luôn gắn liền sự kiện với "Hành trình tới 1.000 bàn thắng" (Hiện tại đã ghi 985 bàn, đếm ngược còn 15 bàn).

4. ĐỊNH DẠNG ĐẦU RA BẮT BUỘC (JSON ONLY):
Trả về duy nhất 1 chuỗi JSON hợp lệ với cấu trúc sau:
{
  "skip": false,
  "titleVi": "Tiêu đề tiếng Việt sắc sảo, có số liệu",
  "titleEn": "English Title in high-end sports journalism style",
  "slug": "duong-dan-tinh-khong-dau-ngan-gon",
  "categoryVi": "Tin Nóng & Bước Ngoặt" | "Phân Tích Số Liệu" | "Kỷ Lục & Di Sản",
  "categoryEn": "Breaking & Milestones" | "Data & Forecast" | "Legacy & Records",
  "categorySlug": "breaking" | "data" | "legacy",
  "excerptVi": "Trích dẫn 2-3 câu ngắn gọn",
  "excerptEn": "English short excerpt",
  "quickTakeawayVi": "Tóm tắt cốt lõi cho Google AI trích nguồn",
  "quickTakeawayEn": "Key takeaway for AI search citations",
  "coverImage": "/images/cr7/era-alnassr.jpg" (hoặc /images/cr7/era-portugal.jpg hoặc /images/cr7/hero-cr7.jpg),
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
    { "question": "Câu hỏi phổ biến 1?", "answer": "Câu trả lời ngắn gọn, chuẩn xác..." }
  ],
  "faqsEn": [
    { "question": "Frequently asked question 1?", "answer": "Direct factual answer..." }
  ]
}
`;

  const userQuery = forceTopic
    ? `Hãy viết một bài báo phân tích chuyên sâu về chủ đề sau đây: "${forceTopic}". Đảm bảo tuân thủ mọi nguyên tắc phong cách, AIO và cấu trúc JSON.`
    : `Hãy tìm kiếm và quét thông tin mới nhất về Cristiano Ronaldo trong 24-48 giờ qua (các trận đấu gần nhất của Al Nassr tại Saudi Pro League/AFC Champions League, hoặc sự kiện ĐTQG). Nếu có sự kiện nổi bật, hãy viết một bài phân tích chuyên sâu chuẩn mực. Nếu không có trận đấu hay sự kiện thể thao lớn nào, hãy trả về JSON với "skip": true.`;

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
