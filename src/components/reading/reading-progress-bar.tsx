"use client";

import React, { useEffect, useState } from "react";

interface ReadingProgressBarProps {
  colorToken?: string;
}

export function ReadingProgressBar({ colorToken }: ReadingProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const article = document.getElementById("aralin");
          if (article) {
            const rect = article.getBoundingClientRect();
            const articleTop = rect.top + window.scrollY;
            const articleHeight = article.offsetHeight;
            const windowHeight = window.innerHeight;

            const total = articleHeight - windowHeight * 0.7;
            const current = window.scrollY - articleTop + 100;

            if (total > 0) {
              const pct = (current / total) * 100;
              setProgress(Math.min(100, Math.max(0, pct)));
            }
          } else {
            // Fallback to document scroll
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight > 0) {
              const pct = (window.scrollY / docHeight) * 100;
              setProgress(Math.min(100, Math.max(0, pct)));
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none transition-all duration-75 ease-out no-print"
      style={{
        width: `${progress}%`,
        backgroundColor: colorToken || "var(--topic-color, var(--color-primary))",
      }}
    />
  );
}
