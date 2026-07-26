# Mobile Form Design: Actionable Rules

Source: Smashing Magazine, Nick Babich — https://www.smashingmagazine.com/2018/08/best-practices-for-mobile-form-design/
Published: 2018-08-28
Retrieved: 2026-07-17
Confidence tier: practitioner (established web-design publication, not a vendor/standards-body primary source)

## Extracted rules

- Use semantic input types to trigger the correct mobile keyboard:
  `tel` (numeric dialpad), `email`, `date`, `number`, `datetime`, `month`.
- Minimum touch target: 48x48dp, with at least 8dp spacing between
  adjacent interactive elements to prevent mis-taps.
- Single-column layout outperforms multi-column: measured 15.4 seconds
  faster completion. Reserve same-row fields only for short, logically
  paired values (e.g. city/zip).
- Inline validation (dynamic feedback as the user fills the form) beats
  post-submission-only validation: cited figures are 22% higher success
  rate, 42% faster completion, 47% fewer eye fixations. Validate after a
  short pause (roughly 500-1000ms after typing stops) or on field blur —
  not on every keystroke, and not only at submit time.

## Relevance to this project

- Input types, 48px targets, single-column layout: already matches this
  project's `EnquiryForm` component and the fixed 48px tap-target
  correction made during the earlier flaw scan.
- Validation timing: this is a real, sourced case to change. The current
  `EnquiryForm` only validates on submit (chosen earlier for simplicity).
  This source gives a citable, concrete reason to add on-blur inline
  validation for the required name/phone fields instead of submit-only —
  logged as an applied change, not just a stylistic preference.
