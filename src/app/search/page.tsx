import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { searchSubtopics, type SearchResult } from "@/lib/search-service";
import { Search, BookOpen, Clock, ChevronRight, AlertCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Paghahanap | Diwang Panlipunan",
  description: "Maghanap sa buong koleksyon ng mga paksa, aralin, at pagsusuri sa lipunang Pilipino.",
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

async function SearchResultsContent({ query }: { query: string }) {
  const cleanQuery = query.trim();
  const results: SearchResult[] = cleanQuery ? await searchSubtopics(cleanQuery) : [];

  const suggestedQueries = [
    "Kahirapan",
    "Pagbabago ng Klima",
    "Karapatang Pantao",
    "Edukasyon",
    "Ekonomiya",
    "Kalusugan",
    "Pamamahala",
  ];

  return (
    <div className="space-y-8">
      {/* Search Input Bar */}
      <form action="/search" method="GET" className="relative max-w-2xl">
        <div className="relative flex items-center">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-muted">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="search"
            name="q"
            defaultValue={cleanQuery}
            placeholder="Maghanap ng paksa, aralin, o pagsusuri..."
            className="w-full h-12 pl-12 pr-28 rounded-md border border-input-border bg-surface text-base text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors shadow-none"
            autoFocus={!cleanQuery}
          />
          <button
            type="submit"
            className="absolute right-1.5 px-4 h-9 rounded bg-primary text-primary-contrast font-medium text-sm hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-opacity"
          >
            Hanapin
          </button>
        </div>
      </form>

      {/* Suggested quick chips */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-text-muted">
        <span className="font-semibold uppercase tracking-wider text-[11px]">Mga mungkahing paksa:</span>
        {suggestedQueries.map((term) => (
          <Link
            key={term}
            href={`/search?q=${encodeURIComponent(term)}`}
            className="px-2.5 py-1 rounded border border-border bg-surface text-text hover:border-primary hover:text-primary transition-colors"
          >
            {term}
          </Link>
        ))}
      </div>

      <hr className="border-border" />

      {/* Results Header */}
      {cleanQuery && (
        <div className="flex items-baseline justify-between">
          <p className="text-sm text-text-muted">
            Nahanap: <span className="font-serif font-bold text-text text-base">{results.length}</span>{" "}
            {results.length === 1 ? "resulta" : "mga resulta"} para sa &ldquo;
            <span className="font-medium text-text">{cleanQuery}</span>&rdquo;
          </p>
        </div>
      )}

      {/* Results List */}
      {cleanQuery && results.length > 0 && (
        <div className="divide-y divide-border border-y border-border">
          {results.map((item) => (
            <article key={item.id} className="py-6 first:pt-4 last:pb-4 group">
              <div className="flex items-center gap-2.5 mb-2 text-xs">
                <span className="px-2 py-0.5 rounded font-mono text-[11px] font-semibold bg-accent-subtle text-accent border border-border">
                  {item.topicNameFil}
                </span>
                <span className="text-text-muted">•</span>
                <span className="inline-flex items-center gap-1 text-text-muted font-mono text-[11px]">
                  <Clock className="w-3.5 h-3.5" />
                  {item.readTimeMinutes} min basahin
                </span>
              </div>

              <h2 className="font-serif text-xl md:text-2xl font-bold text-text group-hover:text-primary transition-colors tracking-tight mb-2">
                <Link href={`/topics/${item.topicSlug}/${item.slug}`} className="hover:underline flex items-center justify-between">
                  <span>{item.title}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-primary shrink-0 ml-2" />
                </Link>
              </h2>

              <p className="text-sm md:text-base text-text-muted leading-relaxed line-clamp-3 font-sans">
                {item.matchedSnippet || item.summary}
              </p>
            </article>
          ))}
        </div>
      )}

      {/* Empty State */}
      {cleanQuery && results.length === 0 && (
        <div className="py-12 px-6 rounded-md border border-border bg-surface text-center space-y-4 max-w-2xl mx-auto">
          <div className="w-12 h-12 rounded-full bg-accent-subtle text-text flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6 text-primary" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-lg font-bold text-text">
              Walang nahanap na resulta
            </h3>
            <p className="text-sm text-text-muted">
              Walang tugmang aralin o artikulo para sa &ldquo;{cleanQuery}&rdquo;.
              Subukang maghanap gamit ang ibang salita o piliin ang isa sa mga pangunahing tema sa ibaba.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/topics"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border bg-page text-sm font-medium text-text hover:border-primary hover:text-primary transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Tingnan ang Lahat ng Paksa
            </Link>
          </div>
        </div>
      )}

      {/* Zero query state */}
      {!cleanQuery && (
        <div className="py-16 text-center space-y-4 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-full bg-accent-subtle text-text flex items-center justify-center mx-auto">
            <Search className="w-6 h-6 text-primary" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-lg font-bold text-text">
              Magsimulang Maghanap
            </h3>
            <p className="text-sm text-text-muted">
              I-type ang anumang paksang panlipunan, konsepto, o salita upang makita ang mga kaugnay na pagsusuri at aralin.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";

  return (
    <main className="min-h-screen bg-page py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-muted">
          <Link href="/" className="hover:text-primary transition-colors">
            Pangunahin
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-text font-medium">Paghahanap</span>
        </nav>

        {/* Page Title */}
        <header className="space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-text tracking-tight">
            Paghahanap sa Diwang Panlipunan
          </h1>
          <p className="text-sm sm:text-base text-text-muted font-sans">
            Mabilis na saliksikin ang mga sanaysay, pagsusuri sa datos, at pagsusuring pampolitika at pangkabuhayan.
          </p>
        </header>

        {/* Search Content */}
        <Suspense
          fallback={
            <div className="py-12 text-center text-sm text-text-muted animate-pulse">
              Ikinakarga ang mga resulta ng paghahanap...
            </div>
          }
        >
          <SearchResultsContent query={query} />
        </Suspense>
      </div>
    </main>
  );
}
