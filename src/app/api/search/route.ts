import { NextRequest, NextResponse } from "next/server";
import { searchContent } from "@/lib/search-service";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") || "";
  const results = await searchContent(query);
  return NextResponse.json({ results });
}
