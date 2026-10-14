# Plan 04-04 Summary: Citations Management & Academic Evidentiary Curation

## Accomplishments
1. **Inline Citations Manager Component (`src/components/admin/citations-manager.tsx`)**:
   - Built interactive client component positioned directly underneath the article editor on the subtopic edit screen.
   - Numbered citation cards (`[1]`, `[2]`, etc.) that directly correspond to in-text markdown citation tags (`[^1]`, `[^2]`).
   - Full citation editing fields: Author / Institution, Title of publication, Publishing bureau/agency, Date/Year, and external source URL.
   - Integrated URL tester button opening external links in a new tab.
   - Reordering controls: Move Up (`ArrowUp`) and Move Down (`ArrowDown`) to adjust curriculum sequence and `order_index`.
   - Remove citation with confirmation dialog.
2. **Citations Server Actions (`src/lib/citation-actions.ts`)**:
   - Implemented `saveCitations` server action to atomically synchronize sources for a subtopic with validation on required fields and HTTP/HTTPS protocol enforcement.
   - Implemented `deleteCitation` server action.
   - Automatic Next.js path cache revalidation on `/topics`, `/topics/[topic]/[subtopic]`, and `/admin/subtopics`.

## Verification
- Embedded citations manager functions within `src/app/admin/(dashboard)/subtopics/[id]/edit/page.tsx`.
- Citation URL validation enforces HTTP/HTTPS and prevents insecure protocols.
