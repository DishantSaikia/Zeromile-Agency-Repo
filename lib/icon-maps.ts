import type { ComponentType, SVGProps } from "react";
import {
  BuildingIcon,
  BusIcon,
  CarIcon,
  HatchbackIcon,
  HomeIcon,
  LuxuryCarIcon,
  MapPinIcon,
  MiniTruckIcon,
  SuvIcon,
  TruckIcon,
  VanIcon,
} from "@/components/icons";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

// Keyed by bodyType/slug so listing grids read distinct by shape at a
// glance, not just by reading the price and copy on each card.
export const VEHICLE_ICONS: Record<string, Icon> = {
  Hatchback: HatchbackIcon,
  Sedan: CarIcon,
  SUV: SuvIcon,
  Luxury: LuxuryCarIcon,
};

export const COMMERCIAL_ICONS: Record<string, Icon> = {
  "Mini-Truck": MiniTruckIcon,
  Tempo: TruckIcon,
  Van: VanIcon,
  Bus: BusIcon,
};

export const STAY_ICONS: Record<string, Icon> = {
  "riverside-cottage": HomeIcon,
  "hillside-studio": BuildingIcon,
  "city-loft": BuildingIcon,
  "lakeview-bungalow": HomeIcon,
};

export const PACKAGE_ICONS: Record<string, Icon> = {
  "weekend-getaway": CarIcon,
  "hill-escape": MapPinIcon,
  "city-business-trip": BuildingIcon,
  "family-lake-retreat": HomeIcon,
};
