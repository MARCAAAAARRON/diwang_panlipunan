"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink, TrendingUp, Search, Eye, Award } from "lucide-react";
import type { TopArticleItem, ThemeDistributionItem, SearchTermItem } from "@/lib/analytics-service";

interface AnalyticsChartsProps {
  topArticles: TopArticleItem[];
  themeDistribution: ThemeDistributionItem[];
  topSearchTerms: SearchTermItem[];
}

export function AnalyticsCharts({
  topArticles,
  themeDistribution,
  topSearchTerms,
}: AnalyticsChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left 7 Cols: Top Articles & Theme Distribution */}
      <div className="lg:col-span-7 space-y-8">
        {/* Most-Read Articles Leaderboard */}
        <div className="p-6 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] space-y-5">
          <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
            <div className="space-y-0.5">
              <span className="text-xs font-mono uppercase tracking-[0.06em] text-[var(--color-primary)] font-semibold flex items-center gap-1">
                <Award className="w-3.5 h-3.5" />
                PINAKABINABASA
              </span>
              <h2 className="font-serif text-lg font-bold text-[var(--color-text)]">
                Nangungunang mga Aralin
              </h2>
            </div>
            <span className="text-xs font-mono text-[var(--color-text-muted)]">
              Nakaayos ayon sa views
            </span>
          </div>

          <div className="divide-y divide-[var(--color-border)]">
            {topArticles.map((article, idx) => (
              <div
                key={article.id}
                className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <span
                    className={`w-6 h-6 rounded flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                      idx === 0
                        ? "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800"
                        : idx === 1
                        ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700"
                        : idx === 2
                        ? "bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 border border-orange-300 dark:border-orange-800"
                        : "bg-[var(--color-bg)] text-[var(--color-text-muted)] border border-[var(--color-border)]"
                    }`}
                  >
                    {idx + 1}
                  </span>

                  <div className="min-w-0">
                    <h3 className="font-serif text-sm font-bold text-[var(--color-text)] truncate group-hover:text-[var(--color-primary)] transition-colors">
                      <Link
                        href={`/topics/${article.topicSlug}/${article.slug}`}
                        target="_blank"
                        className="hover:underline flex items-center gap-1.5"
                      >
                        <span className="truncate">{article.title}</span>
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      </Link>
                    </h3>
                    <span className="text-xs font-mono text-[var(--color-text-muted)]">
                      {article.topicTitle}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-mono text-sm font-bold text-[var(--color-text)] flex items-center gap-1 justify-end">
                    <Eye className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                    <span>{article.views.toLocaleString()}</span>
                  </div>
                  <span className="text-xs font-mono text-[var(--color-text-muted)]">
                    pagbasa
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reading Share by Societal Theme */}
        <div className="p-6 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] space-y-5">
          <div className="border-b border-[var(--color-border)] pb-3 space-y-0.5">
            <span className="text-xs font-mono uppercase tracking-[0.06em] text-[var(--color-primary)] font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              DISTRIBUSYON
            </span>
            <h2 className="font-serif text-lg font-bold text-[var(--color-text)]">
              Interes ng Mambabasa sa 7 Tema
            </h2>
          </div>

          <div className="space-y-4">
            {themeDistribution.map((theme) => (
              <div key={theme.topicSlug} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-serif font-bold text-[var(--color-text)] flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{
                        backgroundColor: `var(${theme.colorToken}, var(--color-primary))`,
                      }}
                    />
                    <span>{theme.topicTitle}</span>
                  </span>
                  <span className="font-mono text-xs text-[var(--color-text-muted)]">
                    <strong className="text-[var(--color-text)] font-semibold">
                      {theme.views.toLocaleString()}
                    </strong>{" "}
                    views ({theme.percentage}%)
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-[var(--color-border)] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${theme.percentage}%`,
                      backgroundColor: `var(${theme.colorToken}, var(--color-primary))`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right 5 Cols: Frequent Search Terms & Trend Inquiries */}
      <div className="lg:col-span-5 space-y-8">
        <div className="p-6 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] space-y-5">
          <div className="border-b border-[var(--color-border)] pb-3 space-y-0.5">
            <span className="text-xs font-mono uppercase tracking-[0.06em] text-[var(--color-primary)] font-semibold flex items-center gap-1">
              <Search className="w-3.5 h-3.5" />
              TENDENSIYA SA PAGHAHANAP
            </span>
            <h2 className="font-serif text-lg font-bold text-[var(--color-text)]">
              Madalas Hanaping Paksa
            </h2>
          </div>

          <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
            Ipinapakita ang mga terminong hinahanap ng mamamayan sa search bar. Nakatutulong ito sa pagtukoy ng mga kulang na aralin.
          </p>

          <div className="divide-y divide-[var(--color-border)]">
            {topSearchTerms.map((item, index) => (
              <div
                key={item.term}
                className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="font-mono text-xs text-[var(--color-text-muted)] w-4 text-right shrink-0">
                    {index + 1}.
                  </span>
                  <Link
                    href={`/search?q=${encodeURIComponent(item.term)}`}
                    target="_blank"
                    className="font-mono font-medium text-[var(--color-text)] hover:text-[var(--color-primary)] hover:underline truncate"
                  >
                    &ldquo;{item.term}&rdquo;
                  </Link>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-2 py-0.5 rounded font-mono text-xs font-semibold bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)]">
                    {item.count} beses
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
