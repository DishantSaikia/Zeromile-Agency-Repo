"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE_OUT } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = {
  children: ReactNode;
  className?: string;
  itemSelector?: string;
};

/**
 * Same staggered scroll-reveal as RevealGrid, but for grids of cards that
 * carry a real uploaded photo (ListingCard on the self-drive, commercial
 * rental, and stays pages) - each card waits for its own <img> to finish
 * loading before it reveals, so it never fades in over a blank gap where
 * the photo hasn't rendered yet. A card with no photo (still showing the
 * CSS ImagePlaceholder, no <img> in the DOM) reveals immediately on scroll,
 * identical to RevealGrid - this only changes behavior once real photos
 * exist.
 */
export function ImageRevealGrid({ children, className = "", itemSelector = ":scope > *" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = gsap.utils.toArray<HTMLElement>(itemSelector, containerRef.current);
        if (items.length === 0) return;
        gsap.set(items, { opacity: 0, y: 28 });

        const reveal = (el: Element) =>
          gsap.to(el, { opacity: 1, y: 0, duration: 0.6, ease: EASE_OUT, overwrite: true });

        ScrollTrigger.batch(items, {
          start: "top 88%",
          once: true,
          onEnter: (batch) => {
            batch.forEach((el, i) => {
              const img = el.querySelector("img");
              // No <img> yet (placeholder), or already loaded/cached/failed
              // (.complete is true either way) - nothing to wait for.
              if (!img || img.complete) {
                gsap.delayedCall(i * 0.08, () => reveal(el));
                return;
              }
              const onReady = () => reveal(el);
              img.addEventListener("load", onReady, { once: true });
              img.addEventListener("error", onReady, { once: true });
            });
          },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        const items = gsap.utils.toArray<HTMLElement>(itemSelector, containerRef.current);
        gsap.set(items, { opacity: 1, y: 0 });
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
