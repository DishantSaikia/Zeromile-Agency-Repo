const STATS = [
  { value: "8+", label: "years in operation" },
  { value: "120+", label: "vehicles in fleet" },
  { value: "15+", label: "cities served" },
  { value: "<10 min", label: "average reply time" },
];

/**
 * A flowing trust line, not a bordered grid of big-number/small-label
 * tiles - the same four facts without the stat-bar template read.
 */
export function TrustBar() {
  return (
    <div className="border-y border-hairline py-6 lg:py-7">
      <p className="mx-auto flex max-w-7xl flex-wrap items-baseline gap-x-2.5 gap-y-1.5 px-4 text-sm text-ink-muted sm:px-6 lg:px-8">
        {STATS.map((stat, i) => (
          <span key={stat.label} className="flex items-baseline gap-x-2.5">
            {i > 0 && <span aria-hidden="true">·</span>}
            <span>
              <span className="tabular-nums font-heading font-semibold text-ink">{stat.value}</span>{" "}
              {stat.label}
            </span>
          </span>
        ))}
      </p>
    </div>
  );
}
