import { NextRequest, NextResponse } from "next/server";
import { runAutonomousJournalist } from "@/lib/gemini-journalist";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    let body: any = {};
    try {
      body = await req.json();
    } catch (e) {}

    const forceTopic = body?.topic;

    const result = await runAutonomousJournalist(forceTopic);

    if (result.status === "error") {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }

    if (result.status === "skipped") {
      return NextResponse.json({
        success: true,
        skipped: true,
        message: result.reason || "Bộ lọc chất lượng xác định không có sự kiện đủ lớn để lên bài.",
      });
    }

    return NextResponse.json({
      success: true,
      published: true,
      message: "AI đã tạo bài viết và xuất bản thành công lên Supabase & Website!",
      article: result.article,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
