# Roadmap: Diwang Panlipunan

## Overview

Diwang Panlipunan is built through a vertical MVP delivery model spanning 6 focused phases. We establish the Next.js App Router and Supabase database architecture with strict Row Level Security, craft the high-contrast broadsheet editorial global shell and static pages, deliver rich Markdown topic/subtopic reading with verified citations, implement secure administrative content management, integrate PostgreSQL full-text search with reader feedback and suggestions, and polish the platform with reading tools, print stylesheets, deep links, and analytics.

## Phases

- [x] **Phase 1: Project Foundation & Database Architecture** — Workspace setup, design tokens, fonts, and Supabase database schema with RLS
- [x] **Phase 2: Global Shell, Navigation & Static Pages** — Content Drawer, dark/light theme switcher, and Landing, About, Contact, and Privacy pages
- [x] **Phase 3: Core Discovery & Subtopic Reading Experience** — 7 thematic topic hubs, Markdown article reader, topic banner accents, and citations
- [x] **Phase 4: Admin Authentication & Content Management System** — Secure admin auth, topic/subtopic Markdown CMS, citations manager, and media upload
- [x] **Phase 5: Full-Text Search, Feedback & Suggestion Box** — PostgreSQL tsvector search, reader feedback ("Oo/Hindi"), suggestion form, and admin triage
- [x] **Phase 6: Reading Tools, Social Sharing, Polish & Analytics** — Reading progress, print/PDF layout, deep links with OG meta, related topics, and admin metrics

## Phase Details

### Phase 1: Project Foundation & Database Architecture
**Goal**: Establish the Next.js App Router workspace with TypeScript, Tailwind CSS, custom CSS variable theme tokens, Google Fonts (Source Serif 4 & Public Sans), and apply the Supabase PostgreSQL database schema with RLS and `is_admin()` security function.  
**Mode**: mvp  
**Depends on**: Nothing (greenfield foundation)  
**Requirements**: AUTH-03  
**Success Criteria** (what must be TRUE):
  1. Next.js App Router project runs cleanly with TypeScript strict mode, Tailwind CSS, and CSS variable color tokens defined in DESIGN.md.
  2. Source Serif 4 and Public Sans fonts are configured and rendered across the application.
  3. Supabase client is initialized for server and client components with environment variable validation.
  4. Complete database schema is deployed with tables (`profiles`, `topics`, `subtopics`, `sources`, `feedback`, `suggestions`), RLS enabled on every table, user profile trigger configured, and `is_admin()` function active.
**Plans**: 2 plans

Plans:
- Wave 1:
  - [x] 01-01: Initialize Next.js project, typography, design tokens, and Supabase client configuration
- Wave 2 *(blocked on Wave 1 completion)*:
  - [x] 01-02: Deploy Supabase database migration scripts, RLS policies, and database seed data



### Phase 2: Global Shell, Navigation & Static Pages
**Goal**: Deliver the responsive editorial global shell, accessible slide-out Content Drawer, persistent dark/light theme switcher, and all static informational pages including the Landing page matching design mocks.  
**Mode**: mvp  
**Depends on**: Phase 1  
**Requirements**: NAV-01, NAV-02, NAV-03, NAV-04, PAGE-01, PAGE-02, PAGE-03, PAGE-04  
**Success Criteria** (what must be TRUE):
  1. User can open and close the Content Drawer from any page via hamburger menu and see all 7 topics, subtopics, and static links with active page highlighting.
  2. User can toggle between Light and Dark editorial color schemes, with state persisted in localStorage and system preferences respected.
  3. Landing page faithfully renders the broadsheet layout, hero typography, featured issue cards, and callouts matching `docs/screens/Landing.png`.
  4. Tungkol sa Amin (About), Makipag-ugnayan (Contact), and Patakaran sa Privacy (Privacy Notice) pages render clean editorial content.
**Plans**: 3 plans

Plans:
- Wave 1:
  - [x] 02-01: Build global layout shell, header, footer, and theme provider with dark/light mode toggle
- Wave 2 (depends on 02-01):
  - [x] 02-02: Implement slide-out Content Drawer navigation with nested topic hierarchy and route detection
  - [x] 02-03: Implement Landing page (`docs/screens/Landing.png`), About, Contact, and Privacy Notice pages

### Phase 3: Core Discovery & Subtopic Reading Experience
**Goal**: Enable readers to browse 7 major societal topics and read comprehensive Markdown subtopic articles styled with topic-specific banner accent colors and verified academic citations.  
**Mode**: mvp  
**Depends on**: Phase 2  
**Requirements**: DISC-01, DISC-02, READ-01, READ-02, SRC-01, SRC-02, SRC-03  
**Success Criteria** (what must be TRUE):
  1. User can browse the 7 thematic topic cards showing Filipino descriptions, iconography, and counts of published subtopic articles.
  2. User can open and read a subtopic article with title, executive summary, estimated reading time, and formatted Markdown content (headings, blockquotes, lists).
  3. Article header displays the dynamic accent color corresponding to the active topic's theme token.
  4. Citations section lists all references with authors, publication names, dates, and secure external links (`rel="noopener noreferrer"`), with smooth in-text citation jumps.
