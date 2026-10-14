---
phase: 02-global-shell-navigation-static-pages
plan: 01
subsystem: ui
tags: [navigation, layout, header, footer, theme, fouc, breadcrumbs, lucide]

# Dependency graph
requires:
  - 01-project-foundation-database-architecture
provides:
  - Zero-FOUC theme detection script in <head>
  - ThemeProvider context with localStorage persistence and system color preference detection
  - ThemeToggle component with Sun/Moon icons and English labels
  - Broadsheet Header with hamburger trigger, brand wordmark, Search topics placeholder, and auth link
  - Editorial Footer with brand summary, Filipino navigation links, contact email, and copyright
  - Reusable Breadcrumbs navigation component with accessible schema
affects:
  - 02-02-PLAN.md
  - 02-03-PLAN.md
  - 03-core-discovery-subtopic-reading-experience

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Blocking inline head script for instant data-theme attribute application before browser paint
    - React ThemeContext with client hydration mismatch guards
    - Broadsheet header and footer using CSS variable design tokens and strict 6px radius

key-files:
  created:
    - src/components/theme/theme-provider.tsx
    - src/components/theme/theme-toggle.tsx
    - src/components/navigation/header.tsx
    - src/components/navigation/footer.tsx
    - src/components/navigation/breadcrumbs.tsx
  modified:
    - src/app/layout.tsx

key-decisions:
  - "D-08: Placed inline blocking head script in layout.tsx to guarantee zero FOUC on dark mode page loads."
  - "D-09: Built ThemeToggle adhering to bilingual guidelines (English 'Dark mode' / 'Light mode' labels)."
  - "D-01/D-09: Implemented persistent broadsheet header with hamburger drawer trigger and 'Search topics' placeholder."

requirements-completed:
  - NAV-01
  - NAV-03
  - NAV-04

# Metrics
duration: 10min
completed: 2026-10-14
---

# Plan 02-01 Summary: Global Shell, Persistent Header, Theme Provider & Zero-FOUC Script

**Delivered the persistent editorial global shell, zero-FOUC dark/light theme switching architecture, broadsheet Header and Footer, and reusable Breadcrumbs navigation component.**

## Performance

- **Duration:** 10 min
- **Tasks:** 3 completed
- **Files created/modified:** 6
- **Build verification:** `next build` passed with 0 errors

## Accomplishments

- **Zero-FOUC Theme Architecture (`NAV-03`, `D-08`):** Implemented an inline script in `<head>` evaluating `localStorage.getItem('theme')` and `window.matchMedia('(prefers-color-scheme: dark)')` to immediately apply `data-theme` and `.dark` before first paint. Created `ThemeProvider` context and accessible `ThemeToggle` button with Lucide icons (`Sun`/`Moon`) and English labels.
- **Persistent Broadsheet Header (`NAV-01`, `D-01`, `D-09`):** Built sticky editorial header with hamburger button (`Menu`), home shortcut (`Home`), serif brand wordmark (`Diwang Panlipunan`), presentational search bar with `"Search topics"` placeholder, theme switcher, and auth avatar link (`User`).
- **Broadsheet Editorial Footer:** Created footer featuring brand tagline, civic mission statement, Filipino navigation links (`Mga Paksa`, `Tungkol sa Amin`, `Makipag-ugnayan`, `Patakaran sa Privacy`), and official contact email (`ugnayan@diwangpanlipunan.ph`).
- **Reusable Breadcrumbs (`NAV-04`):** Created accessible semantic breadcrumbs component (`<nav aria-label="Breadcrumb">` with `<ol>`/`<li>`) supporting hierarchical navigation across articles and static pages.

## Verification

- `npm run build` executed and generated static pages without errors.
- TypeScript compilation and ESLint validation passed cleanly.
