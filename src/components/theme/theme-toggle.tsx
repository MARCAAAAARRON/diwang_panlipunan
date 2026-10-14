"use client";

import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className = "", showLabel = true }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid SSR hydration mismatch by rendering a stable placeholder until mounted
  if (!mounted) {
    return (
      <button
        type="button"
        className={`inline-flex items-center gap-2 h-10 min-h-[40px] md:h-11 md:min-h-[44px] px-3 md:px-4 rounded-md border border-border bg-surface text-text text-sm font-medium hover:border-accent transition-colors ${className}`}
        aria-label="Toggle theme"
        disabled
      >
        <Moon className="w-4 h-4 text-text-muted" />
        {showLabel && <span className="hidden sm:inline">Dark mode</span>}
      </button>
    );
  }

  const isDark = theme === "dark";
  const label = isDark ? "Light mode" : "Dark mode";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex items-center gap-2 h-10 min-h-[40px] md:h-11 md:min-h-[44px] px-3 md:px-4 rounded-md border border-border bg-surface text-text text-sm font-medium hover:border-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors ${className}`}
      aria-label={`Switch to ${label}`}
      title={`Switch to ${label}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-accent" />
      ) : (
        <Moon className="w-4 h-4 text-primary" />
      )}
      {showLabel && <span className="hidden sm:inline">{label}</span>}
    </button>
  );
}
