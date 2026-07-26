const ITEMS = [
  "Private Car Rental",
  "Commercial Fleet",
  "Stays",
  "Zero Mile",
  "Booked on WhatsApp",
];

/**
 * Pure CSS infinite marquee - no JS dependency to render, and the global
 * prefers-reduced-motion rule in globals.css freezes the animation for
 * users who ask for it.
 */
export function Marquee() {
  const row = (
    <div className="marquee-track">
      {[0, 1].map((copy) => (
        <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
          {ITEMS.map((item) => (
            <span key={item} className="flex items-center whitespace-nowrap">
              <span className="font-heading text-2xl font-semibold tracking-tight text-ink/90 lg:text-3xl">
                {item}
              </span>
              <span className="mx-8 text-2xl text-brand-blue lg:text-3xl" aria-hidden="true">
                &bull;
              </span>
            </span>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div
      className="overflow-hidden border-y border-hairline py-6"
      role="presentation"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      {row}
    </div>
  );
}
