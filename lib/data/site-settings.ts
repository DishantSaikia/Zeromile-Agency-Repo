import { unstable_cache } from "next/cache";
import { createPublicClient } from "@/lib/supabase/public";
import type { SiteSettings } from "./types";

/**
 * Cached (not force-dynamic) - this is read from the root layout on every
 * page, so an uncached per-request DB call here would tax the entire site.
 * Invalidated instantly via revalidateTag("site-settings") when the admin
 * saves a new logo, so there's no staleness window despite the cache.
 */
const readSiteSettings = unstable_cache(
  async (): Promise<SiteSettings> => {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("logo, logo_alt")
      .eq("id", 1)
      .maybeSingle();
    if (error) throw error;
    return { logo: data?.logo ?? null, logoAlt: data?.logo_alt ?? null };
  },
  ["site-settings"],
  { tags: ["site-settings"] }
);

export async function getSiteSettings(): Promise<SiteSettings> {
  return readSiteSettings();
}
