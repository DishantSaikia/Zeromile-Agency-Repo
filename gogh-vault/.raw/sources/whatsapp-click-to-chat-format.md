# WhatsApp Click-to-Chat (wa.me) Official Format

Source: WhatsApp Help Center, "How to use click to chat" — https://faq.whatsapp.com/5913398998672934/
Secondary corroboration: Meta for Developers, "QR Codes and Short Links" — https://developers.facebook.com/documentation/business-messaging/whatsapp/qr-codes
Retrieved: 2026-07-17 (via search-engine snippet extraction; full page body did not render through the fetch tool, so this is snippet-corroborated rather than a full-page capture)

## Extracted rules

- The click-to-chat link format is `https://wa.me/<number>`.
- `<number>` must be in full international format: country code followed by
  the local number, with no leading `+`, no leading zeros, and no spaces,
  dashes, or brackets.
- Example given: for a number `6123 4567` with country code `+39`, the
  correct link is `https://wa.me/3961234567`.
- Meta's newer "short link" system (`https://wa.me/message/<code>`) is an
  alternative that embeds the pre-filled message server-side instead of in
  the URL query string, and can mask the phone number — this is a newer,
  separate mechanism from the classic `wa.me/<number>?text=<message>` pattern.

## Relevance to this project

This project's `lib/whatsapp.ts` already builds links as
`https://wa.me/<number>?text=<encoded message>` with the number stored
digits-only, no `+`, no spaces, in `lib/config.ts`. This matches the official
format exactly — no code change indicated by this source, but it's now
verified against the official rule rather than assumed correct.
