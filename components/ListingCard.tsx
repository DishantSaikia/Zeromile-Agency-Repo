import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { WhatsAppButton } from "./WhatsAppButton";
import { Button } from "./Button";
import { ArrowRightIcon } from "./icons";

type Spec = { icon: ComponentType<SVGProps<SVGSVGElement>>; label: string };

type Props = {
  title: string;
  subtitle?: string;
  image?: { src: string; alt: string };
  placeholderIcon: ComponentType<SVGProps<SVGSVGElement>>;
  specs?: Spec[];
  price: string;
  priceUnit: string;
  whatsappMessage: string;
  href?: string;
  priority?: boolean;
  className?: string;
};

export function ListingCard({
  title,
  subtitle,
  image,
  placeholderIcon,
  specs = [],
  price,
  priceUnit,
  whatsappMessage,
  href,
  priority = false,
  className = "",
}: Props) {
  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-[var(--radius-outer)] bg-surface shadow-[var(--shadow-card)] transition-[transform,box-shadow] duration-[var(--dur-base)] ease-[var(--ease-out)] hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] ${className}`}
    >
      <div className="image-outline relative aspect-[3/2] w-full overflow-hidden bg-surface-2">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={priority}
            unoptimized
            sizes="(min-width: 1024px) 380px, 92vw"
            className="object-cover transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out)] group-hover:scale-105"
          />
        ) : (
          <ImagePlaceholder icon={placeholderIcon} />
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-heading text-lg tracking-tight text-ink">{title}</h3>
            {subtitle && <p className="mt-0.5 text-sm text-ink-muted">{subtitle}</p>}
          </div>
          <p className="shrink-0 text-right leading-tight">
            <span className="tabular-nums block font-heading text-lg text-navy">
              {price}
            </span>
            <span className="block text-xs text-ink-faint">{priceUnit}</span>
          </p>
        </div>

        {specs.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
            {specs.map((spec, i) => (
              <li key={i} className="flex items-center gap-1.5 text-xs font-medium text-ink-muted">
                <spec.icon className="h-4 w-4 text-ink-faint" />
                {spec.label}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex flex-1 items-end gap-4">
          <WhatsAppButton message={whatsappMessage} label="Enquire" size="sm" className="flex-1" />
          {href && (
            <Button href={href} variant="underline" size="sm">
              Details
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
