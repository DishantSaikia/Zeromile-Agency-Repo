---
type: "gap"
title: "Manifest Hash Drift in gogh-repo"
status: "seed"
created: "2026-07-17"
updated: "2026-07-17"
tags: ["gogh/ops", "note/gap"]
domain: "ops"
confidence: "evidence-based"
related: ["[[Index]]", "[[Hot]]", "[[Health Scorecard]]"]
source_urls: []
sources: ["[[Source Manifest Guide]]"]
---

# Manifest Hash Drift in gogh-repo

## What happened

While reusing the six-skill registry per the autopilot task, `.raw/skills/`
was copied from `C:\Users\disha\gogh-repo` into this vault and verified
byte-for-byte identical via direct `diff -rq` (confirmed match). `references/skill-registry.json`
was also copied and verified byte-identical via direct `diff`.

The suggested verification method  -  regenerate the registry from the copied
captures via `gogh registry` and diff against the copy  -  could not pass. It
fails with the same `sha256 mismatch for anthropic-frontend-design/blog-post.md`
error whether run against the vault's copy or against `C:\Users\disha\gogh-repo`
directly. This is a pre-existing drift between `gogh-repo`'s own
`.raw/.manifest.json` and the actual current bytes of its own `.raw/skills/`
files  -  not something introduced by the copy.

Regenerating a fresh registry from current file bytes also does not exactly
match the reused `skill-registry.json`: several skills now have more source
files on disk (e.g. `ui-ux-pro-max` has `styles-PROVENANCE.md` and
`styles.csv` on disk that aren't in the reused registry's `source_files`
list) than what the existing registry recorded, meaning the raw captures in
`gogh-repo` have been added to since the registry was last built there.

## Resolution taken

- Kept the reused `references/skill-registry.json` as-is (verified
  byte-identical copy of the known-good file `advise` already worked from).
- Rewrote only this vault's own `.raw/.manifest.json` `sources` entries for
  `.raw/skills/*` with freshly computed sha256 hashes against the files
  actually sitting in this vault, so this vault's own manifest is internally
  consistent going forward.
- Did not attempt to "fix" `gogh-repo` itself  -  out of scope for this
  project's vault, and editing another tool's repo isn't something to do
  silently.

## Why this is flagged, not hidden

Per the ground rules: never invent a rule or present an unverified claim as
fact. This note exists so a future reader (human or agent) knows the
verification step was attempted, why it couldn't pass as literally specified,
and what was done instead  -  rather than a silent "verified" claim that
wouldn't survive a repeat check.
