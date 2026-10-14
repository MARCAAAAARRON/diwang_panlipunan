# Phase 1: Project Foundation & Database Architecture - Context

**Gathered:** 2026-10-14  
**Status:** Ready for planning  

<domain>
## Phase Boundary

Phase 1 delivers the foundational codebase, styling system, and database architecture for Diwang Panlipunan:
1. Initialize the Next.js App Router workspace with TypeScript strict mode, Tailwind CSS, and ESLint.
2. Configure the editorial design tokens in `globals.css` with CSS variables for high-contrast light and dark themes, the 7 topic accent colorways, and Google Fonts (`Source Serif 4` and `Public Sans`).
3. Set up the Supabase SSR client integration (`@supabase/ssr` with `createServerClient` and `createBrowserClient`) and environment variable validation.
4. Create and verify versioned SQL migration scripts in `supabase/migrations/` covering:
   - Tables: `profiles`, `topics`, `subtopics`, `sources`, `feedback`, `suggestions`
   - Trigger on `auth.users` automatically inserting new records into `profiles`
   - Security Definer function `is_admin()`
   - Strict Row Level Security (RLS) on all 6 tables enforcing public reads and admin-only mutations
   - Seed data for all 7 canonical Philippine societal themes, mapped to CSS tokens and Lucide icon strings, with 1-2 sample subtopic articles and citations
   - Idempotent script for designating the initial administrator

</domain>

<decisions>
## Implementation Decisions

### Project Directory Structure
- **D-01:** Standard `src/` directory layout (`src/app/`, `src/components/`, `src/lib/`, `src/types/`) keeping the workspace root uncluttered.
- **D-02:** Domain-driven modular component structure: `src/components/ui/`, `src/components/navigation/`, `src/components/topics/`, `src/components/reading/`, and `src/components/admin/`.
- **D-03:** Module path alias `@/*` configured in `tsconfig.json` mapping to `./src/*`.
- **D-04:** Centralized TypeScript definitions in `src/types/database.ts` (Supabase database table rows and queries) and `src/types/content.ts` (application domain models and navigation types).

### Supabase Migrations & SQL Setup
- **D-05:** Versioned migrations in `supabase/migrations/` (`00001_initial_schema.sql`, `00002_rls_and_auth.sql`, `00003_seed_data.sql`, `00004_admin_promotion.sql`).
- **D-06:** Official `@supabase/ssr` integration implementing cookie-based auth session management for Next.js App Router Server and Client Components.
- **D-07:** Dual SQL compatibility: standard PostgreSQL scripts executable either via Supabase Dashboard SQL Editor or the Supabase CLI.
- **D-08:** User profile trigger on `auth.users` automatically populating `public.profiles` on signup; initial admin is granted role via `00004_admin_promotion.sql`.

### Initial Topic Seeding & Design Tokens
- **D-09:** Seed all 7 canonical Philippine societal themes:
  1. *Edukasyon* (Education)
  2. *Kalusugan* (Healthcare)
  3. *Ekonomiya* (Economy & Livelihood)
  4. *Karapatang Pantao* (Human Rights)
  5. *Kapaligiran* (Environment & Climate)
  6. *Teknolohiya* (Technology & Digital Rights)
  7. *Pamahalaan* (Governance & Accountability)
- **D-10:** Include 1-2 realistic sample subtopic articles per topic with full Markdown text, summaries, and citations for immediate downstream frontend and reading experience testing.
- **D-11:** Map topic records directly to `DESIGN.md` CSS variable tokens (`--topic-edukasyon`, `--topic-kalusugan`, `--topic-ekonomiya`, etc.).
- **D-12:** Store standard Lucide React icon identifier strings in the database (`GraduationCap`, `HeartPulse`, `TrendingUp`, `Scale`, `Leaf`, `Cpu`, `Landmark`) rendered dynamically via a dedicated icon mapper.

### The Agent's Discretion
- Packaging and version specifications for Next.js 14/15, Tailwind CSS, Lucide React, and Zod dependencies.
- Implementation details of Supabase SSR cookie storage adapter in `src/lib/supabase/`.
- Exact sample article text for initial seeded subtopics.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Architecture & Technical Requirements
- `docs/TRD.md` — Technical Requirements Document defining database schema, RLS policies, `is_admin()` security definer function, Next.js architecture, and package dependencies.
- `docs/TRD.md` §3 (Data Architecture) — SQL table definitions, constraints, foreign keys, and indexes.
- `docs/TRD.md` §4 (Security Architecture) — RLS policies and admin role verification rules.

### Design System & Visual Tokens
- `docs/DESIGN.md` — Comprehensive design system specification covering typography, editorial layout, and theme tokens.
- `docs/DESIGN.md` §2 (Color System) — Light/dark base contrast tokens and 7 topic accent colorways.
- `docs/DESIGN.md` §3 (Typography) — Source Serif 4 (headings) and Public Sans (body) type scale and weights.

### Product & Domain Requirements
- `docs/PRD.md` — Product Requirements Document detailing 7 societal themes, user stories, and bilingual language conventions.
- `docs/SCREENS.md` — Screen specifications and component breakdown.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- Greenfield codebase; no existing application code.
- Detailed design system and database schemas in `docs/` ready to translate into code.

### Established Patterns
- High-contrast broadsheet editorial style: 0 drop shadows, 0 rounded pill-boxes, 0 glassmorphism.
- Bilingual convention: Filipino for branding, navigation, buttons, and callouts; English for search, form validation, and article body.
- Security-first database: RLS enabled on all tables, client operations strictly non-administrative.

### Integration Points
- `src/lib/supabase/server.ts` and `src/lib/supabase/client.ts` as the central database connection points for all future phases.
- `src/app/globals.css` containing the CSS custom properties that all subsequent UI components will consume.

</code_context>

<specifics>
## Specific Ideas

- The broadsheet/journalistic visual tone must feel distinguished and academic, not generic SaaS or bubbly consumer app.
- Database migration files should be self-contained, idempotent where possible, and cleanly commented so that any developer can run them in a single paste into the Supabase Dashboard.

</specifics>

<deferred>
## Deferred Ideas

- None — discussion stayed strictly within Phase 1 scope.

</deferred>

---

*Phase: 01-project-foundation-database-architecture*  
*Context gathered: 2026-10-14*
