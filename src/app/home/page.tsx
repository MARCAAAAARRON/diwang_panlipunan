import React from "react";
import Link from "next/link";
import { ArrowRight, Clock, CheckCircle2, ShieldCheck, FileText, Check } from "lucide-react";
import { getAllTopics } from "@/lib/content-service";

export default async function HomePage() {
  const topics = await getAllTopics();
  const featuredTopic = topics[0];
  const featuredSubtopic = featuredTopic?.subtopics?.[0];
  const featuredHref = featuredSubtopic
    ? `/topics/${featuredTopic.slug}/${featuredSubtopic.slug}`
    : featuredTopic
    ? `/topics/${featuredTopic.slug}`
    : "/topics";

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Top Metadata Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-text-muted border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary inline-block" />
          <span className="font-semibold text-text uppercase tracking-wider">PORTAL NG BAYAN</span>
          <span>/</span>
          <span>Pangunahing Pahina</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span>Huling Na-update: Oktubre 2026</span>
          <span>•</span>
          <span className="inline-flex items-center gap-1 text-primary">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Nasuri ng Lupon</span>
          </span>
        </div>
      </div>

      {/* Featured Topic Banner (Tampok na Paksa) */}
      {featuredTopic && (
        <section className="relative rounded-md border border-border bg-[#14231B] text-[#EAF3EC] p-6 sm:p-10 overflow-hidden shadow-none">
          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-white/10 text-xs font-mono font-semibold tracking-wider uppercase text-[#E3F0AF]">
              <span>TAMPOK NA PAKSA • DISKURSO 01</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
              {featuredTopic.name_fil}
            </h1>

            <p className="text-sm sm:text-base text-[#C5D9CA] leading-relaxed max-w-2xl">
              {featuredTopic.description_fil}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href={featuredHref}
                className="inline-flex items-center gap-2 h-10 px-5 rounded-md bg-[#5DB996] text-[#092328] font-semibold text-sm hover:bg-[#8BBB92] transition-colors"
              >
                <span>{featuredSubtopic ? "Basahin ang Aralin" : "Tingnan ang Paksa"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="inline-flex items-center gap-1.5 text-xs text-[#C5D9CA]">
                <Clock className="w-3.5 h-3.5" />
                <span>{featuredSubtopic?.read_time_minutes || 6} minutong pagbasa</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Editorial Orientation Note (Panimulang Gabay) */}
      <section className="p-6 sm:p-8 rounded-md border border-border bg-surface space-y-5">
        <div className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
            PANIMULANG GABAY
          </span>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-text">
            Bukas na Talakayan para sa Mapanuring Mamamayan
          </h2>
        </div>

        <div className="prose prose-sm max-w-none text-text leading-relaxed space-y-4">
          <p className="text-base leading-relaxed">
            <span className="float-left text-4xl sm:text-5xl font-serif font-bold text-primary mr-3 mt-1 leading-none">
              A
            </span>
            ng Diwang Panlipunan ay itinayo bilang isang malayang espasyo ng edukasyon at pampublikong diskurso upang tugunan ang lumalalang hamon ng maling impormasyon at mababaw na pagtalakay sa mga pambansang usapin. Sa pamamagitan ng masusing pananaliksik, datos mula sa mga komunidad, at pagsusuring sosyo-historikal, binibigyang-kapangyarihan ang bawat mag-aaral at mamamayan na magsuri nang malalim, magtanong nang may pananagutan, at magbuo ng makabuluhang paninindigan sa mga suliraning bumabalot sa ating lipunan.
          </p>
          <p className="text-sm text-text-muted leading-relaxed">
            Sa loob ng portal na ito, bawat paksa ay pinagtitibay ng mga beripikadong sanggunian, bukas na talaan ng estadistika, at mga gabay sa kritikal na pagbasa. Hinihikayat ang bawat mambabasa na hindi lamang maging tagatanggap ng impormasyon, kundi maging kabahagi sa paglikha ng makataong solusyon sa pamamagitan ng paggalang sa katotohanan, matalinong pakikipagkapwa, at aktibong pakikilahok sa pambansang kaunlaran.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-border text-xs font-medium text-text-muted">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary shrink-0" />
            <span>Nasuring Datos at Kasulatan</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
            <span>Malayang Paggamit ng Sanggunian</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-primary shrink-0" />
            <span>Sosyolohikal na Pagsusuri</span>
          </div>
        </div>
      </section>

      {/* Mga Paksa Directory List */}
      <section id="mga-paksa" className="p-6 sm:p-8 rounded-md border border-border bg-surface space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-border pb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              MGA LARANGANG TEMATIKO
            </span>
            <h2 className="font-serif text-2xl font-bold tracking-tight text-text">
              Mga Paksa
            </h2>
          </div>
          <span className="text-xs font-mono font-semibold text-text-muted">
            Kabuuang {topics.length} Paksang Aralin
          </span>
        </div>

        <div className="divide-y divide-border">
          {topics.map((topic, index) => {
            const sequenceNum = String(topic.order_index || index + 1).padStart(2, "0");
            const firstSubtopic = topic.subtopics?.[0];
            const href = firstSubtopic
              ? `/topics/${topic.slug}/${firstSubtopic.slug}`
              : `/topics/${topic.slug}`;

            return (
              <div
                key={topic.id}
                className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-start sm:items-center gap-4 min-w-0">
                  <span className="font-mono text-base font-bold text-primary shrink-0">
                    {sequenceNum}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-serif text-base sm:text-lg font-bold text-text group-hover:text-primary transition-colors">
                      {topic.name_fil}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-muted truncate max-w-2xl">
                      {topic.description_fil}
                    </p>
                  </div>
                </div>

                <Link
                  href={href}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-hover shrink-0 self-end sm:self-auto"
                >
                  <span>{firstSubtopic ? "Tingnan ang mga aralin" : "Tingnan ang paksa"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Reader Feedback Prompt */}
      <section className="p-5 sm:p-6 rounded-md border border-border bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-serif text-base font-bold text-text">
            Nakatulong ba ang pambungad na ito?
          </h3>
          <p className="text-xs text-text-muted">
            Ang iyong tugon ay nakatutulong sa patuloy na pagpapabuti ng ating mga panlipunang modyul.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            className="h-9 px-4 rounded-md bg-primary text-white text-xs font-semibold hover:bg-primary-hover transition-colors"
          >
            Oo
          </button>
          <button
            type="button"
            className="h-9 px-4 rounded-md border border-border bg-surface text-text text-xs font-semibold hover:border-accent transition-colors"
          >
            Hindi
          </button>
        </div>
      </section>
    </div>
  );
}
