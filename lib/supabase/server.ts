import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Server-side client for Server Components/Actions/Route Handlers. Reads
// the logged-in admin's session from cookies, so every query/mutation made
// through this client runs as that user - RLS decides what it can touch.
// Public pages get the same anon-level read access RLS grants everyone.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component render - middleware is what
            // actually refreshes the session cookie on the next request.
          }
        },
      },
    }
  );
}
