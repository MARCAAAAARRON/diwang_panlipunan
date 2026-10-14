import { createClient } from "@/lib/supabase/server";
import { getAllTopics } from "@/lib/content-service";

export interface SearchResultItem {
  id: string;
  title: string;
  slug: string;
  topicSlug: string;
  topicNameFil: string;
  topicColorToken: string;
  summary: string;
  matchedSnippet: string;
  readTimeMinutes: number;
}

export type SearchResult = SearchResultItem;


/**
 * Helper to extract an excerpt snippet around query terms
 */
function extractSnippet(text: string, query: string, maxLength: number = 140): string {
  if (!text) return "";
  const cleaned = text.replace(/#+|>|\*+|\[\^?\d+\]|\[.*?\]\(.*?\)/g, " ").replace(/\s+/g, " ").trim();
  const lowerText = cleaned.toLowerCase();
  const lowerQuery = query.toLowerCase().trim();

  // Find position of the query or first query word
  const words = lowerQuery.split(/\s+/).filter((w) => w.length > 2);
  let matchIndex = -1;

  for (const word of words) {
    const idx = lowerText.indexOf(word);
    if (idx !== -1) {
      matchIndex = idx;
      break;
    }
  }

  if (matchIndex === -1) {
    return cleaned.slice(0, maxLength) + (cleaned.length > maxLength ? "..." : "");
  }

  const start = Math.max(0, matchIndex - 40);
  const end = Math.min(cleaned.length, matchIndex + maxLength - 40);
  const prefix = start > 0 ? "..." : "";
  const suffix = end < cleaned.length ? "..." : "";

  return prefix + cleaned.slice(start, end).trim() + suffix;
}

/**
 * Bilingual Full-Text Search with PostgreSQL tsvector and resilient in-memory fallback
 */
export async function searchContent(query: string): Promise<SearchResultItem[]> {
  const sanitized = query.trim().slice(0, 100);
  if (!sanitized || sanitized.length < 2) {
    return [];
  }

  try {
    const supabase = await createClient();
    const { data, error } = await (supabase.from("subtopics") as any)
      .select("*, topic:topics(*)")
      .textSearch("search_vector", sanitized, {
        config: "simple",
        type: "websearch",
      })
      .eq("is_published", true)
      .limit(15);

    if (!error && data && data.length > 0) {
      return data.map((item: any) => {
        const topic = item.topic || {};
        const snippetSource = item.summary || item.content_markdown || "";
        return {
          id: item.id,
          title: item.title,
          slug: item.slug,
          topicSlug: topic.slug || "kapaligiran",
          topicNameFil: topic.name_fil || "Paksa",
          topicColorToken: topic.color_token || "--topic-kapaligiran",
          summary: item.summary || "",
          matchedSnippet: extractSnippet(snippetSource, sanitized),
          readTimeMinutes: item.read_time_minutes || 5,
        };
      });
    }
  } catch {
    // Database connection fallback
  }

  // Resilient In-Memory Fallback across canonical seed topics
  const allTopics = await getAllTopics();
  const queryTokens = sanitized
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 1);

  const scoredResults: { score: number; item: SearchResultItem }[] = [];

  for (const topic of allTopics) {
    for (const subtopic of topic.subtopics || []) {
      if (!subtopic.is_published) continue;

      let score = 0;
      const titleLower = subtopic.title.toLowerCase();
      const summaryLower = (subtopic.summary || "").toLowerCase();
      const contentLower = (subtopic.content_markdown || "").toLowerCase();
      const topicNameLower = topic.name_fil.toLowerCase();

      for (const token of queryTokens) {
        if (titleLower.includes(token)) score += 10;
        if (topicNameLower.includes(token)) score += 5;
        if (summaryLower.includes(token)) score += 4;
        if (contentLower.includes(token)) score += 1;
      }

      if (score > 0) {
        const snippetSource = subtopic.summary || subtopic.content_markdown || "";
        scoredResults.push({
          score,
          item: {
            id: subtopic.id,
            title: subtopic.title,
            slug: subtopic.slug,
            topicSlug: topic.slug,
            topicNameFil: topic.name_fil,
            topicColorToken: topic.color_token,
            summary: subtopic.summary || "",
            matchedSnippet: extractSnippet(snippetSource, sanitized),
            readTimeMinutes: subtopic.read_time_minutes || 5,
          },
        });
      }
    }
  }

  // Sort descending by relevance score
  scoredResults.sort((a, b) => b.score - a.score);

  return scoredResults.slice(0, 15).map((r) => r.item);
}

export const searchSubtopics = searchContent;

