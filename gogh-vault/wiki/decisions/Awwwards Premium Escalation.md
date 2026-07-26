---
type: "decision"
title: "Awwwards Premium Escalation"
status: "developing"
created: "2026-07-17"
updated: "2026-07-17"
tags: ["gogh/stack", "note/decision"]
domain: "stack"
confidence: "practitioner"
related: ["[[Aesthetic Direction Commitment]]", "[[Index]]", "[[Hot]]", "[[Stack Advice]]", "[[Health Scorecard]]", "[[Action Roadmap]]"]
source_urls: []
sources: ["[[Source Manifest Guide]]"]
approval_status: "approved"
risk_level: "medium"
rollback_note: "Revert affected components via git; the custom cursor and marquee are additive layers with no data or structural dependency, safe to remove independently if any one proves too heavy."
---

# Awwwards Premium Escalation

The client asked to push further: "way more extraordinarily premium and creative
like Awwwards-winning sites," using gogh again rather than freehand. This does
not replace [[Aesthetic Direction Commitment]] (Route Line Editorial stays the
named direction) - it escalates execution craft within it, retrieval-checked
against `ui-ux-pro-max/styles.csv` rather than invented from memory.

## Retrieval basis

Queried `.raw/skills/ui-ux-pro-max/styles.csv` for premium/award/agency/luxury/
cinematic/immersive keywords. Relevant rows and what was adopted vs rejected:

- **Interactive Cursor Design (row 62)**: built a custom cursor + magnetic
  hover pull, gated to `(hover: hover) and (pointer: fine)` only. The client
  then corrected course mid-build: this site is mobile-first ("its mainly
  based for mobile, so no need for the cursor follower") - the cursor
  follower was removed entirely (`components/CustomCursor.tsx` deleted, its
  CSS and layout wiring removed) rather than kept as unused dead weight.
  This is row 62's own "Do Not Use For: Mobile-first" line playing out in
  practice, not just in the abstract - a good example of why the row's own
  caveats matter even when a technique is otherwise on-brief. Magnetic hover
  on the two primary CTAs was kept: unlike a global cursor replacement, it's
  inert on touch (no mousemove event fires) and adds no mobile cost, so it
  doesn't carry the same "wrong effort for the primary device" problem.
- **Kinetic Brutalism (row 74)**: infinite marquee technique adopted (the
  motion device, not the acid-yellow/brutalist palette or spring/haptic
  specifics, which don't fit this brand or the no-bounce constraint). Row's
  own checklist item "reduced motion stops marquees" is honored.
- **Parallax Storytelling (row 49)**: flagged "Accessibility: Poor (motion)"
  and "Mobile-Friendly: Low" as a whole style. Not adopted wholesale. The one
  applicable idea - the RouteLine signature moment tied to scroll progress
  instead of a single trigger - is adopted narrowly, still gated behind
  `prefers-reduced-motion`, and mobile keeps the simpler triggered-once
  version rather than a scrub (scrub-on-mobile is exactly what that row
  warns is a poor-mobile pattern).
- **Modern Dark Cinema Mobile (row 71)** and **SaaS Mobile Boutique (row 72)**:
  ambient background "blob" drift adopted (slow oscillation, opacity 0.08-0.12
  equivalent). Their spring easing (`damping/stiffness`, "spring modals") is
  explicitly NOT adopted - stays cubic-bezier(0.16,1,0.3,1) per the fixed
  no-bounce/spring constraint (SKILL.md Section 1.6). This is the one place
  a retrieved row's own animation spec directly conflicts with a hard
  constraint; the constraint wins per this vault's ground rule 6.
- **Minimalist Monochrome (row 70)** and **Exaggerated Minimalism (row 47)**:
  the oversized-editorial-type mechanism they define was already adopted in
  [[Aesthetic Direction Commitment]]; not re-adopted here, just reaffirmed.
- **3D & Hyperrealism (row 5)**, **Liquid Glass (row 14)**, **HUD/Sci-Fi (row
  51)**, **Spatial UI/VisionOS (row 55)**: not adopted. All are flagged poor
  performance and/or poor accessibility as their primary character, and none
  are grounded in this brief's subject (a car/stays rental agency, not a
  gaming, spatial-computing, or sci-fi product) - adopting one would be
  exactly the "default chosen for its own sake, not because the brief
  supports it" mistake named in
  `references/canon/005-ai-slop-distributional-convergence.md` item 14.

## GSAP plugin basis (gsap-plugins skill, consulted before implementation)

All GSAP plugins, including SplitText and DrawSVGPlugin, are free as of the
Webflow acquisition - no license key needed. Used:

- **SplitText**: word/line-level reveal for the Hero headline and Section
  headings, replacing a single fade+translate with a more deliberate,
  per-line reveal. `aria: "auto"` (the default) keeps the full string exposed
  to screen readers via `aria-label` while visually splitting for animation.
- Hand-rolled `stroke-dasharray`/`stroke-dashoffset` kept for RouteLine rather
  than switching to DrawSVGPlugin - it already works and passed verification;
  swapping would be a dependency-surface change with no functional upside.

## What this does NOT change

- Direction stays Route Line Editorial; this is execution polish, not a new
  direction.
- WhatsApp green stays exclusive to WhatsApp actions - none of the new
  cursor/marquee/blob work touches `--color-whatsapp`.
- No bounce/spring easing anywhere, including the new cursor/magnetic/blob
  work - confident deceleration only, per SKILL.md Section 1.6.
- Accessibility floor unchanged: custom cursor and marquee are decorative,
  gated behind `(hover: hover) and (pointer: fine)` / `prefers-reduced-motion`
  respectively, and never required to operate the site.
