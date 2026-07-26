import { StarIcon } from "./icons";

type Testimonial = {
  quote: string;
  name: string;
  context: string;
  rating: number;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Booked a self-drive SUV for a family trip with a single WhatsApp message. No forms, no waiting on hold - just a quick chat and the car was ready.",
    name: "Ankita R.",
    context: "Private car rental, Guwahati",
    rating: 5,
  },
  {
    quote:
      "We've used their tempo fleet for three months of inter-city deliveries. GST invoicing was sorted from day one and the vehicles are always on time.",
    name: "Debojit Deals Pvt. Ltd.",
    context: "Commercial rental, ongoing contract",
    rating: 5,
  },
  {
    quote:
      "The Lakeview Bungalow was exactly as described. Check-in was simple and the team was reachable the whole stay in case we needed anything.",
    name: "Priya M.",
    context: "Stays, Lakeview Bungalow",
    rating: 4,
  },
];

export function Testimonials() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {TESTIMONIALS.map((t) => (
        <figure
          key={t.name}
          className="flex flex-col rounded-[var(--radius-outer)] bg-surface p-6 shadow-[var(--shadow-card)]"
        >
          <div className="flex items-center gap-1" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                className={`h-4 w-4 ${i < t.rating ? "text-gold" : "text-hairline-strong"}`}
              />
            ))}
          </div>
          <span className="sr-only">{t.rating} out of 5 stars</span>

          <blockquote className="mt-4 flex-1 font-serif text-[1.0625rem] italic leading-relaxed text-ink">
            &ldquo;{t.quote}&rdquo;
          </blockquote>

          <figcaption className="mt-5 border-t border-hairline pt-4">
            <p className="text-sm font-semibold text-ink">{t.name}</p>
            <p className="text-xs text-ink-muted">{t.context}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
