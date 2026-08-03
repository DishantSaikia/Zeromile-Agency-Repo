import { notFound } from "next/navigation";
import { getCommercialVehicleBySlug } from "@/lib/data/commercial-vehicles";
import { CommercialVehicleForm } from "@/components/admin/CommercialVehicleForm";
import { updateCommercialVehicle } from "../../actions";

export const dynamic = "force-dynamic";

type Params = { slug: string };

export default async function EditCommercialVehiclePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const vehicle = await getCommercialVehicleBySlug(slug);
  if (!vehicle) notFound();

  return (
    <div>
      <h1 className="font-heading text-2xl tracking-tight text-ink">Edit {vehicle.name}</h1>
      <div className="mt-6">
        <CommercialVehicleForm vehicle={vehicle} action={updateCommercialVehicle.bind(null, vehicle.id)} />
      </div>
    </div>
  );
}
