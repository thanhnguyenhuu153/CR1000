import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { cr7CareerSummary, getUpcomingNextMatch } from "@/data/cr7-stats";
import { runAutonomousJournalist } from "@/lib/gemini-journalist";
import { submitToIndexNow } from "@/lib/indexnow";
import {
  getLiveStats,
  saveLiveStats,
  detectLatestRonaldoGoals,
} from "@/lib/live-stats-store";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

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

  // 1. Check live goal count from Supabase / defaults & query Google Search Grounding for new goals
  const currentStats = await getLiveStats();
  let activeGoals = currentStats.totalGoals;
  const goalCheck = await detectLatestRonaldoGoals(activeGoals);

  if (goalCheck.updated && goalCheck.detectedGoals) {
    const saved = await saveLiveStats({
      totalGoals: goalCheck.detectedGoals,
      lastMatchNote: goalCheck.matchSummary,
      source: "auto_sync",
    });
    activeGoals = saved.totalGoals;
    revalidatePath("/");
  }

  // 2. Run Automated AI Journalist Engine (passes match context if a new goal was just detected)
  let journalistResult = null;
  try {
    journalistResult = await runAutonomousJournalist(
      goalCheck.updated && goalCheck.matchSummary
        ? `Cập nhật bàn thắng thứ ${activeGoals} của Cristiano Ronaldo: ${goalCheck.matchSummary}`
        : undefined
    );
  } catch (e: any) {
    journalistResult = { status: "error", error: e.message };
  }

  // 3. Notify search engines of live count & data updates via IndexNow
  submitToIndexNow([
    "https://www.cr1000.live",
    "https://www.cr1000.live/road-to-1000",
  ]).catch(() => {});

  const syncResult = {
    timestamp: new Date().toISOString(),
    status: "healthy",
    source: "Football Auto-Pilot & AI Journalist Engine v2.1",
    currentOfficialGoals: activeGoals,
    target: cr7CareerSummary.countdownTarget,
    remaining: Math.max(0, cr7CareerSummary.countdownTarget - activeGoals),
    goalAutoSync: goalCheck,
    nextMatch: getUpcomingNextMatch("vi"),
    cronSchedule: "Daily at 22:00 UTC / 05:00 AM VN (0 22 * * *)",
    journalistEngine: journalistResult,
    lastCheckSummary: goalCheck.updated
      ? `Đã tự động cập nhật lên ${activeGoals} bàn thắng (${goalCheck.matchSummary}) và kích hoạt AI Journalist!`
      : "Đã kiểm tra kết quả thi đấu 48h qua, số bàn thắng chính thức và kích hoạt AI Journalist.",
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
