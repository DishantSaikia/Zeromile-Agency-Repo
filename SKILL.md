---
name: agency-design-system
description: Non-negotiable business/functional constraints for the [Agency Name] car rental & stays booking website — WhatsApp CTA recognizability, mobile-first requirements, no-payment scope, an accessibility floor, and a couple of brand-direction rules the owner explicitly asked for. The actual visual design — palette, typography, layout composition, spacing, component styling, motion feel, micro-interactions — is created by the installed `gogh` skill stack, not by this document. Consult this skill for the hard boundaries before any design work; consult `gogh` for the actual design decisions.
---

# [Agency Name] Booking Site — Project Constraints

**`gogh` is the design authority for this build.** It creates the actual color system, typography, layout composition, spacing, component styling, hover/micro-interaction design, and overall taste — let it do that work. This document is not a competing spec; it's the short list of things that are **business/functional requirements, not aesthetic opinions**. They stay true no matter who's designing and no matter what a generic taste default would otherwise suggest. Read this first, then hand the actual design work to `gogh`.

When in doubt about whether something belongs here: if it's "what color should this be" or "how should this card look," that's Gogh's call. If it's "will this button still be recognizable as the one that opens WhatsApp" or "does this work on the phone our actual clients use," that's a constraint, and it belongs here.

---

## 1. Hard constraints (non-negotiable — Gogh designs within these)

1. **WhatsApp CTA color is reserved and consistent.** The primary enquiry action uses a distinctly WhatsApp-associated color — official WhatsApp green `#25D366` is the safe default — used *exclusively* for WhatsApp/enquiry actions, never decoratively elsewhere. This is a recognizability requirement: a visitor should be able to spot "the button that messages us" at a glance, on every page. Gogh chooses everything else about the button (shape, size, placement details, hover treatment); the color role is fixed.
2. **Mobile is the primary viewport.** Most clients book from their phone — this came directly from the business owner, not a default assumption. Every screen must work fully and beautifully at ~375–430px *before* desktop is considered:
   - Tap targets ≥48px
   - Hero headline + primary CTA visible without scrolling on a ~375×667px screen
   - Sticky WhatsApp CTA reachable in the thumb zone, safe-area-aware (`env(safe-area-inset-bottom)`)
   - No interaction that only works on `:hover` — touch has no hover state, so anything hover-revealed needs a tap/visible-by-default equivalent
   - Form inputs use correct mobile keyboard types (`type="tel"` + `inputMode="numeric"` for phone, native `type="date"` pickers) and render ≥16px to avoid iOS Safari's auto-zoom-on-focus
   - Listings are single-column/swipeable on mobile, not a shrunk-down desktop grid
3. **No payment/checkout UI, anywhere.** This site converts a visitor into a WhatsApp conversation — never build or imply an online payment flow.
4. **Accessibility floor.** Contrast ≥4.5:1 for body text (≥3:1 large text), visible `focus-visible` states on every interactive element, alt text on meaningful images, full keyboard navigation, `prefers-reduced-motion` respected, color never the sole indicator of meaning (relevant for rating/trust badges).
5. **No design or copy pattern that reads as a scam/spam site** — no fake countdown urgency, no aggressive flashing CTAs, no manipulative dark patterns (pre-checked opt-ins, hidden costs, confirm-shaming). This business hands over car keys and house keys to strangers; every choice should earn more trust, never less. Gogh has full authority over *how* trust is expressed visually — this constraint only rules out the patterns that actively undermine it.
6. **No bounce/spring/elastic easing.** This was a deliberate call for the corporate-trust brand direction the owner asked for at the start of this project. Gogh's taste layer can pick whatever specific easing curve and timing it judges best, as long as the feel stays confident and decelerating rather than springy.
7. **Listing photos are never presented broken or edge-to-edge flat.** Some minimal presentation treatment (radius, shadow, or reserved spacing) is required so a photo grid never looks like a raw file dump; Gogh chooses the exact treatment.
8. **WhatsApp deep links are always correct:** `https://wa.me/[NUMBER]?text=[ENCODED_MESSAGE]`, with all user-entered text passed through `encodeURIComponent`, opening in a new tab (`target="_blank" rel="noopener noreferrer"`).

---

## 2. Optional starting reference (a seed, not a spec — Gogh may refine or fully replace any of it)

Everything in this section existed as a first-pass design system before Gogh was wired in. It's kept here only in case Gogh's process wants a concrete starting point to react to or override — not as instructions to follow. If Gogh proposes something different for color, type, spacing, shadows, or motion character, **Gogh's proposal wins**, as long as Section 1 is satisfied.

<details>
<summary>Reference palette</summary>

