import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const isEnvConfigured =
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder-project.supabase.co" &&
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== "placeholder-anon-key";

  if (!isEnvConfigured) {
    return NextResponse.json({
      status: "degraded",
      message: "Supabase environment variables not configured. Using local fallback models.",
      database: "unconfigured",
      timestamp: new Date().toISOString(),
    });
  }

  try {
    const supabase = await createClient();
    const { count, error } = await supabase
      .from("topics")
      .select("*", { count: "exact", head: true });

    if (error) {
      return NextResponse.json(
        {
          status: "error",
          message: error.message,
          database: "error",
          timestamp: new Date().toISOString(),
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: "ok",
      topics_count: count ?? 0,
      database: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error connecting to database";
    return NextResponse.json(
      {
        status: "error",
        message: errorMsg,
        database: "disconnected",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
