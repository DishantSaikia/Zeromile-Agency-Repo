export type DriveOption = "self-drive" | "chauffeur";

export type VehicleCategory = {
  slug: string;
  name: string;
  bodyType: "Hatchback" | "Sedan" | "SUV" | "Luxury";
  seats: number;
  transmission: "Manual" | "Automatic";
  fuel: "Petrol" | "Diesel" | "Electric" | "CNG";
  pricePerDay: number;
  driveOptions: DriveOption[];
  description: string;
  images: string[];
  imageAlt: string[];
};

export type CommercialVehicleCategory = {
  slug: string;
  name: string;
  bodyType: "Mini-Truck" | "Tempo" | "Van" | "Bus";
  capacity: string;
  idealFor: string[];
  description: string;
  images: string[];
  imageAlt: string[];
};

export type Stay = {
  slug: string;
  title: string;
  location: string;
  pricePerNight: number;
  maxGuests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  amenities: string[];
  description: string;
  checkInTime: string;
  checkOutTime: string;
  images: string[];
  imageAlt: string[];
};

export type Package = {
  slug: string;
  name: string;
  vehicleName: string;
  stayName: string;
  duration: string;
  price: number;
  description: string;
  highlights: string[];
  images: string[];
  imageAlt: string[];
};
