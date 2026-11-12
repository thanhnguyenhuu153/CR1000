import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// In-memory fallback cache across serverless invocations within warm instances
const memoryClicks: Record<string, { count: number; platform?: string; lastClicked: string }> = {};

export async function GET() {
  try {
    const supabase = getSupabaseServerClient();
    const result: Record<string, number> = {};
    let totalClicks = 0;

    // Merge in-memory clicks first
    for (const [id, info] of Object.entries(memoryClicks)) {
      result[id] = info.count;
      totalClicks += info.count;
    }

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from("product_clicks")
          .select("product_id, click_count, platform, last_clicked_at");

        if (!error && Array.isArray(data)) {
          for (const row of data) {
            const pid = row.product_id;
            const count = Number(row.click_count) || 0;
            // Take the higher of database count or local memory count
            const finalCount = Math.max(result[pid] || 0, count);
            result[pid] = finalCount;
          }
          // Recalculate total clicks
          totalClicks = Object.values(result).reduce((acc, c) => acc + c, 0);
        }
      } catch (dbErr) {
        // Table might not exist yet, fallback to in-memory gracefully
      }
    }

    return NextResponse.json(
      {
        success: true,
        clicks: result,
        totalClicks,
        lastUpdated: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        },
      }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err.message,
        clicks: {},
        totalClicks: 0,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    let body: any = {};
    try {
      body = await req.json();
    } catch {
      const text = await req.text();
      body = JSON.parse(text || "{}");
    }

    const { productId, platform, source } = body;
    if (!productId || typeof productId !== "string") {
      return NextResponse.json({ error: "Missing productId" }, { status: 400 });
    }

    const cleanId = productId.trim();
    const now = new Date().toISOString();

    // 1. Update In-Memory
    if (!memoryClicks[cleanId]) {
      memoryClicks[cleanId] = { count: 1, platform, lastClicked: now };
    } else {
      memoryClicks[cleanId].count += 1;
      memoryClicks[cleanId].lastClicked = now;
      if (platform) memoryClicks[cleanId].platform = platform;
    }

    // 2. Persist to Supabase if connected
    const supabase = getSupabaseServerClient();
    if (supabase) {
      try {
        // Check existing row in product_clicks
        const { data: existing, error: fetchErr } = await supabase
          .from("product_clicks")
          .select("click_count")
          .eq("product_id", cleanId)
          .maybeSingle();

        if (!fetchErr) {
          if (existing) {
            const nextCount = (Number(existing.click_count) || 0) + 1;
            await supabase
              .from("product_clicks")
              .update({
                click_count: nextCount,
                last_clicked_at: now,
                platform: platform || undefined,
                updated_at: now,
              })
              .eq("product_id", cleanId);
          } else {
            await supabase.from("product_clicks").insert({
              product_id: cleanId,
              click_count: 1,
              platform: platform || "Shopee",
              source: source || "unknown",
              last_clicked_at: now,
              created_at: now,
              updated_at: now,
            });
          }
        }
      } catch (dbErr) {
        // Table might not exist yet, memory state still recorded
      }
    }

    return NextResponse.json({
      success: true,
      productId: cleanId,
      currentCount: memoryClicks[cleanId]?.count || 1,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");
    const secret = searchParams.get("secret");

    const adminPassword = process.env.ADMIN_PASSWORD || "cr7legend";
    if (secret && secret !== adminPassword) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (productId) {
      delete memoryClicks[productId];
    } else {
      for (const k of Object.keys(memoryClicks)) {
        delete memoryClicks[k];
      }
    }

    const supabase = getSupabaseServerClient();
    if (supabase) {
      try {
        let query = supabase.from("product_clicks").delete();
        if (productId) {
          query = query.eq("product_id", productId);
        } else {
          query = query.neq("product_id", "___none___");
        }
        await query;
      } catch (e) {}
    }

    return NextResponse.json({ success: true, message: "Đã làm mới số liệu click!" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
