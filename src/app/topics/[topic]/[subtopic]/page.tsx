import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSubtopicBySlug, getAdjacentSubtopics } from "@/lib/content-service";
import { ArticleHeader } from "@/components/reading/article-header";
import { MarkdownRenderer } from "@/components/reading/markdown-renderer";
import { ReadingSidebar } from "@/components/reading/reading-sidebar";
import { CitationsList } from "@/components/reading/citations-list";
import { ReadingFeedback } from "@/components/reading/reading-feedback";
import { ArticlePagination } from "@/components/reading/article-pagination";

interface SubtopicPageProps {
  params: {
    topic: string;
    subtopic: string;
  };
}

export async function generateMetadata({
  params,
}: SubtopicPageProps): Promise<Metadata> {
  const article = await getSubtopicBySlug(params.topic, params.subtopic);
  if (!article) {
    return {
      title: "Hindi Natagpuan ang Aralin | Diwang Panlipunan",
    };
  }

  return {
    title: `${article.title} | Diwang Panlipunan`,
    description: article.summary,
  };
}

export default async function SubtopicPage({ params }: SubtopicPageProps) {
  // Validate slug parameters against regex
  const slugRegex = /^[a-z0-9-]+$/;
  if (!slugRegex.test(params.topic) || !slugRegex.test(params.subtopic)) {
    notFound();
  }

  const [article, adjacent] = await Promise.all([
    getSubtopicBySlug(params.topic, params.subtopic),
    getAdjacentSubtopics(params.topic, params.subtopic),
  ]);

  if (!article) {
    notFound();
  }

  const topic = article.topic;
  const topicTitle = topic?.name_fil || "Pangunahing Paksa";
  const topicNumber = String(topic?.order_index || 1).padStart(2, "0");

  return (
    <div
      style={{
        ["--topic-color" as string]: `var(--topic-${params.topic}, var(--color-primary))`,
      }}
      className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="xl:grid xl:grid-cols-12 xl:gap-12 items-start">
        {/* Left Sticky Editorial Sidebar (Desktop 1280px+) */}
        <div className="hidden xl:block xl:col-span-3">
          <ReadingSidebar topicTitle={topicTitle} topicSlug={params.topic} />
        </div>

        {/* Main Editorial Reading Column (Max 68ch for focused readability) */}
        <main className="xl:col-span-9 max-w-[68ch] mx-auto xl:mx-0 w-full">
          {/* Article Header with metadata, breadcrumbs, and cover figure */}
          <ArticleHeader
            topicTitle={topicTitle}
            topicSlug={params.topic}
            topicNumber={topicNumber}
            subtopicTitle={article.title}
            readTimeMinutes={article.read_time_minutes}
            publishedAt={article.published_at}
          />

          {/* Long-Form Markdown Reading Area */}
          <div id="aralin" className="scroll-mt-24">
            <MarkdownRenderer content={article.content_markdown} />
          </div>

          {/* Academic Citations & Bibliography */}
          <CitationsList sources={article.sources} />

          {/* In-Page Reader Feedback & Contribution Prompt */}
          <ReadingFeedback
            subtopicTitle={article.title}
            subtopicId={article.id}
            subtopicSlug={article.slug}
          />

          {/* Adjacent Subtopic Curriculum Pagination */}
          <ArticlePagination
            topicSlug={params.topic}
            prev={adjacent.prev}
            next={adjacent.next}
          />
        </main>
      </div>
    </div>
  );
}
