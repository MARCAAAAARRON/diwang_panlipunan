# Walking Skeleton — Diwang Panlipunan

**Phase:** 1  
**Generated:** 2026-10-14  

## Capability Proven End-to-End

A visitor can load the application, which queries the Supabase database for the 7 canonical societal topics, and view the seeded topics rendered with their editorial styling tokens, typography (Source Serif 4 + Public Sans), and dynamic Lucide icons.

## Architectural Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Framework | Next.js 14+ App Router (TypeScript strict mode) | Server components for optimal SEO, streaming SSR, and broadsheet publication performance |
| Styling | Tailwind CSS + CSS custom property theme tokens | Strict editorial tokens (zero drop shadows, zero rounded pill-boxes, high-contrast dark/light tokens, 7 topic colorways) |
| Typography | Source Serif 4 (serif headings) + Public Sans (body) via `next/font/google` | Dignified publication aesthetic adhering strictly to `DESIGN.md` |
| Database & Auth | Supabase PostgreSQL + `@supabase/ssr` | Cookie-based session synchronization across Server and Client Components, strict RLS, `is_admin()` security definer |
| Directory layout | `src/` layout (`src/app/`, `src/components/`, `src/lib/`, `src/types/`) | Clean workspace root, modular domain-driven component organization |
| Migration strategy | Versioned SQL scripts in `supabase/migrations/` | Dual compatibility for Supabase Dashboard SQL Editor and Supabase CLI |

## Stack Touched in Phase 1

- [ ] Project scaffold (Next.js, TypeScript strict mode, Tailwind CSS, ESLint)
- [ ] Routing — Root layout with Google Fonts and Home route (`src/app/page.tsx`)
- [ ] Database — 6 Supabase tables with RLS + `is_admin()` + automated profile trigger + 7 canonical themes seed data
- [ ] UI — Broadsheet topic cards rendered with CSS variable theme tokens and Lucide React icons
- [ ] Local Full-Stack Run — Clean build and lint (`npm run build` and `npm run lint`) with database connection verification

## Out of Scope (Deferred to Later Slices)

- Slide-out Content Drawer navigation with nested topic tree (Phase 2)
- Landing page full marketing hero, Tungkol sa Amin, Makipag-ugnayan, and Patakaran sa Privacy (Phase 2)
- Subtopic reading view, Markdown article renderer, and academic citation jumps (Phase 3)
- Admin login interface, session middleware, and Markdown CMS editor (Phase 4)
- PostgreSQL tsvector full-text search, binary feedback widget, and suggestion box (Phase 5)
- Reading progress indicator, print/PDF stylesheets, deep links with Open Graph metadata, and analytics (Phase 6)

## Subsequent Slice Plan

Each later phase adds one vertical slice on top of this skeleton without altering its architectural decisions:
- **Phase 2:** Global Shell, Navigation & Static Pages
- **Phase 3:** Core Discovery & Subtopic Reading Experience
- **Phase 4:** Admin Authentication & Content Management System
- **Phase 5:** Full-Text Search, Feedback & Suggestion Box
- **Phase 6:** Reading Tools, Social Sharing, Polish & Analytics
