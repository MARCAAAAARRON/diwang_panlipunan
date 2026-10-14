# Requirements: Diwang Panlipunan

**Defined:** 2026-10-14  
**Core Value:** Accessible, credible, and thought-provoking educational content on Philippine societal issues, presented with journalistic integrity, clear citations, and an editorial aesthetic that promotes active learning.

## v1 Requirements

Requirements for initial release covering all P0, P1, and P2 capabilities. Each maps directly to roadmap phases.

### Discovery & Reading Experience

- [x] **DISC-01**: User can browse 7 core societal thematic topics with title, Filipino description, icon/imagery, and subtopic list
- [x] **DISC-02**: User can view subtopic count and publication status for each topic
- [x] **READ-01**: User can read subtopic article with title, executive summary, reading time estimate, and formatted Markdown content
- [x] **READ-02**: User sees topic-specific accent colorway applied to article headers and banners
- [ ] **READ-03**: User can view a reading depth / progress indicator while scrolling through an article
- [ ] **READ-04**: User can print or export article to PDF with clean layout stripping web navigation chrome
- [ ] **READ-05**: User can view curated related subtopics at the footer of each article

### Sources & Academic Rigor

- [x] **SRC-01**: User can view a formatted citations section per article with author, publication, date, and external link
- [x] **SRC-02**: Citation external links open safely in a new tab with security attributes (`rel="noopener noreferrer"`)
- [x] **SRC-03**: In-text citation anchors smoothly navigate to the corresponding reference entry

### Navigation & Global Shell

- [x] **NAV-01**: User can open and close the Content Drawer navigation from any page via hamburger trigger
- [x] **NAV-02**: Content Drawer displays all 7 topics, expandable subtopic directories, and static page links
- [x] **NAV-03**: Active page is visually highlighted in the header and Content Drawer
- [x] **NAV-04**: User can switch between Light and Dark themes, with choice persisted in localStorage and system preference fallback
- [ ] **NAV-05**: User can copy shareable article deep links with clipboard confirmation toast and rich Open Graph preview tags

### Static Informational Pages

- [x] **PAGE-01**: User can view the Landing page implementing the exact editorial design, typography, and layout from `docs/screens/Landing.png`
- [x] **PAGE-02**: User can view Tungkol sa Amin (About) page detailing mission, educational rationale, and editorial guidelines
- [x] **PAGE-03**: User can view Makipag-ugnayan (Contact) page with institutional contact channels and inquiry guidelines
- [x] **PAGE-04**: User can view Patakaran sa Privacy (Privacy Notice) detailing anonymous usage, feedback, and suggestion data handling

### Full-Text Search

- [x] **SRCH-01**: User can access a search bar from the global navigation
- [x] **SRCH-02**: Full-text search queries topic titles, subtopic titles, summaries, and Markdown content using PostgreSQL tsvector (`simple` config)
- [x] **SRCH-03**: Search results display matching snippets, topic badges, and direct links to subtopic articles

### Community Feedback & Suggestions

- [x] **FDBK-01**: User can submit binary feedback ("Nakatulong ba ito? Oo / Hindi") on subtopic articles
- [x] **FDBK-02**: User can submit an optional short text comment explaining their feedback
- [x] **SUGG-01**: User can submit a social issue suggestion ("Magmungkahi ng Paksa") via public submission form
- [x] **SUGG-02**: System validates submissions with Zod schemas and prevents spam abuse with client/server rate limiting

### Admin Authentication & Security

- [x] **AUTH-01**: Admin can log in at `/admin/login` using email and password
- [x] **AUTH-02**: Session persists via Supabase Auth and protected admin routes enforce authentication middleware
- [x] **AUTH-03**: Database enforces Row Level Security (RLS) restricting all mutations to verified `is_admin()` profiles
- [x] **AUTH-04**: Admin can log out securely from any admin screen

### Admin Content Management (CMS)

