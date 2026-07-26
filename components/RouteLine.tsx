"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE_OUT } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const WAYPOINTS = [
  { cx: 40, cy: 150, label: "Zero mile" },
  { cx: 430, cy: 60, label: "Private cars" },
  { cx: 780, cy: 150, label: "Commercial fleet" },
  { cx: 1160, cy: 55, label: "Stays" },
];

/**
 * The site's one signature motion moment (Aesthetic Direction Commitment:
 * "Route Line Editorial"). A single continuous road line draws itself once
 * as it scrolls into view, connecting the three services back to "zero
 * mile" - the grounded, subject-specific device this build is built around.
 *
 * Triggered once (not scroll-scrubbed): an earlier scrub-tied version could
 * render as a large, blank-looking gap whenever viewed or captured before
 * the exact scroll position that starts the draw. A quick triggered reveal
 * is more robust - it finishes shortly after entering view on every device,
 * rather than depending on precise scroll position.
 */
export function RouteLine() {
  const rootRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const path = rootRef.current?.querySelector<SVGPathElement>(".route-path");
        const dots = gsap.utils.toArray<SVGCircleElement>(".route-dot", rootRef.current);
        const labels = gsap.utils.toArray<SVGTextElement>(".route-label", rootRef.current);
        if (!path) return;

        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.set(dots, { scale: 0, transformOrigin: "center" });
        gsap.set(labels, { opacity: 0, y: 6 });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: rootRef.current, start: "top 90%", once: true },
          defaults: { ease: EASE_OUT },
        });
        tl.to(path, { strokeDashoffset: 0, duration: 1.3 })
          .to(dots, { scale: 1, duration: 0.4, stagger: 0.2 }, 0.1)
          .to(labels, { opacity: 1, y: 0, duration: 0.4, stagger: 0.2 }, 0.1);
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        const path = rootRef.current?.querySelector<SVGPathElement>(".route-path");
        const dots = gsap.utils.toArray<SVGCircleElement>(".route-dot", rootRef.current);
        const labels = gsap.utils.toArray<SVGTextElement>(".route-label", rootRef.current);
        if (path) gsap.set(path, { strokeDasharray: "none", strokeDashoffset: 0 });
        gsap.set(dots, { scale: 1 });
        gsap.set(labels, { opacity: 1, y: 0 });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <svg
      ref={rootRef}
      viewBox="0 0 1200 200"
      className="h-auto w-full text-brand-blue"
      role="img"
      aria-label="A route line connecting zero mile to private car rental, commercial fleet, and stays"
    >
      <path
        className="route-path"
        d="M40,150 C220,150 250,60 430,60 C610,60 610,150 780,150 C960,150 990,55 1160,55"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {WAYPOINTS.map((point) => (
        <g key={point.label}>
          <circle className="route-dot" cx={point.cx} cy={point.cy} r="7" fill="var(--color-navy)" />
          <circle className="route-dot" cx={point.cx} cy={point.cy} r="3" fill="var(--color-bg)" />
          <text
            className="route-label"
            x={point.cx}
            y={point.cy - 18}
            textAnchor="middle"
            fontSize="15"
            fontFamily="var(--font-heading)"
            fontWeight="600"
            fill="var(--color-ink-muted)"
          >
            {point.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
