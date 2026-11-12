import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "@/lib/supabase";
import { cr7JournalArticles, JournalArticle } from "@/data/cr7-journal";
import { submitToIndexNow } from "@/lib/indexnow";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({
        source: "fallback",
        articles: cr7JournalArticles,
      });
    }

    const { data, error } = await supabase
      .from("journal_articles")
      .select("*")
      .order("published_date", { ascending: false });

    if (error || !data || data.length === 0) {
      return NextResponse.json({
        source: "fallback",
        articles: cr7JournalArticles,
      });
    }

    // Map database snake_case to camelCase
    const formatted: JournalArticle[] = data.map((row: any) => ({
      id: row.id,
      slug: row.slug,
      titleVi: row.title_vi,
      titleEn: row.title_en,
      excerptVi: row.excerpt_vi,
      excerptEn: row.excerpt_en,
      categoryVi: row.category_vi,
      categoryEn: row.category_en,
      categorySlug: row.category_slug,
      publishedDate: row.published_date,
      readTimeVi: row.read_time_vi,
      readTimeEn: row.read_time_en,
      author: row.author,
      coverImage: row.cover_image,
      isFeatured: row.is_featured,
      tags: row.tags || [],
      quickTakeawayVi: row.quick_takeaway_vi,
      quickTakeawayEn: row.quick_takeaway_en,
      keyStats: row.key_stats || [],
      sectionsVi: row.sections_vi || [],
      sectionsEn: row.sections_en || [],
      faqsVi: row.faqs_vi || [],
      faqsEn: row.faqs_en || [],
    }));

    // Supabase là nguồn dữ liệu độc lập 100% (Single Source of Truth) khi đã có bài viết.
    // Tuyệt đối không tự động ghi đè hay gộp từ mã nguồn vào Supabase khi tải danh sách.
    return NextResponse.json({
      source: "supabase",
      articles: formatted,
    }, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { source: "fallback", articles: cr7JournalArticles, error: err.message },
      { status: 200 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { article, secret } = body;

    // Optional admin authorization check
    const adminPassword = process.env.ADMIN_PASSWORD || "cr7legend";
    if (secret && secret !== adminPassword) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase chưa được cấu hình biến môi trường." },
        { status: 400 }
      );
    }

    const payload = {
      id: article.id || `art_${Date.now()}`,
      slug: article.slug,
      title_vi: article.titleVi,
      title_en: article.titleEn,
      excerpt_vi: article.excerptVi,
      excerpt_en: article.excerptEn,
      category_vi: article.categoryVi,
      category_en: article.categoryEn,
      category_slug: article.categorySlug,
      published_date: article.publishedDate || new Date().toISOString().split("T")[0],
      read_time_vi: article.readTimeVi || "5 phút đọc",
      read_time_en: article.readTimeEn || "5 min read",
      author: article.author || "CR1000 Editorial Team",
      cover_image: article.coverImage || "/images/cr7/hero-cr7.jpg",
      is_featured: Boolean(article.isFeatured),
      tags: article.tags || [],
      quick_takeaway_vi: article.quickTakeawayVi,
      quick_takeaway_en: article.quickTakeawayEn,
      key_stats: article.keyStats || [],
      sections_vi: article.sectionsVi || [],
      sections_en: article.sectionsEn || [],
      faqs_vi: article.faqsVi || [],
      faqs_en: article.faqsEn || [],
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("journal_articles")
      .upsert(payload, { onConflict: "slug" })
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Instant On-Demand Revalidation: Updates the website in 0.5s without redeploying code!
    revalidatePath("/road-to-1000");
    revalidatePath(`/road-to-1000/${article.slug}`);
    revalidatePath("/sitemap.xml");

    // IndexNow Real-time Search Engine Notification
    submitToIndexNow([
      `https://www.cr1000.live/road-to-1000/${article.slug}`,
      "https://www.cr1000.live/road-to-1000",
      "https://www.cr1000.live",
    ]).catch(() => {});

    return NextResponse.json({
      success: true,
      message: "Bài viết đã được xuất bản và kích hoạt hiển thị tức thì trên web!",
      data,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const slug = searchParams.get("slug");

    if (!id && !slug) {
      return NextResponse.json({ error: "Missing id or slug" }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 400 });
    }

    let query = supabase.from("journal_articles").delete();
    if (id) query = query.eq("id", id);
    else if (slug) query = query.eq("slug", slug);

    const { error } = await query;
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    revalidatePath("/road-to-1000");
    if (slug) revalidatePath(`/road-to-1000/${slug}`);
    revalidatePath("/sitemap.xml");

    return NextResponse.json({ success: true, message: "Bài viết đã được xóa thành công!" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
