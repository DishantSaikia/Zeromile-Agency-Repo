import { RevealGrid } from "./RevealGrid";
import type { Testimonial } from "@/lib/data/types";

type Props = {
  testimonials: Testimonial[];
};

/**
 * Signed register lines, not a card+shadow+star-rating grid - that formula
 * is the single most templated "trust section" pattern there is, and
 * ServiceCard already rejected the same card formula elsewhere on this page.
 * Each entry reads like a witnessed line in Zeromile's own ledger: a quote,
 * then a signature (name, context, rating) rather than a star row up top.
 */
export function Testimonials({ testimonials }: Props) {
  if (testimonials.length === 0) return null;

  return (
    <RevealGrid className="divide-y divide-hairline border-y border-hairline">
      {testimonials.map((t, i) => (
        <figure key={t.id} className="grid gap-3 py-8 lg:grid-cols-[5rem_1fr] lg:gap-10 lg:py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-navy lg:pt-1">
            N&deg; {String(i + 1).padStart(2, "0")}
          </p>
          <div>
            <blockquote className="font-serif text-lg italic leading-relaxed text-ink lg:text-xl">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm">
              <span className="font-semibold text-ink">{t.name}</span>
              <span className="text-ink-muted">{t.context}</span>
              <span className="text-ink-faint">&middot; {t.rating}/5</span>
            </figcaption>
          </div>
        </figure>
      ))}
    </RevealGrid>
  );
}
