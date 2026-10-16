"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { Source } from "@/types/content";

export interface CitationActionResult {
  success?: boolean;
  error?: string | null;
  sources?: Source[];
}

/**
 * Normalizes input date string:
 * - Empty string, "n.d.", "no date", "walang petsa" -> null (valid in postgres date column)
 * - 4-digit year "2024" -> "2024-01-01" (valid in postgres date column)
 * - ISO string "2024-03-15" -> "2024-03-15"
 */
function normalizePublishedDate(input?: string | null): string | null {
  if (!input) return null;
  const trimmed = input.trim();
  if (!trimmed) return null;
  const lower = trimmed.toLowerCase();
  if (
    lower === "n.d." ||
    lower === "n.d" ||
    lower === "nd" ||
    lower === "no date" ||
    lower === "walang petsa" ||
    lower === "none"
  ) {
    return null;
  }
  if (/^\d{4}$/.test(trimmed)) {
    return `${trimmed}-01-01`;
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return trimmed;
  }
  const parsed = new Date(trimmed);
  if (!isNaN(parsed.getTime())) {
    return parsed.toISOString().split("T")[0];
  }
  return null;
}

/**
 * Ensures URL has http:// or https:// protocol if provided
 */
function normalizeUrl(input?: string | null): string {
  if (!input) return "";
  const trimmed = input.trim();
  if (!trimmed) return "";
  if (!/^https?:\/\//i.test(trimmed)) {
    return `https://${trimmed}`;
  }
  return trimmed;
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
    url?: string | null;
    published_date?: string | null;
    order_index: number;
  }>
): Promise<CitationActionResult> {
  if (!subtopicId) {
    return { error: "Kinakailangan ang Subtopic ID." };
  }

  // Validate required fields
  for (let i = 0; i < sources.length; i++) {
    const s = sources[i];
    if (!s.title?.trim() || !s.publication?.trim()) {
      return {
        error: `Kinakailangan ang Pamagat at Lathalain sa Sanggunian #${i + 1}.`,
      };
    }
  }

  try {
    const supabase = await createClient();

    // 1. Identify valid existing database UUIDs (exclude temporary client IDs like temp-12345)
    const existingDbIds = sources
      .map((s) => s.id)
      .filter((id): id is string => Boolean(id && !id.startsWith("temp-")));

    // 2. Delete any removed sources from this subtopic safely
    if (existingDbIds.length > 0) {
      const { error: delErr } = await (supabase.from("sources") as any)
        .delete()
        .eq("subtopic_id", subtopicId)
        .not("id", "in", `(${existingDbIds.join(",")})`);
      if (delErr) {
        console.error("Delete removed sources error:", delErr);
      }
    } else {
      // If no existing DB IDs remain in incoming list, wipe all old sources for this subtopic
      await (supabase.from("sources") as any).delete().eq("subtopic_id", subtopicId);
    }

    // 3. Upsert / Insert all sources in order
    for (let i = 0; i < sources.length; i++) {
      const src = sources[i];
      const payload = {
        subtopic_id: subtopicId,
        title: src.title.trim(),
        author: src.author?.trim() || null,
        publication: src.publication.trim(),
        url: normalizeUrl(src.url),
        published_date: normalizePublishedDate(src.published_date),
        order_index: i + 1,
      };

      if (src.id && !src.id.startsWith("temp-")) {
        const { error: updErr } = await (supabase.from("sources") as any)
          .update(payload)
          .eq("id", src.id);
        if (updErr) {
          console.error("Source update error:", updErr);
          return { error: `Hindi na-update ang sanggunian: ${updErr.message}` };
        }
      } else {
        const { error: insErr } = await (supabase.from("sources") as any)
          .insert(payload);
        if (insErr) {
          console.error("Source insert error:", insErr);
          return { error: `Hindi naidagdag ang sanggunian: ${insErr.message}` };
        }
      }
    }

    // 4. Retrieve refreshed saved sources from Supabase
    const { data: refreshedSources } = await (supabase.from("sources") as any)
      .select("*")
      .eq("subtopic_id", subtopicId)
      .order("order_index", { ascending: true });

    // 5. Lookup subtopic and parent topic slugs for precise cache revalidation
    const { data: subtopicRecord } = await (supabase.from("subtopics") as any)
      .select("slug, topic:topics(slug)")
      .eq("id", subtopicId)
      .single();

    const subtopicSlug = subtopicRecord?.slug;
    const topicSlug = subtopicRecord?.topic?.slug;

    // 6. Comprehensive Path Revalidation
    revalidatePath("/");
    revalidatePath("/home");
    revalidatePath("/topics");
    if (topicSlug) {
      revalidatePath(`/topics/${topicSlug}`);
      if (subtopicSlug) {
        revalidatePath(`/topics/${topicSlug}/${subtopicSlug}`);
      }
    }
    revalidatePath("/admin/subtopics");
    revalidatePath(`/admin/subtopics/${subtopicId}/edit`);
    revalidatePath("/api/navigation");
    revalidatePath("/", "layout");

    return {
      success: true,
      sources: (refreshedSources as Source[]) || [],
    };
  } catch (err: any) {
    console.error("Citations save failure:", err);
    return { error: err?.message || "Nagkaroon ng aberya sa pag-save ng mga sanggunian." };
  }
}

/**
 * Server Action: Delete a single citation
 */
export async function deleteCitation(id: string): Promise<CitationActionResult> {
  try {
    const supabase = await createClient();

    const { data: source } = await (supabase.from("sources") as any)
      .select("subtopic_id, subtopic:subtopics(slug, topic:topics(slug))")
      .eq("id", id)
      .single();

    const { error } = await (supabase.from("sources") as any).delete().eq("id", id);
    if (error) {
      return { error: error.message };
    }

    const subtopicSlug = (source as any)?.subtopic?.slug;
    const topicSlug = (source as any)?.subtopic?.topic?.slug;

    revalidatePath("/");
    revalidatePath("/home");
    revalidatePath("/topics");
    if (topicSlug && subtopicSlug) {
      revalidatePath(`/topics/${topicSlug}/${subtopicSlug}`);
    }
    revalidatePath("/admin/subtopics");
    revalidatePath("/api/navigation");
    revalidatePath("/", "layout");

    return { success: true };
  } catch (err: any) {
    return { error: err?.message || "Hindi natanggal ang sanggunian." };
  }
}
