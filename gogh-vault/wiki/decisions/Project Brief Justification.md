---
type: "decision"
title: "Project Brief Justification"
status: "developing"
created: "2026-07-17"
updated: "2026-07-17"
tags: ["gogh/ops", "note/decision"]
domain: "ops"
confidence: "practitioner"
related: ["[[Index]]", "[[Hot]]", "[[Aesthetic Direction Commitment]]", "[[Health Scorecard]]", "[[Action Roadmap]]", "[[Approval Queue]]"]
source_urls: []
sources: ["[[Source Manifest Guide]]"]
approval_status: "approved"
risk_level: "low"
rollback_note: "This note only records reasoning; no mutation to revert."
---

# Project Brief Justification

Brief used for `gogh advise`: `project-brief.json`

```json
{"project_type": "landing", "brand_maturity": "partial", "motion": "rich", "density": "airy", "accessibility": "strict", "ambition": "transform"}
```

## Field-by-field reasoning

- **project_type: "landing"**  -  The site is a multi-page marketing/conversion
  property (home + 6 sub-pages), but every page shares the same job: turn a
  visitor into a WhatsApp conversation. No enum option matches "multi-page
  conversion site" exactly; "landing" is the closest fit and is what the
  advisor's own dial table (`recommend_stack`/`dial_settings` in
  `render_stack_advisor.py`) treats as the general marketing-site category.

- **brand_maturity: "partial"**  -  The project's own `SKILL.md`
  ("agency-design-system") Section 2 ships a first-pass reference palette,
  type scale, spacing scale, and shadow recipe, explicitly labeled "a seed,
  not a spec" that the design authority "may refine or fully replace." A
  real logo exists in `brand_assets/zeromile_logo.png` with sampled brand
  colors (navy ~#123A66, a vivid blue ~#0056C7). That is real but incomplete
  brand material  -  not "none" (there is a logo and a working site already
  shipped) and not "mature" (no full identity system, no photography, no
  established visual language beyond the logo).

- **motion: "rich"**  -  Changed from the earlier lightweight advisor run
  (which used "restrained"). The client's explicit feedback is that the
  current, already-shipped build "looks like AI slop" and asked for
  "exceptional, modern, aesthetic," with an explicit instruction to use
  gogh "to its fullest extent." `SKILL.md` Section 1.6 bans bounce/spring
  easing, but that is an easing-character constraint, not a motion-quantity
  ceiling  -  a richer, more orchestrated motion budget (multiple considered
  moments, not just one hero timeline) is compatible with "confident,
  decelerating" easing. Anthropic's own frontend-design mechanism (see
  `references/claim-packs/claim-pack-anthropic-frontend-design.md`, A010)
  argues motion should concentrate in "one well-orchestrated moment" rather
  than scattered effects  -  "rich" here means investing real craft in that
  one moment and a couple of secondary ones, not adding motion everywhere.

- **density: "airy"**  -  Changed from "balanced". The first build leaned on
  a repeated "icon-badge + bordered card + shadow" formula across nearly
  every section (service cards, listing cards, trust-bar items, about-page
  value cards)  -  exactly the kind of homogeneous, boxed-in density that
  reads as templated. Anthropic's frontend-design source names "cards
  nested in cards" as a named anti-pattern (via Impeccable's claim pack,
  I013, which traces the pattern back to Anthropic's own framing). "Airy"
  favors more open, asymmetric layout and less universal card-boxing.

- **accessibility: "strict"**  -  Unchanged. `SKILL.md` Section 1.4 states an
  explicit accessibility floor (4.5:1 contrast, visible focus-visible
  states, alt text, full keyboard nav, `prefers-reduced-motion`, color never
  the sole indicator of meaning) as a hard, non-negotiable constraint
  regardless of aesthetic direction.

- **ambition: "transform"**  -  The client's own words: the current build
  "looks like AI slop," and they want something "exceptional" using gogh
  "to its fullest extent." That is a direct instruction to treat the
  incumbent visual direction as evidence, not the answer  -  the schema's own
  description of `transform` ("the incumbent design is evidence, not the
  answer"). Per the project-brief schema, `transform` requires an Aesthetic
  Direction Commitment before any code - see [[Aesthetic Direction Commitment]].

## Conflict check against SKILL.md Section 1 (hard constraints)

None of the above changes touch a Section 1 hard constraint. `motion: rich`
and `density: airy` are taste-layer dials; they do not relax the WhatsApp
color reservation, the no-bounce-easing rule, the no-payment-UI rule, the
accessibility floor, or the mobile-first tap-target/viewport rules. Where
`gogh advise`'s dial output (`DESIGN_VARIANCE`/`MOTION_INTENSITY`) would
otherwise imply bouncier or spring-based easing, that recommendation is
overridden by the fixed constraint per this vault's ground rule 6  -  logged
here rather than silently applied.
