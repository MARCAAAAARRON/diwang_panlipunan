# Phase 2: Global Shell, Navigation & Static Pages - Context

**Gathered:** 2026-10-14  
**Status:** Ready for planning  

<domain>
## Phase Boundary

Phase 2 delivers the complete responsive editorial global shell, navigation systems, dark/light theme switching with zero FOUC, and all primary static pages for Diwang Panlipunan:
1. **Global Responsive Shell & Header (`NAV-01`):** Persistent broadsheet header with hamburger menu button for opening the Content Drawer, brand wordmark, search input placeholder (`Search topics`), theme toggle button, and user avatar/auth entry.
2. **Slide-Out Content Drawer `Nilalaman` (`NAV-02`):** Accessible left-side drawer (320px) listing the 7 societal topics and their nested subtopics with accordion expansion, active subtopic highlighting, and smooth transitions over a flat dark scrim.
3. **Dark/Light Theme Switcher (`NAV-03`):** High-contrast editorial theme switcher persisted in `localStorage` with system preference detection and an inline script in `<head>` ensuring zero flash of unstyled content (FOUC).
4. **Breadcrumb Navigation (`NAV-04`):** Clear navigational breadcrumbs for reading views (Home > Topic > Subtopic).
5. **Landing Page (`PAGE-01`):** Public broadsheet editorial landing page faithfully implementing `docs/screens/Landing.png` with hero section, 7 topics overview, core pedagogical values, and invitation callout.
6. **Tungkol sa Amin Page (`PAGE-02`):** Educational about page implementing `docs/screens/About.png` with mission, vision, 5 core pedagogical values, and curriculum alignment notes.
7. **Makipag-ugnayan Page (`PAGE-03`):** Editorial contact page providing official contact channels, submission guidance, and pointers to the suggestion box.
8. **Patakaran sa Privacy Page (`PAGE-04`):** Privacy policy page outlining anonymous reader feedback storage, cookie handling, and user data rights.

</domain>

<decisions>
## Implementation Decisions

### Route Hierarchy & Landing Page Flow
- **D-01: Root `/` Route as Landing Page:** The root URL `/` serves the dedicated public landing page modeled after `docs/screens/Landing.png`.
- **D-02: Portal Feed Route at `/home`:** The "Simulan ang pagbasa" primary call-to-action directs users into `/home` (the main topic portal feed matching `docs/screens/Home.png`).
- **D-03: Filipino Static Slugs with English Redirects:** Primary static page routes use canonical Filipino slugs:
  - `/tungkol-sa-amin` (About) with `/about` rewrite/redirect
  - `/makipag-ugnayan` (Contact) with `/contact` rewrite/redirect
  - `/patakaran-sa-privacy` (Privacy Notice) with `/privacy` rewrite/redirect

### Content Drawer (`Nilalaman`) Behavior
- **D-04: Left Slide-Out with Flat Scrim:** 320px wide left drawer sliding over a flat dark scrim (`rgba(9, 35, 40, 0.6)` without blur) adhering to `docs/screens/Drawer.png` and `DESIGN.md`.
- **D-05: Single-Topic Accordion Expansion:** Only one topic is expanded at a time to prevent vertical overflow and scrolling fatigue.
- **D-06: Active Subtopic Auto-Expansion & Highlighting:** When on a subtopic reading page, the drawer automatically expands the parent topic and highlights the current subtopic with a 2px left border in `--color-primary-large`, semi-bold font weight, and `--color-highlight` background.
- **D-07: Accessibility & Keyboard Navigation:** The drawer traps focus when open, closes on `Escape` keypress or scrim click, locks body scrolling, and provides `aria-expanded` attributes on topic triggers.

### Dark / Light Theme & FOUC Prevention
- **D-08: Zero-FOUC Inline Head Script:** An inline blocking `<script>` placed in `src/app/layout.tsx` checks `localStorage.getItem('theme')` and `window.matchMedia('(prefers-color-scheme: dark)')` to immediately set `document.documentElement.setAttribute('data-theme', theme)` and `document.documentElement.classList.toggle('dark', isDark)` before the browser paints.
- **D-09: Header & Drawer Toggle Controls:** Header features the primary theme switcher with Sun/Moon Lucide icons and English labels ("Dark mode" / "Light mode" per bilingual rule), synchronized via custom state and event dispatching.

