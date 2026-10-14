# Project Milestones: Diwang Panlipunan

## v1.0 MVP (Shipped: 2026-10-14)

**Delivered:** Educational web platform raising social awareness, critical consciousness, and informed civic participation through curated, multi-perspective analyses of contemporary Philippine societal issues across 7 core themes, supported by transparent citations, full-text search, community feedback, topic suggestions, and an editorial CMS.

**Phases completed:** 1-6 (18 plans total)

**Key accomplishments:**
- **Foundation & Database Architecture:** Next.js 14 App Router, Source Serif 4 & Public Sans typography, high-contrast broadsheet tokens, and Supabase PostgreSQL schema with RLS and `is_admin()` security definer function.
- **Global Shell & Broadsheet Navigation:** Zero-FOUC dark/light theme switching, sticky broadsheet header/footer, slide-out Content Drawer with accordion directory, Landing page matching design mockup, and static informational pages.
- **Core Discovery & Subtopic Reader:** 7 canonical societal themes, reading time estimator, sticky editorial left sidebar, and rich Markdown articles with superscript citation jump anchors.
- **Admin CMS & Authentication:** Email/password admin authentication with Next.js middleware guards, live split-screen Markdown preview, inline citation management, and Supabase Storage asset uploading.
- **Full-Text Search & Civic Feedback:** Bilingual PostgreSQL tsvector search with `Cmd+K` quick modal and dedicated `/search`, in-article binary feedback with qualitative comments, anti-spam topic suggestions (`/magmungkahi`), and admin triage dashboards.
- **Reading Tools & Analytics:** 2.5px fixed scroll depth progress bar, broadsheet `@media print` layout, related subtopics recommendation engine, unified social share popover, and first-party privacy-preserving platform analytics dashboard.

**Stats:**
- 132 files created/modified
- 9,108 lines of TypeScript (`src/`)
- 6 phases, 18 plans, 37 requirements satisfied
- Git range: `feat(01-01)` → `feat(06-03)`

**What's next:** v2.0 Release (Role-based access control, dynamic multilingual toggle, community discussions, and OAuth login)

---
