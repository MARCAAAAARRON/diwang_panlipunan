"use client";

import React, { useState } from "react";
import { Printer, Share2, Copy, Check, ExternalLink, X } from "lucide-react";

interface ArticleActionsProps {
  title: string;
}

export function ArticleActions({ title }: ArticleActionsProps) {
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleCopyLink = async () => {
    if (typeof window !== "undefined") {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        // Fallback for older browsers
        const input = document.createElement("input");
        input.value = window.location.href;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    }
  };

  const handleShareClick = async () => {
    if (typeof window !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          text: `Basahin ang araling ito sa Diwang Panlipunan: ${title}`,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to desktop menu if cancelled or unsupported
      }
    }
    setShowShareMenu((prev) => !prev);
  };

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `Basahin ang "${title}" sa Diwang Panlipunan:`
  )}&url=${encodeURIComponent(currentUrl)}`;

  return (
    <div className="relative inline-flex items-center gap-2 no-print">
      {/* Toast alert when copied */}
      {copied && (
        <div className="fixed top-5 right-5 z-50 px-3.5 py-2 rounded-md bg-zinc-900 text-white text-xs font-mono shadow-xl flex items-center gap-2 border border-zinc-700 animate-in fade-in-50">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Nakopya ang link sa clipboard!</span>
        </div>
      )}

      {/* Print Button */}
      <button
        type="button"
        onClick={handlePrint}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] text-xs font-semibold font-mono transition-colors cursor-pointer"
        title="I-print o i-save bilang PDF"
        aria-label="I-print o i-save bilang PDF"
      >
        <Printer className="w-3.5 h-3.5" aria-hidden="true" />
        <span>I-print / PDF</span>
      </button>

      {/* Share Button */}
      <div className="relative">
        <button
          type="button"
          onClick={handleShareClick}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] text-xs font-semibold font-mono transition-colors cursor-pointer"
          title="Ibahagi ang araling ito"
          aria-expanded={showShareMenu}
        >
          <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Ibahagi</span>
        </button>

        {/* Desktop Share Popover */}
        {showShareMenu && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowShareMenu(false)}
            />
            <div className="absolute right-0 mt-2 w-56 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xl z-50 p-2 space-y-1 text-xs animate-in fade-in-50">
              <div className="flex items-center justify-between px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-[var(--color-text-muted)] border-b border-[var(--color-border)] mb-1">
                <span>Ibahagi ang Aralin</span>
                <button
                  type="button"
                  onClick={() => setShowShareMenu(false)}
                  className="hover:text-[var(--color-text)]"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>

              {/* Copy Link Button */}
              <button
                type="button"
                onClick={handleCopyLink}
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded hover:bg-[var(--color-bg)] text-left text-[var(--color-text)] transition-colors"
              >
                <span className="flex items-center gap-2">
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                  )}
                  <span>{copied ? "Nakopya na!" : "Kopyahin ang Link"}</span>
                </span>
                <kbd className="text-[10px] font-mono text-[var(--color-text-muted)]">URL</kbd>
              </button>

              {/* Facebook Share */}
              <a
                href={fbShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowShareMenu(false)}
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded hover:bg-[var(--color-bg)] text-left text-[var(--color-text)] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                  <span>Facebook</span>
                </span>
              </a>

              {/* Twitter / X Share */}
              <a
                href={twitterShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowShareMenu(false)}
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded hover:bg-[var(--color-bg)] text-left text-[var(--color-text)] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-800 dark:text-zinc-200" />
                  <span>X (Twitter)</span>
                </span>
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
