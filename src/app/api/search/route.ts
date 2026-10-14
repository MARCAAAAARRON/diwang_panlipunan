import { NextRequest, NextResponse } from "next/server";
import { searchContent } from "@/lib/search-service";
import { recordSearchQuery } from "@/lib/analytics-service";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") || "";
  if (query.trim().length >= 2) {
    // Non-blocking recording
    recordSearchQuery(query).catch(() => {});
  }
  const results = await searchContent(query);
  return NextResponse.json({ results });
}

