# Phase 2: Global Shell, Navigation & Static Pages - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-10-14  
**Phase:** 02-global-shell-navigation-static-pages  
**Areas discussed:** Landing Page & Route Hierarchy, Content Drawer (Nilalaman) Behavior, Dark/Light Theme Switcher & FOUC Prevention, Contact Page Content Structure  

---

## Landing Page & Route Hierarchy

### Route Hierarchy and Primary Navigation Flow

| Option | Description | Selected |
|--------|-------------|:---:|
| Root `/` Landing page + `/home` portal | Root `/` is the Landing page (`Landing.png`) with "Simulan ang pagbasa" linking to `/home` (portal feed), with Filipino routes `/tungkol-sa-amin`, `/makipag-ugnayan`, and `/patakaran-sa-privacy` (and `/about`, `/contact`, `/privacy` as redirects). | ✓ |
| Root `/` is directly the Home portal | Root `/` is directly the Home portal (`Home.png`), and the Landing page lives at `/landing` or `/welcome`. | |

**User's choice:** Root `/` Landing page + `/home` portal  
**Notes:** Provides a dedicated public-facing introduction for civic engagement, directing active readers directly into the topic portal via primary CTA.

---

## Content Drawer (`Nilalaman`) Behavior

### Topic Tree Expansion Mechanics

| Option | Description | Selected |
|--------|-------------|:---:|
| Single-topic accordion with active route auto-expansion | Accordion with one topic open at a time; auto-expand the topic containing the currently active subtopic route; clicking an unexpanded topic reveals its subtopics. | ✓ |
| Independent accordions | Multiple topics can be expanded simultaneously. | |
| Always expanded list | All 7 topics and all subtopics visible in a scrollable list without accordion collapse. | |

**User's choice:** Single-topic accordion with active route auto-expansion  
**Notes:** Keeps the 320px drawer tidy and readable without excessive vertical scrolling, while immediately giving the reader context about where their current article sits in the hierarchy.

---

## Dark/Light Theme Switcher & FOUC Prevention

### Theme Switching Architecture & Initial Load Strategy

| Option | Description | Selected |
|--------|-------------|:---:|
| Zero-FOUC Inline Head Script | Inline script in `<head>` reading `localStorage` + `prefers-color-scheme` to set `data-theme` attribute before hydration (guaranteeing zero FOUC), with Sun/Moon toggle in top bar and Drawer. | ✓ |
| Client-only Theme Provider | React-only theme provider mounting on client with possible flash of light parchment before applying dark mode. | |

**User's choice:** Zero-FOUC Inline Head Script  
**Notes:** Ensures immediate high-contrast broadsheet rendering on initial HTML parse before client bundle execution.

---

## Static Pages Content & Structure

### Makipag-ugnayan (`/makipag-ugnayan`) Page Structure

| Option | Description | Selected |
|--------|-------------|:---:|
| Purely editorial contact info & channel pointers | Official email (`ugnayan@diwangpanlipunan.ph`), institutional editorial desk, contributor guidelines, and pointer to the suggestion mechanism. | ✓ |
| Editorial contact info + interactive contact form | Editorial contact info plus a client-side contact inquiry form with name, email, and message inputs. | |

**User's choice:** Purely editorial contact info & channel pointers  
**Notes:** Matches the broadsheet journalistic tone and avoids redundant submission channels (the dedicated suggestion box in Phase 5 handles public thematic proposals).

---

## The Agent's Discretion

- Visual styling of the documentary photography card in the Landing page hero.
- Exact local fallback mock data structures for topics and subtopics when rendering before Supabase database queries.
- CSS transitions and timing curves adhering strictly to flat broadsheet aesthetics (no bouncy springs or lavish blurs).

## Deferred Ideas

- Full-text search execution with instant query results dropdown is deferred to Phase 5 (`SRCH-01..03`).
- Subtopic reading page Markdown parser and citation jumping is deferred to Phase 3 (`READ-01..02`, `SRC-01..03`).
