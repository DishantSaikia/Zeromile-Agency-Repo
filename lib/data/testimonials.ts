import { unstable_cache } from "next/cache";
import { createPublicClient } from "@/lib/supabase/public";
import type { Testimonial } from "./types";

type Row = { id: string; quote: string; name: string; context: string; rating: number };

function mapRow(row: Row): Testimonial {
  return { id: row.id, quote: row.quote, name: row.name, context: row.context, rating: row.rating };
}

/**
 * Cached (not force-dynamic) - read on every homepage view, same reasoning
 * as getCategoryThumbnails/getSiteSettings. Invalidated instantly via
 * updateTag("testimonials") whenever the admin adds/edits/deletes one.
 */
const readTestimonials = unstable_cache(
  async (): Promise<Testimonial[]> => {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("id, quote, name, context, rating")
      .order("created_at", { ascending: true });
    if (error) throw error;
    return (data ?? []).map(mapRow);
  },
  ["testimonials"],
  { tags: ["testimonials"] }
);

export async function getTestimonials(): Promise<Testimonial[]> {
  return readTestimonials();
}
