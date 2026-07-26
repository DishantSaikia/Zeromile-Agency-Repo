# Task: Drive the Zeromile Agency gogh vault to full operating maturity

You are working in `C:\Users\disha\OneDrive\Desktop\Zeromile Agency`. A gogh
vault already exists at `gogh-vault/` (scaffolded, client-name "Zeromile
Agency", owner "Dishant") but has not been populated. Your job is to run it
through gogh's real pipeline — not just create files — so it produces genuine,
source-cited design guidance for this project, then apply that guidance to
the actual site.

## Use the full clone directly — don't rebuild what already exists

Gogh's README describes 5 "Maturity Gates" (Scaffolded → Researched →
Domain-adapted → Demo-verified → Market-ready), gated by
`audit_brain.py --require market-ready`. That ladder describes the **gogh
tool/repo itself**, not any client vault — `audit_brain.py` hardcodes its own
repo path and takes no `--vault` argument, it always audits whichever
installation it physically lives in. That gate is already satisfied,
permanently, at the full clone: `C:\Users\disha\gogh-repo` — confirmed
`Status: market-ready`, `Score: 100`. Don't try to re-earn that; it's done.

More usefully: **the `gogh` CLI is already pip-installed (editable) from that
exact clone** — running `gogh` anywhere on this machine runs the real,
complete, market-ready implementation. Confirm with `pip show gogh` (should
show `Editable project location: C:\Users\disha\gogh-repo`). Use the `gogh`
command directly throughout this task, not raw `python scripts/*.py` calls,
and not the pruned `~/.claude/skills/gogh/` copy — that copy is a Claude-Skill
subset missing `tests/`, `examples/`, `install.sh`, `pyproject.toml`, and
matters only for the skill's chat-triggering, not for actually running the
pipeline.

**Also reuse work that's already done.** `C:\Users\disha\gogh-repo` already
contains real, dated, source-cited captures of all six stacked skills at
`.raw/skills/<skill-id>/` and the resulting built registry at
`references/skill-registry.json`. This is generic (not project-specific) —
it's the same six skills for every client. Do not re-fetch these from GitHub
or rebuild the registry from scratch. Instead, copy them into the vault so it
stays self-contained and gogh's own tooling finds them at their default
relative paths:

```
robocopy "C:\Users\disha\gogh-repo\.raw\skills" "<vault>\.raw\skills" /E
copy "C:\Users\disha\gogh-repo\references\skill-registry.json" "<vault>\references\skill-registry.json"
```

