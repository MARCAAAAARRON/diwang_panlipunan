---
phase: 02-global-shell-navigation-static-pages
plan: 02
subsystem: ui
tags: [drawer, navigation, nilalaman, accordion, accessibility, routes]

# Dependency graph
requires:
  - 02-01-PLAN.md
provides:
  - DrawerProvider context managing open/close state, route tracking, and active topic accordion
  - ContentDrawer (Nilalaman) component sliding 320px from left over a dark flat scrim
  - Single-topic accordion mechanism displaying the 7 canonical Philippine societal themes and subtopics
  - Active subtopic indicator with 2px green left border, bold text, and highlight background
  - Focus trap, Escape key listener, and body scroll lock for full accessibility
affects:
  - 02-03-PLAN.md
  - 03-core-discovery-subtopic-reading-experience

# Tech tracking
tech-stack:
  added: []
  patterns:
    - React Context with safe fallback values preventing conditional hook errors
    - Keyboard focus-trap cycling Tab/Shift+Tab and releasing focus on Escape
    - Single-topic accordion auto-expanding to match the active route pathname

key-files:
  created:
    - src/types/navigation.ts
    - src/lib/navigation-data.ts
    - src/components/navigation/drawer-context.tsx
    - src/components/navigation/content-drawer.tsx
  modified:
    - src/app/layout.tsx
    - src/components/navigation/header.tsx

key-decisions:
  - "D-04: Left slide-out drawer (320px width) rendered over a flat dark scrim without blur."
  - "D-05: Single-topic accordion expansion where expanding one topic collapses any previously open topic."
  - "D-06: Active subtopics highlighted with 2px left border in --color-primary-large and --color-highlight background."
  - "D-07: Added focus trapping, Escape listener, and body scroll lock for keyboard/screen reader compliance."

requirements-completed:
  - NAV-01
  - NAV-02
  - NAV-03

# Metrics
duration: 10min
completed: 2026-10-14
---

# Plan 02-02 Summary: Content Drawer (`Nilalaman`) & Nested Topic Navigation

**Delivered the slide-out Content Drawer (`Nilalaman`), single-topic accordion tree for the 7 societal themes, route detection with active subtopic highlighting, and accessible focus management.**

## Performance

- **Duration:** 10 min
- **Tasks:** 2 completed
- **Files created/modified:** 6
- **Build verification:** `next build` passed with 0 errors

## Accomplishments

- **Navigation Types & Canonical Data (`NAV-02`, `D-04`):** Established `DrawerTopicItem` and `DrawerSubtopicItem` types with full static fallback array for all 7 Philippine societal themes and 21 subtopics matching `00003_seed_data.sql`.
- **Drawer State Management (`D-07`):** Created `DrawerProvider` context managing `isOpen`, active accordion topic, auto-closing on route navigation, and locking `document.body` scroll while open.
- **Content Drawer Component (`NAV-01`, `NAV-02`, `NAV-03`, `D-04`, `D-05`, `D-06`):**
  - Left-sliding 320px drawer with header `"Nilalaman"` and close button (`X`).
  - Single-topic accordion displaying numbered topics (01 to 07) with chevrons.
  - Subtopics rendered under a vertical guide line; active subtopic styled with a 2px left border in `--color-primary-large` (`#118B50`), semi-bold text, and `--color-highlight` background.
  - Footer with `"Pakikipag-ugnayan"` mail link.
- **Accessibility & Focus Trap (`D-07`):** Traps keyboard focus inside drawer while open, listens for `Escape` keypress, and closes smoothly on dark scrim backdrop click.
- **Global Integration:** Wired hamburger button in `<Header />` to `useDrawer().openDrawer()` and wrapped the application shell in `src/app/layout.tsx`.

## Verification

- `npm run build` completed with 0 errors.
- ESLint and TypeScript validations passed cleanly.