### Static Pages & Editorial Layout
- **D-10: Landing Page Components:** Faithful implementation of `Landing.png`:
  - Header bar with brand wordmark, nav links (`Mga Paksa`, `Aklatan`, `Tungkol`), and auth buttons (`Mag-login`, `Mag-register`).
  - Hero section with volume metadata, primary heading "Pag-unawa sa Lipunan, Pagmulat sa Kinabukasan", description, CTAs ("Simulan ang pagbasa", "Tungkol sa Proyekto"), archive callout, and documentary photography card with Quezon City caption.
  - Section `Mga Paksa` listing all 7 topics (01 to 07) with summaries.
  - Section `Mga Pangunahing Simulain` detailing the 5 pedagogical values (Kamalayan, Mapanuring Pag-iisip, Paggalang, Pananagutan, Aksyon at Pakikisangkot).
  - Invitation callout banner with `Mag-login` and `Mag-register` buttons.
  - Editorial broadsheet footer.
- **D-11: About Page (`/tungkol-sa-amin`):** Faithful implementation of `About.png` featuring purpose statement, editorial quote, topic overview, 2-column Mission & Vision, and A-C-R-R-A values cards.
- **D-12: Contact Page (`/makipag-ugnayan`):** Broadsheet editorial contact page with official contact email (`ugnayan@diwangpanlipunan.ph`), institutional background, contributor guidelines, and pointer to the suggestion mechanism.
- **D-13: Privacy Policy (`/patakaran-sa-privacy`):** Clean academic privacy statement covering non-tracking civic commitment, anonymous feedback collection, cookie policies, and reader rights.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design & Screen Specifications
- `docs/DESIGN.md` — Authoritative rules for colors, typography, flat elevation, 6px radius, and bilingual copy conventions.
- `docs/SCREENS.md` — Screen map and detailed structural notes.
- `docs/screens/Landing.png` — Visual reference for the public landing page layout.
- `docs/screens/Drawer.png` — Visual reference for the `Nilalaman` content drawer.
- `docs/screens/About.png` — Visual reference for the About page.

### Architectural & Content Standards
- `docs/PRD.md` — Product requirements, bilingual rules, 7 canonical topics, and core pedagogical values.
- `docs/TRD.md` — Next.js App Router guidelines, client/server boundaries, and component modularity.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/app/globals.css`: Full CSS variable design token definitions for light and dark themes, typography variables, and strict flat styling rules.
- `src/types/database.ts` and `src/types/content.ts`: Type definitions for `Topic`, `Subtopic`, and navigation structures.
- `src/components/ui/topic-icon.tsx`: Dynamic Lucide React icon mapper for the 7 societal themes.
- `supabase/migrations/00003_seed_data.sql`: Canonical topic definitions and slugs (`edukasyon`, `kalusugan`, `ekonomiya`, `karapatang-pantao`, `kapaligiran`, `teknolohiya`, `pamahalaan`).

### Established Patterns
- High-contrast broadsheet editorial style: Zero drop shadows, zero rounded pillboxes, zero glassmorphism or gradients.
- Strict 6px border radius (`rounded-md` / `0.375rem`).
- Bilingual conventions: Filipino for navigation, headings, section titles, and buttons; English for search placeholder (`Search topics`) and theme toggles (`Dark mode`, `Light mode`).

</code_context>

<specifics>
## Specific Ideas

- The Content Drawer data should fetch from Supabase when available, with a resilient local fallback array derived from Phase 1 seed data so the drawer functions seamlessly offline or before database connectivity is configured.
- The theme toggle should feel instantaneous with zero layout shift or color popping.
- The hero image in the Landing page should use Next.js `<Image>` with priority loading and a local high-quality editorial image representation.

</specifics>

<deferred>
## Deferred Ideas

- Search modal execution with full PostgreSQL `tsvector` queries is reserved for Phase 5 (`SRCH-01..03`). The header in Phase 2 includes the visual search input and placeholder.
- Full subtopic Markdown article rendering and citation jumps are reserved for Phase 3 (`READ-01..02`, `SRC-01..03`).

</deferred>

---

*Phase: 02-global-shell-navigation-static-pages*  
*Context gathered: 2026-10-14*
