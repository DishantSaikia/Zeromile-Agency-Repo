import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import { WhatsAppButton } from "./WhatsAppButton";
import { Button } from "./Button";
import { ImagePlaceholder } from "./ImagePlaceholder";

type Props = {
  title: string;
  description: string;
  href: string;
  whatsappMessage: string;
  image?: { src: string; alt: string };
  placeholderIcon: ComponentType<SVGProps<SVGSVGElement>>;
  entryNumber: number;
  reverse?: boolean;
  className?: string;
};

/**
 * Deliberately not a bordered/shadowed card. The direction commitment
 * (the ledger register) rejects the icon-badge + card + shadow formula
 * repeated everywhere - this is a full-bleed editorial row instead, so the
 * one card treatment on the site (ListingCard) stays meaningful rather than
 * copy-pasted onto every section. Each row reads as a numbered register
 * entry rather than a generic feature card - the number is the entry's own
 * position in Zeromile's register, not decorative section numbering.
 */
export function ServiceCard({
  title,
  description,
  href,
  whatsappMessage,
  image,
  placeholderIcon,
  entryNumber,
  reverse = false,
  className = "",
}: Props) {
  const entryLabel = String(entryNumber).padStart(2, "0");

  return (
    <article
      className={`service-row group grid items-center gap-8 border-t border-hairline py-10 first:border-t-0 first:pt-0 lg:grid-cols-2 lg:gap-14 lg:py-14 ${className}`}
    >
      <div className={reverse ? "lg:order-2" : ""}>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-navy">
          Entry N&deg; {entryLabel}
        </p>
        <h3 className="font-heading text-3xl tracking-tight text-ink lg:text-4xl">
          {title}
        </h3>
        <p className="mt-4 max-w-md text-base leading-relaxed text-ink-muted">{description}</p>

        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
          <WhatsAppButton message={whatsappMessage} label="Enquire on WhatsApp" />
          <Button href={href} variant="underline">
            Learn more
          </Button>
        </div>
      </div>

      <div className={reverse ? "lg:order-1" : ""}>
        <div className="image-outline relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-outer)] bg-surface-2">
          {image ? (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              unoptimized
              sizes="(min-width: 1024px) 46vw, 92vw"
              className="object-cover transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out)] group-hover:scale-105"
            />
          ) : (
            <ImagePlaceholder icon={placeholderIcon} />
          )}
          <div className="absolute bottom-4 left-4 bg-navy px-2.5 py-1 text-[0.625rem] font-medium uppercase tracking-[0.15em] text-on-navy">
            Plate N&deg; {entryLabel}
          </div>
        </div>
      </div>
    </article>
  );
}
