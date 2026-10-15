"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Send, CheckCircle2, AlertCircle, BookOpen, Sparkles, Loader2, Lock, UserCheck } from "lucide-react";
import { submitTopicSuggestion, type SuggestionActionState } from "@/lib/suggestion-actions";
import { createClient } from "@/lib/supabase/client";

export default function SuggestionPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState<SuggestionActionState>({ success: false });
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ email: string; fullName: string | null } | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    try {
      const supabase = createClient();
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setCurrentUser({
            email: session.user.email || "",
            fullName: session.user.user_metadata?.full_name || null,
          });
        } else {
          setCurrentUser(null);
        }
        setIsLoadingAuth(false);
      });
    } catch {
      setCurrentUser(null);
      setIsLoadingAuth(false);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentUser) return;
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    try {
      const res = await submitTopicSuggestion(formState, formData);
      setFormState(res);
      if (res.success) {
        setIsSuccess(true);
      }
    } catch {
      setFormState({
        success: false,
        message: "Nagkaroon ng hindi inaasahang aberya. Mangyaring subukan muli.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormState({ success: false });
  };

  return (
    <main className="min-h-screen bg-[var(--color-page)] py-10 transition-colors">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
          <Link href="/" className="hover:text-[var(--color-primary)] transition-colors">
            Tahanan
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[var(--color-text)] font-medium">Magmungkahi</span>
        </nav>

        {/* Page Header */}
        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[var(--color-accent-subtle)] border border-[var(--color-border)] text-xs font-mono font-semibold text-[var(--color-accent)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PARTISIPASYONG PAMBAYAN</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--color-text)] tracking-tight">
            Magmungkahi ng Paksa o Suliraning Panlipunan
          </h1>
          <p className="text-sm sm:text-base text-[var(--color-text-muted)] font-sans leading-relaxed">
            Ang Diwang Panlipunan ay bukas sa mga panukalang aralin, pagsusuri sa datos, at pagsisiyasat sa mga suliraning kinakaharap ng mga pamayanang Pilipino. Ang inyong mga mungkahi ay direktang sinusuri ng aming lupon ng patnugutan.
          </p>
        </header>

        {/* Unauthenticated User Warning */}
        {!isLoadingAuth && !currentUser && (
          <div className="p-6 rounded-md border border-[#0D7B48]/30 bg-[#0D7B48]/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-[#0D7B48] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h2 className="text-sm font-bold text-text">Kailangan ng Login para sa Mungkahi</h2>
                <p className="text-xs text-text-muted">
                  Upang mapanatili ang integridad ng diskursong sibiko, tanging mga rehistradong miyembro lamang ang maaaring magpadala ng mungkahi.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/login?next=/magmungkahi"
                className="px-4 py-2 rounded-md bg-[#0D7B48] text-white hover:bg-[#0A633A] text-xs font-semibold transition-colors"
              >
                Mag-login
              </Link>
              <Link
                href="/register?next=/magmungkahi"
                className="px-4 py-2 rounded-md border border-border bg-surface text-text hover:border-[#0D7B48] text-xs font-semibold transition-colors"
              >
                Mag-register
              </Link>
            </div>
          </div>
        )}

        {/* Authenticated user indicator */}
        {currentUser && (
          <div className="p-3.5 rounded-md border border-border bg-surface flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-text">
              <UserCheck className="w-4 h-4 text-[#0D7B48]" />
              <span>
                Naka-login bilang: <strong className="font-semibold">{currentUser.fullName || currentUser.email}</strong>
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#0D7B48] font-semibold uppercase">Rehistradong Mambabasa</span>
          </div>
        )}

        {/* Editorial Guidance Notice */}
        <div className="p-5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] space-y-3">
          <h2 className="font-serif text-sm font-bold text-[var(--color-text)] uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[var(--color-primary)]" />
            <span>Mga Pamantayan sa Pagpili ng Paksa</span>
          </h2>
          <ul className="text-xs text-[var(--color-text-muted)] space-y-2 list-disc list-inside">
            <li>
              <strong className="text-[var(--color-text)] font-medium">Katuturan at Epekto:</strong> May tuwirang epekto sa kapakanan ng nakararaming mamamayan, partikular ang mga sektor na nasa laylayan.
            </li>
            <li>
              <strong className="text-[var(--color-text)] font-medium">Suportado ng Datos:</strong> Mayroong mapagkakatiwalaang pampublikong datos, pagsusuring akademiko, o ulat mula sa mga kinikilalang institusyon.
            </li>
            <li>
              <strong className="text-[var(--color-text)] font-medium">Mapanuri at Balanse:</strong> Naglalahad ng iba&apos;t ibang pananaw at naghihikayat ng malayang talastasan.
            </li>
          </ul>
        </div>

        {/* Success Confirmation State */}
        {isSuccess ? (
          <div className="p-8 rounded-md border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h2 className="font-serif text-xl font-bold text-emerald-950 dark:text-emerald-100">
                Matagumpay na Naipadala ang Mungkahi!
              </h2>
              <p className="text-sm text-emerald-800 dark:text-emerald-300 max-w-md mx-auto">
                {formState.message || "Maraming salamat! Naitala ang iyong mungkahi para sa susunod na pagpupulong ng lupon ng patnugutan."}
              </p>
            </div>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-5 py-2.5 rounded-md border border-emerald-400 dark:border-emerald-700 bg-surface text-xs font-semibold text-text hover:bg-emerald-100/50 dark:hover:bg-emerald-900/40 transition-colors"
              >
                Magpadala ng Iba Pang Mungkahi
              </button>
              <Link
                href="/home"
                className="w-full sm:w-auto px-5 py-2.5 rounded-md bg-[#0D7B48] hover:bg-[#0A633A] text-white text-xs font-semibold transition-colors text-center"
              >
                Bumalik sa Portal Feed
              </Link>
            </div>
          </div>
        ) : (
          /* Suggestion Form */
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] space-y-6 shadow-none"
          >
            {/* Error Banner */}
            {formState.message && !formState.success && (
              <div className="p-4 rounded-md border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/30 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                <div className="text-xs text-red-700 dark:text-red-300">
                  <p className="font-semibold">{formState.message}</p>
                </div>
              </div>
            )}

            {/* Anti-spam Honeypot Field */}
            <div className="hidden" aria-hidden="true" style={{ display: "none" }}>
              <label htmlFor="website_url_hp">Website URL (Huwag punan kung tao ka)</label>
              <input
                type="text"
                id="website_url_hp"
                name="website_url_hp"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Field 1: Topic Title */}
            <div className="space-y-1.5">
              <label htmlFor="title" className="block font-medium text-xs text-[var(--color-text)]">
                Pamagat ng Paksa o Suliranin <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                maxLength={150}
                placeholder="Halimbawa: Ang Epekto ng Jeepney Modernization sa mga Mananakay at Tsuper"
                className="w-full h-11 px-3.5 rounded-md border border-[var(--color-input-border)] bg-[var(--color-page)] text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-1 focus:ring-[#0D7B48] focus:border-[#0D7B48]"
              />
              {formState.errors?.title && (
                <p className="text-[11px] text-red-600 dark:text-red-400">{formState.errors.title[0]}</p>
              )}
            </div>

            {/* Field 2: Description */}
            <div className="space-y-1.5">
              <label htmlFor="description" className="block font-medium text-xs text-[var(--color-text)]">
                Paglalarawan at Sitwasyon sa Lipunan <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                maxLength={1500}
                placeholder="Ilarawan ang kasalukuyang kalagayan ng paksang ito. Bakit mahalagang magkaroon ng komprehensibong aralin ukol dito sa Diwang Panlipunan?"
                className="w-full p-3.5 rounded-md border border-[var(--color-input-border)] bg-[var(--color-page)] text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-1 focus:ring-[#0D7B48] focus:border-[#0D7B48] leading-relaxed"
              />
              <p className="text-[11px] text-[var(--color-text-muted)]">
                Hindi bababa sa 20 titik.
              </p>
              {formState.errors?.description && (
                <p className="text-[11px] text-red-600 dark:text-red-400">{formState.errors.description[0]}</p>
              )}
            </div>

            {/* Field 3: Rationale / Sources */}
            <div className="space-y-1.5">
              <label htmlFor="rationale" className="block font-medium text-xs text-[var(--color-text)]">
                Mga Iminumungkahing Sanggunian o Batayan <span className="text-[var(--color-text-muted)] font-normal">(Opsyonal)</span>
              </label>
              <textarea
                id="rationale"
                name="rationale"
                rows={3}
                maxLength={1000}
                placeholder="Mga ulat mula sa PSA, PIDS, mga balita, batas, o pananaliksik na maaring gamitin ng aming manunulat..."
                className="w-full p-3.5 rounded-md border border-[var(--color-input-border)] bg-[var(--color-page)] text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-1 focus:ring-[#0D7B48] focus:border-[#0D7B48] leading-relaxed"
              />
              {formState.errors?.rationale && (
                <p className="text-[11px] text-red-600 dark:text-red-400">{formState.errors.rationale[0]}</p>
              )}
            </div>

            {/* Field 4: Contact Email (Optional or prefilled) */}
            <div className="space-y-1.5">
              <label htmlFor="contact_email" className="block font-medium text-xs text-[var(--color-text)]">
                Email Address <span className="text-[var(--color-text-muted)] font-normal">(Opsyonal)</span>
              </label>
              <input
                type="email"
                id="contact_email"
                name="contact_email"
                defaultValue={currentUser?.email || ""}
                placeholder="halimbawa@email.com"
                className="w-full h-11 px-3.5 rounded-md border border-[var(--color-input-border)] bg-[var(--color-page)] text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-1 focus:ring-[#0D7B48] focus:border-[#0D7B48]"
              />
              <p className="text-[11px] text-[var(--color-text-muted)]">
                Gagamitin lamang upang ipagbigay-alam sa iyo kung nailathala na ang aralin. Hindi ito ibabahagi sa publiko.
              </p>
              {formState.errors?.contact_email && (
                <p className="text-[11px] text-red-600 dark:text-red-400">{formState.errors.contact_email[0]}</p>
              )}
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
              <Link
                href="/home"
                className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
              >
                Kanselahin
              </Link>
              <button
                type="submit"
                disabled={isSubmitting || !currentUser}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md bg-[#0D7B48] text-white font-semibold text-xs hover:bg-[#0A633A] focus:outline-none focus:ring-2 focus:ring-[#0D7B48] focus:ring-offset-2 transition-all disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Ipinapadala...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Ipadala ang Mungkahi</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
