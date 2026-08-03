"use client";

import { useActionState, useState } from "react";
import type { Package } from "@/lib/data/types";
import { TextField } from "./fields/TextField";
import { NumberField } from "./fields/NumberField";
import { SelectField } from "./fields/SelectField";
import { StringArrayField } from "./fields/StringArrayField";
import { ImageUploadField } from "./fields/ImageUploadField";
import type { FormState } from "@/app/admin/(dashboard)/packages/actions";

type Props = {
  pkg?: Package;
  vehicleOptions: string[];
  stayOptions: string[];
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
};

export function PackageForm({ pkg, vehicleOptions, stayOptions, action }: Props) {
  const [state, formAction, isPending] = useActionState(action, {});
  const [busy, setBusy] = useState(false);

  return (
    <form action={formAction} className="max-w-2xl space-y-5">
      <TextField name="name" label="Package name" defaultValue={pkg?.name} required />

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField name="vehicleName" label="Transport" options={vehicleOptions} defaultValue={pkg?.vehicleName} />
        <SelectField name="stayName" label="Stay" options={stayOptions} defaultValue={pkg?.stayName} />
        <TextField name="duration" label="Duration" defaultValue={pkg?.duration} placeholder="e.g. 3 days, 2 nights" required />
        <NumberField name="price" label="Package price (₹)" defaultValue={pkg?.price} required />
      </div>

      <StringArrayField
        name="highlights"
        label="Highlights"
        defaultValue={pkg?.highlights}
        placeholder="e.g. Sedan, self-drive"
      />

      <div>
        <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-ink">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={pkg?.description}
          className="w-full min-h-24 resize-none rounded-xl border border-hairline-strong bg-bg px-4 py-3 text-base text-ink transition-colors duration-[var(--dur-micro)] ease-[var(--ease-out)] focus:outline-none focus:border-navy focus-visible:ring-2 focus-visible:ring-navy"
        />
      </div>

      <ImageUploadField
        label="Photos"
        defaultImages={pkg ? pkg.images.map((src, i) => ({ src, alt: pkg.imageAlt[i] ?? "" })) : []}
        onBusyChange={setBusy}
      />

      {state.error && (
        <p role="alert" className="text-sm text-danger">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending || busy}
        className="min-h-12 rounded-full bg-navy px-6 text-base font-medium text-white transition-colors duration-[var(--dur-micro)] ease-[var(--ease-out)] hover:bg-navy-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50"
      >
        {isPending ? "Saving…" : busy ? "Uploading photos…" : "Save"}
      </button>
    </form>
  );
}
