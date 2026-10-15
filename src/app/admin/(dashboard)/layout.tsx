import React from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { logoutAdmin } from "@/lib/auth-actions";
import {
  BookOpen,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  ExternalLink,
  ShieldCheck,
  MessageSquare,
  Lightbulb,
  BarChart3,
} from "lucide-react";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let adminEmail = "admin@diwangpanlipunan.ph";

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user?.email) {
      adminEmail = user.email;
    }
  } catch {
    // Local / fallback mode
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col font-sans">
      {/* Top Editorial Admin Bar */}
      <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo & Editorial Title */}
            <div className="flex items-center gap-3">
              <Link href="/admin" className="flex items-center gap-2.5 group">
                <div className="relative w-8 h-8 shrink-0 overflow-hidden rounded">
                  <Image
                    src="/images/LOGO.png"
                    alt="Diwang Panlipunan Logo"
                    width={32}
                    height={32}
                    priority
                    className="object-contain w-full h-full"
                  />
                </div>
                <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
                  DIWANG PANLIPUNAN
                </span>
                <span className="hidden md:inline-block text-[var(--color-border)]">|</span>
                <span className="hidden md:inline-block text-xs font-mono uppercase tracking-wider text-[var(--color-primary)] font-semibold">
                  Tanggapan ng Patnugot
                </span>
              </Link>
            </div>

            {/* Profile & Logout Action */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded border border-[var(--color-border)] bg-[var(--color-bg)] text-xs font-mono text-[var(--color-text-muted)]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                <span className="max-w-[150px] truncate">{adminEmail}</span>
              </div>

              <Link
                href="/home"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                title="Tingnan ang pampublikong website"
              >
                <span>Tingnan ang Website</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>

              <form action={logoutAdmin}>
                <button
                  type="submit"
                  title="Mag-logout"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] hover:bg-red-50 hover:border-red-300 dark:hover:bg-red-950/30 text-xs font-semibold text-[var(--color-text)] hover:text-red-700 dark:hover:text-red-300 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                  <span className="hidden sm:inline">Mag-logout</span>
                </button>
              </form>
            </div>
          </div>

          {/* Admin Navigation Tabs */}
          <nav aria-label="Admin Navigation" className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 -mb-px">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-text)] hover:bg-[var(--color-bg)] transition-colors border border-transparent hover:border-[var(--color-border)]"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-[var(--color-primary)]" aria-hidden="true" />
              <span>Pangkalahatan</span>
            </Link>

            <Link
              href="/admin/topics"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-text)] hover:bg-[var(--color-bg)] transition-colors border border-transparent hover:border-[var(--color-border)]"
            >
              <FolderKanban className="w-3.5 h-3.5 text-[var(--color-primary)]" aria-hidden="true" />
              <span>Mga Paksa (7)</span>
            </Link>

            <Link
              href="/admin/subtopics"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-text)] hover:bg-[var(--color-bg)] transition-colors border border-transparent hover:border-[var(--color-border)]"
            >
              <BookOpen className="w-3.5 h-3.5 text-[var(--color-primary)]" aria-hidden="true" />
              <span>Mga Aralin</span>
            </Link>

            <Link
              href="/admin/feedback"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-text)] hover:bg-[var(--color-bg)] transition-colors border border-transparent hover:border-[var(--color-border)]"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[var(--color-primary)]" aria-hidden="true" />
              <span>Mga Tugon</span>
            </Link>

            <Link
              href="/admin/suggestions"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-text)] hover:bg-[var(--color-bg)] transition-colors border border-transparent hover:border-[var(--color-border)]"
            >
              <Lightbulb className="w-3.5 h-3.5 text-[var(--color-primary)]" aria-hidden="true" />
              <span>Mga Mungkahi</span>
            </Link>

            <Link
              href="/admin/analytics"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-text)] hover:bg-[var(--color-bg)] transition-colors border border-transparent hover:border-[var(--color-border)]"
            >
              <BarChart3 className="w-3.5 h-3.5 text-[var(--color-primary)]" aria-hidden="true" />
              <span>Analytics</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Administrative Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Admin Footer */}
      <footer className="border-t border-[var(--color-border)] py-4 bg-[var(--color-surface)] text-center text-xs font-mono text-[var(--color-text-muted)]">
        Diwang Panlipunan CMS • Bersyon 1.0 (Ligtas at Nasuring Patnugutan)
      </footer>
    </div>
  );
}
