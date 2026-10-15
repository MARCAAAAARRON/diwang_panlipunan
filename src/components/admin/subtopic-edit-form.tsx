"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Topic, Subtopic } from "@/types/content";
import { createSubtopic, updateSubtopic } from "@/lib/subtopic-actions";
import { MarkdownEditor } from "@/components/admin/markdown-editor";
import { ImageUploader } from "@/components/admin/image-uploader";
import { Save, ArrowLeft, Check, AlertCircle, Wand2 } from "lucide-react";

interface SubtopicEditFormProps {
  topics: Topic[];
  initialData?: Subtopic;
  isNew?: boolean;
  citationsSlot?: React.ReactNode;
}

export function SubtopicEditForm({
  topics,
  initialData,
  isNew = false,
  citationsSlot,
}: SubtopicEditFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [selectedTopicId, setSelectedTopicId] = useState(
    initialData?.topic_id || topics[0]?.id || ""
  );
  const [contentMarkdown, setContentMarkdown] = useState(
    initialData?.content_markdown || ""
  );
  const [coverUrl, setCoverUrl] = useState("");
  const [isPublished, setIsPublished] = useState(initialData?.is_published ?? true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Helper to generate URL slug from Filipino/English title
  const handleAutoSlug = () => {
    const generated = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setSlug(generated);
  };

  const selectedTopic = topics.find((t) => t.id === selectedTopicId);
  const topicSlug = selectedTopic?.slug || "kapaligiran";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    formData.set("topic_id", selectedTopicId);
    formData.set("content_markdown", contentMarkdown);
    if (isPublished) {
      formData.set("is_published", "on");
    } else {
      formData.delete("is_published");
    }

    try {
      const res = isNew
        ? await createSubtopic(formData)
        : await updateSubtopic(initialData!.id, formData);

      if (res.error) {
        setMessage({ type: "error", text: res.error });
      } else {
        setMessage({
          type: "success",
          text: isNew
            ? "Matagumpay na nalikha ang bagong aralin!"
            : "Matagumpay na na-update ang aralin!",
        });

        setTimeout(() => {
          router.push("/admin/subtopics");
          router.refresh();
        }, 800);
      }
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err?.message || "Nagkaroon ng aberya sa pag-save.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {message && (
        <div
          className={`p-4 rounded-md border text-xs flex items-center gap-2 ${
            message.type === "success"
              ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200"
              : "bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-800 text-red-800 dark:text-red-200"
          }`}
        >
          {message.type === "success" ? (
            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Metadata Card */}
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md p-6 sm:p-8 space-y-6">
        <h2 className="font-serif text-lg font-bold text-[var(--color-text)] border-b border-[var(--color-border)] pb-2">
          Pangunahing Impormasyon ng Aralin
        </h2>

        {/* Row 1: Topic Selector & Slug */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label
              htmlFor="topic_id"
              className="block text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-text)]"
            >
              Tematikong Paksa *
            </label>
            <select
              id="topic_id"
              name="topic_id"
              value={selectedTopicId}
              onChange={(e) => setSelectedTopicId(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm rounded-md border border-[var(--color-input-border)] bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] font-serif"
            >
              {topics.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name_fil} ({t.name_en})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="slug"
                className="block text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-text)]"
              >
                URL Slug *
              </label>
              <button
                type="button"
                onClick={handleAutoSlug}
                className="inline-flex items-center gap-1 text-xs font-mono text-[var(--color-primary)] hover:underline cursor-pointer"
              >
                <Wand2 className="w-3 h-3" />
                <span>Auto-generate</span>
              </button>
            </div>
            <div className="flex items-center">
              <span className="px-3 py-2 rounded-l-md border border-r-0 border-[var(--color-input-border)] bg-[var(--color-bg)] text-xs font-mono text-[var(--color-text-muted)] select-none">
                /topics/{topicSlug}/
              </span>
              <input
                id="slug"
                name="slug"
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="hal-krisis-sa-klima"
                className="w-full px-3 py-2 text-xs rounded-r-md border border-[var(--color-input-border)] bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] font-mono"
              />
            </div>
          </div>
        </div>

        {/* Row 2: Title */}
        <div className="space-y-1.5">
          <label
            htmlFor="title"
            className="block text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-text)]"
          >
            Pamagat ng Aralin (Article Title) *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Hal: Climate Change sa Pilipinas: Vulnerabilities, Impacts, and the Imperative for Ecological Justice"
            className="w-full px-3 py-2.5 text-base sm:text-lg font-serif font-bold rounded-md border border-[var(--color-input-border)] bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
          />
        </div>

        {/* Row 3: Executive Summary */}
        <div className="space-y-1.5">
          <label
            htmlFor="summary"
            className="block text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-text)]"
          >
            Buod ng Aralin (Executive Summary)
          </label>
          <textarea
            id="summary"
            name="summary"
            rows={2}
            defaultValue={initialData?.summary || ""}
            placeholder="Maikling 1-2 pangungusap na nagbubuod sa nilalaman ng aralin para sa mga preview cards at SEO..."
            className="w-full px-3 py-2 text-xs rounded-md border border-[var(--color-input-border)] bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] leading-relaxed font-sans"
          />
        </div>

        {/* Row 4: Featured Image / Cover */}
        <div className="pt-2 border-t border-[var(--color-border)]">
          <ImageUploader
            value={coverUrl}
            onChange={(url) => setCoverUrl(url)}
            label="Pabalat na Larawan (Featured Article Photo)"
            description="Larawang ipapakita sa itaas ng aralin (1200x630px recommended)."
          />
        </div>
      </div>

      {/* Main Markdown Content Split-Screen Editor */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-text)]">
            Nilalaman ng Aralin (Markdown Body) *
          </label>
        </div>

        <MarkdownEditor
          content={contentMarkdown}
          onChange={(val) => setContentMarkdown(val)}
          topicSlug={topicSlug}
        />
      </div>

      {/* Citations Manager Slot (Plan 04-04 Integration) */}
      {citationsSlot}

      {/* Bottom Sticky Action Bar */}
      <div className="sticky bottom-4 z-20 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md p-4 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <Link
          href="/admin/subtopics"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Bumalik sa Talaan ng mga Aralin</span>
        </Link>

        <div className="flex items-center gap-3">
          {/* Publish Status Toggle */}
          <label className="flex items-center gap-2 cursor-pointer text-xs font-mono">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="w-4 h-4 rounded border-[var(--color-input-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
            />
            <span
              className={`font-semibold ${
                isPublished
                  ? "text-emerald-700 dark:text-emerald-400"
                  : "text-amber-700 dark:text-amber-400"
              }`}
            >
              {isPublished ? "I-publish Agad" : "I-save bilang Draft"}
            </span>
          </label>

          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] font-semibold text-xs font-mono uppercase tracking-wider transition-colors disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-4 h-4" aria-hidden="true" />
            <span>
              {isSaving
                ? "Inililigtas..."
                : isPublished
                ? "I-lathala ang Aralin"
                : "I-save ang Draft"}
            </span>
          </button>
        </div>
      </div>
    </form>
  );
}
