import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "@/types/database";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return response;
  }

  const supabase = createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        request.cookies.set({
          name,
          value,
          ...options,
        });
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        response.cookies.set({
          name,
          value,
          ...options,
        });
      },
      remove(name: string, options: CookieOptions) {
        request.cookies.set({
          name,
          value: "",
          ...options,
        });
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        response.cookies.set({
          name,
          value: "",
          ...options,
        });
      },
    },
  });

  const pathname = request.nextUrl.pathname;

  // Retrieve authenticated session user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If user is authenticated, retrieve their role
  let userRole: "admin" | "editor" | "viewer" = "viewer";
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const p = profile as any;
    userRole =
      (p?.role as "admin" | "editor" | "viewer") ||
      (user.user_metadata?.role as "admin" | "editor" | "viewer") ||
      "viewer";
  }

  // 1. If visiting /login or /register while already authenticated:
  if (pathname === "/login" || pathname === "/register") {
    if (user) {
      const nextParam = request.nextUrl.searchParams.get("next");
      if (nextParam && nextParam.startsWith("/") && nextParam !== "/login" && nextParam !== "/register") {
        const url = request.nextUrl.clone();
        url.pathname = nextParam;
        url.searchParams.delete("next");
        return NextResponse.redirect(url);
      }

      const url = request.nextUrl.clone();
      if (userRole === "admin") {
        url.pathname = "/admin";
      } else if (userRole === "editor") {
        url.pathname = "/admin/subtopics";
      } else {
        url.pathname = "/home";
      }
      return NextResponse.redirect(url);
    }
  }

  // 2. Protect /admin routes (except /admin/login)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }

    // Role check: Only admin and editor are allowed in /admin
    if (userRole !== "admin" && userRole !== "editor") {
      const url = request.nextUrl.clone();
      url.pathname = "/home";
      return NextResponse.redirect(url);
    }

    // If editor tries to access user management, redirect to subtopics
    if (userRole === "editor" && pathname.startsWith("/admin/users")) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/subtopics";
      return NextResponse.redirect(url);
    }
  }

  // 3. If visiting /admin/login while already authenticated as admin/editor:
  if (pathname === "/admin/login") {
    if (user) {
      if (userRole === "admin" || userRole === "editor") {
        const nextPath = request.nextUrl.searchParams.get("next") || (userRole === "admin" ? "/admin" : "/admin/subtopics");
        const url = request.nextUrl.clone();
        url.pathname = nextPath;
        url.searchParams.delete("next");
        return NextResponse.redirect(url);
      } else {
        // Viewer visiting /admin/login -> redirect to /home
        const url = request.nextUrl.clone();
        url.pathname = "/home";
        return NextResponse.redirect(url);
      }
    }
  }

  // 4. Access-gate reading / content routes for unauthenticated guests:
  // /home, /topics, /topics/*, /magmungkahi
  const isProtectedReadingRoute =
    pathname === "/home" ||
    pathname.startsWith("/topics") ||
    pathname === "/magmungkahi";

  if (isProtectedReadingRoute && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return response;
}
