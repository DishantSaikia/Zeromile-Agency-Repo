import type { ComponentType, SVGProps } from "react";

type Props = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label?: string;
};

/**
 * The on-brand stand-in for a listing with no real photo yet (Content
 * Architecture spec: never a broken-image icon or a bare gray box). A
 * quiet diagonal duotone wash in the two brand hues, a large outlined
 * category icon, and a soft dot-grid texture read as a deliberate
 * "photos coming soon" tile rather than an unfinished wireframe.
 */
export function ImagePlaceholder({ icon: Icon, label = "Photo coming soon" }: Props) {
  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center gap-3 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, var(--color-brand-blue-soft) 0%, var(--color-surface-2) 55%, var(--color-brand-blue-soft) 100%)",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(var(--color-navy) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          maskImage: "radial-gradient(ellipse at center, black 0%, transparent 75%)",
        }}
      />
      <Icon className="relative h-12 w-12 text-navy/25" strokeWidth={1.25} />
      <span className="relative text-xs font-medium uppercase tracking-[0.08em] text-ink-faint">
        {label}
      </span>
    </div>
  );
}
