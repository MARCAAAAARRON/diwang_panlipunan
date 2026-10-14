---
target: src/app/topics/[topic]/[subtopic]/page.tsx
total_score: 36
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 1
target_identity: "file:C:\\Diwang Panlipunan\\src\\app\\topics\\[topic]\\[subtopic]\\page.tsx"
target_fingerprint: "sha256:2020899748e9e3b5a390124f965e605e56644c8f4bd2520721b35aaa011df0ff"
target_path: "C:\\Diwang Panlipunan\\src\\app\\topics\\[topic]\\[subtopic]\\page.tsx"
timestamp: 2026-10-14T22-54-47Z
slug: src-app-topics-topic-subtopic-page-tsx
closed: true
---
# Design Critique: Subtopic Reading Experience

Method: dual-agent (A: browser-visual-inspector · B: deterministic-cli-detector)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|:-----:|-----------|
| 1 | Visibility of System Status | 4/4 | 2.5px scroll progress bar tracks reading depth via RAF; reading time estimate is prominent; link copy toast provides instant confirmation. |
| 2 | Match System / Real World | 4/4 | Broadsheet journalistic typography, academic citation numbering, and Filipino editorial terms match student expectations. |
| 3 | User Control and Freedom | 3/4 | Adjacent subtopic curriculum pagination and drawer navigation are clear; missing quick scroll-to-top control on long-form articles. |
| 4 | Consistency and Standards | 3/4 | Flat broadsheet tokens strictly applied; minor font size ramp drift (literal 10px and 11px classes instead of 12px/13px tokens). |
| 5 | Error Prevention | 4/4 | Strict regex slug validation, notFound() guards, honeypot anti-spam, and local vote locking on feedback. |
| 6 | Recognition Rather Than Recall | 4/4 | Left sticky editorial sidebar keeps topic context visible; breadcrumbs orient position; related cards display thematic badges. |
| 7 | Flexibility and Efficiency | 3/4 | Cmd+K global search, print layout, and native share dialog; sidebar could offer direct anchor jump to citations list. |
| 8 | Aesthetic and Minimalist Design | 4/4 | Disciplined broadsheet publication aesthetic: zero drop shadows, zero pill-boxes, 68ch maximum reading column. |
| 9 | Error Recovery | 4/4 | Graceful fallback on missing articles with direct return navigation to topic catalog. |
| 10 | Help and Documentation | 3/4 | Citations section provides clear external references; could include a subtle reading orientation tooltip for students. |
| **Total** | | **36/40** | **Strong / Production-Grade Craft** |

---

## Design Specificity Verdict

**Authored for Diwang Panlipunan:** The subtopic reading layout is deeply grounded in Philippine public social inquiry. The interplay of Source Serif 4 headlines, Public Sans body typography at a disciplined 68ch line length, topic-accented banner overlays, and journal-grade academic citation jump anchors feels unmistakably like an authentic civic educational review rather than a generic tech blog.

**Deterministic Scan Findings:**
The automated detector scanned `src/app/topics/[topic]/[subtopic]/page.tsx` and related reading components (`src/components/reading/*`), detecting 7 items:
- **1 Warning (`side-tab`):** `src/components/reading/markdown-renderer.tsx:116` uses `border-l-4` on blockquotes, which triggers the AI side-tab detector. `DESIGN.md` specifies a `3px solid left border in --color-primary-large`.
- **6 Advisories (`design-system-font-size`):** Micro-labels in `article-actions.tsx:105, 130` (`text-[10px]`), `article-header.tsx:113` (`text-[11px]`), `markdown-renderer.tsx:107` (`text-[16px]`), `reading-feedback.tsx:168` (`text-[11px]`), and `related-subtopics.tsx:38` (`text-[11px]`) sit outside the documented typography scale.

---

## Overall Impression

A dignified, scholarly reading experience that treats Filipino learners with intellectual respect. The visual chrome recedes gracefully to foreground investigative depth. The primary opportunities are aligning blockquote border width with the 3px `DESIGN.md` specification, standardizing micro-labels to the 12px `tag-label` and 13px `caption-citation` scale, and providing a discreet scroll-to-top control for long-form reading sessions.

---

## What's Working Well

1. **Typographic Rhythm & Scanability:** Body copy set at 17px with 1.7 line height constrained to `max-w-[68ch]` provides an optimal reading cadence that prevents cognitive fatigue during 8+ minute analytical reads.
2. **Academic Citations & Superscript Anchors:** Superscript numbers `[^1]` smoothly navigate to `#sanggunian` where complete academic and institutional citations are displayed with secure external links.
3. **Broadsheet Print & Reading Progress:** The 2.5px top scroll progress bar gives readers an immediate sense of reading depth, while the dedicated `@media print` stylesheet strips site navigation for clean black-on-white physical study handouts.

---

## Priority Issues

- **[P1] Blockquote border width discrepancy:** `markdown-renderer.tsx` applies `border-l-4` (4px) instead of the 3px solid border prescribed by `DESIGN.md` (`border-l-[3px] border-[var(--color-primary-large)]`).
  - *Fix:* Replace `border-l-4` with `border-l-[3px]` and verify callout left border consistency.
  - *Suggested command:* `/impeccable polish`
- **[P2] Font size outliers on micro-labels:** Literal classes `text-[10px]` and `text-[11px]` in `article-actions.tsx`, `article-header.tsx`, `reading-feedback.tsx`, and `related-subtopics.tsx` violate the type ramp.
  - *Fix:* Consolidate badges and micro-labels to `text-xs uppercase tracking-wider` (`tag-label`: 12px) and citations to `text-sm` (`caption-citation`: 13px).
  - *Suggested command:* `/impeccable typeset`
- **[P3] Missing "Bumalik sa Itaas" (Back to Top) control:** Long-form subtopics (such as climate change and human rights analyses) require extensive scrolling, forcing readers who reach citations or feedback to manually scroll up to re-access navigation.
  - *Fix:* Introduce a minimalist broadsheet back-to-top jump anchor at the base of the article before the footer or as a subtle bottom-right trigger.
  - *Suggested command:* `/impeccable layout`

---

## Persona Red Flags

- **Persona A (High School Student on Mobile Data):** The mobile layout adapts cleanly to a single column, but micro-actions in the header (print/share popover) need to maintain minimum 44px tap targets on 360px viewports.
- **Persona B (Senior High School Civics Teacher):** The broadsheet print layout successfully eliminates web chrome and formats URLs in parentheses for offline classroom handouts.
- **Persona C (Academic Researcher / University Student):** Superscript citation jumps work reliably, but adding a one-click "Kopyahin ang Sanggunian" (Copy Citation) button would further enhance academic utility.

---

## Minor Observations

- The left sticky sidebar on desktop (1280px+) could highlight which section of the article is currently in view using an IntersectionObserver spy.
- Feedback widget explanation input expands smoothly after clicking "Oo" or "Hindi", keeping initial cognitive load low.
