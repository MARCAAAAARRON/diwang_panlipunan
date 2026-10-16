import { NextResponse } from "next/server";
import { getAllTopics } from "@/lib/content-service";
import { DrawerTopicItem, DrawerSubtopicItem } from "@/types/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const dbTopics = await getAllTopics();

    // Map strictly what is present in the database / system
    const topics: DrawerTopicItem[] = (dbTopics || []).map((topic, index) => {
      const sequenceNum = String(topic.order_index || index + 1).padStart(2, "0");

      const publishedSubtopics = (topic.subtopics || []).filter(
        (s) => s.is_published !== false
      );

      const subtopicsList: DrawerSubtopicItem[] = publishedSubtopics.map(
        (sub, subIndex) => {
          const letter = String.fromCharCode(97 + (subIndex % 26)) + ".";
          const cleanTitle = sub.title.replace(/^Aralin\s+\d+:\s*/i, "").trim();
          return {
            id: sub.id || `subtopic-${sequenceNum}-${letter}`,
            code: letter,
            title: `Aralin ${subIndex + 1}: ${cleanTitle}`,
            slug: sub.slug,
          };
        }
      );

      return {
        id: topic.id || `topic-${sequenceNum}`,
        number: sequenceNum,
        slug: topic.slug,
        title: topic.name_fil,
        description: topic.description_fil || "",
        themeColor: topic.color_token ? `var(${topic.color_token})` : "var(--color-primary)",
        subtopics: subtopicsList,
      };
    });

    return NextResponse.json(
      { topics },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (err: any) {
    console.error("Navigation API error:", err?.message);
    return NextResponse.json({ topics: [] }, { status: 500 });
  }
}
