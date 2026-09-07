"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { agencyConfig } from "@/lib/config";
import { WhatsAppButton } from "./WhatsAppButton";

const FOOTER_LINKS = [
  { href: "/self-drive", label: "Self Drive" },
  { href: "/commercial-rental", label: "Commercial Rental" },
  { href: "/stays", label: "Stays" },
  { href: "/packages", label: "Packages" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

type Props = {
  logo?: string | null;
  logoAlt?: string | null;
};

export function Footer({ logo, logoAlt }: Props) {
  const pathname = usePathname();
  // The admin panel has its own chrome and is a deliberately separate,
  // unthemed Operate surface - the public marketing footer doesn't belong there.
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="bg-[#0b0c0b] text-white/70">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src={logo || "/logo.png"}
                alt={logoAlt || ""}
                width={40}
                height={40}
                unoptimized={Boolean(logo)}
                className="h-9 w-9"
              />
              <span className="font-heading text-lg tracking-tight text-white">
                Zeromile Agency
              </span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">
              {agencyConfig.tagline} Self-drive car rental, commercial vehicle hire, and short-term
              stays - booked over a WhatsApp chat, no paperwork upfront.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-sm tracking-tight text-white">Explore</h2>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-sm tracking-tight text-white">Get in touch</h2>
            <p className="mt-4 text-sm text-white/60">
              <a
                href={`mailto:${agencyConfig.email}`}
                className="transition-colors hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded"
              >
                {agencyConfig.email}
              </a>
            </p>
            <p className="mt-2 text-sm text-white/60">
              <a
                href={`tel:+${agencyConfig.whatsappNumber}`}
                className="transition-colors hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded"
              >
                {agencyConfig.phoneDisplay}
              </a>
            </p>
            <p className="mt-2 text-sm">
              <a
                href={agencyConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 transition-colors hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded"
              >
                Find us on Google Maps
              </a>
            </p>
            <div className="mt-4">
              <WhatsAppButton />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {agencyConfig.name}. All rights reserved.</p>
          <p>No online payments - every booking is confirmed with our team over WhatsApp.</p>
        </div>
      </div>
    </footer>
  );
}
