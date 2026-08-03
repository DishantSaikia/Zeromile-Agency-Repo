import type { SupabaseClient } from "@supabase/supabase-js";
import { storagePathFromPublicUrl } from "./storage-path";

export function parseJsonArray(value: FormDataEntryValue | null): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(String(value));
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === "string") : [];
  } catch {
    return [];
  }
}

export async function removeStorageObjects(
  supabase: SupabaseClient,
  bucket: string,
  removedUrls: string[]
) {
  if (removedUrls.length === 0) return;
  const paths = removedUrls
    .map((url) => storagePathFromPublicUrl(url, bucket))
    .filter((p): p is string => Boolean(p));
  if (paths.length > 0) await supabase.storage.from(bucket).remove(paths);
}
