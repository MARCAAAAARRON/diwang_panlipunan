import React from "react";
import Link from "next/link";
import { getAllTopics } from "@/lib/content-service";
import {
  FolderKanban,
  BookOpen,
  Bookmark,
  PlusCircle,
  ArrowRight,
  Clock,
  CheckCircle,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const topics = await getAllTopics();

  // Aggregate stats across topics
  const totalTopics = topics.length;
  const allSubtopics = topics.flatMap((t) => t.subtopics || []);
  const publishedSubtopics = allSubtopics.filter((s) => s.is_published);
  const draftSubtopics = allSubtopics.filter((s) => !s.is_published);

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div>
        <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-primary)] font-semibold block mb-1">
          DASHBOARD NG PATNUGOT
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[var(--color-text)] tracking-tight">
          Pangkalahatang Tanaw sa Nilalaman
        </h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">
          Pangasiwaan ang kalagayan ng 7 pangunahing larangan ng lipunang Pilipino, mga kaugnay na aralin, at talaan ng sanggunian.
        </p>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2">
          <div className="flex items-center justify-between text-[var(--color-text-muted)]">
            <span className="font-mono text-xs uppercase tracking-wider font-semibold">
              Mga Paksa
            </span>
            <FolderKanban className="w-4 h-4 text-[var(--color-primary)]" aria-hidden="true" />
          </div>
          <div className="font-serif text-3xl font-extrabold text-[var(--color-text)]">
            {totalTopics}
          </div>
          <p className="text-xs text-[var(--color-text-muted)]">
            Lahat ay aktibo at naka-configure
          </p>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2">
          <div className="flex items-center justify-between text-[var(--color-text-muted)]">
            <span className="font-mono text-xs uppercase tracking-wider font-semibold">
              Nailathalang Aralin
            </span>
            <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          </div>
          <div className="font-serif text-3xl font-extrabold text-emerald-700 dark:text-emerald-400">
            {publishedSubtopics.length}
          </div>
          <p className="text-xs text-[var(--color-text-muted)]">
            Bukas sa pampublikong pagbasa
          </p>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2">
          <div className="flex items-center justify-between text-[var(--color-text-muted)]">
            <span className="font-mono text-xs uppercase tracking-wider font-semibold">
              Naka-draft
            </span>
            <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" aria-hidden="true" />
          </div>
          <div className="font-serif text-3xl font-extrabold text-amber-700 dark:text-amber-400">
            {draftSubtopics.length}
          </div>
          <p className="text-xs text-[var(--color-text-muted)]">
            Kasalukuyang inihahanda o nirerebisa
          </p>
        </div>

        {/* Metric 4 */}
        <div className="p-5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2">
          <div className="flex items-center justify-between text-[var(--color-text-muted)]">
            <span className="font-mono text-xs uppercase tracking-wider font-semibold">
              Kabuuang Aralin
            </span>
            <BookOpen className="w-4 h-4 text-[var(--color-primary)]" aria-hidden="true" />
          </div>
          <div className="font-serif text-3xl font-extrabold text-[var(--color-text)]">
            {allSubtopics.length}
          </div>
          <p className="text-xs text-[var(--color-text-muted)]">
            Sa kabuuan ng kurikulum
          </p>
        </div>
      </div>

      {/* Quick Action Banner */}
      <div className="p-6 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-lg font-bold text-[var(--color-text)]">
            Magsimula ng Bagong Artikulo o Aralin
          </h2>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
            Lumikha ng bagong aralin gamit ang split-screen live Markdown preview at auto-read time calculation.
          </p>
        </div>
        <Link
          href="/admin/subtopics/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] text-xs font-mono uppercase tracking-wider font-semibold transition-colors shrink-0 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" aria-hidden="true" />
          <span>Lumikha ng Aralin</span>
        </Link>
      </div>

      {/* Topics Overview Table */}
      <div className="border border-[var(--color-border)] rounded-md bg-[var(--color-surface)] overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-[var(--color-border)] flex items-center justify-between">
          <div>
            <h3 className="font-serif text-base font-bold text-[var(--color-text)]">
              Katayuan ng mga Tematikong Paksa
            </h3>
            <p className="text-xs text-[var(--color-text-muted)]">
              Mabilisang pagsusuri sa 7 core themes
            </p>
          </div>
          <Link
            href="/admin/topics"
            className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[var(--color-primary)] hover:underline"
          >
            <span>Pamahalaan ang mga Paksa</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="divide-y divide-[var(--color-border)]">
          {topics.map((t, idx) => (
            <div
              key={t.id || t.slug}
              className="p-4 sm:px-5 flex items-center justify-between gap-4 hover:bg-[var(--color-bg)] transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-[var(--color-text-muted)] w-6">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[var(--color-text)]">
                    {t.name_fil}
                  </h4>
                  <span className="text-xs text-[var(--color-text-muted)] font-sans">
                    {t.name_en}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-6">
                <span className="text-xs font-mono text-[var(--color-text-muted)]">
                  {t.subtopic_count} Aralin
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300">
                  Nailathala
                </span>
                <Link
                  href={`/admin/topics/${t.id}/edit`}
                  className="text-xs font-medium text-[var(--color-link)] hover:underline"
                >
                  I-edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
