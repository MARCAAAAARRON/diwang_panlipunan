"use client";

import React from "react";

interface CitationAnchorProps {
  refNumber: number;
  label?: string;
}

export function CitationAnchor({ refNumber, label }: CitationAnchorProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById(`sanggunian-${refNumber}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      target.classList.add("citation-highlight");
      setTimeout(() => {
        target.classList.remove("citation-highlight");
      }, 2000);
    }
  };

  return (
    <sup className="inline-block px-0.5">
      <button
        type="button"
        onClick={handleClick}
        aria-label={`Pumunta sa sanggunian bilang ${refNumber}${label ? `: ${label}` : ""}`}
        title={label ? `Sanggunian [${refNumber}]: ${label}` : `Pumunta sa Sanggunian [${refNumber}]`}
        className="text-[var(--color-primary)] font-mono text-xs font-semibold hover:underline focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] rounded px-0.5 transition-colors cursor-pointer"
      >
        [{refNumber}]
      </button>
    </sup>
  );
}
