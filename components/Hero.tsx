"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { EASE_OUT } from "@/lib/motion";
import { WhatsAppButton } from "./WhatsAppButton";
import { MagneticWrapper } from "./MagneticWrapper";

gsap.registerPlugin(useGSAP);

const HERO_MESSAGE =
  "Hi Zeromile Agency! I'd like to enquire about a car, fleet, or stay booking.";

const QUICK_LINKS = [
  { href: "/self-drive", label: "Self Drive" },
  { href: "/commercial-rental", label: "Commercial Vehicle" },
  { href: "/stays", label: "Stays" },
];

/**
 * Hero photo (public/hero-bg-full.jpg) is a lightly compressed (quality 90
 * JPEG, no resize/crop) re-encode of the original PNG, rendered at its
 * native 1696x757 resolution via `unoptimized` (skips Next's own
 * resize/recompress pipeline - the file is already sized right) and
 * `w-full h-auto` (no `fill`/`object-cover`, so nothing is cropped - the
 * image just scales to the container width at its own aspect ratio). The
 * brand banner plate is absolutely positioned over the bottom of that
 * photo (inset from the sides, rounded top corners only) so it visibly
 * floats above the photo, while the photo's own bottom edge sits flush
 * against the quick-links plate directly below with no gap - the two
 * metal plates still touch each other through the photo's bottom edge.
 * The reference's floating price badge was intentionally dropped (no
 * real per-day price is wired to the homepage), and its "Find Your Car /
 * Filter by Model / Price Range" bar implied a self-service search/filter
 * this site doesn't have (booking is WhatsApp-only, no online catalogue) -
 * kept the visual (metal plate, divided segments) but replaced the content
 * with real category links. Likewise added a WhatsApp CTA below the block
 * - not in the reference, but the site's actual, only conversion path, so
 * it can't be dropped.
 */
export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: EASE_OUT } });
        tl.from(".hero-plate", { opacity: 0, y: 18, duration: 0.55, stagger: 0.12 }).from(
          ".hero-cta",
          { opacity: 0, y: 12, duration: 0.5 },
          0.4
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([".hero-plate", ".hero-cta"], { opacity: 1, y: 0 });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="w-full">
      <div className="relative">
        {/* Mobile and tablet: moderately cropped/zoomed (fixed aspect ratio + object-cover,
            car kept centered via object-position) so the photo renders tall enough for the
            floating plate to have room behind it - the natural aspect ratio is too short
            (~178px at phone widths) below the lg breakpoint. */}
        <div className="relative aspect-[4/3] w-full overflow-hidden lg:hidden">
          <Image
            src="/hero-bg-full.jpg"
            alt="A self-drive car on a winding road through pine forest and mountains"
            fill
            unoptimized
            priority
            sizes="100vw"
            className="object-cover object-[52%_55%]"
          />
        </div>

        {/* lg and up: untouched, full native aspect ratio, no cropping. */}
        <Image
          src="/hero-bg-full.jpg"
          alt="A self-drive car on a winding road through pine forest and mountains"
          width={1696}
          height={757}
          unoptimized
          priority
          className="hidden h-auto w-full lg:block"
        />

        <div className="absolute inset-x-4 bottom-0 sm:inset-x-6 lg:inset-x-8">
          <div className="mx-[14%] hero-plate metal-plate overflow-hidden rounded-t-[1rem] px-[1.35rem] py-[1.64025rem] text-center shadow-[0_24px_48px_-12px_rgba(0,0,0,0.45)] sm:py-[2.29635rem]">
            <h1
              className="text-2xl uppercase leading-none text-[#1a1a1a] sm:text-5xl lg:text-7xl"
              style={{ fontFamily: "var(--font-body)", fontWeight: 560, transform: "scale(1.1, 1.2)" }}
            >
              Zeromile Agency
            </h1>
          </div>
        </div>
      </div>

      <div className="hero-plate metal-plate grid grid-cols-1 divide-y divide-black/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {QUICK_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center justify-center px-6 py-5 text-sm font-semibold uppercase tracking-[0.12em] text-[#1a1a1a] transition-opacity duration-[var(--dur-micro)] ease-[var(--ease-out)] hover:opacity-65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a1a1a] focus-visible:ring-offset-2"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="hero-cta flex justify-center px-4 py-8 sm:px-6 lg:px-8">
        <MagneticWrapper className="sm:w-auto">
          <WhatsAppButton variant="block" message={HERO_MESSAGE} label="Enquire on WhatsApp" />
        </MagneticWrapper>
      </div>
    </div>
  );
}
