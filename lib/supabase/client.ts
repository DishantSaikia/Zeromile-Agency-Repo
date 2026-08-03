import { createBrowserClient } from "@supabase/ssr";

// Browser-side client - used by the admin UI for auth (sign in/out) and
// direct-to-Storage photo uploads. Safe to use the anon key here: RLS is the
// real security boundary, not key secrecy.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
