"use client";

import { useActionState, useState } from "react";
import type { Stay } from "@/lib/data/types";
import { TextField } from "./fields/TextField";
import { NumberField } from "./fields/NumberField";
import { StringArrayField } from "./fields/StringArrayField";
import { ImageUploadField } from "./fields/ImageUploadField";
import type { FormState } from "@/app/admin/(dashboard)/stays/actions";

type Props = {
  stay?: Stay;
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
};

export function StayForm({ stay, action }: Props) {
  const [state, formAction, isPending] = useActionState(action, {});
  const [busy, setBusy] = useState(false);

  return (
    <form action={formAction} className="max-w-2xl space-y-5">
      <TextField name="title" label="Title" defaultValue={stay?.title} required />
      <TextField name="location" label="Location" defaultValue={stay?.location} required />

      <div className="grid gap-5 sm:grid-cols-3">
        <NumberField name="pricePerNight" label="Price per night (₹)" defaultValue={stay?.pricePerNight} required />
        <NumberField name="maxGuests" label="Max guests" defaultValue={stay?.maxGuests} required min={1} />
        <NumberField name="bedrooms" label="Bedrooms" defaultValue={stay?.bedrooms} required min={0} />
        <NumberField name="beds" label="Beds" defaultValue={stay?.beds} required min={0} />
        <NumberField name="baths" label="Baths" defaultValue={stay?.baths} required min={0} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField name="checkInTime" label="Check-in time" defaultValue={stay?.checkInTime} placeholder="e.g. 2:00 PM" required />
        <TextField name="checkOutTime" label="Check-out time" defaultValue={stay?.checkOutTime} placeholder="e.g. 11:00 AM" required />
      </div>

      <StringArrayField name="amenities" label="Amenities" defaultValue={stay?.amenities} placeholder="e.g. Wi-Fi" />

      <div>
        <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-ink">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={stay?.description}
          className="w-full min-h-24 resize-none rounded-xl border border-hairline-strong bg-bg px-4 py-3 text-base text-ink transition-colors duration-[var(--dur-micro)] ease-[var(--ease-out)] focus:outline-none focus:border-navy focus-visible:ring-2 focus-visible:ring-navy"
        />
      </div>

      <ImageUploadField
        label="Photos"
        defaultImages={stay ? stay.images.map((src, i) => ({ src, alt: stay.imageAlt[i] ?? "" })) : []}
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
