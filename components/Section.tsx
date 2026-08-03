import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  heading?: ReactNode;
  subheading?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
};

export function Section({
  eyebrow,
  heading,
  subheading,
  children,
  className = "",
  containerClassName = "",
  id,
}: Props) {
  return (
    <section id={id} className={`py-12 lg:py-24 ${className}`}>
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${containerClassName}`}>
        {(eyebrow || heading || subheading) && (
          <div className="mb-8 max-w-2xl lg:mb-12">
            {eyebrow && (
              <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue">
                {eyebrow}
              </p>
            )}
            {heading && (
              <>
                <div className="mb-4 h-px w-12 bg-navy" aria-hidden="true" />
                <h2 className="font-heading text-4xl tracking-tight text-ink lg:text-6xl">
                  {heading}
                </h2>
              </>
            )}
            {subheading && (
              <p className="mt-3 text-base leading-relaxed text-ink-muted lg:text-lg">{subheading}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
