import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Layers } from "lucide-react";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { TopicIcon } from "@/components/ui/topic-icon";
import { getAllTopics } from "@/lib/content-service";

export const metadata = {
  title: "Mga Paksa — Diwang Panlipunan",
  description: "Pitong pangunahing laranang panlipunan para sa mapanuring pagtalakay at pananaliksik sa Pilipinas.",
};

export default async function TopicsPage() {
  const topics = await getAllTopics();
  const totalArticles = topics.reduce((acc, t) => acc + t.subtopic_count, 0);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Pangunahing Pahina", href: "/home" },
          { label: "Mga Paksa" },
        ]}
      />

      {/* Header */}
      <header className="border-b border-border pb-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-highlight text-text text-xs font-semibold uppercase tracking-wider mb-2">
              <Layers className="w-3.5 h-3.5 text-primary" />
              <span>DIREKTORYO NG MGA ARALIN</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text">
              Mga Paksa
            </h1>
            <p className="text-sm sm:text-base text-text-muted mt-2 max-w-2xl leading-relaxed">
              Pitong pangunahing laranang panlipunan para sa mapanuring pagtalakay, masusing pananaliksik, at pampublikong diskurso sa Pilipinas.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono font-medium text-text-muted shrink-0 bg-surface border border-border px-3.5 py-2 rounded-md">
            <span>{topics.length} LARANGAN</span>
            <span>•</span>
            <span>{totalArticles} ARALIN</span>
          </div>
        </div>
      </header>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic, index) => {
          const numString = String(index + 1).padStart(2, "0");

          return (
            <Link
              key={topic.id}
              href={`/topics/${topic.slug}`}
              className="group flex flex-col justify-between p-6 rounded-md border border-border bg-surface hover:border-accent transition-colors shadow-none"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-md bg-highlight flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                      <TopicIcon name={topic.icon_name} className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-sm font-bold text-primary">
                      {numString}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-page border border-border text-[11px] font-semibold text-text-muted">
                    <BookOpen className="w-3 h-3 text-primary" />
                    <span>{topic.subtopic_count} Aralin</span>
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h2 className="font-serif text-xl font-bold text-text group-hover:text-primary group-hover:underline transition-colors">
                    {topic.name_fil}
                  </h2>
                  <p className="text-xs font-medium text-text-muted italic">
                    {topic.name_en}
                  </p>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed line-clamp-3 pt-1">
                    {topic.description_fil}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-border flex items-center justify-between text-xs font-semibold text-primary">
                <span>Tingnan ang Kurikulum</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
