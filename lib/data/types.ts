export type VehicleCategory = {
  id: string;
  slug: string;
  name: string;
  bodyType: "Sedan" | "SUV" | "Normal";
  seats: number;
  transmission: "Manual" | "Automatic";
  fuel: "Petrol" | "Diesel" | "Electric" | "CNG";
  pricePerDay: number;
  description: string;
  images: string[];
  imageAlt: string[];
};

export type CommercialVehicleCategory = {
  id: string;
  slug: string;
  name: string;
  bodyType: "14 Seater" | "12 Seater" | "7 Seater";
  capacity: string;
  idealFor: string[];
  description: string;
  images: string[];
  imageAlt: string[];
};

export type Stay = {
  id: string;
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
  id: string;
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

export type CategoryThumbnailKey = "self-drive" | "commercial-vehicles" | "stays" | "packages";

export type CategoryThumbnail = {
  key: CategoryThumbnailKey;
  image: string | null;
  imageAlt: string | null;
};

export type SiteSettings = {
  logo: string | null;
  logoAlt: string | null;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  context: string;
  rating: number;
};
