"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Topic } from "@/types/content";
import { updateTopic, createTopic, deleteTopic } from "@/lib/topic-actions";
import { ImageUploader } from "@/components/admin/image-uploader";
import { Save, ArrowLeft, Check, AlertCircle, Trash2 } from "lucide-react";

interface TopicEditFormProps {
  topic?: Partial<Topic>;
  isNew?: boolean;
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

export function TopicEditForm({ topic = {}, isNew = false }: TopicEditFormProps) {
  const router = useRouter();
  const [colorToken, setColorToken] = useState(topic.color_token || "--topic-kapaligiran");
  const [bannerUrl, setBannerUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleDelete = async () => {
    if (!topic.id) return;
    const warning = `Sigurado ka bang nais mong tanggalin ang paksang "${topic.name_fil || "ito"}"?\n\nBabala: Kapag tinanggal ito, mabubura rin ang lahat ng kaugnay na aralin sa ilalim nito. Hindi na ito maibabalik.`;
    if (!window.confirm(warning)) {
      return;
    }

    setIsDeleting(true);
    setMessage(null);
    try {
      const res = await deleteTopic(topic.id);
      if (res?.error) {
        setMessage({ type: "error", text: res.error });
      } else {
        setMessage({
          type: "success",
          text: "Matagumpay na natanggal ang paksa!",
        });
        setTimeout(() => {
          router.push("/admin/topics");
          router.refresh();
        }, 800);
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err?.message || "Nagkaroon ng aberya sa pagtanggal ng paksa." });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    formData.set("color_token", colorToken);

    try {
      let res;
      if (isNew) {
        res = await createTopic(formData);
      } else {
        if (!topic.id) throw new Error("Kulang ang Topic ID para sa pag-update.");
        res = await updateTopic(topic.id, formData);
      }

      if (res.error) {
        setMessage({ type: "error", text: res.error });
      } else {
        setMessage({
          type: "success",
          text: isNew
            ? "Matagumpay na nalikha ang bagong paksa!"
            : "Matagumpay na na-update ang paksa!",
        });
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
              defaultValue={topic.name_fil || ""}
              placeholder="Halimbawa: Kultura, Wika, at Pambansang Pagkakakilanlan"
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
              defaultValue={topic.name_en || ""}
              placeholder="Halimbawa: Culture, Language, and National Identity"
              className="w-full px-3 py-2 text-sm rounded-md border border-[var(--color-input-border)] bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] font-sans"
            />
          </div>
        </div>

        {/* Slug Field (especially for isNew) */}
        <div className="space-y-1.5">
          <label
            htmlFor="slug"
            className="block text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-text)]"
          >
            Slug / URL Identifier {isNew ? "(Opsyonal — awtomatikong bubuuin kung blangko)" : ""}
          </label>
          <input
            id="slug"
            name="slug"
            type="text"
            readOnly={!isNew}
            defaultValue={topic.slug || ""}
            placeholder="halimbawa: kultura-at-wika"
            className={`w-full px-3 py-2 text-xs rounded-md border border-[var(--color-input-border)] bg-[var(--color-bg)] text-[var(--color-text)] font-mono ${
              !isNew ? "opacity-75 cursor-not-allowed" : "focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
            }`}
          />
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
              placeholder="Maikling buod ng saklaw at layunin ng temang ito..."
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
              placeholder="Brief overview of this thematic issue..."
              className="w-full px-3 py-2 text-xs rounded-md border border-[var(--color-input-border)] bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] leading-relaxed font-sans"
            />
          </div>
        </div>

        {/* Row 3: Styling & Organization */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
          {/* Color Token Selection */}
          <div className="space-y-1.5">
            <label
              htmlFor="color_token"
              className="block text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-text)]"
            >
              Kulay ng Tema
            </label>
            <select
              id="color_token"
              value={colorToken}
              onChange={(e) => setColorToken(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-md border border-[var(--color-input-border)] bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
            >
              {COLOR_OPTIONS.map((c) => (
                <option key={c.token} value={c.token}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Order Index */}
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
              max={99}
              defaultValue={topic.order_index || 8}
              className="w-full px-3 py-2 text-xs rounded-md border border-[var(--color-input-border)] bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] font-mono"
            />
          </div>

          {/* Icon Name */}
          <div className="space-y-1.5">
            <label
              htmlFor="icon_name"
              className="block text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-text)]"
            >
              Pangalan ng Icon (Lucide)
            </label>
            <input
              id="icon_name"
              name="icon_name"
              type="text"
              defaultValue={topic.icon_name || "BookOpen"}
              placeholder="Hal: BookOpen, Sparkles, Globe"
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
            defaultChecked={topic.is_published ?? true}
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

      {/* Danger Zone: Deletion (Only for existing topics) */}
      {!isNew && topic.id && (
        <div className="border border-red-200 dark:border-red-900/50 rounded-md bg-red-50/40 dark:bg-red-950/20 p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-red-700 dark:text-red-400">
                Mapanganib na Sona: Pagtanggal ng Paksa
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] max-w-xl leading-relaxed">
                Kapag tinanggal ang paksang ito, awtomatikong mabubura rin ang lahat ng mga aralin, sanggunian, at komento na nakatala sa ilalim nito. Hindi na ito maibabalik.
              </p>
            </div>

            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting || isSaving}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-red-600 text-white hover:bg-red-700 text-xs font-semibold font-mono uppercase tracking-wider transition-colors disabled:opacity-50 cursor-pointer shrink-0"
            >
              <Trash2 className="w-4 h-4" aria-hidden="true" />
              <span>{isDeleting ? "Tinatanggal..." : "Tanggalin ang Paksa"}</span>
            </button>
          </div>
        </div>
      )}

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
          <span>{isSaving ? "Inililigtas..." : isNew ? "Lumikha ng Paksa" : "I-save ang mga Pagbabago"}</span>
        </button>
      </div>
    </form>
  );
}
