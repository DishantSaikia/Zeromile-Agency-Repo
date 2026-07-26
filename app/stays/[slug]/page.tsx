import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Section } from "@/components/Section";
import { EnquiryForm } from "@/components/EnquiryForm";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { stays } from "@/lib/data/stays";
import { getListingImages } from "@/lib/images";
import { BathIcon, BedIcon, CheckIcon, ClockIcon, HomeIcon, MapPinIcon, UsersIcon } from "@/components/icons";
import { STAY_ICONS } from "@/lib/icon-maps";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return stays.map((stay) => ({ slug: stay.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const stay = stays.find((s) => s.slug === slug);
  if (!stay) return {};
  const title = stay.title;
  const description = `${stay.title} in ${stay.location} - ${stay.description}`;
  return {
    title,
    description,
    openGraph: { title, description, images: getListingImages("stay", stay.slug).map((i) => i.src) },
  };
}

export default async function StayDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const stay = stays.find((s) => s.slug === slug);
  if (!stay) notFound();

  const images = getListingImages("stay", stay.slug);

  return (
    <Section
      eyebrow={stay.location}
      heading={stay.title}
      subheading={`₹${stay.pricePerNight.toLocaleString("en-IN")}/night · ${stay.maxGuests} guests · ${stay.bedrooms} bedroom${stay.bedrooms > 1 ? "s" : ""}`}
    >
      <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
        <div>
          <div className="image-outline relative aspect-[3/2] w-full overflow-hidden rounded-[var(--radius-outer)] bg-surface-2 shadow-[var(--shadow-card)]">
            {images[0] ? (
              <Image
                src={images[0].src}
                alt={images[0].alt}
                fill
                priority
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
            ) : (
              <ImagePlaceholder icon={STAY_ICONS[stay.slug] ?? HomeIcon} />
            )}
          </div>

          {images.length > 1 && (
            <div className="mt-3 grid grid-cols-3 gap-3">
              {images.slice(1).map((image) => (
                <div
                  key={image.src}
                  className="relative aspect-[3/2] overflow-hidden rounded-xl border border-hairline bg-surface-2"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 20vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          <p className="mt-8 text-base leading-relaxed text-ink-muted">{stay.description}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-xl border border-hairline bg-surface px-4 py-3.5">
              <UsersIcon className="h-5 w-5 text-navy" />
              <span className="text-sm text-ink">{stay.maxGuests} guests max</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-hairline bg-surface px-4 py-3.5">
              <BedIcon className="h-5 w-5 text-navy" />
              <span className="text-sm text-ink">
                {stay.bedrooms} bedroom{stay.bedrooms > 1 ? "s" : ""}, {stay.beds} bed{stay.beds > 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-hairline bg-surface px-4 py-3.5">
              <BathIcon className="h-5 w-5 text-navy" />
              <span className="text-sm text-ink">{stay.baths} bathroom{stay.baths > 1 ? "s" : ""}</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-hairline bg-surface px-4 py-3.5">
              <ClockIcon className="h-5 w-5 text-navy" />
              <span className="text-sm text-ink">
                {stay.checkInTime} check-in · {stay.checkOutTime} check-out
              </span>
            </div>
          </div>

          <h2 className="mt-10 font-heading text-lg font-semibold tracking-tight text-ink">Amenities</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-3">
            {stay.amenities.map((amenity) => (
              <li key={amenity} className="flex items-center gap-2 text-sm text-ink-muted">
                <CheckIcon className="h-4 w-4 shrink-0 text-brand-blue" />
                {amenity}
              </li>
            ))}
          </ul>

          <h2 className="mt-10 font-heading text-lg font-semibold tracking-tight text-ink">Location</h2>
          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-hairline bg-surface-2 px-5 py-8">
            <MapPinIcon className="h-6 w-6 shrink-0 text-ink-faint" />
            <p className="text-sm text-ink-muted">
              {stay.location} - exact address shared with confirmed bookings.
            </p>
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <EnquiryForm
            variant="stay"
            itemName={stay.title}
            heading="Enquire about this stay"
          />
        </div>
      </div>
    </Section>
  );
}
