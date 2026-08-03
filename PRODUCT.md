# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: individual and family travelers in and around Guwahati who need a self-drive car for a city run, airport transfer, or road trip, or a short-term stay for a weekend/work trip. Secondary: businesses needing commercial vehicle rental (7/12/14-seater, GST-invoiced, contract-friendly) for logistics. The redesign should weight toward the primary (individual/family) audience rather than split evenly.

## Product Purpose

Convert a visitor into a WhatsApp conversation that ends in a confirmed booking — a self-drive car, a commercial vehicle, a stay, or a vehicle+stay package. Success is a visitor sending a WhatsApp message with enough context (vehicle/stay/dates) that the team can confirm quickly, without the visitor ever filling out a form or paying online.

## Positioning

No online checkout, no automated multi-step forms — every booking is confirmed through a real WhatsApp conversation with a person, not a system. "Zeromile" is the brand's own framing: every trip's starting point. A neighboring rental-listing site could copy the inventory categories but not the single-conversation booking model or the zero-mile framing.

## Operating Context

WhatsApp Business is the sole booking/enquiry channel — no online payment exists or is planned. The site is a Next.js App Router app with a Supabase-backed admin panel (`/admin`) where the owner manages vehicle/stay/package listings, testimonials, homepage thumbnails, and the site logo directly, without a developer or redeploy. No in-house photography exists yet for vehicles or properties.

## Capabilities and Constraints

- Self-drive vehicles (Hatchback/Sedan/SUV/Luxury), commercial vehicles (7/12/14-seater), short-term stays, and vehicle+stay packages — all admin-editable.
- No online payment or checkout, ever.
- WhatsApp's brand green is reserved exclusively for WhatsApp CTAs — it functions as a recognition/trust signal (visitors know a green button means "this really opens WhatsApp"), not a decorative accent, and stays fixed through any visual redesign.
- Mobile-first is required — most visitors are expected on mobile.
- No real vehicle/property photography exists yet; the current build uses CSS/illustrated placeholder art in its place. The visual redesign should not depend on real photography to read as premium — texture, type, material, and motion should carry the "wow" on their own, so real photography can be added later without forcing another redesign.
- Accessibility floor already enforced and to be preserved: ≥4.5:1 text contrast, visible focus-visible states, full keyboard navigation, `prefers-reduced-motion` respected, meaning never conveyed by color alone.

## Brand Commitments

- Name: Zeromile Agency. Tagline: "Drive Freely. Live Limitless."
- An existing logo asset is in place and is admin-replaceable via `/admin/branding`; treat it as the current mark unless the user provides a new one.
- Contact details (WhatsApp number, phone, email) are centralized in one config file and must stay editable from one place.

## Evidence on Hand

- The 3 testimonials currently shown on the homepage (Ankita R. / self-drive, Debojit Deals Pvt. Ltd. / commercial rental, Priya M. / Lakeview Bungalow stay) are **confirmed placeholder copy written during the build, not real customer quotes.** Treat them as synthetic and labeled as such where relevant; they are not real proof and should be replaced with real quotes when the owner has them.
- No real vehicle or property photography exists yet (see Operating Context).
- There is no specific, confirmed differentiating operational fact (no fixed team size, no guaranteed reply-time stat, no documented handover ritual) beyond "a real person replies on WhatsApp" — the redesign must not invent proof points (staff size, reply-time guarantees, inspection rituals, etc.) beyond what's already true on the site today.

## Product Principles

1. Every booking path collapses to one WhatsApp message — minimize the distance between visitor intent and a real reply.
2. Trust is built through a human conversation, not a checkout flow or a wall of automated proof — never simulate payment/checkout UI, and never fabricate proof points the business can't back up.
3. The primary audience is individual/family travelers, not businesses — commercial fleet rental is real but secondary, and shouldn't dominate the visual weight of the story the site tells.
4. The premium feel must come from craft (type, material, motion, texture) rather than from photography that doesn't exist yet.
5. WhatsApp green stays a functional trust signal exclusive to WhatsApp actions, never a decorative brand color, regardless of how the rest of the palette changes.

## Accessibility & Inclusion

WCAG AA text contrast (≥4.5:1 body, ≥3:1 large text), visible `focus-visible` states on all interactive elements, full keyboard navigation, `prefers-reduced-motion` respected sitewide, and color never the sole indicator of meaning (relevant for rating/status indicators).
