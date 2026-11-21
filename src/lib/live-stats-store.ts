import { getSupabaseServerClient } from "./supabase";
import { cr7CareerSummary } from "@/data/cr7-stats";

export interface LiveStatsRecord {
  totalGoals: number;
  totalMatches: number;
  lastMatchNote?: string;
  updatedAt: string;
  source: "default" | "memory" | "supabase" | "auto_sync";
}

let memoryStats: LiveStatsRecord | null = null;

export async function getLiveStats(): Promise<LiveStatsRecord> {
  const baseline: LiveStatsRecord = {
    totalGoals: cr7CareerSummary.totalGoals,
    totalMatches: cr7CareerSummary.totalMatches,
    updatedAt: new Date().toISOString(),
    source: "default",
  };

  let best = memoryStats && memoryStats.totalGoals >= baseline.totalGoals ? memoryStats : baseline;

  try {
    const supabase = getSupabaseServerClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("site_settings")
        .select("value, updated_at")
        .eq("key", "cr7_live_stats")
        .maybeSingle();

      if (!error && data?.value) {
        const dbGoals = Number(data.value.totalGoals) || 0;
        if (dbGoals >= best.totalGoals) {
          best = {
            totalGoals: dbGoals,
            totalMatches: Number(data.value.totalMatches) || best.totalMatches,
            lastMatchNote: data.value.lastMatchNote,
            updatedAt: data.updated_at || new Date().toISOString(),
            source: "supabase",
          };
        }
      }
    }
  } catch (e) {
    // Table site_settings might not exist yet; gracefully keep baseline/memory
  }

  return best;
}

export async function saveLiveStats(update: {
  totalGoals: number;
  totalMatches?: number;
  lastMatchNote?: string;
  source?: LiveStatsRecord["source"];
}): Promise<LiveStatsRecord> {
  const now = new Date().toISOString();
  const nextRecord: LiveStatsRecord = {
    totalGoals: update.totalGoals,
    totalMatches:
      update.totalMatches ||
      cr7CareerSummary.totalMatches + Math.max(0, update.totalGoals - cr7CareerSummary.totalGoals),
    lastMatchNote: update.lastMatchNote,
    updatedAt: now,
    source: update.source || "supabase",
  };

  memoryStats = nextRecord;

  try {
    const supabase = getSupabaseServerClient();
    if (supabase) {
      await supabase.from("site_settings").upsert(
        {
          key: "cr7_live_stats",
          value: {
            totalGoals: nextRecord.totalGoals,
            totalMatches: nextRecord.totalMatches,
            lastMatchNote: nextRecord.lastMatchNote,
          },
          updated_at: now,
        },
        { onConflict: "key" }
      );
    }
  } catch (e) {
    // Graceful fallback to memory if site_settings table not created yet
  }

  return nextRecord;
}

/**
 * Queries Gemini with Google Search Grounding to check if Cristiano Ronaldo
 * scored any official goals in the last 48 hours and returns verified total.
 */
export async function detectLatestRonaldoGoals(currentGoals: number): Promise<{
  checked: boolean;
  updated: boolean;
  detectedGoals?: number;
  matchSummary?: string;
  reason?: string;
}> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return { checked: false, updated: false, reason: "Missing GEMINI_API_KEY" };
  }

  const todayIso = new Date().toISOString().split("T")[0];
  const prompt = `Today is ${todayIso}. Search the latest football match results for Cristiano Ronaldo (Al Nassr) in the last 48 hours.
Our database currently records his official senior career goal total as ${currentGoals}.
Did Cristiano Ronaldo score any official senior goals in the last 48 hours?
Return ONLY valid JSON (no markdown fences) with this exact schema:
{
  "scoredRecently": true | false,
  "goalsScoredInMatch": 0,
  "newOfficialTotal": ${currentGoals},
  "matchSummary": "Short summary e.g. Al-Ahli 3-1 Al-Nassr (2026-11-20): Ronaldo scored 1 goal in min 14"
}`;

  const groundingModels = Array.from(
    new Set([
      process.env.GEMINI_MODEL || "gemini-3.8-flash",
      "gemini-3.8-flash",
      "gemini-3.6-flash",
      "gemini-2.0-flash",
    ])
  );

  for (const modelName of groundingModels) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          tools: [{ google_search: {} }],
          generationConfig: { temperature: 0.1 },
        }),
        signal: AbortSignal.timeout(12000),
      });

      if (!res.ok) continue;

      const json = await res.json();
      const rawText: string = json?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      const cleaned = rawText
        .trim()
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "");

      const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
      if (!jsonMatch) continue;

      const parsed = JSON.parse(jsonMatch[0]);
      const candidateTotal = Number(parsed.newOfficialTotal);

      // Strict anti-hallucination guard: only accept +1 to +4 goals above current stored total
      if (
        parsed.scoredRecently === true &&
        Number.isInteger(candidateTotal) &&
        candidateTotal > currentGoals &&
        candidateTotal <= currentGoals + 4
      ) {
        return {
          checked: true,
          updated: true,
          detectedGoals: candidateTotal,
          matchSummary: parsed.matchSummary || `Ronaldo scored to reach ${candidateTotal} goals`,
        };
      }

      return {
        checked: true,
        updated: false,
        detectedGoals: currentGoals,
        matchSummary: parsed.matchSummary || "No new official goals detected in last 48h",
      };
    } catch (e) {
      continue;
    }
  }

  return { checked: false, updated: false, reason: "Search grounding unavailable" };
}
