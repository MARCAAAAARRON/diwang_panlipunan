# Phase 6 Discussion Log: Reading Tools, Social Sharing, Polish & Analytics

**Date:** 2026-10-14  
**Phase:** 06-reading-tools-social-sharing-polish-analytics  
**Participants:** User & Assistant  

---

## Areas Discussed & Decisions Logged

### 1. Reading Depth / Scroll Progress Indicator
- **Options Considered:**
  1. Minimalist Top Accent Progress Bar (2.5px fixed at top in theme accent color)
  2. Floating Bottom Reading Pill
  3. Subtle Sidebar Track Indicator
- **User Decision:** Minimalist Top Accent Progress Bar — 2.5px fixed progress bar at top of screen using the topic accent token, zero intrusive floating widgets.

### 2. Print & PDF Broadsheet Layout
- **Options Considered:**
  1. Dedicated "I-print / PDF" action on article header with broadsheet print stylesheet stripping chrome
  2. Browser-native print only (no UI button)
  3. Client/server formatted PDF generation library
- **User Decision:** Dedicated "I-print / PDF" action in the article header toolbar. Prints clean broadsheet layout stripping header, drawer, search, feedback, and footer while preserving article body, data callouts, and academic citations at the end.

### 3. Related Subtopics Recommendation Engine
- **Options Considered:**
  1. Hybrid Sibling & Cross-Theme Intersection (2 sibling subtopics + 1 cross-thematic related article)
  2. Pure Sibling Subtopics Only
  3. Cross-Topic Tag Matched
- **User Decision:** Hybrid Sibling & Cross-Theme Intersection (2 sibling subtopics + 1 intersectional subtopic from a neighboring theme) positioned after citations and before feedback.

### 4. Social Sharing & Open Graph Metadata
- **Options Considered:**
  1. Unified "Ibahagi" Menu (Web Share API on mobile + copy link with toast & direct social intents on desktop + dynamic Open Graph / Twitter card tags)
  2. Quick Copy Link Only
  3. Full Persistent Social Bar
- **User Decision:** Unified "Ibahagi" menu combining Web Share API on mobile, copy link with clipboard confirmation toast on desktop, direct social links, and complete Open Graph / Twitter Card metadata.

### 5. Internal Platform Analytics Dashboard
- **Options Considered:**
  1. Dedicated `/admin/analytics` tab + Summary Widgets on `/admin` overview with first-party privacy-preserving tracking
  2. Integrated on `/admin` overview only
  3. External analytics script integration
- **User Decision:** Dedicated `/admin/analytics` tab + Summary Widgets on `/admin` Overview tracking page views, top articles leaderboard, 7 themes reading share, reader satisfaction ratio, and frequent search terms.
