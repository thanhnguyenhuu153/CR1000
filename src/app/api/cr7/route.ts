import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { cr7CareerSummary, getUpcomingNextMatch } from "@/data/cr7-stats";
import { cr7HattrickStats } from "@/data/cr7-hattricks";
import { cr7TrophySummary } from "@/data/cr7-trophies";
import { getLiveStats, saveLiveStats } from "@/lib/live-stats-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const live = await getLiveStats();
  const totalGoals = live.totalGoals;
  const goalsRemaining = Math.max(0, cr7CareerSummary.countdownTarget - totalGoals);

  return NextResponse.json(
    {
      status: "success",
      timestamp: new Date().toISOString(),
      source: live.source,
      player: {
        name: "Cristiano Ronaldo",
        nickname: "CR7",
        nationality: "Portugal",
        currentClub: "Al Nassr",
      },
      goals: {
        officialTotal: totalGoals,
        target: cr7CareerSummary.countdownTarget,
        goalsRemaining,
        percentage: Number(((totalGoals / cr7CareerSummary.countdownTarget) * 100).toFixed(2)),
      },
      matches: live.totalMatches,
      assists: cr7CareerSummary.totalAssists,
      minutesPerGoal: cr7CareerSummary.minutesPerGoal,
      hattricks: cr7HattrickStats,
      trophies: cr7TrophySummary,
      nextMatch: getUpcomingNextMatch("vi"),
      lastMatchNote: live.lastMatchNote,
      verification: "FIFA, UEFA, IFFHS & RSSSF Certified",
    },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const newGoals = Number(body.goals ?? body.totalGoals);

    if (!newGoals || isNaN(newGoals) || newGoals < cr7CareerSummary.totalGoals) {
      return NextResponse.json(
        { error: "Số bàn thắng không hợp lệ." },
        { status: 400 }
      );
    }

    const saved = await saveLiveStats({
      totalGoals: newGoals,
      lastMatchNote: body.matchNote || undefined,
      source: "supabase",
    });

    revalidatePath("/");

    return NextResponse.json({
      success: true,
      officialTotal: saved.totalGoals,
      goalsRemaining: Math.max(0, cr7CareerSummary.countdownTarget - saved.totalGoals),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
