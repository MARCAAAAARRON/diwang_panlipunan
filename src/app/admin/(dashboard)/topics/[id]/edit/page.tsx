import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllTopics } from "@/lib/content-service";
import { TopicEditForm } from "@/components/admin/topic-edit-form";
import { ArrowLeft } from "lucide-react";

interface TopicEditPageProps {
  params: {
    id: string;
  };
}

export default async function TopicEditPage({ params }: TopicEditPageProps) {
  const topics = await getAllTopics();
  // Match by id or slug
  const topic = topics.find((t) => t.id === params.id || t.slug === params.id);

  if (!topic) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Link
            href="/admin/topics"
            className="text-xs font-mono text-[var(--color-primary)] hover:underline inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Talaan ng mga Paksa</span>
          </Link>
        </div>
        <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-primary)] font-semibold block">
          PAG-EDIT NG TEMATIKONG LARANGAN
        </span>
        <h1 className="font-serif text-3xl font-extrabold text-[var(--color-text)] tracking-tight">
          I-edit ang Paksa: {topic.name_fil}
        </h1>
        <p className="text-xs text-[var(--color-text-muted)] mt-1 font-sans">
          Baguhin ang pamagat, paglalarawan sa Filipino at Ingles, kulay ng tema, o pabalat na larawan.
        </p>
      </div>

      {/* Edit Form */}
      <TopicEditForm topic={topic} />
    </div>
  );
}
