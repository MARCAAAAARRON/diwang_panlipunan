# Phase 4: Admin Authentication & Content Management System - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-10-14  
**Phase:** 04-admin-authentication-content-management-system  
**Areas discussed:** Auth/Session policy, CMS Layout & Navigation, Article Markdown Editor & Live Preview, Citations Manager & Media Uploads  

---

## Subtopic Article Markdown Editor Layout

| Option | Description | Selected |
|---|---|---|
| Split-screen side-by-side | Desktop split-screen (Markdown editor on left, live rendered broadsheet preview on right) with tabbed toggle on smaller viewports | ✓ |
| Tabbed editor only | Switch between 'Edit Markdown' and 'Live Preview' tabs | |
| Full-screen distraction-free | Full-screen focused writing mode with preview floating drawer | |

**User's choice:** Split-screen side-by-side on desktop with tabbed toggle on smaller viewports.  
**Notes:** Mirrors the broadsheet rendering of the public reading page so editors see exactly what readers will see in real time.

---

## Publishing Workflow for Subtopic Articles

| Option | Description | Selected |
|---|---|---|
| Explicit Save Draft / Publish toggle | Explicit Save Draft / Publish toggle with automatic reading time calculation from word count (200 wpm) | ✓ |
| Auto-save drafts | Auto-save drafts as typing with a dedicated 'I-publish' / 'I-unpublish' action button | |
| Status dropdown | Single Save button respecting an active status dropdown (Draft, Review, Published) | |

**User's choice:** Explicit Save Draft / Publish toggle with automatic reading time calculation from word count (200 wpm).  
**Notes:** Stored in `read_time_minutes` and displayed prominently on public reading cards and headers.

---

## Citations Management Interface

| Option | Description | Selected |
|---|---|---|
| Inline interactive cards | Inline interactive cards directly on the article edit page (add, edit fields, delete, and reorder sources with immediate feedback) | ✓ |
| Modal drawer | Modal drawer for citations (click 'Pamahalaan ang Sanggunian' to open a focused citation manager modal) | |
| Dedicated sub-tab | Dedicated citations sub-tab on the article editing screen | |

**User's choice:** Inline interactive cards directly on the article edit page.  
**Notes:** Keeps citations alongside the article body for rapid verification against in-text `[^n]` reference tags.

---

## Featured Image & Banner Uploads

| Option | Description | Selected |
|---|---|---|
| Dual-input support | Drag-and-drop file upload to Supabase Storage with live thumbnail preview, PLUS manual URL input option for external image assets | ✓ |
| File upload only | File upload only to Supabase Storage bucket with auto-generated public CDN URL | |
| Image URL only | Image URL link input only (relying on hosted external editorial assets) | |

**User's choice:** Dual-input support (Drag-and-drop file upload to Supabase Storage with live thumbnail preview, PLUS manual URL input option).  
**Notes:** Provides maximum flexibility for both uploaded photography and vetted external archival imagery.

---

## Deferred Ideas
- Multi-author collaborative concurrent editing (deferred to post-v1).
- Version history diffs and revision rollback (deferred to post-v1).
