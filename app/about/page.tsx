import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { TrustBar } from "@/components/TrustBar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CarIcon, ClockIcon, ShieldIcon } from "@/components/icons";
import { agencyConfig } from "@/lib/config";

const title = "About";
const description = `${agencyConfig.tagline} Learn how ${agencyConfig.name} runs private car, commercial fleet, and stay bookings over WhatsApp.`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
};

const VALUES = [
  {
    title: "Safety first",
    description: "Every vehicle is inspected and insured; every stay is checked before it's listed.",
    icon: ShieldIcon,
  },
  {
    title: "Fast, human replies",
    description: "A real person answers on WhatsApp, no ticket queues, no automated loops.",
    icon: ClockIcon,
  },
  {
    title: "A fleet that fits",
    description: "From city hatchbacks to commercial trucks, sized to the job, not a one-size list.",
    icon: CarIcon,
  },
];

export default function AboutPage() {
  return (
    <>
      <Section
        heading="Drive freely. Live limitless."
        subheading="We started Zeromile Agency to make renting a car, hiring a commercial vehicle, or booking a stay feel like messaging a friend who happens to have the keys - not filling out a form and waiting."
      >
        <p className="max-w-2xl text-base leading-relaxed text-ink-muted">
          Today that means three things under one roof: private cars for people who just need to get
          somewhere, a commercial fleet for businesses that need it done reliably, and a small
          collection of stays for trips that need a place to land. Every booking still ends the same
          way - a WhatsApp chat with our team, not a checkout page.
        </p>
      </Section>

      <TrustBar />

      <Section heading="A few things that don't change">
        <div className="grid gap-x-8 sm:grid-cols-3">
          {VALUES.map((value) => (
            <div
              key={value.title}
              className="border-t border-hairline py-6 first:border-t-0 sm:border-t-0 sm:py-0 sm:pr-8 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:pl-8"
            >
              <value.icon className="h-6 w-6 text-brand-blue" />
              <h3 className="mt-3 font-heading text-xl font-semibold tracking-tight text-ink">
                {value.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{value.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-surface" containerClassName="text-center">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-ink lg:text-3xl">
          Questions before you book?
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-ink-muted">
          Message us directly - we&apos;re happy to talk through what fits before you commit to anything.
        </p>
        <div className="mt-7 flex justify-center">
          <WhatsAppButton variant="block" label="Chat with our team" />
        </div>
      </Section>
    </>
  );
}
