import { createClient } from "@/lib/supabase/server";
import type { VehicleCategory } from "./types";

type VehicleRow = {
  id: string;
  slug: string;
  name: string;
  body_type: VehicleCategory["bodyType"];
  seats: number;
  transmission: VehicleCategory["transmission"];
  fuel: VehicleCategory["fuel"];
  price_per_day: number;
  description: string;
  images: string[];
  image_alt: string[];
};

function mapRow(row: VehicleRow): VehicleCategory {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    bodyType: row.body_type,
    seats: row.seats,
    transmission: row.transmission,
    fuel: row.fuel,
    pricePerDay: row.price_per_day,
    description: row.description,
    images: row.images,
    imageAlt: row.image_alt,
  };
}

export async function getVehicles(): Promise<VehicleCategory[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .order("price_per_day", { ascending: true });
  if (error) throw error;
  return (data ?? []).map(mapRow);
}

export async function getVehicleBySlug(slug: string): Promise<VehicleCategory | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("vehicles").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return data ? mapRow(data) : null;
}
