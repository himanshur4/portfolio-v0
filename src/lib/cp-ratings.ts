import { cacheLife } from "next/cache";

import type { Platform, PracticeProfile } from "@/data/types";

/** What a platform reports: the live rating and the highest it has on record. */
interface PlatformRating {
  rating: number;
  maxRating: number;
}

const TIMEOUT_MS = 5000;

async function request(url: string, init?: RequestInit): Promise<Response> {
  const response = await fetch(url, {
    ...init,
    // getMaxRating caches the result. Without this, a build can reuse responses from an older build.
    cache: "no-store",
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: { "User-Agent": "himanshu-portfolio/1.0", ...init?.headers },
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response;
}

const LEETCODE_QUERY = `query ($handle: String!) {
  userContestRanking(username: $handle) { rating }
  userContestRankingHistory(username: $handle) { rating attended }
}`;

async function fetchLeetCode(handle: string): Promise<PlatformRating> {
  const response = await request("https://leetcode.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json", Referer: "https://leetcode.com" },
    body: JSON.stringify({ query: LEETCODE_QUERY, variables: { handle } }),
  });
  const { data } = (await response.json()) as {
    data: {
      userContestRanking: { rating: number };
      userContestRankingHistory: { rating: number; attended: boolean }[];
    };
  };
  const attended = data.userContestRankingHistory.filter((contest) => contest.attended);
  return {
    rating: Math.round(data.userContestRanking.rating),
    maxRating: Math.round(Math.max(...attended.map((contest) => contest.rating))),
  };
}

async function fetchCodeforces(handle: string): Promise<PlatformRating> {
  const response = await request(`https://codeforces.com/api/user.info?handles=${handle}`);
  const { result } = (await response.json()) as {
    result: { rating: number; maxRating: number }[];
  };
  const [user] = result;
  return { rating: user.rating, maxRating: user.maxRating };
}

async function fetchAtCoder(handle: string): Promise<PlatformRating> {
  const response = await request(`https://atcoder.jp/users/${handle}/history/json`);
  const history = (await response.json()) as { IsRated: boolean; NewRating: number }[];
  const rated = history.filter((contest) => contest.IsRated).map((contest) => contest.NewRating);
  return { rating: rated[rated.length - 1], maxRating: Math.max(...rated) };
}

/** CodeChef has no public API, so this reads the profile page. */
async function fetchCodeChef(handle: string): Promise<PlatformRating> {
  const response = await request(`https://www.codechef.com/users/${handle}`);
  const html = await response.text();
  const current = html.match(/class="rating-number">\s*(\d+)/);
  // The page has a second, unused rating card, so the maximum is the first one after the rating.
  const highest = current && html.slice(current.index).match(/Highest Rating\s+(\d+)/);
  return { rating: Number(current?.[1]), maxRating: Number(highest?.[1]) };
}

const fetchers: Record<Platform, (handle: string) => Promise<PlatformRating>> = {
  LeetCode: fetchLeetCode,
  Codeforces: fetchCodeforces,
  AtCoder: fetchAtCoder,
  CodeChef: fetchCodeChef,
};

/**
 * A profile's highest rating. It rises when a live rating beats the old maximum and never
 * drops below the value in portfolio.ts. That value is also shown if the platform can't be
 * reached or its response has changed shape.
 *
 * The page stays static: a visit after an hour shows the cached value and refreshes it in
 * the background for the next visitor. After a day with no visits, the next visit waits
 * for a fresh one.
 */
export async function getMaxRating(profile: PracticeProfile): Promise<number> {
  "use cache";
  cacheLife("hours");

  try {
    const { rating, maxRating } = await fetchers[profile.platform](profile.handle);
    if (!(rating > 0 && maxRating > 0)) {
      throw new Error(`unexpected values ${rating}, ${maxRating}`);
    }
    return Math.max(profile.maxRating, rating, maxRating);
  } catch (error) {
    console.warn(`Using the stored ${profile.platform} max rating: ${String(error)}`);
    return profile.maxRating;
  }
}