```css
--bg:            #FFFFFF;
--surface:       #F5F8FC;
--surface-2:     #EAF0F8;
--ink:           #0B1B33;
--ink-muted:     #5B6B82;
--ink-faint:     #98A6B8;
--primary:       #123A66;  /* Gogh may propose a different brand hue entirely */
--primary-soft:  rgba(18, 58, 102, 0.08);
--cta-whatsapp:  #25D366;  /* fixed — see constraint 1 */
--accent-gold:   #C99A3E;
--hairline:      rgba(11, 27, 51, 0.08);
--hairline-2:    rgba(11, 27, 51, 0.14);
```
</details>

<details>
<summary>Reference type scale</summary>

Two families suggested (display grotesque/geometric sans + humanist sans body; optional light serif for testimonials only) — Gogh may propose a different pairing.

```css
--text-hero:    clamp(2.25rem, 5vw, 4.25rem);
--text-h1:      clamp(1.875rem, 3.5vw, 3rem);
--text-h2:      clamp(1.5rem, 2.5vw, 2.25rem);
--text-h3:      clamp(1.125rem, 1.5vw, 1.375rem);
--text-body:    clamp(1rem, 1vw, 1.0625rem);
--text-caption: 0.8125rem;
```
</details>

<details>
<summary>Reference spacing scale</summary>

`4, 8, 16, 24, 32, 48, 64, 96, 128` (px), tighter section rhythm on mobile (`48`–`64`) than desktop (`96`–`128`).
</details>

<details>
<summary>Reference motion durations (character only — confident/quick, per constraint 6)</summary>

```css
--ease:       cubic-bezier(0.16, 1, 0.3, 1);
--ease-inout: cubic-bezier(0.65, 0, 0.35, 1);
--dur-micro:  0.18s;
--dur-base:   0.45s;
--dur-slow:   0.7s;
```
</details>

<details>
<summary>Reference "trust-lift" photo treatment</summary>

```css
.listing-card {
  background: var(--surface);
  border: 1px solid var(--hairline);
  border-radius: 16px;
  box-shadow: 0 1px 2px rgba(11,27,51,0.04), 0 12px 32px -16px rgba(11,27,51,0.18);
}
.listing-card:hover { transform: translateY(-4px); box-shadow: 0 20px 44px -18px rgba(11,27,51,0.24); }
```
</details>

<details>
<summary>Reference "signature moments"</summary>

1. Hero: stacked on mobile (headline + subtext + WhatsApp CTA visible in first screen, photo below), side-by-side split on desktop, one quiet settle animation on load.
2. Listings showcase: single-column/swipeable on mobile, aligned grid on desktop, fast staggered reveal on scroll.

Gogh may design entirely different signature moments — these are just what the first pass landed on.
</details>

---

## 3. GSAP performance rules (technical, not aesthetic — these stay fixed regardless of who designs)

Whatever Gogh and the `gsap-animation` skill land on creatively, the implementation must still follow these correctness/performance rules:

- Animate only `transform` and `opacity` — never `width`, `height`, `top`, `left`, `margin`.
- Wrap in `gsap.context()`/`useGSAP()` and clean up on unmount (Next.js/React).
- Use `gsap.quickTo()`/`quickSetter()` for mouse-driven motion, never a new tween per `mousemove`.
- Call `ScrollTrigger.refresh()` after images/fonts load; reuse triggers rather than spawning dozens.
- Scope heavier or desktop-only animation via `gsap.matchMedia()`, including the `prefers-reduced-motion` fallback.
- Kill animations on route change.
- No competing CSS `transition` on a GSAP-animated property; never `transition: all`.

---

## 4. Pre-flight checklist (constraints only — Gogh's own audit covers design quality)

- [ ] `--cta-whatsapp`-equivalent color used ONLY for WhatsApp actions, nowhere else?
- [ ] Reviewed and working at mobile width (~375–430px) *first*, desktop as the enhancement?
- [ ] All tap targets ≥48px; no hover-only interaction without a tap/visible equivalent?
- [ ] Hero's headline + CTA visible in one mobile screen, no scroll required?
- [ ] Form inputs use correct mobile keyboard types and stay ≥16px?
- [ ] No payment/checkout UI anywhere?
- [ ] Accessibility floor met (contrast, focus states, alt text, keyboard nav, reduced-motion)?
- [ ] No scam/spam-pattern motion or copy (fake urgency, dark patterns)?
- [ ] No bounce/spring/elastic easing anywhere?
- [ ] Every WhatsApp link correctly encoded and opens in a new tab?
- [ ] GSAP implementation follows the Section 3 performance rules?
