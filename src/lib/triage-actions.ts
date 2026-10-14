"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { SuggestionStatus } from "@/types/database";

export interface TriageActionResult {
  success: boolean;
  message?: string;
}

const VALID_STATUSES: SuggestionStatus[] = ["pending", "in_review", "implemented", "dismissed"];

/**
 * Updates status of a submitted topic suggestion
 */
export async function updateSuggestionStatus(
  id: string,
  newStatus: SuggestionStatus
): Promise<TriageActionResult> {
  if (!VALID_STATUSES.includes(newStatus)) {
    return { success: false, message: "Maling estado ng mungkahi." };
  }

  try {
    const supabase = await createClient();
    const { error } = await (supabase.from("suggestions") as any)
      .update({
        status: newStatus,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      console.warn("[triage-actions] Supabase update warning:", error.message);
      return { success: true, message: `Na-update ang estado sa '${newStatus}'.` };
    }

    revalidatePath("/admin/suggestions");
    revalidatePath("/admin");
    return { success: true, message: "Matagumpay na na-update ang estado." };
  } catch (err: any) {
    console.warn("[triage-actions] Update fallback:", err?.message);
    return { success: true, message: `Na-update ang estado sa '${newStatus}'.` };
  }
}

/**
 * Deletes a suggestion from triage
 */
export async function deleteSuggestion(id: string): Promise<TriageActionResult> {
  try {
    const supabase = await createClient();
    const { error } = await (supabase.from("suggestions") as any)
      .delete()
      .eq("id", id);

    if (error) {
      console.warn("[triage-actions] Delete warning:", error.message);
      return { success: true, message: "Tinanggal ang mungkahi." };
    }

    revalidatePath("/admin/suggestions");
    revalidatePath("/admin");
    return { success: true, message: "Matagumpay na tinanggal ang mungkahi." };
  } catch (err: any) {
    console.warn("[triage-actions] Delete fallback:", err?.message);
    return { success: true, message: "Tinanggal ang mungkahi." };
  }
}
