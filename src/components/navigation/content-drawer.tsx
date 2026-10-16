"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X, ChevronDown, ChevronRight, Mail, ArrowRight } from "lucide-react";
import { useDrawer } from "./drawer-context";
import { DrawerTopicItem } from "@/types/navigation";

export function ContentDrawer() {
  const { isOpen, closeDrawer, activeTopicSlug, setActiveTopicSlug } = useDrawer();
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);
  const [topics, setTopics] = useState<DrawerTopicItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch strictly what is present in the database
  const fetchNav = useCallback(async () => {
    try {
      const res = await fetch(`/api/navigation?t=${Date.now()}`, {
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.topics && Array.isArray(data.topics)) {
          setTopics(data.topics);
        }
      }
    } catch {
      // Keep current state on error
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Sync on initial mount
  useEffect(() => {
    fetchNav();
  }, [fetchNav]);

  // Synchronize on drawer open to guarantee live database reflection
  useEffect(() => {
    if (isOpen) {
      fetchNav();
    }
  }, [isOpen, fetchNav]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeDrawer();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeDrawer]);

  // Focus trap inside drawer
  useEffect(() => {
    if (!isOpen) return;

    const drawerElement = drawerRef.current;
    if (!drawerElement) return;

    const focusableElements = drawerElement.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (firstElement) {
      firstElement.focus();
    }

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener("keydown", handleTabKey);
    return () => window.removeEventListener("keydown", handleTabKey);
  }, [isOpen]);

  const handleTopicClick = (slug: string) => {
    // Single-topic accordion: clicking toggles expansion
    setActiveTopicSlug(activeTopicSlug === slug ? null : slug);
  };

  return (
    <>
      {/* Flat Dark Scrim Backdrop (Strictly no blur per DESIGN.md) */}
      <div
        className={`fixed inset-0 z-50 bg-[#092328]/60 transition-opacity duration-200 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* 320px Slide-out Left Drawer */}
      <aside
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Nilalaman ng Publikasyon"
        className={`fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] bg-surface text-text border-r border-border shadow-none flex flex-col transition-transform duration-200 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="h-16 px-5 border-b border-border flex items-center justify-between shrink-0 bg-surface">
          <div className="flex items-center gap-2.5">
            <div className="relative w-6 h-6 shrink-0 overflow-hidden rounded">
              <Image
                src="/images/LOGO.png"
                alt="Diwang Panlipunan Logo"
                width={24}
                height={24}
                className="object-contain w-full h-full"
              />
            </div>
            <h2 className="font-serif text-xl font-bold tracking-tight text-text">
              Nilalaman
            </h2>
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-border text-text hover:border-accent hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
            aria-label="Isara ang Nilalaman"
            title="Isara ang Nilalaman"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Topics & Subtopics List */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          {isLoading && topics.length === 0 ? (
            <div className="space-y-3 p-2">
              <div className="h-10 rounded bg-page/70 animate-pulse" />
              <div className="h-10 rounded bg-page/70 animate-pulse" />
              <div className="h-10 rounded bg-page/70 animate-pulse" />
            </div>
          ) : topics.length === 0 ? (
            <div className="p-8 text-center text-xs text-text-muted space-y-2">
              <p className="font-serif font-bold text-sm text-text">
                Walang Paksa
              </p>
              <p>Walang natagpuang nailathalang paksa sa database ng sistema.</p>
            </div>
          ) : (
            topics.map((topic) => {
              const isExpanded = activeTopicSlug === topic.slug;
              const hasSubtopics = topic.subtopics && topic.subtopics.length > 0;

              return (
                <div key={topic.id} className="rounded-md overflow-hidden">
                  {/* Topic Row Accordion Trigger */}
                  <button
                    type="button"
                    onClick={() => handleTopicClick(topic.slug)}
                    aria-expanded={isExpanded}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-left text-sm font-medium transition-colors hover:bg-page ${
                      isExpanded ? "text-primary" : "text-text"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <span className="font-mono text-xs font-bold text-primary shrink-0">
                        {topic.number}
                      </span>
                      <span className="truncate leading-snug">
                        {topic.title}
                      </span>
                    </div>
                    {hasSubtopics ? (
                      isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-primary shrink-0" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-text-muted shrink-0" />
                      )
                    ) : (
                      <span className="text-[10px] font-mono text-text-muted shrink-0 uppercase tracking-wider">
                        0 aralin
                      </span>
                    )}
                  </button>

                  {/* Subtopics List (Collapsible Accordion Content) */}
                  {isExpanded && (
                    <div className="ml-5 my-1.5 pl-3 border-l border-border space-y-1">
                      {hasSubtopics ? (
                        <>
                          <Link
                            href={`/topics/${topic.slug}`}
                            onClick={closeDrawer}
                            className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono text-primary hover:underline mb-1"
                          >
                            <span>Tingnan ang pangkalahatang paksa</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>

                          {topic.subtopics.map((subtopic) => {
                            const subtopicHref = `/topics/${topic.slug}/${subtopic.slug}`;
                            const isActive = pathname === subtopicHref;

                            return (
                              <Link
                                key={subtopic.id}
                                href={subtopicHref}
                                onClick={closeDrawer}
                                className={`flex items-start gap-2 px-2.5 py-1.5 rounded-sm text-xs leading-relaxed transition-all ${
                                  isActive
                                    ? "bg-highlight text-text font-semibold border-l-2 border-primary-large"
                                    : "text-text-muted hover:text-text hover:bg-page"
                                }`}
                              >
                                <span className="font-mono opacity-80 shrink-0">
                                  {subtopic.code}
                                </span>
                                <span className="truncate">
                                  {subtopic.title}
                                </span>
                              </Link>
                            );
                          })}
                        </>
                      ) : (
                        <div className="px-2.5 py-2 text-xs text-text-muted space-y-1">
                          <p className="italic text-[11px]">Wala pang nailathalang aralin.</p>
                          <Link
                            href={`/topics/${topic.slug}`}
                            onClick={closeDrawer}
                            className="inline-flex items-center gap-1 font-mono text-[11px] text-primary hover:underline"
                          >
                            <span>Pumunta sa pahina ng paksa</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-border shrink-0 bg-surface">
          <Link
            href="/makipag-ugnayan"
            onClick={closeDrawer}
            className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-text-muted hover:text-primary hover:bg-page transition-colors"
          >
            <Mail className="w-4 h-4 text-primary shrink-0" />
            <span>Pakikipag-ugnayan</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
