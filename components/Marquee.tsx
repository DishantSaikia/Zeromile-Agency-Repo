const ITEMS = [
  "Self Drive",
  "Commercial Vehicles",
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
      {[0, 1, 2, 3].map((copy) => (
        <div key={copy} className="marquee-group" aria-hidden={copy !== 0}>
          {ITEMS.map((item) => (
            <span key={item} className="flex items-center whitespace-nowrap">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-ink-muted">
                {item}
              </span>
              <span className="mx-6 text-xs text-navy" aria-hidden="true">
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
      className="w-full max-w-full overflow-hidden border-y border-hairline py-4"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      {row}
    </div>
  );
}
