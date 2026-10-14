---
name: Diwang Panlipunan
colors:
  light:
    background: '#FBF6E9'
    surface: '#FFFFFF'
    border: '#E3F0AF'
    input-border: '#6E7A6F'
    on-surface: '#14231B'
    on-surface-muted: '#4A5D52'
    primary: '#0D6E3F'
    primary-hover: '#0A5A33'
    on-primary: '#FFFFFF'
    primary-large: '#118B50'
    accent: '#5DB996'
    highlight: '#E3F0AF'
    link: '#0D6E3F'
    error: '#BA1A1A'
  dark:
    background: '#092328'
    surface: '#12544F'
    border: 'rgba(42, 131, 95, 0.35)'
    input-border: '#8BBB92'
    on-surface: '#EAF3EC'
    on-surface-muted: '#C5D9CA'
    primary: '#2A835F'
    primary-hover: '#226B4D'
    on-primary: '#FFFFFF'
    accent: '#8BBB92'
    highlight: 'rgba(42, 131, 95, 0.35)'
    link: '#A9D4B0'
    error: '#F2B8B5'
typography:
  headline-xl:
    fontFamily: Source Serif 4
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 42px
    letterSpacing: -0.015em
  headline-xl-mobile:
    fontFamily: Source Serif 4
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Source Serif 4
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Source Serif 4
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0em
  headline-sm:
    fontFamily: Source Serif 4
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 24px
    letterSpacing: 0em
  body-reading:
    fontFamily: Public Sans
    fontSize: 17px
    fontWeight: '400'
    lineHeight: 28.9px
    letterSpacing: 0.005em
  body-default:
    fontFamily: Public Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: Public Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  ui-label:
    fontFamily: Public Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  tag-label:
    fontFamily: Public Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.06em
  caption-citation:
    fontFamily: Public Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.01em
rounded:
  DEFAULT: 0.375rem
  sm: 0.375rem
  md: 0.375rem
  lg: 0.375rem
  xl: 0.375rem
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  margin-desktop: 3rem
  space-xs: 0.5rem
  space-sm: 1rem
  space-md: 1.5rem
  space-lg: 2rem
  space-xl: 3rem
  space-2xl: 4rem
---

# Diwang Panlipunan Design System

## Authority and Scope

- This file decides **how the site looks**. `PRD.md` decides what is built and the copy rules. `TRD.md` decides architecture and security. Where this file and a screenshot in `docs/screens/` disagree on color, font, or spacing, **this file wins**. Screenshots decide layout and proportions only.
- The screenshots show the **light theme only**. The dark theme is built from the tokens above, never from invented colors.
- Components and content types described here that the PRD does not list (glossaries, related legislation, reading progress bar, verification badges, resource cards) are **visual patterns only, not v1 features**. Do not build them unless the PRD adds them.
- **Terminology:** `Nilalaman` means the topic and subtopic drawer opened from the hamburger icon. An in-article heading outline is not a v1 feature.
- Sample text in screenshots is placeholder. Real content comes from the PRD and the database. Fixed interface labels live in `lib/strings.ts`.

## Brand & Style

A calm, authoritative, civic-minded digital publication. Styled after a well-edited academic reader and public-interest journal, it prioritizes intellectual rigor and readability over promotional spectacle. The audience is independent learners, students, educators, and citizens who want clear, context-rich analysis of Philippine society and global affairs.

The emotional signature is studious, credible, and grounded:

- **No decorative artifice:** no glassmorphism, gradients, pastel blobs, celebratory illustrations, or emoji.
- **Editorial cadence:** parchment surfaces, measured whitespace, typographic contrast.
- **Civic utility:** footnotes, pull quotes, and cited sources are part of the layout.

### Bilingual rule

- **Filipino:** brand, tagline, headings, section dividers, main buttons, feedback prompts. Exact strings: `Mga Paksa`, `Nilalaman`, `Mga Sanggunian`, `Mag-login`, `Mag-register`, `Nakatulong ba ito?`, `Oo`, `Hindi`, `Tungkol sa Website`, `Mga Rekomendasyon at Mungkahi`.
- **English:** search (`Search topics`), theme toggle (`Dark mode`, `Light mode`), form validation messages, admin interface, and article body text.

