"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Bumalik sa itaas ng aralin"
      className="fixed bottom-6 right-6 z-30 flex items-center gap-2 px-3 py-2 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] text-xs font-mono uppercase tracking-[0.06em] transition-all print:hidden"
    >
      <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
      <span className="hidden sm:inline">Itaas</span>
    </button>
  );
}
