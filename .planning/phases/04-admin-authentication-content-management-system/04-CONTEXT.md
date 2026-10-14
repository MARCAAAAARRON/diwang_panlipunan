# Phase 4: Admin Authentication & Content Management System - Context

**Gathered:** 2026-10-14  
**Status:** Ready for planning  

<domain>
## Phase Boundary

Phase 4 delivers administrative authentication, session security, and a full-featured editorial Content Management System (CMS) for Diwang Panlipunan. It provides the tools necessary for editors and administrators to securely log in, manage the 7 thematic topics, write and edit subtopic articles with live Markdown preview, curate verified academic citations, and upload visual assets to Supabase Storage.

Requirements addressed:
- **AUTH-01**: Admin login at `/admin/login` using email and password via Supabase Auth.
- **AUTH-02**: Session persistence and route protection across all `/admin/*` routes via Next.js middleware.
- **AUTH-03**: Database enforcement of Row Level Security (RLS) restricting mutations to verified `is_admin()` profiles.
- **AUTH-04**: Secure admin logout mechanism from any admin interface screen.
- **CMS-01**: Thematic topics management (view, edit details, reorder, update publication status).
- **CMS-02**: Subtopic articles management (create, edit, publish/unpublish, delete) with live Markdown preview and read time calculation.
- **CMS-03**: Citations management (add, edit, reorder, and delete academic sources attached to subtopics).
- **CMS-04**: Image asset management (upload cover photos and topic banners to Supabase Storage with preview and URL association).

Out of scope:
- Public full-text search indexing (Phase 5).
- Reader feedback submission triage dashboard and suggestions inbox (Phase 5).
- PDF export and reading progress bars (Phase 6).
</domain>

<decisions>
## Implementation Decisions

### 1. Admin Authentication & Session Security
- **D-01 (Login Interface):** Dedicated editorial login screen at `/admin/login` adhering to broadsheet typography and contrast tokens. Features email and password fields, password visibility toggle, clear Filipino error messages (e.g. invalid credentials, unverified admin status), and a "Bumalik sa Website" return link.
- **D-02 (Middleware Protection):** Next.js middleware intercepts all `/admin/*` routes (except `/admin/login`). Checks for an active Supabase Auth session and verifies that the user profile has `role = 'admin'` via the database. Unauthenticated or non-admin attempts are redirected to `/admin/login?next=[path]` with an explanatory query message.
- **D-03 (Admin Logout):** Global admin header includes the authenticated admin's email/name and a one-click "Mag-logout" action that invalidates the Supabase session, purges cookies, and redirects safely to `/admin/login`.

### 2. CMS Layout & Navigation Shell
- **D-04 (Admin Broadsheet Layout):** Unified `/admin` layout featuring an editorial administrative top-bar / header:
  - Brand heading: `DIWANG PANLIPUNAN • TANGGAPAN NG PATNUGOT` (Editorial Office).
  - Navigation tabs: `Mga Paksa` (`/admin/topics`), `Mga Aralin` (`/admin/subtopics`), and `Tingnan ang Website` (`/` or `/home`).
  - Active tab highlighting and broadsheet borders (`border-[var(--color-border)]`).

### 3. Subtopic Article Markdown Editor & Live Preview
- **D-05 (Split-Screen Workspace):** Subtopic article editing interface (`/admin/subtopics/new` and `/admin/subtopics/[id]/edit`) provides:
  - **Desktop (1024px+):** Side-by-side split screen. Left side: Markdown textarea with formatting helper toolbar (Headings, Bold, Italic, Pullquote, Stat Box `TALA NG DATOS`, Citation Superscript `[^n]`). Right side: Synchronized live broadsheet preview matching the public `MarkdownRenderer`.
  - **Mobile / Narrow screens:** Toggleable tabbed interface ("I-edit ang Markdown" / "Pagsusuri / Preview").
- **D-06 (Publishing Workflow & Metrics):**
  - Explicit Save Draft / Publish toggle.
  - Automatic calculation of estimated reading time based on total word count (~200 words per minute), stored in `read_time_minutes`.
  - Visual status badge: `Naka-draft` (amber) vs `Nailathala` (green).

### 4. Citations Management
- **D-07 (Inline Citations Editor):** Directly beneath the article Markdown editor, admins can manage associated academic sources:
  - Interactive cards/table listing existing sources in curriculum order (`order_index`).
  - Inline fields: Author, Title, Publication/Bureau, Year, and External URL.
  - Controls: Add New Citation, Remove Citation, and Reorder (Move Up / Down).
  - Automatic URL protocol validation (`http://` or `https://` required).

### 5. Media & Storage Uploads
- **D-08 (Dual-Input Asset Upload):**
  - Topic banners and article featured photos support both direct file drag-and-drop / file selector targeting Supabase Storage bucket (`article-covers`), AND a manual URL input for external editorial photography.
  - Instant image preview thumbnail with dimension and file size checks (max 5MB, JPG/PNG/WebP).
  - Resilient local fallback representations when running offline.

</decisions>

<canonical_references>
## Canonical References & Wireframes

- `docs/DESIGN.md`: Broadsheet editorial color tokens, typography, zero drop shadows.
- `docs/screens/ReadingPage.png`: Public reading view structure that the CMS live preview must mirror.
- `src/lib/supabase/server.ts` & `src/lib/supabase/client.ts`: Supabase client utilities for SSR and browser contexts.
- `src/types/database.ts`: PostgreSQL schema for `topics`, `subtopics`, `sources`, and `profiles`.
</canonical_references>

<verification_checklist>
## Phase 4 Verification Gates

1. **Authentication Gate:**
   - Unauthenticated access to `/admin` redirects to `/admin/login`.
   - Logging in with valid admin credentials grants access to `/admin/topics` and `/admin/subtopics`.
   - Logging out clears session and redirects to `/admin/login`.
2. **CMS Topics Gate:**
   - Admin can view all 7 topics, update descriptions/colors, and toggle publication status.
3. **CMS Subtopics Gate:**
   - Admin can create a new article with live Markdown preview and auto-calculated read time.
   - Admin can switch between Draft and Published statuses.
4. **Citations Gate:**
   - Admin can add, edit, reorder, and remove citations on any article.
5. **Media Gate:**
   - Cover image upload uploads file to Supabase Storage and displays preview thumbnail.
</verification_checklist>
