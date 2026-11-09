import { NextRequest, NextResponse } from "next/server";
import { submitToIndexNow, INDEXNOW_HOST } from "@/lib/indexnow";
import { cr7JournalArticles } from "@/data/cr7-journal";
import { getSupabaseServerClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

/**
 * On-Demand IndexNow API Route
 * Allows triggering instant search engine re-indexing for either:
 * - A specific URL passed in query / body (?url=...)
 * - Or all core pages on www.cr1000.live by default
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const targetUrl = searchParams.get("url");

    if (targetUrl) {
      const res = await submitToIndexNow([targetUrl]);
      return NextResponse.json(res);
    }

    // Default core site URLs
    const coreUrls = [
      `https://${INDEXNOW_HOST}`,
      `https://${INDEXNOW_HOST}/road-to-1000`,
      `https://${INDEXNOW_HOST}/hat-tricks`,
      `https://${INDEXNOW_HOST}/trophies`,
      `https://${INDEXNOW_HOST}/free-kicks`,
    ];

    // Collect article slugs from Supabase or fallback
    let articleSlugs: string[] = cr7JournalArticles.map((a) => a.slug);
    try {
      const supabase = getSupabaseServerClient();
      if (supabase) {
        const { data } = await supabase.from("journal_articles").select("slug");
        if (data && data.length > 0) {
          articleSlugs = Array.from(new Set([...articleSlugs, ...data.map((r: any) => r.slug)]));
        }
      }
    } catch (e) {}

    const allUrls = [
      ...coreUrls,
      ...articleSlugs.map((slug) => `https://${INDEXNOW_HOST}/road-to-1000/${slug}`),
    ];

    const result = await submitToIndexNow(allUrls);
    return NextResponse.json({
      message: "Submitted site URLs to IndexNow network",
      count: allUrls.length,
      result,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const urls = body.urls || (body.url ? [body.url] : []);
    const result = await submitToIndexNow(urls);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
