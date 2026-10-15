"use client";

import React, { useState, Suspense } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { loginAdmin, type AuthState } from "@/lib/auth-actions";
import { Lock, Mail, Eye, EyeOff, ShieldAlert, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] font-semibold text-sm transition-colors disabled:opacity-50 cursor-pointer"
    >
      <span>{pending ? "Sinusuri ang Kredensyal..." : "Mag-log in sa Tanggapan"}</span>
      <ArrowRight className="w-4 h-4" aria-hidden="true" />
    </button>
  );
}

function LoginFormContent() {
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/admin";
  const urlError = searchParams.get("error");

  const [state, formAction] = useFormState<AuthState, FormData>(loginAdmin, {
    error: null,
  });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-md space-y-8">
      {/* Editorial Brand Header */}
      <div className="text-center space-y-2">
        <Link
          href="/home"
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--color-primary)] hover:underline mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Bumalik sa Diwang Panlipunan</span>
        </Link>
        <div className="w-12 h-1 bg-[var(--color-primary)] mx-auto mb-3" />
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-text-muted)] font-semibold block">
          PORTAL NG ADMINISTRADOR
        </span>
        <h1 className="font-serif text-3xl font-extrabold text-[var(--color-text)] tracking-tight">
          Tanggapan ng Patnugot
        </h1>
        <p className="text-xs text-[var(--color-text-muted)] max-w-sm mx-auto">
          Ligtas na pag-access para sa pamamahala ng mga tematikong paksa, artikulo, at sanggunian.
        </p>
      </div>

      {/* Login Form Container */}
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md p-6 sm:p-8 space-y-6">
        {/* URL Error Message */}
        {urlError === "unauthorized" && (
          <div className="p-3.5 rounded-md bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" aria-hidden="true" />
            <span>
              Kinakailangan ang pahintulot bilang administrador upang ma-access ang bahaging ito.
            </span>
          </div>
        )}

        {/* Form State Error */}
        {state?.error && (
          <div className="p-3.5 rounded-md bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-800 text-red-900 dark:text-red-200 text-xs flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 shrink-0 text-red-600 dark:text-red-400 mt-0.5" aria-hidden="true" />
            <span>{state.error}</span>
          </div>
        )}

        <form action={formAction} className="space-y-5">
          <input type="hidden" name="next" value={nextPath} />

          {/* Email Field */}
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-text)]"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--color-text-muted)]">
                <Mail className="w-4 h-4" aria-hidden="true" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="email@halimbawa.com"
                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-md border border-[var(--color-input-border)] bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] font-sans"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-text)]"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--color-text-muted)]">
                <Lock className="w-4 h-4" aria-hidden="true" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                placeholder="••••••••••••"
                className="w-full pl-9 pr-10 py-2.5 text-sm rounded-md border border-[var(--color-input-border)] bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] font-sans"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Itago ang password" : "Ipakita ang password"}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Eye className="w-4 h-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <SubmitButton />
          </div>
        </form>

        <div className="pt-4 border-t border-[var(--color-border)] text-center">
          <p className="text-[11px] text-[var(--color-text-muted)] font-mono">
            Diwang Panlipunan • Sistema ng Pamamahala at Patnugutan
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-8">
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center p-12 text-xs font-mono text-[var(--color-text-muted)] space-y-2">
            <Loader2 className="w-6 h-6 animate-spin text-[var(--color-primary)]" />
            <span>Inihahanda ang portal...</span>
          </div>
        }
      >
        <LoginFormContent />
      </Suspense>
    </div>
  );
}
