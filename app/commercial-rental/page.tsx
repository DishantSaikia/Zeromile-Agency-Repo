import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { ListingCard } from "@/components/ListingCard";
import { RevealGrid } from "@/components/RevealGrid";
import { EnquiryForm } from "@/components/EnquiryForm";
import { commercialVehicles } from "@/lib/data/commercial-vehicles";
import { getListingImages } from "@/lib/images";
import { BuildingIcon, CalendarIcon, CheckIcon, TruckIcon } from "@/components/icons";
import { COMMERCIAL_ICONS } from "@/lib/icon-maps";

const title = "Commercial Vehicle Rental";
const description =
  "Mini-trucks, tempos, vans, and buses for business logistics - fleet-backed, GST-invoiced, and available on long-term contracts.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
};

const B2B_TRUST = [
  { title: "120+ vehicle fleet", description: "Backup vehicles ready if one needs servicing mid-contract.", icon: TruckIcon },
  { title: "GST invoicing", description: "Proper business invoices for every booking, no exceptions.", icon: CheckIcon },
  { title: "Long-term contracts", description: "Daily, monthly, or multi-month rates for ongoing logistics.", icon: CalendarIcon },
];

export default function CommercialRentalPage() {
  return (
    <>
      <Section
        heading="Fleet-backed vehicles for business logistics"
        subheading="From single-day hires to long-term contracts - mini-trucks, tempos, vans, and buses with GST invoicing built in."
      >
        <div className="grid gap-x-8 sm:grid-cols-3">
          {B2B_TRUST.map((item) => (
            <div
              key={item.title}
              className="border-t border-hairline py-6 first:border-t-0 sm:border-t-0 sm:py-0 sm:pr-8 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:pl-8"
            >
              <item.icon className="h-6 w-6 text-brand-blue" />
              <p className="mt-3 font-heading text-lg font-semibold tracking-tight text-ink">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section heading="Choose a vehicle type" className="pt-0">
        <RevealGrid className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {commercialVehicles.map((vehicle, index) => {
            const images = getListingImages("commercial-vehicle", vehicle.slug);
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
        </RevealGrid>
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
