"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Menu,
  Home,
  Search,
  User,
  LogOut,
  LayoutDashboard,
  BookOpen,
  MessageSquarePlus,
  ChevronDown,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useDrawer } from "./drawer-context";
import { SearchModal } from "@/components/search/search-modal";
import { createClient } from "@/lib/supabase/client";
import { logoutUser } from "@/lib/auth-actions";

interface HeaderProps {
  onOpenDrawer?: () => void;
}

interface UserSessionState {
  id: string;
  email: string;
  fullName: string | null;
  role: "admin" | "editor" | "viewer";
}

export function Header({ onOpenDrawer }: HeaderProps) {
  const { openDrawer } = useDrawer();
  const router = useRouter();

  const [user, setUser] = useState<UserSessionState | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync Supabase user state
  useEffect(() => {
    const supabase = createClient();

    async function fetchSession() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("role, full_name")
            .eq("id", session.user.id)
            .single();

          const p = profile as any;
          setUser({
            id: session.user.id,
            email: session.user.email || "",
            fullName: p?.full_name || session.user.user_metadata?.full_name || null,
            role:
              (p?.role as "admin" | "editor" | "viewer") ||
              (session.user.user_metadata?.role as "admin" | "editor" | "viewer") ||
              "viewer",
          });
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    }

    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchSession();
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleHamburgerClick = () => {
    if (onOpenDrawer) {
      onOpenDrawer();
    } else {
      openDrawer();
    }
  };

  const handleOpenSearch = () => {
    window.dispatchEvent(new CustomEvent("open-search-modal"));
  };

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logoutUser();
    setUser(null);
    router.refresh();
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-surface shadow-none transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left: Hamburger, Home icon, Brand Title with Logo */}
          <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
            <button
              type="button"
              onClick={handleHamburgerClick}
              className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-md border border-border bg-surface text-text hover:border-accent hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
              aria-label="Buksan ang Nilalaman"
              title="Buksan ang Nilalaman"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link
              href="/"
              className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-md border border-border bg-surface text-text hover:border-accent hover:text-primary transition-colors"
              aria-label="Pangunahing Pahina"
              title="Pangunahing Pahina"
            >
              <Home className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>

            <Link href="/" className="group flex items-center gap-2 sm:gap-2.5">
              <div className="relative w-8 h-8 md:w-9 md:h-9 shrink-0 overflow-hidden rounded">
                <Image
                  src="/images/LOGO.png"
                  alt="Diwang Panlipunan Logo"
                  width={36}
                  height={36}
                  priority
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="font-serif text-lg md:text-xl font-bold text-text group-hover:text-primary transition-colors tracking-tight">
                Diwang Panlipunan
              </span>
            </Link>
          </div>

          {/* Center: Search Input Bar (Desktop) */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                readOnly
                onClick={handleOpenSearch}
                placeholder="Maghanap ng mga paksa at artikulo..."
                className="w-full h-10 pl-10 pr-12 rounded-md border border-input-border bg-page text-sm text-text placeholder:text-text-muted cursor-pointer hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                aria-label="Maghanap ng mga paksa"
              />
              <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
                <kbd className="px-1.5 py-0.5 text-xs font-mono font-medium tracking-[0.06em] text-text-muted bg-surface border border-border rounded">
                  ⌘K
                </kbd>
              </div>
            </div>
          </div>

          {/* Right: Mobile search trigger, Theme Toggle & User Auth */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={handleOpenSearch}
              className="md:hidden inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-md border border-border bg-surface text-text hover:border-accent hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
              aria-label="Maghanap"
              title="Maghanap"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <ThemeToggle />

            {/* Authenticated User Menu vs Guest Auth Actions */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="inline-flex items-center gap-2 h-9 sm:h-10 px-2.5 sm:px-3 rounded-md border border-border bg-surface text-text hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary transition-colors cursor-pointer text-xs sm:text-sm"
                  aria-expanded={dropdownOpen}
                  aria-label="Menu ng Mambabasa"
                >
                  <div className="w-6 h-6 rounded-full bg-[#0D7B48] text-white flex items-center justify-center font-bold text-xs uppercase">
                    {user.fullName ? user.fullName.charAt(0) : user.email.charAt(0)}
                  </div>
                  <span className="hidden lg:inline-block max-w-[110px] truncate font-medium">
                    {user.fullName || user.email.split("@")[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-text-muted" />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-md border border-border bg-surface shadow-lg py-2 z-50 text-xs">
                    {/* User Info Header */}
                    <div className="px-3.5 py-2 border-b border-border space-y-1">
                      <div className="font-semibold text-text truncate">
                        {user.fullName || "Mambabasa"}
                      </div>
                      <div className="text-[11px] text-text-muted truncate">{user.email}</div>
                      <div className="pt-1">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                            user.role === "admin"
                              ? "bg-red-500/10 text-red-600 dark:text-red-400"
                              : user.role === "editor"
                              ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                              : "bg-[#0D7B48]/10 text-[#0D7B48]"
                          }`}
                        >
                          {user.role === "admin"
                            ? "Tagapangasiwa / Admin"
                            : user.role === "editor"
                            ? "Editor ng Nilalaman"
                            : "Mambabasa (Viewer)"}
                        </span>
                      </div>
                    </div>

                    {/* Nav Links */}
                    <div className="py-1">
                      {(user.role === "admin" || user.role === "editor") && (
                        <Link
                          href="/admin"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3.5 py-2 text-text hover:bg-page hover:text-primary transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 text-text-muted" />
                          <span>Tanggapan ng Patnugot (CMS)</span>
                        </Link>
                      )}

                      <Link
                        href="/home"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3.5 py-2 text-text hover:bg-page hover:text-primary transition-colors"
                      >
                        <BookOpen className="w-4 h-4 text-text-muted" />
                        <span>Mga Paksa at Aralin</span>
                      </Link>

                      <Link
                        href="/magmungkahi"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3.5 py-2 text-text hover:bg-page hover:text-primary transition-colors"
                      >
                        <MessageSquarePlus className="w-4 h-4 text-text-muted" />
                        <span>Magmungkahi ng Paksa</span>
                      </Link>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-border pt-1">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-red-600 hover:bg-red-500/10 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Mag-logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="hidden sm:inline-flex items-center justify-center h-9 sm:h-10 px-3.5 rounded-md border border-border bg-surface text-text hover:border-primary hover:text-primary font-medium text-xs sm:text-sm transition-colors"
                >
                  Mag-login
                </Link>

                <Link
                  href="/register"
                  className="inline-flex items-center justify-center h-9 sm:h-10 px-3.5 sm:px-4 rounded-md bg-[#0D7B48] text-white hover:bg-[#0A633A] font-semibold text-xs sm:text-sm transition-colors shadow-none"
                >
                  Mag-register
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
      <SearchModal />
    </>
  );
}
