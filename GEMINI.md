<!-- GSD:project-start source:PROJECT.md -->
## Project

**Diwang Panlipunan** ("Pag-unawa sa Lipunan, Pagmulat sa Kinabukasan") is an educational web platform dedicated to raising social awareness, critical consciousness, and informed civic participation among Filipino learners, students, and the public. It curates accessible, balanced, and multi-perspective analyses of contemporary Philippine and global societal issues across 7 core themes, supported by transparent citations, community feedback, and suggestion mechanisms.

**Core Value:** Accessible, credible, and thought-provoking educational content on Philippine societal issues, presented with journalistic integrity, clear citations, and an editorial aesthetic that promotes active learning.
<!-- GSD:project-end -->

<!-- GSD:stack-start source:STACK.md -->
## Technology Stack

- **Framework**: Next.js (App Router), React, TypeScript
- **Styling**: Tailwind CSS, CSS variables for light/dark theme tokens, Lucide React icons
- **Typography**: Source Serif 4 (headings), Public Sans (body) via Google Fonts
- **Backend & Database**: Supabase (PostgreSQL, Auth, Storage)
- **Data Validation & Content**: Zod schemas, react-markdown for rich text rendering
- **Deployment**: Vercel
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

- **Language Conventions**: Filipino for brand names, headers, navigation, buttons, and callout labels; English for search terms, form validation messages, and article body text.
- **Design Aesthetic**: Flat editorial publication style (broadsheet/journal). Zero drop shadows, zero rounded pill-boxes, zero glassmorphism or flashy gradients. Strict light and dark contrast tokens with 7 topic accent colorways.
- **Database Security**: Row Level Security (RLS) enabled on all tables; admin operations strictly guarded by `is_admin()` database security definer function checking user role in `profiles`.
- **Search Configuration**: Full-text search using PostgreSQL `tsvector` with `simple` dictionary configuration (accommodates mixed Filipino and English vocabulary without false stemming).
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

- **Public Reading Shell**: Next.js Server Components for fast SEO-friendly rendering, responsive header with hamburger menu for Content Drawer, theme toggle, and static informative pages.
- **Topic & Subtopic Architecture**: Hierarchical organization mapping 7 societal themes to nested subtopics, formatted with Markdown, read time estimation, banner theming, and citation lists.
- **Community Interaction**: Binary feedback widget ("Oo/Hindi") and public topic suggestion box with client/server Zod validation and rate limiting.
- **Admin CMS**: Protected admin routes (`/admin/*`) guarded by Next.js middleware and Supabase Auth session checks, with live Markdown article preview and asset storage upload.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

| Skill | Description | Path |
| --- | --- | --- |
| impeccable | Frontend design, aesthetic polish, typography, and UX refinement | `.agent/skills/impeccable/SKILL.md` |
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` — do not edit manually.
<!-- GSD:profile-end -->
