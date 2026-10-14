import React from "react";
import Link from "next/link";
import { Subtopic } from "@/types/content";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ArticlePaginationProps {
  topicSlug: string;
  prev: Subtopic | null;
  next: Subtopic | null;
}

export function ArticlePagination({
  topicSlug,
  prev,
  next,
}: ArticlePaginationProps) {
  if (!prev && !next) {
    return null;
  }

  return (
    <nav
      aria-label="Pag-navigate sa mga Karugtong na Aralin"
      className="mt-16 pt-8 border-t border-[var(--color-border)] grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      {/* Previous Subtopic */}
      {prev ? (
        <Link
          href={`/topics/${topicSlug}/${prev.slug}`}
          className="group flex flex-col justify-between p-4 sm:p-5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)] transition-colors text-left"
        >
          <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--color-primary)] font-semibold uppercase tracking-wider mb-2">
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
            <span>Nakaraang Aralin</span>
          </div>
          <span className="font-serif text-base font-bold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
            {prev.title}
          </span>
          <span className="mt-2 text-xs text-[var(--color-text-muted)] font-mono">
            {prev.read_time_minutes} minutong pagbasa
          </span>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}

      {/* Next Subtopic */}
      {next ? (
        <Link
          href={`/topics/${topicSlug}/${next.slug}`}
          className="group flex flex-col justify-between p-4 sm:p-5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)] transition-colors text-right sm:text-right"
        >
          <div className="flex items-center justify-end gap-1.5 text-xs font-mono text-[var(--color-primary)] font-semibold uppercase tracking-wider mb-2">
            <span>Susunod na Aralin</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </div>
          <span className="font-serif text-base font-bold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
            {next.title}
          </span>
          <span className="mt-2 text-xs text-[var(--color-text-muted)] font-mono">
            {next.read_time_minutes} minutong pagbasa
          </span>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}
    </nav>
  );
}
