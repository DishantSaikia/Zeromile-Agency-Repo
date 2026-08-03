import { notFound } from "next/navigation";
import { getVehicleBySlug } from "@/lib/data/vehicles";
import { VehicleForm } from "@/components/admin/VehicleForm";
import { updateVehicle } from "../../actions";

export const dynamic = "force-dynamic";

type Params = { slug: string };

export default async function EditVehiclePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle) notFound();

  return (
    <div>
      <h1 className="font-heading text-2xl tracking-tight text-ink">Edit {vehicle.name}</h1>
      <div className="mt-6">
        <VehicleForm vehicle={vehicle} action={updateVehicle.bind(null, vehicle.id)} />
      </div>
    </div>
  );
}
