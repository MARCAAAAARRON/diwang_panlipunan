import React from "react";
import { Source } from "@/types/content";
import { ExternalLink } from "lucide-react";

interface CitationsListProps {
  sources: Source[];
}

export function CitationsList({ sources }: CitationsListProps) {
  if (!sources || sources.length === 0) {
    return null;
  }

  // Helper to validate external URLs safely (HTTP/HTTPS only)
  const isValidExternalUrl = (url: string): boolean => {
    try {
      const parsed = new URL(url);
      return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
      return false;
    }
  };

  return (
    <section id="sanggunian" className="mt-16 pt-8 border-t border-[var(--color-border)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)] font-semibold block">
            Dokumentasyon at Sanggunian
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text)]">
            Mga Sanggunian
          </h2>
        </div>
        <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)]">
          {sources.length} {sources.length === 1 ? "Sanggunian" : "Mga Sanggunian"}
        </span>
      </div>

      <p className="text-xs text-[var(--color-text-muted)] mb-6 font-sans">
        Ang lahat ng datos, sipi, at konklusyon sa araling ito ay nakabatay sa mga pananaliksik, ulat ng pamahalaan, at akademikong lathalain na nasuri ng lupon:
      </p>

      <ol className="space-y-4">
        {sources.map((source, index) => {
          const refIndex = index + 1;
          const isSafeUrl = source.url && isValidExternalUrl(source.url);

          return (
            <li
              key={source.id || index}
              id={`sanggunian-${refIndex}`}
              className="scroll-mt-24 p-3 rounded-md transition-colors border border-transparent hover:border-[var(--color-border)] hover:bg-[var(--color-surface)] flex gap-3 text-sm text-[var(--color-text-muted)] leading-relaxed"
            >
              <span className="font-mono text-xs font-bold text-[var(--color-primary)] shrink-0 pt-0.5">
                [{refIndex}]
              </span>

              <div className="flex-1 space-y-1">
                <div className="text-[var(--color-text)]">
                  {source.author && (
                    <span className="font-semibold text-[var(--color-text)] mr-1">
                      {source.author}
                    </span>
                  )}
                  {source.published_date && (
                    <span className="mr-1">
                      ({new Date(source.published_date).getFullYear() || source.published_date}).
                    </span>
                  )}
                  <span className="italic mr-1">
                    &ldquo;{source.title}&rdquo;
                  </span>
                  {source.publication && (
                    <span className="text-[var(--color-text-muted)]">
                      {source.publication}.
                    </span>
                  )}
                </div>

                {isSafeUrl && (
                  <div className="pt-0.5">
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-link)] hover:underline focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] rounded"
                    >
                      <span>Tingnan ang Orihinal na Lathalain</span>
                      <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    </a>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
