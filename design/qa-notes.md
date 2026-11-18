# QA notes — 2026-11-18

## Automated

`design/validation.json` records all 31 routes, coverage of the 26 source URLs, and checks for internal destinations, fragment targets, single H1, metadata, image alternative text, static assets and 404 response.

## Visual / native browser

Safari responsive design mode was used to avoid interrupting the user's active Chrome window.

- 375px: use-case cards, category chips and search fit in one column. Permission table reflows into vertical records with column labels.
- 768px: blog hero, article title, breadcrumb and image remain readable, without overlap.
- 1440px: support page hero uses two columns with the new ImageGen illustration; header and navigation fit.
- No horizontal overflow or overlapping elements was observed in these views.

## Interaction

- Use-case category `営業`: results changed to 1.
- Search `採用` while `営業` selected: 0 results and an explanatory empty state.
- Reset: results returned to 6.
- Full page menu: opens, first close control receives focus, Escape closes and restores focus to trigger.

- FAQ category `費用・PoC`: 3 questions. Search `PoCだけ`: 1 question.
- FAQ answer: opens by click, closes by Enter while focused.
- Final home page at 1440px captured in `design/site-preview.png`.

## Final polish — November 18

- Header consultation CTA now has a minimum 48px height, including 375px layouts.
- Main content accepts focus from the skip link and reserves space below the sticky header.
- The home hero keeps `導入・定着を支援します。` together to avoid splitting `定着` on mobile.
- Search normalizes full-width Latin characters, case and surrounding whitespace across articles, use cases and FAQ.
- Safari at 375px: ` ＰｏＣだけ ` returns the matching FAQ. A nonexistent keyword shows a reset control; Enter on the reset restores all 10 questions.
- Safari at 375px: article category `活用事例` shows two articles. Search/chips/cards fit the viewport.
- Production build, ESLint and TypeScript rerun successfully. Production restarted on port 3008; the 31-route validation reports no issues.

## Scope and limitations

External consultation links are verified as destinations only. There is no local submission backend and no production test submission. Images are illustrative, not real product screenshots. No deployment was performed.

## Color family redesign — November 18

- Added five built-in ImageGen assets: mobile FV composite, nine-character atlas, work/review/support scenes. All images are local, transparent PNGs; prompts are in `color-family-imagegen-prompts.md`.
- All 31 pages use the shared mobile layout and the same character family. Desktop retains its existing structure with small companion characters and muted accent surfaces.
- Mobile home order is kicker → title → description → illustration → PoC note → consultation/PoC CTAs. Header uses logo and menu only, matching the new reference.
- At 375px, the home FV, security guide, use-case chips and character cards were inspected. Sales filter returns one result. All nine footer sprites render individually without clipping.
- Checked the revised illustration-to-contact-to-footer transition. Tightened the contact heading to keep its second phrase together.
- At 768px, blog hero typography and image were inspected; capped the illustration width at tablet sizes so it does not dominate the screen.
- At 1440px, the home keeps its original desktop composition. Companion minis sit outside the panel edges, raised enough to remain visible near the first viewport boundary.
- Final build / lint / typecheck all pass. Restarted production preview at port 3008 and reran the 31-route check, including all five new assets: no issues.
- Mobile all-page menu opens, places focus on close, and Escape closes/restores trigger focus.
- Final captures: `color-mobile-preview.png` (375px), `color-desktop-preview.png` (1440px), `color-use-cases-mobile.png` (filter result). Native Safari viewport was returned to 375 × 667 after capture.

## Square corners and ImageGen branding

- Removed the decorative English headings and section numbers. Updated shared controls, cards, navigation and content panels to use square corners.
- The header and footer share the generated logo. The same mark is used in the favicon and appears in both versions of the updated hero artwork.
- Checked all 31 site pages in Chromium at 390px and 1440px for effective border radii, horizontal overflow and asset loading. Checked representative pages at 320px, 768px and 1024px as well.
- Verified menu focus and Escape, use-case tabs and category filters, and FAQ search and expansion. Verified the local preview in Safari.
