"use server";

import { updateTag } from "next/cache";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { removeStorageObjects } from "@/lib/supabase/form-utils";
import type { FormState } from "@/lib/admin/form-state";

export async function updateLogo(_prevState: FormState, formData: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();

  const logo = String(formData.get("image") ?? "").trim();
  const logoAlt = String(formData.get("imageAlt") ?? "").trim();

  const { data: existing } = await supabase
    .from("site_settings")
    .select("logo")
    .eq("id", 1)
    .maybeSingle();

  if (existing?.logo && existing.logo !== logo) {
    await removeStorageObjects(supabase, "listing-photos", [existing.logo]);
  }

  const { error } = await supabase
    .from("site_settings")
    .update({ logo: logo || null, logo_alt: logoAlt || null })
    .eq("id", 1);
  if (error) return { error: error.message };

  updateTag("site-settings");
  return { success: true };
}
