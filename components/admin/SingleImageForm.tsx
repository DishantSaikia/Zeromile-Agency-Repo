"use client";

import { useActionState, useState } from "react";
import { SingleImageUploadField } from "./fields/SingleImageUploadField";
import type { FormState } from "@/lib/admin/form-state";

type Props = {
  label: string;
  description: string;
  defaultImage?: { src: string; alt: string };
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
};

export function SingleImageForm({ label, description, defaultImage, action }: Props) {
  const [state, formAction, isPending] = useActionState(action, {});
  const [busy, setBusy] = useState(false);

  return (
    <form action={formAction} className="border-t border-hairline py-6 first:border-t-0 first:pt-0">
      <h2 className="font-heading text-lg tracking-tight text-ink">{label}</h2>
      <p className="mt-1 text-sm text-ink-muted">{description}</p>

      <div className="mt-4">
        <SingleImageUploadField label="Photo" defaultImage={defaultImage} onBusyChange={setBusy} />
      </div>

      {state.error && (
        <p role="alert" className="mt-3 text-sm text-danger">
          {state.error}
        </p>
      )}

      <div className="mt-4 flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending || busy}
          className="min-h-11 rounded-full bg-navy px-5 text-sm font-medium text-white transition-colors duration-[var(--dur-micro)] ease-[var(--ease-out)] hover:bg-navy-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50"
        >
          {isPending ? "Saving…" : busy ? "Uploading photo…" : "Save"}
        </button>
        {state.success && !isPending && (
          <span className="text-sm text-navy">Saved.</span>
        )}
      </div>
    </form>
  );
}
