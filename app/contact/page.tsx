import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { EnquiryForm } from "@/components/EnquiryForm";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ClockIcon } from "@/components/icons";
import { agencyConfig } from "@/lib/config";

const title = "Contact";
const description = `Get in touch with ${agencyConfig.name} over WhatsApp or email for private car, commercial rental, or stay enquiries.`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
};

export default function ContactPage() {
  return (
    <Section
      heading="Get in touch"
      subheading="For anything that doesn't fit a specific booking form, send us a message here or start a WhatsApp chat directly."
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-12">
        <div>
          <div className="rounded-2xl border border-hairline bg-surface p-6">
            <h2 className="font-heading text-base font-semibold tracking-tight text-ink">WhatsApp</h2>
            <p className="mt-1.5 text-sm text-ink-muted">The fastest way to reach us - most replies come within minutes.</p>
            <div className="mt-4">
              <WhatsAppButton />
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-hairline bg-surface p-6">
            <h2 className="font-heading text-base font-semibold tracking-tight text-ink">Email</h2>
            <p className="mt-1.5 text-sm text-ink-muted">For anything you&apos;d rather put in writing.</p>
            <a
              href={`mailto:${agencyConfig.email}`}
              className="mt-3 inline-block text-sm font-medium text-navy hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy rounded"
            >
              {agencyConfig.email}
            </a>
          </div>

          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-hairline bg-surface p-6">
            <ClockIcon className="h-5 w-5 shrink-0 text-navy" />
            <p className="text-sm text-ink-muted">Typical reply time: under 10 minutes during business hours.</p>
          </div>
        </div>

        <EnquiryForm variant="general" heading="Send us a message" />
      </div>
    </Section>
  );
}
