import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getSubtopicBySlug,
  getAdjacentSubtopics,
  getRelatedSubtopics,
} from "@/lib/content-service";
import { ArticleHeader } from "@/components/reading/article-header";
import { MarkdownRenderer } from "@/components/reading/markdown-renderer";
import { ReadingSidebar } from "@/components/reading/reading-sidebar";
import { CitationsList } from "@/components/reading/citations-list";
import { ReadingFeedback } from "@/components/reading/reading-feedback";
import { ArticlePagination } from "@/components/reading/article-pagination";
import { ReadingProgressBar } from "@/components/reading/reading-progress-bar";
import { RelatedSubtopics } from "@/components/reading/related-subtopics";
import { BackToTop } from "@/components/reading/back-to-top";
import { recordArticleView } from "@/lib/analytics-service";

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

  const cleanDescription = article.summary || "Pagsusuri at aralin sa Diwang Panlipunan.";
  const title = `${article.title} | Diwang Panlipunan`;

  return {
    title,
    description: cleanDescription,
    openGraph: {
      title,
      description: cleanDescription,
      type: "article",
      locale: "fil_PH",
      siteName: "Diwang Panlipunan",
      publishedTime: article.published_at || undefined,
      authors: ["Lupon ng Patnugutan, Diwang Panlipunan"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: cleanDescription,
    },
  };
}

export default async function SubtopicPage({ params }: SubtopicPageProps) {
  // Validate slug parameters against regex
  const slugRegex = /^[a-z0-9-]+$/;
  if (!slugRegex.test(params.topic) || !slugRegex.test(params.subtopic)) {
    notFound();
  }

  const [article, adjacent, related] = await Promise.all([
    getSubtopicBySlug(params.topic, params.subtopic),
    getAdjacentSubtopics(params.topic, params.subtopic),
    getRelatedSubtopics(params.topic, params.subtopic),
  ]);

  if (!article) {
    notFound();
  }

  // Non-blocking first-party page view analytics recording
  recordArticleView(params.subtopic).catch(() => {});

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
      {/* 2.5px Minimalist Reading Depth Progress Bar */}
      <ReadingProgressBar colorToken={topic?.color_token} />

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
            imageUrl={article.cover_image_url}
          />

          {/* Long-Form Markdown Reading Area */}
          <div id="aralin" className="scroll-mt-24">
            <MarkdownRenderer content={article.content_markdown} />
          </div>

          {/* Academic Citations & Bibliography */}
          <CitationsList sources={article.sources} />

          {/* Intersectional & Sibling Related Subtopics */}
          <RelatedSubtopics related={related} />

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

      {/* Floating Broadsheet Back To Top Control */}
      <BackToTop />
    </div>
  );
}
