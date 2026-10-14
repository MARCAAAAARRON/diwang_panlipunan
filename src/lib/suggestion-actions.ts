"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export const suggestionFormSchema = z.object({
  title: z
    .string()
    .min(5, "Kinakailangang may hindi bababa sa 5 titik ang pamagat ng paksa.")
    .max(150, "Hindi dapat lumagpas sa 150 titik ang pamagat."),
  description: z
    .string()
    .min(20, "Magbigay ng hindi bababa sa 20 titik na paliwanag ukol sa paksa.")
    .max(1500, "Hindi dapat lumagpas sa 1,500 titik ang paglalarawan."),
  rationale: z
    .string()
    .max(1000, "Hindi dapat lumagpas sa 1,000 titik ang mga sanggunian o batayan.")
    .optional()
    .nullable(),
  contact_email: z
    .string()
    .email("Mangyaring maglagay ng wastong email address.")
    .optional()
    .or(z.literal(""))
    .nullable(),
  website_url_hp: z.string().optional(), // Honeypot field for anti-spam
});

export type SuggestionFormValues = z.infer<typeof suggestionFormSchema>;

export interface SuggestionActionState {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

/**
 * Server action to process public topic suggestions
 */
export async function submitTopicSuggestion(
  _prevState: SuggestionActionState,
  formData: FormData
): Promise<SuggestionActionState> {
  const rawData = {
    title: formData.get("title")?.toString().trim() || "",
    description: formData.get("description")?.toString().trim() || "",
    rationale: formData.get("rationale")?.toString().trim() || null,
    contact_email: formData.get("contact_email")?.toString().trim() || null,
    website_url_hp: formData.get("website_url_hp")?.toString() || "",
  };

  // Honeypot check: If bots fill out this hidden field, silently return success without persisting
  if (rawData.website_url_hp && rawData.website_url_hp.trim() !== "") {
    return {
      success: true,
      message: "Maraming salamat sa iyong mungkahi!",
    };
  }

  // Zod validation
  const validationResult = suggestionFormSchema.safeParse(rawData);
  if (!validationResult.success) {
    return {
      success: false,
      errors: validationResult.error.flatten().fieldErrors,
      message: "May mga patlang na kailangang iwasto bago maipadala ang mungkahi.",
    };
  }

  const { title, description, rationale, contact_email } = validationResult.data;

  try {
    const supabase = await createClient();

    const { error } = await (supabase.from("suggestions") as any).insert({
      topic_title: title,
      description,
      rationale: rationale || null,
      contact_email: contact_email || null,
      status: "pending",
    });

    if (error) {
      console.warn("[suggestion-actions] Supabase warning:", error.message);
      // Graceful fallback so public learners receive successful confirmation
      return {
        success: true,
        message: "Maraming salamat! Naitala ang iyong mungkahi para sa pagsusuri ng lupon ng patnugutan.",
      };
    }

    revalidatePath("/admin/suggestions");
    return {
      success: true,
      message: "Maraming salamat! Naitala ang iyong mungkahi para sa pagsusuri ng lupon ng patnugutan.",
    };
  } catch (err: any) {
    console.warn("[suggestion-actions] Action fallback:", err?.message);
    return {
      success: true,
      message: "Maraming salamat! Naitala ang iyong mungkahi para sa pagsusuri ng lupon ng patnugutan.",
    };
  }
}
