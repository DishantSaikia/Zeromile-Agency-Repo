export type ListingImage = { src: string; alt: string };

/**
 * Zips a listing row's parallel images/imageAlt arrays into {src,alt}
 * pairs. Every row already carries its own images (Supabase Storage public
 * URLs), so this takes the already-fetched item directly rather than
 * re-looking it up - no extra query, no N+1 risk across a listing grid.
 */
export function getListingImages(item: { images: string[]; imageAlt: string[] }): ListingImage[] {
  return item.images.map((src, i) => ({ src, alt: item.imageAlt[i] ?? "" }));
}
