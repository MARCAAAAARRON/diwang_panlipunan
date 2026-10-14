"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ThumbsUp, ThumbsDown, Check, MessageSquare, Send, Loader2 } from "lucide-react";
import { submitFeedback } from "@/lib/feedback-actions";

interface ReadingFeedbackProps {
  subtopicTitle: string;
  subtopicId?: string;
  subtopicSlug?: string;
}

interface StoredVote {
  helpful: boolean;
  feedbackId?: string;
  commented?: boolean;
}

export function ReadingFeedback({
  subtopicTitle,
  subtopicId = "default-subtopic",
  subtopicSlug = "article",
}: ReadingFeedbackProps) {
  const [response, setResponse] = useState<"helpful" | "not-helpful" | null>(null);
  const [feedbackId, setFeedbackId] = useState<string | null>(null);
  const [showCommentBox, setShowCommentBox] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>("");
  const [isSubmittingVote, setIsSubmittingVote] = useState<boolean>(false);
  const [isSubmittingComment, setIsSubmittingComment] = useState<boolean>(false);
  const [commentSubmitted, setCommentSubmitted] = useState<boolean>(false);

  // Restore local storage vote lock on mount
  useEffect(() => {
    try {
      const storageKey = `diwang_feedback_${subtopicSlug}`;
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed: StoredVote = JSON.parse(saved);
        setResponse(parsed.helpful ? "helpful" : "not-helpful");
        if (parsed.feedbackId) setFeedbackId(parsed.feedbackId);
        if (parsed.commented) setCommentSubmitted(true);
      }
    } catch {
      // Ignore local storage error
    }
  }, [subtopicSlug]);

  const handleVote = async (isHelpful: boolean) => {
    if (response || isSubmittingVote) return;

    setIsSubmittingVote(true);
    setResponse(isHelpful ? "helpful" : "not-helpful");
    setShowCommentBox(true);

    try {
      const res = await submitFeedback(subtopicId, isHelpful);
      const generatedId = res.feedbackId || `local-${Date.now()}`;
      setFeedbackId(generatedId);

      const storageKey = `diwang_feedback_${subtopicSlug}`;
      localStorage.setItem(
        storageKey,
        JSON.stringify({ helpful: isHelpful, feedbackId: generatedId })
      );
    } catch (err) {
      console.warn("Feedback submission error:", err);
    } finally {
      setIsSubmittingVote(false);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || isSubmittingComment) return;

    setIsSubmittingComment(true);
    try {
      await submitFeedback(
        subtopicId,
        response === "helpful",
        commentText.trim(),
        feedbackId || undefined
      );
      setCommentSubmitted(true);
      setShowCommentBox(false);

      const storageKey = `diwang_feedback_${subtopicSlug}`;
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          helpful: response === "helpful",
          feedbackId,
          commented: true,
        })
      );
    } catch (err) {
      console.warn("Comment submission error:", err);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  return (
    <section
      id="feedback"
      aria-label="Puna sa Aralin"
      className="mt-14 p-6 sm:p-7 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] scroll-mt-24 transition-colors"
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
            Ang iyong tugon ay nakatutulong sa lupon upang mapabuti ang kalidad ng nilalaman ukol sa &ldquo;{subtopicTitle}&rdquo;.
          </p>
        </div>

        {response ? (
          <div className="flex items-center gap-2 px-4 py-2 rounded-md bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold shrink-0">
            <Check className="w-4 h-4" aria-hidden="true" />
            <span>Naitugon ({response === "helpful" ? "Oo" : "Hindi"})</span>
          </div>
        ) : (
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              disabled={isSubmittingVote}
              onClick={() => handleVote(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md border border-[var(--color-border)] bg-[var(--color-page)] hover:bg-[var(--color-surface)] hover:border-[var(--color-primary)] text-xs font-semibold text-[var(--color-text)] transition-colors cursor-pointer disabled:opacity-50"
            >
              <ThumbsUp className="w-3.5 h-3.5 text-[var(--color-primary)]" aria-hidden="true" />
              <span>Oo</span>
            </button>
            <button
              type="button"
              disabled={isSubmittingVote}
              onClick={() => handleVote(false)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md border border-[var(--color-border)] bg-[var(--color-page)] hover:bg-[var(--color-surface)] hover:border-[var(--color-error)] text-xs font-semibold text-[var(--color-text)] transition-colors cursor-pointer disabled:opacity-50"
            >
              <ThumbsDown className="w-3.5 h-3.5 text-[var(--color-text-muted)]" aria-hidden="true" />
              <span>Hindi</span>
            </button>
          </div>
        )}
      </div>

      {/* Expandable Optional Comment Field */}
      {showCommentBox && !commentSubmitted && (
        <form onSubmit={handleCommentSubmit} className="mt-5 pt-4 border-t border-[var(--color-border)] space-y-3">
          <label htmlFor="feedback-comment" className="block text-xs font-medium text-[var(--color-text)]">
            May nais ka bang idagdag, ituwid, o imungkahi upang higit pang mapabuti ang araling ito? <span className="text-[var(--color-text-muted)] font-normal">(Opsyonal)</span>
          </label>
          <textarea
            id="feedback-comment"
            rows={3}
            maxLength={500}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Halimbawa: May bagong datos noong 2024 mula sa PSA ukol sa paksang ito..."
            className="w-full p-3 text-xs rounded-md border border-[var(--color-input-border)] bg-[var(--color-page)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
          />
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[var(--color-text-muted)]">
              {500 - commentText.length} titik ang natitira
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowCommentBox(false)}
                className="px-3 py-1.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
              >
                Laktawan
              </button>
              <button
                type="submit"
                disabled={isSubmittingComment || !commentText.trim()}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-[var(--color-primary)] text-[var(--color-primary-contrast)] text-xs font-medium hover:opacity-95 disabled:opacity-50 transition-opacity"
              >
                {isSubmittingComment ? (
                  <>
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>Ipinapadala...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3 h-3" />
                    <span>Ipadala ang Puna</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      )}

      {commentSubmitted && (
        <div className="mt-4 pt-3 border-t border-[var(--color-border)] text-xs text-emerald-700 dark:text-emerald-400 font-medium">
          Maraming salamat! Naitala ang iyong karagdagang puna para sa pagsusuri ng aming lupon.
        </div>
      )}

      {/* Suggestion Box Link */}
      <div className="mt-4 pt-4 border-t border-[var(--color-border)] flex items-center justify-between text-xs text-[var(--color-text-muted)]">
        <Link
          href="/magmungkahi"
          className="inline-flex items-center gap-1.5 text-[var(--color-link)] hover:underline font-medium"
        >
          <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
          <span>May mungkahi sa bagong paksa o suliraning panlipunan? Magmungkahi rito &rarr;</span>
        </Link>
      </div>
    </section>
  );
}
