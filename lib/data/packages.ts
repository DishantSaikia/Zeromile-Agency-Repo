import { createClient } from "@/lib/supabase/server";
import type { Package } from "./types";

type PackageRow = {
  id: string;
  slug: string;
  name: string;
  vehicle_name: string;
  stay_name: string;
  duration: string;
  price: number;
  description: string;
  highlights: string[];
  images: string[];
  image_alt: string[];
};

function mapRow(row: PackageRow): Package {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    vehicleName: row.vehicle_name,
    stayName: row.stay_name,
    duration: row.duration,
    price: row.price,
    description: row.description,
    highlights: row.highlights,
    images: row.images,
    imageAlt: row.image_alt,
  };
}

export async function getPackages(): Promise<Package[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("packages").select("*").order("price", { ascending: true });
  if (error) throw error;
  return (data ?? []).map(mapRow);
}

export async function getPackageBySlug(slug: string): Promise<Package | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("packages").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return data ? mapRow(data) : null;
}
