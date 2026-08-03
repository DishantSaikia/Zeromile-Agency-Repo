import { getVehicles } from "@/lib/data/vehicles";
import { getCommercialVehicles } from "@/lib/data/commercial-vehicles";
import { getStays } from "@/lib/data/stays";
import { PackageForm } from "@/components/admin/PackageForm";
import { createPackage } from "../actions";

export const dynamic = "force-dynamic";

export default async function NewPackagePage() {
  const [vehicles, commercialVehicles, stays] = await Promise.all([
    getVehicles(),
    getCommercialVehicles(),
    getStays(),
  ]);

  return (
    <div>
      <h1 className="font-heading text-2xl tracking-tight text-ink">Add package</h1>
      <div className="mt-6">
        <PackageForm
          vehicleOptions={[...vehicles.map((v) => v.name), ...commercialVehicles.map((v) => v.name)]}
          stayOptions={stays.map((s) => s.title)}
          action={createPackage}
        />
      </div>
    </div>
  );
}
