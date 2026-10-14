import React from "react";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Clock, Calendar, CheckCircle, Image as ImageIcon } from "lucide-react";
import { ArticleActions } from "./article-actions";

interface ArticleHeaderProps {
  topicTitle: string;
  topicSlug: string;
  topicNumber?: string;
  subtopicTitle: string;
  readTimeMinutes: number;
  publishedAt?: string | null;
  imageCaption?: string;
  imageCredit?: string;
}

export function ArticleHeader({
  topicTitle,
  topicSlug,
  topicNumber = "01",
  subtopicTitle,
  readTimeMinutes,
  publishedAt,
  imageCaption,
  imageCredit,
}: ArticleHeaderProps) {
  // Format publication date in Filipino
  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("fil-PH", {
        year: "numeric",
        month: "long",
      })
    : "Enero 2026";

  const defaultCaption =
    imageCaption ||
    "Dokumentasyon ng krisis at kalagayan sa mga pamayanan sa Pilipinas.";
  const defaultCredit =
    imageCredit || "Dokumentaryong Panlipunan at Pananaliksik, 2026";

  return (
    <header className="mb-10 space-y-6">
      {/* Semantic Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Pangunahing Pahina", href: "/home" },
          { label: "Mga Paksa", href: "/topics" },
          { label: topicTitle, href: `/topics/${topicSlug}` },
          { label: subtopicTitle },
        ]}
      />

      {/* Thematic Category Tag */}
      <div>
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono font-bold tracking-wider uppercase border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--topic-color)]">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: "var(--topic-color)" }}
            aria-hidden="true"
          />
          PAKSA {topicNumber} • {topicTitle}
        </span>
      </div>

      {/* Article Title */}
      <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--color-text)] leading-[1.18]">
        {subtopicTitle}
      </h1>

      {/* Editorial Metadata Bar & Article Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 pb-4 border-b border-[var(--color-border)] text-xs text-[var(--color-text-muted)] font-mono">
        <div className="flex flex-wrap items-center gap-y-2 gap-x-4">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[var(--color-primary)]" aria-hidden="true" />
            <span>{readTimeMinutes} minutong pagbasa</span>
          </div>

          <span className="text-[var(--color-border)]">•</span>

          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[var(--color-primary)]" aria-hidden="true" />
            <span className="capitalize">{formattedDate}</span>
          </div>

          <span className="text-[var(--color-border)]">•</span>

          <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-sans font-medium">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            <span>Nasuri ng Lupon ng mga Mananaliksik</span>
          </div>
        </div>

        <ArticleActions title={subtopicTitle} />
      </div>

      {/* Editorial Featured Photo Container */}
      <figure className="my-6 border border-[var(--color-border)] rounded-md overflow-hidden bg-[var(--color-surface)]">
        <div className="w-full h-64 sm:h-80 md:h-96 bg-gradient-to-br from-neutral-800 to-neutral-900 flex flex-col items-center justify-center p-6 text-center text-neutral-300 relative">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          <ImageIcon className="w-12 h-12 mb-3 text-neutral-400 relative z-10" aria-hidden="true" />
          <p className="font-serif text-lg text-neutral-200 font-medium max-w-md relative z-10">
            {subtopicTitle}
          </p>
          <span className="mt-2 text-xs font-mono text-neutral-400 uppercase tracking-widest relative z-10">
            Dokumentasyon ng Larangan • Diwang Panlipunan
          </span>
        </div>
        <figcaption className="p-3.5 sm:p-4 text-xs text-[var(--color-text-muted)] border-t border-[var(--color-border)] bg-[var(--color-surface)] space-y-0.5">
          <p className="font-sans text-[var(--color-text)]">
            <strong className="font-semibold text-[var(--color-primary)]">Larawan:</strong>{" "}
            {defaultCaption}
          </p>
          <p className="font-mono text-[11px] text-[var(--color-text-muted)]">
            {defaultCredit}
          </p>
        </figcaption>
      </figure>
    </header>
  );
}
