"use server";

import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { requireAdmin } from "@/lib/supabase/require-admin";

export type FormState = { error?: string };

function readFields(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    context: String(formData.get("context") ?? "").trim(),
    rating: Number(formData.get("rating")),
    quote: String(formData.get("quote") ?? "").trim(),
  };
}

export async function createTestimonial(_prevState: FormState, formData: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const fields = readFields(formData);
  if (!fields.name || !fields.quote) return { error: "Name and quote are required." };

  const { error } = await supabase.from("testimonials").insert(fields);
  if (error) return { error: error.message };

  updateTag("testimonials");
  redirect("/admin/testimonials");
}

export async function updateTestimonial(
  id: string,
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const fields = readFields(formData);
  if (!fields.name || !fields.quote) return { error: "Name and quote are required." };

  const { error } = await supabase.from("testimonials").update(fields).eq("id", id);
  if (error) return { error: error.message };

  updateTag("testimonials");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string): Promise<void> {
  const { supabase } = await requireAdmin();
  await supabase.from("testimonials").delete().eq("id", id);
  updateTag("testimonials");
}
