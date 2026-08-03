import Link from "next/link";
import { getVehicles } from "@/lib/data/vehicles";
import { getCommercialVehicles } from "@/lib/data/commercial-vehicles";
import { getStays } from "@/lib/data/stays";
import { getPackages } from "@/lib/data/packages";
import { getCategoryThumbnails } from "@/lib/data/category-thumbnails";
import { getSiteSettings } from "@/lib/data/site-settings";
import { getTestimonials } from "@/lib/data/testimonials";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [vehicles, commercialVehicles, stays, packages, thumbnails, siteSettings, testimonials] =
    await Promise.all([
      getVehicles(),
      getCommercialVehicles(),
      getStays(),
      getPackages(),
      getCategoryThumbnails(),
      getSiteSettings(),
      getTestimonials(),
    ]);

  const thumbnailsSet = thumbnails.filter((t) => t.image).length;

  const sections = [
    { href: "/admin/vehicles", label: "Vehicles", count: vehicles.length },
    { href: "/admin/commercial-vehicles", label: "Commercial Vehicles", count: commercialVehicles.length },
    { href: "/admin/stays", label: "Stays", count: stays.length },
    { href: "/admin/packages", label: "Packages", count: packages.length },
    { href: "/admin/testimonials", label: "Testimonials", count: testimonials.length },
    { href: "/admin/homepage", label: "Homepage Thumbnails", count: `${thumbnailsSet}/${thumbnails.length}` },
    { href: "/admin/branding", label: "Branding", count: siteSettings.logo ? "Logo set" : "Default" },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl tracking-tight text-ink">Dashboard</h1>
      <p className="mt-1.5 text-sm text-ink-muted">Add, edit, or remove what shows on the public site.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="flex items-center justify-between rounded-2xl border border-hairline bg-bg px-6 py-5 transition-colors hover:border-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
          >
            <span className="font-heading text-lg tracking-tight text-ink">{section.label}</span>
            <span className="tabular-nums text-2xl text-navy">{section.count}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
