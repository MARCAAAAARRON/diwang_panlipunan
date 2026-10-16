"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Source } from "@/types/content";
import { saveCitations } from "@/lib/citation-actions";
import {
  Bookmark,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  Save,
  Check,
  AlertCircle,
} from "lucide-react";

interface CitationsManagerProps {
  subtopicId: string;
  initialSources: Source[];
}

export function CitationsManager({
  subtopicId,
  initialSources,
}: CitationsManagerProps) {
  const router = useRouter();
  const [sources, setSources] = useState<Source[]>(initialSources || []);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const addCitation = () => {
    const newSource: Source = {
      id: `temp-${Date.now()}`,
      subtopic_id: subtopicId,
      title: "",
      author: "",
      publication: "",
      url: "",
      published_date: "",
      order_index: sources.length + 1,
      created_at: new Date().toISOString(),
    };
    setSources([...sources, newSource]);
  };

  const updateSourceField = (index: number, field: keyof Source, value: any) => {
    const updated = [...sources];
    updated[index] = { ...updated[index], [field]: value };
    setSources(updated);
  };

  const removeSource = (index: number) => {
    if (!window.confirm("Sigurado ka bang nais mong tanggalin ang sangguniang ito?")) {
      return;
    }
    const updated = sources.filter((_, i) => i !== index);
    setSources(updated);
  };

  const moveSource = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sources.length) return;

    const updated = [...sources];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    setSources(updated);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setStatus(null);

    try {
      const res = await saveCitations(
        subtopicId,
        sources.map((s, idx) => ({
          ...s,
          order_index: idx + 1,
        }))
      );

      if (res.error) {
        setStatus({ type: "error", text: res.error });
      } else {
        if (res.sources && res.sources.length > 0) {
          setSources(res.sources);
        }
        setStatus({
          type: "success",
          text: "Matagumpay na nai-save ang mga sanggunian!",
        });
        router.refresh();
        setTimeout(() => setStatus(null), 3500);
      }
    } catch (err: any) {
      setStatus({
        type: "error",
        text: err?.message || "Nagkaroon ng aberya sa pag-save.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-border)] pb-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-primary)] font-semibold block">
            DOKUMENTASYON AT SANGGUNIAN
          </span>
          <h2 className="font-serif text-lg font-bold text-[var(--color-text)]">
            Mga Sanggunian at Akademikong Batayan ({sources.length})
          </h2>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
            Ang numerong index ay tumutugma sa in-text citation tag na <code className="text-[var(--color-primary)]">[^1]</code>, <code className="text-[var(--color-primary)]">[^2]</code> sa markdown.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={addCitation}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] hover:bg-[var(--color-surface)] hover:border-[var(--color-primary)] text-xs font-semibold text-[var(--color-text)] transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span>Magdagdag ng Sanggunian</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] text-xs font-semibold transition-colors disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? "Inililigtas..." : "I-save ang Sanggunian"}</span>
          </button>
        </div>
      </div>

      {status && (
        <div
          className={`p-3 rounded-md border text-xs flex items-center gap-2 ${
            status.type === "success"
              ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200"
              : "bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-800 text-red-800 dark:text-red-200"
          }`}
        >
          {status.type === "success" ? (
            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
          )}
          <span>{status.text}</span>
        </div>
      )}

      {sources.length === 0 ? (
        <div className="p-8 text-center text-xs text-[var(--color-text-muted)] border border-dashed border-[var(--color-border)] rounded-md space-y-2">
          <Bookmark className="w-8 h-8 mx-auto text-[var(--color-text-muted)] opacity-50" />
          <p>Wala pang nakatalagang sanggunian sa araling ito.</p>
          <button
            type="button"
            onClick={addCitation}
            className="text-[var(--color-primary)] hover:underline font-semibold"
          >
            + Magdagdag ng unang sanggunian
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {sources.map((source, index) => {
            const displayIndex = index + 1;

            return (
              <div
                key={source.id || index}
                className="p-4 rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] space-y-3"
              >
                {/* Header row: Index & Controls */}
                <div className="flex items-center justify-between pb-2 border-b border-[var(--color-border)]">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-primary)]">
                      [{displayIndex}]
                    </span>
                    <span className="text-xs font-mono text-[var(--color-text-muted)]">
                      In-text tag: <code className="text-[var(--color-primary)]">[{displayIndex}]</code> o <code className="text-[var(--color-primary)]">[^{displayIndex}]</code>
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => moveSource(index, "up")}
                      disabled={index === 0}
                      title="Ilipat Pataas"
                      className="p-1 rounded hover:bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] disabled:opacity-30 cursor-pointer"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveSource(index, "down")}
                      disabled={index === sources.length - 1}
                      title="Ilipat Pababa"
                      className="p-1 rounded hover:bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] disabled:opacity-30 cursor-pointer"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeSource(index)}
                      title="Tanggalin"
                      className="p-1 rounded hover:bg-red-50 text-red-600 dark:text-red-400 hover:text-red-700 transition-colors cursor-pointer ml-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Form Inputs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="space-y-1">
                    <label className="block text-xs font-mono font-semibold uppercase tracking-[0.06em] text-[var(--color-text)]">
                      May-akda / Institusyon
                    </label>
                    <input
                      type="text"
                      placeholder="Hal: PAGASA / CCC"
                      value={source.author || ""}
                      onChange={(e) =>
                        updateSourceField(index, "author", e.target.value)
                      }
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-[var(--color-input-border)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] font-sans"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="block text-xs font-mono font-semibold uppercase tracking-[0.06em] text-[var(--color-text)]">
                      Pamagat ng Lathalain / Dokumento *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Hal: National Climate Change Action Plan"
                      value={source.title}
                      onChange={(e) =>
                        updateSourceField(index, "title", e.target.value)
                      }
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-[var(--color-input-border)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] font-sans font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-mono font-semibold uppercase tracking-[0.06em] text-[var(--color-text)]">
                      Lathalain / Ahensiya *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Hal: Philippine Government Gazette"
                      value={source.publication}
                      onChange={(e) =>
                        updateSourceField(index, "publication", e.target.value)
                      }
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-[var(--color-input-border)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] font-sans"
                    />
                  </div>
                </div>

                {/* Row 2: Date & URL */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="block text-xs font-mono font-semibold uppercase tracking-[0.06em] text-[var(--color-text)]">
                      Taon / Petsa (Opsyonal)
                    </label>
                    <input
                      type="text"
                      placeholder='Hal: 2024, "n.d.", o iwang blangko'
                      value={source.published_date || ""}
                      onChange={(e) =>
                        updateSourceField(index, "published_date", e.target.value)
                      }
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-[var(--color-input-border)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] font-mono"
                    />
                    <span className="text-[10px] text-[var(--color-text-muted)] block font-sans">
                      Maaaring iwang blangko o ilagay ang &quot;n.d.&quot; kung walang petsa.
                    </span>
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="block text-xs font-mono font-semibold uppercase tracking-[0.06em] text-[var(--color-text)]">
                      URL ng Sanggunian (Opsyonal)
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        placeholder="https://... o link ng artikulo (opsyonal)"
                        value={source.url || ""}
                        onChange={(e) =>
                          updateSourceField(index, "url", e.target.value)
                        }
                        className="w-full px-2.5 py-1.5 text-xs rounded border border-[var(--color-input-border)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] font-mono"
                      />
                      {source.url && (
                        <a
                          href={source.url.startsWith("http") ? source.url : `https://${source.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Subukan ang link"
                          className="p-1.5 rounded border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors shrink-0"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
