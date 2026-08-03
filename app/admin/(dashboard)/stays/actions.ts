"use server";

import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { slugify, uniqueSlug } from "@/lib/supabase/slug";
import { parseJsonArray, removeStorageObjects } from "@/lib/supabase/form-utils";

export type FormState = { error?: string };

function readFields(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    location: String(formData.get("location") ?? ""),
    price_per_night: Number(formData.get("pricePerNight")),
    max_guests: Number(formData.get("maxGuests")),
    bedrooms: Number(formData.get("bedrooms")),
    beds: Number(formData.get("beds")),
    baths: Number(formData.get("baths")),
    amenities: parseJsonArray(formData.get("amenities")),
    description: String(formData.get("description") ?? ""),
    check_in_time: String(formData.get("checkInTime") ?? ""),
    check_out_time: String(formData.get("checkOutTime") ?? ""),
    images: parseJsonArray(formData.get("images")),
    image_alt: parseJsonArray(formData.get("imageAlt")),
  };
}

export async function createStay(_prevState: FormState, formData: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const fields = readFields(formData);
  if (!fields.title) return { error: "Title is required." };

  const slug = await uniqueSlug(supabase, "stays", slugify(fields.title));
  const { error } = await supabase.from("stays").insert({ slug, ...fields });
  if (error) return { error: error.message };

  redirect("/admin/stays");
}

export async function updateStay(
  id: string,
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const fields = readFields(formData);
  if (!fields.title) return { error: "Title is required." };

  const { data: existing } = await supabase.from("stays").select("images").eq("id", id).maybeSingle();
  const removed = (existing?.images ?? []).filter((url: string) => !fields.images.includes(url));
  await removeStorageObjects(supabase, "listing-photos", removed);

  const { error } = await supabase.from("stays").update(fields).eq("id", id);
  if (error) return { error: error.message };

  redirect("/admin/stays");
}

export async function deleteStay(id: string): Promise<void> {
  const { supabase } = await requireAdmin();
  const { data: existing } = await supabase.from("stays").select("images").eq("id", id).maybeSingle();
  await removeStorageObjects(supabase, "listing-photos", existing?.images ?? []);
  await supabase.from("stays").delete().eq("id", id);
}
