import React from "react";
import Link from "next/link";
import { getAllTopics } from "@/lib/content-service";
import { TopicIcon } from "@/components/ui/topic-icon";
import { TopicDeleteButton } from "@/components/admin/topic-delete-button";
import { ExternalLink, Edit3, ArrowLeft } from "lucide-react";

export default async function AdminTopicsPage() {
  const topics = await getAllTopics();

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/admin"
              className="text-xs font-mono text-[var(--color-primary)] hover:underline inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Admin Dashboard</span>
            </Link>
          </div>
          <h1 className="font-serif text-3xl font-extrabold text-[var(--color-text)] tracking-tight">
            Pamamahala ng mga Tematikong Paksa
          </h1>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">
            Pangunahing mga larangan ng lipunang Pilipino. I-edit ang mga pamagat, paglalarawan, at kaayusan.
          </p>
        </div>

        <Link
          href="/admin/topics/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] text-xs font-semibold font-mono uppercase tracking-wider transition-colors shrink-0 shadow-none"
        >
          <span>+ Lumikha ng Bagong Paksa</span>
        </Link>
      </div>

      {/* Topics List Table */}
      <div className="border border-[var(--color-border)] rounded-md bg-[var(--color-surface)] overflow-hidden">
        <div className="divide-y divide-[var(--color-border)]">
          {topics.map((topic, index) => {
            const sequenceNum = String(topic.order_index || index + 1).padStart(2, "0");

            return (
              <div
                key={topic.id || topic.slug}
                className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[var(--color-bg)] transition-colors"
              >
                {/* Left: Icon, Number, Titles */}
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] flex items-center justify-center shrink-0"
                    style={{ color: `var(${topic.color_token})` }}
                  >
                    <TopicIcon name={topic.icon_name} className="w-5 h-5" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[var(--color-text-muted)]">
                        PAKSA {sequenceNum}
                      </span>
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block"
                        style={{ backgroundColor: `var(${topic.color_token})` }}
                        title={`Color token: ${topic.color_token}`}
                      />
                    </div>

                    <h2 className="font-serif text-lg font-bold text-[var(--color-text)] leading-snug">
                      {topic.name_fil}
                    </h2>
                    <p className="text-xs text-[var(--color-text-muted)] font-sans">
                      {topic.name_en}
                    </p>
                    <p className="text-xs text-[var(--color-text)] line-clamp-1 max-w-2xl pt-1">
                      {topic.description_fil}
                    </p>
                  </div>
                </div>

                {/* Right: Metrics, Status & Actions */}
                <div className="flex items-center gap-4 sm:gap-6 self-end md:self-center shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[var(--color-border)] w-full md:w-auto justify-between md:justify-end">
                  <div className="text-left md:text-right font-mono text-xs">
                    <span className="font-semibold text-[var(--color-text)] block">
                      {topic.subtopic_count} Aralin
                    </span>
                    <span className="text-[10px] text-[var(--color-text-muted)]">
                      Nailathala
                    </span>
                  </div>

                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300">
                    {topic.is_published ? "Nailathala" : "Naka-draft"}
                  </span>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/topics/${topic.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Tingnan sa Pampublikong Website"
                      className="p-1.5 rounded border border-[var(--color-border)] hover:bg-[var(--color-bg)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>

                    <Link
                      href={`/admin/topics/${topic.id}/edit`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] text-xs font-semibold transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>I-edit</span>
                    </Link>

                    <TopicDeleteButton
                      topicId={topic.id}
                      topicName={topic.name_fil}
                      subtopicCount={topic.subtopic_count}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
