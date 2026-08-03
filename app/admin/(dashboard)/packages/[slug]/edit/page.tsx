import { notFound } from "next/navigation";
import { getPackageBySlug } from "@/lib/data/packages";
import { getVehicles } from "@/lib/data/vehicles";
import { getCommercialVehicles } from "@/lib/data/commercial-vehicles";
import { getStays } from "@/lib/data/stays";
import { PackageForm } from "@/components/admin/PackageForm";
import { updatePackage } from "../../actions";

export const dynamic = "force-dynamic";

type Params = { slug: string };

export default async function EditPackagePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const [pkg, vehicles, commercialVehicles, stays] = await Promise.all([
    getPackageBySlug(slug),
    getVehicles(),
    getCommercialVehicles(),
    getStays(),
  ]);
  if (!pkg) notFound();

  return (
    <div>
      <h1 className="font-heading text-2xl tracking-tight text-ink">Edit {pkg.name}</h1>
      <div className="mt-6">
        <PackageForm
          pkg={pkg}
          vehicleOptions={[...vehicles.map((v) => v.name), ...commercialVehicles.map((v) => v.name)]}
          stayOptions={stays.map((s) => s.title)}
          action={updatePackage.bind(null, pkg.id)}
        />
      </div>
    </div>
  );
}
