# Phase 3: Core Discovery & Subtopic Reading Experience - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-10-14  
**Phase:** 03-core-discovery-subtopic-reading-experience  
**Areas discussed:** Route Hierarchy & Slug Organization, Markdown Parsing & Citation Anchors, Data Fetching & Offline Fallback, Desktop Reading Sidebar  

---

## Route Hierarchy & Slug Organization

### Routing Structure for Topics and Subtopics

| Option | Description | Selected |
|--------|-------------|:---:|
| Nested `/topics/[topic]/[subtopic]` + `/topics` directory | Dynamic route `/topics/[topic]/[subtopic]` using canonical database slugs (`/topics/kapaligiran/...`), with `/topics` and `/mga-paksa` serving the full 7-topic thematic directory with subtopic counts. | ✓ |
| Direct `/artikulo/[subtopic]` route | Direct subtopic route `/artikulo/[subtopic]` without topic nesting. | |

**User's choice:** Nested `/topics/[topic]/[subtopic]` + `/topics` directory  
**Notes:** Reflects the hierarchical curriculum structure, supports topic-level landing hubs, and matches broadsheet academic organization.

---

## Markdown Parsing & Citation Anchors

### Markdown Engine and Academic Citation Behavior

| Option | Description | Selected |
|--------|-------------|:---:|
| `react-markdown` with GFM & smooth jump anchors | Use `react-markdown` with GFM plugin; support standard markdown footnotes `[^1]` or bracketed references `[1]` smoothly jumping to `#sanggunian` footnotes, plus styled pullquotes and data callout boxes. | ✓ |
| Simple markdown without citation jumps | Simple markdown only with plain bulleted links at the end of the article, without in-text jumping anchors. | |

**User's choice:** `react-markdown` with GFM & smooth jump anchors  
**Notes:** Delivers academic rigor (`SRC-01`, `SRC-02`, `SRC-03`), allowing readers to effortlessly check verified sources without losing their reading position.

---

## Data Fetching & Fallback Strategy

### Data Architecture for Reading Pages

| Option | Description | Selected |
|--------|-------------|:---:|
| Server Components with resilient seed fallback | Server Components with dynamic Supabase query by slug, paired with transparent local seed data fallback so all 7 topics and 21 articles render seamlessly offline or before DB connection. | ✓ |
| Strict Supabase query only | Strict Supabase query only (returns 404/error if database is not reachable). | |

**User's choice:** Server Components with resilient seed fallback  
**Notes:** Guarantees 100% reliable local development and previewing while maintaining full production database connectivity.

---

## Desktop Reading Sidebar Layout

### Desktop (1280px+) Editorial Left Sidebar

| Option | Description | Selected |
|--------|-------------|:---:|
| Sticky Left Sidebar on desktop | Render the sticky left editorial sidebar on desktop (1280px+) with quick in-page navigation links (`Tungkol sa Website`, `Nakatulong ba ito?`, `Mga Rekomendasyon at Mungkahi`, `Mga Sanggunian`, `Contact Us`), collapsing on tablet and mobile into the Content Drawer per DESIGN.md. | ✓ |
| Single centered column without sidebar | No left sidebar on reading pages; keep article centered in a single broadsheet column across all screen sizes. | |

**User's choice:** Sticky Left Sidebar on desktop  
**Notes:** Faithfully matches `docs/screens/ReadingPage.png` and `DESIGN.md` §4 desktop 12-column grid.

---

## The Agent's Discretion

- Markdown renderer styling details for bulleted lists, numbered lists, blockquotes, and tables conforming to `DESIGN.md`.
- Read time estimation formula (~200 words per minute rounded up).
- Temporary highlight CSS animation when jumping to an in-text citation target.

## Deferred Ideas

- Full in-article reader feedback persistence and rate limiting deferred to Phase 5 (`FDBK-01..02`).
- Reading progress scroll indicator deferred to Phase 6 (`READ-03`).
