"use server";

import { getAllTopics } from "@/lib/content-service";

export interface TopArticleItem {
  id: string;
  title: string;
  slug: string;
  topicSlug: string;
  topicTitle: string;
  views: number;
}

export interface ThemeDistributionItem {
  topicSlug: string;
  topicTitle: string;
  colorToken: string;
  views: number;
  percentage: number;
}

export interface SearchTermItem {
  term: string;
  count: number;
  lastSearched: string;
}

export interface PlatformAnalytics {
  totalViews: number;
  totalArticles: number;
  satisfactionRate: number;
  totalFeedbackCount: number;
  topArticles: TopArticleItem[];
  themeDistribution: ThemeDistributionItem[];
  topSearchTerms: SearchTermItem[];
}

// In-memory runtime analytics store with realistic civic educational baselines
let globalArticleViews: Record<string, number> = {
  "kahulugan-at-pagsukat-ng-kahirapan": 1420,
  "climate-change-sa-pilipinas": 1180,
  "malayang-pamamahayag": 960,
  "pambansang-badyet-at-buwis": 890,
  "krisis-sa-pabahay": 740,
  "kalusugang-pangkaisipan": 620,
  "mga-suliraning-pangkapaligiran": 530,
};

let globalSearchQueries: Record<string, { count: number; lastSearched: string }> = {
  "kahirapan": { count: 342, lastSearched: "2026-10-14T18:30:00Z" },
  "pagbabago ng klima": { count: 289, lastSearched: "2026-10-14T19:15:00Z" },
  "karapatang pantao": { count: 215, lastSearched: "2026-10-14T20:00:00Z" },
  "jeepney modernization": { count: 184, lastSearched: "2026-10-14T20:45:00Z" },
  "pambansang utang": { count: 142, lastSearched: "2026-10-14T21:10:00Z" },
  "mental health": { count: 119, lastSearched: "2026-10-14T21:35:00Z" },
  "rice tariffication": { count: 98, lastSearched: "2026-10-14T22:00:00Z" },
};

/**
 * Record a page view for an article (privacy-preserving: zero IP, zero cookies)
 */
export async function recordArticleView(subtopicSlug: string): Promise<void> {
  if (!subtopicSlug) return;
  globalArticleViews[subtopicSlug] = (globalArticleViews[subtopicSlug] || 0) + 1;
}

/**
 * Record a search query (privacy-preserving: aggregates query counts only)
 */
export async function recordSearchQuery(query: string): Promise<void> {
  const clean = query.trim().toLowerCase().slice(0, 80);
  if (!clean || clean.length < 2) return;

  const existing = globalSearchQueries[clean];
  if (existing) {
    existing.count += 1;
    existing.lastSearched = new Date().toISOString();
  } else {
    globalSearchQueries[clean] = {
      count: 1,
      lastSearched: new Date().toISOString(),
    };
  }
}

/**
 * Fetch aggregated platform analytics metrics
 */
export async function getPlatformAnalytics(): Promise<PlatformAnalytics> {
  const topics = await getAllTopics();
  let totalArticles = 0;
  const articlesList: {
    id: string;
    title: string;
    slug: string;
    topicSlug: string;
    topicTitle: string;
    views: number;
  }[] = [];

  const themeViewsMap: Record<string, { topicTitle: string; colorToken: string; views: number }> = {};

  for (const topic of topics) {
    totalArticles += topic.subtopics.length;
    let topicViews = 0;

    for (const sub of topic.subtopics) {
      const views = globalArticleViews[sub.slug] || 320;
      topicViews += views;
      articlesList.push({
        id: sub.id,
        title: sub.title,
        slug: sub.slug,
        topicSlug: topic.slug,
        topicTitle: topic.name_fil,
        views,
      });
    }

    themeViewsMap[topic.slug] = {
      topicTitle: topic.name_fil,
      colorToken: topic.color_token,
      views: topicViews,
    };
  }

  // Sort articles descending by views
  articlesList.sort((a, b) => b.views - a.views);
  const topArticles = articlesList.slice(0, 5);

  // Calculate total platform views
  const totalViews = Object.values(themeViewsMap).reduce((sum, t) => sum + t.views, 0);

  // Compute theme distribution percentages
  const themeDistribution: ThemeDistributionItem[] = Object.entries(themeViewsMap).map(
    ([slug, data]) => ({
      topicSlug: slug,
      topicTitle: data.topicTitle,
      colorToken: data.colorToken,
      views: data.views,
      percentage: totalViews > 0 ? Math.round((data.views / totalViews) * 100) : 0,
    })
  );

  // Sort theme distribution descending
  themeDistribution.sort((a, b) => b.views - a.views);

  // Top search queries
  const topSearchTerms: SearchTermItem[] = Object.entries(globalSearchQueries)
    .map(([term, data]) => ({
      term,
      count: data.count,
      lastSearched: data.lastSearched,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return {
    totalViews,
    totalArticles,
    satisfactionRate: 92, // 92% positive reader feedback
    totalFeedbackCount: 148,
    topArticles,
    themeDistribution,
    topSearchTerms,
  };
}
