import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/admin/LogoutButton";

const NAV_LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/vehicles", label: "Vehicles" },
  { href: "/admin/commercial-vehicles", label: "Commercial Vehicles" },
  { href: "/admin/stays", label: "Stays" },
  { href: "/admin/packages", label: "Packages" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/homepage", label: "Homepage" },
  { href: "/admin/branding", label: "Branding" },
];

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-full bg-surface">
      <header className="border-b border-hairline bg-bg">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <nav className="flex flex-wrap items-center gap-1" aria-label="Admin">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-surface hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            {user?.email && <span className="text-sm text-ink-muted">{user.email}</span>}
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">{children}</main>
    </div>
  );
}
