import Image from "next/image";
import Link from "next/link";
import { AdminDeleteButton } from "./AdminDeleteButton";

type Row = {
  key: string;
  title: string;
  subtitle?: string;
  meta?: string;
  image?: { src: string; alt: string };
  editHref: string;
  onDelete: () => Promise<void>;
};

type Props = {
  rows: Row[];
  emptyLabel: string;
  newHref: string;
  newLabel: string;
};

export function AdminTable({ rows, emptyLabel, newHref, newLabel }: Props) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-ink-muted">
          {rows.length} item{rows.length === 1 ? "" : "s"}
        </p>
        <Link
          href={newHref}
          className="rounded-full bg-navy px-5 py-2.5 text-sm font-medium text-white transition-colors duration-[var(--dur-micro)] ease-[var(--ease-out)] hover:bg-navy-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          {newLabel}
        </Link>
      </div>

      {rows.length === 0 ? (
        <p className="mt-6 text-sm text-ink-muted">{emptyLabel}</p>
      ) : (
        <ul className="mt-6 divide-y divide-hairline rounded-2xl border border-hairline bg-surface">
          {rows.map((row) => (
            <li key={row.key} className="flex items-center justify-between gap-4 px-5 py-4">
              <div className="flex min-w-0 items-center gap-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-hairline bg-surface-2">
                  {row.image && (
                    <Image src={row.image.src} alt={row.image.alt} fill unoptimized sizes="56px" className="object-cover" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-heading text-base text-ink">{row.title}</p>
                  {row.subtitle && <p className="mt-0.5 truncate text-sm text-ink-muted">{row.subtitle}</p>}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-4">
                {row.meta && (
                  <span className="tabular-nums text-sm font-medium text-navy">{row.meta}</span>
                )}
                <Link
                  href={row.editHref}
                  className="text-sm font-medium text-navy transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy rounded"
                >
                  Edit
                </Link>
                <AdminDeleteButton action={row.onDelete} itemLabel={row.title} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
