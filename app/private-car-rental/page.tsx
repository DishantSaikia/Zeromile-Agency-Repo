import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { ListingCard } from "@/components/ListingCard";
import { RevealGrid } from "@/components/RevealGrid";
import { EnquiryForm } from "@/components/EnquiryForm";
import { vehicles } from "@/lib/data/vehicles";
import { getListingImages } from "@/lib/images";
import { CarIcon, FuelIcon, GearIcon, UsersIcon } from "@/components/icons";
import { VEHICLE_ICONS } from "@/lib/icon-maps";

const title = "Private Car Rental";
const description =
  "Self-drive and chauffeur-driven cars - hatchback, sedan, SUV, and luxury - booked over WhatsApp.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
};

export default function PrivateCarRentalPage() {
  return (
    <>
      <Section
        heading="A car for every kind of trip"
        subheading="Self-drive if you'd rather take the wheel, or chauffeur-driven if you'd rather not. Every category below is available either way unless noted."
      >
        <RevealGrid className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {vehicles.map((vehicle, index) => {
            const images = getListingImages("vehicle", vehicle.slug);
            const driveLabel =
              vehicle.driveOptions.length === 2
                ? "Self-drive & chauffeur"
                : vehicle.driveOptions[0] === "chauffeur"
                  ? "Chauffeur only"
                  : "Self-drive only";
            return (
              <ListingCard
                key={vehicle.slug}
                title={vehicle.name}
                subtitle={driveLabel}
                image={images[0]}
                placeholderIcon={VEHICLE_ICONS[vehicle.bodyType] ?? CarIcon}
                priority={index === 0}
                specs={[
                  { icon: UsersIcon, label: `${vehicle.seats} seats` },
                  { icon: GearIcon, label: vehicle.transmission },
                  { icon: FuelIcon, label: vehicle.fuel },
                ]}
                price={`₹${vehicle.pricePerDay.toLocaleString("en-IN")}`}
                priceUnit="from /day"
                whatsappMessage={`Hi! I'd like to enquire about renting a ${vehicle.name} (private car rental).`}
              />
            );
          })}
        </RevealGrid>
      </Section>

      <Section
        heading="Tell us what you need"
        subheading="Pick a vehicle type and your preference below - we'll confirm availability and pricing on WhatsApp."
        className="bg-surface"
      >
        <div className="max-w-2xl">
          <EnquiryForm variant="private-car" vehicleOptions={vehicles.map((v) => v.name)} />
        </div>
      </Section>
    </>
  );
}
