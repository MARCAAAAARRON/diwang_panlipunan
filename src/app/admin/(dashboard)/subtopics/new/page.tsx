import React from "react";
import Link from "next/link";
import { getAllTopics } from "@/lib/content-service";
import { SubtopicEditForm } from "@/components/admin/subtopic-edit-form";
import { ArrowLeft } from "lucide-react";

export default async function NewSubtopicPage() {
  const topics = await getAllTopics();

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
          PAGLIKHA NG BAGONG ARALIN
        </span>
        <h1 className="font-serif text-3xl font-extrabold text-[var(--color-text)] tracking-tight">
          Lumikha ng Bagong Artikulo o Aralin
        </h1>
        <p className="text-xs text-[var(--color-text-muted)] mt-1 font-sans">
          Sumulat ng komprehensibong pagtalakay gamit ang live Markdown split-screen editor.
        </p>
      </div>

      {/* Form */}
      <SubtopicEditForm topics={topics} isNew={true} />
    </div>
  );
}
