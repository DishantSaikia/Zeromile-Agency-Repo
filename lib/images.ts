import { vehicles } from "./data/vehicles";
import { commercialVehicles } from "./data/commercial-vehicles";
import { stays } from "./data/stays";
import { packages } from "./data/packages";

export type ListingKind = "vehicle" | "commercial-vehicle" | "stay" | "package";
export type ListingImage = { src: string; alt: string };

const SOURCES = {
  vehicle: vehicles,
  "commercial-vehicle": commercialVehicles,
  stay: stays,
  package: packages,
} as const;

/**
 * Single seam between the content layer and every page/component that
 * renders a photo. Today this just reads the images/imageAlt arrays already
 * on the matching data object. When real photo storage (S3 / Vercel Blob /
 * Cloudinary / Supabase Storage) is wired up later, only this function
 * changes - callers stay untouched.
 */
export function getListingImages(kind: ListingKind, slug: string): ListingImage[] {
  const source = SOURCES[kind];
  const item = source.find((entry) => entry.slug === slug);
  if (!item) return [];
  return item.images.map((src, i) => ({ src, alt: item.imageAlt[i] ?? "" }));
}
