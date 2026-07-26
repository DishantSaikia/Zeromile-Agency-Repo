# CLAUDE.md — Frontend Website Rules

---

## Project Context (this build)

This CLAUDE.md is your general frontend ruleset, reused across projects — the section below pins down what's specific to **this** project so nothing here gets misapplied.

- **Project:** Zeromile Agency booking/enquiry website — private car rental, commercial vehicle rental, and stays (Airbnb-style), unified by a single WhatsApp enquiry flow.
- **Stack override:** this project is a **Next.js (App Router) + TypeScript + Tailwind (proper build, not CDN) multi-page app** — the generic "Output Defaults" section below (single `index.html`, Tailwind via CDN) does **not** apply here; see the master prompt for the full stack spec.
- **Active design skill:** `agency-design-system` (corporate-trust, professional blue + WhatsApp-green CTA). Do not pull in `artscape-design-system` or any other project's design skill here — wrong aesthetic entirely.
- **No payment processing.** This site never touches money, cards, or checkout — it converts visitors into a WhatsApp conversation. Treat anything resembling payment/checkout UI as out of scope unless explicitly requested.

---

## 0. Core Behavioral Principles (Highest Priority)

These override defaults. Apply them to every task, before anything else.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

### Think Before Coding
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them — don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.
- Always prefer to ask the user a question, even a subtle one, instead of over-assuming.
- Before implementing or adding any extra feature to an existing system, think through the test cases, write down some unit tests beforehand, and run through them. After that, do a browser verification pass through Playwright.

### Simplicity First
- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.
- Ask: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### Surgical Changes
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it — don't delete it.
- Remove only imports/variables/functions that YOUR changes made unused.
- Every changed line should trace directly to the user's request.

### Goal-Driven Execution
- Transform tasks into verifiable goals before starting.
- For multi-step tasks, state a brief plan with a verify step for each:
  ```
  1. [Step] → verify: [check]
  2. [Step] → verify: [check]
  ```
- Loop until success criteria are met. Weak criteria ("make it work") require clarification first.

---

## Usage Efficiency (build economically, without cutting quality)

This project should be built with **minimum wasted tool calls and tokens** — efficiency is a craft goal here, same as visual polish. Concretely:

- **Plan the full component architecture before writing any code**: layout shell, shared components (`Header`, `Footer`, `WhatsAppButton`, `EnquiryForm`, `ListingCard`), and page list — once, up front — so components aren't rebuilt or restructured mid-way.
- **Batch related file writes.** When scaffolding, create grouped files (e.g. all of `lib/data/*`, or a component + its types) in as few consecutive tool calls as reasonably possible rather than one file at a time with narration in between.
- **Reuse shared components everywhere** (`EnquiryForm`, `ListingCard`, CTA buttons) instead of writing near-duplicate markup per page — this cuts both code volume and future edit cost.
- **Screenshot in batches, not per-tweak.** Make a meaningful set of related changes, then verify once — not a screenshot after every single micro-edit (see Screenshot Workflow below).
- **Don't re-read whole files you already have in context** unless they may have changed; re-view only the section being edited when possible.
- **Avoid speculative work**: don't build settings, admin panels, CMS integration, or backend/database code that wasn't asked for "in case it's needed later" — flag it as a future option instead (see Security section for the one exception: secure-by-default scaffolding for anything that *is* built).

None of the above should come at the expense of the Anti-Generic Guardrails, Performance rules, or Pre-Delivery checks below — efficiency is about *how* you get to a high-quality result, not a reason to skip verification.

---

