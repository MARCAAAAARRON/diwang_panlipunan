import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { TopicEditForm } from "@/components/admin/topic-edit-form";
import { ArrowLeft, FolderPlus } from "lucide-react";

export const metadata: Metadata = {
  title: "Lumikha ng Bagong Paksa | Tanggapan ng Patnugot",
  description: "Magdagdag ng bagong tematikong larangan sa Diwang Panlipunan.",
};

export default function NewTopicPage() {
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
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-mono font-semibold uppercase tracking-wider mb-2">
          <FolderPlus className="w-3.5 h-3.5" />
          <span>PAGLIKHA NG BAGONG LARANGAN</span>
        </div>
        <h1 className="font-serif text-3xl font-extrabold text-[var(--color-text)] tracking-tight">
          Lumikha ng Bagong Tematikong Paksa
        </h1>
        <p className="text-xs text-[var(--color-text-muted)] mt-1 font-sans">
          Magdagdag ng bagong pangunahing laranang panlipunan para sa paglalathala ng mga kaugnay na aralin at pagsusuri.
        </p>
      </div>

      {/* Form */}
      <TopicEditForm isNew={true} />
    </div>
  );
}
