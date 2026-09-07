/**
 * DIRECTION CONTRACT — "Northeast Travel" (photo-forward trip operator)
 *
 * THESIS: sell real trips with real photography up front, matching a
 * reference operator site (kazirangatravels.com) the client provided -
 * full-bleed photo hero, green as the sitewide accent (not reserved to
 * WhatsApp CTAs), card-grid listings with a price badge on the photo,
 * serif display headings, black footer band.
 *
 * Supersedes the earlier "Ledger" direction entirely, per explicit client
 * request. See app/globals.css for the full token set.
 *
 * The admin panel (/admin/*) is a deliberate exception - an Operate surface
 * that keeps its original light, functional palette (see .admin-theme in
 * app/globals.css) rather than inheriting this world.
 */

import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Section } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { RevealGrid } from "@/components/RevealGrid";
import { ImageRevealGrid } from "@/components/ImageRevealGrid";
import { Testimonials } from "@/components/Testimonials";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { MagneticWrapper } from "@/components/MagneticWrapper";
import { CarIcon, HomeIcon, TruckIcon } from "@/components/icons";
import { getCategoryThumbnails } from "@/lib/data/category-thumbnails";
import { getTestimonials } from "@/lib/data/testimonials";
import type { CategoryThumbnailKey } from "@/lib/data/types";

const SERVICES = [
  {
    title: "Self Drive",
    description:
      "Hatchbacks to luxury sedans, self-drive only. Ready for city runs, airport transfers, and road trips.",
    href: "/self-drive",
    placeholderIcon: CarIcon,
    thumbnailKey: "self-drive" as CategoryThumbnailKey,
  },
  {
    title: "Commercial Vehicle Rental",
    description:
      "7, 12, and 14-seater vehicles for Travel and Business Logistics.",
    href: "/commercial-rental",
    placeholderIcon: TruckIcon,
    thumbnailKey: "commercial-vehicles" as CategoryThumbnailKey,
  },
  {
    title: "Stays",
    description:
      "Short-term stays for weekend trips or work travel: clear pricing, real amenities, a team you can reach.",
    href: "/stays",
    placeholderIcon: HomeIcon,
    thumbnailKey: "stays" as CategoryThumbnailKey,
  },
];

export default async function Home() {
  const [thumbnails, testimonials] = await Promise.all([getCategoryThumbnails(), getTestimonials()]);
  const thumbnailByKey = new Map(thumbnails.map((t) => [t.key, t]));

  return (
    <>
      <Hero />

      <Marquee />

      <Section eyebrow="What we offer" heading="Three services.">
        <ImageRevealGrid className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const { thumbnailKey, ...cardProps } = service;
            const thumbnail = thumbnailByKey.get(thumbnailKey);
            const image = thumbnail?.image
              ? { src: thumbnail.image, alt: thumbnail.imageAlt ?? service.title }
              : undefined;
            return <ServiceCard key={service.title} image={image} {...cardProps} />;
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
