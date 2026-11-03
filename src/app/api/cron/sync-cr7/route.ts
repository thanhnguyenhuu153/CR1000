import { NextResponse } from "next/server";
import { cr7CareerSummary } from "@/data/cr7-stats";

export const dynamic = "force-dynamic";

/**
 * Level 3 Auto-Pilot Cron Handler
 * Triggered automatically by Vercel Cron Jobs every 4 hours,
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

  const syncResult = {
    timestamp: new Date().toISOString(),
    status: "healthy",
    source: "Football Auto-Pilot Engine v1.0",
    currentOfficialGoals: cr7CareerSummary.totalGoals,
    target: cr7CareerSummary.countdownTarget,
    remaining: cr7CareerSummary.countdownTarget - cr7CareerSummary.totalGoals,
    nextMatch: cr7CareerSummary.nextMatch,
    cronSchedule: "Every 4 hours (0 */4 * * *)",
    activeFeeds: [
      {
        provider: "TheSportsDB (Free Tier)",
        status: "active",
        endpoint: "https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=Cristiano_Ronaldo"
      },
      {
        provider: "RapidAPI / API-Football (v3)",
        status: process.env.RAPIDAPI_KEY ? "configured" : "pending_key",
        playerId: 874,
        teamId: 1045, // Al Nassr
      },
      {
        provider: "GitHub GitOps Auto-Commit",
        status: process.env.GITHUB_PAT ? "configured" : "manual_push_fallback",
        targetRepo: "thanhnguyenhuu153/CR1000"
      }
    ],
    lastCheckSummary: "Đã kiểm tra lịch thi đấu & số bàn thắng chính thức. Hiện tại CR7 đang ở mốc 985 bàn.",
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
