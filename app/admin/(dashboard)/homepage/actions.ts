"use server";

import { updateTag } from "next/cache";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { removeStorageObjects } from "@/lib/supabase/form-utils";
import type { CategoryThumbnailKey } from "@/lib/data/types";
import type { FormState } from "@/lib/admin/form-state";

export async function updateCategoryThumbnail(
  key: CategoryThumbnailKey,
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const { supabase } = await requireAdmin();

  const image = String(formData.get("image") ?? "").trim();
  const imageAlt = String(formData.get("imageAlt") ?? "").trim();

  const { data: existing } = await supabase
    .from("category_thumbnails")
    .select("image")
    .eq("key", key)
    .maybeSingle();

  if (existing?.image && existing.image !== image) {
    await removeStorageObjects(supabase, "listing-photos", [existing.image]);
  }

  const { error } = await supabase
    .from("category_thumbnails")
    .update({ image: image || null, image_alt: imageAlt || null })
    .eq("key", key);
  if (error) return { error: error.message };

  updateTag("category-thumbnails");
  return { success: true };
}
