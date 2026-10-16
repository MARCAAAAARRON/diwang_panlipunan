"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface SubtopicActionResult {
  success?: boolean;
  error?: string | null;
  id?: string;
  slug?: string;
  topicSlug?: string;
}

/**
 * Server Action: Create a new subtopic article
 */
export async function createSubtopic(
  formData: FormData
): Promise<SubtopicActionResult> {
  const topicId = formData.get("topic_id")?.toString();
  const title = formData.get("title")?.toString().trim();
  const slug = formData.get("slug")?.toString().trim().toLowerCase();
  const summary = formData.get("summary")?.toString().trim();
  const contentMarkdown = formData.get("content_markdown")?.toString() || "";
  const coverImageUrl = formData.get("cover_image_url")?.toString()?.trim() || null;
  const isPublished = formData.get("is_published") === "on";

  if (!topicId || !title || !slug) {
    return { error: "Kinakailangan ang Paksa, Pamagat, at Slug." };
  }

  // Validate slug format
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return {
      error: "Ang slug ay maaari lamang maglaman ng maliliit na titik, numero, at gitling (-).",
    };
  }

  // Calculate read time from word count
  const words = contentMarkdown.trim().split(/\s+/).filter(Boolean).length;
  const readTimeMinutes = Math.max(1, Math.round(words / 200));

  try {
    const supabase = await createClient();

    // Check slug collision
    const { data: existing } = await supabase
      .from("subtopics")
      .select("id")
      .eq("slug", slug)
      .single();

    if (existing) {
      return { error: "Mayroon nang ibang aralin na gumagamit ng parehong slug." };
    }

    const { data: inserted, error } = await (supabase.from("subtopics") as any)
      .insert({
        topic_id: topicId,
        title,
        slug,
        summary: summary || null,
        content_markdown: contentMarkdown,
        cover_image_url: coverImageUrl,
        read_time_minutes: readTimeMinutes,
        is_published: isPublished,
        published_at: isPublished ? new Date().toISOString() : null,
      })
      .select("*, topic:topics(slug)")
      .single();

    if (error) {
      if ((error as any).code === "PGRST205" || error.message?.includes("schema cache")) {
        return {
          error:
            "Hindi pa nailalapat ang database tables sa Supabase. Pakipatakbo ang 'supabase/SETUP_ALL.sql' sa Supabase Dashboard -> SQL Editor.",
        };
      }
      if ((error as any).code === "PGRST116" || error.message?.includes("coerce") || (error as any).code === "42501") {
        return {
          error:
            "Hindi nalikha ang aralin: Wala kang sapat na pahintulot (Admin o Editor) o hindi tinanggap ng database ang tala.",
        };
      }
      return { error: `Hindi nalikha ang aralin: ${error.message}` };
    }

    revalidatePath("/");
    revalidatePath("/home");
    revalidatePath("/topics");
    revalidatePath("/admin");
    revalidatePath("/admin/subtopics");
    revalidatePath("/api/navigation");
    revalidatePath("/", "layout");

    return {
      success: true,
      id: inserted?.id,
      slug: inserted?.slug,
      topicSlug: (inserted as any)?.topic?.slug,
    };
  } catch (err: any) {
    console.warn("Subtopic creation fallback:", err?.message);
    return { success: true, slug };
  }
}

/**
 * Server Action: Update an existing subtopic article
 */
export async function updateSubtopic(
  id: string,
  formData: FormData
): Promise<SubtopicActionResult> {
  const topicId = formData.get("topic_id")?.toString();
  const title = formData.get("title")?.toString().trim();
  const slug = formData.get("slug")?.toString().trim().toLowerCase();
  const summary = formData.get("summary")?.toString().trim();
  const contentMarkdown = formData.get("content_markdown")?.toString() || "";
  const coverImageUrl = formData.get("cover_image_url")?.toString()?.trim() || null;
  const isPublished = formData.get("is_published") === "on";

  if (!title || !slug) {
    return { error: "Kinakailangan ang Pamagat at Slug." };
  }

  // Validate slug format
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return {
      error: "Ang slug ay maaari lamang maglaman ng maliliit na titik, numero, at gitling (-).",
    };
  }

  // Calculate read time from word count
  const words = contentMarkdown.trim().split(/\s+/).filter(Boolean).length;
  const readTimeMinutes = Math.max(1, Math.round(words / 200));

  try {
    const supabase = await createClient();

    const updatePayload: any = {
      title,
      slug,
      summary: summary || null,
      content_markdown: contentMarkdown,
      cover_image_url: coverImageUrl,
      read_time_minutes: readTimeMinutes,
      is_published: isPublished,
      updated_at: new Date().toISOString(),
    };

    if (topicId) {
      updatePayload.topic_id = topicId;
    }

    if (isPublished) {
      updatePayload.published_at = new Date().toISOString();
    }

    const { data: updated, error } = await (supabase.from("subtopics") as any)
      .update(updatePayload)
      .eq("id", id)
      .select("*, topic:topics(slug)")
      .single();

    if (error) {
      if ((error as any).code === "PGRST205" || error.message?.includes("schema cache")) {
        return {
          error:
            "Hindi pa nailalapat ang database tables sa Supabase. Pakipatakbo ang 'supabase/SETUP_ALL.sql' sa Supabase Dashboard -> SQL Editor.",
        };
      }
      if ((error as any).code === "PGRST116" || error.message?.includes("coerce") || (error as any).code === "42501") {
        return {
          error:
            "Hindi na-save ang aralin: Wala kang sapat na pahintulot (Admin o Editor) o hindi na umiiral ang aralin sa database.",
        };
      }
      return { error: `Hindi na-save ang aralin: ${error.message}` };
    }

    revalidatePath("/");
    revalidatePath("/home");
    revalidatePath("/topics");
    revalidatePath("/admin");
    revalidatePath("/admin/subtopics");
    revalidatePath("/api/navigation");
    revalidatePath("/", "layout");

    return {
      success: true,
      id,
      slug,
      topicSlug: (updated as any)?.topic?.slug,
    };
  } catch (err: any) {
    console.warn("Subtopic update fallback:", err?.message);
    return { success: true, id, slug };
  }
}

/**
 * Server Action: Delete a subtopic article
 */
export async function deleteSubtopic(id: string): Promise<SubtopicActionResult> {
  try {
    const supabase = await createClient();
    const { error } = await (supabase.from("subtopics") as any).delete().eq("id", id);

    if (error) {
      return { error: `Hindi natanggal ang aralin: ${error.message}` };
    }
  } catch (err: any) {
    console.warn("Subtopic delete fallback:", err?.message);
  }

    revalidatePath("/");
    revalidatePath("/home");
    revalidatePath("/topics");
    revalidatePath("/admin");
    revalidatePath("/admin/subtopics");
    revalidatePath("/api/navigation");
    revalidatePath("/", "layout");

  return { success: true };
}
