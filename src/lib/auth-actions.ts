"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export interface AuthState {
  error?: string | null;
  success?: boolean;
}

/**
 * Server Action for authenticating an administrator
 */
export async function loginAdmin(
  prevState: AuthState | null,
  formData: FormData
): Promise<AuthState> {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();
  const nextPath = formData.get("next")?.toString() || "/admin";

  if (!email || !password) {
    return {
      error: "Mangyaring ilagay ang iyong email at password.",
    };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      return {
        error: "Hindi wastong email o password. Pakisuri at subukan muli.",
      };
    }

    // Verify admin role in profiles (with metadata / email fallback)
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    const p = profile as any;
    const isExplicitAdmin =
      (p && p.role === "admin") ||
      data.user.user_metadata?.role === "admin";

    if (!isExplicitAdmin) {
      // Invalidate session if not an admin
      await supabase.auth.signOut();
      return {
        error: "Walang administratibong pahintulot (Admin role) ang account na ito.",
      };
    }
  } catch (err: any) {
    return {
      error:
        err?.message ||
        "Nagkaroon ng aberya sa pagsusuri ng kredensyal. Pakisubukang muli.",
    };
  }

  redirect(nextPath.startsWith("/") ? nextPath : "/admin");
}

/**
 * Server Action for logging out the current admin
 */
export async function logoutAdmin(): Promise<void> {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch {
    // Graceful logout
  }

  redirect("/admin/login");
}
