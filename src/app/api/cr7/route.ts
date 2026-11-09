import { NextResponse } from "next/server";
import { cr7CareerSummary, getUpcomingNextMatch } from "@/data/cr7-stats";
import { cr7HattrickStats } from "@/data/cr7-hattricks";
import { cr7TrophySummary } from "@/data/cr7-trophies";

export async function GET() {
  return NextResponse.json({
    status: "success",
    timestamp: new Date().toISOString(),
    player: {
      name: "Cristiano Ronaldo",
      nickname: "CR7",
      nationality: "Portugal",
      currentClub: "Al Nassr",
    },
    goals: {
      officialTotal: cr7CareerSummary.totalGoals,
      target: cr7CareerSummary.countdownTarget,
      goalsRemaining: cr7CareerSummary.goalsNeeded,
      percentage: Number(((cr7CareerSummary.totalGoals / cr7CareerSummary.countdownTarget) * 100).toFixed(2)),
    },
    matches: cr7CareerSummary.totalMatches,
    assists: cr7CareerSummary.totalAssists,
    minutesPerGoal: cr7CareerSummary.minutesPerGoal,
    hattricks: cr7HattrickStats,
    trophies: cr7TrophySummary,
    nextMatch: getUpcomingNextMatch("vi"),
    verification: "FIFA, UEFA, IFFHS & RSSSF Certified",
  }, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
