"use server";

import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { slugify, uniqueSlug } from "@/lib/supabase/slug";
import { parseJsonArray, removeStorageObjects } from "@/lib/supabase/form-utils";

export type FormState = { error?: string };

function readFields(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    // Vehicle/stay are chosen from live dropdowns for a typo-free admin
    // experience, but written as plain denormalized text - a package stays
    // valid even if the referenced vehicle/stay is later renamed or removed.
    vehicle_name: String(formData.get("vehicleName") ?? ""),
    stay_name: String(formData.get("stayName") ?? ""),
    duration: String(formData.get("duration") ?? ""),
    price: Number(formData.get("price")),
    description: String(formData.get("description") ?? ""),
    highlights: parseJsonArray(formData.get("highlights")),
    images: parseJsonArray(formData.get("images")),
    image_alt: parseJsonArray(formData.get("imageAlt")),
  };
}

export async function createPackage(_prevState: FormState, formData: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const fields = readFields(formData);
  if (!fields.name) return { error: "Name is required." };

  const slug = await uniqueSlug(supabase, "packages", slugify(fields.name));
  const { error } = await supabase.from("packages").insert({ slug, ...fields });
  if (error) return { error: error.message };

  redirect("/admin/packages");
}

export async function updatePackage(
  id: string,
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const fields = readFields(formData);
  if (!fields.name) return { error: "Name is required." };

  const { data: existing } = await supabase.from("packages").select("images").eq("id", id).maybeSingle();
  const removed = (existing?.images ?? []).filter((url: string) => !fields.images.includes(url));
  await removeStorageObjects(supabase, "listing-photos", removed);

  const { error } = await supabase.from("packages").update(fields).eq("id", id);
  if (error) return { error: error.message };

  redirect("/admin/packages");
}

export async function deletePackage(id: string): Promise<void> {
  const { supabase } = await requireAdmin();
  const { data: existing } = await supabase.from("packages").select("images").eq("id", id).maybeSingle();
  await removeStorageObjects(supabase, "listing-photos", existing?.images ?? []);
  await supabase.from("packages").delete().eq("id", id);
}
