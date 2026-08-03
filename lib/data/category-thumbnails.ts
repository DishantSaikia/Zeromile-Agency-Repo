import { unstable_cache } from "next/cache";
import { createPublicClient } from "@/lib/supabase/public";
import type { CategoryThumbnail, CategoryThumbnailKey } from "./types";

const ORDER: CategoryThumbnailKey[] = ["self-drive", "commercial-vehicles", "stays", "packages"];

type Row = { key: CategoryThumbnailKey; image: string | null; image_alt: string | null };

function mapRow(row: Row): CategoryThumbnail {
  return { key: row.key, image: row.image, imageAlt: row.image_alt };
}

/**
 * Cached (not force-dynamic) - read on every homepage view, so an uncached
 * per-request DB call here would tax that page on every load. Invalidated
 * instantly via revalidateTag("category-thumbnails") when the admin saves a
 * thumbnail, so there's no staleness window despite the cache.
 *
 * Always returns all 4 keys in a fixed order, even if a row is somehow
 * missing - callers (the homepage and its admin editor) index by key and
 * shouldn't have to handle a partial result.
 */
const readCategoryThumbnails = unstable_cache(
  async (): Promise<CategoryThumbnail[]> => {
    const supabase = createPublicClient();
    const { data, error } = await supabase.from("category_thumbnails").select("key, image, image_alt");
    if (error) throw error;

    const byKey = new Map((data ?? []).map((row: Row) => [row.key, mapRow(row)]));
    return ORDER.map((key) => byKey.get(key) ?? { key, image: null, imageAlt: null });
  },
  ["category-thumbnails"],
  { tags: ["category-thumbnails"] }
);

export async function getCategoryThumbnails(): Promise<CategoryThumbnail[]> {
  return readCategoryThumbnails();
}
