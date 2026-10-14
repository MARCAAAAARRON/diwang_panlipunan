# Phase 3: Core Discovery & Subtopic Reading Experience - Context

**Gathered:** 2026-10-14  
**Status:** Ready for planning  

<domain>
## Phase Boundary

Phase 3 delivers the core educational reading and topic discovery capabilities for Diwang Panlipunan:
1. **Thematic Topic Directory (`DISC-01`, `DISC-02`):** Browsing interface at `/topics` and `/mga-paksa` displaying the 7 canonical Philippine societal themes with title, Filipino description, icon/imagery, published subtopic counts, and status filters.
2. **Individual Topic Hubs (`DISC-01`):** Dedicated topic overview pages at `/topics/[topic]` featuring the topic description, thematic banner accent color, and listed subtopics in curriculum order.
3. **Subtopic Article Reader (`READ-01`, `READ-02`):** Long-form reading view at `/topics/[topic]/[subtopic]` matching `docs/screens/ReadingPage.png` with breadcrumbs, topic banner accent theming (`--topic-color`), estimated reading time, executive summary, verified review badge (`Nasuri ng Lupon`), documentary photo with caption, formatted Markdown content (serif typography, 68ch reading length, pullquotes, data callout boxes), and previous/next article navigation.
4. **Desktop Reading Sidebar (`DESIGN.md` §4):** Sticky left sidebar on desktop displays (1280px+) with quick section jump links (`Tungkol sa Website`, `Nakatulong ba ito?`, `Mga Rekomendasyon at Mungkahi`, `Mga Sanggunian`, `Contact Us`), cleanly collapsing into the Content Drawer on tablet and mobile viewports.
5. **Academic Citations Section (`SRC-01`, `SRC-02`, `SRC-03`):** Dedicated `Mga Sanggunian` section at the end of each article listing formal academic references with authors, publication dates, titles, and secure external links (`rel="noopener noreferrer"`), with smooth in-text citation jump anchors.

</domain>

<decisions>
## Implementation Decisions

### Routing & Route Hierarchy
- **D-01: Canonical Nested Route Structure:** Articles are served under `/topics/[topic]/[subtopic]` using canonical database slugs (e.g. `/topics/kapaligiran/climate-change-sa-pilipinas`).
- **D-02: Dual Catalog Slugs:** Both `/topics` and `/mga-paksa` serve the full 7-topic thematic directory with subtopic article counts and publication filters.
- **D-03: Topic Hubs:** `/topics/[topic]` serves the thematic introduction and complete subtopic curriculum list for a specific societal theme.

### Markdown Parsing & Content Components
- **D-04: Markdown Engine & GFM Support:** Use `react-markdown` with `remark-gfm` and custom component overrides for Source Serif headings, Public Sans reading text, blockquotes, callout blocks, and responsive tables.
- **D-05: In-Text Citation Anchors (`SRC-03`):** Standard bracketed citations (e.g. `[^1]` or `[1]`) rendered as superscript links that smoothly scroll the reader directly to the matching `#sanggunian-1` reference entry with temporary highlight focus.
- **D-06: Editorial Callouts & Data Stat Boxes:** Support custom blockquote and statistic callouts matching `ReadingPage.png` (e.g. `TALA NG DATOS: ANTAS NG DAGAT` with large green multiplier `3x`, title, description, and source citation attribution).
- **D-07: Article Metadata & Read Time:** Compute reading time dynamically from article word count (~200 words per minute) or database stored attribute, paired with publication date and `Nasuri ng Lupon` editorial review badge.

### Reading Layout & Responsive Shell
- **D-08: Desktop Sticky Left Sidebar:** On desktop screens (1280px+), render the dedicated left sidebar matching `docs/screens/ReadingPage.png` with in-page jump targets (`Tungkol sa Website`, `Nakatulong ba ito?`, `Mga Rekomendasyon at Mungkahi`, `Mga Sanggunian`, `Contact Us`). On screens < 1280px, these links collapse into the Content Drawer.
- **D-09: Topic Banner Accents (`READ-02`):** The active topic's accent token (`--topic-color`) tints the category tag, article header highlights, and accent borders.
- **D-10: Subtopic Pagination:** The bottom of each article renders `"← Nakaraang Paksa"` and `"Susunod na Paksa →"` linking to adjacent subtopics in curriculum order.

### Data Fetching & Fallback
- **D-11: Resilient Hybrid Data Fetcher:** Next.js Server Components query Supabase PostgreSQL tables (`topics`, `subtopics`, `sources`) by slug. If database credentials are missing or the connection times out, seamlessly fall back to our embedded seed dataset so all 7 topics and 21 articles render completely in offline or local test environments.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Screen & Design Standards
- `docs/screens/ReadingPage.png` — Visual reference for reading layout, metadata, cover photo, pullquote, stat callout, citations, and pagination.
- `docs/DESIGN.md` §2 (Topic colors & CSS tokens)
- `docs/DESIGN.md` §3 (Reading typography: `body-reading` 17px, line height 1.7, 68ch max width)
- `docs/DESIGN.md` §4 (Desktop 12-column grid with left sidebar; tablet/mobile collapse)
- `docs/DESIGN.md` §6 (Callouts and quotes: 3px solid left border in `--color-primary-large`)

### Architecture & Content Requirements
- `docs/PRD.md` §1 (7 core societal themes & subtopic curricula)
- `docs/TRD.md` §3 (Data architecture: `topics`, `subtopics`, `sources`)
- `supabase/migrations/00003_seed_data.sql` (Canonical seeded content, slugs, and academic citations)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/navigation/breadcrumbs.tsx`: Ready for hierarchical navigation (`Home > Topic > Subtopic`).
- `src/lib/navigation-data.ts`: Contains canonical 7 topics and subtopic structures.
- `src/lib/supabase/server.ts`: Server-side Supabase client for Server Component data fetching.
- `src/types/database.ts` and `src/types/content.ts`: Type definitions for `Topic`, `Subtopic`, `Source`, and article models.
- `src/components/ui/topic-icon.tsx`: Dynamic icon renderer for the 7 themes.

### Established Patterns
- Broadsheet editorial typography: Source Serif 4 for article titles and headings; Public Sans for body text and metadata.
- Strict flat styling: Zero drop shadows, 6px border radius, 1px solid borders.
- Bilingual rules: Filipino for brand, nav, buttons, and callout labels; English for article body and search.

</code_context>

<specifics>
## Specific Ideas

- The Markdown parser should safely sanitize HTML to prevent XSS while allowing rich editorial expressions (blockquotes, lists, bolding, italics, tables, and superscripts).
- External citations must strictly use `target="_blank" rel="noopener noreferrer"`.
- In-text citation superscripts should provide an accessible title with the source publication name on hover.

</specifics>

<deferred>
## Deferred Ideas

- In-article feedback submission ("Oo/Hindi" voting with optional comment) is a visual widget in Phase 3; database storage and rate limiting are wired in Phase 5 (`FDBK-01..02`).
- Reading progress / depth scroll indicator is reserved for Phase 6 (`READ-03`).

</deferred>

---

*Phase: 03-core-discovery-subtopic-reading-experience*  
*Context gathered: 2026-10-14*
