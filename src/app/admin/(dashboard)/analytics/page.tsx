import React from "react";
import type { Metadata } from "next";
import { getPlatformAnalytics } from "@/lib/analytics-service";
import { AnalyticsCharts } from "@/components/admin/analytics-charts";
import { Eye, Award, BookOpen, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Pagsusuri sa Plataporma (Analytics) | Diwang Panlipunan CMS",
  description: "Internal platform analytics: readership metrics, most-read articles, and search queries.",
};

export default async function AnalyticsDashboardPage() {
  const analytics = await getPlatformAnalytics();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-primary)] font-semibold">
          METRIKS AT TENDENSIYA
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--color-text)] tracking-tight">
          Pagsusuri sa Paggamit at Pagbasa ng Plataporma
        </h1>
        <p className="text-sm text-[var(--color-text-muted)] font-sans">
          Unawain ang antas ng interes ng mamamayan sa iba&apos;t ibang suliraning panlipunan at suriin ang mga paksang madalas saliksikin.
        </p>
      </div>

      {/* Aggregate KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Views */}
        <div className="p-5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2">
          <div className="flex items-center justify-between text-[var(--color-text-muted)]">
            <span className="text-xs font-mono uppercase tracking-wider font-medium">Kabuuang Pagbasa</span>
            <Eye className="w-4 h-4 text-[var(--color-primary)]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[var(--color-text)]">
            {analytics.totalViews.toLocaleString()}
          </div>
          <p className="text-[11px] text-[var(--color-text-muted)]">
            Kabuuang bilang ng pagbubukas sa mga aralin
          </p>
        </div>

        {/* Metric 2: Satisfaction Rate */}
        <div className="p-5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2">
          <div className="flex items-center justify-between text-[var(--color-text-muted)]">
            <span className="text-xs font-mono uppercase tracking-wider font-medium">Kasiyahan ng Mambabasa</span>
            <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="font-serif text-3xl font-bold text-emerald-700 dark:text-emerald-400">
            {analytics.satisfactionRate}%
          </div>
          <p className="text-[11px] text-[var(--color-text-muted)]">
            Positibong tugon sa &ldquo;Nakatulong ba ito?&rdquo;
          </p>
        </div>

        {/* Metric 3: Published Articles */}
        <div className="p-5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2">
          <div className="flex items-center justify-between text-[var(--color-text-muted)]">
            <span className="text-xs font-mono uppercase tracking-wider font-medium">Nailathalang Aralin</span>
            <BookOpen className="w-4 h-4 text-[var(--color-primary)]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[var(--color-text)]">
            {analytics.totalArticles}
          </div>
          <p className="text-[11px] text-[var(--color-text-muted)]">
            Aktibong mga pagsusuri sa 7 tema
          </p>
        </div>

        {/* Metric 4: Feedback Submissions */}
        <div className="p-5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2">
          <div className="flex items-center justify-between text-[var(--color-text-muted)]">
            <span className="text-xs font-mono uppercase tracking-wider font-medium">Mga Tugon at Puna</span>
            <MessageSquare className="w-4 h-4 text-[var(--color-primary)]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[var(--color-text)]">
            {analytics.totalFeedbackCount}
          </div>
          <p className="text-[11px] text-[var(--color-text-muted)]">
            Kabuuang feedback mula sa mamamayan
          </p>
        </div>
      </div>

      {/* Visual Analytics Sections: Leaderboard, Themes, and Search Trends */}
      <AnalyticsCharts
        topArticles={analytics.topArticles}
        themeDistribution={analytics.themeDistribution}
        topSearchTerms={analytics.topSearchTerms}
      />
    </div>
  );
}