## Colors

The palette comes from archival paper, scholarly ink, and botanical tones. No blues, purples, or neon.

### Token table

| Role | Light | Dark | Used for |
|---|---|---|---|
| Page background | `#FBF6E9` | `#092328` | Canvas behind everything |
| Surface | `#FFFFFF` | `#12544F` | Sidebar, cards, forms, reading panels |
| Border | `#E3F0AF` | `rgba(42,131,95,0.35)` | 1px borders on every surface |
| Input border | `#6E7A6F` | `#8BBB92` | Text fields, search, checkboxes (needs 3:1 contrast) |
| Text | `#14231B` | `#EAF3EC` | Body and headings |
| Muted text | `#4A5D52` | `#C5D9CA` | Captions, bylines, metadata |
| Primary | `#0D6E3F` | `#2A835F` | Button fills, active states, small colored text |
| Primary hover | `#0A5A33` | `#226B4D` | Button hover |
| Primary large | `#118B50` | n/a | Large fills, borders, and icons only (not small text) |
| Accent | `#5DB996` | `#8BBB92` | Icons, hover borders, subtle badges |
| Highlight | `#E3F0AF` | `rgba(42,131,95,0.35)` | Tag backgrounds, selected rows, table highlights |
| Link | `#0D6E3F` | `#A9D4B0` | Inline links |
| Error | `#BA1A1A` | `#F2B8B5` | Validation messages |

**Why two greens in light mode:** `#118B50` (the brand green) gives white text about 4.3:1 contrast and about 4:1 as text on the parchment background, below the 4.5:1 AA requirement. `#0D6E3F` gives about 6:1. Use `#0D6E3F` for anything small (buttons, links) and keep `#118B50` for large fills, borders, and icons. Contrast values are calculated; confirm with a contrast checker.

### Topic colors

Each topic has its own `theme_color`, set in the admin form. It tints **only the topic banner** (as a 70% overlay on the background image) through a `--topic-color` variable. It never changes buttons, links, or other interface colors.

### Implementation rule

All colors are CSS variables defined in `:root` (light) and `[data-theme='dark']`. No component may contain a hard-coded hex value. Variable names: `--color-bg`, `--color-surface`, `--color-border`, `--color-input-border`, `--color-text`, `--color-text-muted`, `--color-primary`, `--color-primary-hover`, `--color-primary-large`, `--color-accent`, `--color-highlight`, `--color-link`, `--color-error`, `--topic-color`.

## Typography

- **Headlines:** Source Serif 4. No decorative italics in primary titles.
- **Body, UI, labels:** Public Sans.

### Reading constraints

- Article text uses `body-reading`: 17px, line height 1.7 (28.9px).
- Maximum line length is 68 characters (`max-w-[68ch]`, about 650px).
- Paragraph spacing is `1.5rem` bottom margin. No indentation.
- Citations use `caption-citation` (13px) with superscripts linked to the `Mga Sanggunian` list.
- Tag labels are uppercase with `0.06em` tracking.

## Layout & Spacing

An 8px grid (8, 16, 24, 32, 48, 64). All padding and margins use the `space-*` scale.

### Breakpoints

- **Desktop (1280px and up):** 12-column grid, outer margin 3rem, gutter 1.5rem. Left column is the app sidebar (`Tungkol sa Website`, `Nakatulong ba ito?`, `Mga Rekomendasyon at Mungkahi`, `Mga Sanggunian`, `Contact Us`). The reading view is the main column. A right rail may show the `Mga Sanggunian` preview only.
- **Tablet (768px to 1279px):** 8-column grid, margin 2rem. The right rail moves below the article. The sidebar collapses into the hamburger drawer.
- **Mobile (under 768px):** single fluid column, margin 1rem. Sidebar links and `Nilalaman` are both in the hamburger drawer. Must work at 360px wide.

## Elevation & Depth

