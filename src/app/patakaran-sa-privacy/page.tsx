import React from "react";
import { ShieldCheck, Lock, EyeOff, FileText } from "lucide-react";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";

export default function PrivacyPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Pangunahing Pahina", href: "/home" },
          { label: "Patakaran sa Privacy" },
        ]}
      />

      {/* Header */}
      <header className="space-y-3 border-b border-border pb-6">
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text">
          Patakaran sa Privacy
        </h1>
        <p className="font-serif text-base sm:text-lg italic text-text-muted">
          Pangako sa Proteksyon ng Datos at Anonimong Pakikilahok
        </p>
      </header>

      {/* Main Privacy Principles Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-md border border-border bg-surface space-y-2">
          <div className="flex items-center gap-2 text-primary font-bold text-sm">
            <EyeOff className="w-4 h-4" />
            <span>Walang Pagsubaybay</span>
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            Hindi kami gumagamit ng third-party trackers, commercial profiling, o advertising telemetry.
          </p>
        </div>

        <div className="p-5 rounded-md border border-border bg-surface space-y-2">
          <div className="flex items-center gap-2 text-primary font-bold text-sm">
            <Lock className="w-4 h-4" />
            <span>Anonimong Feedback</span>
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            Ang mga tugon sa &ldquo;Oo/Hindi&rdquo; na pagsusuri ay hindi iniuugnay sa personal na pagkakakilanlan.
          </p>
        </div>

        <div className="p-5 rounded-md border border-border bg-surface space-y-2">
          <div className="flex items-center gap-2 text-primary font-bold text-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>RA 10173 Compliant</span>
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            Lubos na sumusunod sa mga panuntunan ng Philippine Data Privacy Act of 2012.
          </p>
        </div>
      </div>

      {/* Detailed Policy Text */}
      <section className="p-6 sm:p-8 rounded-md border border-border bg-surface space-y-6 text-text leading-relaxed">
        <div className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-text">
            1. Pilosopiya ng Plataporma
          </h2>
          <p className="text-sm text-text-muted leading-relaxed">
            Ang Diwang Panlipunan ay itinaguyod bilang isang pampublikong sanggunian. Naniniwala kami na ang pagbasa at pagsusuri ng mga usaping panlipunan ay dapat maging ligtas, bukas, at malaya sa anumang surveillance o pag-ani ng datos ng mga mag-aaral.
          </p>
        </div>

        <div className="space-y-3 pt-4 border-t border-border">
          <h2 className="font-serif text-xl font-bold text-text">
            2. Anonimong Tugon ng Mambabasa (Feedback & Suggestions)
          </h2>
          <p className="text-sm text-text-muted leading-relaxed">
            Kapag sumasagot sa tanong na &ldquo;Nakatulong ba ito?&rdquo; o nagbibigay ng maikling komento sa mga aralin, walang personal na impormasyon (tulad ng pangalan o email address) ang hinihingi o iniimbak. Ang datos na ito ay tanging ginagamit ng lupon ng patnugutan upang suriin kung aling mga modyul ang nangangailangan ng karagdagang sanggunian o paglilinaw.
          </p>
        </div>

        <div className="space-y-3 pt-4 border-t border-border">
          <h2 className="font-serif text-xl font-bold text-text">
            3. Paggamit ng Local Storage
          </h2>
          <p className="text-sm text-text-muted leading-relaxed">
            Gumagamit lamang ang website na ito ng browser <code className="px-1.5 py-0.5 rounded-sm bg-highlight text-xs font-mono">localStorage</code> para sa isang layunin: ang pag-alala ng iyong piniling tema (Light mode o Dark mode). Hindi ito naglalaman ng anumang personal na datos at hindi ito naipapadala sa aming mga server.
          </p>
        </div>

        <div className="space-y-3 pt-4 border-t border-border">
          <h2 className="font-serif text-xl font-bold text-text">
            4. Karapatan ng Gumagamit
          </h2>
          <p className="text-sm text-text-muted leading-relaxed">
            Alinsunod sa Data Privacy Act of 2012 (Republic Act No. 10173), may karapatan ang bawat mamamayan na malaman kung paano ginagamit ang kanilang datos. Para sa anumang katanungan ukol sa aming patakaran, maaaring sumulat sa aming Tanggapan ng Patnugutan sa <a href="mailto:ugnayan@diwangpanlipunan.ph" className="text-primary font-semibold hover:underline">ugnayan@diwangpanlipunan.ph</a>.
          </p>
        </div>
      </section>

      {/* Footer Note */}
      <div className="text-xs text-text-muted text-center pt-2">
        Huling binago: Oktubre 2026 • Bersyon 1.0 Sibiko
      </div>
    </div>
  );
}
