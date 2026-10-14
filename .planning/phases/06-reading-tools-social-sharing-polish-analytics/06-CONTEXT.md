# Phase 6 Context: Reading Tools, Social Sharing, Polish & Analytics

**Phase:** 06-reading-tools-social-sharing-polish-analytics  
**Status:** Ready for Planning  
**Date:** 2026-10-14  

---

## 1. Domain Boundary & Scope

Phase 6 delivers the final polish and engagement toolset for Diwang Panlipunan, fulfilling requirements `READ-03`, `READ-04`, `READ-05`, `NAV-05`, and `ANLY-01`:
1. **Reading Depth Progress Indicator (`READ-03`)**: Minimalist top progress bar tracking article scroll depth.
2. **Print & PDF Broadsheet Layout (`READ-04`)**: Dedicated print trigger and clean `@media print` stylesheet for offline study and teaching handouts.
3. **Related Subtopics Recommendation Engine (`READ-05`)**: Curated hybrid sibling and cross-theme recommendations placed after article citations.
4. **Shareable Deep Links & Open Graph Metadata (`NAV-05`)**: Unified "Ibahagi" menu (Web Share API on mobile, copy link with toast confirmation + social share intents on desktop) and complete Open Graph / Twitter Card tags.
5. **Internal Platform Analytics Dashboard (`ANLY-01`)**: Dedicated `/admin/analytics` dashboard and overview widgets displaying privacy-friendly page view counts, top articles leaderboard, theme distribution, and search trends.

---

## 2. Locked Implementation Decisions

### A. Reading Depth Progress Indicator (`READ-03`)
- **Visual Style:** Minimalist fixed 2.5px progress bar positioned at the very top edge of the viewport (`fixed top-0 left-0 h-[2.5px] z-50`).
- **Accent Color:** Dynamically inherits the active topic accent color token (`var(--color-primary)` or topic colorway) for seamless thematic harmony.
- **Behavior:** Smoothly scales width from 0% to 100% based on the reading position within `#aralin` (the main article body), avoiding distracting floating widgets or pillboxes to honor the flat broadsheet editorial aesthetic.

### B. Print & PDF Broadsheet Layout (`READ-04`)
- **Print Action Trigger:** Dedicated "I-print / PDF" button with `Printer` icon positioned in the article header toolbar.
- **Execution:** Calls browser-native `window.print()`.
- **Print Stylesheet (`@media print`):**
  - **Hidden elements:** Header navigation bar, hamburger menu, content drawer, search modal, theme toggle, auth button, reader feedback widget, related articles cards, curriculum pagination, and site footer.
  - **Preserved & Optimized elements:** BroadSheet article title, topic kicker, author/editorial attribution, publication date, full clean markdown text in high-contrast black on white (`#000000` text on `#ffffff` paper), pullquotes with crisp solid borders, data callout boxes, and the complete academic citations list.
  - **Page Break Rules:** Enforce `page-break-inside: avoid` on headings, stat boxes, and pullquotes.

### C. Related Subtopics Recommendation Engine (`READ-05`)
- **Algorithm / Selection:**
  - Hybrid recommendation: 2 sibling subtopics from the same parent topic + 1 intersectional subtopic from a neighboring societal theme (e.g. Climate Crisis intersects with Human Rights or Governance).
  - Fallback logic to always provide 3 relevant cards if fewer siblings exist.
- **Placement & Structure:** Placed directly below `<CitationsList />` and above `<ReadingFeedback />`.
- **Card Design:** Flat broadsheet cards displaying topic badge, estimated read time, article title, and a 2-line summary excerpt with hover highlight.

### D. Social Sharing & Open Graph Metadata (`NAV-05`)
- **Sharing Interface:**
  - Article header action button: "Ibahagi" with `Share2` icon.
  - Mobile: Native Web Share API (`navigator.share`) with title, text, and clean URL.
  - Desktop: Broadsheet popover menu featuring:
    - "Kopyahin ang Link" with clipboard write and instant feedback toast notification ("Nakopya ang link sa clipboard!").
    - Direct social intents for Facebook (`facebook.com/sharer/sharer.php`) and X/Twitter (`twitter.com/intent/tweet`).
- **Metadata Configuration (`generateMetadata`):**
  - `title`: `${article.title} | Diwang Panlipunan`
  - `description`: Article summary (cleaned, max 160 characters).
  - `openGraph`: Type `article`, published timestamp, authors, site name, locale `fil_PH`, and dynamic OG banner images matching the topic theme.
  - `twitter`: Summary large image card layout.

### E. Internal Platform Analytics Dashboard (`ANLY-01`)
- **Placement:**
  - Dedicated `/admin/analytics` tab integrated into the admin dashboard top navigation.
  - High-level KPI summary cards surfaced on the main `/admin` overview dashboard.
- **Privacy-First Tracking:**
  - First-party lightweight view incrementer action or client beacon (zero cookies, zero third-party trackers, zero PII).
- **Dashboard Metrics:**
  1. Total Platform Article Reads & Views.
  2. Top 5 Most Read Articles Leaderboard.
  3. Reading Share by Societal Theme (pie or bar distribution across the 7 themes).
  4. Reader Satisfaction Breakdown (aggregated helpful/unhelpful ratio).
  5. Top / Frequent Search Keywords table (helping editors identify unmet public inquiries).

---

## 3. Codebase Integration Points & Canonical References

### Existing Code Assets to Reuse:
- `src/app/topics/[topic]/[subtopic]/page.tsx`: Target for Reading Progress bar, Article Action Bar (Print + Share), Related Subtopics component, and dynamic Open Graph `generateMetadata`.
- `src/components/reading/reading-header.tsx`: Action bar container for Print and Share buttons.
- `src/app/globals.css`: Base print styles and broadsheet printing tokens.
- `src/lib/content-service.ts`: Helper functions to fetch sibling and cross-thematic related subtopics.
- `src/app/admin/(dashboard)/layout.tsx`: Admin nav bar for mounting the `/admin/analytics` tab.
- `src/app/admin/(dashboard)/page.tsx`: Overview page for mounting high-level analytics widgets.

---

## 4. Verification & Success Criteria

1. **Scroll Progress:** Scrolling long-form articles smoothly updates the fixed 2.5px top bar from 0% to 100% in the topic accent color.
2. **Print Output:** Clicking "I-print / PDF" opens the native print dialog displaying pristine broadsheet layout with zero navigation or interactive chrome.
3. **Related Articles:** Each article reading page renders 3 relevant recommendations with clean links and excerpts.
4. **Share & OG Meta:** Copy link copies the current URL to clipboard with a toast notification; social links generate pre-filled URLs; HTML `<head>` contains valid Open Graph and Twitter card tags.
5. **Analytics Dashboard:** Admins can view `/admin/analytics` with page views, top articles, theme shares, and search trends.
6. **Build Integrity:** `npm run build` exits with code 0 across all routes.
