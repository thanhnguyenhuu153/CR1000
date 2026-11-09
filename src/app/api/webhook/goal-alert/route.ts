import { NextResponse } from "next/server";
import { cr7CareerSummary } from "@/data/cr7-stats";
import { submitToIndexNow } from "@/lib/indexnow";

export const dynamic = "force-dynamic";

/**
 * Level 3 Auto-Pilot Webhook Endpoint
 * Accepts incoming webhooks from sports trackers, Zapier, Make.com,
 * or custom notification bots when Ronaldo scores a new goal.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const expectedSecret = process.env.WEBHOOK_SECRET || "cr1000_secret_webhook_key";

    // Validate secret
    if (body.secret && body.secret !== expectedSecret) {
      return NextResponse.json(
        { error: "Invalid webhook secret" },
        { status: 403 }
      );
    }

    const newGoals = Number(body.goals || body.totalGoals);
    const matchName = body.match || "Trận đấu gần nhất của Al Nassr";
    const minute = body.minute ? `Phút ${body.minute}` : "Bàn thắng mới";

    if (!newGoals || isNaN(newGoals)) {
      return NextResponse.json(
        {
          error: "Vui lòng cung cấp tham số 'goals' (số nguyên)",
          received: body,
        },
        { status: 400 }
      );
    }

    // If GitHub PAT is provided in environment variables, auto-commit to GitHub repository
    const githubPat = process.env.GITHUB_PAT;
    let gitOpsCommitStatus = "skipped_no_token";

    if (githubPat) {
      try {
        const repo = "thanhnguyenhuu153/CR1000";
        const filePath = "src/data/cr7-stats.ts";
        
        // 1. Get existing file SHA
        const getFileRes = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
          headers: {
            Authorization: `token ${githubPat}`,
            Accept: "application/vnd.github.v3+json",
          },
        });

        if (getFileRes.ok) {
          const fileData = await getFileRes.json();
          const currentContent = Buffer.from(fileData.content, "base64").toString("utf-8");

          // Replace totalGoals: xxx with newGoals
          const updatedContent = currentContent.replace(
            /totalGoals:\s*\d+/,
            `totalGoals: ${newGoals}`
          );

          // 2. Commit updated file
          const commitRes = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
            method: "PUT",
            headers: {
              Authorization: `token ${githubPat}`,
              Accept: "application/vnd.github.v3+json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: `auto(cr7): update official goals to ${newGoals} (${matchName}) via Level 3 Auto-Pilot Webhook`,
              content: Buffer.from(updatedContent).toString("base64"),
              sha: fileData.sha,
              branch: "main",
            }),
          });

          if (commitRes.ok) {
            gitOpsCommitStatus = "success_committed_and_rebuilding";
          } else {
            gitOpsCommitStatus = "failed_commit_api";
          }
        }
      } catch (err) {
        gitOpsCommitStatus = "error_connecting_github";
      }
    }

    // Ping IndexNow network immediately so search engines update the live goal count
    submitToIndexNow([
      "https://www.cr1000.live",
      "https://www.cr1000.live/road-to-1000",
      "https://www.cr1000.live/hat-tricks",
      "https://www.cr1000.live/free-kicks",
    ]).catch(() => {});

    return NextResponse.json({
      status: "success",
      message: `Đã tiếp nhận bàn thắng mới thành công: ${newGoals} bàn (${matchName} - ${minute})`,
      currentGoals: newGoals,
      remainingToGo: Math.max(0, 1000 - newGoals),
      gitOpsTrigger: gitOpsCommitStatus,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Webhook processing error", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: "/api/webhook/goal-alert",
    status: "ready",
    method: "POST",
    expectedPayload: {
      secret: "cr1000_secret_webhook_key (hoặc WEBHOOK_SECRET env)",
      goals: 986,
      match: "Al Nassr vs Al Feiha",
      minute: 74,
    },
  });
}
