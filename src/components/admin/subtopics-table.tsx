"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Subtopic, Topic } from "@/types/content";
import { deleteSubtopic } from "@/lib/subtopic-actions";
import {
  Edit3,
  ExternalLink,
  Trash2,
  Clock,
  Filter,
  Search,
} from "lucide-react";

interface SubtopicRow extends Subtopic {
  topic?: Topic;
}

interface SubtopicsTableProps {
  subtopics: SubtopicRow[];
  topics: Topic[];
}

export function SubtopicsTable({ subtopics, topics }: SubtopicsTableProps) {
  const router = useRouter();
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Filter items
  const filtered = subtopics.filter((item) => {
    const matchesTopic =
      selectedTopic === "all" ||
      item.topic_id === selectedTopic ||
      item.topic?.slug === selectedTopic;

    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "published" && item.is_published) ||
      (selectedStatus === "draft" && !item.is_published);

    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.slug.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTopic && matchesStatus && matchesSearch;
  });

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Sigurado ka bang nais mong tanggalin ang araling "${title}"?`)) {
      return;
    }

    setDeletingId(id);
    try {
      await deleteSubtopic(id);
      router.refresh();
    } catch {
      alert("Nagkaroon ng aberya sa pagtanggal ng aralin.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Filter and Search Bar */}
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--color-text-muted)]">
            <Search className="w-4 h-4" aria-hidden="true" />
          </div>
          <input
            type="text"
            placeholder="Maghanap ayon sa pamagat o slug..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-md border border-[var(--color-input-border)] bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] font-sans"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
            <Filter className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="hidden sm:inline font-mono">Paksa:</span>
          </div>
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="px-2.5 py-1.5 text-xs rounded-md border border-[var(--color-input-border)] bg-[var(--color-bg)] text-[var(--color-text)] font-sans focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
          >
            <option value="all">Lahat ng Paksa ({topics.length})</option>
            {topics.map((t) => (
              <option key={t.id || t.slug} value={t.id}>
                {t.name_fil}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-2.5 py-1.5 text-xs rounded-md border border-[var(--color-input-border)] bg-[var(--color-bg)] text-[var(--color-text)] font-sans focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
          >
            <option value="all">Lahat ng Katayuan</option>
            <option value="published">Nailathala</option>
            <option value="draft">Naka-draft</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="border border-[var(--color-border)] rounded-md bg-[var(--color-surface)] overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-[var(--color-text-muted)]">
            Walang natagpuang aralin na tugma sa iyong filter.
          </div>
        ) : (
          <div className="divide-y divide-[var(--color-border)]">
            {filtered.map((item) => {
              const topicSlug = item.topic?.slug || "kapaligiran";

              return (
                <div
                  key={item.id}
                  className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[var(--color-bg)] transition-colors"
                >
                  {/* Left: Article Details */}
                  <div className="space-y-1.5 flex-1 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold uppercase tracking-[0.06em] px-2 py-0.5 rounded border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-primary)]">
                        {item.topic?.name_fil || "Paksa"}
                      </span>
                      <span className="font-mono text-xs text-[var(--color-text-muted)]">
                        slug: /{item.slug}
                      </span>
                    </div>

                    <h3 className="font-serif text-base sm:text-lg font-bold text-[var(--color-text)] leading-snug">
                      {item.title}
                    </h3>

                    {item.summary && (
                      <p className="text-xs text-[var(--color-text-muted)] line-clamp-2 leading-relaxed">
                        {item.summary}
                      </p>
                    )}

                    <div className="flex items-center gap-3 pt-1 text-xs text-[var(--color-text-muted)] font-mono">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                        <span>{item.read_time_minutes} min read</span>
                      </span>
                    </div>
                  </div>

                  {/* Right: Status & Actions */}
                  <div className="flex items-center gap-3 sm:gap-4 self-end md:self-center shrink-0">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-semibold uppercase tracking-[0.06em] border ${
                        item.is_published
                          ? "border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300"
                          : "border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300"
                      }`}
                    >
                      {item.is_published ? "Nailathala" : "Naka-draft"}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <Link
                        href={`/topics/${topicSlug}/${item.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Tingnan sa Publikong Reader"
                        className="p-2 rounded border border-[var(--color-border)] hover:bg-[var(--color-bg)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                      </Link>

                      <Link
                        href={`/admin/subtopics/${item.id}/edit`}
                        title="I-edit ang Aralin"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] text-xs font-semibold transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>I-edit</span>
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleDelete(item.id, item.title)}
                        disabled={deletingId === item.id}
                        title="Tanggalin ang Aralin"
                        className="p-2 rounded border border-[var(--color-border)] hover:bg-red-50 hover:border-red-300 text-red-600 dark:text-red-400 transition-colors disabled:opacity-50 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
