# Phase 5: Full-Text Search, Feedback & Suggestion Box - Context

**Gathered:** 2026-10-14  
**Status:** Ready for planning  

<domain>
## Phase Boundary

Phase 5 delivers public discovery and community interaction capabilities for Diwang Panlipunan, connecting readers and researchers directly with the content. It implements bilingual full-text search across topics and subtopics using PostgreSQL `tsvector`, interactive in-article binary feedback with optional reader comments, a civic social issue suggestion mechanism (`Magmungkahi ng Paksa`), and administrative triage dashboards for reviewing community feedback and triaging topic proposals.

Requirements addressed:
- **SRCH-01**: Global search input trigger accessible from the header and content drawer navigation.
- **SRCH-02**: PostgreSQL tsvector full-text search querying topic titles, subtopic titles, summaries, and Markdown body using the `simple` dictionary configuration (accommodating mixed Filipino and English vocabulary).
- **SRCH-03**: Search results interface displaying topic badges, matching subtopic excerpts with highlighted keywords, and direct links to subtopics.
- **FDBK-01**: Binary feedback widget ("Nakatulong ba ito? Oo / Hindi") on all subtopic articles.
- **FDBK-02**: Optional short text feedback comment submitted upon voting to explain reader insights or suggestions.
- **SUGG-01**: Public topic suggestion form at `/magmungkahi` enabling citizens and learners to propose societal topics.
- **SUGG-02**: Zod validation schemas, client/server rate limiting, and honeypot anti-spam measures for public submissions.
- **TRG-01**: Admin feedback triage dashboard at `/admin/feedback` aggregating satisfaction rates and reader comments per subtopic.
- **TRG-02**: Admin topic suggestion triage dashboard at `/admin/suggestions` with status transitions (Pending, In Review, Implemented, Dismissed).

Out of scope:
- Social share deep-linking and Open Graph card generation (Phase 6).
- Print / PDF export styling (Phase 6).
- Google Analytics / external telemetry tracking (Phase 6).
</domain>

<decisions>
## Implementation Decisions

### 1. Search Interface & Engine
- **D-01 (Dual Search Access):**
  - **Quick Search Modal:** Clicking the header search placeholder or pressing `Cmd+K` / `Ctrl+K` opens a broadsheet search modal overlay. Features a debounced search input, keyboard up/down arrow navigation, immediate results grouped by topic, highlighted matching excerpts, and an `ESC` dismiss trigger.
  - **Full Search Page:** Pressing `Enter` or navigating to `/search?q=...` renders a comprehensive broadsheet search results page with count metadata, topic filtering tabs, and full summary excerpts.
- **D-02 (Bilingual tsvector Query & Resilient Fallback):**
  - Database queries target the generated `search_vector` column using `plainto_tsquery('simple', query)` to preserve Filipino affixes and English terms without aggressive English-only stemming.
  - If the database is offline or in local test mode, queries seamlessly fall back to an in-memory weighted string matcher across the canonical seed dataset, ensuring zero search crashes.

### 2. In-Article Feedback & Comment Workflow
- **D-03 (Interactive Inline Expansion):**
  - On the reading page (`/topics/[topic]/[subtopic]`), clicking "Oo" or "Hindi" immediately logs the binary vote via a server action, locks the widget locally using localStorage (`diwang_feedback_[slug]`) to prevent repeated voting spam, and shows an immediate thank-you indicator.
  - An inline text area expands smoothly: `"Paano pa mapapabuti ang araling ito o ano ang iyong naging pagninilay?"` with a 280-character limit and a `"Ipadala ang Puna"` submit button.

### 3. Public Topic Suggestion Box (`/magmungkahi`)
- **D-04 (Civic Submission Form):**
  - Dedicated public page at `/magmungkahi` (with Next.js rewrite for `/suggest`).
  - Form fields:
    - Pamagat ng Iminumungkahing Paksa (`title`, required)
    - Tematikong Larangan (`topic_id`, dropdown of the 7 core themes, required)
    - Bakit ito mahalagang talakayin? (`reason`, required, min 20 chars)
    - Mga Iminumungkahing Sanggunian o Ulat (`suggested_sources`, optional links/notes)
    - Pangalan at Email (`submitter_name`, `submitter_email`, optional for editorial follow-up)
  - Anti-spam: Hidden honeypot field (`website_url_hp`) and client/server rate limiting using IP/timestamp cookies. Validated with strict Zod schema.

### 4. Admin Community Triage Dashboards
- **D-05 (Admin Navigation Tabs):**
  - Add `/admin/feedback` and `/admin/suggestions` to the top administrative navigation bar in `src/app/admin/(dashboard)/layout.tsx`.
- **D-06 (Feedback Analytics Dashboard - `/admin/feedback`):**
  - Summary metrics: Overall platform satisfaction rate (e.g. `92% positibo`), total feedback submissions, and total reader comments.
  - Table aggregated by subtopic: Topic tag, Subtopic Title, "Oo" count, "Hindi" count, Satisfaction bar, and a "Tingnan ang mga Komento" modal/drawer to inspect written feedback.
- **D-07 (Suggestion Triage Dashboard - `/admin/suggestions`):**
  - Triage list/table showing submitted proposals: Date, Title, Suggested Theme, Submitter Email, and Status badge.
  - Status transitions via inline dropdown:
    - `Nakabinbin` (Pending - amber)
    - `Sinusuri` (In Review - blue)
    - `Naipatupad` (Implemented - green)
    - `Tinanggihan` (Dismissed - gray)
  - Action to write admin review notes or link directly to create a new subtopic article from the proposal.

</decisions>

<canonical_references>
## Canonical References & Wireframes

- `docs/DESIGN.md`: Broadsheet editorial typography, tokens, and modal styling.
- `src/types/database.ts`: `feedback` table and `suggestions` table schemas.
- `src/lib/content-service.ts`: Canonical seed data for offline search fallback.
- `src/components/reading/reading-feedback.tsx`: Existing reading feedback UI to be wired to the database.
</canonical_references>

<verification_checklist>
## Phase 5 Verification Gates

1. **Search Gate:**
   - Pressing `Cmd+K` or clicking header search opens search modal.
   - Searching for "klima" or "climate" displays matching subtopic with highlighted snippet.
   - Navigating to `/search?q=klima` renders full search results page.
2. **Feedback Gate:**
   - Clicking "Oo" on an article submits vote and opens optional comment field.
   - Submitting a comment persists to `feedback` table.
   - Duplicate voting is blocked locally.
3. **Suggestion Gate:**
   - Submitting `/magmungkahi` with valid data persists to `suggestions` table with status `pending`.
   - Submitting with empty required fields triggers Zod validation errors.
   - Bot submissions filling the honeypot are rejected.
4. **Admin Triage Gate:**
   - `/admin/feedback` displays aggregated satisfaction rates and reader comments.
   - `/admin/suggestions` displays submitted proposals and allows updating status to "In Review" or "Implemented".
</verification_checklist>
