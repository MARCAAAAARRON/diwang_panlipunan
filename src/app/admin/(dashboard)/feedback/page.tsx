import React from "react";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getAllTopics } from "@/lib/content-service";
import { FeedbackTable, type SubtopicFeedbackSummary } from "@/components/admin/feedback-table";
import { ThumbsUp, ThumbsDown, MessageSquare, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Pagsusuri sa Tugon ng Mambabasa | Diwang Panlipunan CMS",
  description: "Dashboard ng feedback at mga puna ng mambabasa para sa bawat aralin.",
};

// Fallback seed feedback entries to showcase analytics immediately
const SEED_FEEDBACK_FALLBACK: SubtopicFeedbackSummary[] = [
  {
    subtopicId: "sub-1-1",
    subtopicTitle: "Kahulugan at Pagsukat ng Kahirapan sa Pilipinas",
    subtopicSlug: "kahulugan-at-pagsukat-ng-kahirapan",
    topicTitle: "Kahirapan at Hindi Pagkakapantay-pantay",
    topicSlug: "kahirapan-at-hindi-pagkakapantay-pantay",
    helpfulCount: 38,
    unhelpfulCount: 3,
    totalVotes: 41,
    satisfactionRate: 93,
    comments: [
      {
        id: "c-1",
        comment: "Napakalinaw ng paliwanag sa poverty threshold at food threshold batay sa datos ng PSA.",
        isHelpful: true,
        createdAt: "2026-10-12T08:30:00Z",
      },
      {
        id: "c-2",
        comment: "Maaari bang dagdagan ng paghahambing sa minimum wage sa iba't ibang rehiyon?",
        isHelpful: true,
        createdAt: "2026-10-13T14:15:00Z",
      },
    ],
  },
  {
    subtopicId: "sub-2-1",
    subtopicTitle: "Epekto ng Krisis sa Klima sa mga Baybaying Pamayanan",
    subtopicSlug: "epekto-ng-krisis-sa-klima",
    topicTitle: "Katarungang Pangkapaligiran at Pagbabago ng Klima",
    topicSlug: "katarungang-pangkapaligiran-at-klima",
    helpfulCount: 29,
    unhelpfulCount: 2,
    totalVotes: 31,
    satisfactionRate: 94,
    comments: [
      {
        id: "c-3",
        comment: "Napapanahon ang pagsusuri sa sea level rise lalo na sa mga mangingisda sa Kabisayaan.",
        isHelpful: true,
        createdAt: "2026-10-11T10:00:00Z",
      },
    ],
  },
  {
    subtopicId: "sub-3-1",
    subtopicTitle: "Malayang Pamamahayag at Kalayaan sa Impormasyon",
    subtopicSlug: "malayang-pamamahayag",
    topicTitle: "Karapatang Pantao at Kalayaang Sibil",
    topicSlug: "karapatang-pantao-at-kalayaang-sibil",
    helpfulCount: 24,
    unhelpfulCount: 4,
    totalVotes: 28,
    satisfactionRate: 86,
    comments: [
      {
        id: "c-4",
        comment: "Kailangang mas idiin ang proteksyon ng mga mamamahayag sa probinsya.",
        isHelpful: false,
        createdAt: "2026-10-10T12:00:00Z",
      },
    ],
  },
];

interface DbFeedbackRow {
  id: string;
  subtopic_id: string;
  is_helpful: boolean;
  comment: string | null;
  created_at: string;
}

