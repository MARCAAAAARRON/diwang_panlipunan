# Phase 5: Full-Text Search, Feedback & Suggestion Box - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-10-14  
**Phase:** 05-full-text-search-feedback-suggestion-box  
**Areas discussed:** Search UI/Modal & Results, Reader Feedback & Comment Modal, Public Suggestion Box Form, Admin Triage Dashboards  

---

## Full-Text Search Interface & Interaction

| Option | Description | Selected |
|---|---|---|
| Live search modal (Cmd+K) + full results page | Live broadsheet search modal (Cmd+K / click in header) with instant results and keyboard navigation, plus full /search?q=... results page | ✓ |
| Live dropdown menu only | Live dropdown menu directly beneath header search input | |
| Dedicated search results page only | Full-page search view only (/search?q=...) without modal overlay | |

**User's choice:** Live broadsheet search modal (Cmd+K / click in header) with instant results and keyboard navigation, plus full /search?q=... results page.  
**Notes:** Provides fast, keyboard-first exploration while also maintaining a bookmarkable, sharable full search results URL.

---

## In-Article Reader Feedback Handling

| Option | Description | Selected |
|---|---|---|
| Inline expansion on voting | Clicking Oo/Hindi immediately logs vote and reveals an optional comment box ('May nais ka bang idagdag?') | ✓ |
| Instant vote logging only | Binary Oo/Hindi click only without comments | |
| Modal pop-up | Modal dialog appearing after voting | |

**User's choice:** Inline expansion on voting.  
**Notes:** Low-friction, non-intrusive flow that captures both quantitative satisfaction metrics and qualitative reader insights.

---

## Public Topic Suggestion Box Form Structure

| Option | Description | Selected |
|---|---|---|
| Comprehensive civic form at /magmungkahi | Suggested title, category dropdown (7 themes), educational rationale, source links, optional submitter email, and honeypot spam protection | ✓ |
| Minimalist quick form | Topic title, brief explanation, and email only | |
| Two-step wizard | Step 1 (Theme & Title), Step 2 (Rationale & Sources) | |

**User's choice:** Comprehensive civic submission form at /magmungkahi.  
**Notes:** Gathers actionable curricular proposals with educational rationale and primary sources to assist the editorial board.

---

## Admin Community Triage Experience

| Option | Description | Selected |
|---|---|---|
| Dedicated admin tabs (/admin/feedback & /admin/suggestions) | Dedicated tabs for feedback satisfaction rates and suggestion triage with status transitions | ✓ |
| Unified community dashboard | Combined feedback metrics and suggestion triage on a single page | |

**User's choice:** Dedicated admin tabs (/admin/feedback and /admin/suggestions).  
**Notes:** Distinct workspaces for quantitative sentiment review vs proposal triage.

---

## Deferred Ideas
- AI-assisted automated duplicate suggestion clustering (deferred to post-v1).
- Reader notification emails when suggested topics are published (deferred to post-v1).
