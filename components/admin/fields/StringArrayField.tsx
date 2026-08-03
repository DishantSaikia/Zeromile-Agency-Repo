"use client";

import { useState } from "react";

type Props = {
  name: string;
  label: string;
  defaultValue?: string[];
  placeholder?: string;
};

export function StringArrayField({ name, label, defaultValue = [], placeholder }: Props) {
  const [items, setItems] = useState<string[]>(defaultValue);
  const [draft, setDraft] = useState("");

  function add() {
    const value = draft.trim();
    if (!value) return;
    setItems((prev) => [...prev, value]);
    setDraft("");
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink">{label}</label>
      <input type="hidden" name={name} value={JSON.stringify(items)} readOnly />

      {items.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-2">
          {items.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-3 py-1.5 text-sm text-ink"
            >
              {item}
              <button
                type="button"
                onClick={() => setItems((prev) => prev.filter((_, idx) => idx !== i))}
                aria-label={`Remove ${item}`}
                className="text-ink-faint transition-colors hover:text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy rounded-full"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder={placeholder}
          className="min-h-12 flex-1 rounded-xl border border-hairline-strong bg-bg px-4 text-base text-ink placeholder:text-ink-faint transition-colors duration-[var(--dur-micro)] ease-[var(--ease-out)] focus:outline-none focus:border-navy focus-visible:ring-2 focus-visible:ring-navy"
        />
        <button
          type="button"
          onClick={add}
          className="min-h-12 rounded-xl border border-hairline-strong px-4 text-sm font-medium text-ink transition-colors duration-[var(--dur-micro)] ease-[var(--ease-out)] hover:border-navy hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
        >
          Add
        </button>
      </div>
    </div>
  );
}
