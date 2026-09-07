"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { EASE_OUT } from "@/lib/motion";
import { agencyConfig } from "@/lib/config";
import { WhatsAppButton } from "./WhatsAppButton";
import { MagneticWrapper } from "./MagneticWrapper";

gsap.registerPlugin(useGSAP, SplitText);

const HERO_MESSAGE =
  "Hi Zeromile Agency! I'd like to enquire about a car, fleet, or stay booking.";

export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: EASE_OUT } });
        tl.from(".hero-media", { opacity: 0, scale: 1.06, duration: 1.2 })
          .from(".hero-eyebrow", { opacity: 0, y: 14, duration: 0.5 }, 0.5)
          .from(".hero-cta", { opacity: 0, y: 16, duration: 0.55 }, 0.85);

        let split: SplitText | null = null;
        if (headingRef.current) {
          split = SplitText.create(headingRef.current, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit(self) {
              return gsap.from(self.lines, {
                yPercent: 110,
                duration: 0.8,
                stagger: 0.08,
                ease: EASE_OUT,
                delay: 0.55,
              });
            },
          });
        }

        return () => split?.revert();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([".hero-media", ".hero-eyebrow", ".hero-heading", ".hero-cta"], {
          opacity: 1,
          y: 0,
          scale: 1,
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="relative -mt-16 flex min-h-[85vh] items-center overflow-hidden lg:-mt-20 lg:min-h-[92vh]">
      <div className="hero-media absolute inset-0" aria-hidden="true">
        <Image
          src="https://placehold.co/1920x1080/1a1a1a/1a1a1a.png"
          alt=""
          fill
          priority
          unoptimized
          className="object-cover"
        />
        {/* Placeholder background - swap for a real car/road/travel photo
            (matching aspect ratio, ~1920x1080) when one is supplied. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(15,20,15,0.55) 0%, rgba(15,20,15,0.45) 45%, rgba(15,20,15,0.75) 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8">
        <p className="hero-eyebrow mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-white/85 [text-shadow:0_1px_10px_rgba(0,0,0,0.4)]">
          {agencyConfig.tagline}
        </p>
        <h1
          ref={headingRef}
          className="hero-heading font-heading text-6xl font-extrabold leading-[1.32] tracking-tight text-white sm:text-7xl lg:text-8xl"
        >
          Zeromile Agency
        </h1>

        <div className="hero-cta mt-10 w-full max-w-md">
          <MagneticWrapper>
            <WhatsAppButton
              variant="block"
              message={HERO_MESSAGE}
              label="Enquire on WhatsApp"
              className="w-full py-4 text-base shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)]"
            />
          </MagneticWrapper>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-white/70 [text-shadow:0_1px_8px_rgba(0,0,0,0.4)]">
            Car Rentals · Commercial Vehicles · Stays · Full Packages
          </p>
        </div>
      </div>
    </div>
  );
}
