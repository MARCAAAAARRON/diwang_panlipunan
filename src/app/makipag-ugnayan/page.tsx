import React from "react";
import Link from "next/link";
import { Mail, MessageSquare, BookOpen, ExternalLink, HelpCircle } from "lucide-react";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";

export default function ContactPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Pangunahing Pahina", href: "/home" },
          { label: "Makipag-ugnayan" },
        ]}
      />

      {/* Header */}
      <header className="space-y-3 border-b border-border pb-6">
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text">
          Makipag-ugnayan
        </h1>
        <p className="font-serif text-base sm:text-lg italic text-text-muted">
          Opisyal na Komunikasyon at Pakikipagtulungang Sibiko
        </p>
      </header>

      {/* Primary Contact Channels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Email Desk */}
        <div className="p-6 rounded-md border border-border bg-surface space-y-4">
          <div className="w-10 h-10 rounded-md bg-highlight flex items-center justify-center text-primary">
            <Mail className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h2 className="font-serif text-lg font-bold text-text">
              Tanggapan ng Patnugutan
            </h2>
            <p className="text-xs text-text-muted">
              Para sa mga opisyal na katanungan, pagsusuri ng datos, o pagtutuwid sa nilalaman ng mga modyul:
            </p>
          </div>
          <div className="pt-2">
            <a
              href="mailto:ugnayan@diwangpanlipunan.ph"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              <span>ugnayan@diwangpanlipunan.ph</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Suggestion Box Pointer */}
        <div className="p-6 rounded-md border border-border bg-surface space-y-4">
          <div className="w-10 h-10 rounded-md bg-highlight flex items-center justify-center text-primary">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h2 className="font-serif text-lg font-bold text-text">
              Magmungkahi ng Paksa
            </h2>
            <p className="text-xs text-text-muted">
              Mayroon ka bang mungkahi para sa bagong paksang panlipunan o lokal na isyu na dapat talakayin?
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/home"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              <span>Buksan ang Kahon ng Mungkahi</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Guidelines Section */}
      <section className="p-6 sm:p-8 rounded-md border border-border bg-surface space-y-6">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-text">
          Mga Pamantayan sa Pakikipag-ugnayan
        </h2>

        <div className="space-y-4 text-sm text-text leading-relaxed">
          <div className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-text">Pang-akademikong Pagsusuri at Kontribusyon</h3>
              <p className="text-text-muted text-xs sm:text-sm mt-0.5">
                Tinatanggap namin ang mga pagsusuri, tala ng pananaliksik, at sanggunian mula sa mga guro, iskolar, at organisasyong sibiko. Ang lahat ng isinumite ay sumasailalim sa pagsusuri ng lupon ng patnugutan para sa kawastuhan ng datos.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-text">Paggamit sa Silid-Aralan</h3>
              <p className="text-text-muted text-xs sm:text-sm mt-0.5">
                Bukas at libre ang paggamit ng lahat ng materyales ng Diwang Panlipunan para sa pampubliko at pampribadong paaralan. Hindi kinakailangan ng espesyal na pahintulot upang gamitin ang mga aralin bilang kagamitang panturo, basta panatilihin ang karampatang pagkilala sa mga sanggunian.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
