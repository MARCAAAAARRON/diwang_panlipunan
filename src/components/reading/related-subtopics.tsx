import React from "react";
import Link from "next/link";
import { Clock, ArrowRight, BookOpen } from "lucide-react";
import type { RelatedSubtopicItem } from "@/lib/content-service";

interface RelatedSubtopicsProps {
  related: RelatedSubtopicItem[];
}

export function RelatedSubtopics({ related }: RelatedSubtopicsProps) {
  if (!related || related.length === 0) return null;

  return (
    <section
      aria-label="Kaugnay na mga Aralin"
      className="mt-14 pt-8 border-t border-[var(--color-border)] space-y-6 no-print"
    >
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-primary)]">
          <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
          <span>SANGANDAAN NG MGA ISYU</span>
        </div>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[var(--color-text)] tracking-tight">
          Kaugnay na mga Aralin at Pagsusuri
        </h2>
        <p className="text-xs sm:text-sm text-[var(--color-text-muted)] font-sans">
          Palawakin ang pag-unawa sa pamamagitan ng mga araling may tuwirang ugnayan sa paksang ito.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {related.map((item) => (
          <article
            key={item.id}
            className="group flex flex-col justify-between p-4 sm:p-5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)] transition-all"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="px-2 py-0.5 rounded font-semibold bg-[var(--color-highlight)] text-[var(--color-text)] border border-[var(--color-border)]">
                  {item.topicTitle}
                </span>
                <span className="text-[var(--color-text-muted)] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {item.readTimeMinutes}m
                </span>
              </div>

              <h3 className="font-serif text-base font-bold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors leading-snug">
                <Link
                  href={`/topics/${item.topicSlug}/${item.slug}`}
                  className="hover:underline focus:outline-none"
                >
                  {item.title}
                </Link>
              </h3>

              <p className="text-xs text-[var(--color-text-muted)] font-sans line-clamp-2 leading-relaxed">
                {item.summary}
              </p>
            </div>

            <div className="pt-3 mt-3 border-t border-[var(--color-border)]/60 flex items-center justify-between text-xs font-medium text-[var(--color-primary)]">
              <span>Basahin ang aralin</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
