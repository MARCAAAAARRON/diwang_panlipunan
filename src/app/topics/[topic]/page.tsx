import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, FileText, CheckCircle2 } from "lucide-react";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { TopicIcon } from "@/components/ui/topic-icon";
import { getTopicBySlug } from "@/lib/content-service";

interface TopicPageProps {
  params: {
    topic: string;
  };
}

export async function generateMetadata({ params }: TopicPageProps) {
  const topic = await getTopicBySlug(params.topic);
  if (!topic) return { title: "Hindi Natagpuan — Diwang Panlipunan" };

  return {
    title: `${topic.name_fil} — Diwang Panlipunan`,
    description: topic.description_fil,
  };
}

export default async function TopicHubPage({ params }: TopicPageProps) {
  const topic = await getTopicBySlug(params.topic);

  if (!topic) {
    notFound();
  }

  const numString = String(topic.order_index).padStart(2, "0");

  return (
    <div
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10"
      style={{ "--topic-color": `var(${topic.color_token})` } as React.CSSProperties}
    >
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Pangunahing Pahina", href: "/home" },
          { label: "Mga Paksa", href: "/topics" },
          { label: topic.name_fil },
        ]}
      />

      {/* Thematic Hero Banner */}
      <section className="relative rounded-md border border-border bg-surface p-6 sm:p-10 space-y-4 border-l-4 border-l-[var(--topic-color)] shadow-none">
        <div className="flex flex-wrap items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-highlight flex items-center justify-center text-primary">
            <TopicIcon name={topic.icon_name} className="w-4 h-4" />
          </div>
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-text-muted">
            LARANGANG TEMATIKO • PAKSA {numString}
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text">
          {topic.name_fil}
        </h1>

        <p className="font-serif text-base sm:text-lg italic text-text-muted">
          {topic.name_en}
        </p>

        <p className="text-sm sm:text-base text-text-muted max-w-3xl leading-relaxed pt-2">
          {topic.description_fil}
        </p>

        <div className="flex items-center gap-4 text-xs font-medium text-text-muted pt-4 border-t border-border">
          <span className="flex items-center gap-1.5 text-primary">
            <CheckCircle2 className="w-4 h-4" />
            <span>Kumpirmadong Kurikulum</span>
          </span>
          <span>•</span>
          <span>{topic.subtopics.length} Paksang Aralin</span>
        </div>
      </section>

      {/* Subtopics Curriculum List */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-text">
            Talaan ng mga Aralin
          </h2>
          <span className="text-xs font-mono font-semibold text-text-muted uppercase">
            Serye {numString}
          </span>
        </div>

        {!topic.subtopics || topic.subtopics.length === 0 ? (
          <div className="p-10 rounded-md border border-border bg-surface text-center space-y-2">
            <p className="font-serif text-base font-bold text-text">
              Kasalukuyang inihahanda ang mga aralin para sa paksang ito.
            </p>
            <p className="text-xs text-text-muted">
              Maaaring magdagdag o mag-publish ng mga bagong aralin sa pamamagitan ng Tanggapan ng Patnugot (Admin CMS).
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {topic.subtopics.map((subtopic, index) => {
              const letterCode = String.fromCharCode(97 + index) + ".";

              return (
                <Link
                  key={subtopic.id}
                  href={`/topics/${topic.slug}/${subtopic.slug}`}
                  className="group block p-6 rounded-md border border-border bg-surface hover:border-accent transition-colors shadow-none"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-2 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-primary px-1.5 py-0.5 rounded-sm bg-highlight">
                          {letterCode}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-text-muted">
                          <Clock className="w-3.5 h-3.5 text-primary" />
                          <span>{subtopic.read_time_minutes} minutong pagbasa</span>
                        </div>
                      </div>

                      <h3 className="font-serif text-lg sm:text-xl font-bold text-text group-hover:text-primary group-hover:underline transition-colors leading-snug">
                        {subtopic.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-3xl">
                        {subtopic.summary}
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center gap-1 text-xs font-semibold text-primary self-end sm:self-center">
                      <span>Basahin ang artikulo</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
