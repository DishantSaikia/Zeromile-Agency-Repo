import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost" | "underline";

const variantClasses: Record<Variant, string> = {
  // A stamped brass plate, not a soft app-UI pill - the tightened
  // --radius-inner reads as an engraved edge, not a rounded button.
  primary: "rounded-[var(--radius-inner)] bg-navy text-on-navy hover:bg-navy-deep active:bg-navy-deep",
  outline:
    "rounded-[var(--radius-inner)] border border-hairline-strong text-ink hover:border-navy hover:text-navy bg-transparent",
  ghost: "rounded-[var(--radius-inner)] text-navy hover:bg-brand-blue-soft",
  // The editorial secondary-action treatment: a text link with a thick
  // accent underline instead of another bordered pill, so not every
  // clickable element reads as the same boxed button.
  underline:
    "rounded-none border-b-2 border-brand-blue px-0 text-ink hover:border-navy hover:text-navy",
};

const sizeClasses: Record<"md" | "sm", string> = {
  md: "px-6 min-h-12 text-[0.9375rem]",
  sm: "px-4 min-h-12 text-sm",
};

const underlineSizeClasses: Record<"md" | "sm", string> = {
  md: "min-h-12 py-3 text-[0.9375rem]",
  sm: "min-h-12 py-3 text-sm",
};

const sharedClasses =
  "inline-flex items-center justify-center gap-2 font-medium tracking-tight transition-colors duration-[var(--dur-micro)] ease-[var(--ease-out)] cursor-pointer active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50 disabled:cursor-not-allowed";

type CommonProps = {
  variant?: Variant;
  size?: "md" | "sm";
  children: ReactNode;
  className?: string;
};

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; type?: never };

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", children, className = "", ...rest } = props;
  const sizing = variant === "underline" ? underlineSizeClasses[size] : sizeClasses[size];
  const classes = `${sharedClasses} ${sizing} ${variantClasses[variant]} ${className}`;

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string;
    };
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {children}
      </Link>
    );
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type="button" className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
