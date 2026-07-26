import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { ListingCard } from "@/components/ListingCard";
import { RevealGrid } from "@/components/RevealGrid";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { stays } from "@/lib/data/stays";
import { getListingImages } from "@/lib/images";
import { BathIcon, BedIcon, HomeIcon, UsersIcon } from "@/components/icons";
import { STAY_ICONS } from "@/lib/icon-maps";

const title = "Stays";
const description = "Short-term stays booked over WhatsApp - clear pricing, real amenities, a team you can reach.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
};

export default function StaysPage() {
  return (
    <>
      <Section
        heading="Short-term stays, booked directly with us"
        subheading="Pick a place below for the full gallery, amenities, and availability - or message us and we'll help you choose."
      >
        <RevealGrid className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {stays.map((stay, index) => {
            const images = getListingImages("stay", stay.slug);
            return (
              <ListingCard
                key={stay.slug}
                title={stay.title}
                subtitle={stay.location}
                image={images[0]}
                placeholderIcon={STAY_ICONS[stay.slug] ?? HomeIcon}
                priority={index === 0}
                href={`/stays/${stay.slug}`}
                specs={[
                  { icon: UsersIcon, label: `${stay.maxGuests} guests` },
                  { icon: BedIcon, label: `${stay.bedrooms} bed` },
                  { icon: BathIcon, label: `${stay.baths} bath` },
                ]}
                price={`₹${stay.pricePerNight.toLocaleString("en-IN")}`}
                priceUnit="/night"
                whatsappMessage={`Hi! I'd like to enquire about ${stay.title} (${stay.location}).`}
              />
            );
          })}
        </RevealGrid>
      </Section>

      <Section className="bg-surface" containerClassName="text-center">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-ink lg:text-3xl">
          Not sure which stay fits?
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-ink-muted">
          Tell us your dates, group size, and budget on WhatsApp and we&apos;ll point you to the right place.
        </p>
        <div className="mt-7 flex justify-center">
          <WhatsAppButton variant="block" label="Ask us on WhatsApp" />
        </div>
      </Section>
    </>
  );
}
