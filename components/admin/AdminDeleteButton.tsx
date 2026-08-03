"use client";

import { useState, useTransition } from "react";

type Props = {
  action: () => Promise<void>;
  itemLabel: string;
};

export function AdminDeleteButton({ action, itemLabel }: Props) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        disabled={isPending}
        onClick={() => {
          if (!confirm(`Delete "${itemLabel}"? This can't be undone.`)) return;
          setError(null);
          startTransition(() => {
            action().catch(() => setError("Delete failed - try again."));
          });
        }}
        className="text-sm font-medium text-danger transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger rounded disabled:opacity-50"
      >
        {isPending ? "Deleting…" : "Delete"}
      </button>
      {error && <span className="text-xs text-danger">{error}</span>}
    </div>
  );
}