Strictly flat. No drop shadows, blurs, or gradients.

- `box-shadow: none` in every state.
- Every card, input, drawer, and metadata container has a 1px solid border using the border token.
- Hover and active states change background color, border color, or add an underline. They never add shadow or lift.
- Callouts, quotes, and definitions: surface fill with a 3px solid left border in `--color-primary-large`.
- The drawer overlay is a flat dark scrim, with no blur.

## Shapes

- **Every** rounded element uses a 6px radius (`0.375rem`): buttons, inputs, cards, drawers, tags, table containers.
- **Pills are prohibited:** no `rounded-full` on buttons, chips, tags, or inputs. Status labels (Draft, Published) use the same 6px radius.
- The only circle allowed is the user avatar.

## Components

### Buttons

- **Primary:** minimum 44px tall, `--color-primary` fill, `--color-on-primary` text, 6px radius, no shadow. Hover: `--color-primary-hover`. Focus: 2px ring with 2px offset.
- **Secondary:** minimum 44px tall, surface fill, 1px `--color-primary` border and text. Hover: page background color.
- Use the exact strings `Mag-login`, `Mag-register`, `Oo`, `Hindi` where applicable.

### Inputs and search

- Surface fill, 1px `--color-input-border`, 6px radius, minimum 44px tall, horizontal padding 1rem.
- Search placeholder is exactly `Search topics`.
- Checkboxes and radios use `--color-input-border` and fill with `--color-primary` when selected.
- Validation messages appear below the field, in English, in `--color-error`.

### Tags and chips

- 6px radius, uppercase `tag-label`, padding `4px 10px`, `--color-highlight` background, `--color-text` text. Never pills.

### Content cards

- Surface fill, 1px border, 6px radius, 1.5rem padding, no shadow.
- Hover: border becomes `--color-accent` and the serif title gains an underline.
- Topic lists inside the app are simple rows (title, one-line summary, arrow), not card grids.

### Callouts and quotes

- Surface fill, 3px left border in `--color-primary-large`, 16px padding. Used for definitions and key statistics with a source label.

### Content drawer (`Nilalaman`)

- Opens from the hamburger icon as a 320px left drawer over a flat dark scrim, with a close button.
- Lists the seven main topics in admin-defined order. Each row has a chevron and expands to show its subtopics under a thin vertical line.
- The current subtopic has a 2px left border in `--color-primary-large`, semi-bold text, and a `--color-highlight` background.

### Feedback module

- At the end of every subtopic, in a 1px bordered box: `Nakatulong ba ito?` with secondary buttons `Oo` and `Hindi`, and a `Magbigay ng mungkahi` text link.

### Reference section (`Mga Sanggunian`)

- A numbered citation list at the end of every subtopic, in `caption-citation` type. External links are underlined in `--color-link`.

### Theme toggle

- Sits in the top bar. The label (and tooltip) names the **target** mode: `Dark mode` when the page is light, `Light mode` when the page is dark.

### Admin screens

- Same tokens and components. Interface text is English, except for the Filipino headings in the PRD (`Mga Paksa`).
- Topics table: plain bordered table inside a 6px container, color column shown as a small square swatch, status as a 6px-radius label.
- Create and edit forms open in a right slide-over using the standard input and button styles.

## Accessibility

- Text and controls meet WCAG AA in both themes: 4.5:1 for normal text, 3:1 for large text and for UI boundaries such as input borders and focus rings.
- Minimum touch target 44px. Everything is reachable by keyboard with a visible focus ring.
- Banner text over a topic color overlay must also meet 4.5:1; if a chosen topic color fails, adjust the overlay opacity, not the text color.
- Respect `prefers-reduced-motion`: drawers may animate briefly, but disable animation when requested.
- Images need alt text; decorative banner images use empty alt.

## Theme Implementation

- Set `data-theme="light|dark"` on the `html` element before first paint, using `localStorage` and falling back to the system preference.
- Because no dark mockups exist, build dark mode from the token table, then check every screen in both themes. A screen that looks wrong in dark almost always has a hard-coded color.
