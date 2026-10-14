import React from "react";
import { TopicIcon } from "@/components/ui/topic-icon";

export default function HomePage() {
  return (
    <main className="max-w-4xl px-6 py-12 mx-auto">
      <header className="pb-6 mb-8 border-b border-border">
        <h1 className="text-3xl font-bold font-serif text-text tracking-tight sm:text-4xl">
          Diwang Panlipunan
        </h1>
        <p className="mt-2 text-base text-text-muted font-sans">
          Pag-unawa sa Lipunan, Pagmulat sa Kinabukasan
        </p>
      </header>
      <section className="p-6 bg-surface border border-border">
        <div className="flex items-center gap-3 mb-2">
          <TopicIcon name="GraduationCap" className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-serif font-semibold text-text">
            Pundasyon ng Proyekto
          </h2>
        </div>
        <p className="text-sm text-text-muted">
          Nai-configure na ang Next.js App Router, Tailwind CSS design tokens, at Supabase client architecture.
        </p>
      </section>
    </main>
  );
}
