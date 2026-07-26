import type { CommercialVehicleCategory } from "./types";

export const commercialVehicles: CommercialVehicleCategory[] = [
  {
    slug: "mini-truck",
    name: "Mini-Truck",
    bodyType: "Mini-Truck",
    capacity: "Up to 750 kg",
    idealFor: ["Local goods delivery", "Small business restocking", "Office relocations"],
    description:
      "Nimble in city traffic with enough load space for regular commercial runs.",
    images: [],
    imageAlt: [],
  },
  {
    slug: "tempo",
    name: "Tempo",
    bodyType: "Tempo",
    capacity: "Up to 1500 kg",
    idealFor: ["Bulk goods transport", "Inter-city freight", "Event logistics"],
    description:
      "A mid-size workhorse for heavier loads and longer commercial routes.",
    images: [],
    imageAlt: [],
  },
  {
    slug: "van",
    name: "Van",
    bodyType: "Van",
    capacity: "9-12 seats or cargo equivalent",
    idealFor: ["Staff transport", "Airport transfers for groups", "Equipment transport"],
    description:
      "Flexible for passengers or cargo - a common pick for staff and crew transport contracts.",
    images: [],
    imageAlt: [],
  },
  {
    slug: "bus",
    name: "Bus",
    bodyType: "Bus",
    capacity: "25-40 seats",
    idealFor: ["Corporate group travel", "School/institutional transport", "Long-term contracts"],
    description:
      "For larger groups and long-term contracts - fleet-backed and GST-invoiced.",
    images: [],
    imageAlt: [],
  },
];
