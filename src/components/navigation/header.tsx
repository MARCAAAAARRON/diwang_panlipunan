"use client";

import React from "react";
import Link from "next/link";
import { Menu, Home, Search, User } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

interface HeaderProps {
  onOpenDrawer?: () => void;
}

export function Header({ onOpenDrawer }: HeaderProps) {
  const handleHamburgerClick = () => {
    if (onOpenDrawer) {
      onOpenDrawer();
    } else {
      // Dispatch custom window event so any listening Drawer component can open
      window.dispatchEvent(new CustomEvent("open-content-drawer"));
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-surface shadow-none transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Hamburger, Home icon, Brand Title */}
        <div className="flex items-center gap-3 md:gap-4 shrink-0">
          <button
            type="button"
            onClick={handleHamburgerClick}
            className="inline-flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-md border border-border bg-surface text-text hover:border-accent hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
            aria-label="Buksan ang Nilalaman"
            title="Buksan ang Nilalaman"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-md border border-border bg-surface text-text hover:border-accent hover:text-primary transition-colors"
            aria-label="Pangunahing Pahina"
            title="Pangunahing Pahina"
          >
            <Home className="w-5 h-5" />
          </Link>

          <Link href="/" className="group flex flex-col">
            <span className="font-serif text-lg md:text-xl font-bold text-text group-hover:text-primary transition-colors tracking-tight">
              Diwang Panlipunan
            </span>
          </Link>
        </div>

        {/* Center: Search Input Bar */}
        <div className="flex-1 max-w-md hidden sm:block">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              readOnly
              onClick={() => {
                // Phase 5 will wire this to full-text search modal
                window.dispatchEvent(new CustomEvent("open-search-modal"));
              }}
              placeholder="Search topics"
              className="w-full h-10 md:h-11 pl-10 pr-4 rounded-md border border-input-border bg-page text-sm text-text placeholder:text-text-muted cursor-pointer hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
              aria-label="Search topics"
            />
          </div>
        </div>

        {/* Right: Theme Toggle & User Auth */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <ThemeToggle />

          <Link
            href="/login"
            className="inline-flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-md border border-border bg-surface text-text hover:border-accent hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
            aria-label="Mag-login"
            title="Mag-login"
          >
            <User className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
