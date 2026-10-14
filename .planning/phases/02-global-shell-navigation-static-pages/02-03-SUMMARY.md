---
phase: 02-global-shell-navigation-static-pages
plan: 03
subsystem: ui
tags: [landing, broadsheet, editorial, about, contact, privacy, rewrites]

# Dependency graph
requires:
  - 02-01-PLAN.md
provides:
  - Public broadsheet Landing page (/) matching docs/screens/Landing.png
  - Home portal reading feed (/home) matching docs/screens/Home.png
  - Tungkol sa Amin page (/tungkol-sa-amin) matching docs/screens/About.png
  - Makipag-ugnayan editorial contact page (/makipag-ugnayan)
  - Patakaran sa Privacy data protection notice (/patakaran-sa-privacy)
  - Next.js URL rewrites for /about, /contact, and /privacy
  - High-resolution editorial documentary SVG illustration for hero card
affects:
  - 03-core-discovery-subtopic-reading-experience
  - 05-full-text-search-feedback-suggestion-box

# Tech tracking
tech-stack:
  added: []
  patterns:
    - High-contrast broadsheet editorial layouts with strict 6px radius and zero box-shadow
    - Next.js App Router static page generation with metadata and typography tokens
    - Canonical Filipino URL slugs with English route rewrites in next.config.mjs

key-files:
  created:
    - src/app/home/page.tsx
    - src/app/tungkol-sa-amin/page.tsx
    - src/app/makipag-ugnayan/page.tsx
    - src/app/patakaran-sa-privacy/page.tsx
    - next.config.mjs
    - public/images/hero-documentation.svg
  modified:
    - src/app/page.tsx

key-decisions:
  - "D-01/D-10: Public landing page at / faithfully implements Landing.png with hero typography, documentary card, 7 topic overviews, and 5 core pedagogical principles."
  - "D-02: Portal reading feed hosted at /home where 'Simulan ang pagbasa' navigates."
  - "D-03: Used canonical Filipino slugs with English route rewrites in next.config.mjs for /about, /contact, and /privacy."
  - "D-11: Tungkol sa Amin at /tungkol-sa-amin faithfully implements About.png with ACRRA values and mission/vision columns."
  - "D-12/D-13: Implemented Makipag-ugnayan with editorial desk info and Patakaran sa Privacy with non-tracking civic commitment."

requirements-completed:
  - PAGE-01
  - PAGE-02
  - PAGE-03
  - PAGE-04

# Metrics
duration: 15min
completed: 2026-10-14
---

# Plan 02-03 Summary: Broadsheet Landing Page & Static Informational Pages

**Delivered the broadsheet Landing page matching `Landing.png`, the portal feed at `/home`, Tungkol sa Amin matching `About.png`, Makipag-ugnayan, Patakaran sa Privacy, and route rewrites.**

## Performance

- **Duration:** 15 min
- **Tasks:** 3 completed
- **Files created/modified:** 7
- **Build verification:** `next build` generated 9/9 static routes with 0 errors

## Accomplishments

- **Landing Page (`PAGE-01`, `D-01`, `D-10`):**
  - Hero section featuring `"BUKAS NA PUBLIKASYONG SIBIKO • Tomo I • Edisyong Pampubliko"` volume metadata, primary heading `"Pag-unawa sa Lipunan, Pagmulat sa Kinabukasan"`, CTAs (`Simulan ang pagbasa` → `/home`, `Tungkol sa Proyekto` → `/tungkol-sa-amin`), and civic archive callout.
  - Documentary photography card with Quezon City caption and editorial SVG artwork.
  - `Mga Paksa` broadsheet section displaying the 7 canonical societal themes numbered 01 to 07.
  - `Mga Pangunahing Simulain` section highlighting the 5 core pedagogical values (Kamalayan, Mapanuring Pag-iisip, Paggalang, Pananagutan, Aksyon at Pakikisangkot).
  - `Bukas na Paanyaya` banner with `Mag-login` and `Mag-register` actions.
- **Home Portal Feed (`/home`):**
  - Breadcrumbs status bar (`PORTAL NG BAYAN`), featured topic hero banner with reading time, `"Panimulang Gabay"` editorial drop-cap essay, full topic directory table, and reader feedback prompt.
- **Tungkol sa Amin Page (`PAGE-02`, `D-11`):**
  - Implemented `/tungkol-sa-amin` matching `About.png`: Purpose section, editorial quote callout, 7 learning areas, 2-column Mission & Vision cards, A-C-R-R-A values grid, pull quote, and DepEd curriculum alignment notes.
- **Makipag-ugnayan Page (`PAGE-03`, `D-12`):**
  - Broadsheet contact page with editorial email `ugnayan@diwangpanlipunan.ph`, classroom usage guidelines, and suggestion box pointer.
- **Patakaran sa Privacy Page (`PAGE-04`, `D-13`):**
  - Educational privacy statement detailing zero tracking, anonymous feedback handling, localStorage theme persistence, and Philippine Data Privacy Act compliance.
- **Route Rewrites (`D-03`):**
  - Configured `next.config.mjs` with rewrites mapping `/about` → `/tungkol-sa-amin`, `/contact` → `/makipag-ugnayan`, and `/privacy` → `/patakaran-sa-privacy`.

## Verification

- `npm run build` completed successfully, compiling 9 static pages.
- TypeScript strict checking and ESLint completed with 0 errors.
