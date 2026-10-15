"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { UserRole } from "@/types/database";

export interface AuthState {
  error?: string | null;
  success?: boolean;
  message?: string | null;
}

export interface CurrentUserProfile {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  avatar_url?: string | null;
}

/**
 * Universal Login Server Action: Authenticates Admin, Editor, or Viewer
 */
export async function loginUser(
  prevState: AuthState | null,
  formData: FormData
): Promise<AuthState> {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();
  const nextParam = formData.get("next")?.toString()?.trim();

  if (!email || !password) {
    return {
      error: "Mangyaring ilagay ang iyong email at password.",
    };
  }

  let userRole: UserRole = "viewer";

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

    // Retrieve user's role from profiles
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    const p = profile as any;
    const rawRole = p?.role || data.user.user_metadata?.role;
    userRole =
      rawRole === "admin"
        ? "admin"
        : rawRole === "editor"
        ? "editor"
        : "viewer";

    // Ensure profile row exists
    if (!profile) {
      const { error: profileError } = await (supabase.from("profiles") as any).upsert({
        id: data.user.id,
        email: data.user.email || email,
        full_name: data.user.user_metadata?.full_name || null,
        role: userRole,
      });

      if (profileError && profileError.message.includes("profiles_role_check")) {
        // Fallback for databases before constraint expansion
        await (supabase.from("profiles") as any).upsert({
          id: data.user.id,
          email: data.user.email || email,
          full_name: data.user.user_metadata?.full_name || null,
          role: userRole === "admin" ? "admin" : "user",
        });
      }
    }
  } catch (err: any) {
    return {
      error: err?.message || "Nagkaroon ng aberya sa pag-login. Pakisubukang muli.",
    };
  }

  // Smart redirection based on role and nextParam
  if (nextParam && nextParam.startsWith("/") && nextParam !== "/login" && nextParam !== "/register") {
    redirect(nextParam);
  }

  if (userRole === "admin") {
    redirect("/admin");
  } else if (userRole === "editor") {
    redirect("/admin/subtopics");
  } else {
    redirect("/home");
  }
}

/**
 * Universal Registration Server Action: Signs up a new Citizen / Reader
 */
export async function registerUser(
  prevState: AuthState | null,
  formData: FormData
): Promise<AuthState> {
  const fullName = formData.get("fullName")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("confirmPassword")?.toString();
  const nextParam = formData.get("next")?.toString()?.trim();

  if (!fullName || !email || !password) {
    return {
      error: "Kinakailangan punan ang buong pangalan, email, at password.",
    };
  }

  if (password.length < 6) {
    return {
      error: "Ang password ay dapat mayroong hindi bababa sa 6 na karakter.",
    };
  }

  if (confirmPassword && password !== confirmPassword) {
    return {
      error: "Hindi nagtutugma ang dalawang password. Pakisuri muli.",
    };
  }

  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: "viewer",
        },
      },
    });

    if (error) {
      return {
        error: error.message || "Hindi nagtagumpay ang pagpaparehistro.",
      };
    }

    if (data.user) {
      // Try upserting with 'viewer' role first
      const { error: profileError } = await (supabase.from("profiles") as any).upsert({
        id: data.user.id,
        email,
        full_name: fullName,
        role: "viewer",
      });

      // Fallback to 'user' if profiles_role_check has not been updated yet
      if (profileError && profileError.message.includes("profiles_role_check")) {
        await (supabase.from("profiles") as any).upsert({
          id: data.user.id,
          email,
          full_name: fullName,
          role: "user",
        });
      }
    }

    // If session was not immediately returned (email confirmation required)
    if (!data.session) {
      return {
        success: true,
        message: "Nilikha na ang iyong account! Maaari ka nang mag-login gamit ang iyong email at password.",
      };
    }
  } catch (err: any) {
    return {
      error: err?.message || "Nagkaroon ng aberya sa pagpaparehistro.",
    };
  }

  const destination = nextParam && nextParam.startsWith("/") ? nextParam : "/home";
  redirect(destination);
}

/**
 * Retrieve current authenticated session profile
 */
export async function getCurrentUser(): Promise<CurrentUserProfile | null> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    const { data: profile } = await supabase
      .from("profiles")
      .select("id, email, full_name, role, avatar_url")
      .eq("id", user.id)
      .single();

    const p = profile as any;
    const rawRole = p?.role || user.user_metadata?.role;
    const normalizedRole: UserRole =
      rawRole === "admin"
        ? "admin"
        : rawRole === "editor"
        ? "editor"
        : "viewer";

    return {
      id: user.id,
      email: user.email || "",
      full_name: p?.full_name || user.user_metadata?.full_name || null,
      role: normalizedRole,
      avatar_url: p?.avatar_url || null,
    };
  } catch {
    return null;
  }
}

/**
 * Backward compatibility: Admin Login
 */
export async function loginAdmin(
  prevState: AuthState | null,
  formData: FormData
): Promise<AuthState> {
  return loginUser(prevState, formData);
}

/**
 * Universal Logout Server Action
 */
export async function logoutUser(): Promise<void> {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch {
    // Graceful logout
  }

  redirect("/");
}

export async function logoutAdmin(): Promise<void> {
  return logoutUser();
}
