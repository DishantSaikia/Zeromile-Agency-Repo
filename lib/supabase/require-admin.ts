import { createClient } from "./server";

/**
 * Every mutating Server Action calls this first. RLS is the real backstop,
 * but a middleware matcher typo shouldn't be the only thing standing
 * between the internet and a delete button - always getUser(), never
 * getSession() (getSession reads the cookie's JWT without revalidating it
 * against the auth server, so a forged cookie could pass it).
 */
export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated.");
  return { supabase, user };
}
