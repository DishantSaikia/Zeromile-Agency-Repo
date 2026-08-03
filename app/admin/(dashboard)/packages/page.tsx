import { getPackages } from "@/lib/data/packages";
import { AdminTable } from "@/components/admin/AdminTable";
import { getListingImages } from "@/lib/images";
import { deletePackage } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminPackagesPage() {
  const packages = await getPackages();

  return (
    <div>
      <h1 className="font-heading text-2xl tracking-tight text-ink">Packages</h1>
      <p className="mt-1.5 text-sm text-ink-muted">Vehicle + stay bundles shown on the public site.</p>

      <div className="mt-6">
        <AdminTable
          emptyLabel="No packages yet - add your first one."
          newHref="/admin/packages/new"
          newLabel="Add package"
          rows={packages.map((pkg) => ({
            key: pkg.id,
            title: pkg.name,
            subtitle: `${pkg.vehicleName} + ${pkg.stayName} · ${pkg.duration}`,
            meta: `₹${pkg.price.toLocaleString("en-IN")}`,
            image: getListingImages(pkg)[0],
            editHref: `/admin/packages/${pkg.slug}/edit`,
            onDelete: deletePackage.bind(null, pkg.id),
          }))}
        />
      </div>
    </div>
  );
}