**Plans**: 3 plans

Plans:
- Wave 1:
  - [x] 03-01: Build Topics browse page and individual topic directory views with publication status filters
- Wave 2 (depends on 03-01):
  - [x] 03-02: Build subtopic article reader with Markdown rendering, executive summary, read time, and banner theming
  - [x] 03-03: Implement citations component with external link safety and in-text citation smooth scrolling

### Phase 4: Admin Authentication & Content Management System
**Goal**: Implement secure email/password administrative authentication and a comprehensive CMS for managing topics, subtopics with live Markdown preview, citation sources, and cover image uploads.  
**Mode**: mvp  
**Depends on**: Phase 3  
**Requirements**: AUTH-01, AUTH-02, AUTH-04, CMS-01, CMS-02, CMS-03, CMS-04  
**Success Criteria** (what must be TRUE):
  1. Admin can log in at `/admin/login` and access protected routes; non-admin users or unauthenticated visitors are blocked by middleware.
  2. Admin can view, edit, reorder, and manage metadata for all 7 topics.
  3. Admin can create, edit, publish/unpublish, and delete subtopic articles with slug generation and real-time Markdown preview.
  4. Admin can add, update, reorder, and remove citations attached to any subtopic.
  5. Admin can upload topic cover images and banners to Supabase Storage with direct URL linking.
  6. Admin can log out safely from any admin interface.
**Plans**: 4 plans

Plans:
- Wave 1:
  - [x] 04-01: Admin Authentication, Session Middleware & Protected Admin Shell
  - [x] 04-02: Thematic Topics Management & Asset Storage Upload
- Wave 2 (depends on 04-01, 04-02):
  - [x] 04-03: Subtopic Article Management & Split-Screen Live Markdown Editor
  - [x] 04-04: Citations Management & Academic Evidentiary Curation

### Phase 5: Full-Text Search, Feedback & Suggestion Box
**Goal**: Implement PostgreSQL tsvector full-text search across topics and subtopics, an in-article reader feedback widget, a public topic suggestion submission form, and admin triage dashboards.  
**Mode**: mvp  
**Depends on**: Phase 4  
**Requirements**: SRCH-01, SRCH-02, SRCH-03, FDBK-01, FDBK-02, SUGG-01, SUGG-02, TRG-01, TRG-02  
**Success Criteria** (what must be TRUE):
  1. User can search keywords via the global search input and receive instantaneous results queried via PostgreSQL tsvector (`simple` config) with matching excerpts.
  2. Reader can submit binary feedback ("Oo / Hindi nakatulong") and optional comments on subtopic articles, protected by client and server rate limits.
  3. User can submit a social issue suggestion ("Magmungkahi ng Paksa") with Zod validation.
  4. Admin can view aggregated feedback statistics and triage suggestions across statuses (Pending, In Review, Implemented, Dismissed).
**Plans**: 3 plans

Plans:
- Wave 1:
  - [x] 05-01: Full-Text Search Engine, Live Search Modal & Results Page
  - [x] 05-02: In-Article Reader Feedback & Public Topic Suggestion Box
- Wave 2 (depends on 05-01, 05-02):
  - [x] 05-03: Admin Feedback Analytics & Topic Suggestion Triage Dashboards

### Phase 6: Reading Tools, Social Sharing, Polish & Analytics
**Goal**: Enhance the reading experience with scroll depth indicators, print/PDF stylesheets, related subtopic recommendations, shareable deep links with Open Graph metadata, and internal platform analytics.  
**Mode**: mvp  
**Depends on**: Phase 5  
**Requirements**: READ-03, READ-04, READ-05, NAV-05, ANLY-01  
**Success Criteria** (what must be TRUE):
  1. Reader sees an unobtrusive reading depth indicator while scrolling through long-form articles.
  2. Reader can print or export articles to PDF with a dedicated print stylesheet that strips site navigation and headers.
  3. Reader can copy shareable article deep links with clipboard feedback toast, and links generate rich Open Graph preview cards.
  4. Related subtopics component suggests relevant articles at the base of each reading view.
  5. Admin can view internal platform metrics including page view counters, feedback satisfaction ratios, and search trends.
**Plans**: 3 plans

Plans:
- Wave 1:
  - [x] 06-01: Reading Depth Indicator & Broadsheet Print/PDF Layout
  - [x] 06-02: Related Subtopics Recommendation Engine & Social Sharing
- Wave 2 (depends on 06-01, 06-02):
  - [x] 06-03: Internal Platform Analytics Dashboard

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Project Foundation & Database Architecture | 2/2 | Complete | 2026-10-14 |
| 2. Global Shell, Navigation & Static Pages | 3/3 | Complete | 2026-10-14 |
| 3. Core Discovery & Subtopic Reading Experience | 3/3 | Complete | 2026-10-14 |
| 4. Admin Authentication & Content Management System | 4/4 | Complete | 2026-10-14 |
| 5. Full-Text Search, Feedback & Suggestion Box | 3/3 | Complete | 2026-10-14 |
| 6. Reading Tools, Social Sharing, Polish & Analytics | 3/3 | Complete | 2026-10-14 |
