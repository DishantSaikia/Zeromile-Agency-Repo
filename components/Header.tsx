"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { agencyConfig } from "@/lib/config";
import { WhatsAppButton } from "./WhatsAppButton";
import { CloseIcon, MenuIcon } from "./icons";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/private-car-rental", label: "Private Car Rental" },
  { href: "/commercial-rental", label: "Commercial Rental" },
  { href: "/stays", label: "Stays" },
  { href: "/packages", label: "Packages" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label={`${agencyConfig.name} home`}>
          <Image src="/logo.png" alt="" width={44} height={44} className="h-10 w-10 lg:h-11 lg:w-11" priority />
          <span className="font-heading text-lg font-semibold tracking-tight text-ink lg:text-xl">
            Zeromile <span className="text-brand-blue">Agency</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-[var(--dur-micro)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy ${
                  active ? "text-navy bg-brand-blue-soft" : "text-ink-muted hover:text-navy hover:bg-surface"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <WhatsAppButton label="Enquire Now" />
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-12 w-12 items-center justify-center rounded-full text-ink transition-colors duration-[var(--dur-micro)] ease-[var(--ease-out)] hover:bg-surface hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy lg:hidden"
        >
          {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`fixed inset-x-0 top-16 z-30 origin-top border-b border-hairline bg-bg shadow-[0_20px_44px_-18px_rgba(11,27,51,0.28)] transition-[transform,opacity] duration-[var(--dur-base)] ease-[var(--ease-out)] lg:hidden ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3.5 text-base font-medium text-ink hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 px-1">
            <WhatsAppButton variant="block" label="Enquire Now" />
          </div>
        </nav>
      </div>
    </header>
  );
}
