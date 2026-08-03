import type { ComponentType, SVGProps } from "react";
import {
  BuildingIcon,
  BusIcon,
  CarIcon,
  HatchbackIcon,
  HomeIcon,
  MapPinIcon,
  SuvIcon,
  VanIcon,
} from "@/components/icons";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

// Keyed by bodyType/slug so listing grids read distinct by shape at a
// glance, not just by reading the price and copy on each card.
export const VEHICLE_ICONS: Record<string, Icon> = {
  Sedan: CarIcon,
  SUV: SuvIcon,
  Normal: HatchbackIcon,
};

export const COMMERCIAL_ICONS: Record<string, Icon> = {
  "14 Seater": BusIcon,
  "12 Seater": VanIcon,
  "7 Seater": VanIcon,
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
