import React from "react";
import Link from "next/link";
import { getAllTopics } from "@/lib/content-service";
import { SubtopicsTable } from "@/components/admin/subtopics-table";
import { PlusCircle, ArrowLeft } from "lucide-react";

export default async function AdminSubtopicsPage() {
  const topics = await getAllTopics();

  // Flatten subtopics with their parent topic reference
  const subtopics = topics.flatMap((t) =>
    (t.subtopics || []).map((s) => ({
      ...s,
      topic: t,
    }))
  );

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/admin"
              className="text-xs font-mono text-[var(--color-primary)] hover:underline inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Admin Dashboard</span>
            </Link>
          </div>
          <h1 className="font-serif text-3xl font-extrabold text-[var(--color-text)] tracking-tight">
            Pamamahala ng mga Aralin
          </h1>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">
            Kabuuang {subtopics.length} aralin sa 7 tematikong larangan. Lumikha, mag-edit, o maglathala ng mga pagsusuri.
          </p>
        </div>

        <Link
          href="/admin/subtopics/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] text-xs font-mono uppercase tracking-wider font-semibold transition-colors shrink-0 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" aria-hidden="true" />
          <span>Lumikha ng Bagong Aralin</span>
        </Link>
      </div>

      {/* Interactive Subtopics Table */}
      <SubtopicsTable subtopics={subtopics} topics={topics} />
    </div>
  );
}
