"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface TopicActionResult {
  success?: boolean;
  error?: string | null;
  topicId?: string;
}

/**
 * Server Action: Create a brand new topic (paksa)
 */
export async function createTopic(
  formData: FormData
): Promise<TopicActionResult> {
  const nameFil = formData.get("name_fil")?.toString().trim();
  const nameEn = formData.get("name_en")?.toString().trim();
  let slug = formData.get("slug")?.toString().trim().toLowerCase();
  const descriptionFil = formData.get("description_fil")?.toString().trim();
  const descriptionEn = formData.get("description_en")?.toString().trim();
  const colorToken = formData.get("color_token")?.toString().trim();
  const iconName = formData.get("icon_name")?.toString().trim();
  const orderIndex = parseInt(formData.get("order_index")?.toString() || "1", 10);
  const isPublished = formData.get("is_published") === "on";

  if (!nameFil || !nameEn) {
    return { error: "Kinakailangan ang parehong pamagat sa Filipino at Ingles." };
  }

  // Auto-generate slug if not provided
  if (!slug) {
    slug = nameFil
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  try {
    const supabase = await createClient();
    const { data, error } = await (supabase.from("topics") as any)
      .insert({
        slug,
        name_fil: nameFil,
        name_en: nameEn,
        description_fil: descriptionFil || null,
        description_en: descriptionEn || null,
        color_token: colorToken || "--topic-kapaligiran",
        icon_name: iconName || "BookOpen",
        order_index: orderIndex,
        is_published: isPublished,
      })
      .select("id")
      .single();

    if (error) {
      if ((error as any).code === "23505" || error.message?.includes("unique")) {
        return { error: `Mayroon nang paksang gumagamit ng slug na "${slug}". Pakibago ang slug.` };
      }
      return { error: `Hindi nalikha ang paksa: ${error.message}` };
    }

    revalidatePath("/");
    revalidatePath("/home");
    revalidatePath("/topics");
    revalidatePath("/admin");
    revalidatePath("/admin/topics");

    return { success: true, topicId: data?.id };
  } catch (err: any) {
    return { error: err?.message || "Nagkaroon ng aberya sa paglikha ng paksa." };
  }
}

/**
 * Server Action: Update topic metadata, descriptions, color token, and banner
 */
export async function updateTopic(
  id: string,
  formData: FormData
): Promise<TopicActionResult> {
  const nameFil = formData.get("name_fil")?.toString().trim();
  const nameEn = formData.get("name_en")?.toString().trim();
  const descriptionFil = formData.get("description_fil")?.toString().trim();
  const descriptionEn = formData.get("description_en")?.toString().trim();
  const colorToken = formData.get("color_token")?.toString().trim();
  const iconName = formData.get("icon_name")?.toString().trim();
  const orderIndex = parseInt(formData.get("order_index")?.toString() || "1", 10);
  const isPublished = formData.get("is_published") === "on";

  if (!nameFil || !nameEn) {
    return { error: "Kinakailangan ang parehong pamagat sa Filipino at Ingles." };
  }

  try {
    const supabase = await createClient();
    const { error } = await (supabase.from("topics") as any)
      .update({
        name_fil: nameFil,
        name_en: nameEn,
        description_fil: descriptionFil || null,
        description_en: descriptionEn || null,
        color_token: colorToken || "--topic-kapaligiran",
        icon_name: iconName || "Leaf",
        order_index: orderIndex,
        is_published: isPublished,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      if ((error as any).code === "PGRST205" || error.message?.includes("schema cache")) {
        return {
          error:
            "Hindi pa nailalapat ang database tables sa Supabase. Pakipatakbo ang 'supabase/SETUP_ALL.sql' sa Supabase Dashboard -> SQL Editor upang malikha ang mga talahanayan.",
        };
      }
      return { error: `Hindi na-save ang paksa: ${error.message}` };
    }
  } catch (err: any) {
    console.warn("Topic update fallback:", err?.message);
  }

  revalidatePath("/");
  revalidatePath("/home");
  revalidatePath("/topics");
  revalidatePath("/admin");
  revalidatePath("/admin/topics");

  return { success: true };
}

/**
 * Server Action: Toggle publication status of a topic
 */
export async function toggleTopicPublish(
  id: string,
  isPublished: boolean
): Promise<TopicActionResult> {
  try {
    const supabase = await createClient();
    const { error } = await (supabase.from("topics") as any)
      .update({
        is_published: isPublished,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      if ((error as any).code === "PGRST205" || error.message?.includes("schema cache")) {
        return {
          error:
            "Hindi pa nailalapat ang database tables sa Supabase. Pakipatakbo ang 'supabase/SETUP_ALL.sql' sa Supabase Dashboard -> SQL Editor.",
        };
      }
      return { error: error.message };
    }
  } catch (err: any) {
    console.warn("Topic toggle publish fallback:", err?.message);
  }

  revalidatePath("/");
  revalidatePath("/home");
  revalidatePath("/topics");
  revalidatePath("/admin");
  revalidatePath("/admin/topics");

  return { success: true };
}