## Always Do First
- **Invoke the project's design-system skill** (`agency-design-system` for this build) before writing any frontend code, every session, no exceptions.
- **Invoke the `ui-ux-pro-max` skill** when the task involves UI structure, visual design decisions, interaction patterns, accessibility, or UX quality control — i.e. whenever the work changes how something **looks, feels, moves, or is interacted with**. Use it for: choosing color/type/spacing systems, building or refactoring components (buttons, modals, forms, tables, nav), interaction states, responsive behavior, and pre-delivery review. Skip it for pure backend/API/infra or non-visual scripting.
- **Invoke the `gsap-animation` skill** whenever building, editing, or debugging any GSAP animation, scroll effect, timeline, or motion — for correct APIs, cleanup, and performance technique. *(If your skill's frontmatter `name:` differs, use that exact name here.)*
- **Precedence:** the active design-system skill (`agency-design-system`) wins on look, feel, and motion — including animation **timing and easing** — over any generic default. `ui-ux-pro-max` and `gsap-animation` are authoritative for accessibility, contrast, focus/interaction states, responsive correctness, and animation *implementation/performance* — use them to make the design *correct, accessible, and performant*, never to override the intended aesthetic. Concretely for this project: **no bounce/spring easing anywhere**, even if a generic guardrail elsewhere suggests it — see the Anti-Generic Guardrails note below.

## Reference Images
- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (images via `https://placehold.co/`, generic copy). Do not improve or add to the design.
- If no reference image: design from scratch with high craft, per `agency-design-system`.
- Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds. Stop only when no visible differences remain or the user says so. Skip the screenshot workflow for dynamic animation-only edits (e.g. tweaking a headline's motion) — only static edits need it.

## Local Server
- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the dev server: `npm run dev` (Next.js) — confirm the port from the terminal output.
- If the server is already running, do not start a second instance.

## Screenshot Workflow
- Puppeteer/Playwright is available in this environment — use whichever is already installed and configured in the project.
- **Always screenshot from localhost**, never a file path.
- Save screenshots to `./temporary-screenshots/` (auto-incremented, never overwritten).
- Read the saved image with the Read tool to actually see and analyze it — don't assume from code alone.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px".
- Check: spacing/padding, font size/weight/line-height, colors (exact hex/token), alignment, border-radius, shadows, image sizing.
- Before screenshotting, decide what you're actually verifying — if the task only touched the navbar, screenshot only the navbar, not the whole page. Batch several related changes into one verification pass rather than one screenshot per micro-edit (see Usage Efficiency above).
- After finishing the task, clean up `./temporary-screenshots/`.

## Output Defaults (generic — overridden for this project, see Project Context)
- Default elsewhere: single `index.html`, inline styles, Tailwind via CDN.
- **For this project:** Next.js App Router, TypeScript, Tailwind via a real build (PostCSS config, purged CSS) — no CDN script tag, this is a production deliverable.
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT` until real vehicle/property photos are supplied.
- Mobile-first responsive, always.

## Brand Assets
- Always check the `brand_assets/` folder before designing. It may contain logos, color guides, style guides, or images.
- If assets exist there, use them, and update the color tokens in `agency-design-system` to match — do not keep the placeholder navy/green if a real palette is provided.
- If a logo is present, use it. If a color palette is defined, use those exact values — do not invent brand colors.

## Anti-Generic Guardrails
- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.) directly. Always route through the `agency-design-system` tokens.
- **Shadows:** Never use flat `shadow-md`. Use the layered, tinted "trust-lift" shadow from `agency-design-system` §2.
- **Typography:** Never use the same font for headings and body — follow the pairing in `agency-design-system` §3. Tight tracking on large headings, generous line-height on body.
- **Gradients:** Fine to use subtly for hero backgrounds/section dividers; keep them cool-toned (navy/white), not decorative rainbow gradients.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. **Use the easing/duration defined in `agency-design-system` §5 — confident, decelerating, no bounce/spring** (this replaces any generic "use spring-style easing" guidance; springy motion undermines the corporate-trust goal on this project).
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Images:** Vehicle/property photos always get the trust-lift treatment (§2 of the design skill) — radius, shadow, reserved `aspect-ratio` box.
- **Spacing:** Use the intentional spacing tokens from `agency-design-system` §4 — not random Tailwind steps.
- **Depth:** Surfaces layer base → elevated → floating (`--bg` → `--surface` → `--surface-2`), not everything on one plane.

## Performance (part of the craft)
- **Images — format & size:** Use modern formats (WebP, or AVIF with a WebP/JPEG fallback). Never ship an oversized image into a small slot — resize to the largest size it actually renders at (≈2× for retina), then compress.
- **Images — reserve space:** Always set explicit `width`/`height` (or wrap in an `aspect-ratio` box) on every image via `next/image` so the browser reserves space and the page doesn't jump as images load.
- **Lazy-loading:** Below-the-fold images lazy-load by default via `next/image`. The hero image (the LCP element) must be `priority` — never lazy-loaded, or first paint feels slow.
- **Font loading — no flash, no shift:** Load fonts via `next/font` (handles preload, `font-display: swap`, and fallback metric matching automatically) — don't hand-roll `@font-face` unless there's a reason to.
- **Scripts:** Avoid render-blocking third-party scripts in `<head>`; defer anything non-critical.
- **Don't animate layout:** stick to `transform`/`opacity` only (already a guardrail above; it's a performance rule too).
- **Verify on real client sites:** When it matters, run a quick Lighthouse pass and watch **LCP, CLS, and total image weight** — treat these as part of "done," not an afterthought.

## Pre-Delivery UX & Accessibility Check
- Before calling any build "done," run the relevant **`ui-ux-pro-max`** checks (apply only what fits the web platform — skip app-only items like safe-area/haptics).
- Minimum bar every time: contrast ≥4.5:1 for body text (≥3:1 large), visible `focus-visible` states on all interactive elements, alt text on meaningful images, full keyboard navigation, labelled form fields with errors near the field, `prefers-reduced-motion` respected, and color never the only indicator of meaning (relevant for the "Verified"/rating badges).
- SVG icons only — never emoji as structural/UI icons.
- This check is additive: it makes the design correct and accessible without changing the intended look.

## Security Requirements (tight, by default)

This is a public lead-generation site handling visitors' names, phone numbers, and travel/rental details — treat it accordingly even though there's no payment flow.

- **No secrets in client code.** Anything sensitive (API keys, future CRM tokens, database credentials) goes in server-only environment variables (`.env.local`, never committed) and is only ever referenced from Server Components / Route Handlers / Server Actions — never `NEXT_PUBLIC_*` unless the value is genuinely safe to expose (e.g. the WhatsApp number itself, which is public by design).
- **Sanitize and validate all enquiry-form input** client-side *and* (if a server route is ever added) server-side, before it's used to construct the `wa.me` message URL — always `encodeURIComponent()` user input; never interpolate raw input into a URL or into `dangerouslySetInnerHTML`.
- **No `dangerouslySetInnerHTML`** anywhere unless content is fully static/trusted copy written by us — never render user-submitted or third-party content this way.
- **Security headers:** set a baseline via `next.config.js` / middleware — `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY` (or `frame-ancestors 'none'` via CSP), `Referrer-Policy: strict-origin-when-cross-origin`, and a reasonably strict `Content-Security-Policy` (allow only the domains actually needed — fonts, image CDN, analytics if added).
- **HTTPS only** in production; if any custom domain/redirect config is touched, ensure HTTP→HTTPS redirect stays intact.
- **Rate-limit any future server endpoint** (e.g. if a lead-capture API route or CRM webhook is added later) — flag this as a to-do rather than shipping an open POST endpoint with no throttling.
- **Dependency hygiene:** stick to well-maintained, minimal dependencies; don't pull in a heavy or unmaintained package for something a few lines of code can do (also an Efficiency win).
- **Privacy:** don't store or log visitor phone numbers/names anywhere server-side unless the user explicitly asks for a database, and if they do, mention adding a short privacy note near the form.
- If Web3Forms, a CRM, or any other third-party form/lead service is added later: after adding the `access_key`/token, remind the user to restrict it to allowed domains in that service's dashboard, and offer to walk them through it — same principle as above, just generalized beyond Web3Forms.

## WhatsApp Enquiry Flow — Correctness Checklist
- Every WhatsApp CTA uses `https://wa.me/[NUMBER]?text=[ENCODED_MESSAGE]` with the number in full international format, no `+`, no spaces.
- Message text is built from a template + the actual field values, always passed through `encodeURIComponent`.
- Links open in a new tab (`target="_blank" rel="noopener noreferrer"`).
- Test the link on both a desktop (opens WhatsApp Web / app chooser) and a mobile-simulated viewport (opens the WhatsApp app directly) during the screenshot/verification pass.

## Optimization & Flaw Scan (run before every delivery)
Treat this as a required pass, not an optional polish. After the build looks right, deliberately hunt for flaws and fix them — don't wait for the user to find them. Fixes must be surgical and must not change the intended design:

- **Console/runtime:** zero errors and zero warnings in the browser console. Check for React key warnings, hydration mismatches, failed asset loads (404s), and GSAP/ScrollTrigger warnings.
- **Animation health** (use the `gsap-animation` skill): no dropped frames or stutter on scroll; only `transform`/`opacity` animated; `gsap.context()`/`useGSAP()` cleanup present; `quickTo` used for mouse-driven motion; `ScrollTrigger.refresh()` called after images/fonts load; no CSS `transition` fighting a GSAP property; no `transition: all`.
- **Layout shift (CLS):** nothing jumps as images/fonts load.
- **Performance:** Lighthouse pass — LCP, CLS, TBT, total image weight. Hero image is `priority`/eager; below-the-fold is lazy.
- **Responsive:** screenshot and verify at mobile, tablet, and desktop widths — not just one.
- **Security:** re-check the Security Requirements section above — no exposed secrets, headers present, all user input encoded before use.
- **Dead code from YOUR changes only:** remove imports/variables/functions your work made unused. Do not touch unrelated dead code — mention it instead.
- **Cross-state:** every interactive element has hover, `focus-visible`, and active states; disabled/empty/error states render correctly.

Report the flaws you found and fixed as a short list, so the user can see what was tightened. If a fix would require changing the design, flag it and ask first rather than silently altering the look.

## Hard Rules
- Do not add sections, features, or content not in the reference (or, absent a reference, not in the master prompt).
- Do not "improve" a reference design — match it.
- Do not stop after one screenshot pass.
- Do not use `transition-all`.
- Do not use default Tailwind blue/indigo as primary color — route through `agency-design-system` tokens.
- Do not use bounce/spring easing anywhere on this project.
- Do not add a payment/checkout flow — this site converts to a WhatsApp conversation, nothing more.
