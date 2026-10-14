"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import {
  Inbox,
  Clock,
  CheckCircle,
  XCircle,
  FilePlus,
  Trash2,
  Mail,
  BookOpen,
  Calendar,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { updateSuggestionStatus, deleteSuggestion } from "@/lib/triage-actions";
import type { SuggestionStatus } from "@/types/database";

export interface SuggestionItem {
  id: string;
  topic_title: string;
  description: string;
  rationale: string | null;
  contact_email: string | null;
  status: SuggestionStatus;
  created_at: string;
}

interface SuggestionsBoardProps {
  initialSuggestions: SuggestionItem[];
}

export function SuggestionsBoard({ initialSuggestions }: SuggestionsBoardProps) {
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>(initialSuggestions);
  const [filter, setFilter] = useState<"all" | SuggestionStatus>("all");
  const [isPending, startTransition] = useTransition();
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const filtered = suggestions.filter((s) => {
    if (filter === "all") return true;
    return s.status === filter;
  });

  const handleStatusChange = (id: string, newStatus: SuggestionStatus) => {
    // Optimistic update
    setSuggestions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );

    startTransition(async () => {
      const res = await updateSuggestionStatus(id, newStatus);
      if (res.message) {
        setFeedbackMsg(res.message);
        setTimeout(() => setFeedbackMsg(null), 3000);
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!window.confirm("Sigurado ka bang nais mong tanggalin ang mungkahing ito?")) {
      return;
    }

    setSuggestions((prev) => prev.filter((item) => item.id !== id));

    startTransition(async () => {
      const res = await deleteSuggestion(id);
      if (res.message) {
        setFeedbackMsg(res.message);
        setTimeout(() => setFeedbackMsg(null), 3000);
      }
    });
  };

  const getStatusBadge = (status: SuggestionStatus) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
            <Clock className="w-3 h-3" /> Nakabinbin
          </span>
        );
      case "in_review":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
            <Clock className="w-3 h-3" /> Sinusuri
          </span>
        );
      case "implemented":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            <CheckCircle className="w-3 h-3" /> Naipatupad
          </span>
        );
      case "dismissed":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700">
            <XCircle className="w-3 h-3" /> Tinanggihan
          </span>
        );
    }
  };

  // Counts
  const counts = {
    all: suggestions.length,
    pending: suggestions.filter((s) => s.status === "pending").length,
    in_review: suggestions.filter((s) => s.status === "in_review").length,
    implemented: suggestions.filter((s) => s.status === "implemented").length,
    dismissed: suggestions.filter((s) => s.status === "dismissed").length,
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {feedbackMsg && (
        <div className="fixed bottom-5 right-5 z-50 p-3 rounded-md bg-zinc-900 text-white text-xs font-mono shadow-lg flex items-center gap-2 border border-zinc-700">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-text-muted)]">
            Kabuuang Mungkahi
          </div>
          <div className="font-serif text-2xl font-bold text-[var(--color-text)] mt-1">
            {counts.all}
          </div>
        </div>

        <div className="p-4 rounded-md border border-amber-300 dark:border-amber-900 bg-amber-50/50 dark:bg-amber-950/20">
          <div className="text-[11px] font-mono uppercase tracking-wider text-amber-800 dark:text-amber-400 font-semibold">
            Nakabinbin
          </div>
          <div className="font-serif text-2xl font-bold text-amber-900 dark:text-amber-200 mt-1">
            {counts.pending}
          </div>
        </div>

        <div className="p-4 rounded-md border border-blue-300 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/20">
          <div className="text-[11px] font-mono uppercase tracking-wider text-blue-800 dark:text-blue-400 font-semibold">
            Sinusuri
          </div>
          <div className="font-serif text-2xl font-bold text-blue-900 dark:text-blue-200 mt-1">
            {counts.in_review}
          </div>
        </div>

        <div className="p-4 rounded-md border border-emerald-300 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/20">
          <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-800 dark:text-emerald-400 font-semibold">
            Naipatupad
          </div>
          <div className="font-serif text-2xl font-bold text-emerald-900 dark:text-emerald-200 mt-1">
            {counts.implemented}
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1 border-b border-[var(--color-border)] pb-2 text-xs font-mono">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
            filter === "all"
              ? "bg-[var(--color-primary)] text-[var(--color-primary-contrast)]"
              : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)]"
          }`}
        >
          Lahat ({counts.all})
        </button>
        <button
          type="button"
          onClick={() => setFilter("pending")}
          className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
            filter === "pending"
              ? "bg-[var(--color-primary)] text-[var(--color-primary-contrast)]"
              : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)]"
          }`}
        >
          Nakabinbin ({counts.pending})
        </button>
        <button
          type="button"
          onClick={() => setFilter("in_review")}
          className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
            filter === "in_review"
              ? "bg-[var(--color-primary)] text-[var(--color-primary-contrast)]"
              : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)]"
          }`}
        >
          Sinusuri ({counts.in_review})
        </button>
        <button
          type="button"
          onClick={() => setFilter("implemented")}
          className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
            filter === "implemented"
              ? "bg-[var(--color-primary)] text-[var(--color-primary-contrast)]"
              : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)]"
          }`}
        >
          Naipatupad ({counts.implemented})
        </button>
        <button
          type="button"
          onClick={() => setFilter("dismissed")}
          className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
            filter === "dismissed"
              ? "bg-[var(--color-primary)] text-[var(--color-primary-contrast)]"
              : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)]"
          }`}
        >
          Tinanggihan ({counts.dismissed})
        </button>
      </div>

      {/* Suggestion Cards */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="p-8 text-center border border-[var(--color-border)] rounded-md bg-[var(--color-surface)] space-y-2">
            <Inbox className="w-8 h-8 text-[var(--color-text-muted)] mx-auto" />
            <p className="text-xs text-[var(--color-text-muted)] font-mono">
              Walang mungkahi sa kategoryang ito.
            </p>
          </div>
        ) : (
          filtered.map((item) => (
            <article
              key={item.id}
              className="p-5 sm:p-6 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] space-y-4 hover:border-[var(--color-primary)]/50 transition-colors"
            >
              {/* Header: Title, Status Badge, Date */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {getStatusBadge(item.status)}
                    <span className="text-[11px] font-mono text-[var(--color-text-muted)] flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(item.created_at).toLocaleDateString("fil-PH", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[var(--color-text)]">
                    {item.topic_title}
                  </h3>
                </div>

                {/* Status Switcher & Delete Action */}
                <div className="flex items-center gap-2 shrink-0">
                  <select
                    value={item.status}
                    disabled={isPending}
                    onChange={(e) =>
                      handleStatusChange(item.id, e.target.value as SuggestionStatus)
                    }
                    className="h-8 px-2.5 rounded border border-[var(--color-input-border)] bg-[var(--color-page)] text-xs text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] font-mono"
                  >
                    <option value="pending">Nakabinbin</option>
                    <option value="in_review">Sinusuri</option>
                    <option value="implemented">Naipatupad</option>
                    <option value="dismissed">Tinanggihan</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-red-600 hover:border-red-300 dark:hover:text-red-400 transition-colors"
                    title="Tanggalin ang mungkahi"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Description Body */}
              <p className="text-xs sm:text-sm text-[var(--color-text)] font-sans leading-relaxed whitespace-pre-wrap">
                {item.description}
              </p>

              {/* Rationale / Sources if provided */}
              {item.rationale && (
                <div className="p-3 rounded bg-[var(--color-page)] border border-[var(--color-border)] text-xs space-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-semibold block">
                    Iminungkahing Sanggunian o Batayan:
                  </span>
                  <p className="text-[var(--color-text)] font-sans italic">
                    {item.rationale}
                  </p>
                </div>
              )}

              {/* Submitter & Transition Action Bar */}
              <div className="pt-3 border-t border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
                  <Mail className="w-3.5 h-3.5" />
                  <span>
                    Nagmungkahi:{" "}
                    <strong className="text-[var(--color-text)] font-mono">
                      {item.contact_email || "Hindi nagpakilala (Anonimo)"}
                    </strong>
                  </span>
                </div>

                <Link
                  href={`/admin/subtopics/new?title=${encodeURIComponent(
                    item.topic_title
                  )}&summary=${encodeURIComponent(item.description.slice(0, 200))}`}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded border border-[var(--color-border)] bg-[var(--color-page)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] text-xs font-semibold text-[var(--color-text)] transition-colors"
                >
                  <FilePlus className="w-3.5 h-3.5" />
                  <span>Gawing Aralin &rarr;</span>
                </Link>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
