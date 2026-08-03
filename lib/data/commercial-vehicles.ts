import { createClient } from "@/lib/supabase/server";
import type { CommercialVehicleCategory } from "./types";

type CommercialVehicleRow = {
  id: string;
  slug: string;
  name: string;
  body_type: CommercialVehicleCategory["bodyType"];
  capacity: string;
  ideal_for: string[];
  description: string;
  images: string[];
  image_alt: string[];
};

function mapRow(row: CommercialVehicleRow): CommercialVehicleCategory {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    bodyType: row.body_type,
    capacity: row.capacity,
    idealFor: row.ideal_for,
    description: row.description,
    images: row.images,
    imageAlt: row.image_alt,
  };
}

export async function getCommercialVehicles(): Promise<CommercialVehicleCategory[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("commercial_vehicles").select("*").order("name");
  if (error) throw error;
  return (data ?? []).map(mapRow);
}

export async function getCommercialVehicleBySlug(
  slug: string
): Promise<CommercialVehicleCategory | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("commercial_vehicles")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data ? mapRow(data) : null;
}
