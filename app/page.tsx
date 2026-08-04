/**
 * DIRECTION CONTRACT — "The Ledger" (leather guestbook / hand-inked register)
 *
 * THESIS: the site is Zeromile's own running ledger of every trip arranged -
 * each booking a dated, signed entry, not a card in a feature grid. Refuses
 * the blurred-gradient-blob hero + card-grid-feature-list + testimonial-card
 * arrangement that any AI-generated or templated site would ship unchanged.
 *
 * OWN-WORLD: a bound ledger's leather cover, not its page - deep oxblood as
 * the dominant, enveloping ground; warm ivory "opened page" reserved for a
 * few illuminated moments (the hero's mounted photo plate, service card
 * plates); aged brass for engraved emphasis, rules, and stamped buttons.
 * Libre Caslon Display (a single hand-set weight, no synthetic bolding) for
 * every heading; WhatsApp green stays exactly as reserved as it always was.
 *
 * STORY: a visitor understands within seconds that every booking here is
 * personally recorded, not processed by a system - and that a single
 * WhatsApp message is how their own entry gets made.
 *
 * FIRST VIEWPORT: Hero.tsx - reverted to its original, simpler pre-redesign
 * form (gradient-blob background, headline, subtext, single CTA) at the
 * client's explicit request, superseding the "ledger frontispiece" version
 * described below. Everything else on the page stays on the ledger system.
 *
 * FORM: leather guestbook / hand-inked ledger register - candidate 3 of 7
 * derived from the boutique-hospitality-luxury brief (split-flap dispatch
 * board, brass-engraved plaque, *leather guestbook*, tailor's fitting
 * ticket, turndown stationery, aviation dispatch, literal hotel site).
 * Assigned via concept-seed.mjs (impeccable skill, scope: direction, mode:
 * persuade, seed 57b1bba9) - not the author's own top-ranked pick, by
 * design. Weighed against catalog challengers (a neubrutalist system, a
 * 1914 wood-type manifesto page, a drum-machine step-sequencer aesthetic,
 * assorted split-screen/dense-texture layouts); none serve a boutique-
 * hospitality-luxury brief, so the assigned grounded direction won cleanly
 * on both audience identification and product clarity.
 *
 * The admin panel (/admin/*) is a deliberate exception - an Operate surface
 * that keeps its original light, functional palette (see .admin-theme in
 * app/globals.css) rather than inheriting this world.
 */

import { Hero } from "@/components/Hero";
import { RouteLine } from "@/components/RouteLine";
import { Marquee } from "@/components/Marquee";
import { Section } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { RevealGrid } from "@/components/RevealGrid";
import { ImageRevealGrid } from "@/components/ImageRevealGrid";
import { Testimonials } from "@/components/Testimonials";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { MagneticWrapper } from "@/components/MagneticWrapper";
import { CarIcon, HomeIcon, PackageIcon, TruckIcon } from "@/components/icons";
import { getCategoryThumbnails } from "@/lib/data/category-thumbnails";
import { getTestimonials } from "@/lib/data/testimonials";
import type { CategoryThumbnailKey } from "@/lib/data/types";

const SERVICES = [
  {
    title: "Self Drive",
    description:
      "Hatchbacks to luxury sedans, self-drive only. Ready for city runs, airport transfers, and road trips.",
    href: "/self-drive",
    whatsappMessage: "Hi! I'd like to enquire about self-drive car rental.",
    placeholderIcon: CarIcon,
    thumbnailKey: "self-drive" as CategoryThumbnailKey,
  },
  {
    title: "Commercial Vehicle Rental",
    description:
      "7, 12, and 14-seater vehicles for Travel and Business Logistics.",
    href: "/commercial-rental",
    whatsappMessage: "Hi! I'd like to enquire about commercial vehicle rental.",
    placeholderIcon: TruckIcon,
    thumbnailKey: "commercial-vehicles" as CategoryThumbnailKey,
  },
  {
    title: "Stays",
    description:
      "Short-term stays for weekend trips or work travel: clear pricing, real amenities, a team you can reach.",
    href: "/stays",
    whatsappMessage: "Hi! I'd like to enquire about a stay.",
    placeholderIcon: HomeIcon,
    thumbnailKey: "stays" as CategoryThumbnailKey,
  },
  {
    title: "Packages",
    description:
      "A vehicle and a stay, bundled for weekend trips, hill escapes, and family getaways: one price, one booking.",
    href: "/packages",
    whatsappMessage: "Hi! I'd like to enquire about a package.",
    placeholderIcon: PackageIcon,
    thumbnailKey: "packages" as CategoryThumbnailKey,
  },
];

export default async function Home() {
  const [thumbnails, testimonials] = await Promise.all([getCategoryThumbnails(), getTestimonials()]);
  const thumbnailByKey = new Map(thumbnails.map((t) => [t.key, t]));

  return (
    <>
      <Hero />

      <Marquee />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <RouteLine />
      </div>

      <Section heading="Three services. One conversation.">
        <ImageRevealGrid className="flex flex-col">
          {SERVICES.map((service, i) => {
            const { thumbnailKey, ...cardProps } = service;
            const thumbnail = thumbnailByKey.get(thumbnailKey);
            const image = thumbnail?.image
              ? { src: thumbnail.image, alt: thumbnail.imageAlt ?? service.title }
              : undefined;
            return (
              <ServiceCard
                key={service.title}
                entryNumber={i + 1}
                reverse={i % 2 === 1}
                image={image}
                {...cardProps}
              />
            );
          })}
        </ImageRevealGrid>
      </Section>

      {testimonials.length > 0 && (
        <Section
          heading="What clients say"
          subheading="A few notes from recent private, commercial, and stay bookings."
        >
          <Testimonials testimonials={testimonials} />
        </Section>
      )}

      <Section className="bg-surface" containerClassName="text-center">
        <RevealGrid>
          <div className="mx-auto mb-4 h-px w-12 bg-navy" aria-hidden="true" />
          <h2 className="font-heading text-4xl tracking-tight text-ink lg:text-6xl">
            Ready when you are.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-muted lg:text-lg">
            Send us a message on WhatsApp and we&apos;ll help you find the right car, fleet, or stay.
          </p>
          <div className="mt-8 flex justify-center">
            <MagneticWrapper className="sm:w-auto">
              <WhatsAppButton variant="block" label="Start a WhatsApp chat" />
            </MagneticWrapper>
          </div>
        </RevealGrid>
      </Section>
    </>
  );
}
