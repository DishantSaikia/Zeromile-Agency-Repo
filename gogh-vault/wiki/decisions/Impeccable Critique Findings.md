---
type: "decision"
title: "Impeccable Critique Findings"
status: "developing"
created: "2026-07-26"
updated: "2026-07-26"
tags: ["gogh/stack", "note/decision"]
domain: "stack"
confidence: "practitioner"
related: ["[[Aesthetic Direction Commitment]]", "[[Project Brief Justification]]", "[[Index]]"]
source_urls: []
sources: ["[[Source Manifest Guide]]"]
approval_status: "approved"
risk_level: "low"
rollback_note: "Revert affected components/pages via git; no data migrations or destructive changes involved."
---

# Impeccable Critique Findings

Ran the `impeccable:impeccable` skill's `critique` flow against `app/` and
`components/` (two isolated sub-agents - design review + detector/browser
evidence - synthesized per the skill's Hard Invariants). Snapshot persisted
at `.impeccable/critique/2026-07-26T17-17-22Z__app.md`.

## Correction to [[Aesthetic Direction Commitment]]

That note (and the code comment it was based on) claimed
`--color-brand-blue` was "sampled from the sunset gradient in the logo
art." Direct inspection of `brand_assets/zeromile_logo.png` during this
critique shows the real logo is navy + bright blue + white with a pale
cream sunset halo - nothing in it is the dark terracotta (`#9a3412`)
actually in use. Asked the client to choose: match the real logo blue, or
keep terracotta as a deliberate invented complementary accent and correct
the claim. **Client chose to keep terracotta** - no visual change, but the
`globals.css` comment and this note are corrected to stop claiming it was
sampled from the logo. Terracotta is a deliberately invented complementary
accent, not a brand-sampled one.

## Fixes applied

- `--color-ink-faint` darkened `#8a96a8` -> `#64728a` (was ~3.0:1 on white,
  now ~4.86:1) - was failing the project's own 4.5:1 body-text floor on
  every listing card's price-unit label, every placeholder caption, and
  the footer copyright, sitewide.
- `TrustBar` restructured from a bordered 4-cell "hero-metric" stat grid
  (named anti-pattern in impeccable's craft-floor.md) into a single
  flowing trust line - same four facts, no big-number/small-label card
  template.
- Removed the blanket uppercase `eyebrow` from every `Section` instance
  sitewide (craft-floor: "an eyebrow everywhere is grammar you did not
  choose"). Kept it in exactly one place where it carries real,
  non-redundant information: the stay detail page's location label.
- Removed decorative `01/02/03` numbering on three non-sequential lists
  (`ServiceCard`, commercial-rental's B2B trust points, about page's
  values) - none of these are an ordered process. Replaced with a small
  meaningful icon per item where a visual anchor was still useful.
- Vehicle and stay listing grids now use a per-category icon
  (`lib/icon-maps.ts`) instead of one identical icon repeated across every
  card in a grid - hatchback/sedan/SUV/luxury and mini-truck/tempo/van/bus
  each get a distinct silhouette, so grids are scannable by shape, not
  just by reading price and copy.
- The global floating WhatsApp button now fades out via an
  IntersectionObserver (`FloatingWhatsAppButton.tsx`) whenever an inline
  WhatsApp CTA is already visible near the same corner, fixing a two-CTAs-
  stacked overlap on `/stays` and the stay detail page at mobile widths.
- Minor: added missing hover states on the driving-preference radio label
  and the mobile hamburger button.

## Constraints re-verified unaffected

WhatsApp green stays reserved exclusively for WhatsApp actions, no
bounce/spring easing was introduced, mobile-first/48px targets unchanged,
and the 4.5:1 accessibility floor is now stricter than before (ink-faint
fix), not looser. `npx tsc --noEmit`, `npx eslint .`, `npm run build`
(all 15 routes), and a Playwright console/screenshot pass across all 7
routes at mobile + desktop all came back clean after these fixes.
