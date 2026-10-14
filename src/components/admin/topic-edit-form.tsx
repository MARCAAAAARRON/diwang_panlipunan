"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Topic } from "@/types/content";
import { updateTopic } from "@/lib/topic-actions";
import { ImageUploader } from "@/components/admin/image-uploader";
import { Save, ArrowLeft, Check, AlertCircle } from "lucide-react";

interface TopicEditFormProps {
  topic: Topic;
}

const COLOR_OPTIONS = [
  { label: "Kapaligiran (Green)", token: "--topic-kapaligiran" },
  { label: "Edukasyon (Blue)", token: "--topic-edukasyon" },
  { label: "Kalusugan (Emerald)", token: "--topic-kalusugan" },
  { label: "Ekonomiya (Amber/Gold)", token: "--topic-ekonomiya" },
  { label: "Karapatang Pantao (Red)", token: "--topic-karapatan" },
  { label: "Teknolohiya (Indigo)", token: "--topic-teknolohiya" },
  { label: "Pamahalaan at Demokrasya (Slate)", token: "--topic-pamahalaan" },
];

export function TopicEditForm({ topic }: TopicEditFormProps) {
  const router = useRouter();
  const [colorToken, setColorToken] = useState(topic.color_token);
  const [bannerUrl, setBannerUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    formData.set("color_token", colorToken);

    try {
      const res = await updateTopic(topic.id, formData);
      if (res.error) {
        setMessage({ type: "error", text: res.error });
      } else {
        setMessage({ type: "success", text: "Matagumpay na na-update ang paksa!" });
        setTimeout(() => {
          router.push("/admin/topics");
          router.refresh();
        }, 800);
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err?.message || "Nagkaroon ng aberya sa pag-save." });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
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

      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md p-6 sm:p-8 space-y-6">
        {/* Row 1: Titles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label
              htmlFor="name_fil"
              className="block text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-text)]"
            >
              Pamagat sa Filipino *
            </label>
            <input
              id="name_fil"
              name="name_fil"
              type="text"
              required
              defaultValue={topic.name_fil}
              className="w-full px-3 py-2 text-sm rounded-md border border-[var(--color-input-border)] bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] font-serif font-bold"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="name_en"
              className="block text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-text)]"
            >
              Pamagat sa Ingles (English Title) *
            </label>
            <input
              id="name_en"
              name="name_en"
              type="text"
              required
              defaultValue={topic.name_en}
              className="w-full px-3 py-2 text-sm rounded-md border border-[var(--color-input-border)] bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] font-sans"
            />
          </div>
        </div>

        {/* Row 2: Descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label
              htmlFor="description_fil"
              className="block text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-text)]"
            >
              Paglalarawan sa Filipino
            </label>
            <textarea
              id="description_fil"
              name="description_fil"
              rows={3}
              defaultValue={topic.description_fil || ""}
              className="w-full px-3 py-2 text-xs rounded-md border border-[var(--color-input-border)] bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] leading-relaxed"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="description_en"
              className="block text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-text)]"
            >
              Paglalarawan sa Ingles (English Description)
            </label>
            <textarea
              id="description_en"
              name="description_en"
              rows={3}
              defaultValue={topic.description_en || ""}
              className="w-full px-3 py-2 text-xs rounded-md border border-[var(--color-input-border)] bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] leading-relaxed"
            />
          </div>
        </div>

        {/* Row 3: Styling & Ordering */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[var(--color-border)]">
          <div className="space-y-1.5">
            <label
              htmlFor="color_token"
              className="block text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-text)]"
            >
              Kulay ng Tema (Accent Token)
            </label>
            <select
              id="color_token"
              value={colorToken}
              onChange={(e) => setColorToken(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-md border border-[var(--color-input-border)] bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] font-mono"
            >
              {COLOR_OPTIONS.map((c) => (
                <option key={c.token} value={c.token}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="order_index"
              className="block text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-text)]"
            >
              Pagkakasunod-sunod (Order)
            </label>
            <input
              id="order_index"
              name="order_index"
              type="number"
              min={1}
              max={20}
              defaultValue={topic.order_index}
              className="w-full px-3 py-2 text-xs rounded-md border border-[var(--color-input-border)] bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="icon_name"
              className="block text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-text)]"
            >
              Pangalan ng Icon
            </label>
            <input
              id="icon_name"
              name="icon_name"
              type="text"
              defaultValue={topic.icon_name}
              className="w-full px-3 py-2 text-xs rounded-md border border-[var(--color-input-border)] bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] font-mono"
            />
          </div>
        </div>

        {/* Row 4: Publication Status */}
        <div className="pt-4 border-t border-[var(--color-border)] flex items-center gap-3">
          <input
            id="is_published"
            name="is_published"
            type="checkbox"
            defaultChecked={topic.is_published}
            className="w-4 h-4 rounded border-[var(--color-input-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
          />
          <label htmlFor="is_published" className="text-xs font-sans text-[var(--color-text)] cursor-pointer">
            <strong className="font-semibold">Nailathala para sa Publiko</strong> — kung naka-check, lilitaw ang paksang ito sa pampublikong katalogo at drawer navigation.
          </label>
        </div>

        {/* Row 5: Banner Image Upload */}
        <div className="pt-4 border-t border-[var(--color-border)]">
          <ImageUploader
            value={bannerUrl}
            onChange={(url) => setBannerUrl(url)}
            label="Banner o Pabalat ng Paksa"
            description="Larawang gagamitin sa pampublikong topic hub (1200x630 inirerekomenda)."
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-2">
        <Link
          href="/admin/topics"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Bumalik sa Talaan ng mga Paksa</span>
        </Link>

        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] font-semibold text-xs font-mono uppercase tracking-wider transition-colors disabled:opacity-50 cursor-pointer"
        >
          <Save className="w-4 h-4" aria-hidden="true" />
          <span>{isSaving ? "Inililigtas..." : "I-save ang mga Pagbabago"}</span>
        </button>
      </div>
    </form>
  );
}
