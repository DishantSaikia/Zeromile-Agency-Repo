import type { Metadata } from "next";
import { PageBanner } from "@/components/PageBanner";
import { Section } from "@/components/Section";
import { ListingCard } from "@/components/ListingCard";
import { ImageRevealGrid } from "@/components/ImageRevealGrid";
import { EnquiryForm } from "@/components/EnquiryForm";
import { getCommercialVehicles } from "@/lib/data/commercial-vehicles";
import { getListingImages } from "@/lib/images";
import { BuildingIcon, TruckIcon } from "@/components/icons";
import { COMMERCIAL_ICONS } from "@/lib/icon-maps";

// Commercial vehicles are managed from /admin - render fresh on every
// request instead of prerendering at build.
export const dynamic = "force-dynamic";

const title = "Commercial Vehicle Rental";
const description =
  "7, 12, and 14-seater vehicles for business logistics - fleet-backed, GST-invoiced, and available on long-term contracts.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
};

export default async function CommercialRentalPage() {
  const commercialVehicles = await getCommercialVehicles();

  return (
    <>
      <PageBanner title="Commercial Rental" crumb="Commercial Rental" />

      <Section eyebrow="Fleet for business" heading="Choose a vehicle type">
        {commercialVehicles.length === 0 ? (
          <p className="text-base text-ink-muted">No commercial vehicles listed yet - check back soon.</p>
        ) : (
          <ImageRevealGrid className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {commercialVehicles.map((vehicle, index) => {
              const images = getListingImages(vehicle);
              return (
                <ListingCard
                  key={vehicle.slug}
                  title={vehicle.name}
                  subtitle={vehicle.capacity}
                  image={images[0]}
                  placeholderIcon={COMMERCIAL_ICONS[vehicle.bodyType] ?? TruckIcon}
                  priority={index === 0}
                  specs={[{ icon: BuildingIcon, label: vehicle.idealFor[0] }]}
                  price="Contact us"
                  priceUnit="custom quote"
                  whatsappMessage={`Hi! I'd like to enquire about renting a ${vehicle.name} for my business (commercial vehicle rental).`}
                />
              );
            })}
          </ImageRevealGrid>
        )}
      </Section>

      <Section
        heading="Tell us about the job"
        subheading="Share your company name, the vehicle type, and the route or purpose - we'll come back with a quote on WhatsApp."
        className="bg-surface"
      >
        <div className="max-w-2xl">
          <EnquiryForm variant="commercial" vehicleOptions={commercialVehicles.map((v) => v.name)} />
        </div>
      </Section>
    </>
  );
}
