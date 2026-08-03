import { getVehicles } from "@/lib/data/vehicles";
import { AdminTable } from "@/components/admin/AdminTable";
import { getListingImages } from "@/lib/images";
import { deleteVehicle } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminVehiclesPage() {
  const vehicles = await getVehicles();

  return (
    <div>
      <h1 className="font-heading text-2xl tracking-tight text-ink">Vehicles</h1>
      <p className="mt-1.5 text-sm text-ink-muted">Self Drive categories shown on the public site.</p>

      <div className="mt-6">
        <AdminTable
          emptyLabel="No vehicles yet - add your first one."
          newHref="/admin/vehicles/new"
          newLabel="Add vehicle"
          rows={vehicles.map((vehicle) => ({
            key: vehicle.id,
            title: vehicle.name,
            subtitle: `${vehicle.bodyType} · ${vehicle.seats} seats · ${vehicle.transmission}`,
            meta: `₹${vehicle.pricePerDay.toLocaleString("en-IN")}/day`,
            image: getListingImages(vehicle)[0],
            editHref: `/admin/vehicles/${vehicle.slug}/edit`,
            onDelete: deleteVehicle.bind(null, vehicle.id),
          }))}
        />
      </div>
    </div>
  );
}
