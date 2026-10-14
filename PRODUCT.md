# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary:** Filipino high school (junior/senior) and college students, educators, and social studies/civics teachers conducting academic research, classroom discussions, and civic education.  
**Secondary:** Filipino citizens, journalists, and civic advocates seeking balanced, evidence-based perspectives on contemporary national issues.

## Product Purpose

Diwang Panlipunan ("Pag-unawa sa Lipunan, Pagmulat sa Kinabukasan") is an educational web platform dedicated to raising social awareness, critical consciousness, and informed civic participation. It curates accessible, balanced, and multi-perspective analyses of contemporary Philippine and global societal issues across 7 core themes, supported by transparent citations, community feedback, and suggestion mechanisms.

## Positioning

Unlike algorithm-driven social feeds, partisan commentary blogs, or ad-laden clickbait portals, Diwang Panlipunan provides curated, journal-grade editorial analyses with transparent academic and journalistic citations, zero ads, zero unmoderated flame wars, and zero friction (no mandatory student accounts, paywalls, or personal data collection).

## Operating Context

- Academic classrooms, school computer laboratories, libraries, and mobile devices across Philippine telecom networks (data-conscious, fast load times, accessible on modest bandwidth).
- Offline academic use: broadsheet print and PDF export layouts tailored for physical classroom handouts and study packets.

## Capabilities and Constraints

- **7 Canonical Societal Themes:** Karapatang Pantao, Katarungang Panlipunan, Pamamahala at Demokrasya, Kapaligiran at Pagbabago ng Klima, Ekonomiya at Kaunlaran, Kasarian at Lipunan, Kultura at Pagkakakilanlan.
- **Language Conventions:** Filipino for brand, headers, navigation items, and action buttons; English for search queries, form validation messages, and article body text.
- **Full-Text Search:** Powered by PostgreSQL tsvector using simple dictionary configuration (handles mixed Tagalog/English without false stemming).
- **Civic Engagement:** Anonymous reader feedback ("Oo/Hindi" binary vote with qualitative comment) and public topic suggestion box with honeypot anti-spam.
- **Administrative CMS:** Role-guarded session authentication, live split-screen Markdown preview, inline citations manager, and media asset upload.
- **Privacy-Preserving Analytics:** Internal first-party tracking logging zero cookies, zero IP addresses, and zero PII.

## Brand Commitments

- **Broadsheet Editorial Design:** Strictly flat elevation, 1px solid borders, zero drop shadows, zero glassmorphism, zero pill-shaped elements (6px uniform border-radius).
- **Typography Pairing:** Source Serif 4 (headlines, pull-quotes, and editorial titles) and Public Sans (UI, labels, and body text).
- **Thematic Colorways:** 7 distinct topic accent colors applied strictly to banners and thematic indicators, never overriding functional interactive buttons.

## Evidence on Hand

- Complete design specification: `docs/DESIGN.md`.
- Original approved landing page design: `docs/screens/Landing.png`.
- Official brand mark: `docs/logo/Logo.png`.
- Full seed database migrations and verified citations in `supabase/migrations/00001_initial_schema.sql`.

## Product Principles

1. **Academic Rigor Over Sensation:** Present balanced, multi-perspective social inquiry supported by transparent academic and journalistic citations.
2. **Frictionless Civic Access:** Never require student accounts, logins, or fees to read educational materials.
3. **Broadsheet Dignity:** The visual interface recedes in favor of the reading experience, using clean typographic hierarchy and disciplined flat aesthetics.
4. **Student Privacy by Design:** Protect user anonymity with first-party tracking that logs zero cookies, IP addresses, or personal identifiable information.

## Accessibility & Inclusion

- Strict WCAG AA compliance (4.5:1 text contrast on light and dark themes).
- Minimum 44px touch targets on all interactive controls.
- Zero-FOUC theme switching respecting `prefers-color-scheme`.
