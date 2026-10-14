import React from "react";
import Link from "next/link";
import { Flag, Eye, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";

export default function AboutPage() {
  const learningAreas = [
    {
      title: "Environment and Climate Change",
      desc: "Examining ecological crises, climate vulnerability, and community stewardship.",
    },
    {
      title: "Economy and Livelihood",
      desc: "Understanding inflation, labor rights, agrarian realities, and economic resilience.",
    },
    {
      title: "Politics and Governance",
      desc: "Scrutinizing public institutions, democratic engagement, accountability, and the rule of law.",
    },
    {
      title: "Human Rights and Social Justice",
      desc: "Defending civil liberties, indigenous rights, restorative justice, and community empowerment.",
    },
    {
      title: "Education and Society",
      desc: "Bridging systemic gaps in civic literacy, public school resources, and equitable learning access.",
    },
    {
      title: "Globalization and Global Issues",
      desc: "Analyzing international relations, migrant labor, sovereignty, and regional cooperation.",
    },
    {
      title: "Sustainable Development",
      desc: "Balancing economic growth with intergenerational environmental protection and community welfare.",
    },
  ];

  const acrraValues = [
    {
      letter: "A",
      title: "Awareness",
      tagalog: "Kamalayan",
      desc: "Pagkilala sa katotohanan ng kalagayan nang may bukas na isipan.",
    },
    {
      letter: "C",
      title: "Critical Thinking",
      tagalog: "Pagsusuri",
      desc: "Paghihimay sa ebidensya at konteksto bago magbuo ng pasiya.",
    },
    {
      letter: "R",
      title: "Respect",
      tagalog: "Paggalang",
      desc: "Pagkilala sa pantay na dignidad ng bawat sektor sa lipunan.",
    },
    {
      letter: "R",
      title: "Responsibility",
      tagalog: "Pananagutan",
      desc: "Pananagutan sa bawat pasiya at tungkulin sa kapwa Pilipino.",
    },
    {
      letter: "A",
      title: "Action",
      tagalog: "Pakikisangkot",
      desc: "Pagsasabuhay ng natutuhan sa pamamagitan ng makabuluhang ambag.",
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Kagawaran", href: "/home" },
          { label: "Oryentasyon at Simulain" },
        ]}
      />

      {/* Header */}
      <header className="space-y-4 border-b border-border pb-6">
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text">
          About Diwang Panlipunan
        </h1>
        <p className="font-serif text-base sm:text-lg italic text-text-muted">
          Pag-unawa sa Lipunan, Pagmulat sa Kinabukasan
        </p>

        {/* Metadata Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
          <span className="px-2.5 py-1 rounded-sm bg-surface border border-border text-text font-medium">
            Pambungad na Dokumento
          </span>
          <span className="px-2.5 py-1 rounded-sm bg-surface border border-border text-text font-medium">
            Bilingual Civic Edition
          </span>
          <span className="px-2.5 py-1 rounded-sm bg-highlight text-text font-semibold uppercase tracking-wider">
            PUBLIC ACCESS
          </span>
        </div>
      </header>

      {/* Section 1: Our Purpose */}
      <section className="space-y-5">
        <h2 className="font-serif text-2xl font-bold text-text">
          Our Purpose
        </h2>
        <div className="prose prose-base max-w-none text-text leading-relaxed space-y-4">
          <p>
            Our purpose is to make learning about contemporary issues more accessible, meaningful, and engaging. We aim to help learners connect classroom discussions with real-life situations, understand different perspectives, and develop critical-thinking skills.
          </p>

          {/* Editorial Callout */}
          <div className="p-4 sm:p-5 rounded-md border border-border bg-surface border-l-4 border-l-primary-large space-y-2">
            <p className="italic text-sm sm:text-base text-text leading-relaxed">
              &ldquo;Ang kamalayang panlipunan ay hindi lamang pagmamasid sa kaganapan, kundi ang aktibong pagtatanong sa mga ugat ng suliranin.&rdquo;
            </p>
            <p className="text-xs font-semibold tracking-wider uppercase text-text-muted">
              — TALA NG PATNUGUTAN
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: What You Can Learn */}
      <section className="space-y-5">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <h2 className="font-serif text-2xl font-bold text-text">
            What You Can Learn
          </h2>
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-text-muted">
            7 MGA PANGUNAHING PAKSA
          </span>
        </div>

        <p className="text-sm text-text-muted">
          Curated across interrelated sociological, economic, and political fields of inquiry:
        </p>

        <ul className="space-y-3 text-sm">
          {learningAreas.map((area) => (
            <li key={area.title} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <div className="leading-relaxed">
                <span className="font-bold text-text">{area.title}</span>
                <span className="mx-2 text-text-muted">—</span>
                <span className="text-text-muted">{area.desc}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Section 3: Our Mission and Our Vision (2 Columns) */}
      <section className="space-y-5">
        <h2 className="font-serif text-2xl font-bold text-text">
          Our Mission and Our Vision
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mission */}
          <div className="p-6 rounded-md border border-border bg-surface space-y-3">
            <div className="flex items-center gap-2 text-primary">
              <Flag className="w-5 h-5" />
              <h3 className="font-serif text-lg font-bold text-text">Our Mission</h3>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              To cultivate a critically engaged citizenry by providing accessible, verified, and multi-perspective educational resources that empower learners to reflect on and act upon pressing Philippine and global realities.
            </p>
          </div>

          {/* Vision */}
          <div className="p-6 rounded-md border border-border bg-surface space-y-3">
            <div className="flex items-center gap-2 text-primary">
              <Eye className="w-5 h-5" />
              <h3 className="font-serif text-lg font-bold text-text">Our Vision</h3>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              A compassionate, enlightened, and democratic society where every learner possesses the analytical tools and civic agency to foster meaningful systemic change and social justice.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Our Values (A-C-R-R-A) */}
      <section className="space-y-5">
        <div className="space-y-1">
          <h2 className="font-serif text-2xl font-bold text-text">
            Our Values
          </h2>
          <p className="text-sm text-text-muted">
            Core pedagogical principles guiding research, synthesis, and civic discourse.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {acrraValues.map((val, idx) => (
            <div
              key={idx}
              className="p-4 rounded-md border border-border bg-surface space-y-2 text-center flex flex-col justify-between"
            >
              <div className="space-y-1">
                <span className="font-serif text-3xl font-bold text-primary block leading-none">
                  {val.letter}
                </span>
                <span className="font-semibold text-xs text-text block">
                  {val.title}
                </span>
                <span className="text-[11px] text-text-muted italic block">
                  {val.tagalog}
                </span>
              </div>
              <p className="text-[11px] text-text-muted leading-snug pt-2 border-t border-border">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pull Quote Box */}
      <section className="p-6 sm:p-8 rounded-md border border-border bg-highlight/30 text-center">
        <blockquote className="font-serif text-lg sm:text-xl md:text-2xl italic text-text max-w-2xl mx-auto leading-relaxed">
          &ldquo;Understanding the issues around us is an important step toward becoming responsible citizens.&rdquo;
        </blockquote>
      </section>

      {/* In-Page Feedback Box */}
      <section className="p-5 sm:p-6 rounded-md border border-border bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-serif text-base font-bold text-text">
            Nakatulong ba ito?
          </h3>
          <p className="text-xs text-text-muted">
            Ibahagi ang iyong tugon upang mapabuti ang mga sanggunian ng publikasyon.
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

      {/* Footnote / DepEd Reference */}
      <footer className="pt-4 border-t border-border space-y-2 text-xs text-text-muted">
        <div className="flex items-center justify-between">
          <span className="font-mono uppercase font-semibold text-text">TALAAN AT BATAYAN</span>
          <Link href="/home" className="inline-flex items-center gap-1 text-primary hover:underline font-medium">
            <span>Tingnan ang Lahat ng Sanggunian</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <p className="leading-relaxed">
          Ang balangkas ng Diwang Panlipunan ay nakabatay sa Kurikulum ng Araling Panlipunan ng Kagawaran ng Edukasyon (DepEd) at mga pamantayang pananaliksik sa Araling Pilipino at agham panlipunan.
        </p>
      </footer>
    </div>
  );
}