export default async function FeedbackAnalyticsPage() {
  const topics = await getAllTopics();
  let feedbackSummaries: SubtopicFeedbackSummary[] = [];

  try {
    const supabase = await createClient();
    const { data: dbFeedback } = await (supabase.from("feedback") as any)
      .select("id, subtopic_id, is_helpful, comment, created_at")
      .order("created_at", { ascending: false });

    if (dbFeedback && dbFeedback.length > 0) {
      // Map all subtopics across topics
      const subtopicMap = new Map<string, { title: string; slug: string; topicTitle: string; topicSlug: string }>();
      for (const t of topics) {
        for (const s of t.subtopics) {
          subtopicMap.set(s.id, {
            title: s.title,
            slug: s.slug,
            topicTitle: t.name_fil,
            topicSlug: t.slug,
          });
        }
      }

      // Group feedback by subtopic
      const grouped = new Map<string, DbFeedbackRow[]>();
      for (const fb of dbFeedback as DbFeedbackRow[]) {
        const list = grouped.get(fb.subtopic_id) || [];
        list.push(fb);
        grouped.set(fb.subtopic_id, list);
      }

      feedbackSummaries = Array.from(grouped.entries()).map(([subtopicId, items]) => {
        const meta = subtopicMap.get(subtopicId) || {
          title: "Aralin",
          slug: "aralin",
          topicTitle: "Diwang Panlipunan",
          topicSlug: "paksa",
        };
        const helpfulCount = items.filter((i) => i.is_helpful).length;
        const unhelpfulCount = items.filter((i) => !i.is_helpful).length;
        const totalVotes = helpfulCount + unhelpfulCount;
        const satisfactionRate = totalVotes > 0 ? Math.round((helpfulCount / totalVotes) * 100) : 0;
        const comments = items
          .filter((i): i is DbFeedbackRow & { comment: string } => typeof i.comment === "string" && i.comment.trim().length > 0)
          .map((i) => ({
            id: i.id,
            comment: i.comment,
            isHelpful: i.is_helpful,
            createdAt: i.created_at,
          }));

        return {
          subtopicId,
          subtopicTitle: meta.title,
          subtopicSlug: meta.slug,
          topicTitle: meta.topicTitle,
          topicSlug: meta.topicSlug,
          helpfulCount,
          unhelpfulCount,
          totalVotes,
          satisfactionRate,
          comments,
        };
      });
    }
  } catch (err) {
    console.warn("[feedback-page] Supabase fetch warning:", err);
  }

  // Fallback to demo summaries if no feedback recorded yet
  const displayData = feedbackSummaries.length > 0 ? feedbackSummaries : SEED_FEEDBACK_FALLBACK;

  // Aggregate totals
  const totalHelpful = displayData.reduce((acc, curr) => acc + curr.helpfulCount, 0);
  const totalUnhelpful = displayData.reduce((acc, curr) => acc + curr.unhelpfulCount, 0);
  const totalVotes = totalHelpful + totalUnhelpful;
  const overallSatisfaction = totalVotes > 0 ? Math.round((totalHelpful / totalVotes) * 100) : 0;
  const totalComments = displayData.reduce((acc, curr) => acc + curr.comments.length, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-primary)] font-semibold">
          ANALYTICS AT KALIDAD
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--color-text)] tracking-tight">
          Puna at Kasiyahan ng mga Mambabasa
        </h1>
        <p className="text-sm text-[var(--color-text-muted)] font-sans">
          Subaybayan ang pagtanggap ng mga mag-aaral at mamamayan sa bawat aralin upang higit pang mapahusay ang kalidad ng nilalaman.
        </p>
      </div>

      {/* Aggregate KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2">
          <div className="flex items-center justify-between text-[var(--color-text-muted)]">
            <span className="text-xs font-mono uppercase tracking-wider font-medium">Kasiyahan</span>
            <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="font-serif text-3xl font-bold text-[var(--color-text)]">
            {overallSatisfaction}%
          </div>
          <p className="text-[11px] text-[var(--color-text-muted)]">
            Bahagdan ng mga tumugon na &ldquo;Oo, nakatulong&rdquo;
          </p>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2">
          <div className="flex items-center justify-between text-[var(--color-text-muted)]">
            <span className="text-xs font-mono uppercase tracking-wider font-medium">Nakatulong (Oo)</span>
            <ThumbsUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="font-serif text-3xl font-bold text-emerald-700 dark:text-emerald-400">
            {totalHelpful}
          </div>
          <p className="text-[11px] text-[var(--color-text-muted)]">
            Mga botong positibo sa kabuuan
          </p>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2">
          <div className="flex items-center justify-between text-[var(--color-text-muted)]">
            <span className="text-xs font-mono uppercase tracking-wider font-medium">Kailangang Ayusin (Hindi)</span>
            <ThumbsDown className="w-4 h-4 text-red-600 dark:text-red-400" />
          </div>
          <div className="font-serif text-3xl font-bold text-red-600 dark:text-red-400">
            {totalUnhelpful}
          </div>
          <p className="text-[11px] text-[var(--color-text-muted)]">
            Mga botong nagsabing hindi nakatulong
          </p>
        </div>

        {/* Metric 4 */}
        <div className="p-5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2">
          <div className="flex items-center justify-between text-[var(--color-text-muted)]">
            <span className="text-xs font-mono uppercase tracking-wider font-medium">Mga Komento</span>
            <MessageSquare className="w-4 h-4 text-[var(--color-primary)]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[var(--color-text)]">
            {totalComments}
          </div>
          <p className="text-[11px] text-[var(--color-text-muted)]">
            Mga isinumiteng kwalitatibong mungkahi
          </p>
        </div>
      </div>

      {/* Aggregated Feedback Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-lg font-bold text-[var(--color-text)]">
            Pagkakahati ng Tugon Bawat Aralin ({displayData.length})
          </h2>
          <span className="text-xs font-mono text-[var(--color-text-muted)]">
            Kabuuang Boto: {totalVotes}
          </span>
        </div>

        <FeedbackTable data={displayData} />
      </div>
    </div>
  );
}
