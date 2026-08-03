"use server";

import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { slugify, uniqueSlug } from "@/lib/supabase/slug";
import { parseJsonArray, removeStorageObjects } from "@/lib/supabase/form-utils";

export type FormState = { error?: string };

function readFields(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    body_type: String(formData.get("bodyType") ?? ""),
    seats: Number(formData.get("seats")),
    transmission: String(formData.get("transmission") ?? ""),
    fuel: String(formData.get("fuel") ?? ""),
    price_per_day: Number(formData.get("pricePerDay")),
    description: String(formData.get("description") ?? ""),
    images: parseJsonArray(formData.get("images")),
    image_alt: parseJsonArray(formData.get("imageAlt")),
  };
}

export async function createVehicle(_prevState: FormState, formData: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const fields = readFields(formData);
  if (!fields.name) return { error: "Name is required." };

  const slug = await uniqueSlug(supabase, "vehicles", slugify(fields.name));
  const { error } = await supabase.from("vehicles").insert({ slug, ...fields });
  if (error) return { error: error.message };

  redirect("/admin/vehicles");
}

export async function updateVehicle(
  id: string,
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const fields = readFields(formData);
  if (!fields.name) return { error: "Name is required." };

  const { data: existing } = await supabase.from("vehicles").select("images").eq("id", id).maybeSingle();
  const removed = (existing?.images ?? []).filter((url: string) => !fields.images.includes(url));
  await removeStorageObjects(supabase, "listing-photos", removed);

  const { error } = await supabase.from("vehicles").update(fields).eq("id", id);
  if (error) return { error: error.message };

  redirect("/admin/vehicles");
}

export async function deleteVehicle(id: string): Promise<void> {
  const { supabase } = await requireAdmin();
  const { data: existing } = await supabase.from("vehicles").select("images").eq("id", id).maybeSingle();
  await removeStorageObjects(supabase, "listing-photos", existing?.images ?? []);
  await supabase.from("vehicles").delete().eq("id", id);
}
