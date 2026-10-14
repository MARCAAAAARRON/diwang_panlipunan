import React from "react";
import { createClient } from "@/lib/supabase/server";
import { TopicIcon } from "@/components/ui/topic-icon";
import type { Topic } from "@/types/content";

// Canonical fallback data when database credentials are not yet configured
const CANONICAL_TOPICS: Topic[] = [
  {
    id: "00000000-0000-0000-0000-000000000001",
    slug: "edukasyon",
    name_fil: "Edukasyon",
    name_en: "Education",
    description_fil: "Kalinangan sa kalidad ng edukasyon, krisis sa literasiya, at pagbabagong-anyo ng kurikulum sa Pilipinas.",
    description_en: "Quality of education, literacy challenges, and curriculum transformation in the Philippines.",
    icon_name: "GraduationCap",
    color_token: "--topic-edukasyon",
    order_index: 1,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "00000000-0000-0000-0000-000000000002",
    slug: "kalusugan",
    name_fil: "Kalusugan",
    name_en: "Healthcare",
    description_fil: "Pangkalahatang kalusugan, sistemang medikal, at mga hamon sa pampublikong kalusugan at kapakanan.",
    description_en: "Public healthcare systems, universal health coverage, and community wellness in the country.",
    icon_name: "HeartPulse",
    color_token: "--topic-kalusugan",
    order_index: 2,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "00000000-0000-0000-0000-000000000003",
    slug: "ekonomiya",
    name_fil: "Ekonomiya",
    name_en: "Economy",
    description_fil: "Kabuhayan, implasyon, agrikultura, trabaho, at mga polisiya para sa pantay na kaunlarang pang-ekonomiya.",
    description_en: "Livelihood, inflation, agricultural stability, labor markets, and inclusive economic growth.",
    icon_name: "TrendingUp",
    color_token: "--topic-ekonomiya",
    order_index: 3,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "00000000-0000-0000-0000-000000000004",
    slug: "karapatang-pantao",
    name_fil: "Karapatang Pantao",
    name_en: "Human Rights",
    description_fil: "Katarungang panlipunan, kalayaang sibil, at pangangalaga sa mga marhinalisadong sektor ng lipunan.",
    description_en: "Social justice, civil liberties, rule of law, and protection of marginalized sectors.",
    icon_name: "Scale",
    color_token: "--topic-karapatan",
    order_index: 4,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "00000000-0000-0000-0000-000000000005",
    slug: "kapaligiran",
    name_fil: "Kapaligiran",
    name_en: "Environment",
    description_fil: "Krisis sa klima, likas na yaman, pagbawas ng pinsala sa sakuna, at likas-kayang pag-unlad.",
    description_en: "Climate vulnerability, biodiversity conservation, disaster resilience, and sustainable development.",
    icon_name: "Leaf",
    color_token: "--topic-kapaligiran",
    order_index: 5,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "00000000-0000-0000-0000-000000000006",
    slug: "teknolohiya",
    name_fil: "Teknolohiya",
    name_en: "Technology",
    description_fil: "Karapatang digital, disimpormasyon, pamamahala sa artificial intelligence, at modernong inobasyon.",
    description_en: "Digital rights, algorithmic governance, combating disinformation, and technological access.",
    icon_name: "Cpu",
    color_token: "--topic-teknolohiya",
    order_index: 6,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "00000000-0000-0000-0000-000000000007",
    slug: "pamahalaan",
    name_fil: "Pamahalaan",
    name_en: "Governance",
    description_fil: "Pananagutan ng mga pinuno, reporma sa institusyon, desentralisasyon, at pakikilahok ng mamamayan.",
    description_en: "Public accountability, institutional reforms, local governance, and participatory democracy.",
    icon_name: "Landmark",
    color_token: "--topic-pamahalaan",
    order_index: 7,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

async function getTopics(): Promise<{ topics: Topic[]; isLive: boolean }> {
  const isEnvConfigured =
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder-project.supabase.co" &&
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== "placeholder-anon-key";

  if (!isEnvConfigured) {
    return { topics: CANONICAL_TOPICS, isLive: false };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("topics")
      .select("*")
      .eq("is_published", true)
      .order("order_index", { ascending: true });

    if (error || !data || data.length === 0) {
      return { topics: CANONICAL_TOPICS, isLive: false };
    }

    return { topics: data as Topic[], isLive: true };
  } catch {
    return { topics: CANONICAL_TOPICS, isLive: false };
  }
}

export default async function HomePage() {
  const { topics, isLive } = await getTopics();

  return (
    <div className="min-h-screen bg-page text-text selection:bg-highlight selection:text-text">
      {/* Editorial Header / Masthead */}
      <header className="border-b border-border bg-surface">
        <div className="max-w-7xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest font-semibold text-primary mb-1">
                Platapormang Pang-Edukasyon sa Kamalayang Panlipunan
              </p>
              <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-text">
                Diwang Panlipunan
              </h1>
              <p className="mt-2 text-base text-text-muted font-sans italic">
                Pag-unawa sa Lipunan, Pagmulat sa Kinabukasan
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-sans text-text-muted border border-border px-3 py-1.5 self-start md:self-end bg-page">
              <span className={`w-2 h-2 rounded-full ${isLive ? "bg-primary" : "bg-accent"}`} />
              <span>{isLive ? "Konektado sa Supabase Database" : "Walking Skeleton (Pundasyon ng Proyekto)"}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-serif font-semibold text-text">
            Mga Pangunahing Paksa
          </h2>
          <p className="mt-1 text-sm text-text-muted">
            Tuklasin ang 7 pangunahing tema ng lipunang Pilipino at ang mga malalimang artikulo ukol dito.
          </p>
        </div>

        {/* 7 Canonical Thematic Topic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <article
              key={topic.id}
              className="bg-surface border border-border p-6 flex flex-col justify-between transition-colors hover:border-primary"
              style={{
                borderTop: `4px solid var(${topic.color_token})`,
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="p-2 border border-border"
                    style={{ color: `var(${topic.color_token})` }}
                  >
                    <TopicIcon name={topic.icon_name} className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-text-muted uppercase tracking-wider">
                    Paksa {topic.order_index}
                  </span>
                </div>

                <h3 className="text-xl font-serif font-semibold text-text mb-1">
                  {topic.name_fil}
                </h3>
                <p className="text-xs uppercase font-sans tracking-wide text-text-muted mb-3 font-medium">
                  {topic.name_en}
                </p>

                <p className="text-sm text-text-muted leading-relaxed">
                  {topic.description_fil}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs">
                <span className="text-primary font-medium">
                  Tingnan ang mga Sanaysay &rarr;
                </span>
                <span className="text-text-muted font-mono">
                  #{topic.slug}
                </span>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Minimal Editorial Footer */}
      <footer className="mt-16 border-t border-border bg-surface py-8">
        <div className="max-w-7xl px-4 mx-auto text-center text-xs text-text-muted">
          <p className="font-serif text-sm text-text mb-1">Diwang Panlipunan</p>
          <p>Isang bukas at malayang sanggunian sa mga isyung panlipunan sa Pilipinas.</p>
        </div>
      </footer>
    </div>
  );
}
