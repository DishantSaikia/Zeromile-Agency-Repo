import { getCommercialVehicles } from "@/lib/data/commercial-vehicles";
import { AdminTable } from "@/components/admin/AdminTable";
import { getListingImages } from "@/lib/images";
import { deleteCommercialVehicle } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminCommercialVehiclesPage() {
  const commercialVehicles = await getCommercialVehicles();

  return (
    <div>
      <h1 className="font-heading text-2xl tracking-tight text-ink">Commercial Vehicles</h1>
      <p className="mt-1.5 text-sm text-ink-muted">Fleet categories shown on the public site.</p>

      <div className="mt-6">
        <AdminTable
          emptyLabel="No commercial vehicles yet - add your first one."
          newHref="/admin/commercial-vehicles/new"
          newLabel="Add vehicle"
          rows={commercialVehicles.map((vehicle) => ({
            key: vehicle.id,
            title: vehicle.name,
            subtitle: `${vehicle.bodyType} · ${vehicle.capacity}`,
            image: getListingImages(vehicle)[0],
            editHref: `/admin/commercial-vehicles/${vehicle.slug}/edit`,
            onDelete: deleteCommercialVehicle.bind(null, vehicle.id),
          }))}
        />
      </div>
    </div>
  );
}
