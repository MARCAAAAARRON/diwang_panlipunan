import { NextResponse } from "next/server";
import { getAllTopics } from "@/lib/content-service";
import { CANONICAL_TOPICS } from "@/lib/navigation-data";
import { DrawerTopicItem, DrawerSubtopicItem } from "@/types/navigation";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const dbTopics = await getAllTopics();

    // Merge DB subtopics into canonical structure so newly created admin articles immediately appear
    const mergedTopics: DrawerTopicItem[] = CANONICAL_TOPICS.map((canonical) => {
      const dbTopic = dbTopics.find((t) => t.slug === canonical.slug);
      if (!dbTopic || !dbTopic.subtopics || dbTopic.subtopics.length === 0) {
        return canonical;
      }

      // Collect existing canonical subtopics by slug
      const subtopicMap = new Map<string, DrawerSubtopicItem>();
      canonical.subtopics.forEach((s) => {
        subtopicMap.set(s.slug, { ...s });
      });

      // Overlay or append published DB subtopics
      const publishedDbSubtopics = dbTopic.subtopics.filter((s) => s.is_published);
      publishedDbSubtopics.forEach((dbSub) => {
        if (subtopicMap.has(dbSub.slug)) {
          const existing = subtopicMap.get(dbSub.slug)!;
          subtopicMap.set(dbSub.slug, {
            ...existing,
            title: dbSub.title,
          });
        } else {
          subtopicMap.set(dbSub.slug, {
            id: dbSub.id,
            code: "",
            title: dbSub.title,
            slug: dbSub.slug,
          });
        }
      });

      // Format subtopics with clean Aralin numbering and codes (a., b., c., etc.)
      const subtopicsList: DrawerSubtopicItem[] = Array.from(subtopicMap.values()).map(
        (sub, index) => {
          const letter = String.fromCharCode(97 + (index % 26)) + ".";
          const cleanTitle = sub.title.replace(/^Aralin\s+\d+:\s*/i, "").trim();
          return {
            id: sub.id || `subtopic-${canonical.number}-${letter}`,
            code: letter,
            title: `Aralin ${index + 1}: ${cleanTitle}`,
            slug: sub.slug,
          };
        }
      );

      return {
        ...canonical,
        subtopics: subtopicsList,
      };
    });

    return NextResponse.json({ topics: mergedTopics });
  } catch {
    return NextResponse.json({ topics: CANONICAL_TOPICS });
  }
}
