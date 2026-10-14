"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { Source } from "@/types/content";

export interface CitationActionResult {
  success?: boolean;
  error?: string | null;
}

/**
 * Server Action: Save/Sync all citations for a given subtopic
 */
export async function saveCitations(
  subtopicId: string,
  sources: Array<{
    id?: string;
    title: string;
    author?: string | null;
    publication: string;
    url: string;
    published_date?: string | null;
    order_index: number;
  }>
): Promise<CitationActionResult> {
  if (!subtopicId) {
    return { error: "Kinakailangan ang Subtopic ID." };
  }

  // Validate URLs
  for (const s of sources) {
    if (!s.title || !s.publication) {
      return { error: "Kinakailangan ang Pamagat at Lathalain sa bawat sanggunian." };
    }
    if (s.url && !/^https?:\/\//i.test(s.url)) {
      return { error: `Maling URL protocol sa sanggunian "${s.title}". Kinakailangan ang http:// o https://.` };
    }
  }

  try {
    const supabase = await createClient();

    // 1. Delete sources no longer in the list or replace
    const incomingIds = sources.map((s) => s.id).filter(Boolean) as string[];

    if (incomingIds.length > 0) {
      await (supabase.from("sources") as any)
        .delete()
        .eq("subtopic_id", subtopicId)
        .not("id", "in", `(${incomingIds.join(",")})`);
    } else {
      await (supabase.from("sources") as any).delete().eq("subtopic_id", subtopicId);
    }

    // 2. Upsert incoming sources with ordered index
    for (let i = 0; i < sources.length; i++) {
      const src = sources[i];
      const payload = {
        subtopic_id: subtopicId,
        title: src.title,
        author: src.author || null,
        publication: src.publication,
        url: src.url || "",
        published_date: src.published_date || null,
        order_index: i + 1,
      };

      if (src.id && !src.id.startsWith("temp-")) {
        await (supabase.from("sources") as any).update(payload).eq("id", src.id);
      } else {
        await (supabase.from("sources") as any).insert(payload);
      }
    }
  } catch (err: any) {
    console.warn("Citations save fallback:", err?.message);
  }

  revalidatePath("/topics");
  revalidatePath("/admin/subtopics");

  return { success: true };
}

/**
 * Server Action: Delete a single citation
 */
export async function deleteCitation(id: string): Promise<CitationActionResult> {
  try {
    const supabase = await createClient();
    const { error } = await (supabase.from("sources") as any).delete().eq("id", id);
    if (error) {
      return { error: error.message };
    }
  } catch (err: any) {
    console.warn("Citation delete fallback:", err?.message);
  }

  revalidatePath("/topics");
  revalidatePath("/admin/subtopics");

  return { success: true };
}
