"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Every ScrollTrigger (RevealGrid, ImageRevealGrid) caches its start/end scroll
 * positions from layout at creation time - before custom web fonts swap in
 * (next/font uses display: swap) and before below-the-fold images finish
 * loading. Either can reflow the page afterward, leaving those cached
 * positions stale so reveals fire at the wrong scroll point. One global
 * refresh once fonts and the full page are ready fixes every trigger
 * sitewide, so individual components don't each need to know about this.
 */
export function ScrollTriggerRefresh() {
  useEffect(() => {
    let cancelled = false;
    const refresh = () => {
      if (!cancelled) ScrollTrigger.refresh();
    };

    document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      cancelled = true;
      window.removeEventListener("load", refresh);
    };
  }, []);

  return null;
}
