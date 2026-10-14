"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ThumbsUp, ThumbsDown, Check, MessageSquare } from "lucide-react";

interface ReadingFeedbackProps {
  subtopicTitle: string;
}

export function ReadingFeedback({ subtopicTitle }: ReadingFeedbackProps) {
  const [response, setResponse] = useState<"helpful" | "not-helpful" | null>(null);

  return (
    <section
      id="feedback"
      aria-label="Puna sa Aralin"
      className="mt-14 p-6 sm:p-7 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] scroll-mt-24"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)] font-semibold block mb-1">
            PUNA AT PAGPAPABUTI
          </span>
          <h3 className="font-serif text-lg font-bold text-[var(--color-text)]">
            Nakatulong ba ang araling ito sa iyong pag-unawa?
          </h3>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">
            Ang iyong tugon ay nakatutulong sa lupon upang mapabuti ang kalidad ng nilalaman.
          </p>
        </div>

        {response ? (
          <div className="flex items-center gap-2 px-4 py-2 rounded-md bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
            <Check className="w-4 h-4" aria-hidden="true" />
            <span>Salamat sa iyong tugon!</span>
          </div>
        ) : (
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setResponse("helpful")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] hover:bg-[var(--color-surface)] hover:border-[var(--color-primary)] text-xs font-semibold text-[var(--color-text)] transition-colors cursor-pointer"
            >
              <ThumbsUp className="w-3.5 h-3.5 text-[var(--color-primary)]" aria-hidden="true" />
              <span>Oo</span>
            </button>
            <button
              type="button"
              onClick={() => setResponse("not-helpful")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] hover:bg-[var(--color-surface)] hover:border-[var(--color-error)] text-xs font-semibold text-[var(--color-text)] transition-colors cursor-pointer"
            >
              <ThumbsDown className="w-3.5 h-3.5 text-[var(--color-text-muted)]" aria-hidden="true" />
              <span>Hindi</span>
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-[var(--color-border)] flex items-center justify-between text-xs text-[var(--color-text-muted)]">
        <Link
          href="/makipag-ugnayan"
          className="inline-flex items-center gap-1.5 text-[var(--color-link)] hover:underline font-medium"
        >
          <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
          <span>May mungkahi o nais idagdag na sanggunian? Sumulat sa amin &rarr;</span>
        </Link>
      </div>
    </section>
  );
}
