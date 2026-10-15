"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { UserRole } from "@/types/database";

export interface UserProfileItem {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserActionResult {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Retrieve all registered users/profiles (Admin only)
 */
export async function getUsersList(): Promise<{
  users: UserProfileItem[];
  currentUserId: string | null;
  error?: string;
}> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { users: [], currentUserId: null, error: "Kailangan mag-login upang ma-access ang talaang ito." };
    }

    // Verify admin role
    const { data: currentProfile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const p = currentProfile as any;
    const isExplicitAdmin =
      p?.role === "admin" || user.user_metadata?.role === "admin";

    if (!isExplicitAdmin) {
      return { users: [], currentUserId: user.id, error: "Tanging ang Punong Patnugot (Admin) lamang ang may pahintulot dito." };
    }

    // Fetch all profiles
    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("id, email, full_name, role, avatar_url, created_at, updated_at")
      .order("created_at", { ascending: false });

    if (error) {
      return { users: [], currentUserId: user.id, error: error.message };
    }

    return {
      users: (profiles as UserProfileItem[]) || [],
      currentUserId: user.id,
    };
  } catch (err: any) {
    return { users: [], currentUserId: null, error: err?.message || "Nabigo sa pagkuha ng listahan ng mga gumagamit." };
  }
}

/**
 * Update user role (e.g. promote viewer to editor, or vice-versa)
 */
export async function updateUserRole(
  targetUserId: string,
  newRole: "admin" | "editor" | "viewer"
): Promise<UserActionResult> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "Walang aktibong sesyon. Mag-login muli." };
    }

    // Prevent demoting or modifying self
    if (user.id === targetUserId) {
      return {
        success: false,
        error: "Hindi mo maaaring baguhin ang iyong sariling tungkulin upang maiwasan ang aksidenteng pagka-lockout.",
      };
    }

    // Verify caller is admin
    const { data: currentProfile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const p = currentProfile as any;
    const isExplicitAdmin =
      p?.role === "admin" || user.user_metadata?.role === "admin";

    if (!isExplicitAdmin) {
      return {
        success: false,
        error: "Tanging ang Punong Patnugot (Admin) lamang ang may pahintulot magtalaga ng tungkulin.",
      };
    }

    // Update target user's role in public.profiles
    const { error: updateError } = await (supabase.from("profiles") as any)
      .update({
        role: newRole,
        updated_at: new Date().toISOString(),
      })
      .eq("id", targetUserId);

    if (updateError) {
      return { success: false, error: updateError.message };
    }

    revalidatePath("/admin/users");
    revalidatePath("/admin");

    const roleName =
      newRole === "admin"
        ? "Tagapangasiwa (Admin)"
        : newRole === "editor"
        ? "Katuwang na Patnugot (Editor)"
        : "Mambabasa (Viewer)";

    return {
      success: true,
      message: `Matagumpay na naitakda ang tungkulin bilang ${roleName}.`,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || "Nagkaroon ng aberya sa pag-update ng tungkulin.",
    };
  }
}
