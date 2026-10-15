import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Lock, ShieldCheck, CheckCircle2, Users, FileText } from "lucide-react";

export default function LandingPage() {
  const topics = [
    {
      num: "01",
      titleFil: "Kapaligiran at Pagbabago ng Klima",
      titleEn: "Environment and Climate Change",
      desc: "Pagsusuri sa krisis sa kalikasan, katatagan sa kalamidad, at makatarungang pangangalaga sa likas-yaman ng Pilipinas.",
      slug: "kapaligiran",
    },
    {
      num: "02",
      titleFil: "Ekonomiya at Kabuhayan",
      titleEn: "Economy and Livelihood",
      desc: "Pag-unawa sa implasyon, karapatan ng manggagawa, repormang agraryo, at estruktural na pag-unlad ng kabuhayan.",
      slug: "ekonomiya",
    },
    {
      num: "03",
      titleFil: "Pamamahala at Demokrasya",
      titleEn: "Politics and Governance",
      desc: "Mapanuring pagsisiyasat sa mga pampublikong institusyon, pananagutan ng opisyal, at demokratikong pakikilahok.",
      slug: "pamahalaan",
    },
    {
      num: "04",
      titleFil: "Karapatang Pantao at Katarungang Panlipunan",
      titleEn: "Human Rights and Social Justice",
      desc: "Pagtataguyod ng kalayaang sibil, karapatan ng mga katutubo, hustisyang panlipunan, at pagpapalakas sa marhinalisadong sektor.",
      slug: "karapatang-pantao",
    },
    {
      num: "05",
      titleFil: "Edukasyon at Lipunan",
      titleEn: "Education and Society",
      desc: "Pagtugon sa kakulangan sa literasing sibiko, pampublikong pasilidad, at pantay na karapatan sa de-kalidad na karunungan.",
      slug: "edukasyon",
    },
    {
      num: "06",
      titleFil: "Globalisasyon at Pandaigdigang Ugnayan",
      titleEn: "Globalization and Global Issues",
      desc: "Pagsusuri sa ugnayang panlabas, manggagawang migrante (OFW), soberanya, at panrehiyong kooperasyon sa Timog-Silangang Asya.",
      slug: "teknolohiya",
    },
    {
      num: "07",
      titleFil: "Likas-Kayang Kaunlaran",
      titleEn: "Sustainable Development",
      desc: "Pagtitiyak ng balanseng pag-unlad ng ekonomiya na may pag-iingat sa kapakanan ng mga susunod na salinlahi.",
      slug: "kalusugan",
    },
  ];

  const values = [
    {
      step: "01 • PANANAW",
      title: "Kamalayan",
      english: "Awareness",
      body: "Pagkilala sa katotohanan ng kalagayang panlipunan nang walang kinikilingan o maling impormasyon.",
    },
    {
      step: "02 • METODO",
      title: "Mapanuring Pag-iisip",
      english: "Critical Thinking",
      body: "Paghimay sa datos, kasaysayan, at konteksto bago humantong sa kongklusyon o paghuhusga.",
    },
    {
      step: "03 • PAKIKIPWA",
      title: "Paggalang",
      english: "Respect",
      body: "Matinong diskurso at pagpapahalaga sa dignidad ng bawat sektor at tinig sa ating lipunan.",
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
      body: "Pagsasalin ng natutuhan tungo sa kapakipakinabang na serbisyo sa bayan at komunidad.",
    },
  ];

  return (
    <div className="w-full flex flex-col">
      {/* 1. Hero Section: Purely Institutional & Educational Overview */}
      <section className="border-b border-border bg-page py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Hero Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-highlight text-text text-xs font-semibold tracking-wider uppercase font-mono">
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
                Isang ligtas at mapanuring espasyong pang-edukasyon na naglalayong itaas ang kamalayan, kritikal na pag-unawa, at may-kabatirang pakikilahok ng bawat mamamayang Pilipino sa mga isyung pambansa at pandaigdig.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-md bg-[#0D7B48] text-white text-sm font-semibold hover:bg-[#0A633A] focus:outline-none focus:ring-2 focus:ring-[#0D7B48] focus:ring-offset-2 transition-colors shadow-none"
                >
                  <span>Mag-register upang Magsimula</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/login"
                  className="inline-flex items-center justify-center h-11 px-6 rounded-md border border-border bg-surface text-text text-sm font-medium hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors shadow-none"
                >
                  Mag-login
                </Link>

                <Link
                  href="/tungkol-sa-amin"
                  className="inline-flex items-center justify-center h-11 px-5 rounded-md border border-border bg-surface text-text-muted text-sm font-medium hover:text-text transition-colors"
                >
                  Tungkol sa Proyekto
                </Link>
              </div>

              {/* Civic Integrity Callout */}
              <div className="mt-8 p-4 sm:p-5 rounded-md border border-border bg-surface border-l-[3px] border-l-[#0D7B48]">
                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-[#0D7B48] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-text">
                      May Pananagutang Akademiko at Sibiko
                    </h3>
                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                      Lahat ng artikulo at pagsusuri ay dumaan sa pamamatnugot at may kaakibat na bukas at mapagkakatiwalaang sanggunian. Mag-login upang ma-access ang buong talaan ng mga aralin at makapagbigay ng tugon.
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
                    src="/images/small-group-planning.jpg"
                    alt="Mga mag-aaral at kabataang mananaliksik sa isang sama-samang pagpaplano at bukas na talakayan ukol sa lipunang Pilipino"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <div className="px-1.5 space-y-2">
                  <p className="text-xs sm:text-sm italic text-text-muted leading-snug">
                    &ldquo;Mga mag-aaral at kabataang mananaliksik sa isang sama-samang pagpaplano at bukas na talakayan ukol sa lipunang Pilipino.&rdquo;
                  </p>
                  <div className="flex items-center justify-between text-xs font-semibold tracking-[0.06em] text-text-muted uppercase border-t border-border pt-2 font-mono">
                    <span>DOKUMENTASYON</span>
                    <span>Lungsod Quezon, 2026</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Mga Paksa Section (Gated with Preview) */}
      <section className="py-12 md:py-16 border-b border-border bg-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-border pb-4">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-text">
                Mga Paksa ng Diwang Panlipunan
              </h2>
              <p className="text-sm text-text-muted mt-1">
                Pitong pangunahing laranang panlipunan para sa mapanuring pagtalakay, pananaliksik, at pagmumulat.
              </p>
            </div>
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-text-muted">
              7 LARANANG PAGSUSURI
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {topics.map((topic) => (
              <div
                key={topic.num}
                className="group flex flex-col justify-between p-5 rounded-md border border-border bg-surface hover:border-[#0D7B48] transition-colors"
              >
                <div className="flex items-start gap-4">
                  <span className="font-mono text-base font-bold text-[#0D7B48] shrink-0">
                    {topic.num}
                  </span>
                  <div className="space-y-1.5 min-w-0">
                    <h3 className="font-serif text-base sm:text-lg font-bold text-text leading-snug">
                      {topic.titleFil}
                    </h3>
                    <p className="text-xs font-sans text-text-muted font-medium tracking-wide">
                      {topic.titleEn}
                    </p>
                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed pt-1">
                      {topic.desc}
                    </p>
                  </div>
                </div>

                {/* Gated Access Footer */}
                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1.5 text-text-muted">
                    <Lock className="w-3.5 h-3.5 text-text-muted" />
                    <span>Kailangan ng Login</span>
                  </span>
                  <Link
                    href={`/login?next=/home#${topic.slug}`}
                    className="font-semibold text-[#0D7B48] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Mag-login upang basahin</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Mga Pangunahing Simulain Section */}
      <section className="py-12 md:py-16 border-b border-border bg-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-1 border-b border-border pb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted font-mono">
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
                  <span className="text-xs font-mono font-semibold uppercase tracking-[0.06em] text-[#0D7B48] block">
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

      {/* 4. Role-Based Membership & Civic Callout Banner */}
      <section className="py-12 md:py-16 bg-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-md border border-border bg-surface p-6 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-[#0D7B48]">
                <ShieldCheck className="w-4 h-4" />
                <span>MAPANURING PAMAYANANG SIBIKO</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text tracking-tight">
                Maging bahagi ng Diwang Panlipunan
              </h2>
              <p className="text-sm text-text-muted leading-relaxed">
                Mag-register bilang Mambabasa (Viewer) upang malayang mabasa ang lahat ng talataan, makapag-iwan ng tugon (Oo/Hindi) sa mga aralin, at magmungkahi ng mga paksang nararapat talakayin ng sambayanan.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/register"
                className="inline-flex items-center justify-center h-11 px-6 rounded-md bg-[#0D7B48] text-white text-sm font-semibold hover:bg-[#0A633A] focus:outline-none focus:ring-2 focus:ring-[#0D7B48] focus:ring-offset-2 transition-colors shadow-none"
              >
                Mag-register Ngayon
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center h-11 px-6 rounded-md border border-border bg-surface text-text text-sm font-medium hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors shadow-none"
              >
                Mag-login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