- [x] **CMS-01**: Admin can view, edit, and reorder all 7 thematic topics
- [x] **CMS-02**: Admin can create, edit, publish/unpublish, and delete subtopic articles with live Markdown preview
- [x] **CMS-03**: Admin can add, edit, reorder, and delete citation sources linked to any subtopic
- [x] **CMS-04**: Admin can upload topic cover images and banners to Supabase Storage with automatic URL association

### Admin Triage & Analytics

- [x] **TRG-01**: Admin can view feedback submissions aggregated by subtopic, including satisfaction percentages and reader comments
- [x] **TRG-02**: Admin can triage topic suggestions with status updates (Pending, In Review, Implemented, Dismissed)
- [ ] **ANLY-01**: Admin can view internal platform analytics including article page views, feedback totals, and frequent search terms

---

## v2 Requirements

Deferred to subsequent release. Tracked for future planning.

### Access Control & Localization
- **ROLE-01**: Multi-tiered role-based access control (Editor, Reviewer, Super Admin)
- **LANG-01**: Dynamic multilingual toggle switching full UI and article body between Filipino and English

### Community & Engagement
- **COMM-01**: Moderated reader discussions or annotations on specific article sections
- **OATH-01**: OAuth authentication providers for administrative accounts

---

## Out of Scope

Explicitly excluded to protect focus, editorial integrity, and security.

| Feature | Reason |
|---------|--------|
| Public Learner Accounts / Signup | Platform is open-access and zero-friction; students and teachers should not need accounts to read. |
| Unmoderated Public Comment Section | High risk of partisan flame wars and misinformation; structured feedback and suggestion box provide safer engagement. |
| Editor / Moderator Role Separation | Single admin deployment confirmed by stakeholder for initial launch; RBAC deferred to v2. |
| Monetization / Paywalls / Ads | Non-profit public educational mandate. |
| AI Chatbot / Automated Content Generation | Rigorous editorial curation with academic/journalistic citations is prioritized over generated content. |
| Dynamic Multilingual Toggle | Language rules strictly defined: Filipino for brand/nav/headers, English for search/validation/article body. |

---

## Traceability

Which phases cover which requirements. Populated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| DISC-01 | Phase 3 | Complete |
| DISC-02 | Phase 3 | Complete |
| READ-01 | Phase 3 | Complete |
| READ-02 | Phase 3 | Complete |
| READ-03 | Phase 6 | Pending |
| READ-04 | Phase 6 | Pending |
| READ-05 | Phase 6 | Pending |
| SRC-01 | Phase 3 | Complete |
| SRC-02 | Phase 3 | Complete |
| SRC-03 | Phase 3 | Complete |
| NAV-01 | Phase 2 | Complete |
| NAV-02 | Phase 2 | Complete |
| NAV-03 | Phase 2 | Complete |
| NAV-04 | Phase 2 | Complete |
| NAV-05 | Phase 6 | Pending |
| PAGE-01 | Phase 2 | Complete |
| PAGE-02 | Phase 2 | Complete |
| PAGE-03 | Phase 2 | Complete |
| PAGE-04 | Phase 2 | Complete |
| SRCH-01 | Phase 5 | Complete |
| SRCH-02 | Phase 5 | Complete |
| SRCH-03 | Phase 5 | Complete |
| FDBK-01 | Phase 5 | Complete |
| FDBK-02 | Phase 5 | Complete |
| SUGG-01 | Phase 5 | Complete |
| SUGG-02 | Phase 5 | Complete |
| AUTH-01 | Phase 4 | Complete |
| AUTH-02 | Phase 4 | Complete |
| AUTH-03 | Phase 1 | Complete |
| AUTH-04 | Phase 4 | Complete |
| CMS-01 | Phase 4 | Complete |
| CMS-02 | Phase 4 | Complete |
| CMS-03 | Phase 4 | Complete |
| CMS-04 | Phase 4 | Complete |
| TRG-01 | Phase 5 | Complete |
| TRG-02 | Phase 5 | Complete |
| ANLY-01 | Phase 6 | Pending |

**Coverage:**
- v1 requirements: 35 total
- Mapped to phases: 35
- Unmapped: 0 ✓

---
*Requirements defined: 2026-10-14*  
*Last updated: 2026-10-14 after initialization*
