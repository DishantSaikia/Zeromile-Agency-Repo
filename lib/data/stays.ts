import { createClient } from "@/lib/supabase/server";
import type { Stay } from "./types";

type StayRow = {
  id: string;
  slug: string;
  title: string;
  location: string;
  price_per_night: number;
  max_guests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  amenities: string[];
  description: string;
  check_in_time: string;
  check_out_time: string;
  images: string[];
  image_alt: string[];
};

function mapRow(row: StayRow): Stay {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    location: row.location,
    pricePerNight: row.price_per_night,
    maxGuests: row.max_guests,
    bedrooms: row.bedrooms,
    beds: row.beds,
    baths: row.baths,
    amenities: row.amenities,
    description: row.description,
    checkInTime: row.check_in_time,
    checkOutTime: row.check_out_time,
    images: row.images,
    imageAlt: row.image_alt,
  };
}

export async function getStays(): Promise<Stay[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("stays")
    .select("*")
    .order("price_per_night", { ascending: true });
  if (error) throw error;
  return (data ?? []).map(mapRow);
}

export async function getStayBySlug(slug: string): Promise<Stay | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("stays").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return data ? mapRow(data) : null;
}
