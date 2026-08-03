// Scopes every /admin/* route (login and the dashboard group) back to the
// original light, functional palette - the public site's ledger redesign
// deliberately doesn't reach this Operate surface. Covers the full area
// main provides (Header/Footer already hide themselves on /admin routes)
// so no dark root background can show through around the edges.
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="admin-theme min-h-full bg-bg text-ink">{children}</div>;
}
