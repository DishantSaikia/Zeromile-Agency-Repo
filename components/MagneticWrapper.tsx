"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

gsap.registerPlugin(useGSAP);

/**
 * Wraps a single CTA so it pulls toward the cursor on desktop hover, then
 * eases back to rest. Reserved for the one or two most prominent CTAs
 * (Hero, final CTA) rather than applied to every button - Anthropic's own
 * guidance is to concentrate a flourish rather than scatter it everywhere.
 */
export function MagneticWrapper({ children, className = "" }: { children: ReactNode; className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const el = rootRef.current;
      if (!supportsHover || reduced || !el) return;

      const setX = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
      const setY = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

      const onMove = contextSafe!((e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        setX(relX * 0.3);
        setY(relY * 0.3);
      });

      const onLeave = contextSafe!(() => {
        setX(0);
        setY(0);
      });

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className={`inline-block w-full sm:w-auto ${className}`}>
      {children}
    </div>
  );
}
