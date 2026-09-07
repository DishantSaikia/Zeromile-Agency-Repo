import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import { Button } from "./Button";
import { ImagePlaceholder } from "./ImagePlaceholder";

type Props = {
  title: string;
  description: string;
  href: string;
  image?: { src: string; alt: string };
  placeholderIcon: ComponentType<SVGProps<SVGSVGElement>>;
  className?: string;
};

export function ServiceCard({
  title,
  description,
  href,
  image,
  placeholderIcon,
  className = "",
}: Props) {
  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-[var(--radius-outer)] bg-bg shadow-[var(--shadow-card)] transition-[transform,box-shadow] duration-[var(--dur-base)] ease-[var(--ease-out)] hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] ${className}`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-2">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            unoptimized
            sizes="(min-width: 1024px) 25vw, 92vw"
            className="object-cover transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out)] group-hover:scale-105"
          />
        ) : (
          <ImagePlaceholder icon={placeholderIcon} />
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-xl font-bold tracking-tight text-ink">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{description}</p>

        <div className="mt-5">
          <Button href={href} variant="primary" size="sm">
            Browse
          </Button>
        </div>
      </div>
    </article>
  );
}
