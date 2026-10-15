"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MessageSquare, ThumbsUp, ThumbsDown, X, ExternalLink, Calendar } from "lucide-react";

export interface SubtopicFeedbackSummary {
  subtopicId: string;
  subtopicTitle: string;
  subtopicSlug: string;
  topicTitle: string;
  topicSlug: string;
  helpfulCount: number;
  unhelpfulCount: number;
  totalVotes: number;
  satisfactionRate: number;
  comments: {
    id: string;
    comment: string;
    isHelpful: boolean;
    createdAt: string;
  }[];
}

interface FeedbackTableProps {
  data: SubtopicFeedbackSummary[];
}

export function FeedbackTable({ data }: FeedbackTableProps) {
  const [selectedSubtopic, setSelectedSubtopic] = useState<SubtopicFeedbackSummary | null>(null);

  return (
    <>
      <div className="overflow-x-auto rounded-md border border-[var(--color-border)] bg-[var(--color-surface)]">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text-muted)] font-mono uppercase tracking-wider">
              <th className="py-3 px-4 font-semibold">Aralin at Paksa</th>
              <th className="py-3 px-4 font-semibold text-center">Oo (Nakatulong)</th>
              <th className="py-3 px-4 font-semibold text-center">Hindi</th>
              <th className="py-3 px-4 font-semibold">Bilis ng Kasiyahan</th>
              <th className="py-3 px-4 font-semibold text-center">Mga Puna</th>
              <th className="py-3 px-4 font-semibold text-right">Aksyon</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {data.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-xs text-[var(--color-text-muted)]">
                  Wala pang naitalang feedback mula sa mga mambabasa.
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.subtopicId} className="hover:bg-[var(--color-bg)]/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-serif font-bold text-sm text-[var(--color-text)]">
                      {item.subtopicTitle}
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)] mt-0.5">
                      {item.topicTitle}
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-center font-mono font-medium text-emerald-700 dark:text-emerald-400">
                    <span className="inline-flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3" />
                      {item.helpfulCount}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-center font-mono font-medium text-red-600 dark:text-red-400">
                    <span className="inline-flex items-center gap-1">
                      <ThumbsDown className="w-3 h-3" />
                      {item.unhelpfulCount}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="space-y-1 w-36">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="font-bold text-[var(--color-text)]">
                          {item.totalVotes > 0 ? `${item.satisfactionRate}%` : "—"}
                        </span>
                        <span className="text-[var(--color-text-muted)]">
                          {item.totalVotes} boto
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-[var(--color-border)] overflow-hidden">
                        <div
                          className="h-full bg-emerald-600 dark:bg-emerald-500 transition-all duration-300"
                          style={{ width: `${item.totalVotes > 0 ? item.satisfactionRate : 0}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    {item.comments.length > 0 ? (
                      <button
                        type="button"
                        onClick={() => setSelectedSubtopic(item)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-[var(--color-border)] bg-[var(--color-page)] hover:border-[var(--color-primary)] text-xs font-mono font-medium text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>{item.comments.length} puna</span>
                      </button>
                    ) : (
                      <span className="text-xs font-mono text-[var(--color-text-muted)]">
                        Walang puna
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href={`/topics/${item.topicSlug}/${item.subtopicSlug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                      title="Buksan ang aralin"
                    >
                      <span>Aralin</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Reader Comments Modal */}
      {selectedSubtopic && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        >
          <div className="w-full max-w-2xl bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md shadow-2xl flex flex-col max-h-[85vh] animate-in fade-in-50">
            {/* Modal Header */}
            <div className="flex items-start justify-between p-5 border-b border-[var(--color-border)]">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.06em] text-[var(--color-text-muted)]">
                  MGA PUNA NG MAMBABASA • {selectedSubtopic.topicTitle}
                </span>
                <h3 className="font-serif text-lg font-bold text-[var(--color-text)] mt-0.5">
                  {selectedSubtopic.subtopicTitle}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSubtopic(null)}
                className="p-1 rounded text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg)] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Comments List */}
            <div className="p-5 overflow-y-auto space-y-3.5 divide-y divide-[var(--color-border)]">
              {selectedSubtopic.comments.map((c, idx) => (
                <div key={c.id || idx} className="pt-3.5 first:pt-0 space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-mono">
                    <span className="inline-flex items-center gap-1">
                      {c.isHelpful ? (
                        <span className="text-emerald-700 dark:text-emerald-400 font-semibold inline-flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3" /> Nakatulong
                        </span>
                      ) : (
                        <span className="text-red-600 dark:text-red-400 font-semibold inline-flex items-center gap-1">
                          <ThumbsDown className="w-3 h-3" /> Hindi Nakatulong
                        </span>
                      )}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(c.createdAt).toLocaleDateString("fil-PH", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--color-text)] font-sans leading-relaxed bg-[var(--color-page)] p-3 rounded border border-[var(--color-border)]">
                    &ldquo;{c.comment}&rdquo;
                  </p>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-bg)] flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedSubtopic(null)}
                className="px-4 py-2 text-xs font-semibold rounded border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-page)] transition-colors"
              >
                Isara
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
