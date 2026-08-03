import { createClient } from "@supabase/supabase-js";

/**
 * Cookie-free client for public, RLS-open reads (site_settings,
 * category_thumbnails) that get wrapped in unstable_cache. The cookie-based
 * client in server.ts calls next/headers' cookies(), which is a dynamic API
 * that Next forbids inside unstable_cache - this client never touches
 * request state, so it's safe there. Only for reads that don't depend on
 * who's asking; anything auth-gated still goes through server.ts.
 */
export function createPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
