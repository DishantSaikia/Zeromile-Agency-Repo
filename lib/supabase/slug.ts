import type { SupabaseClient } from "@supabase/supabase-js";

export function slugify(input: string): string {
  return input.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "item";
}

/**
 * Static arrays only had unique slugs by hand discipline. An admin-editable
 * slug needs it enforced - appends -2, -3, etc. on collision rather than
 * silently overwriting or erroring on the admin.
 */
export async function uniqueSlug(
  supabase: SupabaseClient,
  table: string,
  base: string,
  excludeId?: string
): Promise<string> {
  let slug = base;
  let suffix = 2;
  for (;;) {
    let query = supabase.from(table).select("id").eq("slug", slug);
    if (excludeId) query = query.neq("id", excludeId);
    const { data } = await query.maybeSingle();
    if (!data) return slug;
    slug = `${base}-${suffix++}`;
  }
}
