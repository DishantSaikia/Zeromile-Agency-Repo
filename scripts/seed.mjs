/**
 * One-time seed: inserts the content that used to live in the static
 * lib/data/*.ts arrays into the new Supabase tables, so the site doesn't go
 * blank on cutover. Run once, locally, after applying supabase/schema.sql:
 *
 *   node --env-file=.env.local scripts/seed.mjs
 *
 * Needs SUPABASE_SERVICE_ROLE_KEY (bypasses RLS for the insert) alongside
 * NEXT_PUBLIC_SUPABASE_URL in .env.local. The service-role key is never
 * used anywhere else in this app and never gets deployed - safe to rotate
 * it in the Supabase dashboard after running this once, if you want.
 */
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(url, serviceKey);

const vehicles = [
  {
    slug: "normal",
    name: "Normal",
    body_type: "Normal",
    seats: 4,
    transmission: "Manual",
    fuel: "Petrol",
    price_per_day: 1800,
    drive_options: ["self-drive", "chauffeur"],
    description: "Easy to park, easy on fuel - a practical pick for city errands and short trips.",
    images: [],
    image_alt: [],
  },
  {
    slug: "sedan",
    name: "Sedan",
    body_type: "Sedan",
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    price_per_day: 2800,
    drive_options: ["self-drive", "chauffeur"],
    description: "A comfortable, composed ride for business travel, airport runs, and family outings.",
    images: [],
    image_alt: [],
  },
  {
    slug: "suv",
    name: "SUV",
    body_type: "SUV",
    seats: 7,
    transmission: "Automatic",
    fuel: "Diesel",
    price_per_day: 4200,
    drive_options: ["self-drive", "chauffeur"],
    description: "Room for the whole group and the luggage - built for highway trips and rough patches alike.",
    images: [],
    image_alt: [],
  },
];

const commercialVehicles = [
  {
    slug: "mini-truck",
    name: "Mini-Truck",
    body_type: "Mini-Truck",
    capacity: "Up to 750 kg",
    ideal_for: ["Local goods delivery", "Small business restocking", "Office relocations"],
    description: "Nimble in city traffic with enough load space for regular commercial runs.",
    images: [],
    image_alt: [],
  },
  {
    slug: "tempo",
    name: "Tempo",
    body_type: "Tempo",
    capacity: "Up to 1500 kg",
    ideal_for: ["Bulk goods transport", "Inter-city freight", "Event logistics"],
    description: "A mid-size workhorse for heavier loads and longer commercial routes.",
    images: [],
    image_alt: [],
  },
  {
    slug: "van",
    name: "Van",
    body_type: "Van",
    capacity: "9-12 seats or cargo equivalent",
    ideal_for: ["Staff transport", "Airport transfers for groups", "Equipment transport"],
    description: "Flexible for passengers or cargo - a common pick for staff and crew transport contracts.",
    images: [],
    image_alt: [],
  },
  {
    slug: "bus",
    name: "Bus",
    body_type: "Bus",
    capacity: "25-40 seats",
    ideal_for: ["Corporate group travel", "School/institutional transport", "Long-term contracts"],
    description: "For larger groups and long-term contracts - fleet-backed and GST-invoiced.",
    images: [],
    image_alt: [],
  },
];

