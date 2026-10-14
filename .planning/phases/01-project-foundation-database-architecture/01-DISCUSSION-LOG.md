# Phase 1: Project Foundation & Database Architecture - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-10-14  
**Phase:** 01-project-foundation-database-architecture  
**Areas discussed:** Project Directory Structure, Supabase Migrations & SQL Setup, Initial Topic Seeding  

---

## Project Directory Structure

### Application Root Directory

| Option | Description | Selected |
|--------|-------------|:---:|
| `src/` directory layout | Next.js with `src/app`, `src/components`, `src/lib`, `src/types` for clean separation | ✓ |
| Root-level layout | `app/`, `components/`, `lib/` placed directly in workspace root | |

**User's choice:** `src/` directory layout  
**Notes:** Keeps root clean, separating project config from application source code.

### Component Organization

| Option | Description | Selected |
|--------|-------------|:---:|
| Domain-driven modular structure | `components/ui/`, `components/navigation/`, `components/topics/`, `components/reading/` | ✓ |
| Flat structure | All components in a single `components/` directory | |

**User's choice:** Domain-driven modular structure  
**Notes:** Facilitates clear boundaries between design tokens, global shell, reading view, and admin modules.

### Path Aliases

| Option | Description | Selected |
|--------|-------------|:---:|
| Standard `@/*` path alias | Mapping to `./src/*` for clean cross-module imports | ✓ |
| Relative imports only | Using relative paths (`../../`) without alias | |

**User's choice:** Standard `@/*` path alias  

### TypeScript Management

| Option | Description | Selected |
|--------|-------------|:---:|
| Dedicated TypeScript definitions | `types/database.ts` for Supabase tables and `types/content.ts` for UI models | ✓ |
| Inline types | Define types inside individual component and library files | |

**User's choice:** Dedicated TypeScript definitions  

---

## Supabase Migrations & SQL Setup

### SQL Migration File Organization

| Option | Description | Selected |
|--------|-------------|:---:|
| Versioned migration files in `supabase/migrations/` | Clean chronological scripts (`00001_initial_schema.sql`, `00002_rls_and_auth.sql`, etc.) | ✓ |
| Single unified `schema.sql` | Everything in one consolidated SQL script in project root | |

**User's choice:** Versioned migration files in `supabase/migrations/`  
**Notes:** Promotes maintainability and clear provenance of schema, RLS, and seed data.

### Supabase Client Library

| Option | Description | Selected |
|--------|-------------|:---:|
| `@supabase/ssr` with `createServerClient` and `createBrowserClient` | Official Next.js App Router cookie auth pattern | ✓ |
| Basic `@supabase/supabase-js` only | Standalone client without SSR cookie session synchronization | |

**User's choice:** `@supabase/ssr` with `createServerClient` and `createBrowserClient`  
**Notes:** Handles cookies and Server Component auth seamlessly.

### Execution Compatibility

| Option | Description | Selected |
|--------|-------------|:---:|
| Dual compatibility | Standard SQL scripts formatted for both Supabase Dashboard SQL Editor and Supabase CLI | ✓ |
| Supabase CLI only | Requiring local dockerized Supabase CLI to execute migrations | |

**User's choice:** Dual compatibility  

### Admin Profile Provisioning

| Option | Description | Selected |
|--------|-------------|:---:|
| Automated profile trigger + admin email grant script | Trigger creates profile on `auth.users` insert; helper script promotes target email | ✓ |
| Manual profile insertion | Manually creating auth user and profile row directly in PostgreSQL table | |

**User's choice:** Automated profile trigger + admin email grant script  

---

## Initial Topic Seeding

### Seeding Scope

| Option | Description | Selected |
|--------|-------------|:---:|
| All 7 canonical themes | Edukasyon, Kalusugan, Ekonomiya, Karapatang Pantao, Kapaligiran, Teknolohiya, Pamahalaan | ✓ |
| Minimal placeholder topics | 2 or 3 topics for initial smoke testing | |

**User's choice:** All 7 canonical themes  
**Notes:** Prepopulates complete thematic foundation.

### Sample Subtopics

| Option | Description | Selected |
|--------|-------------|:---:|
| Include 1-2 realistic sample subtopics per topic | Provides immediate sample content with Markdown, metadata, and citations | ✓ |
| Empty topics only | Seed topics without any initial subtopic articles | |

**User's choice:** Include 1-2 realistic sample subtopics per topic  
**Notes:** Allows immediate verification of article reading, banner colorways, and citation rendering in downstream phases.

### Theme Accent Color Tokens

| Option | Description | Selected |
|--------|-------------|:---:|
| Exact colorway tokens | Map topic slugs to `DESIGN.md` CSS variables (`--topic-edukasyon`, etc.) | ✓ |
| Generic color hex codes | Store raw arbitrary HEX strings in database records | |

**User's choice:** Exact colorway tokens  

### Icon Representation

| Option | Description | Selected |
|--------|-------------|:---:|
| Lucide icon identifier strings | Store standard icon names (e.g. `GraduationCap`, `Scale`, `Landmark`) | ✓ |
| Image URLs only | Require uploaded SVG/PNG icon URLs | |

**User's choice:** Lucide icon identifier strings  

---

## The Agent's Discretion

- Packaging and dependency resolution details for Next.js, Tailwind CSS, Lucide React, and Zod.
- Supabase SSR cookie storage adapter mechanics in `src/lib/supabase/`.

## Deferred Ideas

- None — discussion stayed strictly within Phase 1 scope.
