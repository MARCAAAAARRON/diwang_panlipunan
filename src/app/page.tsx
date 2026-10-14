import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen } from "lucide-react";

export default function LandingPage() {
  const topics = [
    {
      num: "01",
      title: "Environment and Climate Change",
      desc: "Examining the local and global ecological crisis, climate resilience, and equitable resource stewardship.",
      slug: "kapaligiran",
    },
    {
      num: "02",
      title: "Economy and Livelihood",
      desc: "Understanding inflation, labor rights, agrarian realities, and structural economic development in the Philippines.",
      slug: "ekonomiya",
    },
    {
      num: "03",
      title: "Politics and Governance",
      desc: "Scrutinizing public institutions, democratic engagement, accountability, and the rule of law.",
      slug: "pamahalaan",
    },
    {
      num: "04",
      title: "Human Rights and Social Justice",
      desc: "Defending civil liberties, indigenous rights, restorative justice, and community empowerment.",
      slug: "karapatang-pantao",
    },
    {
      num: "05",
      title: "Education and Society",
      desc: "Bridging systemic gaps in civic literacy, public school resources, and equitable learning access.",
      slug: "edukasyon",
    },
    {
      num: "06",
      title: "Globalization and Global Issues",
      desc: "Analyzing international relations, migrant labor, sovereignty, and regional cooperation in Southeast Asia.",
      slug: "teknolohiya",
    },
    {
      num: "07",
      title: "Sustainable Development",
      desc: "Balancing economic expansion with intergenerational environmental protection and community welfare.",
      slug: "kalusugan",
    },
  ];

  const values = [
    {
      step: "01 • PANANAW",
      title: "Kamalayan",
      english: "Awareness",
      body: "Pagkilala sa katotohanan ng kalagayang panlipunan nang walang kinikilingan.",
    },
    {
      step: "02 • METODO",
      title: "Mapanuring Pag-iisip",
      english: "Critical Thinking",
      body: "Paghimay sa datos, kasaysayan, at konteksto bago humantong sa kongklusyon.",
    },
    {
      step: "03 • PAKIKIPWA",
      title: "Paggalang",
      english: "Respect",
      body: "Matinong diskurso at pagpapahalaga sa dignidad ng bawat sektor ng lipunan.",
    },
    {
      step: "04 • TUNGKULIN",
      title: "Pananagutan",
      english: "Responsibility",
      body: "Tapat na pananagutan sa sariling pasiya, kapwa mamamayan, at mga susunod na salinlahi.",
    },
    {
      step: "05 • BUNGA",
      title: "Aksyon at Pakikisangkot",
      english: "Action",
      body: "Pagsasalin ng natutuhan tungo sa kapakipakinabang na serbisyo sa bayan.",
    },
  ];

  return (
    <div className="w-full flex flex-col">
      {/* 1. Hero Section */}
      <section className="border-b border-border bg-page py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Hero Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-highlight text-text text-xs font-semibold tracking-wider uppercase">
                <span>BUKAS NA PUBLIKASYONG SIBIKO</span>
                <span>•</span>
                <span>Tomo I • Edisyong Pampubliko</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text leading-[1.15]">
                Pag-unawa sa Lipunan,
                <br />
                Pagmulat sa Kinabukasan
              </h1>

              <p className="text-base sm:text-lg text-text-muted max-w-2xl leading-relaxed">
                A learning space that helps you understand, explore, and critically analyze issues that affect Philippine society and the world.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/home"
                  className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-md bg-primary text-white text-sm font-medium hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors shadow-none"
                >
                  <span>Simulan ang pagbasa</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/tungkol-sa-amin"
                  className="inline-flex items-center justify-center h-11 px-6 rounded-md border border-border bg-surface text-text text-sm font-medium hover:border-accent hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors shadow-none"
                >
                  Tungkol sa Proyekto
                </Link>
              </div>

              {/* Civic Archive Callout Card */}
              <div className="mt-8 p-4 sm:p-5 rounded-md border border-border bg-surface border-l-4 border-l-primary-large">
                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-text">
                      Malayang Arkibo para sa Mamamayan
                    </h3>
                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                      Bawat artikulo at pagsusuri ay dumaan sa masusing pagsusuri at may kaakibat na mapagkakatiwalaang sanggunian, bukas para sa mga guro, mag-aaral, at mananaliksik.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero Column: Documentary Photography Card */}
            <div className="lg:col-span-5">
              <div className="rounded-md border border-border bg-surface p-2 sm:p-3 space-y-3">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-border">
                  <Image
                    src="/images/hero-documentation.svg"
                    alt="Mga mag-aaral at mananaliksik sa isang bukas na talakayan ukol sa lipunang Pilipino"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
                <div className="px-1.5 space-y-2">
                  <p className="text-xs sm:text-sm italic text-text-muted leading-snug">
                    &ldquo;Mga mag-aaral at mananaliksik sa isang bukas na talakayan ukol sa kasaysayan at lipunang Pilipino.&rdquo;
                  </p>
                  <div className="flex items-center justify-between text-[11px] font-semibold tracking-wider text-text-muted uppercase border-t border-border pt-2">
                    <span>DOKUMENTASYON</span>
                    <span>Lungsod Quezon, 2025</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Mga Paksa Section */}
      <section className="py-12 md:py-16 border-b border-border bg-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-border pb-4">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-text">
                Mga Paksa
              </h2>
              <p className="text-sm text-text-muted mt-1">
                Pitong pangunahing laranang panlipunan para sa mapanuring pagtalakay at pananaliksik.
              </p>
            </div>
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-text-muted">
              7 LARANANG PAGSUSURI
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {topics.map((topic) => (
              <Link
                key={topic.num}
                href={`/home#${topic.slug}`}
                className="group flex items-start gap-4 p-4 rounded-md border border-border bg-surface hover:border-accent transition-colors"
              >
                <span className="font-mono text-base font-bold text-primary shrink-0">
                  {topic.num}
                </span>
                <div className="space-y-1 min-w-0">
                  <h3 className="font-serif text-base sm:text-lg font-bold text-text group-hover:text-primary group-hover:underline transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed line-clamp-2">
                    {topic.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Mga Pangunahing Simulain Section */}
      <section className="py-12 md:py-16 border-b border-border bg-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-1 border-b border-border pb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              MGA SANDIGAN NG PAGSUSURI
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-text">
              Mga Pangunahing Simulain
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {values.map((val) => (
              <div
                key={val.step}
                className="p-4 rounded-md border border-border bg-surface space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-primary block">
                    {val.step}
                  </span>
                  <h3 className="font-serif text-base font-bold text-text">
                    {val.title}
                  </h3>
                  <span className="text-xs text-text-muted italic block">
                    {val.english}
                  </span>
                </div>
                <p className="text-xs text-text-muted leading-relaxed pt-2 border-t border-border">
                  {val.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Bukas na Paanyaya Banner */}
      <section className="py-12 md:py-16 bg-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-md border border-border bg-surface p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                BUKAS NA PAANYAYA
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-text">
                Handa ka na bang sumali sa talakayan?
              </h2>
              <p className="text-sm text-text-muted leading-relaxed">
                Lumikha ng sariling account upang makapag-ambag ng pagsusuri, mag-save ng mga dokumento sa sariling aklatan, at makibahagi sa pampublikong diskurso.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/login"
                className="inline-flex items-center justify-center h-10 px-5 rounded-md border border-border bg-surface text-text text-sm font-medium hover:border-accent hover:text-primary transition-colors"
              >
                Mag-login
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center h-10 px-5 rounded-md bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-colors"
              >
                Mag-register
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
