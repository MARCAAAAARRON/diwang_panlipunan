# Diwang Panlipunan

## What This Is

Diwang Panlipunan ("Pag-unawa sa Lipunan, Pagmulat sa Kinabukasan") is an educational web platform dedicated to raising social awareness, critical consciousness, and informed civic participation among Filipino learners, students, and the public. It curates accessible, balanced, and multi-perspective analyses of contemporary Philippine and global societal issues across 7 core themes, supported by transparent citations, community feedback, and suggestion mechanisms.

## Core Value

Accessible, credible, and thought-provoking educational content on Philippine societal issues, presented with journalistic integrity, clear citations, and an editorial aesthetic that promotes active learning.

## Requirements

### Validated

- ✓ US-01: Browse Topics & Subtopics (P0) — Explore 7 major themes and nested subtopics — v1.0
- ✓ US-02: Read Subtopic Content (P0) — Rich Markdown article reading with banner theming, summary, and metadata — v1.0
- ✓ US-03: View Sources & Citations (P0) — Reliable citations list with direct external links per subtopic — v1.0
- ✓ US-04: Content Drawer Navigation (P0) — Slide-out directory navigation to all topics, subtopics, and static pages — v1.0
- ✓ US-05: Dark / Light Mode Toggle (P0) — Persistent theme switcher with high-contrast editorial tokens — v1.0
- ✓ US-06: Static Informational Pages (P0) — Landing page matching design mock, Tungkol sa Amin, Makipag-ugnayan, and Privacy Notice — v1.0
- ✓ US-07: Admin Authentication (P0) — Secure email/password login restricted to verified admin profile — v1.0
- ✓ US-08: Admin Content Management (P0) — CRUD operations for Topics and Subtopics with live Markdown editor — v1.0
- ✓ US-09: Admin Sources Management (P0) — Add, edit, reorder, and remove citations per subtopic — v1.0
- ✓ US-10: Content Feedback (P1) — Binary feedback ("Nakatulong ba ito? Oo / Hindi") with optional comment — v1.0
- ✓ US-11: Suggestion Box (P1) — Public submission form for proposing new societal issues to cover — v1.0
- ✓ US-12: Full-Text Search (P1) — Fast search across topics, subtopics, summaries, and content using PostgreSQL tsvector — v1.0
- ✓ US-13: Admin Feedback & Suggestions Triage (P1) — Review reader feedback and filter/action topic suggestions — v1.0
- ✓ US-14: Reading Progress Indicator (P2) — Unobtrusive 2.5px fixed scroll depth indicator on subtopic articles — v1.0
- ✓ US-15: Shareable Deep Links (P2) — Quick copy/share links for articles with Open Graph metadata — v1.0
- ✓ US-16: Related Subtopics (P2) — 2 sibling + 1 cross-thematic recommendations at article footer — v1.0
- ✓ US-17: Print / PDF-Friendly View (P2) — Broadsheet stylesheet stripping web chrome for academic handouts — v1.0
- ✓ US-18: Analytics Dashboard (Internal) (P2) — First-party privacy-preserving readership, search, and feedback trends — v1.0

### Active (v2 Pipeline)

- [ ] US-19: Role-Based Access Control (RBAC) (P1) — Multi-tiered admin permissions (Editor, Reviewer, Super Admin)
- [ ] US-20: Dynamic Multilingual Language Toggle (P1) — Dynamic switching between Filipino and English for full UI and articles
- [ ] US-21: Moderated Community Discussions / Annotations (P2) — Controlled paragraph-level annotations and discourse
- [ ] US-22: Social OAuth Login for Admins (P2) — Google and GitHub OAuth authentication for administrators

### Out of Scope

- Learner user registration / authentication — Platform is completely open-access and friction-free; readers do not need accounts.
- Public unmoderated open comment sections — High risk of unmoderated misinformation and vitriol; structured suggestions and binary feedback provide healthy interaction.
- Commercial monetization / paywalls / ads — Non-profit civic educational mission.
- Real-time chat or AI chatbot generation — Editorial curation with academic/journalistic citations is prioritized over LLM generation.

## Context

- **Current State**: Shipped v1.0 with 9,108 LOC TypeScript across 132 files. 21 production Next.js routes, full Supabase RLS and storage integration.
- **Ecosystem**: Next.js App Router (TypeScript), Tailwind CSS + CSS variable theme tokens, Supabase (PostgreSQL, Auth, Storage), Zod validation, react-markdown, Lucide React, Vercel deployment.
- **Design System**: Editorial flat design inspired by broadsheet journalism and academic reviews. Zero drop shadows, zero rounded pill-boxes, zero glassmorphism. Typography: Source Serif 4 (headings), Public Sans (body). 7 distinctive topic colorways defined in DESIGN.md.
- **Infrastructure**: Supabase project with Row Level Security (RLS), custom `is_admin()` security definer function, and automated user-profile trigger.

## Constraints

- **Tech Stack**: Next.js App Router, TypeScript, Tailwind CSS, Supabase — Prescribed by technical requirements.
- **Design Aesthetic**: Flat editorial design, strict typography pairing (Source Serif 4 + Public Sans), light/dark tokens with 7 topic accent colorways — Must match DESIGN.md and screen mocks.
- **Database Search**: PostgreSQL `tsvector` with `simple` dictionary configuration — PostgreSQL lacks native Filipino dictionary stemmer.
- **Security & Authorization**: RLS enabled on all tables, admin mutations enforced via `is_admin()` role check — Zero insecure client mutations.
- **Language Conventions**: Filipino for brand, nav items, and callouts; English for search terms, form validation, and article body text — Must adhere to product specification.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js App Router + TypeScript | Server components for SEO, optimal performance, and type safety | ✓ Good |
| Build all P0, P1, and P2 stories | Delivers a complete, polished educational platform | ✓ Good |
| Landing page matching docs/screens/Landing.png | Faithful implementation of stakeholder-approved brand experience | ✓ Good |
| Single admin role at launch (no editor tier) | Minimizes administrative overhead while securing content management | ✓ Good |
| Dedicated Privacy Notice page | Transparent data disclosures for suggestion box and reader feedback | ✓ Good |
| PostgreSQL `simple` text search configuration | Avoids language stemmer errors for mixed Filipino/English content | ✓ Good |
| Flat editorial visual language | Creates a dignified, serious tone suited for public social consciousness | ✓ Good |
| First-party privacy-preserving analytics | Zero cookies, zero IP logging, zero external trackers for student privacy | ✓ Good |
| Broadsheet print CSS | Enables classroom and offline study handouts directly from web articles | ✓ Good |

---
*Last updated: 2026-10-14 after v1.0 milestone*
