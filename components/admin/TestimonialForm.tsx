"use client";

import { useActionState } from "react";
import type { Testimonial } from "@/lib/data/types";
import { TextField } from "./fields/TextField";
import { SelectField } from "./fields/SelectField";
import type { FormState } from "@/app/admin/(dashboard)/testimonials/actions";

const RATINGS = ["5", "4", "3", "2", "1"] as const;

type Props = {
  testimonial?: Testimonial;
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
};

export function TestimonialForm({ testimonial, action }: Props) {
  const [state, formAction, isPending] = useActionState(action, {});

  return (
    <form action={formAction} className="max-w-2xl space-y-5">
      <TextField name="name" label="Client name" defaultValue={testimonial?.name} required />
      <TextField
        name="context"
        label="Context"
        defaultValue={testimonial?.context}
        placeholder="e.g. Self Drive, Guwahati"
        required
      />
      <SelectField
        name="rating"
        label="Rating"
        options={RATINGS}
        defaultValue={testimonial?.rating.toString()}
      />

      <div>
        <label htmlFor="quote" className="mb-1.5 block text-sm font-medium text-ink">
          Quote
        </label>
        <textarea
          id="quote"
          name="quote"
          rows={4}
          required
          defaultValue={testimonial?.quote}
          className="w-full min-h-24 resize-none rounded-xl border border-hairline-strong bg-bg px-4 py-3 text-base text-ink transition-colors duration-[var(--dur-micro)] ease-[var(--ease-out)] focus:outline-none focus:border-navy focus-visible:ring-2 focus-visible:ring-navy"
        />
      </div>

      {state.error && (
        <p role="alert" className="text-sm text-danger">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="min-h-12 rounded-full bg-navy px-6 text-base font-medium text-white transition-colors duration-[var(--dur-micro)] ease-[var(--ease-out)] hover:bg-navy-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50"
      >
        {isPending ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
