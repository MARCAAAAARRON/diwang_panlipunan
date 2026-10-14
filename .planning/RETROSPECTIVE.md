# Project Retrospective: Diwang Panlipunan

*A living document updated after each milestone. Lessons feed forward into future planning.*

## Milestone: v1.0 — MVP

**Shipped:** 2026-10-14  
**Phases:** 6 | **Plans:** 18 | **Requirements:** 37  

### What Was Built
- High-contrast broadsheet editorial web platform for contemporary Philippine societal issues across 7 core themes.
- Comprehensive reader experience with reading time calculation, superscript citation anchors, sticky editorial sidebar, and RAF scroll depth progress bar.
- Broadsheet print/PDF layout stripping web navigation chrome while preserving articles, data callouts, and academic sources in pure black-on-white.
- Bilingual PostgreSQL tsvector full-text search (`Cmd+K` quick search and dedicated `/search`).
- Public civic engagement mechanisms: in-article binary feedback ("Oo/Hindi") with qualitative comment entry, and public topic suggestion box (`/magmungkahi`) with honeypot spam protection.
- Administrative CMS: protected admin auth, live split-screen Markdown preview, storage media upload, feedback analytics, suggestion triage, and platform readership metrics.

### What Worked
- **Resilient Seed Fallbacks:** Every data fetching service was equipped with high-quality fallback data matching the Supabase seed, allowing rapid local testing even when database access was offline.
- **Wave-Based Plan Splitting:** Structuring phases into discrete waves (foundations/services in wave 1, interactive components/pages in wave 2) prevented dependency deadlocks and allowed atomic git commits.
- **Strict Broadsheet Design System:** Establishing clear tokens in CSS variables (no drop shadows, no pill-boxes, zero glassmorphism, exact 7 topic accent colorways) kept visual consistency razor-sharp across all 21 routes.

### What Was Inefficient
- **PowerShell Path Escaping:** Running commands on Windows PowerShell with route directories containing parentheses (like `(dashboard)`) required explicit string quoting to avoid subexpression execution errors.
- **Windows File Locks During Dev:** Running production builds while the Next.js dev server was active caused occasional Windows `EPERM` file lock errors on `.next/trace`, requiring explicit server stop before building.

### Patterns Established
- **Service Layer Architecture:** All database, auth, and search operations are encapsulated in `*-service.ts` modules (`content-service`, `feedback-service`, `suggestion-service`, `analytics-service`), keeping UI components completely decoupled from data access logic.
- **First-Party Privacy-Preserving Analytics:** Tracking pageviews and search queries directly in the primary database with zero external analytics SDKs, zero cookies, zero IP logging, and zero PII.

### Key Lessons
1. **Full-text search dictionary tuning:** PostgreSQL `simple` dictionary configuration is essential for mixed-language platforms (Filipino headers/terms + English body/sources) because standard language stemmers produce false negatives on Tagalog affixes.
2. **Offline-friendly print styles:** Broadsheet `@media print` rules with explicit `a[href]:after` URLs make web articles immediately usable as academic classroom handouts without needing heavy PDF export libraries.

---

## Cross-Milestone Trends

### Process Evolution

| Milestone | Sessions | Phases | Key Change |
|-----------|----------|--------|------------|
| v1.0 | 1 | 6 | Vertical MVP sliced across 6 sequential phases with wave-based plans |

### Cumulative Quality

| Milestone | Total LOC | Routes | Requirements Satisfied |
|-----------|-----------|--------|------------------------|
| v1.0 | 9,108 | 21 | 37 / 37 (100%) |

### Top Lessons (Verified Across Milestones)

1. Keep database security definer functions (`is_admin()`) separate from application logic to ensure RLS policies can never be bypassed by client session tampering.
2. Pair Server Components for fast SEO data loading with lightweight client islands for interactive controls (reading progress, search modal, feedback widgets).
