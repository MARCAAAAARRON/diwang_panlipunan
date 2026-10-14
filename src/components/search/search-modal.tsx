"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SearchResultItem } from "@/lib/search-service";
import { Search, X, Clock, ArrowRight, CornerDownLeft, Loader2, BookOpen } from "lucide-react";

export function SearchModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Global Keyboard Shortcuts (Cmd+K, Ctrl+K, ESC) and Custom Event Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    const handleOpenEvent = () => {
      setIsOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-search-modal", handleOpenEvent);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-search-modal", handleOpenEvent);
    };
  }, [isOpen]);

  // Focus input on modal open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Debounced search query
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    const trimmed = query.trim();
    if (!trimmed || trimmed.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    debounceTimerRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.results || []);
          setSelectedIndex(0);
        }
      } catch {
        // Fallback error handling
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [query]);

  // Keyboard navigation within results
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < results.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results.length > 0 && results[selectedIndex]) {
        const target = results[selectedIndex];
        setIsOpen(false);
        router.push(`/topics/${target.topicSlug}/${target.slug}`);
      } else if (query.trim()) {
        setIsOpen(false);
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Paghahanap sa Diwang Panlipunan"
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-20 bg-black/50 backdrop-blur-xs transition-opacity"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full max-w-2xl bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in-50 zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative border-b border-[var(--color-border)] bg-[var(--color-bg)] flex items-center px-4">
          <Search className="w-5 h-5 text-[var(--color-text-muted)] shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Maghanap ng paksa, aralin, o datos (hal. klima, edukasyon, badyet)..."
            className="w-full h-14 px-3 text-sm sm:text-base bg-transparent text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none font-sans"
          />

          <div className="flex items-center gap-2">
            {loading && (
              <Loader2 className="w-4 h-4 animate-spin text-[var(--color-primary)] shrink-0" />
            )}
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="p-1 rounded hover:bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] cursor-pointer"
                aria-label="I-clear ang query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-[var(--color-text-muted)] bg-[var(--color-surface)] border border-[var(--color-border)] rounded">
              ESC
            </kbd>
          </div>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-3 divide-y divide-[var(--color-border)]">
          {query.trim().length >= 2 && results.length === 0 && !loading && (
            <div className="p-8 text-center text-xs text-[var(--color-text-muted)] space-y-2">
              <BookOpen className="w-8 h-8 mx-auto opacity-40 text-[var(--color-text-muted)]" />
              <p className="font-serif text-sm font-semibold text-[var(--color-text)]">
                Walang natagpuang aralin para sa &ldquo;{query}&rdquo;
              </p>
              <p className="font-sans text-[11px] max-w-sm mx-auto">
                Subukan ang ibang mga termino tulad ng <em>klima</em>, <em>kalusugan</em>, o <em>demokrasya</em>.
              </p>
            </div>
          )}

          {results.map((item, idx) => {
            const isSelected = idx === selectedIndex;

            return (
              <Link
                key={item.id}
                href={`/topics/${item.topicSlug}/${item.slug}`}
                onClick={() => setIsOpen(false)}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`block p-3 sm:p-4 rounded-md transition-colors ${
                  isSelected
                    ? "bg-[var(--color-bg)] border border-[var(--color-primary)]"
                    : "border border-transparent hover:bg-[var(--color-bg)]"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: `var(${item.topicColorToken})` }}
                      aria-hidden="true"
                    />
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                      {item.topicNameFil}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-text-muted)]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[var(--color-primary)]" />
                      <span>{item.readTimeMinutes} min</span>
                    </span>
                    {isSelected && (
                      <span className="hidden sm:flex items-center gap-1 text-[10px] font-semibold text-[var(--color-primary)]">
                        <span>Pumunta</span>
                        <CornerDownLeft className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </div>

                <h4 className="font-serif text-sm sm:text-base font-bold text-[var(--color-text)] leading-snug">
                  {item.title}
                </h4>

                {item.matchedSnippet && (
                  <p className="text-xs text-[var(--color-text-muted)] mt-1 line-clamp-2 font-sans leading-relaxed">
                    {item.matchedSnippet}
                  </p>
                )}
              </Link>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[var(--color-bg)] border-t border-[var(--color-border)] flex items-center justify-between text-xs font-mono text-[var(--color-text-muted)]">
          <div className="hidden sm:flex items-center gap-3 text-[11px]">
            <span><kbd className="px-1 border border-[var(--color-border)] rounded bg-[var(--color-surface)]">↑</kbd> <kbd className="px-1 border border-[var(--color-border)] rounded bg-[var(--color-surface)]">↓</kbd> mag-navigate</span>
            <span><kbd className="px-1 border border-[var(--color-border)] rounded bg-[var(--color-surface)]">Enter</kbd> pumili</span>
          </div>

          {query.trim().length >= 2 && (
            <Link
              href={`/search?q=${encodeURIComponent(query.trim())}`}
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center gap-1 text-[var(--color-primary)] hover:underline font-semibold ml-auto"
            >
              <span>Lahat ng resulta ({results.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
