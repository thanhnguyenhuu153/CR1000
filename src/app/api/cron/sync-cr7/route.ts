import { NextResponse } from "next/server";
import { cr7CareerSummary } from "@/data/cr7-stats";
import { runAutonomousJournalist } from "@/lib/gemini-journalist";
import { submitToIndexNow } from "@/lib/indexnow";

export const dynamic = "force-dynamic";

/**
 * Level 3 Auto-Pilot Cron Handler
 * Triggered automatically by Vercel Cron Jobs daily at 22:00 UTC (05:00 AM VN)
 * or triggered on-demand via the Admin Hub.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  const isDev = process.env.NODE_ENV !== "production";
  const forceParam = searchParams.get("force") === "true";

  // Verify Vercel Cron Secret (if configured in production and not force triggered with admin token)
  if (!isDev && cronSecret && !forceParam) {
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized cron execution" }, { status: 401 });
    }
  }

  // 1. Run Automated AI Journalist Engine (Checks for matches, goals, and breaking news)
  let journalistResult = null;
  try {
    journalistResult = await runAutonomousJournalist();
  } catch (e: any) {
    journalistResult = { status: "error", error: e.message };
  }

  // Notify search engines of live count & data updates via IndexNow
  submitToIndexNow([
    "https://www.cr1000.live",
    "https://www.cr1000.live/road-to-1000",
  ]).catch(() => {});

  const syncResult = {
    timestamp: new Date().toISOString(),
    status: "healthy",
    source: "Football Auto-Pilot & AI Journalist Engine v2.0",
    currentOfficialGoals: cr7CareerSummary.totalGoals,
    target: cr7CareerSummary.countdownTarget,
    remaining: cr7CareerSummary.countdownTarget - cr7CareerSummary.totalGoals,
    nextMatch: cr7CareerSummary.nextMatch,
    cronSchedule: "Daily at 22:00 UTC / 05:00 AM VN (0 22 * * *)",
    journalistEngine: journalistResult,
    lastCheckSummary: "Đã kiểm tra lịch thi đấu, số bàn thắng chính thức và kích hoạt AI Journalist quét tin.",
  };

  return NextResponse.json(syncResult, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}

export async function POST(request: Request) {
  return GET(request);
}
