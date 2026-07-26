import type { Package } from "./types";

// Bundled vehicle + stay combos. Priced below the sum of the standalone
// vehicle and stay rates in lib/data/vehicles.ts / stays.ts, so it reads
// as a genuine bundle deal rather than the same two prices added together.
export const packages: Package[] = [
  {
    slug: "weekend-getaway",
    name: "Weekend Getaway",
    vehicleName: "Sedan",
    stayName: "Riverside Cottage",
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
    imageAlt: [],
  },
  {
    slug: "hill-escape",
    name: "Hill Escape",
    vehicleName: "SUV",
    stayName: "Hillside Studio",
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
    imageAlt: [],
  },
  {
    slug: "city-business-trip",
    name: "City Business Trip",
    vehicleName: "Sedan",
    stayName: "City Loft",
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
    imageAlt: [],
  },
  {
    slug: "family-lake-retreat",
    name: "Family Lake Retreat",
    vehicleName: "SUV",
    stayName: "Lakeview Bungalow",
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
    imageAlt: [],
  },
];
