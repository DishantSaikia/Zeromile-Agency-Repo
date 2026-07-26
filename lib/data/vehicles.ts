import type { VehicleCategory } from "./types";

export const vehicles: VehicleCategory[] = [
  {
    slug: "hatchback",
    name: "Hatchback",
    bodyType: "Hatchback",
    seats: 4,
    transmission: "Manual",
    fuel: "Petrol",
    pricePerDay: 1800,
    driveOptions: ["self-drive", "chauffeur"],
    description:
      "Easy to park, easy on fuel - a practical pick for city errands and short trips.",
    images: [],
    imageAlt: [],
  },
  {
    slug: "sedan",
    name: "Sedan",
    bodyType: "Sedan",
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    pricePerDay: 2800,
    driveOptions: ["self-drive", "chauffeur"],
    description:
      "A comfortable, composed ride for business travel, airport runs, and family outings.",
    images: [],
    imageAlt: [],
  },
  {
    slug: "suv",
    name: "SUV",
    bodyType: "SUV",
    seats: 7,
    transmission: "Automatic",
    fuel: "Diesel",
    pricePerDay: 4200,
    driveOptions: ["self-drive", "chauffeur"],
    description:
      "Room for the whole group and the luggage - built for highway trips and rough patches alike.",
    images: [],
    imageAlt: [],
  },
  {
    slug: "luxury",
    name: "Luxury",
    bodyType: "Luxury",
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    pricePerDay: 8500,
    driveOptions: ["chauffeur"],
    description:
      "Premium interiors and a chauffeur at the wheel - for occasions that call for it.",
    images: [],
    imageAlt: [],
  },
];
