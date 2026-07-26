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
 * Staggered scroll-reveal for card grids (service cards, vehicle/stay
 * listings). One shared implementation so every grid gets the same
 * signature motion instead of re-implementing ScrollTrigger per page.
 */
export function RevealGrid({ children, className = "", itemSelector = ":scope > *" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = gsap.utils.toArray<HTMLElement>(itemSelector, containerRef.current);
        if (items.length === 0) return;
        gsap.set(items, { opacity: 0, y: 28 });
        ScrollTrigger.batch(items, {
          start: "top 88%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: EASE_OUT,
              stagger: 0.08,
              overwrite: true,
            }),
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
