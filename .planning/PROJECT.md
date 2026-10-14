# Diwang Panlipunan

## What This Is

Diwang Panlipunan ("Pag-unawa sa Lipunan, Pagmulat sa Kinabukasan") is an educational web platform dedicated to raising social awareness, critical consciousness, and informed civic participation among Filipino learners, students, and the public. It curates accessible, balanced, and multi-perspective analyses of contemporary Philippine and global societal issues across 7 core themes, supported by transparent citations, community feedback, and suggestion mechanisms.

## Core Value

Accessible, credible, and thought-provoking educational content on Philippine societal issues, presented with journalistic integrity, clear citations, and an editorial aesthetic that promotes active learning.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] US-01: Browse Topics & Subtopics (P0) — Explore 7 major themes and their nested subtopic articles
- [ ] US-02: Read Subtopic Content (P0) — Rich Markdown article reading with banner theming, summary, and metadata
- [ ] US-03: View Sources & Citations (P0) — Reliable citations list with direct external links per subtopic
- [ ] US-04: Content Drawer Navigation (P0) — Slide-out directory navigation to all topics, subtopics, and static pages
- [ ] US-05: Dark / Light Mode Toggle (P0) — Persistent theme switcher with high-contrast editorial tokens
- [ ] US-06: Static Informational Pages (P0) — Landing page (from design mock), Tungkol sa Amin (About), Makipag-ugnayan (Contact), and Privacy Notice
- [ ] US-07: Admin Authentication (P0) — Secure email/password login restricted to verified admin profile
- [ ] US-08: Admin Content Management (P0) — CRUD operations for Topics and Subtopics with Markdown editor and draft/published status
- [ ] US-09: Admin Sources Management (P0) — Add, edit, reorder, and remove citations per subtopic
- [ ] US-10: Content Feedback (P1) — Binary feedback ("Nakatulong ba ito? Oo / Hindi") with optional comment
- [ ] US-11: Suggestion Box (P1) — Public submission form for proposing new societal issues to cover
- [ ] US-12: Full-Text Search (P1) — Fast search across topics, subtopics, summaries, and content using PostgreSQL tsvector
- [ ] US-13: Admin Feedback & Suggestions Triage (P1) — Review reader feedback and filter/action topic suggestions (pending, reviewed, implemented, dismissed)
- [ ] US-14: Reading Progress Indicator (P2) — Subtle reading depth indicator on subtopic articles
- [ ] US-15: Shareable Deep Links (P2) — Quick copy/share links for articles with Open Graph metadata
- [ ] US-16: Related Subtopics (P2) — Curated or algorithmic recommendations at the bottom of articles
- [ ] US-17: Print / PDF-Friendly View (P2) — Clean stylesheet removing chrome and drawer for academic handouts
- [ ] US-18: Analytics Dashboard (Internal) (P2) — View counts, feedback metrics, and search query trends for admin

### Out of Scope

- Learner user registration / authentication — Platform is completely open-access and friction-free; readers do not need accounts.
- Public open comment sections — High risk of unmoderated misinformation and vitriol; structured suggestions and binary feedback provide healthy interaction.
- Editor / Moderator multi-tier roles — Single admin account is sufficient for initial launch; RBAC deferred.
- Social OAuth logins — Unnecessary complexity for single-admin deployment.
- Commercial monetization / paywalls / ads — Non-profit civic educational mission.
- Real-time chat or AI chat bot — Editorial curation with academic/journalistic citations is prioritized over LLM generation.
- Dynamic multilingual toggle — Strictly specified as Filipino for branding, headings, and buttons; English for search, form validation, and subtopic body text.

## Context

- **Ecosystem**: Next.js App Router (TypeScript), Tailwind CSS + CSS variable theme tokens, Supabase (PostgreSQL, Auth, Storage), Zod validation, react-markdown, Lucide React, Vercel deployment.
- **Design System**: Editorial flat design inspired by broadsheet journalism and academic reviews. Zero drop shadows, zero rounded pill-boxes, zero glassmorphism. Typography: Source Serif 4 (headings), Public Sans (body). 7 distinctive topic colorways defined in DESIGN.md.
- **Assets & References**: Complete UI mockups exist in `docs/screens/` (Landing.png, Home.png, Drawer.png, About.png, AdminTopics.png) and `docs/logo/Logo.png`.
- **Infrastructure**: Single Supabase project with Row Level Security (RLS), custom `is_admin()` security definer function, and automated user-profile trigger.

## Constraints

- **Tech Stack**: Next.js App Router, TypeScript, Tailwind CSS, Supabase — Prescribed by technical requirements.
- **Design Aesthetic**: Flat editorial design, strict typography pairing (Source Serif 4 + Public Sans), light/dark tokens with 7 topic accent colorways — Must match DESIGN.md and screen mocks.
- **Database Search**: PostgreSQL `tsvector` with `simple` dictionary configuration — PostgreSQL lacks native Filipino dictionary stemmer.
- **Security & Authorization**: RLS enabled on all tables, admin mutations enforced via `is_admin()` role check — Zero insecure client mutations.
- **Language Conventions**: Filipino for brand, nav items, and callouts; English for search terms, form validation, and article body text — Must adhere to product specification.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js App Router + TypeScript | Server components for SEO, optimal performance, and type safety | — Pending |
| Build all P0, P1, and P2 stories | Delivers a complete, polished educational platform | — Pending |
| Landing page matching docs/screens/Landing.png | Faithful implementation of stakeholder-approved brand experience | — Pending |
| Single admin role at launch (no editor tier) | Minimizes administrative overhead while securing content management | — Pending |
| Dedicated Privacy Notice page | Transparent data disclosures for suggestion box and reader feedback | — Pending |
| PostgreSQL `simple` text search configuration | Avoids language stemmer errors for mixed Filipino/English content | — Pending |
| Flat editorial visual language | Creates a dignified, serious tone suited for public social consciousness | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-10-14 after initialization*
