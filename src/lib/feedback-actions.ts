"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export interface SubmitFeedbackResult {
  success: boolean;
  message?: string;
  feedbackId?: string;
}

/**
 * Submits or updates reader feedback for an educational article
 */
export async function submitFeedback(
  subtopicId: string,
  isHelpful: boolean,
  comment?: string,
  existingFeedbackId?: string
): Promise<SubmitFeedbackResult> {
  const sanitizedComment = comment?.trim().slice(0, 500) || null;

  try {
    const supabase = await createClient();

    // If an existing feedback row is being updated with an optional comment
    if (existingFeedbackId) {
      const { error: updateError } = await (supabase.from("feedback") as any)
        .update({
          comment: sanitizedComment,
        })
        .eq("id", existingFeedbackId);

      if (updateError) {
        console.warn("[feedback-actions] Supabase update warning:", updateError.message);
      } else {
        revalidatePath("/admin/feedback");
        return { success: true, feedbackId: existingFeedbackId };
      }
    }

    // Insert new feedback record
    const { data, error } = await (supabase.from("feedback") as any)
      .insert({
        subtopic_id: subtopicId,
        is_helpful: isHelpful,
        comment: sanitizedComment,
      })
      .select("id")
      .single();

    if (error) {
      console.warn("[feedback-actions] Supabase insert warning:", error.message);
      // Return optimistic success so UX doesn't break if offline
      return { success: true, feedbackId: `local-${Date.now()}` };
    }

    revalidatePath("/admin/feedback");
    return { success: true, feedbackId: data?.id };
  } catch (err: any) {
    console.warn("[feedback-actions] Server action fallback:", err?.message);
    return { success: true, feedbackId: `local-${Date.now()}` };
  }
}
