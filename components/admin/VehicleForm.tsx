"use client";

import { useActionState, useState } from "react";
import type { VehicleCategory } from "@/lib/data/types";
import { TextField } from "./fields/TextField";
import { NumberField } from "./fields/NumberField";
import { SelectField } from "./fields/SelectField";
import { ImageUploadField } from "./fields/ImageUploadField";
import type { FormState } from "@/app/admin/(dashboard)/vehicles/actions";

const BODY_TYPES = ["Sedan", "SUV", "Normal"] as const;
const TRANSMISSIONS = ["Manual", "Automatic"] as const;
const FUELS = ["Petrol", "Diesel", "Electric", "CNG"] as const;

type Props = {
  vehicle?: VehicleCategory;
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
};

export function VehicleForm({ vehicle, action }: Props) {
  const [state, formAction, isPending] = useActionState(action, {});
  const [busy, setBusy] = useState(false);

  return (
    <form action={formAction} className="max-w-2xl space-y-5">
      <TextField name="name" label="Name" defaultValue={vehicle?.name} required />

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField name="bodyType" label="Vehicle type" options={BODY_TYPES} defaultValue={vehicle?.bodyType} />
        <NumberField name="seats" label="Seats" defaultValue={vehicle?.seats} required min={1} />
        <SelectField
          name="transmission"
          label="Gear System"
          options={TRANSMISSIONS}
          defaultValue={vehicle?.transmission}
        />
        <SelectField name="fuel" label="Fuel" options={FUELS} defaultValue={vehicle?.fuel} />
        <NumberField name="pricePerDay" label="Price per day (₹)" defaultValue={vehicle?.pricePerDay} required />
      </div>

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