(`<vault>` = `C:\Users\disha\OneDrive\Desktop\Zeromile Agency\gogh-vault`
throughout this document. Create `<vault>\references\` first if it doesn't
exist.) Verify the copy with `gogh registry --raw-dir <vault>\.raw\skills
--manifest <vault>\.raw\.manifest.json --out <vault>\references\skill-registry.json`
— re-running it against the copied captures should reproduce the same file,
which proves the copy is intact and not something you need to regenerate by
hand.

The real, vault-specific work — the part that's actually worth doing well
here — is everything downstream of that: ingesting genuinely project-relevant
sources, synthesizing, getting a stack-advisor report tailored to this brief,
and applying the result to the live code. That's the pipeline below.

## Ground rules (from gogh's own SKILL.md — do not skip)

1. Read `<vault>\CODEX.md`, `<vault>\wiki\hot.md`, and `<vault>\wiki\index.md`
   before changing anything.
2. Preserve `.raw\` as immutable — never edit captured source material after
   ingest, only add to it.
3. Never invent a rule, threshold, or dial value. Every design rule you record
   must cite a canonical upstream capture or a `references\source-ledger.json`
   entry. Mark unverified claims as such rather than presenting them as fact.
4. Record research evidence in `<vault>\references\source-ledger.json` and
   domain-adapter completion in `<vault>\references\adapter-manifest.json` as
   you go.
5. Keep `hot.md`, `index.md`, `overview.md`, and `log.md` current after each
   phase — don't let them go stale.
6. This project already has a hard-constraints document at
   `C:\Users\disha\OneDrive\Desktop\Zeromile Agency\SKILL.md`
   ("agency-design-system"). Gogh has full authority over aesthetic decisions
   (palette, type, layout, motion feel, micro-interactions) but **never**
   overrides that file's business/functional constraints (WhatsApp CTA color
   reservation, mobile-first breakpoints, no payment UI, accessibility floor,
   no bounce/spring easing, trust-pattern rules). If a gogh recommendation
   would conflict with a Section 1 constraint there, the constraint wins — log
   the conflict in `wiki\decisions\` rather than silently picking one.

## Pipeline — run each phase, verify, then move on

Confirmed CLI surface (`gogh --help` / `gogh <cmd> --help`):
`gogh {new, ingest, synthesize, report, visuals, lint, next, registry, diff,
advise, demo}`. Vault already exists — do **not** run `gogh new` again.

1. **Reuse the six-skill registry** — see the copy commands above. Verify
   `<vault>\references\skill-registry.json` exists and has `"skill_count": 6`.

2. **Ingest real project-specific sources.** This is the part that's
   genuinely new work: primary/official sources on mobile booking-flow UX,
   WhatsApp Business CTA conventions, trust signals for peer-to-peer
   car/property rental sites, and anything else that actually informs this
   brief — not the six design skills again.
   `gogh ingest --vault "<vault>" --file <source.md>`
   Per gogh's Research Policy, prefer official/primary/vendor documentation;
   blog roundups and AI summaries don't satisfy the gate. If a source isn't
   network-reachable, note the gap in `wiki\gaps\` rather than fabricating a
   citation.
   → Verify: `references\source-ledger.json` has real dated entries.

3. **Synthesize starter deliverables:**
   `gogh synthesize --vault "<vault>"`
   → Verify: new notes appear under `wiki\` beyond the seed stubs.

4. **Build the project brief and get the stack-advisor report.** Schema
   confirmed from `C:\Users\disha\gogh-repo\tests\fixtures\project-brief.json`:
   ```json
   {"project_type": "...", "brand_maturity": "partial", "motion": "...", "density": "...", "accessibility": "strict"}
   ```
   Read the project's own `SKILL.md` and `README.md` first and justify each
   field in a wiki note rather than guessing — e.g. `brand_maturity: "partial"`
   because Section 2 of that SKILL.md explicitly says a first-pass system
   exists but gogh may fully replace it; `accessibility: "strict"` because of
   the explicit accessibility floor in Section 1.
   `gogh advise --brief <vault>\project-brief.json --registry <vault>\references\skill-registry.json --out <vault>\wiki\reports\stack-advice.md`
   → Verify: the report names concrete skills, an order of use, dial
   settings, and flags conflicts (e.g. a skill's default motion intensity vs.
   this project's explicit "no bounce/spring/elastic easing" constraint).

5. **Generate visuals:** `gogh visuals --vault "<vault>"`

6. **Lint before calling anything done:**
   `gogh lint --vault "<vault>"`
   → Fix everything it flags. Do not proceed with lint errors outstanding.

7. **Check what's still open:**
   `gogh next --vault "<vault>"`
   → Follow it until it has nothing left to surface.

8. **Apply the guidance to the real site.** A vault full of good advice that
   never touches the codebase isn't done. Cross-reference the stack-advisor
   report and synthesized notes against the actual Next.js app in `app\`,
   `components\`, and the existing `brand_assets\`. For each concrete
   recommendation (palette, type pairing, spacing scale, shadow recipe,
   motion timing, component treatment), either implement it or log a specific
   reason it's deferred in `wiki\decisions\`. Re-run the Section 4 pre-flight
   checklist in the project's own `SKILL.md` before considering any page
   done — gogh's own quality is not a substitute for those hard constraints.

## Efficiency notes

- Don't rebuild anything that's already correct and reusable (see the
  registry reuse above) — that was the main inefficiency to avoid.
- Don't loop or re-run a phase whose output didn't change.
- Batch source ingestion (several `gogh ingest` calls) rather than
  interleaving with other phases.
- If a step errors, read it and fix the actual cause — don't hand-write the
  file it was supposed to produce; that breaks the "no invented rules" gate.
- When done, report: what was ingested (with sources), what the
  stack-advisor recommended, what was actually applied to the site vs.
  deferred and why, and the output of a final `gogh lint` run.
