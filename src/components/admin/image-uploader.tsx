"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, Link as LinkIcon, X, Image as ImageIcon, Loader2 } from "lucide-react";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  bucketName?: string;
  description?: string;
}

export function ImageUploader({
  value = "",
  onChange,
  label = "Larawan / Banner",
  bucketName = "topic-assets",
  description = "Suportado: PNG, JPG, WebP (Hanggang 5MB)",
}: ImageUploaderProps) {
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await processFile(file);
  };

  const processFile = async (file: File) => {
    setError(null);

    // Validate MIME type
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError("Maling uri ng file. Tanging JPG, PNG, at WebP lamang ang pinapayagan.");
      return;
    }

    // Validate size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Masyadong malaki ang file. Hanggang 5MB lamang ang pinapayagan.");
      return;
    }

    setUploading(true);

    try {
      // 1. Upload to Cloudinary via server-side API route
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "diwang-panlipunan/banners");

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.url) {
        onChange(data.url);
        setUploading(false);
        return;
      }

      // If Cloudinary is unconfigured, provide local Data URL fallback for frictionless test
      if (data.unconfigured) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.result) {
            onChange(reader.result.toString());
          }
          setUploading(false);
        };
        reader.readAsDataURL(file);
        setError("Paunawa: Naka-load muna bilang lokal na Data URL dahil hindi pa naka-set ang CLOUDINARY credentials sa .env.local.");
        return;
      }

      setError(data.error || "Pumalya ang pag-upload sa Cloudinary.");
    } catch {
      // Offline / network fallback: Data URL
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          onChange(reader.result.toString());
        }
        setUploading(false);
      };
      reader.readAsDataURL(file);
      return;
    }

    setUploading(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files?.[0];
    if (file) {
      await processFile(file);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-text)]">
          {label}
        </label>
        <div className="flex items-center gap-1 text-xs font-mono">
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`px-2 py-0.5 rounded transition-colors ${
              mode === "upload"
                ? "bg-[var(--color-primary)] text-white font-semibold"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            I-upload
          </button>
          <span className="text-[var(--color-border)]">|</span>
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`px-2 py-0.5 rounded transition-colors ${
              mode === "url"
                ? "bg-[var(--color-primary)] text-white font-semibold"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            Direktang URL
          </button>
        </div>
      </div>

      {error && (
        <div className="p-2.5 rounded bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-800 text-red-800 dark:text-red-200 text-xs">
          {error}
        </div>
      )}

      {/* Selected Image Thumbnail Preview */}
      {value ? (
        <div className="relative border border-[var(--color-border)] rounded-md overflow-hidden bg-[var(--color-surface)] group">
          <div className="h-44 sm:h-52 w-full overflow-hidden bg-neutral-900 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Larawan Preview"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-2.5 border-t border-[var(--color-border)] flex items-center justify-between text-xs bg-[var(--color-surface)]">
            <span className="font-mono text-xs text-[var(--color-text-muted)] truncate max-w-[260px]">
              {value.startsWith("data:") ? "Naka-load na Data URL" : value}
            </span>
            <button
              type="button"
              onClick={() => onChange("")}
              className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 dark:text-red-400 hover:underline cursor-pointer"
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Tanggalin</span>
            </button>
          </div>
        </div>
      ) : (
        /* Empty Upload State */
        <>
          {mode === "upload" ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[var(--color-border)] hover:border-[var(--color-primary)] rounded-md p-6 text-center bg-[var(--color-surface)] hover:bg-[var(--color-bg)] transition-colors cursor-pointer space-y-2"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="flex justify-center text-[var(--color-primary)]">
                {uploading ? (
                  <Loader2 className="w-8 h-8 animate-spin" />
                ) : (
                  <UploadCloud className="w-8 h-8" />
                )}
              </div>
              <div className="text-xs text-[var(--color-text)]">
                <span className="font-semibold text-[var(--color-primary)]">
                  Mag-click upang pumili ng file
                </span>{" "}
                o i-drag dito
              </div>
              <p className="text-xs text-[var(--color-text-muted)] font-mono">
                {description}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--color-text-muted)]">
                  <LinkIcon className="w-4 h-4" aria-hidden="true" />
                </div>
                <input
                  type="url"
                  placeholder="https://example.com/larawan.jpg"
                  onChange={(e) => onChange(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-md border border-[var(--color-input-border)] bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] font-mono"
                />
              </div>
              <p className="text-xs text-[var(--color-text-muted)] font-mono">
                Maglagay ng pampublikong URL ng larawan (HTTPS lamang).
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
