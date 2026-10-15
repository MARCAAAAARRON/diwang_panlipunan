"use client";

import React, { useState, useRef } from "react";
import { MarkdownRenderer } from "@/components/reading/markdown-renderer";
import {
  Heading2,
  Heading3,
  Bold,
  Italic,
  Quote,
  BarChart3,
  Bookmark,
  List,
  ListOrdered,
  Eye,
  Edit,
  Clock,
  FileText,
} from "lucide-react";

interface MarkdownEditorProps {
  content: string;
  onChange: (value: string) => void;
  topicSlug?: string;
}

export function MarkdownEditor({
  content,
  onChange,
  topicSlug = "kapaligiran",
}: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Compute word count and read time
  const words = content.trim().length > 0 ? content.trim().split(/\s+/).filter(Boolean).length : 0;
  const readTimeMinutes = Math.max(1, Math.round(words / 200));

  // Toolbar insertion helper
  const insertSnippet = (prefix: string, suffix: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = textarea.value.substring(start, end);
    const replacement = `${prefix}${selected || "teksto"}${suffix}`;

    const newContent =
      textarea.value.substring(0, start) +
      replacement +
      textarea.value.substring(end);

    onChange(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + (selected ? selected.length : "teksto".length)
      );
    }, 0);
  };

  const insertStatCallout = () => {
    const snippet = `\n\n> **TALA NG DATOS: PAMAGAT NG DATOS**\n> **3x** Pagsasalarawan o Pangunahing Sukat\n> Detalyadong paliwanag sa datos at kontekstong panlipunan nito sa kapuluan.\n> *Pinagmulan: Ulat ng Pananaliksik / Sanggunian* [^1]\n\n`;
    insertSnippet(snippet, "");
  };

  const insertPullquote = () => {
    const snippet = `\n\n> "Mahalagang pananaw o sipi na nagbibigay-diin sa aralin at nagbubukas ng malalim na pagninilay."\n\n`;
    insertSnippet(snippet, "");
  };

  return (
    <div className="border border-[var(--color-border)] rounded-md bg-[var(--color-surface)] overflow-hidden space-y-0">
      {/* Top Toolbar */}
      <div className="p-2 sm:px-3 bg-[var(--color-surface)] border-b border-[var(--color-border)] flex flex-wrap items-center justify-between gap-2">
        {/* Formatting actions */}
        <div className="flex flex-wrap items-center gap-1">
          <button
            type="button"
            onClick={() => insertSnippet("## ", "")}
            title="Heading 2"
            className="p-1.5 rounded hover:bg-[var(--color-bg)] text-[var(--color-text)] transition-colors cursor-pointer"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertSnippet("### ", "")}
            title="Heading 3"
            className="p-1.5 rounded hover:bg-[var(--color-bg)] text-[var(--color-text)] transition-colors cursor-pointer"
          >
            <Heading3 className="w-4 h-4" />
          </button>
          <div className="w-px h-4 bg-[var(--color-border)] mx-1" />
          <button
            type="button"
            onClick={() => insertSnippet("**", "**")}
            title="Bold"
            className="p-1.5 rounded hover:bg-[var(--color-bg)] text-[var(--color-text)] transition-colors cursor-pointer"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertSnippet("*", "*")}
            title="Italic"
            className="p-1.5 rounded hover:bg-[var(--color-bg)] text-[var(--color-text)] transition-colors cursor-pointer"
          >
            <Italic className="w-4 h-4" />
          </button>
          <div className="w-px h-4 bg-[var(--color-border)] mx-1" />
          <button
            type="button"
            onClick={insertPullquote}
            title="Sipi / Editorial Pullquote"
            className="p-1.5 rounded hover:bg-[var(--color-bg)] text-[var(--color-text)] transition-colors cursor-pointer"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={insertStatCallout}
            title="Tala ng Datos Box"
            className="p-1.5 rounded hover:bg-[var(--color-bg)] text-[var(--color-text)] transition-colors cursor-pointer flex items-center gap-1 text-xs font-mono font-semibold text-[var(--color-primary)]"
          >
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline">Tala ng Datos</span>
          </button>
          <button
            type="button"
            onClick={() => insertSnippet("[^1]", "")}
            title="Citation Reference Superscript"
            className="p-1.5 rounded hover:bg-[var(--color-bg)] text-[var(--color-text)] transition-colors cursor-pointer flex items-center gap-1 text-xs font-mono font-semibold"
          >
            <Bookmark className="w-4 h-4" />
            <span>[^n]</span>
          </button>
          <div className="w-px h-4 bg-[var(--color-border)] mx-1" />
          <button
            type="button"
            onClick={() => insertSnippet("- ", "")}
            title="Bulleted List"
            className="p-1.5 rounded hover:bg-[var(--color-bg)] text-[var(--color-text)] transition-colors cursor-pointer"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertSnippet("1. ", "")}
            title="Numbered List"
            className="p-1.5 rounded hover:bg-[var(--color-bg)] text-[var(--color-text)] transition-colors cursor-pointer"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
        </div>

        {/* Responsive Mobile Tab Selector (Visible on < lg) */}
        <div className="flex lg:hidden items-center gap-1 font-mono text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("edit")}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded transition-colors ${
              activeTab === "edit"
                ? "bg-[var(--color-primary)] text-white font-semibold"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            <Edit className="w-3.5 h-3.5" />
            <span>I-edit</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded transition-colors ${
              activeTab === "preview"
                ? "bg-[var(--color-primary)] text-white font-semibold"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>
        </div>
      </div>

      {/* Editor Body: Split-Screen on Desktop, Tabbed on Small Screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[var(--color-border)] min-h-[500px] h-[650px]">
        {/* Left Side: Markdown Textarea */}
        <div
          className={`h-full flex flex-col ${
            activeTab === "preview" ? "hidden lg:flex" : "flex"
          }`}
        >
          <div className="p-2 bg-[var(--color-bg)] border-b border-[var(--color-border)] text-xs font-mono text-[var(--color-text-muted)] flex items-center justify-between">
            <span>MARKDOWN SOURCE</span>
            <span>UTF-8 • GFM</span>
          </div>
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Sumulat ng nilalaman gamit ang Markdown dito..."
            className="w-full flex-1 p-4 bg-[var(--color-surface)] text-[var(--color-text)] font-mono text-xs sm:text-sm leading-relaxed focus:outline-none resize-none font-normal"
          />
        </div>

        {/* Right Side: Live Broadsheet Preview */}
        <div
          className={`h-full flex flex-col bg-[var(--color-bg)] overflow-hidden ${
            activeTab === "edit" ? "hidden lg:flex" : "flex"
          }`}
          style={{
            ["--topic-color" as string]: `var(--topic-${topicSlug}, var(--color-primary))`,
          }}
        >
          <div className="p-2 bg-[var(--color-bg)] border-b border-[var(--color-border)] text-xs font-mono text-[var(--color-primary)] font-semibold flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              <span>LIVE BROADSHEET PREVIEW</span>
            </span>
            <span className="text-[var(--color-text-muted)]">68ch Reading Column</span>
          </div>
          <div className="flex-1 p-6 sm:p-8 overflow-y-auto bg-[var(--color-surface)]">
            {content.trim() ? (
              <MarkdownRenderer content={content} />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-[var(--color-text-muted)] py-12">
                <FileText className="w-10 h-10 mb-2 opacity-40" />
                <p className="font-serif text-base font-semibold">Walang Nilalaman</p>
                <p className="text-xs font-sans max-w-xs mt-1">
                  Magsimulang mag-type sa kaliwang bahagi upang makita ang live broadsheet preview.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Editor Stats Footer */}
      <div className="p-2.5 px-4 bg-[var(--color-surface)] border-t border-[var(--color-border)] flex flex-wrap items-center justify-between text-xs font-mono text-[var(--color-text-muted)]">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <FileText className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span>{words} {words === 1 ? "salita" : "mga salita"}</span>
          </span>
          <span className="text-[var(--color-border)]">•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span>Tinatayang {readTimeMinutes} minutong pagbasa</span>
          </span>
        </div>
        <div className="text-xs text-[var(--color-text-muted)]">
          Auto-calc: ~200 wpm
        </div>
      </div>
    </div>
  );
}