const stays = [
  {
    slug: "riverside-cottage",
    title: "Riverside Cottage",
    location: "Riverside, Guwahati",
    price_per_night: 3200,
    max_guests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 1,
    amenities: ["Wi-Fi", "Free parking", "Kitchen", "River view", "Air conditioning"],
    description: "A quiet two-bedroom cottage steps from the water, with a private porch for evenings in.",
    check_in_time: "2:00 PM",
    check_out_time: "11:00 AM",
    images: [],
    image_alt: [],
  },
  {
    slug: "hillside-studio",
    title: "Hillside Studio",
    location: "Shillong Road, Hills",
    price_per_night: 2400,
    max_guests: 2,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    amenities: ["Wi-Fi", "Mountain view", "Heater", "Kitchenette"],
    description: "A compact studio with panoramic hill views - well suited to a quiet weekend for two.",
    check_in_time: "1:00 PM",
    check_out_time: "10:00 AM",
    images: [],
    image_alt: [],
  },
  {
    slug: "city-loft",
    title: "City Loft",
    location: "Downtown, Guwahati",
    price_per_night: 4100,
    max_guests: 3,
    bedrooms: 1,
    beds: 2,
    baths: 1,
    amenities: ["Wi-Fi", "Elevator", "Workspace", "Air conditioning", "Washing machine"],
    description: "A well-appointed loft close to the business district, built for short work trips.",
    check_in_time: "3:00 PM",
    check_out_time: "11:00 AM",
    images: [],
    image_alt: [],
  },
  {
    slug: "lakeview-bungalow",
    title: "Lakeview Bungalow",
    location: "Lake Road, Guwahati",
    price_per_night: 5600,
    max_guests: 6,
    bedrooms: 3,
    beds: 3,
    baths: 2,
    amenities: ["Wi-Fi", "Free parking", "Lake view", "Garden", "Kitchen", "Air conditioning"],
    description: "A full bungalow for families or groups, with a garden that opens onto the lake path.",
    check_in_time: "2:00 PM",
    check_out_time: "11:00 AM",
    images: [],
    image_alt: [],
  },
];

const packages = [
  {
    slug: "weekend-getaway",
    name: "Weekend Getaway",
    vehicle_name: "Sedan",
    stay_name: "Riverside Cottage",
    duration: "3 days, 2 nights",
    price: 13999,
    description:
      "A self-drive or chauffeured sedan and two nights by the river - built for a short reset without much planning.",
    highlights: [
      "Sedan, self-drive or chauffeur-driven",
      "2 nights at Riverside Cottage, Guwahati",
      "Flexible pickup and check-in times",
    ],
    images: [],
    image_alt: [],
  },
  {
    slug: "hill-escape",
    name: "Hill Escape",
    vehicle_name: "SUV",
    stay_name: "Hillside Studio",
    duration: "3 days, 2 nights",
    price: 15999,
    description:
      "An SUV built for hill roads and a quiet studio with panoramic views - a well-suited pick for two.",
    highlights: [
      "SUV with automatic transmission",
      "2 nights at Hillside Studio, Shillong Road",
      "Ideal for winding hill routes",
    ],
    images: [],
    image_alt: [],
  },
  {
    slug: "city-business-trip",
    name: "City Business Trip",
    vehicle_name: "Sedan",
    stay_name: "City Loft",
    duration: "2 days, 1 night",
    price: 8999,
    description:
      "An automatic sedan and a well-appointed loft near the business district - for a short work trip that still feels comfortable.",
    highlights: [
      "Automatic sedan for airport and office runs",
      "1 night at City Loft, Downtown Guwahati",
      "Workspace and Wi-Fi included at the loft",
    ],
    images: [],
    image_alt: [],
  },
  {
    slug: "family-lake-retreat",
    name: "Family Lake Retreat",
    vehicle_name: "SUV",
    stay_name: "Lakeview Bungalow",
    duration: "4 days, 3 nights",
    price: 29999,
    description:
      "A 7-seat SUV and a full bungalow with garden and lake access - room for the whole family, inside and out.",
    highlights: [
      "7-seat SUV, room for the whole family",
      "3 nights at Lakeview Bungalow, Lake Road",
      "Garden and lake path access included",
    ],
    images: [],
    image_alt: [],
  },
];

const tables = [
  ["vehicles", vehicles],
  ["commercial_vehicles", commercialVehicles],
  ["stays", stays],
  ["packages", packages],
];

for (const [table, rows] of tables) {
  const { error } = await supabase.from(table).upsert(rows, { onConflict: "slug" });
  if (error) {
    console.error(`Failed seeding ${table}:`, error.message);
    process.exit(1);
  }
  console.log(`Seeded ${rows.length} rows into ${table}`);
}

console.log("Done.");
