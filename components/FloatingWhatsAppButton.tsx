"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { WhatsAppButton } from "./WhatsAppButton";

function ObservedFloatingButton() {
  const [suppressed, setSuppressed] = useState(false);

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-whatsapp-cta]");
    if (targets.length === 0) return;

    const intersecting = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) intersecting.add(entry.target);
          else intersecting.delete(entry.target);
        }
        setSuppressed(intersecting.size > 0);
      },
      // Shrinks the watched viewport to roughly the bottom-right corner
      // where the floating button itself sits, so this only fires when an
      // inline CTA is actually near it - not just anywhere on the page.
      { rootMargin: "-40% -10% -10% -40%" }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <WhatsAppButton
      variant="floating"
      className={`transition-opacity duration-[var(--dur-base)] ease-[var(--ease-out)] ${
        suppressed ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    />
  );
}

/**
 * The global floating CTA sits bottom-right on every page. That corner is
 * also where inline "Enquire"/"Details" WhatsApp CTAs and info tiles land
 * on several pages at mobile widths - two near-identical green buttons
 * stacked reads as a bug. Remounting on pathname change (via key) gives
 * each page a fresh, correctly-reset suppressed state instead of carrying
 * the previous page's over via a manual effect reset.
 */
export function FloatingWhatsAppButton() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return <ObservedFloatingButton key={pathname} />;
}
