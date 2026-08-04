"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { EASE_OUT } from "@/lib/motion";
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
        tl.from(".hero-media", { opacity: 0, scale: 1.06, duration: 1.1 })
          .from(".hero-eyebrow", { opacity: 0, y: 14, duration: 0.5 }, 0.15)
          .from(".hero-subtext", { opacity: 0, y: 16, duration: 0.55 }, 0.5)
          .from(".hero-cta", { opacity: 0, y: 12, duration: 0.5 }, 0.62);

        let split: SplitText | null = null;
        if (headingRef.current) {
          split = SplitText.create(headingRef.current, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit(self) {
              return gsap.from(self.lines, {
                yPercent: 110,
                duration: 0.7,
                stagger: 0.08,
                ease: EASE_OUT,
                delay: 0.28,
              });
            },
          });
        }

        // Slow ambient drift on the background blobs - a continuous, symmetric
        // wave (not an overshoot/bounce ease), so it reads as "alive" rather
        // than as a discrete animated entrance.
        gsap.to(".hero-blob-1", {
          x: 30,
          y: -20,
          duration: 9,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
        gsap.to(".hero-blob-2", {
          x: -24,
          y: 24,
          duration: 11,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        return () => split?.revert();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [".hero-media", ".hero-eyebrow", ".hero-heading", ".hero-subtext", ".hero-cta"],
          { opacity: 1, x: 0, y: 0, scale: 1 }
        );
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      className="relative overflow-hidden bg-bg pb-12 pt-20 lg:pb-20 lg:pt-32"
    >
      <div className="hero-media absolute inset-0" aria-hidden="true">
        <div
          className="hero-blob-1 absolute -right-1/4 -top-1/3 h-[42rem] w-[42rem] rounded-full opacity-40 blur-3xl lg:-right-1/12"
          style={{ background: "radial-gradient(circle, var(--color-brand-blue) 0%, transparent 70%)" }}
        />
        <div
          className="hero-blob-2 absolute -bottom-1/3 -left-1/4 h-[34rem] w-[34rem] rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--color-navy) 0%, transparent 70%)" }}
        />
        <div className="grain-overlay" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <p className="hero-eyebrow mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">
            Car Rentals · Commercial Vehicles · Stays · Full Packages
          </p>
          <h1
            ref={headingRef}
            className="hero-heading font-heading text-5xl font-semibold leading-[1.25] tracking-tighter text-ink sm:text-7xl lg:text-8xl"
          >
            Every trip starts at zero.
          </h1>
          <p className="hero-subtext mt-6 max-w-md text-base leading-relaxed text-ink-muted lg:text-lg">
            Private cars, commercial fleet, and stays: book any of it in one WhatsApp message.
            No forms, no hold music, no online payment.
          </p>
          <div className="hero-cta mt-8">
            <MagneticWrapper>
              <WhatsAppButton variant="block" message={HERO_MESSAGE} label="Enquire on WhatsApp" />
            </MagneticWrapper>
          </div>
        </div>
      </div>
    </div>
  );
}
