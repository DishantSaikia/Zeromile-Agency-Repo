import { Hero } from "@/components/Hero";
import { RouteLine } from "@/components/RouteLine";
import { Marquee } from "@/components/Marquee";
import { Section } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { RevealGrid } from "@/components/RevealGrid";
import { TrustBar } from "@/components/TrustBar";
import { Testimonials } from "@/components/Testimonials";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { MagneticWrapper } from "@/components/MagneticWrapper";
import { CarIcon, HomeIcon, PackageIcon, TruckIcon } from "@/components/icons";

const SERVICES = [
  {
    title: "Private Car Rental",
    description:
      "Hatchbacks to luxury sedans, self-drive or with a chauffeur. Ready for city runs, airport transfers, and road trips.",
    href: "/private-car-rental",
    whatsappMessage: "Hi! I'd like to enquire about private car rental.",
    placeholderIcon: CarIcon,
  },
  {
    title: "Commercial Vehicle Rental",
    description:
      "Mini-trucks, tempos, vans, and buses for business logistics: fleet-backed, GST-invoiced, contract-friendly.",
    href: "/commercial-rental",
    whatsappMessage: "Hi! I'd like to enquire about commercial vehicle rental.",
    placeholderIcon: TruckIcon,
  },
  {
    title: "Stays",
    description:
      "Short-term stays for weekend trips or work travel: clear pricing, real amenities, a team you can reach.",
    href: "/stays",
    whatsappMessage: "Hi! I'd like to enquire about a stay.",
    placeholderIcon: HomeIcon,
  },
  {
    title: "Packages",
    description:
      "A vehicle and a stay, bundled for weekend trips, hill escapes, and family getaways: one price, one booking.",
    href: "/packages",
    whatsappMessage: "Hi! I'd like to enquire about a package.",
    placeholderIcon: PackageIcon,
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      <Marquee />

      <div className="mx-auto max-w-5xl px-4 pt-14 sm:px-6 lg:px-8 lg:pt-20">
        <RouteLine />
      </div>

      <Section heading="Three services. One conversation.">
        <RevealGrid className="flex flex-col">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} reverse={i % 2 === 1} {...service} />
          ))}
        </RevealGrid>
      </Section>

      <TrustBar />

      <Section
        heading="What clients say"
        subheading="A few notes from recent private, commercial, and stay bookings."
      >
        <Testimonials />
      </Section>

      <Section className="bg-surface" containerClassName="text-center">
        <h2 className="font-heading text-4xl font-semibold tracking-tighter text-ink lg:text-6xl">
          Ready when you are.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-muted lg:text-lg">
          Send us a message on WhatsApp and we&apos;ll help you find the right car, fleet, or stay.
        </p>
        <div className="mt-8 flex justify-center">
          <MagneticWrapper className="sm:w-auto">
            <WhatsAppButton variant="block" label="Start a WhatsApp chat" />
          </MagneticWrapper>
        </div>
      </Section>
    </>
  );
}
