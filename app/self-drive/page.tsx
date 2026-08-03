import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { ListingCard } from "@/components/ListingCard";
import { ImageRevealGrid } from "@/components/ImageRevealGrid";
import { EnquiryForm } from "@/components/EnquiryForm";
import { getVehicles } from "@/lib/data/vehicles";
import { getListingImages } from "@/lib/images";
import { CarIcon, FuelIcon, GearIcon, UsersIcon } from "@/components/icons";
import { VEHICLE_ICONS } from "@/lib/icon-maps";

// Vehicles are managed from /admin - render fresh on every request instead
// of prerendering at build, so a new vehicle shows up without a redeploy.
export const dynamic = "force-dynamic";

const title = "Self Drive";
const description = "Self-drive cars - hatchback, sedan, SUV, and luxury - booked over WhatsApp.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
};

export default async function SelfDrivePage() {
  const vehicles = await getVehicles();

  return (
    <>
      <Section heading="A car for every kind of trip" subheading="Take the wheel yourself - every category below is self-drive.">
        {vehicles.length === 0 ? (
          <p className="text-base text-ink-muted">No vehicles listed yet - check back soon.</p>
        ) : (
          <ImageRevealGrid className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {vehicles.map((vehicle, index) => {
              const images = getListingImages(vehicle);
              return (
                <ListingCard
                  key={vehicle.slug}
                  title={vehicle.name}
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
                  whatsappMessage={`Hi! I'd like to enquire about renting a ${vehicle.name} (self-drive).`}
                />
              );
            })}
          </ImageRevealGrid>
        )}
      </Section>

      <Section
        heading="Tell us what you need"
        subheading="Pick a vehicle type below - we'll confirm availability and pricing on WhatsApp."
        className="bg-surface"
      >
        <div className="max-w-2xl">
          <EnquiryForm variant="private-car" vehicleOptions={vehicles.map((v) => v.name)} />
        </div>
      </Section>
    </>
  );
}
