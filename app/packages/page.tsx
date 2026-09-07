import type { Metadata } from "next";
import { PageBanner } from "@/components/PageBanner";
import { Section } from "@/components/Section";
import { ListingCard } from "@/components/ListingCard";
import { RevealGrid } from "@/components/RevealGrid";
import { EnquiryForm } from "@/components/EnquiryForm";
import { getPackages } from "@/lib/data/packages";
import { getListingImages } from "@/lib/images";
import { CalendarIcon, CarIcon, HomeIcon } from "@/components/icons";
import { PACKAGE_ICONS } from "@/lib/icon-maps";

// Packages are managed from /admin - render fresh on every request instead
// of prerendering at build.
export const dynamic = "force-dynamic";

const title = "Packages";
const description =
  "Vehicle + stay bundles for weekend trips, hill escapes, and family getaways - booked in one conversation on WhatsApp.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
};

export default async function PackagesPage() {
  const packages = await getPackages();

  return (
    <>
      <PageBanner title="Packages" crumb="Packages" />

      <Section
        eyebrow="Vehicle + stay, one price"
        heading="A vehicle and a stay, bundled"
        subheading="Each package pairs a vehicle with a stay for a set trip length, priced as one - no adding up two separate bookings."
      >
        {packages.length === 0 ? (
          <p className="text-base text-ink-muted">No packages listed yet - check back soon.</p>
        ) : (
          <RevealGrid className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {packages.map((pkg, index) => {
              const images = getListingImages(pkg);
              return (
                <ListingCard
                  key={pkg.slug}
                  title={pkg.name}
                  subtitle={pkg.duration}
                  image={images[0]}
                  placeholderIcon={PACKAGE_ICONS[pkg.slug] ?? HomeIcon}
                  priority={index === 0}
                  specs={[
                    { icon: CarIcon, label: pkg.vehicleName },
                    { icon: HomeIcon, label: pkg.stayName },
                    { icon: CalendarIcon, label: pkg.duration },
                  ]}
                  price={`₹${pkg.price.toLocaleString("en-IN")}`}
                  priceUnit="per package"
                  whatsappMessage={`Hi! I'd like to enquire about the ${pkg.name} package (${pkg.vehicleName} + ${pkg.stayName}, ${pkg.duration}).`}
                />
              );
            })}
          </RevealGrid>
        )}
      </Section>

      <Section
        heading="Tell us your dates"
        subheading="Pick a package and your preferred start date - we'll confirm availability and pricing on WhatsApp."
        className="bg-surface"
      >
        <div className="max-w-2xl">
          <EnquiryForm variant="package" vehicleOptions={packages.map((p) => p.name)} />
        </div>
      </Section>
    </>
  );
}
