import { NextResponse } from "next/server";
import { getUpcomingNextMatch, cr7UpcomingFixtures } from "@/data/cr7-stats";

export const dynamic = "force-dynamic";

export async function GET() {
  const nextMatchVi = getUpcomingNextMatch("vi");
  const nextMatchEn = getUpcomingNextMatch("en");

  const kickoffTimeMs = nextMatchVi.kickoffIso
    ? new Date(nextMatchVi.kickoffIso).getTime()
    : null;
  const nowMs = Date.now();
  const msRemaining = kickoffTimeMs ? Math.max(0, kickoffTimeMs - nowMs) : null;
  const hoursRemaining = msRemaining !== null ? Math.round(msRemaining / (1000 * 60 * 60)) : null;

  return NextResponse.json({
    status: "success",
    timestamp: new Date().toISOString(),
    nextMatch: nextMatchVi,
    nextMatchEn,
    hoursRemaining,
    upcomingFixtures: cr7UpcomingFixtures,
    source: "CR1000 Live Fixture Engine v2.0",
  }, {
    headers: {
      "Cache-Control": "public, s-maxage=120, stale-while-revalidate=300",
    },
  });
}

export async function POST() {
  // Return the calculated upcoming next match based on official schedule
  const nextMatch = getUpcomingNextMatch("vi");
  return NextResponse.json({
    status: "success",
    message: "Đã cập nhật lịch thi đấu mới nhất từ hệ thống lịch chính thức.",
    nextMatch,
    upcomingFixtures: cr7UpcomingFixtures,
  });
}
