// Shared motion constants - mirrors the CSS custom properties in globals.css
// so GSAP tweens and CSS transitions move with the same confident,
// decelerating character. No bounce/spring easing anywhere on this project.
export const EASE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";
export const EASE_IN_OUT = "cubic-bezier(0.65, 0, 0.35, 1)";

export const DUR_MICRO = 0.18;
export const DUR_BASE = 0.45;
export const DUR_SLOW = 0.7;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
