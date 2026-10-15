"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  MessageSquareQuote,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Home,
} from "lucide-react";
import { loginUser, registerUser, type AuthState } from "@/lib/auth-actions";

interface AuthCardProps {
  initialTab?: "login" | "register";
}

function SubmitButton({ label, pendingLabel }: { label: string; pendingLabel: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full h-11 inline-flex items-center justify-center gap-2 px-6 rounded-md bg-[#0D7B48] text-white hover:bg-[#0A633A] font-semibold text-sm transition-colors disabled:opacity-60 cursor-pointer shadow-none focus:outline-none focus:ring-2 focus:ring-[#0D7B48] focus:ring-offset-2"
    >
      {pending ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>{pendingLabel}</span>
        </>
      ) : (
        <>
          <span>{label}</span>
          <ArrowRight className="w-4 h-4" />
        </>
      )}
    </button>
  );
}

export function AuthCard({ initialTab = "login" }: AuthCardProps) {
  const searchParams = useSearchParams();
  const nextParam = searchParams.get("next") || "";
  const urlError = searchParams.get("error");

  const [activeTab, setActiveTab] = useState<"login" | "register">(initialTab);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loginState, loginFormAction] = useFormState<AuthState, FormData>(loginUser, {
    error: urlError === "unauthorized" ? "Kailangan mag-login upang ma-access ang pahinang ito." : null,
  });

  const [registerState, registerFormAction] = useFormState<AuthState, FormData>(registerUser, {
    error: null,
  });

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      {/* 1. Breadcrumbs & Language Bar */}
      <div className="flex items-center justify-between text-xs border-b border-border pb-3">
        <div className="flex items-center gap-2 text-text-muted">
          <Link
            href="/"
            className="inline-flex items-center gap-1 hover:text-primary transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Tahanan</span>
          </Link>
          <span>/</span>
          <span className="font-semibold text-text">
            {activeTab === "login" ? "Mag-login" : "Mag-register"}
          </span>
        </div>

        <div className="text-[11px] font-mono tracking-wider text-text-muted uppercase">
          <span className="text-primary font-bold">FILIPINO</span>
          <span className="mx-1.5">•</span>
          <span>ENGLISH</span>
        </div>
      </div>

      {/* 2. Main Dual-Column Editorial Card */}
      <div className="rounded-lg border border-border bg-surface shadow-none overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Editorial Panel (Dark Green Broadside Style) */}
        <div className="lg:col-span-5 bg-[#0D7B48] text-white p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-6 relative z-10">
            {/* Eyebrow */}
            <div className="inline-block px-2.5 py-1 rounded bg-white/10 text-[10px] font-mono font-semibold tracking-widest uppercase text-[#D2ECD9]">
              BUKAS NA PUBLIKASYONG SIBIKO • PAMPUBLIKONG DISKORS
            </div>

            {/* Brand Title & Quote */}
            <div className="space-y-2">
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                Diwang Panlipunan
              </h2>
              <p className="font-serif italic text-sm text-[#E2F4E7] leading-relaxed">
                “Ang pag-unawa ay simula ng pagbabago.”
              </p>
            </div>

            <div className="h-px bg-white/20 w-full" />

            <p className="text-xs sm:text-sm text-[#D7EFE0] leading-relaxed">
              Binuo ang platapormang ito upang maging malayang espasyo ng kaalaman, mapanuring diskurso, at tapat na pagtalakay sa mga isyung bumubuo sa ating lipunan.
            </p>

            <ul className="space-y-2.5 text-xs text-[#EAF7EE] pt-2">
              <li className="flex items-start gap-2">
                <span className="text-base leading-none text-[#A8E4BA]">•</span>
                <span>Malayang access sa mga pagsusuri sa pitong temang panlipunan.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-base leading-none text-[#A8E4BA]">•</span>
                <span>Kakayahang mag-iwan ng tugon at magmungkahi ng bagong paksa.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-base leading-none text-[#A8E4BA]">•</span>
                <span>Nasuri ng Lupon at may bukas na mga sanggunian.</span>
              </li>
            </ul>
          </div>

          {/* Left Footer Badge */}
          <div className="pt-8 border-t border-white/20 mt-8 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-[#C1ECD0]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-[11px] leading-tight text-[#D7EFE0]">
                <div className="font-semibold text-white">May Pananagutang Akademiko at Sibiko</div>
                <div className="text-[10px] font-mono opacity-80 mt-0.5">ISSN: 2984-7494 • Maynila, Pilipinas</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="lg:col-span-7 p-7 sm:p-9 flex flex-col justify-between bg-surface">
          <div className="space-y-6">
            {/* Tab Switches */}
            <div className="flex border-b border-border">
              <button
                type="button"
                onClick={() => setActiveTab("login")}
                className={`flex-1 py-3 text-sm font-semibold text-center border-b-2 transition-colors ${
                  activeTab === "login"
                    ? "border-[#0D7B48] text-[#0D7B48]"
                    : "border-transparent text-text-muted hover:text-text"
                }`}
              >
                Mag-login
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("register")}
                className={`flex-1 py-3 text-sm font-semibold text-center border-b-2 transition-colors ${
                  activeTab === "register"
                    ? "border-[#0D7B48] text-[#0D7B48]"
                    : "border-transparent text-text-muted hover:text-text"
                }`}
              >
                Mag-register
              </button>
            </div>

            {/* Header copy */}
            <div className="space-y-1">
              <h1 className="font-serif text-xl sm:text-2xl font-bold text-text tracking-tight">
                {activeTab === "login" ? "Mag-login sa Diwang Panlipunan" : "Lumikha ng Account"}
              </h1>
              <p className="text-xs sm:text-sm text-text-muted">
                {activeTab === "login"
                  ? "Ipasok ang iyong detalye upang ma-access ang mga talataan, aralin, at makapagbahagi ng tugon."
                  : "Maging bahagi ng mapanuring komunidad ng mga mambabasa at mamamayang mulat."}
              </p>
            </div>

            {/* ================= LOGIN FORM ================= */}
            {activeTab === "login" && (
              <form action={loginFormAction} className="space-y-4">
                <input type="hidden" name="next" value={nextParam} />

                {loginState?.error && (
                  <div className="p-3 rounded-md bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs sm:text-sm flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{loginState.error}</span>
                  </div>
                )}

                {/* Email Field */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="login-email"
                    className="block text-xs font-semibold text-text uppercase tracking-wider font-mono"
                  >
                    Pangunahing Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      id="login-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="halimbawa@email.com"
                      className="w-full h-10 pl-10 pr-3 rounded-md border border-input-border bg-page text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-[#0D7B48] focus:border-[#0D7B48] transition-colors"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="login-password"
                      className="block text-xs font-semibold text-text uppercase tracking-wider font-mono"
                    >
                      Lihim na Salita (Password)
                    </label>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      id="login-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      autoComplete="current-password"
                      placeholder="••••••••"
                      className="w-full h-10 pl-10 pr-10 rounded-md border border-input-border bg-page text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-[#0D7B48] focus:border-[#0D7B48] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted hover:text-text"
                      aria-label={showPassword ? "Itago ang password" : "Ipakita ang password"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me and Forgot Password */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-text-muted hover:text-text">
                    <input
                      type="checkbox"
                      name="remember"
                      defaultChecked
                      className="rounded border-border text-[#0D7B48] focus:ring-[#0D7B48] h-3.5 w-3.5"
                    />
                    <span>Panatilihing naka-login</span>
                  </label>

                  <span className="text-text-muted text-[11px]">
                    Nakalimutan ang password? Makipag-ugnayan sa patnugot.
                  </span>
                </div>

                <div className="pt-2">
                  <SubmitButton
                    label="Pumasok sa Diwang Panlipunan"
                    pendingLabel="Sinusuri ang Kredensyal..."
                  />
                </div>

                {/* Footer Switcher */}
                <div className="text-center pt-3 text-xs text-text-muted">
                  <span>Wala pang account? </span>
                  <button
                    type="button"
                    onClick={() => setActiveTab("register")}
                    className="font-semibold text-[#0D7B48] hover:underline"
                  >
                    Mag-register dito
                  </button>
                </div>
              </form>
            )}

            {/* ================= REGISTER FORM ================= */}
            {activeTab === "register" && (
              <form action={registerFormAction} className="space-y-4">
                <input type="hidden" name="next" value={nextParam} />

                {registerState?.error && (
                  <div className="p-3 rounded-md bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs sm:text-sm flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{registerState.error}</span>
                  </div>
                )}

                {registerState?.success && (
                  <div className="p-3 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs sm:text-sm flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{registerState.message}</span>
                  </div>
                )}

                {/* Full Name */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="register-fullname"
                    className="block text-xs font-semibold text-text uppercase tracking-wider font-mono"
                  >
                    Buong Pangalan
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      id="register-fullname"
                      name="fullName"
                      type="text"
                      required
                      placeholder="Juan Dela Cruz"
                      className="w-full h-10 pl-10 pr-3 rounded-md border border-input-border bg-page text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-[#0D7B48] focus:border-[#0D7B48] transition-colors"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="register-email"
                    className="block text-xs font-semibold text-text uppercase tracking-wider font-mono"
                  >
                    Pangunahing Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      id="register-email"
                      name="email"
                      type="email"
                      required
                      placeholder="halimbawa@email.com"
                      className="w-full h-10 pl-10 pr-3 rounded-md border border-input-border bg-page text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-[#0D7B48] focus:border-[#0D7B48] transition-colors"
                    />
                  </div>
                </div>

                {/* Password & Confirm */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="register-password"
                      className="block text-xs font-semibold text-text uppercase tracking-wider font-mono"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="register-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="Min. 6 na titik"
                        className="w-full h-10 pl-3 pr-8 rounded-md border border-input-border bg-page text-xs text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-[#0D7B48] focus:border-[#0D7B48] transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-text-muted hover:text-text"
                        aria-label={showPassword ? "Itago" : "Ipakita"}
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="register-confirm-password"
                      className="block text-xs font-semibold text-text uppercase tracking-wider font-mono"
                    >
                      Kumpirmahin
                    </label>
                    <div className="relative">
                      <input
                        id="register-confirm-password"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        placeholder="Ulitin ang password"
                        className="w-full h-10 pl-3 pr-8 rounded-md border border-input-border bg-page text-xs text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-[#0D7B48] focus:border-[#0D7B48] transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-text-muted hover:text-text"
                        aria-label={showConfirmPassword ? "Itago" : "Ipakita"}
                      >
                        {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Terms Checkbox */}
                <div className="pt-1">
                  <label className="flex items-start gap-2.5 cursor-pointer text-xs text-text-muted">
                    <input
                      type="checkbox"
                      required
                      className="mt-0.5 rounded border-border text-[#0D7B48] focus:ring-[#0D7B48] h-3.5 w-3.5"
                    />
                    <span>
                      Sumasang-ayon ako sa mga alituntunin ng pamayanan at sa{" "}
                      <Link
                        href="/patakaran-sa-privacy"
                        target="_blank"
                        className="text-[#0D7B48] font-medium hover:underline"
                      >
                        Patakaran sa Privacy
                      </Link>{" "}
                      ng Diwang Panlipunan.
                    </span>
                  </label>
                </div>

                <div className="pt-2">
                  <SubmitButton
                    label="Lumikha ng Account"
                    pendingLabel="Inirerehistro ang Account..."
                  />
                </div>

                {/* Footer Switcher */}
                <div className="text-center pt-3 text-xs text-text-muted">
                  <span>Mayroon nang account? </span>
                  <button
                    type="button"
                    onClick={() => setActiveTab("login")}
                    className="font-semibold text-[#0D7B48] hover:underline"
                  >
                    Mag-login dito
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* 3. Three Bottom Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-2">
        {/* Feature 1 */}
        <div className="rounded-md border border-border bg-surface p-5 space-y-2">
          <div className="w-9 h-9 rounded-md bg-[#0D7B48]/10 text-[#0D7B48] flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-text">Bukas na Aklatan</h3>
          <p className="text-xs text-text-muted leading-relaxed">
            Libreng access sa pitong pangunahing laranang panlipunan, artikulo, at komprehensibong sanggunian para sa publiko.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="rounded-md border border-border bg-surface p-5 space-y-2">
          <div className="w-9 h-9 rounded-md bg-[#0D7B48]/10 text-[#0D7B48] flex items-center justify-center">
            <MessageSquareQuote className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-text">Pampublikong Talakayan</h3>
          <p className="text-xs text-text-muted leading-relaxed">
            Magbahagi ng tugon (Oo/Hindi) at komentaryo sa bawat aralin, at magmungkahi ng mga bagong paksang pambansa.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="rounded-md border border-border bg-surface p-5 space-y-2">
          <div className="w-9 h-9 rounded-md bg-[#0D7B48]/10 text-[#0D7B48] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-text">Seguridad at Lihim</h3>
          <p className="text-xs text-text-muted leading-relaxed">
            Pinangangalagaan ang iyong impormasyon at kaligtasan ayon sa Data Privacy Act ng 2012 at pampublikong etika.
          </p>
        </div>
      </div>
    </div>
  );
}
