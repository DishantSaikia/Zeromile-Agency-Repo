"use client";

import { useActionState, useState } from "react";
import type { CommercialVehicleCategory } from "@/lib/data/types";
import { TextField } from "./fields/TextField";
import { SelectField } from "./fields/SelectField";
import { StringArrayField } from "./fields/StringArrayField";
import { ImageUploadField } from "./fields/ImageUploadField";
import type { FormState } from "@/app/admin/(dashboard)/commercial-vehicles/actions";

const BODY_TYPES = ["14 Seater", "12 Seater", "7 Seater"] as const;

type Props = {
  vehicle?: CommercialVehicleCategory;
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
};

export function CommercialVehicleForm({ vehicle, action }: Props) {
  const [state, formAction, isPending] = useActionState(action, {});
  const [busy, setBusy] = useState(false);

  return (
    <form action={formAction} className="max-w-2xl space-y-5">
      <TextField name="name" label="Name" defaultValue={vehicle?.name} required />

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField name="bodyType" label="Body type" options={BODY_TYPES} defaultValue={vehicle?.bodyType} />
        <TextField name="capacity" label="Capacity" defaultValue={vehicle?.capacity} placeholder="e.g. Up to 750 kg" required />
      </div>

      <StringArrayField
        name="idealFor"
        label="Ideal for"
        defaultValue={vehicle?.idealFor}
        placeholder="e.g. Local goods delivery"
      />

      <div>
        <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-ink">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={vehicle?.description}
          className="w-full min-h-24 resize-none rounded-xl border border-hairline-strong bg-bg px-4 py-3 text-base text-ink transition-colors duration-[var(--dur-micro)] ease-[var(--ease-out)] focus:outline-none focus:border-navy focus-visible:ring-2 focus-visible:ring-navy"
        />
      </div>

      <ImageUploadField
        label="Photos"
        defaultImages={vehicle ? vehicle.images.map((src, i) => ({ src, alt: vehicle.imageAlt[i] ?? "" })) : []}
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
