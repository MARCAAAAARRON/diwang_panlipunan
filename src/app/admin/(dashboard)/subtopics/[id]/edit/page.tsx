import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllTopics, getSubtopicBySlug } from "@/lib/content-service";
import { SubtopicEditForm } from "@/components/admin/subtopic-edit-form";
import { CitationsManager } from "@/components/admin/citations-manager";
import { ArrowLeft } from "lucide-react";

interface SubtopicEditPageProps {
  params: {
    id: string;
  };
}

export default async function SubtopicEditPage({
  params,
}: SubtopicEditPageProps) {
  const topics = await getAllTopics();

  // Find subtopic across all topics
  let foundSubtopic: any = null;
  let parentTopic: any = null;

  for (const t of topics) {
    const s = (t.subtopics || []).find(
      (item) => item.id === params.id || item.slug === params.id
    );
    if (s) {
      foundSubtopic = s;
      parentTopic = t;
      break;
    }
  }

  if (!foundSubtopic || !parentTopic) {
    notFound();
  }

  // Fetch full article with sources
  const fullArticle = await getSubtopicBySlug(
    parentTopic.slug,
    foundSubtopic.slug
  );
  const sources = fullArticle?.sources || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Link
            href="/admin/subtopics"
            className="text-xs font-mono text-[var(--color-primary)] hover:underline inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Talaan ng mga Aralin</span>
          </Link>
        </div>
        <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-primary)] font-semibold block">
          PAG-EDIT NG ARALIN
        </span>
        <h1 className="font-serif text-3xl font-extrabold text-[var(--color-text)] tracking-tight">
          I-edit: {foundSubtopic.title}
        </h1>
        <p className="text-xs text-[var(--color-text-muted)] mt-1 font-sans">
          Baguhin ang nilalaman, buod, kaugnay na paksa, o pamahalaan ang mga naka-link na akademikong sanggunian.
        </p>
      </div>

      {/* Editor Form with Inline Citations Manager Slot */}
      <SubtopicEditForm
        topics={topics}
        initialData={foundSubtopic}
        citationsSlot={
          <CitationsManager
            subtopicId={foundSubtopic.id}
            initialSources={sources}
          />
        }
      />
    </div>
  );
}
