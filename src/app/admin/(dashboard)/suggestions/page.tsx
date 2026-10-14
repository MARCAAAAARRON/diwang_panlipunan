import React from "react";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { SuggestionsBoard, type SuggestionItem } from "@/components/admin/suggestions-board";

export const metadata: Metadata = {
  title: "Triage ng mga Mungkahi | Diwang Panlipunan CMS",
  description: "Triage pipeline para sa mga pampublikong mungkahi ng aralin mula sa mamamayan.",
};

const SEED_SUGGESTIONS_FALLBACK: SuggestionItem[] = [
  {
    id: "sug-1",
    topic_title: "Epekto ng Rice Tariffication Law sa Kita ng mga Magsasaka",
    description: "Kailangang masusing pag-aralan kung paano naapektuhan ng pagbaha ng imported na bigas ang farmgate price ng palay sa Nueva Ecija at Isabela, at kung naging sapat ba ang tulong mula sa RCEF.",
    rationale: "Ulat ng Philippine Rice Research Institute (PhilRice) at datos ng PSA mula 2019 hanggang 2024 ukol sa presyo ng palay.",
    contact_email: "magsasaka.network@philippines.org",
    status: "in_review",
    created_at: "2026-10-12T11:20:00Z",
  },
  {
    id: "sug-2",
    topic_title: "Krisis sa Kalusugang Pangkaisipan at Kakulangan ng mga Psychiatrist sa mga Lalawigan",
    description: "Napakahalagang talakayin ang limitadong bilang ng mga espesyalista sa mental health sa labas ng Metro Manila at ang mataas na gastusin sa gamot sa kabila ng pagsasabatas ng Mental Health Act.",
    rationale: "Ulat ng Department of Health (DOH) at mga pagsusuri ng UP Department of Psychology.",
    contact_email: "mag-aaral.psych@univ.edu.ph",
    status: "pending",
    created_at: "2026-10-13T09:45:00Z",
  },
  {
    id: "sug-3",
    topic_title: "Kalagayan at Karapatan ng mga Gig Economy Workers (Delivery Riders)",
    description: "Pagsusuri sa legal na kalagayan ng mga delivery rider at freelance app workers — kung may sapat bang proteksyon sa ilalim ng Labor Code kaugnay ng aksidente at insurance.",
    rationale: "Senate Bill on Freelance Workers Protection at mga pagdinig sa DOLE.",
    contact_email: null,
    status: "pending",
    created_at: "2026-10-14T03:10:00Z",
  },
];

export default async function SuggestionsTriagePage() {
  let suggestionsList: SuggestionItem[] = [];

  try {
    const supabase = await createClient();
    const { data, error } = await (supabase.from("suggestions") as any)
      .select("id, topic_title, description, rationale, contact_email, status, created_at")
      .order("created_at", { ascending: false });

    if (data && data.length > 0) {
      suggestionsList = data.map((item: any) => ({
        id: item.id,
        topic_title: item.topic_title,
        description: item.description,
        rationale: item.rationale,
        contact_email: item.contact_email,
        status: item.status,
        created_at: item.created_at,
      }));
    }
  } catch (err) {
    console.warn("[suggestions-page] Supabase query warning:", err);
  }

  const displaySuggestions =
    suggestionsList.length > 0 ? suggestionsList : SEED_SUGGESTIONS_FALLBACK;

  return (
    <div className="space-y-8">
      {/* Page Title & Context */}
      <div className="space-y-1">
        <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-primary)] font-semibold">
          TRIAGE AT EDITORIAL PIPELINE
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--color-text)] tracking-tight">
          Mga Mungkahi ng Mamamayan
        </h1>
        <p className="text-sm text-[var(--color-text-muted)] font-sans">
          Suriin ang mga panukalang paksa mula sa pampublikong kahon ng mungkahi. Baguhin ang estado o i-convert direkta bilang bagong aralin.
        </p>
      </div>

      {/* Interactive Board */}
      <SuggestionsBoard initialSuggestions={displaySuggestions} />
    </div>
  );
}
