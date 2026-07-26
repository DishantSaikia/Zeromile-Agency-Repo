---
type: "decision"
title: "Aesthetic Direction Commitment"
status: "developing"
created: "2026-07-17"
updated: "2026-07-17"
tags: ["gogh/stack", "note/decision"]
domain: "stack"
confidence: "practitioner"
related: ["[[Project Brief Justification]]", "[[Index]]", "[[Hot]]", "[[Health Scorecard]]", "[[Action Roadmap]]", "[[Approval Queue]]", "[[Impeccable Critique Findings]]"]
source_urls: []
sources: ["[[Source Manifest Guide]]"]
approval_status: "approved"
risk_level: "medium"
rollback_note: "Revert affected components/pages via git; no data migrations or destructive changes involved."
---

# Aesthetic Direction Commitment

Required by the `transform` ambition brief before any code changes (see
[[Project Brief Justification]]) and by `gogh advise`'s own output, which
will not let a transform brief pass without this.

## Candidates considered (from `ui-ux-pro-max/styles.csv`, retrieval, not invention)

- **Trust & Authority** (row 26)  -  blue/grey, badges, certificate cards,
  soft shadows. This is what the first build actually shipped. Rejected as
  the primary direction: it is the named "safe default" for this exact
  brief (professional services / trust-oriented) and is why the build reads
  as templated  -  the client's own words were "looks like AI slop."
- **Hero-Centric Design** (row 20)  -  full-viewport centered hero, CTA
  glow/pulse. Rejected as the primary direction: this is the textbook
  "distributional convergence" pattern named in
  `references/canon/005-ai-slop-distributional-convergence.md" (item 2:
  "neutral sans type... centered heroes... generic icons").
- **Bold Typography (Mobile Poster)** (row 78) and **Exaggerated
  Minimalism** (row 47)  -  oversized editorial type (clamp-scaled,
  4-5x body size), 0px radius, underline CTAs instead of pill buttons,
  massive vertical rhythm, 200ms no-bounce transitions. Row 47 explicitly
  lists "agency landing pages" as a Best For case. Adopted structurally,
  not literally  -  their reference palettes (near-black/vermillion,
  black/white/single-accent) are NOT used, since the client's real logo
  fixes actual brand colors (sampled navy ~#123A66, vivid blue ~#0056C7)
  and CLAUDE.md's Brand Assets rule forbids inventing brand colors when a
  real palette exists.
- **Kinetic Typography** (row 48)  -  explicitly rejected: the retrieval
  itself flags "Accessibility: Poor (motion)", which conflicts directly
  with this project's hard accessibility floor (SKILL.md Section 1.4). A
  transform in ambition does not override a Section 1 hard constraint.

## Committed direction

**Direction (three words or fewer): Route Line Editorial**

Ground the taste in the actual subject (Anthropic frontend-design's own
mechanism, claim A008: "pick a grounded aesthetic direction from the
subject's own world")  -  this is a mobility/journey business, not a generic
SaaS product. The subject is roads, routes, and the start of a journey
("Zero Mile" is literally the marker of a journey's starting point). Pair
that grounding with the oversized-editorial-type mechanism borrowed from
rows 47/78 above, executed in the client's real navy/blue, not an invented
palette.

**Signature element (the one move this page owns):** a single continuous
route/road SVG line that draws itself (stroke-dashoffset animation) once,
prominently, acting as a connective thread through the homepage  -  the ONE
well-orchestrated motion moment (Anthropic claim A010: motion should
concentrate in one moment, not scatter evenly across every section).
Every other section's motion is dialed back in comparison, on purpose, so
this one move actually reads as a signature rather than one more animated
card grid.

**Five-second memory (what a visitor describes):** "The car/travel site
with the big confident headline and the road line that draws itself across
the screen"  -  not "another blue corporate site with rounded cards."

**Nearest banned default being avoided:** the "Trust & Authority" template
this project already shipped once: icon-in-a-circle + bordered card + soft
shadow, repeated identically across service cards, listing cards, the
trust-bar stats, and the about-page value cards. That exact repetition
across four-plus sections is the concrete "AI slop" signature the client
flagged, per `references/canon/005-ai-slop-distributional-convergence.md`
item 2 ("rounded nested cards" as a named tell).

## Constraints this direction must still satisfy (SKILL.md Section 1, unchanged)

- WhatsApp green `#25D366` stays reserved exclusively for WhatsApp actions  - 
  no decorative reuse, including as an "accent" for the editorial palette.
- No bounce/spring/elastic easing anywhere, including the route-line draw
  and any 0-radius/underline-CTA interaction states borrowed from the
  editorial candidates above.
- Mobile-first constraints (48px tap targets, hero fits first screen,
  native keyboard types, etc.) are unaffected by a typography/layout
  direction change and remain as-is.
- Accessibility floor (4.5:1 contrast, focus-visible, alt text, reduced
  motion) is non-negotiable  -  this is exactly why Kinetic Typography was
  rejected above rather than adopted with a caveat.

## Correction (2026-07-26)

The "vivid blue ~#0056C7" reference above predates the later Color Theme
Rework, which moved the accent to a deliberately invented terracotta
(`--color-brand-blue: #9a3412`) rather than a logo-sampled blue. See
[[Impeccable Critique Findings]] for the full correction - the terracotta
was never actually sampled from the logo despite an earlier code comment
claiming so; the client has since confirmed keeping terracotta as an
intentional complementary accent, not a brand-sampled one.
