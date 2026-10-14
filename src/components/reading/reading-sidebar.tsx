"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, BarChart2, Bookmark, MessageSquare, Mail, Info } from "lucide-react";

interface ReadingSidebarProps {
  topicTitle: string;
  topicSlug: string;
}

export function ReadingSidebar({ topicTitle, topicSlug }: ReadingSidebarProps) {
  const navItems = [
    {
      label: "Tungkol sa Aralin",
      href: "#aralin",
      icon: BookOpen,
    },
    {
      label: "Pangunahing Datos",
      href: "#tala-ng-datos",
      icon: BarChart2,
    },
    {
      label: "Mga Sanggunian",
      href: "#sanggunian",
      icon: Bookmark,
    },
    {
      label: "Nakatulong ba ito?",
      href: "#feedback",
      icon: MessageSquare,
    },
  ];

  return (
    <aside
      aria-label="Sidebar ng Nilalaman"
      className="hidden xl:block w-full sticky top-24 space-y-6"
    >
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md p-5 space-y-4">
        <div className="border-b border-[var(--color-border)] pb-3">
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)] font-semibold block mb-1">
            GABAY SA PAGBASA
          </span>
          <h3 className="font-serif text-base font-bold text-[var(--color-text)] line-clamp-1">
            {topicTitle}
          </h3>
        </div>

        <nav aria-label="Mabilis na Pag-navigate" className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg)] transition-colors"
              >
                <Icon className="w-4 h-4 text-[var(--color-primary)] shrink-0" aria-hidden="true" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="pt-3 border-t border-[var(--color-border)] space-y-2">
          <Link
            href={`/topics/${topicSlug}`}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:underline transition-colors"
          >
            <Info className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>Lahat ng Aralin sa Paksang Ito</span>
          </Link>
          <Link
            href="/makipag-ugnayan"
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:underline transition-colors"
          >
            <Mail className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>Magmungkahi ng Paksa</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
